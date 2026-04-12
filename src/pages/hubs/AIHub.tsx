import React from 'react';
import { HubPageLayout, HubTab } from '@/components/Layout/HubPageLayout';
import { Brain, MessageSquare, Layers, Target, Map, PenTool, Sparkles, Swords, Zap, Calculator, Lightbulb, Mic } from 'lucide-react';

const tabs: HubTab[] = [
  { id: 'voice', label: 'Voice Tutor', icon: Mic, component: React.lazy(() => import('@/pages/VoiceAITutorPage')), badge: 'NEW' },
  { id: 'chat', label: 'AI Chat', icon: MessageSquare, component: React.lazy(() => import('@/pages/AIChat')) },
  { id: 'tutor', label: 'AI Tutor', icon: Brain, component: React.lazy(() => import('@/pages/MultiAITutorPage')), badge: 'PRO' },
  { id: 'homework', label: 'Homework Solver', icon: Calculator, component: React.lazy(() => import('@/pages/AIHomeworkSolverPage')), badge: 'NEW' },
  { id: 'exam-predict', label: 'Exam Predictor', icon: Zap, component: React.lazy(() => import('@/pages/ExamPredictorPage')), badge: 'NEW' },
  { id: 'essay', label: 'Essay Coach', icon: PenTool, component: React.lazy(() => import('@/pages/EssayCoachPage')) },
  { id: 'debate', label: 'Debate Arena', icon: Swords, component: React.lazy(() => import('@/pages/AIDebatePage')) },
  { id: 'insights', label: 'AI Insights', icon: Lightbulb, component: React.lazy(() => import('@/pages/LearningRecommendationsPage')), badge: 'NEW' },
  { id: 'flashcards', label: 'Flashcards', icon: Layers, component: React.lazy(() => import('@/pages/AIFlashcardPage')) },
  { id: 'quiz', label: 'Quiz Gen', icon: Target, component: React.lazy(() => import('@/pages/AIQuizGeneratorPage')) },
  { id: 'mind-maps', label: 'Mind Maps', icon: Map, component: React.lazy(() => import('@/pages/VisualMindMapPage')) },
  { id: 'workspace', label: 'Full Workspace', icon: Sparkles, component: React.lazy(() => import('@/pages/ComprehensiveAIPage')) },
];

const AIHub = () => (
  <HubPageLayout
    title="AI Workspace"
    subtitle="Your AI-powered study tools — predict exams, coach essays, debate, and more."
    icon={Brain}
    tabs={tabs}
    defaultTab="chat"
    quickLinks={[
      { label: 'Homework Solver', href: '/ai?tab=homework', icon: Calculator },
      { label: 'Exam Predictor', href: '/ai?tab=exam-predict', icon: Zap },
      { label: 'AI Insights', href: '/ai?tab=insights', icon: Lightbulb },
    ]}
  />
);

export default AIHub;
