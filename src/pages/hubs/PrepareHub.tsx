import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabFromUrl } from '@/hooks/useTabFromUrl';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { Calendar, Timer, FileText, Target, BookOpen, Bookmark, Flame } from 'lucide-react';

const StudyPlannerPage = React.lazy(() => import('@/pages/StudyPlannerPage'));
const FocusModePage = React.lazy(() => import('@/pages/FocusModePage'));
const MyNotesPage = React.lazy(() => import('@/pages/MyNotesPage'));
const GoalsPage = React.lazy(() => import('@/pages/GoalsPage'));
const BookmarksPage = React.lazy(() => import('@/pages/BookmarksPage'));
const PomodoroPage = React.lazy(() => import('@/pages/PomodoroPage'));
const JournalingPage = React.lazy(() => import('@/pages/JournalingPage'));

const Loader = () => <div className="flex justify-center py-12"><LogoLoader text="Loading..." /></div>;

const tabs = [
  { id: 'planner', label: 'Planner', icon: Calendar },
  { id: 'focus', label: 'Focus Mode', icon: Timer },
  { id: 'notes', label: 'My Notes', icon: FileText },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'pomodoro', label: 'Pomodoro', icon: Flame },
  { id: 'journal', label: 'Journal', icon: BookOpen },
  { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
];

const PrepareHub = () => {
  const [tab, setTab] = useTabFromUrl('planner');

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Study Hub</h1>
        <p className="text-muted-foreground text-sm">Plan, focus, and track your study progress.</p>
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
          <TabsContent value="planner"><StudyPlannerPage /></TabsContent>
          <TabsContent value="focus"><FocusModePage /></TabsContent>
          <TabsContent value="notes"><MyNotesPage /></TabsContent>
          <TabsContent value="goals"><GoalsPage /></TabsContent>
          <TabsContent value="pomodoro"><PomodoroPage /></TabsContent>
          <TabsContent value="journal"><JournalingPage /></TabsContent>
          <TabsContent value="bookmarks"><BookmarksPage /></TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
};

export default PrepareHub;
