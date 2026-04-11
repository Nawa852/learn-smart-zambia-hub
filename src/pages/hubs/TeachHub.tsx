import React from 'react';
import { HubPageLayout, HubTab } from '@/components/Layout/HubPageLayout';
import { BookOpen, ClipboardCheck, FileText, BarChart3, Megaphone, Users, MessageSquare } from 'lucide-react';

const tabs: HubTab[] = [
  { id: 'courses', label: 'My Courses', icon: BookOpen, component: React.lazy(() => import('@/pages/Courses')) },
  { id: 'gradebook', label: 'Gradebook', icon: ClipboardCheck, component: React.lazy(() => import('@/pages/TeacherGradebookPage')) },
  { id: 'lesson-plans', label: 'Lesson Plans', icon: FileText, component: React.lazy(() => import('@/pages/TeacherLessonPlanPage')) },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, component: React.lazy(() => import('@/pages/TeacherAnalyticsPage')) },
  { id: 'announcements', label: 'Announcements', icon: Megaphone, component: React.lazy(() => import('@/pages/TeacherAnnouncementsPage')) },
  { id: 'attendance', label: 'Attendance', icon: Users, component: React.lazy(() => import('@/pages/TeacherAttendanceQRPage')) },
];

const TeachHub = () => (
  <HubPageLayout
    title="Teaching Hub"
    subtitle="Manage courses, grades, lesson plans, and track student performance."
    icon={ClipboardCheck}
    tabs={tabs}
    defaultTab="courses"
    quickLinks={[
      { label: 'Message Students', href: '/connect?tab=messenger', icon: MessageSquare },
      { label: 'AI Tools', href: '/ai', icon: FileText },
    ]}
  />
);

export default TeachHub;
