import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Target, Plus, CheckCircle, Clock, Trophy, Flame, Calendar } from 'lucide-react';

const GoalsPage = () => {
  const [newGoal, setNewGoal] = useState('');

  const dailyGoals = [
    { id: 1, title: 'Complete 2 Math lessons', progress: 50, target: 2, current: 1, completed: false },
    { id: 2, title: 'Practice 30 vocabulary words', progress: 100, target: 30, current: 30, completed: true },
    { id: 3, title: 'Watch Physics video tutorial', progress: 0, target: 1, current: 0, completed: false },
    { id: 4, title: 'Review Biology notes', progress: 75, target: 4, current: 3, completed: false },
  ];

  const weeklyGoals = [
    { id: 1, title: 'Finish Algebra unit', deadline: 'Friday', progress: 60 },
    { id: 2, title: 'Complete 5 practice exams', deadline: 'Sunday', progress: 40 },
    { id: 3, title: 'Read 2 literature books', deadline: 'Saturday', progress: 25 },
  ];

  const stats = {
    streak: 7,
    goalsCompleted: 42,
    weeklyProgress: 68,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Target className="h-8 w-8 text-primary" />
            Daily Goals
          </h1>
          <p className="text-muted-foreground">Track your learning progress</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Flame className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.streak} days</p>
                <p className="text-sm text-muted-foreground">Current Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.goalsCompleted}</p>
                <p className="text-sm text-muted-foreground">Goals Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.weeklyProgress}%</p>
                <p className="text-sm text-muted-foreground">Weekly Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Goals</CardTitle>
            <CardDescription>Complete your daily learning targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Add a new goal..." 
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
              />
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {dailyGoals.map(goal => (
                <div key={goal.id} className={`p-4 border rounded-lg ${goal.completed ? 'bg-green-500/5 border-green-500/20' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {goal.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span className={goal.completed ? 'line-through text-muted-foreground' : ''}>{goal.title}</span>
                    </div>
                    <Badge variant={goal.completed ? 'default' : 'secondary'}>
                      {goal.current}/{goal.target}
                    </Badge>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
            <CardDescription>Your targets for this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyGoals.map(goal => (
              <div key={goal.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{goal.title}</span>
                  <Badge variant="outline">Due {goal.deadline}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={goal.progress} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoalsPage;
