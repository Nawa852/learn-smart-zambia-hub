import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, FileText, Award, Clock, Calendar, AlertTriangle, Trash2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover, PopoverContent, PopoverTrigger
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string | null;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

const typeConfig: Record<string, { icon: typeof Bell; bg: string; text: string }> = {
  new_assignment: { icon: FileText, bg: 'bg-primary/10', text: 'text-primary' },
  graded: { icon: Award, bg: 'bg-emerald-500/10', text: 'text-emerald-600' },
  deadline: { icon: AlertTriangle, bg: 'bg-amber-500/10', text: 'text-amber-600' },
  reminder: { icon: Calendar, bg: 'bg-blue-500/10', text: 'text-blue-600' },
};

export const NotificationDropdown = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(30);
      if (data) setNotifications(data as Notification[]);
    };

    fetchNotifications();

    // Check for upcoming deadlines
    const checkDeadlines = async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const { data: assignments } = await supabase
        .from('assignments')
        .select('id, title, due_date, course_id')
        .gte('due_date', new Date().toISOString())
        .lte('due_date', tomorrow.toISOString());

      if (assignments?.length) {
        // Check which ones the student hasn't submitted
        const { data: submissions } = await supabase
          .from('submissions')
          .select('assignment_id')
          .eq('user_id', user.id)
          .in('assignment_id', assignments.map(a => a.id));

        const submittedIds = new Set(submissions?.map(s => s.assignment_id) || []);
        const pending = assignments.filter(a => !submittedIds.has(a.id));

        pending.forEach(a => {
          const exists = notifications.some(n => n.type === 'deadline' && n.message?.includes(a.id));
          if (!exists) {
            toast.warning(`⏰ "${a.title}" is due soon!`, { duration: 6000 });
          }
        });
      }
    };

    checkDeadlines();

    // Realtime subscription
    const channel = supabase
      .channel('user-notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        const newNotif = payload.new as Notification;
        setNotifications(prev => [newNotif, ...prev]);
        toast.info(newNotif.title, { description: newNotif.message || undefined });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const markAllRead = async () => {
    if (!user) return;
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const handleClick = async (n: Notification) => {
    if (!n.is_read) {
      await supabase.from('notifications').update({ is_read: true }).eq('id', n.id);
      setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, is_read: true } : x));
    }
    if (n.link) {
      setOpen(false);
      navigate(n.link);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full text-[10px] font-bold bg-destructive text-destructive-foreground flex items-center justify-center px-1 animate-pulse">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px] p-0" align="end">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm text-foreground">Notifications</h4>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs h-5">{unreadCount} new</Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={markAllRead}>
              <CheckCheck className="w-3 h-3 mr-1" /> Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="max-h-[380px]">
          {notifications.length === 0 ? (
            <div className="py-12 text-center">
              <Bell className="w-8 h-8 mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
              <p className="text-xs text-muted-foreground/60 mt-1">You'll be alerted about assignments & grades</p>
            </div>
          ) : (
            notifications.map(n => {
              const config = typeConfig[n.type] || { icon: Bell, bg: 'bg-muted', text: 'text-muted-foreground' };
              const Icon = config.icon;
              return (
                <button
                  key={n.id}
                  onClick={() => handleClick(n)}
                  className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-muted/50 transition-colors border-b border-border/20 ${!n.is_read ? 'bg-primary/5' : ''}`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${config.bg}`}>
                    <Icon className={`w-4 h-4 ${config.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-tight ${!n.is_read ? 'font-semibold text-foreground' : 'text-foreground/80'}`}>
                      {n.title}
                    </p>
                    {n.message && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{n.message}</p>
                    )}
                    <p className="text-[10px] text-muted-foreground/60 mt-1 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  {!n.is_read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2 animate-pulse" />}
                </button>
              );
            })
          )}
        </ScrollArea>
        {notifications.length > 0 && (
          <div className="p-2 border-t">
            <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => { setOpen(false); navigate('/notifications'); }}>
              View all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
