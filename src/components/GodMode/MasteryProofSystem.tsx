import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Brain, MessageCircle, Gamepad2, GraduationCap, CheckCircle2, Lock, Sparkles, Shield } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface MasteryDimension {
  id: string;
  name: string;
  icon: any;
  description: string;
  progress: number;
  requirement: string;
  unlocked: boolean;
}

export const MasteryProofSystem = () => {
  const [selectedDimension, setSelectedDimension] = useState<MasteryDimension | null>(null);

  const masteryDimensions: MasteryDimension[] = [
    {
      id: 'decisions',
      name: 'Decision Making',
      icon: Brain,
      description: 'Prove mastery through real-world simulations',
      progress: 75,
      requirement: 'Complete 5 simulation scenarios correctly',
      unlocked: true,
    },
    {
      id: 'explanations',
      name: 'Teaching Back',
      icon: MessageCircle,
      description: 'Explain concepts to convince the AI you understand',
      progress: 60,
      requirement: 'Successfully defend 3 concepts in Socratic mode',
      unlocked: true,
    },
    {
      id: 'simulations',
      name: 'Practical Application',
      icon: Gamepad2,
      description: 'Apply knowledge in interactive scenarios',
      progress: 45,
      requirement: 'Score 90%+ in hands-on projects',
      unlocked: true,
    },
    {
      id: 'teaching',
      name: 'Teach the World',
      icon: GraduationCap,
      description: 'Create content that helps others learn',
      progress: 20,
      requirement: 'Help 10 other learners understand this topic',
      unlocked: false,
    },
  ];

  const overallMastery = Math.round(
    masteryDimensions.reduce((acc, d) => acc + d.progress, 0) / masteryDimensions.length
  );

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600">
            <Award className="w-6 h-6 text-white" />
          </div>
          Mastery Proof System
          <Badge className="ml-auto bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
            <Shield className="w-3 h-3 mr-1" />
            No Exams
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Overall Progress */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="font-semibold">Overall Mastery</span>
            </div>
            <span className="text-2xl font-bold">{overallMastery}%</span>
          </div>
          <Progress value={overallMastery} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {overallMastery < 50 && "Keep learning! Complete more proof activities to demonstrate mastery."}
            {overallMastery >= 50 && overallMastery < 80 && "Good progress! You're building solid understanding."}
            {overallMastery >= 80 && overallMastery < 100 && "Almost there! Certificate will be issued at 100%."}
            {overallMastery >= 100 && "Congratulations! Your mastery is verified."}
          </p>
        </div>

        {/* Mastery Dimensions */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Proof Dimensions</h4>
          {masteryDimensions.map((dimension, index) => (
            <motion.div
              key={dimension.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border ${
                dimension.unlocked
                  ? 'border-border/50 hover:border-primary/30 cursor-pointer'
                  : 'border-border/30 opacity-60'
              } transition-all`}
              onClick={() => dimension.unlocked && setSelectedDimension(dimension)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  dimension.unlocked
                    ? 'bg-gradient-to-br from-amber-500 to-yellow-500'
                    : 'bg-muted'
                }`}>
                  {dimension.unlocked ? (
                    <dimension.icon className="w-6 h-6 text-white" />
                  ) : (
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold">{dimension.name}</h5>
                    <span className="text-sm font-bold">{dimension.progress}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{dimension.description}</p>
                  <Progress value={dimension.progress} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {dimension.requirement}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificate Preview */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border border-amber-500/20 text-center">
          <Award className="w-16 h-16 mx-auto text-amber-500 mb-3" />
          <h3 className="font-bold text-lg">Proof-of-Knowledge Certificate</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Your certificate will include:
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {['Mastery Map', 'Simulations Passed', 'Explanation Samples', 'Thinking Replay'].map((item) => (
              <Badge key={item} variant="outline" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Employers can replay your reasoning process
          </p>
          <Button className="mt-4" disabled={overallMastery < 100}>
            {overallMastery >= 100 ? 'Claim Certificate' : `${100 - overallMastery}% more to unlock`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
