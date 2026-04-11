import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabFromUrl } from '@/hooks/useTabFromUrl';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { BookOpen, ClipboardCheck, FileText, BarChart3, Megaphone, Users } from 'lucide-react';

const Courses = React.lazy(() => import('@/pages/Courses'));
const TeacherGradebookPage = React.lazy(() => import('@/pages/TeacherGradebookPage'));
const TeacherLessonPlanPage = React.lazy(() => import('@/pages/TeacherLessonPlanPage'));
const TeacherAnalyticsPage = React.lazy(() => import('@/pages/TeacherAnalyticsPage'));
const TeacherAnnouncementsPage = React.lazy(() => import('@/pages/TeacherAnnouncementsPage'));
const TeacherAttendanceQRPage = React.lazy(() => import('@/pages/TeacherAttendanceQRPage'));

const Loader = () => <div className="flex justify-center py-12"><LogoLoader text="Loading..." /></div>;

const tabs = [
  { id: 'courses', label: 'My Courses', icon: BookOpen },
  { id: 'gradebook', label: 'Gradebook', icon: ClipboardCheck },
  { id: 'lesson-plans', label: 'Lesson Plans', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
  { id: 'attendance', label: 'Attendance', icon: Users },
];

const TeachHub = () => {
  const [tab, setTab] = useTabFromUrl('courses');

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Teaching Hub</h1>
        <p className="text-muted-foreground text-sm">Manage courses, grades, lesson plans, and student analytics.</p>
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
          <TabsContent value="courses"><Courses /></TabsContent>
          <TabsContent value="gradebook"><TeacherGradebookPage /></TabsContent>
          <TabsContent value="lesson-plans"><TeacherLessonPlanPage /></TabsContent>
          <TabsContent value="analytics"><TeacherAnalyticsPage /></TabsContent>
          <TabsContent value="announcements"><TeacherAnnouncementsPage /></TabsContent>
          <TabsContent value="attendance"><TeacherAttendanceQRPage /></TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
};

export default TeachHub;
