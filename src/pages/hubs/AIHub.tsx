import React from 'react';
import { HubPageLayout, HubTab } from '@/components/Layout/HubPageLayout';
import { Brain, MessageSquare, Layers, Target, Map, PenTool, Sparkles, Swords, Zap, Calculator, Lightbulb, Mic, FileText, Upload, Calendar } from 'lucide-react';

const tabs: HubTab[] = [
  { id: 'voice', label: 'Voice Tutor', icon: Mic, component: React.lazy(() => import('@/pages/VoiceAITutorPage')), badge: 'NEW' },
  { id: 'chat', label: 'AI Chat', icon: MessageSquare, component: React.lazy(() => import('@/pages/AIChat')) },
  { id: 'tutor', label: 'AI Tutor', icon: Brain, component: React.lazy(() => import('@/pages/MultiAITutorPage')), badge: 'PRO' },
  { id: 'exam-gen', label: 'Exam Generator', icon: FileText, component: React.lazy(() => import('@/pages/AIExamPaperGeneratorPage')), badge: 'NEW' },
  { id: 'doc-analyzer', label: 'Doc Analyzer', icon: Upload, component: React.lazy(() => import('@/pages/AIDocumentAnalyzerPage')), badge: 'NEW' },
  { id: 'smart-planner', label: 'Study Planner', icon: Calendar, component: React.lazy(() => import('@/pages/AISmartStudyPlannerPage')), badge: 'NEW' },
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
    subtitle="Your AI-powered study tools — generate exams, analyze docs, plan studies, and more."
    icon={Brain}
    tabs={tabs}
    defaultTab="chat"
    quickLinks={[
      { label: 'Exam Generator', href: '/ai?tab=exam-gen', icon: FileText },
      { label: 'Doc Analyzer', href: '/ai?tab=doc-analyzer', icon: Upload },
      { label: 'Study Planner', href: '/ai?tab=smart-planner', icon: Calendar },
      { label: 'Homework Solver', href: '/ai?tab=homework', icon: Calculator },
    ]}
  />
);

export default AIHub;
