import React from 'react';
import { useProfile } from '@/hooks/useProfile';
import { StudentDashboardView } from '@/components/Dashboard/StudentDashboardView';
import { TeacherDashboardView } from '@/components/Dashboard/TeacherDashboardView';
import { GuardianDashboardView } from '@/components/Dashboard/GuardianDashboardView';
import { InstitutionDashboardView } from '@/components/Dashboard/InstitutionDashboardView';
import { MedicalDashboardView } from '@/components/Dashboard/MedicalDashboardView';
import { EntrepreneurDashboardView } from '@/components/Dashboard/EntrepreneurDashboardView';
import { DeveloperDashboardView } from '@/components/Dashboard/DeveloperDashboardView';
import SkillsDashboardView from '@/components/Dashboard/SkillsDashboardView';
import CybersecurityDashboardView from '@/components/Dashboard/CybersecurityDashboardView';
import { LogoLoader } from '@/components/UI/LogoLoader';

const Dashboard = () => {
  const { profile, loading } = useProfile();

  const userName = profile?.full_name || 'Learner';
  const userType = profile?.role || 'student';

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LogoLoader size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  const renderDashboardView = () => {
    const role = userType as string;
    switch (role) {
      case 'teacher': return <TeacherDashboardView userName={userName} />;
      case 'guardian': return <GuardianDashboardView userName={userName} />;
      case 'institution': return <InstitutionDashboardView userName={userName} />;
      case 'doctor': return <MedicalDashboardView userName={userName} />;
      case 'entrepreneur': return <EntrepreneurDashboardView userName={userName} />;
      case 'developer': return <DeveloperDashboardView userName={userName} />;
      case 'skills': return <SkillsDashboardView />;
      case 'cybersecurity': return <CybersecurityDashboardView />;
      case 'student':
      default: return <StudentDashboardView userName={userName} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {renderDashboardView()}
      </div>
    </div>
  );
};

export default Dashboard;
