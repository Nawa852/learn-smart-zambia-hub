import React from 'react';
import { HubPageLayout, HubTab } from '@/components/Layout/HubPageLayout';
import { Users, BarChart3, Shield, ClipboardCheck, Gift, MessageSquare } from 'lucide-react';

const tabs: HubTab[] = [
  { id: 'children', label: 'My Children', icon: Users, component: React.lazy(() => import('@/pages/ParentChildrenPage')) },
  { id: 'grades', label: 'Grades & Progress', icon: BarChart3, component: React.lazy(() => import('@/pages/ParentGradesPage')) },
  { id: 'homework', label: 'Homework', icon: ClipboardCheck, component: React.lazy(() => import('@/pages/GuardianHomeworkTrackerPage')) },
  { id: 'rewards', label: 'Rewards', icon: Gift, component: React.lazy(() => import('@/pages/GuardianRewardSystemPage')) },
  { id: 'activity', label: 'Activity Feed', icon: MessageSquare, component: React.lazy(() => import('@/pages/GuardianActivityFeedPage')) },
  { id: 'controls', label: 'Parental Controls', icon: Shield, component: React.lazy(() => import('@/pages/ParentalControlsPage')) },
];

const FamilyHub = () => (
  <HubPageLayout
    title="Family Dashboard"
    subtitle="Monitor your child's progress, homework, and manage screen time controls."
    icon={Users}
    tabs={tabs}
    defaultTab="children"
    quickLinks={[
      { label: 'Message Teacher', href: '/connect?tab=messenger', icon: MessageSquare },
      { label: 'View Reports', href: '/family?tab=grades', icon: BarChart3 },
    ]}
  />
);

export default FamilyHub;
