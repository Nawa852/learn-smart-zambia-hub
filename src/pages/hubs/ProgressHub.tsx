import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabFromUrl } from '@/hooks/useTabFromUrl';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { BarChart3, Trophy, Award, FileText } from 'lucide-react';

const LearningAnalytics = React.lazy(() => import('@/pages/LearningAnalytics'));
const Achievements = React.lazy(() => import('@/pages/Achievements'));
const LeaderboardPage = React.lazy(() => import('@/pages/LeaderboardPage'));
const CertificatesPage = React.lazy(() => import('@/pages/CertificatesPage'));

const Loader = () => <div className="flex justify-center py-12"><LogoLoader text="Loading..." /></div>;

const tabs = [
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'leaderboard', label: 'Leaderboard', icon: Award },
  { id: 'certificates', label: 'Certificates', icon: FileText },
];

const ProgressHub = () => {
  const [tab, setTab] = useTabFromUrl('analytics');

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Progress</h1>
        <p className="text-muted-foreground text-sm">Track your learning journey and achievements.</p>
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
          <TabsContent value="analytics"><LearningAnalytics /></TabsContent>
          <TabsContent value="achievements"><Achievements /></TabsContent>
          <TabsContent value="leaderboard"><LeaderboardPage /></TabsContent>
          <TabsContent value="certificates"><CertificatesPage /></TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
};

export default ProgressHub;
