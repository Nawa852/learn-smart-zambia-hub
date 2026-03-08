import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, TrendingUp, BookOpen, Award, Clock, Target } from 'lucide-react';
import { useGuardianData } from '@/hooks/useGuardianData';
import { Skeleton } from '@/components/ui/skeleton';

const ParentChildrenPage = () => {
  const { students, loading } = useGuardianData();
  const [selectedChild, setSelectedChild] = useState(0);

  if (loading) {
    return <div className="space-y-6"><Skeleton className="h-32" /><Skeleton className="h-64" /></div>;
  }

  if (students.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold flex items-center gap-3"><Users className="w-8 h-8 text-primary" />My Children</h1>
        <Card><CardContent className="p-12 text-center"><p className="text-muted-foreground">No students linked yet. Ask your child to add you as a guardian.</p></CardContent></Card>
      </div>
    );
  }

  const child = students[selectedChild];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3"><Users className="w-8 h-8 text-primary" />My Children</h1>
        <p className="text-muted-foreground mt-1">Track your children's learning progress and achievements</p>
      </div>

      {/* Child Selector */}
      <div className="flex gap-4">
        {students.map((c, i) => (
          <Card
            key={c.id}
            className={`cursor-pointer transition-all hover:shadow-lg flex-1 ${selectedChild === i ? 'ring-2 ring-primary shadow-lg' : 'opacity-70'}`}
            onClick={() => setSelectedChild(i)}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <Avatar className="h-14 w-14 ring-2 ring-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-lg">
                  {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.grade || 'No grade set'}</p>
                <Badge variant="secondary" className="text-xs mt-1">{c.relationship}</Badge>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{c.quizStats.avgScore > 0 ? `${c.quizStats.avgScore}%` : '--'}</p>
                <p className="text-xs text-muted-foreground">Quiz Avg</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          {child.enrollments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {child.enrollments.map((e) => (
                <Card key={e.courseId} className="hover:shadow-lg transition-all">
                  <CardContent className="p-5">
                    <h4 className="font-bold mb-3">{e.courseTitle}</h4>
                    <Progress value={e.progress} className="h-2.5 mb-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{e.progress}% complete</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card><CardContent className="p-8 text-center text-muted-foreground">No course enrollments yet.</CardContent></Card>
          )}
        </TabsContent>

        <TabsContent value="activity" className="space-y-3">
          {child.recentActivity.length > 0 ? child.recentActivity.map((a, i) => (
            <Card key={i} className="hover:shadow-md transition-all">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {a.type === 'quiz' ? <Target className="w-5 h-5 text-primary" /> : <BookOpen className="w-5 h-5 text-primary" />}
                  </div>
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
                {a.score && <Badge variant="default" className="text-sm">{a.score}</Badge>}
              </CardContent>
            </Card>
          )) : (
            <Card><CardContent className="p-8 text-center text-muted-foreground">No recent activity this week.</CardContent></Card>
          )}
        </TabsContent>

        <TabsContent value="grades" className="space-y-4">
          {child.subjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {child.subjects.map((s, i) => (
                <Card key={i} className="hover:shadow-lg transition-all">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold">{s.courseTitle}</h4>
                        <p className="text-xs text-muted-foreground">{s.term || 'No term'}</p>
                      </div>
                      {s.gradeLetter && <Badge variant="default" className="text-sm font-bold">{s.gradeLetter}</Badge>}
                    </div>
                    {s.score !== null && (
                      <>
                        <Progress value={s.score} className="h-2.5 mb-1" />
                        <p className="text-sm font-medium text-right">{s.score}%</p>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card><CardContent className="p-8 text-center text-muted-foreground">No grades recorded yet.</CardContent></Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentChildrenPage;
