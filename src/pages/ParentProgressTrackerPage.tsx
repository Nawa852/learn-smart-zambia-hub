import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Target, BookOpen, BarChart3 } from 'lucide-react';
import { useGuardianData } from '@/hooks/useGuardianData';
import { Skeleton } from '@/components/ui/skeleton';

const ParentProgressTrackerPage = () => {
  const { students, loading, weeklySummary } = useGuardianData();

  if (loading) return <div className="space-y-6"><Skeleton className="h-32" /><Skeleton className="h-64" /></div>;

  if (students.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold flex items-center gap-3"><TrendingUp className="w-8 h-8 text-primary" />Progress Tracker</h1>
        <Card><CardContent className="p-12 text-center text-muted-foreground">No students linked yet.</CardContent></Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-primary" />
          Progress Tracker
        </h1>
        <p className="text-muted-foreground mt-1">Learning analytics for your linked students</p>
      </div>

      {/* Weekly Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-2">Lessons This Week</p>
          <p className="text-2xl font-bold">{weeklySummary.lessonsCompleted}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-2">Quizzes This Week</p>
          <p className="text-2xl font-bold">{weeklySummary.quizzesTaken}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-2">Avg Quiz Score</p>
          <p className="text-2xl font-bold">{weeklySummary.avgScore > 0 ? `${weeklySummary.avgScore}%` : '--'}</p>
        </CardContent></Card>
      </div>

      {/* Per-Student Progress */}
      <Tabs defaultValue="0" className="space-y-4">
        <TabsList>
          {students.map((s, i) => (
            <TabsTrigger key={s.id} value={String(i)}>{s.name}</TabsTrigger>
          ))}
        </TabsList>

        {students.map((student, si) => (
          <TabsContent key={student.id} value={String(si)} className="space-y-4">
            {/* Course Progress */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" />Course Progress</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {student.enrollments.length > 0 ? student.enrollments.map((e) => (
                  <div key={e.courseId} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{e.courseTitle}</span>
                      <span className="text-sm font-bold">{e.progress}%</span>
                    </div>
                    <Progress value={e.progress} className="h-2.5" />
                  </div>
                )) : (
                  <p className="text-sm text-muted-foreground">No enrolled courses.</p>
                )}
              </CardContent>
            </Card>

            {/* Quiz Performance */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-primary" />Quiz Performance</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold">{student.quizStats.totalAttempts}</p>
                    <p className="text-xs text-muted-foreground">Quizzes Taken</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold">{student.quizStats.avgScore > 0 ? `${student.quizStats.avgScore}%` : '--'}</p>
                    <p className="text-xs text-muted-foreground">Average Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" />Recent Activity</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {student.recentActivity.length > 0 ? student.recentActivity.map((a, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.time}</p>
                    </div>
                    {a.score && <Badge>{a.score}</Badge>}
                  </div>
                )) : (
                  <p className="text-sm text-muted-foreground">No recent activity this week.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ParentProgressTrackerPage;
