import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, BookOpen, Brain, Target, Trophy, MessageSquare } from 'lucide-react';

const TOUR_STEPS: Record<string, { icon: typeof Sparkles; title: string; description: string; action?: string }[]> = {
  student: [
    { icon: Sparkles, title: 'Welcome to Edu Zambia!', description: 'Your personalized learning journey starts here. Let us show you around!' },
    { icon: BookOpen, title: 'Browse Courses', description: 'Explore ECZ-aligned courses from top teachers. Enroll and start learning at your pace.' },
    { icon: Brain, title: 'AI Study Buddy', description: 'Get instant help from our AI tutor. Ask questions, generate quizzes, and create flashcards.' },
    { icon: Target, title: 'Set Study Goals', description: 'Track your daily goals and build study streaks for XP rewards.' },
    { icon: Trophy, title: 'Earn Achievements', description: 'Complete lessons, pass quizzes, and focus to earn badges and climb the leaderboard!' },
    { icon: MessageSquare, title: 'Join Study Groups', description: 'Collaborate with classmates in group chats and share resources.' },
  ],
  teacher: [
    { icon: Sparkles, title: 'Welcome, Educator!', description: 'Manage your courses, grade assignments, and track student performance.' },
    { icon: BookOpen, title: 'Create Courses', description: 'Build structured courses with lessons, assignments, and multimedia content.' },
    { icon: Brain, title: 'AI Lesson Plans', description: 'Use AI to generate lesson plans, quiz questions, and study materials.' },
    { icon: Target, title: 'Grade & Assess', description: 'Review submissions, provide feedback, and track class performance.' },
    { icon: Trophy, title: 'Analytics Dashboard', description: 'Visualize student progress, attendance trends, and grade distributions.' },
  ],
  default: [
    { icon: Sparkles, title: 'Welcome!', description: 'Explore your personalized dashboard and discover all available tools.' },
    { icon: BookOpen, title: 'Get Started', description: 'Navigate using the sidebar to access all features for your role.' },
    { icon: Brain, title: 'AI Powered', description: 'Use the AI tools to enhance your learning or teaching experience.' },
  ],
};

export const OnboardingTour = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (profile && !profile.device_setup_complete) {
      setVisible(true);
    }
  }, [profile]);

  const steps = TOUR_STEPS[(profile?.role as string) || ''] || TOUR_STEPS.default;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleComplete = async () => {
    if (!user) return;
    await supabase.from('profiles').update({ device_setup_complete: true }).eq('id', user.id);
    setVisible(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      handleComplete();
    }
  };

  if (!visible) return null;

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full max-w-md"
        >
          <Card className="border-primary/30 shadow-xl">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleComplete}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
              </div>
              <Progress value={progress} className="h-1.5" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {currentStep + 1} of {steps.length}
                </span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleComplete}>
                    Skip Tour
                  </Button>
                  <Button size="sm" onClick={handleNext}>
                    {currentStep < steps.length - 1 ? (
                      <>Next <ChevronRight className="w-3 h-3 ml-1" /></>
                    ) : (
                      'Get Started!'
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
