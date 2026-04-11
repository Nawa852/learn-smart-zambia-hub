import React from 'react';
import { HubPageLayout, HubTab } from '@/components/Layout/HubPageLayout';
import { MessageSquare, Users, Globe, Heart } from 'lucide-react';

const tabs: HubTab[] = [
  { id: 'messenger', label: 'Messenger', icon: MessageSquare, component: React.lazy(() => import('@/pages/MessengerPage')) },
  { id: 'groups', label: 'Study Groups', icon: Users, component: React.lazy(() => import('@/pages/StudyGroupsPage')) },
  { id: 'community', label: 'Community', icon: Globe, component: React.lazy(() => import('@/pages/CommunityHub')) },
  { id: 'mentorship', label: 'Mentorship', icon: Heart, component: React.lazy(() => import('@/pages/MentorshipHubPage')) },
];

const ConnectHub = () => (
  <HubPageLayout
    title="Connect"
    subtitle="Chat, collaborate, and learn with teachers, peers, and mentors."
    icon={Users}
    tabs={tabs}
    defaultTab="messenger"
    quickLinks={[
      { label: 'Study Groups', href: '/connect?tab=groups', icon: Users },
      { label: 'Find Mentors', href: '/connect?tab=mentorship', icon: Heart },
    ]}
  />
);

export default ConnectHub;
