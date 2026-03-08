import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useProfile } from '@/hooks/useProfile';
import { useStudySchedule } from '@/hooks/useStudySchedule';
import { LogoLoader } from '@/components/UI/LogoLoader';

interface PostLoginGateProps {
  children: React.ReactNode;
}

const PostLoginGate: React.FC<PostLoginGateProps> = ({ children }) => {
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const { schedules, loading: schedulesLoading } = useStudySchedule();
  const location = useLocation();

  // Don't gate these paths
  const exemptPaths = ['/setup', '/login', '/signup', '/auth', '/password-reset', '/settings', '/profile'];
  if (exemptPaths.some(p => location.pathname.startsWith(p))) {
    return <>{children}</>;
  }

  if (!user || profileLoading || schedulesLoading) {
    return <>{children}</>;
  }

  // Check completeness conditions
  const profileComplete = !!(profile?.full_name?.trim());
  const deviceSetup = !!(profile as any)?.device_setup_complete;
  const hasSchedule = schedules.length > 0;

  // Only enforce for students
  const isStudent = profile?.role === 'student';

  if (isStudent && (!profileComplete || !deviceSetup || !hasSchedule)) {
    return <Navigate to="/setup" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PostLoginGate;
