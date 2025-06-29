
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';

export interface LearningAnalytics {
  totalStudyTime: number;
  coursesCompleted: number;
  coursesInProgress: number;
  averageQuizScore: number;
  streakDays: number;
  weeklyProgress: Array<{
    date: string;
    minutes: number;
  }>;
  subjectBreakdown: Record<string, number>;
  recentAchievements: Array<{
    type: string;
    title: string;
    date: string;
  }>;
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<LearningAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchAnalytics = async () => {
    if (!user) return;

    try {
      // Fetch study sessions
      const { data: studySessions } = await supabase
        .from('study_sessions')
        .select('*')
        .eq('user_id', user.id);

      // Fetch enrollments
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id);

      // Fetch quiz attempts
      const { data: quizAttempts } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', user.id);

      // Calculate analytics
      const totalStudyTime = studySessions?.reduce(
        (sum, session) => sum + session.duration_minutes, 0
      ) || 0;

      const coursesCompleted = enrollments?.filter(
        e => e.completed_at !== null
      ).length || 0;

      const coursesInProgress = enrollments?.filter(
        e => e.completed_at === null
      ).length || 0;

      const averageQuizScore = quizAttempts?.length 
        ? quizAttempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / quizAttempts.length
        : 0;

      // Calculate weekly progress
      const weeklyProgress = [];
      const now = new Date();
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayMinutes = studySessions?.filter(session => 
          session.created_at.startsWith(dateStr)
        ).reduce((sum, session) => sum + session.duration_minutes, 0) || 0;

        weeklyProgress.push({
          date: dateStr,
          minutes: dayMinutes
        });
      }

      // Calculate subject breakdown
      const subjectBreakdown = studySessions?.reduce((breakdown, session) => {
        if (session.subject) {
          breakdown[session.subject] = (breakdown[session.subject] || 0) + session.duration_minutes;
        }
        return breakdown;
      }, {} as Record<string, number>) || {};

      // Calculate streak days
      let streakDays = 0;
      const sortedSessions = studySessions?.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ) || [];

      if (sortedSessions.length > 0) {
        const today = new Date();
        let currentDate = new Date(today);
        
        // Check if studied today or yesterday
        const lastSessionDate = new Date(sortedSessions[0].created_at);
        const daysDiff = Math.floor((today.getTime() - lastSessionDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff <= 1) {
          const studyDates = new Set(
            sortedSessions.map(session => session.created_at.split('T')[0])
          );

          while (studyDates.has(currentDate.toISOString().split('T')[0])) {
            streakDays++;
            currentDate.setDate(currentDate.getDate() - 1);
          }
        }
      }

      // Mock recent achievements (could be expanded with real achievement system)
      const recentAchievements = [
        ...(coursesCompleted > 0 ? [{
          type: 'course_completion',
          title: 'Course Completed',
          date: new Date().toISOString()
        }] : []),
        ...(streakDays >= 7 ? [{
          type: 'streak',
          title: '7-Day Study Streak',
          date: new Date().toISOString()
        }] : []),
        ...(totalStudyTime >= 60 ? [{
          type: 'study_time',
          title: '1 Hour Study Milestone',
          date: new Date().toISOString()
        }] : [])
      ];

      setAnalytics({
        totalStudyTime,
        coursesCompleted,
        coursesInProgress,
        averageQuizScore,
        streakDays,
        weeklyProgress,
        subjectBreakdown,
        recentAchievements
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [user]);

  return {
    analytics,
    loading,
    refetch: fetchAnalytics
  };
};
