import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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

  const getProgressColor = (p: number) => {
    if (p >= 70) return 'text-accent';
    if (p >= 40) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <Card className="border-border/50 bg-card shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <GraduationCap className="w-3.5 h-3.5 text-primary" />
          </div>
          Course Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {courses.map((c, i) => (
          <div key={i} className="space-y-1.5 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center shrink-0">
                  <BookOpen className="w-3 h-3 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground truncate">{c.title}</span>
              </div>
              <span className={`text-xs font-bold shrink-0 ml-2 ${getProgressColor(c.progress)}`}>{c.progress}%</span>
            </div>
            <Progress value={c.progress} className="h-1.5" />
            <p className="text-[10px] text-muted-foreground pl-8">{c.studentName}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
