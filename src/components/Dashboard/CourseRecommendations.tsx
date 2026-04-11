import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RecommendedCourse {
  id: string;
  title: string;
  subject: string | null;
  description: string | null;
  enrolled_count: number;
}

export const CourseRecommendations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<RecommendedCourse[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      // Get user's enrolled course IDs
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', user.id);

      const enrolledIds = new Set(enrollments?.map(e => e.course_id) || []);

      // Get popular published courses
      const { data: allCourses } = await supabase
        .from('courses')
        .select('id, title, subject, description')
        .eq('is_published', true)
        .limit(20);

      // Get enrollment counts
      const { data: counts } = await supabase
        .from('enrollments')
        .select('course_id');

      const countMap: Record<string, number> = {};
      counts?.forEach(c => { countMap[c.course_id] = (countMap[c.course_id] || 0) + 1; });

      const recommended = (allCourses || [])
        .filter(c => !enrolledIds.has(c.id))
        .map(c => ({ ...c, enrolled_count: countMap[c.id] || 0 }))
        .sort((a, b) => b.enrolled_count - a.enrolled_count)
        .slice(0, 3);

      setCourses(recommended);
    };
    load();
  }, [user]);

  if (courses.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border/50 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <h3 className="text-sm font-semibold text-foreground">Recommended for You</h3>
      </div>
      <div className="divide-y divide-border/30">
        {courses.map(course => (
          <button
            key={course.id}
            onClick={() => navigate(`/course/${course.id}`)}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-4.5 h-4.5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{course.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                {course.subject && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{course.subject}</Badge>}
                <span className="text-[10px] text-muted-foreground">{course.enrolled_count} enrolled</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};
