import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, X, CheckCircle2, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingTip {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface OnboardingWelcomeBannerProps {
  role: string;
  userName: string;
  emoji: string;
  subtitle: string;
  tips: OnboardingTip[];
}

export const OnboardingWelcomeBanner = ({ role, userName, emoji, subtitle, tips }: OnboardingWelcomeBannerProps) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const storageKey = `edu-zambia-${role}-welcome-dismissed`;

  useEffect(() => {
    const dismissed = localStorage.getItem(storageKey);
    if (!dismissed) setShowWelcome(true);
  }, [storageKey]);

  const dismissWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem(storageKey, 'true');
  };

  return (
    <AnimatePresence>
      {showWelcome && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-2 border-primary/30 shadow-xl bg-gradient-to-br from-primary/5 via-background to-accent/10">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Welcome to Your Dashboard, {userName}! {emoji}</CardTitle>
                    <CardDescription>{subtitle}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={dismissWelcome} className="shrink-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tips.map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (i + 1) }}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:shadow-md transition-all"
                  >
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <tip.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{tip.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{tip.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center justify-end mt-4 gap-2">
                <Button variant="outline" size="sm" onClick={dismissWelcome} className="gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Got it, let's go!
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
