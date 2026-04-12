import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { Users, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ClassData {
  courseId: string;
  courseTitle: string;
  totalStudents: number;
  avgProgress: number;
  trend: 'up' | 'down' | 'flat';
}

export const ClassPerformanceHeatmap = () => {
  const { user } = useSecureAuth();
  const [classes, setClasses] = useState<ClassData[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data: courses } = await supabase
        .from('courses')
        .select('id, title')
        .eq('created_by', user.id)
        .eq('is_published', true);

      if (!courses?.length) return;

      const classData: ClassData[] = [];
      for (const course of courses.slice(0, 6)) {
        const { data: enrollments } = await supabase
          .from('enrollments')
          .select('progress')
          .eq('course_id', course.id);

        const total = enrollments?.length || 0;
        const avg = total > 0 ? Math.round(enrollments!.reduce((s, e) => s + (e.progress || 0), 0) / total) : 0;

        classData.push({
          courseId: course.id,
          courseTitle: course.title,
          totalStudents: total,
          avgProgress: avg,
          trend: avg > 60 ? 'up' : avg > 30 ? 'flat' : 'down',
        });
      }
      setClasses(classData);
    };
    load();
  }, [user]);

  const getProgressStyle = (progress: number) => {
    if (progress >= 70) return 'bg-accent/15 border-accent/25';
    if (progress >= 40) return 'bg-warning/15 border-warning/25';
    return 'bg-destructive/10 border-destructive/20';
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-accent';
    if (trend === 'down') return 'text-destructive';
    return 'text-muted-foreground';
  };

  if (classes.length === 0) return null;

  return (
    <Card className="border-border/50 bg-card shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="w-3.5 h-3.5 text-primary" />
          </div>
          Class Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {classes.map((c) => (
          <div
            key={c.courseId}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 hover:scale-[1.01] ${getProgressStyle(c.avgProgress)}`}
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">{c.courseTitle}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{c.totalStudents} students enrolled</p>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <span className="text-base font-bold text-foreground">{c.avgProgress}%</span>
              <div className={getTrendColor(c.trend)}>
                {c.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                {c.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                {c.trend === 'flat' && <Minus className="w-4 h-4" />}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
