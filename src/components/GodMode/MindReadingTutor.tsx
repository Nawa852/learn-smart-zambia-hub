import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Eye, Lightbulb, Zap, MessageCircle, Volume2, Sparkles, Target, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const MindReadingTutor = () => {
  const [confusionLevel, setConfusionLevel] = useState(35);
  const [teachingStyle, setTeachingStyle] = useState('analogy');
  const [aiThinking, setAiThinking] = useState(false);
  const [currentIntervention, setCurrentIntervention] = useState<string | null>(null);

  const teachingStyles = [
    { id: 'analogy', label: 'Analogies', icon: Lightbulb, color: 'from-amber-500 to-orange-500' },
    { id: 'math', label: 'Mathematical', icon: Target, color: 'from-blue-500 to-indigo-500' },
    { id: 'story', label: 'Storytelling', icon: MessageCircle, color: 'from-purple-500 to-pink-500' },
    { id: 'visual', label: 'Visual/Diagrams', icon: Eye, color: 'from-emerald-500 to-teal-500' },
  ];

  const interventions = [
    "I noticed you paused here - let me explain this differently...",
    "You're about to misunderstand this concept - here's a simpler frame...",
    "Based on your learning pattern, try thinking of it this way...",
    "Your hesitation suggests confusion about X - let me clarify...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setConfusionLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 20)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (confusionLevel > 60) {
      setAiThinking(true);
      setTimeout(() => {
        setCurrentIntervention(interventions[Math.floor(Math.random() * interventions.length)]);
        setAiThinking(false);
      }, 1500);
    } else {
      setCurrentIntervention(null);
    }
  }, [confusionLevel]);

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
            <Brain className="w-6 h-6 text-white" />
          </div>
          Mind-Reading AI Tutor
          <Badge className="ml-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            Context Omni-Aware
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Confusion Detection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              Real-time Confusion Detection
            </span>
            <span className={`text-sm font-bold ${confusionLevel > 60 ? 'text-destructive' : confusionLevel > 30 ? 'text-warning' : 'text-success'}`}>
              {confusionLevel.toFixed(0)}%
            </span>
          </div>
          <Progress 
            value={confusionLevel} 
            className="h-3"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Clear Understanding</span>
            <span>High Confusion</span>
          </div>
        </div>

        {/* AI Intervention Alert */}
        <AnimatePresence>
          {(aiThinking || currentIntervention) && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={`p-4 rounded-xl border-2 ${aiThinking ? 'border-primary/50 bg-primary/5' : 'border-amber-500/50 bg-amber-500/5'}`}
            >
              {aiThinking ? (
                <div className="flex items-center gap-3">
                  <div className="animate-pulse">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm">AI analyzing your learning state...</span>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{currentIntervention}</p>
                    <Button size="sm" className="mt-2">Show Simplified Explanation</Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Teaching Style Switcher */}
        <div className="space-y-3">
          <span className="text-sm font-medium">Live Teaching Style Adaptation</span>
          <div className="grid grid-cols-2 gap-2">
            {teachingStyles.map((style) => (
              <Button
                key={style.id}
                variant={teachingStyle === style.id ? "default" : "outline"}
                className={`h-auto py-3 flex flex-col gap-1 ${teachingStyle === style.id ? `bg-gradient-to-r ${style.color}` : ''}`}
                onClick={() => setTeachingStyle(style.id)}
              >
                <style.icon className="w-5 h-5" />
                <span className="text-xs">{style.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Tracked Behaviors */}
        <div className="space-y-3">
          <span className="text-sm font-medium">Behavioral Signals Tracked</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Hesitation', value: '2.3s', icon: TrendingUp },
              { label: 'Scrolling', value: '12x', icon: Eye },
              { label: 'Replays', value: '3', icon: Volume2 },
            ].map((signal, i) => (
              <div key={i} className="p-3 rounded-xl bg-muted/50 text-center">
                <signal.icon className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-lg font-bold">{signal.value}</p>
                <p className="text-xs text-muted-foreground">{signal.label}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
