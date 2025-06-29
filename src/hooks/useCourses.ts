
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { toast } from 'sonner';

export interface Course {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  category: string | null;
  difficulty_level: string | null;
  curriculum: string | null;
  grade: number | null;
  instructor_id: string | null;
  duration_hours: number | null;
  price: number | null;
  is_published: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  progress_percentage: number | null;
  completed_at: string | null;
}

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to fetch courses');
    }
  };

  const fetchEnrollments = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setEnrollments(data || []);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      toast.error('Failed to fetch enrollments');
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async (courseId: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .insert([{
          user_id: user.id,
          course_id: courseId
        }])
        .select()
        .single();

      if (error) throw error;
      
      setEnrollments(prev => [...prev, data]);
      toast.success('Successfully enrolled in course');
      return data;
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast.error('Failed to enroll in course');
      return null;
    }
  };

  const updateProgress = async (courseId: string, progressPercentage: number) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .update({ 
          progress_percentage: progressPercentage,
          ...(progressPercentage >= 100 && { completed_at: new Date().toISOString() })
        })
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .select()
        .single();

      if (error) throw error;
      
      setEnrollments(prev => prev.map(enrollment => 
        enrollment.course_id === courseId ? data : enrollment
      ));
      
      if (progressPercentage >= 100) {
        toast.success('Congratulations! Course completed!');
      }
      
      return data;
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
      return null;
    }
  };

  const getEnrolledCourses = () => {
    return courses.filter(course => 
      enrollments.some(enrollment => enrollment.course_id === course.id)
    );
  };

  const getCourseProgress = (courseId: string) => {
    const enrollment = enrollments.find(e => e.course_id === courseId);
    return enrollment?.progress_percentage || 0;
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, [user]);

  return {
    courses,
    enrollments,
    loading,
    enrollInCourse,
    updateProgress,
    getEnrolledCourses,
    getCourseProgress,
    refetch: () => {
      fetchCourses();
      fetchEnrollments();
    }
  };
};
