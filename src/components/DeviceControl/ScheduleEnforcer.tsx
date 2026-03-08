import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDeviceControls } from '@/hooks/useDeviceControls';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Clock, BookOpen, Play } from 'lucide-react';

export const ScheduleEnforcer: React.FC = () => {
  const { controls, shouldAutoLock, isWithinAllowedHours } = useDeviceControls();
  const navigate = useNavigate();

  // Show curfew overlay if outside allowed hours
  if (controls && !isWithinAllowedHours) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6"
      >
        <div className="text-center max-w-md space-y-6">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto">
            <Clock className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Time to Rest 😴</h1>
          <p className="text-muted-foreground">
            Your guardian has set allowed hours from{' '}
            <strong>{controls.allowed_hours_start}</strong> to{' '}
            <strong>{controls.allowed_hours_end}</strong>.
          </p>
          <p className="text-sm text-muted-foreground">Come back during study hours!</p>
        </div>
      </motion.div>
    );
  }

  // Show study enforcement overlay if auto-lock is active during scheduled study time
  if (controls && shouldAutoLock) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-6"
        >
          <div className="text-center max-w-md space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">📚 It's Study Time!</h1>
            <p className="text-muted-foreground">
              Your study schedule is active. Start a focus session to unlock the app.
            </p>
            <Button
              size="lg"
              className="text-lg h-14 px-8"
              onClick={() => navigate('/focus-mode')}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Focus Session
            </Button>
            <p className="text-xs text-muted-foreground">
              <Lock className="w-3 h-3 inline mr-1" />
              Enforced by your guardian's settings
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return null;
};
