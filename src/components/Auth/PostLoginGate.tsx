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
  const setupDone = !!(profile as any)?.device_setup_complete;
  const role = profile?.role || 'student';

  // Roles that should be routed through their tailored onboarding wizard
  const onboardableRoles = ['student','teacher','guardian','doctor','entrepreneur','developer','skills','cybersecurity'];
  const needsSetup = onboardableRoles.includes(role);

  // Students additionally need a study schedule
  const isStudentLike = ['student','doctor','developer','skills','cybersecurity'].includes(role);
  const studentNeedsSchedule = isStudentLike && schedules.length === 0;

  if (needsSetup && (!profileComplete || !setupDone || studentNeedsSchedule)) {
    return <Navigate to="/setup" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PostLoginGate;
