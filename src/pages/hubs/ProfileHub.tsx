import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabFromUrl } from '@/hooks/useTabFromUrl';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { User, Settings, Bell, Shield } from 'lucide-react';

const ProfilePage = React.lazy(() => import('@/pages/ProfilePage'));
const SettingsPage = React.lazy(() => import('@/pages/SettingsPage'));
const NotificationsPage = React.lazy(() => import('@/pages/NotificationsPage'));

const Loader = () => <div className="flex justify-center py-12"><LogoLoader text="Loading..." /></div>;

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

const ProfileHub = () => {
  const [tab, setTab] = useTabFromUrl('profile');

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Account</h1>
        <p className="text-muted-foreground text-sm">Manage your profile, settings, and preferences.</p>
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
          <TabsContent value="profile"><ProfilePage /></TabsContent>
          <TabsContent value="settings"><SettingsPage /></TabsContent>
          <TabsContent value="notifications"><NotificationsPage /></TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
};

export default ProfileHub;
