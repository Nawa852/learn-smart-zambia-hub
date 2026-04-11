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
import { ArrowRight, Sparkles } from 'lucide-react';

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
  const primaryActions = getPrimaryNavigationByRole(userType as string).filter((item) => item.url !== '/dashboard').slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LogoLoader size="lg" text="Loading dashboard..." />
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
    <div className="min-h-screen bg-background">
      {showTour && <OnboardingTour role={userType} onComplete={() => setShowTour(false)} />}
      
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Welcome Card */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.1),transparent_60%)]" />
          <div className="relative px-6 py-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  {roleLabels[userType as string] || 'Workspace'}
                </div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">
                  {greeting()}, {userName.split(' ')[0]} 👋
                </h1>
                <p className="text-sm text-muted-foreground max-w-md">
                  Jump into your workspace — everything you need is just a click away.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {primaryActions.map((item) => (
                  <Button
                    key={item.url}
                    variant="secondary"
                    size="sm"
                    className="gap-2 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all"
                    onClick={() => navigate(item.url)}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.shortTitle ?? item.title}
                    <ArrowRight className="w-3 h-3 opacity-50" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Two-column layout: Dashboard + Stakeholder Bridge */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            {renderDashboardView()}
          </div>
          <div className="space-y-6">
            <StakeholderBridge role={userType as string} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
