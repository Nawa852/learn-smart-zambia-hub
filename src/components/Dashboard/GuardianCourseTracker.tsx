import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useGuardianData } from '@/hooks/useGuardianData';
import { GraduationCap, BookOpen } from 'lucide-react';

interface CourseProgress {
  title: string;
  progress: number;
  studentName: string;
}

export const GuardianCourseTracker = () => {
  const { students } = useGuardianData();
  const [courses, setCourses] = useState<CourseProgress[]>([]);

  useEffect(() => {
    if (!students.length) return;
    const all: CourseProgress[] = [];
    students.forEach(s => {
      s.enrollments.forEach(e => {
        all.push({ title: e.courseTitle, progress: e.progress, studentName: s.name });
      });
    });
    setCourses(all.sort((a, b) => a.progress - b.progress).slice(0, 6));
  }, [students]);

  if (courses.length === 0) return null;

  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-primary" /> Course Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {courses.map((c, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <BookOpen className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium text-foreground truncate">{c.title}</span>
              </div>
              <span className="text-xs font-bold text-foreground shrink-0 ml-2">{c.progress}%</span>
            </div>
            <Progress value={c.progress} className="h-1.5" />
            <p className="text-[10px] text-muted-foreground">{c.studentName}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
