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
import { StakeholderBridge } from '@/components/Dashboard/StakeholderBridge';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { OnboardingTour } from '@/components/Dashboard/OnboardingTour';
import { Button } from '@/components/ui/button';
import { getPrimaryNavigationByRole, roleLabels } from '@/components/Sidebar/sidebarConfig';
import { ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { profile, loading } = useProfile();
  const navigate = useNavigate();
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    if (!loading && profile) {
      const shouldShow = localStorage.getItem('edu-zambia-show-tour') === 'true';
      const alreadyDone = localStorage.getItem('edu-zambia-tour-completed') === 'true';
      if (shouldShow && !alreadyDone) setShowTour(true);
    }
  }, [loading, profile]);

  const userName = profile?.full_name || 'Learner';
  const userType = profile?.role || 'student';
  const primaryActions = getPrimaryNavigationByRole(userType as string).filter((item) => item.url !== '/dashboard').slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LogoLoader size="lg" text="Loading your workspace..." />
      </div>
    );
  }

  const renderDashboardView = () => {
    switch (userType as string) {
      case 'teacher': return <TeacherDashboardView userName={userName} />;
      case 'guardian': return <GuardianDashboardView userName={userName} />;
      case 'institution': return <InstitutionDashboardView userName={userName} />;
      case 'doctor': return <MedicalDashboardView userName={userName} />;
      case 'entrepreneur': return <EntrepreneurDashboardView userName={userName} />;
      case 'developer': return <DeveloperDashboardView userName={userName} />;
      case 'skills': return <SkillsDashboardView />;
      case 'cybersecurity': return <CybersecurityDashboardView />;
      default: return <StudentDashboardView userName={userName} />;
    }
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-5 lg:space-y-6">
      {showTour && <OnboardingTour role={userType} onComplete={() => setShowTour(false)} />}
      
      {/* Hero — clean, minimal */}
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-accent/4" />
        <div className="relative px-4 py-5 lg:px-6 lg:py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] text-primary font-semibold uppercase tracking-[0.15em] mb-1">
                {roleLabels[userType as string] || 'Workspace'}
              </p>
              <h1 className="text-xl lg:text-2xl font-bold text-foreground">
                {greeting()}, {userName.split(' ')[0]}
              </h1>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                Your workspace is ready. Pick up where you left off.
              </p>
            </div>

            {/* Quick actions */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 -mb-1">
              {primaryActions.map((item) => (
                <Button
                  key={item.url}
                  variant="secondary"
                  size="sm"
                  className="gap-1.5 rounded-xl border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all whitespace-nowrap shrink-0 h-9 text-xs font-medium"
                  onClick={() => navigate(item.url)}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.shortTitle ?? item.title}
                  <ArrowRight className="w-3 h-3 opacity-30" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-6">
        <div className="xl:col-span-2">
          {renderDashboardView()}
        </div>
        <div className="space-y-5">
          <StakeholderBridge role={userType as string} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
