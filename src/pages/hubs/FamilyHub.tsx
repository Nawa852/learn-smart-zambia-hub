import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabFromUrl } from '@/hooks/useTabFromUrl';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { Users, BarChart3, Shield, ClipboardCheck, Gift, MessageSquare } from 'lucide-react';

const ParentChildrenPage = React.lazy(() => import('@/pages/ParentChildrenPage'));
const ParentGradesPage = React.lazy(() => import('@/pages/ParentGradesPage'));
const ParentalControlsPage = React.lazy(() => import('@/pages/ParentalControlsPage'));
const GuardianHomeworkTrackerPage = React.lazy(() => import('@/pages/GuardianHomeworkTrackerPage'));
const GuardianRewardSystemPage = React.lazy(() => import('@/pages/GuardianRewardSystemPage'));
const GuardianActivityFeedPage = React.lazy(() => import('@/pages/GuardianActivityFeedPage'));

const Loader = () => <div className="flex justify-center py-12"><LogoLoader text="Loading..." /></div>;

const tabs = [
  { id: 'children', label: 'My Children', icon: Users },
  { id: 'grades', label: 'Grades & Progress', icon: BarChart3 },
  { id: 'homework', label: 'Homework', icon: ClipboardCheck },
  { id: 'rewards', label: 'Rewards', icon: Gift },
  { id: 'activity', label: 'Activity Feed', icon: MessageSquare },
  { id: 'controls', label: 'Parental Controls', icon: Shield },
];

const FamilyHub = () => {
  const [tab, setTab] = useTabFromUrl('children');

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Family Dashboard</h1>
        <p className="text-muted-foreground text-sm">Monitor your child's progress, homework, and manage controls.</p>
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
          <TabsContent value="children"><ParentChildrenPage /></TabsContent>
          <TabsContent value="grades"><ParentGradesPage /></TabsContent>
          <TabsContent value="homework"><GuardianHomeworkTrackerPage /></TabsContent>
          <TabsContent value="rewards"><GuardianRewardSystemPage /></TabsContent>
          <TabsContent value="activity"><GuardianActivityFeedPage /></TabsContent>
          <TabsContent value="controls"><ParentalControlsPage /></TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
};

export default FamilyHub;
