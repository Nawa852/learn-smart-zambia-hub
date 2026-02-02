import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';

interface Profile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  user_type: string;
  grade_level?: string;
  onboarding_completed?: boolean;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Get profile from localStorage/onboarding data
  const localProfile = useMemo(() => {
    try {
      const onboardingData = JSON.parse(localStorage.getItem('edu-zambia-onboarding') || '{}');
      const userType = localStorage.getItem('edu-zambia-user-type') || 'student';
      
      if (user) {
        return {
          id: user.id,
          email: user.email,
          full_name: onboardingData.fullName || user.email?.split('@')[0] || 'User',
          avatar_url: undefined,
          user_type: userType,
          grade_level: onboardingData.gradeLevel,
          onboarding_completed: !!onboardingData.fullName,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }
      return null;
    } catch {
      return null;
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setProfile(localProfile);
      setLoading(false);
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user, localProfile]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { success: false, error: 'Not logged in' };

    try {
      // Update local state
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      // Store in localStorage for persistence
      const onboardingData = JSON.parse(localStorage.getItem('edu-zambia-onboarding') || '{}');
      if (updates.full_name) onboardingData.fullName = updates.full_name;
      if (updates.grade_level) onboardingData.gradeLevel = updates.grade_level;
      localStorage.setItem('edu-zambia-onboarding', JSON.stringify(onboardingData));
      
      if (updates.user_type) {
        localStorage.setItem('edu-zambia-user-type', updates.user_type);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error };
    }
  };

  const refetch = () => {
    setProfile(localProfile);
  };

  return { profile, loading, updateProfile, refetch };
};
