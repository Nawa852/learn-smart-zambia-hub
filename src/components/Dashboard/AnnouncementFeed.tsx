import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Megaphone, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Announcement {
  id: string;
  title: string;
  content: string | null;
  priority: string | null;
  created_at: string;
  course_title: string;
}

export const AnnouncementFeed = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', user.id);

      const courseIds = enrollments?.map(e => e.course_id) || [];
      if (courseIds.length === 0) return;

      const { data } = await supabase
        .from('class_announcements')
        .select('id, title, content, priority, created_at, course_id')
        .in('course_id', courseIds)
        .order('created_at', { ascending: false })
        .limit(5);

      // Get course titles
      const { data: courses } = await supabase
        .from('courses')
        .select('id, title')
        .in('id', courseIds);

      const titleMap: Record<string, string> = {};
      courses?.forEach(c => { titleMap[c.id] = c.title; });

      setAnnouncements((data || []).map(a => ({
        ...a,
        course_title: titleMap[a.course_id] || 'Course',
      })));
    };
    load();
  }, [user]);

  if (announcements.length === 0) return null;

  const priorityColors: Record<string, string> = {
    high: 'bg-destructive/10 text-destructive',
    urgent: 'bg-destructive/10 text-destructive',
    normal: 'bg-muted text-muted-foreground',
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border/50 flex items-center gap-2">
        <Megaphone className="w-4 h-4 text-blue-500" />
        <h3 className="text-sm font-semibold text-foreground">Announcements</h3>
        <Badge variant="secondary" className="ml-auto text-[10px]">{announcements.length}</Badge>
      </div>
      <div className="divide-y divide-border/30 max-h-64 overflow-y-auto">
        {announcements.map(a => (
          <div key={a.id} className="px-4 py-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-foreground line-clamp-1">{a.title}</p>
              {a.priority && a.priority !== 'normal' && (
                <Badge className={`text-[9px] shrink-0 ${priorityColors[a.priority] || ''}`}>
                  {a.priority}
                </Badge>
              )}
            </div>
            {a.content && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{a.content}</p>}
            <div className="flex items-center gap-2 mt-1.5 text-[10px] text-muted-foreground">
              <span>{a.course_title}</span>
              <span>·</span>
              <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{timeAgo(a.created_at)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
