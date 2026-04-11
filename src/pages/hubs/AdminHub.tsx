import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabFromUrl } from '@/hooks/useTabFromUrl';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { LayoutDashboard, Users, BookOpen, Calendar, BarChart3 } from 'lucide-react';

const SchoolAdminDashboard = React.lazy(() => import('@/pages/SchoolAdminDashboard'));
const AdminUserManagementPage = React.lazy(() => import('@/pages/AdminUserManagementPage'));
const AdminCurriculumPage = React.lazy(() => import('@/pages/AdminCurriculumPage'));
const AdminSchedulingPage = React.lazy(() => import('@/pages/AdminSchedulingPage'));
const AdminAnalyticsPage = React.lazy(() => import('@/pages/AdminAnalyticsPage'));

const Loader = () => <div className="flex justify-center py-12"><LogoLoader text="Loading..." /></div>;

const tabs = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
  { id: 'scheduling', label: 'Scheduling', icon: Calendar },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const AdminHub = () => {
  const [tab, setTab] = useTabFromUrl('overview');

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">School Administration</h1>
        <p className="text-muted-foreground text-sm">Manage users, curriculum, scheduling, and analytics.</p>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full justify-start overflow-x-auto">
          {tabs.map(t => (
            <TabsTrigger key={t.id} value={t.id} className="gap-1.5">
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <Suspense fallback={<Loader />}>
          <TabsContent value="overview"><SchoolAdminDashboard /></TabsContent>
          <TabsContent value="users"><AdminUserManagementPage /></TabsContent>
          <TabsContent value="curriculum"><AdminCurriculumPage /></TabsContent>
          <TabsContent value="scheduling"><AdminSchedulingPage /></TabsContent>
          <TabsContent value="analytics"><AdminAnalyticsPage /></TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
};

export default AdminHub;
