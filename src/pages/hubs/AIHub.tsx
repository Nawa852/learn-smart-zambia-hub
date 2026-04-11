import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabFromUrl } from '@/hooks/useTabFromUrl';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { MessageSquare, Brain, Layers, Map, Target, PenTool, Sparkles } from 'lucide-react';

const AIChat = React.lazy(() => import('@/pages/AIChat'));
const MultiAITutorPage = React.lazy(() => import('@/pages/MultiAITutorPage'));
const AIFlashcardPage = React.lazy(() => import('@/pages/AIFlashcardPage'));
const VisualMindMapPage = React.lazy(() => import('@/pages/VisualMindMapPage'));
const AIQuizGeneratorPage = React.lazy(() => import('@/pages/AIQuizGeneratorPage'));
const TeachBackPage = React.lazy(() => import('@/pages/TeachBackPage'));
const ComprehensiveAIPage = React.lazy(() => import('@/pages/ComprehensiveAIPage'));

const Loader = () => <div className="flex justify-center py-12"><LogoLoader text="Loading..." /></div>;

const tabs = [
  { id: 'chat', label: 'AI Chat', icon: MessageSquare },
  { id: 'tutor', label: 'AI Tutor', icon: Brain },
  { id: 'flashcards', label: 'Flashcards', icon: Layers },
  { id: 'quiz', label: 'Quiz Generator', icon: Target },
  { id: 'mind-maps', label: 'Mind Maps', icon: Map },
  { id: 'teach-back', label: 'Teach Back', icon: PenTool },
  { id: 'workspace', label: 'Full Workspace', icon: Sparkles },
];

const AIHub = () => {
  const [tab, setTab] = useTabFromUrl('chat');

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Workspace</h1>
        <p className="text-muted-foreground text-sm">Your AI-powered study tools — chat, flashcards, quizzes, and more.</p>
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
          <TabsContent value="chat"><AIChat /></TabsContent>
          <TabsContent value="tutor"><MultiAITutorPage /></TabsContent>
          <TabsContent value="flashcards"><AIFlashcardPage /></TabsContent>
          <TabsContent value="quiz"><AIQuizGeneratorPage /></TabsContent>
          <TabsContent value="mind-maps"><VisualMindMapPage /></TabsContent>
          <TabsContent value="teach-back"><TeachBackPage /></TabsContent>
          <TabsContent value="workspace"><ComprehensiveAIPage /></TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
};

export default AIHub;
