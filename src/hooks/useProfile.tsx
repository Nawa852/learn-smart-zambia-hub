import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

type AppRole = 'student' | 'teacher' | 'guardian' | 'institution' | 'ministry' | 'doctor' | 'entrepreneur' | 'developer';

export interface Profile {
  id: string;
  email?: string;
  full_name: string | null;
  avatar_url: string | null;
  role: AppRole;
  user_type?: string; // backward compat alias for role
  bio: string | null;
  phone: string | null;
  school: string | null;
  grade: string | null;
  grade_level?: string | null; // backward compat alias for grade
  province: string | null;
  onboarding_completed?: boolean;
  created_at: string;
  updated_at: string;
}

const validRoles: AppRole[] = ['student', 'teacher', 'guardian', 'institution', 'ministry', 'doctor', 'entrepreneur', 'developer'];

function toAppRole(value: string | null | undefined): AppRole {
  if (value && validRoles.includes(value as AppRole)) return value as AppRole;
  return 'student';
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error || !data) {
        // Fallback to user metadata
        const role = toAppRole(user.user_metadata?.user_type || localStorage.getItem('edu-zambia-user-type'));
        setProfile({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
          avatar_url: user.user_metadata?.avatar_url || null,
          role,
          user_type: role,
          bio: null,
          phone: null,
          school: null,
          grade: null,
          grade_level: null,
          province: null,
          onboarding_completed: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      } else {
        const role = toAppRole(data.role);
        setProfile({
          ...data,
          role,
          email: user.email,
          user_type: role,
          grade_level: data.grade,
          onboarding_completed: !!data.full_name,
        });
        localStorage.setItem('edu-zambia-user-type', role);
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { success: false, error: 'Not logged in' };

    try {
      // Map backward compat fields to real columns
      const dbUpdates: Record<string, any> = { updated_at: new Date().toISOString() };
      if (updates.full_name !== undefined) dbUpdates.full_name = updates.full_name;
      if (updates.avatar_url !== undefined) dbUpdates.avatar_url = updates.avatar_url;
      if (updates.bio !== undefined) dbUpdates.bio = updates.bio;
      if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
      if (updates.school !== undefined) dbUpdates.school = updates.school;
      if (updates.province !== undefined) dbUpdates.province = updates.province;
      if (updates.grade !== undefined) dbUpdates.grade = updates.grade;
      if (updates.grade_level !== undefined) dbUpdates.grade = updates.grade_level;
      if (updates.role !== undefined) dbUpdates.role = updates.role;
      if (updates.user_type !== undefined) dbUpdates.role = toAppRole(updates.user_type);

      const { error } = await supabase
        .from('profiles')
        .update(dbUpdates)
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);

      if (updates.role || updates.user_type) {
        localStorage.setItem('edu-zambia-user-type', dbUpdates.role);
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error };
    }
  };

  return { profile, loading, updateProfile, refetch: fetchProfile };
};
