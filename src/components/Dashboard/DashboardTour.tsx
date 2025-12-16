import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Sparkles, LayoutDashboard, Brain, Trophy, BookOpen, 
  Users, ChevronRight, ChevronLeft, X, Rocket
} from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Your Dashboard! 🎉',
    description: 'This is your personal learning hub where you can track progress, access AI tools, and manage your education journey.',
    icon: LayoutDashboard,
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'ai-tools',
    title: 'AI-Powered Learning',
    description: 'Access powerful AI tutors, flashcard generators, mind maps, and more. Our AI adapts to your learning style.',
    icon: Brain,
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'courses',
    title: 'Course Library',
    description: 'Browse and enroll in courses aligned with the Zambian curriculum. Track your progress as you learn.',
    icon: BookOpen,
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'gamification',
    title: 'Earn Rewards',
    description: 'Complete lessons, quizzes, and challenges to earn XP, badges, and climb the leaderboard!',
    icon: Trophy,
    gradient: 'from-orange-500 to-amber-600'
  },
  {
    id: 'community',
    title: 'Connect & Collaborate',
    description: 'Join study groups, find mentors, and connect with peers. Learning is better together!',
    icon: Users,
    gradient: 'from-rose-500 to-red-600'
  }
];

interface DashboardTourProps {
  onComplete: () => void;
}

export const DashboardTour = ({ onComplete }: DashboardTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem('edu-zambia-tour-completed', 'true');
    setTimeout(onComplete, 300);
  };

  const step = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="w-full max-w-lg"
          >
            <Card className="relative overflow-hidden border-0 shadow-2xl">
              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary/60"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Close button */}
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-accent/50 transition-colors z-10"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="text-center space-y-6"
                  >
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.1 }}
                      className="inline-flex"
                    >
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>

                    {/* Text */}
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold">{step.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Step indicators */}
                    <div className="flex justify-center gap-2">
                      {tourSteps.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentStep(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentStep
                              ? 'w-6 bg-primary'
                              : index < currentStep
                              ? 'bg-primary/50'
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
                  <Button
                    variant="ghost"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                    className="text-muted-foreground"
                  >
                    Skip Tour
                  </Button>

                  <Button
                    onClick={handleNext}
                    className={`gap-2 ${
                      currentStep === tourSteps.length - 1
                        ? 'bg-gradient-to-r from-primary to-primary/80'
                        : ''
                    }`}
                  >
                    {currentStep === tourSteps.length - 1 ? (
                      <>
                        <Rocket className="w-4 h-4" />
                        Get Started
                      </>
                    ) : (
                      <>
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};