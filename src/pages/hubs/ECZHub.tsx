import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabFromUrl } from '@/hooks/useTabFromUrl';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { FileText, Play, Video, BookOpen, FlaskConical, Target } from 'lucide-react';

const ECZPastPapersPage = React.lazy(() => import('@/pages/ECZPastPapersPage'));
const ECZExamSimulatorPage = React.lazy(() => import('@/pages/ECZExamSimulatorPage'));
const ECZVideoLibraryPage = React.lazy(() => import('@/pages/ECZVideoLibraryPage'));
const ECZResourcesExpandedPage = React.lazy(() => import('@/pages/ECZResourcesExpandedPage'));
const ECZPracticeQuizPage = React.lazy(() => import('@/pages/ECZPracticeQuizPage'));

const Loader = () => <div className="flex justify-center py-12"><LogoLoader text="Loading..." /></div>;

const tabs = [
  { id: 'papers', label: 'Past Papers', icon: FileText },
  { id: 'simulator', label: 'Exam Simulator', icon: Play },
  { id: 'quiz', label: 'Practice Quiz', icon: Target },
  { id: 'videos', label: 'Video Library', icon: Video },
  { id: 'resources', label: 'Resources', icon: BookOpen },
];

const ECZHub = () => {
  const [tab, setTab] = useTabFromUrl('papers');

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">ECZ Exam Hub</h1>
        <p className="text-muted-foreground text-sm">Past papers, exam simulators, and ECZ preparation resources.</p>
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
          <TabsContent value="papers"><ECZPastPapersPage /></TabsContent>
          <TabsContent value="simulator"><ECZExamSimulatorPage /></TabsContent>
          <TabsContent value="quiz"><ECZPracticeQuizPage /></TabsContent>
          <TabsContent value="videos"><ECZVideoLibraryPage /></TabsContent>
          <TabsContent value="resources"><ECZResourcesExpandedPage /></TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
};

export default ECZHub;
