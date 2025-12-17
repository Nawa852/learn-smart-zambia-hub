import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Heart, Brain, Zap, Coffee, Smile, Frown, Meh, AlertCircle, Sun, Moon, Battery, Volume2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MoodState {
  frustration: number;
  boredom: number;
  overload: number;
  energy: number;
}

interface Intervention {
  type: 'break' | 'challenge' | 'encouragement' | 'pace';
  message: string;
  action: string;
}

export const MoodAwareTeaching = () => {
  const [mood, setMood] = useState<MoodState>({
    frustration: 25,
    boredom: 15,
    overload: 40,
    energy: 70,
  });
  const [currentIntervention, setCurrentIntervention] = useState<Intervention | null>(null);
  const [teachingMode, setTeachingMode] = useState<'gentle' | 'standard' | 'challenging'>('standard');

  const moodEmoji = () => {
    const avg = (mood.frustration + mood.boredom + mood.overload) / 3;
    if (avg < 30 && mood.energy > 50) return { icon: Smile, color: 'text-emerald-500', label: 'Great' };
    if (avg > 60 || mood.energy < 30) return { icon: Frown, color: 'text-rose-500', label: 'Struggling' };
    return { icon: Meh, color: 'text-amber-500', label: 'Okay' };
  };

  const currentMoodState = moodEmoji();

  useEffect(() => {
    // AI mood detection simulation
    const interval = setInterval(() => {
      setMood((prev) => ({
        frustration: Math.max(0, Math.min(100, prev.frustration + (Math.random() - 0.5) * 10)),
        boredom: Math.max(0, Math.min(100, prev.boredom + (Math.random() - 0.5) * 10)),
        overload: Math.max(0, Math.min(100, prev.overload + (Math.random() - 0.5) * 10)),
        energy: Math.max(0, Math.min(100, prev.energy - Math.random() * 2)),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Generate interventions based on mood
    if (mood.frustration > 60) {
      setCurrentIntervention({
        type: 'encouragement',
        message: "I sense some frustration. Let's take a different approach!",
        action: 'Simplify Explanation',
      });
      setTeachingMode('gentle');
    } else if (mood.boredom > 60) {
      setCurrentIntervention({
        type: 'challenge',
        message: "Feeling understimulated? Let's kick it up a notch!",
        action: 'Add Challenge',
      });
      setTeachingMode('challenging');
    } else if (mood.overload > 70) {
      setCurrentIntervention({
        type: 'pace',
        message: "Information overload detected. Slowing down pace.",
        action: 'Take Break',
      });
    } else if (mood.energy < 30) {
      setCurrentIntervention({
        type: 'break',
        message: "Your energy is low. A short break might help!",
        action: '5 Min Break',
      });
    } else {
      setCurrentIntervention(null);
      setTeachingMode('standard');
    }
  }, [mood]);

  const moodIndicators = [
    { key: 'frustration', label: 'Frustration', icon: AlertCircle, color: 'rose' },
    { key: 'boredom', label: 'Boredom', icon: Moon, color: 'slate' },
    { key: 'overload', label: 'Cognitive Load', icon: Brain, color: 'purple' },
    { key: 'energy', label: 'Energy Level', icon: Battery, color: 'emerald', inverted: true },
  ];

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-red-500/10">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600">
            <Heart className="w-6 h-6 text-white" />
          </div>
          Mood-Aware Teaching
          <Badge className="ml-auto bg-gradient-to-r from-pink-500 to-rose-500 text-white">
            <Zap className="w-3 h-3 mr-1" />
            Emotional AI
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Current Mood Display */}
        <div className="flex items-center justify-center gap-4 p-4 rounded-xl bg-muted/50">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <currentMoodState.icon className={`w-16 h-16 ${currentMoodState.color}`} />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold">Current Mood: {currentMoodState.label}</h3>
            <p className="text-muted-foreground">
              Teaching mode: <span className="font-semibold capitalize">{teachingMode}</span>
            </p>
          </div>
        </div>

        {/* AI Intervention Alert */}
        <AnimatePresence>
          {currentIntervention && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className={`p-4 rounded-xl border-2 ${
                currentIntervention.type === 'break' ? 'border-emerald-500/50 bg-emerald-500/5' :
                currentIntervention.type === 'challenge' ? 'border-amber-500/50 bg-amber-500/5' :
                currentIntervention.type === 'encouragement' ? 'border-pink-500/50 bg-pink-500/5' :
                'border-blue-500/50 bg-blue-500/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {currentIntervention.type === 'break' && <Coffee className="w-5 h-5 text-emerald-500" />}
                  {currentIntervention.type === 'challenge' && <Zap className="w-5 h-5 text-amber-500" />}
                  {currentIntervention.type === 'encouragement' && <Heart className="w-5 h-5 text-pink-500" />}
                  {currentIntervention.type === 'pace' && <Volume2 className="w-5 h-5 text-blue-500" />}
                  <span className="font-medium">{currentIntervention.message}</span>
                </div>
                <Button size="sm">{currentIntervention.action}</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mood Indicators */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Detected Emotional State</h4>
          {moodIndicators.map((indicator) => {
            const value = mood[indicator.key as keyof MoodState];
            const displayValue = indicator.inverted ? value : value;
            const isWarning = indicator.inverted ? value < 30 : value > 60;
            
            return (
              <div key={indicator.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-2">
                    <indicator.icon className={`w-4 h-4 ${isWarning ? 'text-rose-500' : 'text-muted-foreground'}`} />
                    {indicator.label}
                  </span>
                  <span className={`text-sm font-semibold ${isWarning ? 'text-rose-500' : ''}`}>
                    {displayValue.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${
                      indicator.inverted
                        ? `bg-${indicator.color}-500`
                        : isWarning
                        ? 'bg-rose-500'
                        : `bg-${indicator.color}-500`
                    }`}
                    style={{ backgroundColor: indicator.color === 'emerald' ? '#10b981' : indicator.color === 'rose' ? '#f43f5e' : indicator.color === 'purple' ? '#a855f7' : '#64748b' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${displayValue}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Teaching Adaptations */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
          <h4 className="font-semibold mb-3">Active Adaptations</h4>
          <div className="flex flex-wrap gap-2">
            {teachingMode === 'gentle' && (
              <>
                <Badge variant="outline">Slower Pace</Badge>
                <Badge variant="outline">Simpler Language</Badge>
                <Badge variant="outline">More Encouragement</Badge>
              </>
            )}
            {teachingMode === 'challenging' && (
              <>
                <Badge variant="outline">Advanced Content</Badge>
                <Badge variant="outline">Faster Pace</Badge>
                <Badge variant="outline">Complex Problems</Badge>
              </>
            )}
            {teachingMode === 'standard' && (
              <>
                <Badge variant="outline">Balanced Pace</Badge>
                <Badge variant="outline">Standard Difficulty</Badge>
                <Badge variant="outline">Mixed Encouragement</Badge>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
