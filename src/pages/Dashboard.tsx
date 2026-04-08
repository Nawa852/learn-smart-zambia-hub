import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { OnboardingTour } from '@/components/Dashboard/OnboardingTour';
import { Button } from '@/components/ui/button';
import { getPrimaryNavigationByRole, roleLabels } from '@/components/Sidebar/sidebarConfig';

const Dashboard = () => {
  const { profile, loading } = useProfile();
  const navigate = useNavigate();
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    if (!loading && profile) {
      const shouldShow = localStorage.getItem('edu-zambia-show-tour') === 'true';
      const alreadyDone = localStorage.getItem('edu-zambia-tour-completed') === 'true';
      if (shouldShow && !alreadyDone) {
        setShowTour(true);
      }
    }
  }, [loading, profile]);

  const userName = profile?.full_name || 'Learner';
  const userType = profile?.role || 'student';
  const primaryActions = getPrimaryNavigationByRole(userType as string).filter((item) => item.url !== '/dashboard').slice(0, 4);

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
      {showTour && (
        <OnboardingTour 
          role={userType} 
          onComplete={() => setShowTour(false)} 
        />
      )}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 rounded-3xl border border-border bg-card px-5 py-5 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {roleLabels[userType as string] || 'Workspace'} workspace
              </p>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Welcome back, {userName.split(' ')[0]}</h1>
                <p className="text-sm text-muted-foreground">
                  Use these main areas to jump straight into learning, teaching, communication, or your personal setup.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {primaryActions.map((item) => (
                <Button key={item.url} variant="secondary" className="justify-start gap-2" onClick={() => navigate(item.url)}>
                  <item.icon className="w-4 h-4" />
                  {item.shortTitle ?? item.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
        {renderDashboardView()}
      </div>
    </div>
  );
};

export default Dashboard;
