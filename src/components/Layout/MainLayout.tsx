
import React from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import Header from '@/components/Header';
import AppSidebar from '@/components/AppSidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showSidebar = true }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {user && showSidebar && (
          <AppSidebar />
        )}
        <main className={`flex-1 ${user && showSidebar ? 'ml-0' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
