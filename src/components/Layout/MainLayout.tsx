import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { TopNavbar } from '@/components/Layout/TopNavbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <TopNavbar />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
          <footer className="border-t bg-card/50 backdrop-blur-sm p-4">
            <div className="text-center text-sm text-muted-foreground">
              Powered by{' '}
              <span className="font-semibold gradient-text-bright-sphere">
                Bright Sphere
              </span>{' '}
              - Educational Innovation for Zambia
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};