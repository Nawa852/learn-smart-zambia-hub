import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { RoleBasedSidebar } from '@/components/Sidebar/RoleBasedSidebar';
import { TopNavbar } from '@/components/Layout/TopNavbar';
import { useSecurityAlerts } from '@/hooks/useSecurityAlerts';
import { useStudySchedule } from '@/hooks/useStudySchedule';
import { Button } from '@/components/ui/button';
import { Calendar, Play, X } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useSecurityAlerts();
  const { getActiveNow } = useStudySchedule();
  const navigate = useNavigate();
  const [activeSchedule, setActiveSchedule] = useState<ReturnType<typeof getActiveNow>>(undefined);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const check = () => setActiveSchedule(getActiveNow());
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [getActiveNow]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <RoleBasedSidebar />
        <div className="flex-1 flex flex-col">
          <TopNavbar />
          {/* Schedule enforcement banner */}
          {activeSchedule && !dismissed && (
            <div className="bg-primary/10 border-b border-primary/30 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">It's study time for <strong>{activeSchedule.subject}</strong>!</span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => navigate(`/focus-mode?subject=${encodeURIComponent(activeSchedule.subject)}`)}>
                  <Play className="w-3 h-3 mr-1" />Start Focus
                </Button>
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setDismissed(true)}>
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
          <footer className="border-t bg-card/50 backdrop-blur-sm p-4">
            <div className="text-center text-sm text-muted-foreground">
              Powered by{' '}
              <span className="font-semibold gradient-text-bright-sphere">
                Edu Zambia
              </span>{' '}
              - Smart Learning for Zambia
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};
