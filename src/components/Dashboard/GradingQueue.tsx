import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { ClipboardCheck, ArrowRight, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';

interface PendingItem {
  id: string;
  studentName: string;
  assignmentTitle: string;
  courseTitle: string;
  submittedAt: string;
  courseId: string;
}

export const GradingQueue = () => {
  const { user } = useSecureAuth();
  const navigate = useNavigate();
  const [queue, setQueue] = useState<PendingItem[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data: courses } = await supabase
        .from('courses')
        .select('id, title')
        .eq('created_by', user.id);

      if (!courses?.length) return;
      const courseIds = courses.map(c => c.id);
      const courseMap = Object.fromEntries(courses.map(c => [c.id, c.title]));

      const { data: assignments } = await supabase
        .from('assignments')
        .select('id, title, course_id')
        .in('course_id', courseIds);

      if (!assignments?.length) return;
      const assignmentIds = assignments.map(a => a.id);
      const assignmentMap = Object.fromEntries(assignments.map(a => [a.id, { title: a.title, courseId: a.course_id }]));

      const { data: submissions } = await supabase
        .from('submissions')
        .select('id, assignment_id, user_id, submitted_at')
        .in('assignment_id', assignmentIds)
        .is('graded_at', null)
        .order('submitted_at', { ascending: true })
        .limit(8);

      if (!submissions?.length) { setQueue([]); return; }

      const userIds = [...new Set(submissions.map(s => s.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);

      const profileMap = Object.fromEntries((profiles || []).map(p => [p.id, p.full_name || 'Student']));

      setQueue(submissions.map(s => {
        const aInfo = assignmentMap[s.assignment_id] || { title: 'Assignment', courseId: '' };
        return {
          id: s.id,
          studentName: profileMap[s.user_id] || 'Student',
          assignmentTitle: aInfo.title,
          courseTitle: courseMap[aInfo.courseId] || 'Course',
          submittedAt: s.submitted_at,
          courseId: aInfo.courseId,
        };
      }));
    };
    load();
  }, [user]);

  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-primary" /> Grading Queue
          </CardTitle>
          {queue.length > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">
              {queue.length} pending
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {queue.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">All caught up! ✅</p>
        ) : (
          <div className="space-y-2">
            {queue.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/course/${item.courseId}/assignments`)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-border/30 hover:border-primary/30 hover:bg-muted/20 transition-all text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.studentName}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{item.assignmentTitle} · {item.courseTitle}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(new Date(item.submittedAt), { addSuffix: true })}
                </div>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
