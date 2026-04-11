import React from 'react';
import { HubPageLayout, HubTab } from '@/components/Layout/HubPageLayout';
import { Calendar, Timer, FileText, Target, BookOpen, Bookmark, Flame } from 'lucide-react';

const tabs: HubTab[] = [
  { id: 'planner', label: 'Study Planner', icon: Calendar, component: React.lazy(() => import('@/pages/StudyPlannerPage')) },
  { id: 'focus', label: 'Focus Mode', icon: Timer, component: React.lazy(() => import('@/pages/FocusModePage')) },
  { id: 'notes', label: 'My Notes', icon: FileText, component: React.lazy(() => import('@/pages/MyNotesPage')) },
  { id: 'goals', label: 'Goals', icon: Target, component: React.lazy(() => import('@/pages/GoalsPage')) },
  { id: 'pomodoro', label: 'Pomodoro', icon: Flame, component: React.lazy(() => import('@/pages/PomodoroPage')) },
  { id: 'journal', label: 'Journal', icon: BookOpen, component: React.lazy(() => import('@/pages/JournalingPage')) },
  { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, component: React.lazy(() => import('@/pages/BookmarksPage')) },
];

const PrepareHub = () => (
  <HubPageLayout
    title="Study Hub"
    subtitle="Plan, focus, and track your study progress with powerful tools."
    icon={Calendar}
    tabs={tabs}
    defaultTab="planner"
    quickLinks={[
      { label: 'AI Flashcards', href: '/ai?tab=flashcards', icon: Flame },
      { label: 'My Courses', href: '/learn', icon: BookOpen },
    ]}
  />
);

export default PrepareHub;
