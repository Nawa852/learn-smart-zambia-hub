
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { toast } from 'sonner';

export interface Assignment {
  id: string;
  course_id: string | null;
  title: string;
  description: string | null;
  due_date: string | null;
  points: number | null;
  created_at: string;
  updated_at: string;
}

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  user_id: string;
  content: string | null;
  file_url: string | null;
  submitted_at: string | null;
  grade: number | null;
  feedback: string | null;
  graded_at: string | null;
  graded_by: string | null;
}

export const useAssignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchAssignments = async () => {
    try {
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .order('due_date', { ascending: true });

      if (error) throw error;
      setAssignments(data || []);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      toast.error('Failed to fetch assignments');
    }
  };

  const fetchSubmissions = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('assignment_submissions')
        .select('*')
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  const createAssignment = async (assignmentData: Omit<Assignment, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('assignments')
        .insert([assignmentData])
        .select()
        .single();

      if (error) throw error;
      
      setAssignments(prev => [...prev, data]);
      toast.success('Assignment created successfully');
      return data;
    } catch (error) {
      console.error('Error creating assignment:', error);
      toast.error('Failed to create assignment');
      return null;
    }
  };

  const submitAssignment = async (submissionData: {
    assignment_id: string;
    content?: string;
    file_url?: string;
  }) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('assignment_submissions')
        .insert([{
          ...submissionData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      setSubmissions(prev => [data, ...prev]);
      toast.success('Assignment submitted successfully');
      return data;
    } catch (error) {
      console.error('Error submitting assignment:', error);
      toast.error('Failed to submit assignment');
      return null;
    }
  };

  const gradeSubmission = async (submissionId: string, grade: number, feedback?: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('assignment_submissions')
        .update({
          grade,
          feedback,
          graded_at: new Date().toISOString(),
          graded_by: user.id
        })
        .eq('id', submissionId)
        .select()
        .single();

      if (error) throw error;
      
      setSubmissions(prev => prev.map(sub => sub.id === submissionId ? data : sub));
      toast.success('Assignment graded successfully');
      return data;
    } catch (error) {
      console.error('Error grading assignment:', error);
      toast.error('Failed to grade assignment');
      return null;
    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchSubmissions();
  }, [user]);

  return {
    assignments,
    submissions,
    loading,
    createAssignment,
    submitAssignment,
    gradeSubmission,
    refetch: () => {
      fetchAssignments();
      fetchSubmissions();
    }
  };
};
