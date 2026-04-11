import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabFromUrl } from '@/hooks/useTabFromUrl';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { GraduationCap, BookOpen, Video, Youtube, Tv, Sparkles } from 'lucide-react';

const MyCoursesPage = React.lazy(() => import('@/pages/MyCoursesPage'));
const CourseCatalogPage = React.lazy(() => import('@/pages/CourseCatalogPage'));
const VideoLearningPage = React.lazy(() => import('@/pages/VideoLearningPage'));
const YouTubeLearningPage = React.lazy(() => import('@/pages/YouTubeLearningPage'));
const LiveLearningPage = React.lazy(() => import('@/pages/LiveLearningPage'));
const LessonsPage = React.lazy(() => import('@/pages/LessonsPage'));

const Loader = () => <div className="flex justify-center py-12"><LogoLoader text="Loading..." /></div>;

const tabs = [
  { id: 'my-courses', label: 'My Courses', icon: GraduationCap },
  { id: 'catalog', label: 'Browse', icon: BookOpen },
  { id: 'lessons', label: 'Lessons', icon: Sparkles },
  { id: 'videos', label: 'Videos', icon: Video },
  { id: 'youtube', label: 'YouTube', icon: Youtube },
  { id: 'live', label: 'Live', icon: Tv },
];

const LearnHub = () => {
  const [tab, setTab] = useTabFromUrl('my-courses');

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Learning Hub</h1>
        <p className="text-muted-foreground text-sm">All your courses, lessons, and learning resources in one place.</p>
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
          <TabsContent value="my-courses"><MyCoursesPage /></TabsContent>
          <TabsContent value="catalog"><CourseCatalogPage /></TabsContent>
          <TabsContent value="lessons"><LessonsPage /></TabsContent>
          <TabsContent value="videos"><VideoLearningPage /></TabsContent>
          <TabsContent value="youtube"><YouTubeLearningPage /></TabsContent>
          <TabsContent value="live"><LiveLearningPage /></TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
};

export default LearnHub;
