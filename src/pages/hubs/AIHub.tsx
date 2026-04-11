import React from 'react';
import { HubPageLayout, HubTab } from '@/components/Layout/HubPageLayout';
import { Brain, MessageSquare, Layers, Target, Map, PenTool, Sparkles } from 'lucide-react';

const tabs: HubTab[] = [
  { id: 'chat', label: 'AI Chat', icon: MessageSquare, component: React.lazy(() => import('@/pages/AIChat')) },
  { id: 'tutor', label: 'AI Tutor', icon: Brain, component: React.lazy(() => import('@/pages/MultiAITutorPage')), badge: 'PRO' },
  { id: 'flashcards', label: 'Flashcards', icon: Layers, component: React.lazy(() => import('@/pages/AIFlashcardPage')) },
  { id: 'quiz', label: 'Quiz Generator', icon: Target, component: React.lazy(() => import('@/pages/AIQuizGeneratorPage')) },
  { id: 'mind-maps', label: 'Mind Maps', icon: Map, component: React.lazy(() => import('@/pages/VisualMindMapPage')) },
  { id: 'teach-back', label: 'Teach Back', icon: PenTool, component: React.lazy(() => import('@/pages/TeachBackPage')) },
  { id: 'workspace', label: 'Full Workspace', icon: Sparkles, component: React.lazy(() => import('@/pages/ComprehensiveAIPage')) },
];

const AIHub = () => (
  <HubPageLayout
    title="AI Workspace"
    subtitle="Your AI-powered study tools — chat, flashcards, quizzes, mind maps, and more."
    icon={Brain}
    tabs={tabs}
    defaultTab="chat"
    quickLinks={[
      { label: 'Study Hub', href: '/prepare', icon: Target },
      { label: 'ECZ Exams', href: '/ecz', icon: Layers },
    ]}
  />
);

export default AIHub;
