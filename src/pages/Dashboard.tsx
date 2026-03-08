import React, { useState, useEffect } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { StudentDashboardView } from '@/components/Dashboard/StudentDashboardView';
import { TeacherDashboardView } from '@/components/Dashboard/TeacherDashboardView';
import { GuardianDashboardView } from '@/components/Dashboard/GuardianDashboardView';
import { InstitutionDashboardView } from '@/components/Dashboard/InstitutionDashboardView';
import { MedicalDashboardView } from '@/components/Dashboard/MedicalDashboardView';
import { EntrepreneurDashboardView } from '@/components/Dashboard/EntrepreneurDashboardView';
import { DeveloperDashboardView } from '@/components/Dashboard/DeveloperDashboardView';

const Dashboard = () => {
  const { profile, loading } = useProfile();

  const userName = profile?.full_name || 'Learner';
  const userType = profile?.role || 'student';

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl px-4">
          <div className="h-24 bg-muted rounded-xl" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="h-20 bg-muted rounded-xl" />)}
          </div>
        </div>
      </div>
    );
  }

  const renderDashboardView = () => {
    switch (userType) {
      case 'teacher': return <TeacherDashboardView userName={userName} />;
      case 'guardian': return <GuardianDashboardView userName={userName} />;
      case 'institution': return <InstitutionDashboardView userName={userName} />;
      case 'doctor': return <MedicalDashboardView userName={userName} />;
      case 'entrepreneur': return <EntrepreneurDashboardView userName={userName} />;
      case 'developer': return <DeveloperDashboardView userName={userName} />;
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
