import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface CourseProgress {
  id: string;
  title: string;
  subject: string | null;
  totalLessons: number;
  completedLessons: number;
  lastActivity: string | null;
}

export const ReadingProgressTracker = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseProgress[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('course_id, courses(id, title, subject)')
        .eq('user_id', user.id);

      if (!enrollments?.length) return;
      const courseIds = enrollments.map(e => e.course_id);

      const [{ data: lessons }, { data: completions }] = await Promise.all([
        supabase.from('lessons').select('id, course_id').in('course_id', courseIds),
        supabase.from('lesson_completions').select('course_id, completed_at').eq('user_id', user.id).in('course_id', courseIds),
      ]);

      const lessonCount: Record<string, number> = {};
      lessons?.forEach(l => { lessonCount[l.course_id] = (lessonCount[l.course_id] || 0) + 1; });

      const completionCount: Record<string, number> = {};
      const lastActivity: Record<string, string> = {};
      completions?.forEach(c => {
        completionCount[c.course_id] = (completionCount[c.course_id] || 0) + 1;
        if (!lastActivity[c.course_id] || c.completed_at > lastActivity[c.course_id]) {
          lastActivity[c.course_id] = c.completed_at;
        }
      });

      const result: CourseProgress[] = enrollments
        .map((e: any) => ({
          id: e.courses?.id || e.course_id,
          title: e.courses?.title || 'Course',
          subject: e.courses?.subject,
          totalLessons: lessonCount[e.course_id] || 0,
          completedLessons: completionCount[e.course_id] || 0,
          lastActivity: lastActivity[e.course_id] || null,
        }))
        .filter(c => c.totalLessons > 0 && c.completedLessons < c.totalLessons)
        .sort((a, b) => (b.completedLessons / b.totalLessons) - (a.completedLessons / a.totalLessons))
        .slice(0, 4);

      setCourses(result);
    };
    load();
  }, [user]);

  if (courses.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border/50 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-green-500" />
        <h3 className="text-sm font-semibold text-foreground">Continue Learning</h3>
      </div>
      <div className="divide-y divide-border/30">
        {courses.map(c => {
          const pct = Math.round((c.completedLessons / c.totalLessons) * 100);
          return (
            <button
              key={c.id}
              onClick={() => navigate(`/course/${c.id}`)}
              className="w-full px-4 py-3 text-left hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-medium text-foreground truncate flex-1">{c.title}</p>
                <span className="text-xs font-semibold text-primary ml-2">{pct}%</span>
              </div>
              <Progress value={pct} className="h-1.5 mb-1.5" />
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {c.completedLessons}/{c.totalLessons} lessons
                </span>
                {c.lastActivity && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(c.lastActivity).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
