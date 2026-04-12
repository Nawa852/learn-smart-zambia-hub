import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { ClipboardCheck, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

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
      const { data: courses } = await supabase.from('courses').select('id, title').eq('created_by', user.id);
      if (!courses?.length) return;
      const courseIds = courses.map(c => c.id);
      const courseMap = Object.fromEntries(courses.map(c => [c.id, c.title]));

      const { data: assignments } = await supabase.from('assignments').select('id, title, course_id').in('course_id', courseIds);
      if (!assignments?.length) return;
      const assignmentIds = assignments.map(a => a.id);
      const assignmentMap = Object.fromEntries(assignments.map(a => [a.id, { title: a.title, courseId: a.course_id }]));

      const { data: submissions } = await supabase
        .from('submissions').select('id, assignment_id, user_id, submitted_at')
        .in('assignment_id', assignmentIds).is('graded_at', null)
        .order('submitted_at', { ascending: true }).limit(8);
      if (!submissions?.length) { setQueue([]); return; }

      const userIds = [...new Set(submissions.map(s => s.user_id))];
      const { data: profiles } = await supabase.from('profiles').select('id, full_name').in('id', userIds);
      const profileMap = Object.fromEntries((profiles || []).map(p => [p.id, p.full_name || 'Student']));

      setQueue(submissions.map(s => {
        const aInfo = assignmentMap[s.assignment_id] || { title: 'Assignment', courseId: '' };
        return {
          id: s.id, studentName: profileMap[s.user_id] || 'Student',
          assignmentTitle: aInfo.title, courseTitle: courseMap[aInfo.courseId] || 'Course',
          submittedAt: s.submitted_at, courseId: aInfo.courseId,
        };
      }));
    };
    load();
  }, [user]);

  return (
    <Card className="border-border/50 bg-card shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <ClipboardCheck className="w-3.5 h-3.5 text-primary" />
            </div>
            Grading Queue
          </CardTitle>
          {queue.length > 0 && (
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-destructive/10 text-destructive animate-pulse">
              {queue.length} pending
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {queue.length === 0 ? (
          <div className="text-center py-6">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
              <span className="text-lg">✅</span>
            </div>
            <p className="text-sm text-muted-foreground">All caught up!</p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {queue.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/course/${item.courseId}/assignments`)}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-border/30 hover:border-primary/30 hover:bg-primary/5 active:scale-[0.98] transition-all text-left group"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <User className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
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
