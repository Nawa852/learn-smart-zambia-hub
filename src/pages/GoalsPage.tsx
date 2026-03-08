import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Target, Plus, CheckCircle, Clock, Trophy, Flame, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

interface Goal {
  id: number;
  title: string;
  progress: number;
  target: number;
  current: number;
  completed: boolean;
}

const GoalsPage = () => {
  const [newGoal, setNewGoal] = useState('');
  const [dailyGoals, setDailyGoals] = useState<Goal[]>([
    { id: 1, title: 'Complete 2 Math lessons', progress: 50, target: 2, current: 1, completed: false },
    { id: 2, title: 'Practice 30 vocabulary words', progress: 100, target: 30, current: 30, completed: true },
    { id: 3, title: 'Watch Physics video tutorial', progress: 0, target: 1, current: 0, completed: false },
    { id: 4, title: 'Review Biology notes', progress: 75, target: 4, current: 3, completed: false },
  ]);

  const weeklyGoals = [
    { id: 1, title: 'Finish Algebra unit', deadline: 'Friday', progress: 60 },
    { id: 2, title: 'Complete 5 practice exams', deadline: 'Sunday', progress: 40 },
    { id: 3, title: 'Read 2 literature books', deadline: 'Saturday', progress: 25 },
  ];

  const completedCount = dailyGoals.filter(g => g.completed).length;
  const streak = 7;

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setDailyGoals(prev => [...prev, {
      id: Date.now(),
      title: newGoal.trim(),
      progress: 0,
      target: 1,
      current: 0,
      completed: false,
    }]);
    setNewGoal('');
    toast.success('Goal added!');
  };

  const toggleGoal = (id: number) => {
    setDailyGoals(prev => prev.map(g =>
      g.id === id ? { ...g, completed: !g.completed, progress: g.completed ? 0 : 100, current: g.completed ? 0 : g.target } : g
    ));
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Target className="w-6 h-6 text-primary" /> Goals
        </h1>
        <p className="text-sm text-muted-foreground">Track your daily and weekly learning targets</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3">
        {[
          { label: 'Streak', value: `${streak} days`, icon: Flame, accent: 'text-orange-500 bg-orange-500/10' },
          { label: 'Completed', value: completedCount, icon: Trophy, accent: 'text-emerald-500 bg-emerald-500/10' },
          { label: 'Weekly', value: '68%', icon: Calendar, accent: 'text-blue-500 bg-blue-500/10' },
        ].map((s, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${s.accent}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily Goals */}
        <motion.div variants={fadeUp}>
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Today's Goals</CardTitle>
              <CardDescription className="text-xs">Complete your daily learning targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a new goal..."
                  value={newGoal}
                  onChange={e => setNewGoal(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addGoal()}
                  className="text-sm"
                />
                <Button size="icon" onClick={addGoal} className="shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {dailyGoals.map(goal => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    goal.completed
                      ? 'bg-emerald-500/5 border-emerald-500/20'
                      : 'border-border/50 hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      {goal.completed ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className={`text-sm ${goal.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {goal.title}
                      </span>
                    </div>
                    <Badge variant={goal.completed ? 'default' : 'secondary'} className="text-[10px]">
                      {goal.current}/{goal.target}
                    </Badge>
                  </div>
                  <Progress value={goal.progress} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Goals */}
        <motion.div variants={fadeUp}>
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Weekly Goals</CardTitle>
              <CardDescription className="text-xs">Your targets for this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {weeklyGoals.map(goal => (
                <div key={goal.id} className="p-3 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{goal.title}</span>
                    <Badge variant="outline" className="text-[10px]">Due {goal.deadline}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={goal.progress} className="flex-1 h-1.5" />
                    <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GoalsPage;
