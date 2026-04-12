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
  const { user, isDemo } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const { schedules, loading: schedulesLoading } = useStudySchedule();
  const location = useLocation();

  // Demo mode skips all gates
  if (isDemo) return <>{children}</>;

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

  // Enforce setup for learner-type roles (not institution/ministry)
  const exemptRoles = ['institution', 'ministry'];
  const needsSetup = !exemptRoles.includes(profile?.role || '');

  if (needsSetup && (!profileComplete || !deviceSetup || !hasSchedule)) {
    return <Navigate to="/setup" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PostLoginGate;
