import React from 'react';
import { HubPageLayout, HubTab } from '@/components/Layout/HubPageLayout';
import { GraduationCap, BookOpen, Video, Youtube, Tv, Sparkles } from 'lucide-react';

const tabs: HubTab[] = [
  { id: 'my-courses', label: 'My Courses', icon: GraduationCap, component: React.lazy(() => import('@/pages/MyCoursesPage')) },
  { id: 'catalog', label: 'Browse Courses', icon: BookOpen, component: React.lazy(() => import('@/pages/CourseCatalogPage')) },
  { id: 'lessons', label: 'Lessons', icon: Sparkles, component: React.lazy(() => import('@/pages/LessonsPage')) },
  { id: 'videos', label: 'Video Library', icon: Video, component: React.lazy(() => import('@/pages/VideoLearningPage')) },
  { id: 'youtube', label: 'YouTube', icon: Youtube, component: React.lazy(() => import('@/pages/YouTubeLearningPage')) },
  { id: 'live', label: 'Live Classes', icon: Tv, component: React.lazy(() => import('@/pages/LiveLearningPage')), badge: 'LIVE' },
];

const LearnHub = () => (
  <HubPageLayout
    title="Learning Hub"
    subtitle="All your courses, lessons, and learning resources in one place."
    icon={GraduationCap}
    tabs={tabs}
    defaultTab="my-courses"
    quickLinks={[
      { label: 'AI Tutor', href: '/ai?tab=tutor', icon: Sparkles },
      { label: 'ECZ Papers', href: '/ecz?tab=papers', icon: BookOpen },
    ]}
  />
);

export default LearnHub;
