import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CatalogCourse {
  id: string;
  title: string;
  description: string | null;
  subject: string | null;
  grade_level: string | null;
  thumbnail_url: string | null;
  created_by: string | null;
  created_at: string;
  enrollment_count: number;
  instructor_name: string;
}

export function useCourseCatalog() {
  const [courses, setCourses] = useState<CatalogCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCatalog();
  }, []);

  const fetchCatalog = async () => {
    setLoading(true);
    try {
      // Get published courses
      const { data: coursesData, error } = await supabase
        .from('courses')
        .select('id, title, description, subject, grade_level, thumbnail_url, created_by, created_at')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!coursesData || coursesData.length === 0) {
        setCourses([]);
        setLoading(false);
        return;
      }

      // Get enrollment counts
      const courseIds = coursesData.map(c => c.id);
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('course_id')
        .in('course_id', courseIds);

      const enrollmentCounts: Record<string, number> = {};
      (enrollments || []).forEach(e => {
        enrollmentCounts[e.course_id] = (enrollmentCounts[e.course_id] || 0) + 1;
      });

      // Get instructor names
      const creatorIds = [...new Set(coursesData.map(c => c.created_by).filter(Boolean))] as string[];
      let nameMap: Record<string, string> = {};
      if (creatorIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', creatorIds);
        (profiles || []).forEach(p => { nameMap[p.id] = p.full_name || 'Instructor'; });
      }

      const enriched: CatalogCourse[] = coursesData.map(c => ({
        ...c,
        enrollment_count: enrollmentCounts[c.id] || 0,
        instructor_name: c.created_by ? (nameMap[c.created_by] || 'Instructor') : 'Instructor',
      }));

      setCourses(enriched);
    } catch (err) {
      console.error('Error fetching course catalog:', err);
    } finally {
      setLoading(false);
    }
  };

  return { courses, loading, refetch: fetchCatalog };
}
