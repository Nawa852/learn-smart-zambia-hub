import React, { useState } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useProfile } from '@/hooks/useProfile';
import { StudentDashboardView } from '@/components/Dashboard/StudentDashboardView';
import { TeacherDashboardView } from '@/components/Dashboard/TeacherDashboardView';
import { GuardianDashboardView } from '@/components/Dashboard/GuardianDashboardView';
import { InstitutionDashboardView } from '@/components/Dashboard/InstitutionDashboardView';
import AIAPIStatus from '@/components/AI/AIAPIStatus';
import { QuickCommandCenter } from '@/components/BrightSphere/QuickCommandCenter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Brain, BarChart3, Command } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [commandCenterOpen, setCommandCenterOpen] = useState(false);

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandCenterOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const userName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userType = profile?.user_type || 'student';

  const renderDashboardView = () => {
    switch (userType) {
      case 'teacher':
        return <TeacherDashboardView userName={userName} />;
      case 'guardian':
        return <GuardianDashboardView userName={userName} />;
      case 'institution':
        return <InstitutionDashboardView userName={userName} />;
      case 'student':
      default:
        return <StudentDashboardView userName={userName} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <QuickCommandCenter isOpen={commandCenterOpen} onClose={() => setCommandCenterOpen(false)} />
      
      <Tabs defaultValue="dashboard" className="w-full">
        <div className="container mx-auto px-4 pt-6">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="ai-status" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI Status
              </TabsTrigger>
            </TabsList>
            <Button 
              variant="outline" 
              onClick={() => setCommandCenterOpen(true)}
              className="gap-2"
            >
              <Command className="w-4 h-4" />
              Quick Commands
              <kbd className="ml-2 px-2 py-1 bg-muted rounded text-xs">Ctrl+K</kbd>
            </Button>
          </div>
        </div>
        
        <TabsContent value="dashboard" className="mt-0">
          <div className="container mx-auto px-4 pb-8">
            {renderDashboardView()}
          </div>
        </TabsContent>
        
        <TabsContent value="ai-status" className="mt-0">
          <div className="container mx-auto px-4 pb-8">
            <AIAPIStatus />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
