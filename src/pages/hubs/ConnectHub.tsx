import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabFromUrl } from '@/hooks/useTabFromUrl';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { MessageSquare, Users, Globe, Heart } from 'lucide-react';

const MessengerPage = React.lazy(() => import('@/pages/MessengerPage'));
const StudyGroupsPage = React.lazy(() => import('@/pages/StudyGroupsPage'));
const CommunityHub = React.lazy(() => import('@/pages/CommunityHub'));
const MentorshipHubPage = React.lazy(() => import('@/pages/MentorshipHubPage'));

const Loader = () => <div className="flex justify-center py-12"><LogoLoader text="Loading..." /></div>;

const tabs = [
  { id: 'messenger', label: 'Messenger', icon: MessageSquare },
  { id: 'groups', label: 'Study Groups', icon: Users },
  { id: 'community', label: 'Community', icon: Globe },
  { id: 'mentorship', label: 'Mentorship', icon: Heart },
];

const ConnectHub = () => {
  const [tab, setTab] = useTabFromUrl('messenger');

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Connect</h1>
        <p className="text-muted-foreground text-sm">Chat, collaborate, and learn with others.</p>
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
          <TabsContent value="messenger"><MessengerPage /></TabsContent>
          <TabsContent value="groups"><StudyGroupsPage /></TabsContent>
          <TabsContent value="community"><CommunityHub /></TabsContent>
          <TabsContent value="mentorship"><MentorshipHubPage /></TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
};

export default ConnectHub;
