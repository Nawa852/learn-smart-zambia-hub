import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  LayoutDashboard, Brain, Trophy, BookOpen, Users, MessageCircle,
  ChevronRight, ChevronLeft, X, Rocket, Sparkles
} from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}

const getTourSteps = (role: string): TourStep[] => {
  const base: TourStep[] = [
    {
      title: 'Welcome to Your Dashboard! 🎉',
      description: 'This is your personalized hub. Everything you need is organized in the sidebar on the left.',
      icon: LayoutDashboard,
      gradient: 'from-blue-500 to-indigo-600'
    },
  ];

  const roleSteps: Record<string, TourStep[]> = {
    student: [
      { title: 'AI-Powered Learning', description: 'Chat with AI tutors, generate quizzes from any topic, and get personalized study plans.', icon: Brain, gradient: 'from-purple-500 to-pink-600' },
      { title: 'ECZ Resources', description: 'Access past papers, video lessons, and study materials aligned with the Zambian curriculum.', icon: BookOpen, gradient: 'from-emerald-500 to-teal-600' },
      { title: 'Earn Rewards', description: 'Complete lessons and quizzes to earn XP, badges, and climb the leaderboard!', icon: Trophy, gradient: 'from-orange-500 to-amber-600' },
    ],
    teacher: [
      { title: 'Course Builder', description: 'Create courses with lessons, assignments, and assessments. AI can help generate content.', icon: BookOpen, gradient: 'from-emerald-500 to-teal-600' },
      { title: 'Student Analytics', description: 'Track student performance, attendance, and identify at-risk learners early.', icon: Brain, gradient: 'from-purple-500 to-pink-600' },
    ],
    guardian: [
      { title: 'Track Progress', description: "Monitor your child's learning activity, grades, and screen time from one dashboard.", icon: Brain, gradient: 'from-purple-500 to-pink-600' },
      { title: 'Connect with Teachers', description: 'Message teachers directly and stay updated on school events and assignments.', icon: MessageCircle, gradient: 'from-emerald-500 to-teal-600' },
    ],
  };

  const specific = roleSteps[role] || roleSteps.student!;
  
  return [
    ...base,
    ...specific,
    {
      title: 'Connect & Communicate',
      description: 'Use the Messenger to chat with teachers, students, and parents. Collaboration is built in!',
      icon: Users,
      gradient: 'from-rose-500 to-red-600'
    },
  ];
};

interface OnboardingTourProps {
  role: string;
  onComplete: () => void;
}

export const OnboardingTour = ({ role, onComplete }: OnboardingTourProps) => {
  const [step, setStep] = useState(0);
  const steps = getTourSteps(role);
  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;
  const isLast = step === steps.length - 1;

  const handleComplete = () => {
    localStorage.removeItem('edu-zambia-show-tour');
    localStorage.setItem('edu-zambia-tour-completed', 'true');
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-lg"
        >
          <Card className="relative overflow-hidden border-0 shadow-2xl">
            {/* Progress */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
              <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
            </div>

            <button onClick={handleComplete} className="absolute top-4 right-4 p-2 rounded-full hover:bg-accent/50 transition-colors z-10">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="text-center space-y-6"
                >
                  <div className="inline-flex">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${current.gradient} flex items-center justify-center shadow-lg`}>
                      <current.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold">{current.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{current.description}</p>
                  </div>
                  <div className="flex justify-center gap-2">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setStep(i)}
                        className={`h-2 rounded-full transition-all ${i === step ? 'w-6 bg-primary' : i < step ? 'w-2 bg-primary/50' : 'w-2 bg-muted'}`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
                <Button variant="ghost" onClick={() => setStep(s => s - 1)} disabled={step === 0} className="gap-2">
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
                <Button variant="ghost" onClick={handleComplete} className="text-muted-foreground">Skip</Button>
                <Button onClick={isLast ? handleComplete : () => setStep(s => s + 1)} className="gap-2">
                  {isLast ? (<><Rocket className="w-4 h-4" /> Get Started</>) : (<>Next <ChevronRight className="w-4 h-4" /></>)}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
