import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, TrendingUp, BookOpen, Award, Clock, Target, Brain, Flame, Star, ChevronRight, Calendar } from 'lucide-react';

const children = [
  {
    name: "Brighton Mwamba", grade: "Grade 12", avatar: "BM", streak: 14, overall: 78, mood: "😊",
    subjects: [
      { name: "Mathematics", progress: 85, grade: "A", trend: "up", hours: 12 },
      { name: "Physics", progress: 72, grade: "B+", trend: "up", hours: 8 },
      { name: "Chemistry", progress: 80, grade: "A-", trend: "stable", hours: 10 },
      { name: "Biology", progress: 68, grade: "B", trend: "down", hours: 6 },
      { name: "English", progress: 90, grade: "A+", trend: "up", hours: 9 },
    ],
    achievements: ["Math Master", "Science Explorer", "7-Day Streak"],
    recentActivity: [
      { action: "Completed Physics Quiz", time: "2 hours ago", score: "85%" },
      { action: "Watched Chemistry Video", time: "5 hours ago", score: null },
      { action: "AI Tutoring Session", time: "Yesterday", score: null },
    ],
  },
  {
    name: "Sarah Banda", grade: "Grade 9", avatar: "SB", streak: 24, overall: 92, mood: "🌟",
    subjects: [
      { name: "English", progress: 95, grade: "A+", trend: "up", hours: 14 },
      { name: "Biology", progress: 88, grade: "A", trend: "up", hours: 11 },
      { name: "History", progress: 91, grade: "A", trend: "stable", hours: 10 },
      { name: "Geography", progress: 85, grade: "A-", trend: "up", hours: 8 },
      { name: "Civic Education", progress: 93, grade: "A+", trend: "up", hours: 7 },
    ],
    achievements: ["Reading Champion", "Perfect Week", "Knowledge Seeker", "Top 5%"],
    recentActivity: [
      { action: "Completed History Essay", time: "1 hour ago", score: "92%" },
      { action: "Study Group Session", time: "3 hours ago", score: null },
      { action: "Flashcard Review", time: "Today", score: "100%" },
    ],
  },
];

const ParentChildrenPage = () => {
  const [selectedChild, setSelectedChild] = useState(0);
  const child = children[selectedChild];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Users className="w-8 h-8 text-primary" />
          My Children
        </h1>
        <p className="text-muted-foreground mt-1">Track your children's learning progress and achievements</p>
      </div>

      {/* Child Selector */}
      <div className="flex gap-4">
        {children.map((c, i) => (
          <Card
            key={i}
            className={`cursor-pointer transition-all hover:shadow-lg flex-1 ${selectedChild === i ? 'ring-2 ring-primary shadow-lg' : 'opacity-70'}`}
            onClick={() => setSelectedChild(i)}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <Avatar className="h-14 w-14 ring-2 ring-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-lg">{c.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.grade}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs"><Flame className="w-3 h-3 mr-1" />{c.streak} days</Badge>
                  <span className="text-lg">{c.mood}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{c.overall}%</p>
                <p className="text-xs text-muted-foreground">Overall</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="subjects" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {child.subjects.map((s, i) => (
              <Card key={i} className="hover:shadow-lg transition-all">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold">{s.name}</h4>
                      <p className="text-xs text-muted-foreground"><Clock className="w-3 h-3 inline mr-1" />{s.hours}h this week</p>
                    </div>
                    <Badge variant={s.grade.startsWith('A') ? 'default' : 'secondary'} className="text-sm font-bold">{s.grade}</Badge>
                  </div>
                  <Progress value={s.progress} className="h-2.5 mb-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{s.progress}%</span>
                    <span className={`text-xs flex items-center gap-1 ${s.trend === 'up' ? 'text-green-600' : s.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
                      <TrendingUp className={`w-3 h-3 ${s.trend === 'down' ? 'rotate-180' : ''}`} />
                      {s.trend === 'up' ? 'Improving' : s.trend === 'down' ? 'Needs attention' : 'Stable'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-3">
          {child.recentActivity.map((a, i) => (
            <Card key={i} className="hover:shadow-md transition-all">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{a.action}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
                {a.score && <Badge variant="default" className="text-sm">{a.score}</Badge>}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="achievements" className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {child.achievements.map((a, i) => (
            <Card key={i} className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <p className="font-bold text-sm">{a}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentChildrenPage;
