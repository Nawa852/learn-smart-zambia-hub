import { supabase } from "@/integrations/supabase/client";

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.warn('Browser does not support notifications');
    return false;
  }
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

export function isNotificationSupported(): boolean {
  return 'Notification' in window;
}

export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!('Notification' in window)) return 'unsupported';
  return Notification.permission;
}

export function showLocalNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      ...options,
    });
  }
}

export async function setupRealtimeNotifications(userId: string) {
  const channel = supabase
    .channel('user-notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        const notification = payload.new as { title: string; message: string; link: string; type: string };
        showLocalNotification(notification.title, {
          body: notification.message || undefined,
          tag: `nexus-${notification.type || 'general'}`,
          data: { url: notification.link },
        });
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

/** Check for assignments due within 24 hours and fire browser push notifications */
export async function checkDeadlinesAndNotify(userId: string) {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const { data: assignments } = await supabase
    .from('assignments')
    .select('id, title, due_date, course_id')
    .gte('due_date', now.toISOString())
    .lte('due_date', tomorrow.toISOString());

  if (!assignments?.length) return;

  const { data: submissions } = await supabase
    .from('submissions')
    .select('assignment_id')
    .eq('user_id', userId)
    .in('assignment_id', assignments.map(a => a.id));

  const submittedIds = new Set(submissions?.map(s => s.assignment_id) || []);
  const pending = assignments.filter(a => !submittedIds.has(a.id));

  pending.forEach(a => {
    const hours = Math.round((new Date(a.due_date!).getTime() - now.getTime()) / 3600000);
    showLocalNotification(`⏰ "${a.title}" due in ${hours}h`, {
      body: 'Submit before the deadline!',
      tag: `deadline-${a.id}`,
      data: { url: `/course/${a.course_id}` },
    });
  });
}

/** Subscribe to new class announcements in real-time and push notify */
export function setupAnnouncementNotifications(userId: string, enrolledCourseIds: string[]) {
  if (!enrolledCourseIds.length) return () => {};

  const channel = supabase
    .channel('announcement-push')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'class_announcements',
      },
      (payload) => {
        const announcement = payload.new as { title: string; content: string | null; course_id: string; priority: string };
        if (enrolledCourseIds.includes(announcement.course_id)) {
          const prefix = announcement.priority === 'urgent' ? '🚨 ' : '📢 ';
          showLocalNotification(`${prefix}${announcement.title}`, {
            body: announcement.content || 'New announcement from your teacher',
            tag: `announcement-${Date.now()}`,
            data: { url: `/course/${announcement.course_id}` },
          });
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
