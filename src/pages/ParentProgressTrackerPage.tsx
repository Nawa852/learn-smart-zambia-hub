import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Brain, Clock, BookOpen, Zap, BarChart3 } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', hours: 3.5, quizzes: 2, score: 82 },
  { day: 'Tue', hours: 2.0, quizzes: 1, score: 90 },
  { day: 'Wed', hours: 4.0, quizzes: 3, score: 78 },
  { day: 'Thu', hours: 1.5, quizzes: 1, score: 85 },
  { day: 'Fri', hours: 3.0, quizzes: 2, score: 88 },
  { day: 'Sat', hours: 5.0, quizzes: 4, score: 92 },
  { day: 'Sun', hours: 2.0, quizzes: 1, score: 86 },
];

const goals = [
  { label: "Weekly Study Hours", current: 21, target: 25, unit: "hours" },
  { label: "Quizzes Completed", current: 14, target: 20, unit: "quizzes" },
  { label: "Average Score", current: 86, target: 90, unit: "%" },
  { label: "AI Sessions", current: 8, target: 10, unit: "sessions" },
];

const milestones = [
  { title: "Complete 100 Lessons", progress: 78, total: 100, reward: "🏆 Gold Badge" },
  { title: "30-Day Streak", progress: 14, total: 30, reward: "🔥 Streak Master" },
  { title: "Score 90%+ on 10 Quizzes", progress: 7, total: 10, reward: "⭐ Quiz Champion" },
  { title: "Use AI Tutor 50 Times", progress: 32, total: 50, reward: "🤖 AI Explorer" },
];

const ParentProgressTrackerPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <TrendingUp className="w-8 h-8 text-primary" />
        Progress Tracker
      </h1>
      <p className="text-muted-foreground mt-1">Detailed learning analytics for Brighton Mwamba</p>
    </div>

    {/* Goals */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {goals.map((g, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-2">{g.label}</p>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-2xl font-bold">{g.current}</span>
              <span className="text-sm text-muted-foreground">/ {g.target} {g.unit}</span>
            </div>
            <Progress value={(g.current / g.target) * 100} className="h-2" />
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Weekly Activity */}
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" />This Week's Activity</CardTitle></CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-3">
          {weeklyData.map((d, i) => (
            <div key={i} className="text-center space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">{d.day}</p>
              <div className="relative h-24 bg-muted rounded-lg overflow-hidden">
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-primary/60 rounded-lg transition-all"
                  style={{ height: `${(d.hours / 5) * 100}%` }}
                />
              </div>
              <p className="text-xs font-bold">{d.hours}h</p>
              <Badge variant="outline" className="text-[9px]">{d.score}%</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Milestones */}
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-primary" />Milestones</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {milestones.map((m, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{m.title}</span>
                <Badge variant="secondary" className="text-[10px]">{m.reward}</Badge>
              </div>
              <span className="text-sm font-bold">{m.progress}/{m.total}</span>
            </div>
            <Progress value={(m.progress / m.total) * 100} className="h-2.5" />
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

export default ParentProgressTrackerPage;
