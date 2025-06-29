
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { toast } from 'sonner';

export interface StudySession {
  id: string;
  user_id: string;
  course_id: string | null;
  subject: string | null;
  duration_minutes: number;
  notes: string | null;
  created_at: string;
}

export const useStudySessions = () => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSessions = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('study_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching study sessions:', error);
      toast.error('Failed to fetch study sessions');
    } finally {
      setLoading(false);
    }
  };

  const createSession = async (sessionData: {
    course_id?: string;
    subject?: string;
    duration_minutes: number;
    notes?: string;
  }) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('study_sessions')
        .insert([{
          ...sessionData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      setSessions(prev => [data, ...prev]);
      toast.success('Study session recorded successfully');
      return data;
    } catch (error) {
      console.error('Error creating study session:', error);
      toast.error('Failed to record study session');
      return null;
    }
  };

  const getStudyStats = () => {
    const totalMinutes = sessions.reduce((sum, session) => sum + session.duration_minutes, 0);
    const totalHours = Math.round(totalMinutes / 60 * 10) / 10;
    const sessionsThisWeek = sessions.filter(session => {
      const sessionDate = new Date(session.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return sessionDate >= weekAgo;
    }).length;

    const subjectStats = sessions.reduce((stats, session) => {
      if (session.subject) {
        stats[session.subject] = (stats[session.subject] || 0) + session.duration_minutes;
      }
      return stats;
    }, {} as Record<string, number>);

    return {
      totalHours,
      totalSessions: sessions.length,
      sessionsThisWeek,
      subjectStats
    };
  };

  useEffect(() => {
    fetchSessions();
  }, [user]);

  return {
    sessions,
    loading,
    createSession,
    getStudyStats,
    refetch: fetchSessions
  };
};
