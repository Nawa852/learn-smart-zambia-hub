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

  const getColor = (progress: number) => {
    if (progress >= 70) return 'bg-accent/20 border-accent/30 text-accent';
    if (progress >= 40) return 'bg-warning/20 border-warning/30 text-warning';
    return 'bg-destructive/10 border-destructive/30 text-destructive';
  };

  if (classes.length === 0) return null;

  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" /> Class Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {classes.map((c) => (
          <div key={c.courseId} className={`flex items-center justify-between p-3 rounded-xl border ${getColor(c.avgProgress)}`}>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">{c.courseTitle}</p>
              <p className="text-[10px] text-muted-foreground">{c.totalStudents} students</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{c.avgProgress}%</span>
              {c.trend === 'up' && <TrendingUp className="w-4 h-4" />}
              {c.trend === 'down' && <TrendingDown className="w-4 h-4" />}
              {c.trend === 'flat' && <Minus className="w-4 h-4" />}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
