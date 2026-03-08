import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, CheckCircle, Info, BookOpen, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useGuardianData } from '@/hooks/useGuardianData';
import { Skeleton } from '@/components/ui/skeleton';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string | null;
  is_read: boolean;
  created_at: string;
  user_id: string;
}

const typeConfig: Record<string, { icon: typeof Bell; border: string; bg: string; badge: "default" | "secondary" | "destructive" | "outline" }> = {
  graded: { icon: CheckCircle, border: 'border-l-green-500', bg: 'bg-green-50 dark:bg-green-950/20', badge: 'default' },
  new_assignment: { icon: BookOpen, border: 'border-l-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20', badge: 'secondary' },
  alert: { icon: AlertTriangle, border: 'border-l-red-500', bg: 'bg-red-50 dark:bg-red-950/20', badge: 'destructive' },
};

const ParentAlertsPage = () => {
  const { students, loading: guardianLoading } = useGuardianData();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (guardianLoading || students.length === 0) {
      setLoading(false);
      return;
    }
    fetchNotifications();
  }, [guardianLoading, students]);

  async function fetchNotifications() {
    const studentIds = students.map(s => s.id);
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .in('user_id', studentIds)
      .order('created_at', { ascending: false })
      .limit(30);
    setNotifications(data || []);
    setLoading(false);
  }

  // Map student IDs to names
  const studentNameMap = new Map(students.map(s => [s.id, s.name]));
  const unread = notifications.filter(n => !n.is_read).length;

  if (loading || guardianLoading) {
    return <div className="space-y-6"><Skeleton className="h-16" /><Skeleton className="h-64" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Bell className="w-8 h-8 text-primary" />
            Alerts & Notifications
          </h1>
          <p className="text-muted-foreground mt-1">
            {students.length > 0 ? `${unread} unread across ${students.length} student${students.length > 1 ? 's' : ''}` : 'No students linked'}
          </p>
        </div>
      </div>

      {notifications.length === 0 ? (
        <Card><CardContent className="p-12 text-center text-muted-foreground">
          {students.length === 0 ? 'Link a student to see their notifications.' : 'No notifications yet for your linked students.'}
        </CardContent></Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => {
            const config = typeConfig[notif.type] || { icon: Info, border: 'border-l-blue-500', bg: 'bg-muted/50', badge: 'outline' as const };
            const Icon = config.icon;
            const studentName = studentNameMap.get(notif.user_id) || 'Student';
            const timeAgo = getTimeAgo(notif.created_at);

            return (
              <Card key={notif.id} className={`border-l-4 ${config.border} ${!notif.is_read ? 'shadow-md' : 'opacity-80'} hover:shadow-lg transition-all`}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-semibold text-sm ${!notif.is_read ? '' : 'text-muted-foreground'}`}>{notif.title}</h4>
                      {!notif.is_read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                    </div>
                    {notif.message && <p className="text-xs text-muted-foreground mb-2">{notif.message}</p>}
                    <div className="flex items-center gap-2">
                      <Badge variant={config.badge} className="text-[10px]">{notif.type}</Badge>
                      <Badge variant="outline" className="text-[10px]">{studentName}</Badge>
                      <span className="text-[10px] text-muted-foreground ml-auto">{timeAgo}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default ParentAlertsPage;
