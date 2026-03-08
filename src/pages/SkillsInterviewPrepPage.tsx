import React from 'react';
import { MessageSquare, User, Brain, Video, Mic, Timer, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const scenarios = [
  { title: 'Tell Me About Yourself', type: 'Behavioral', difficulty: 'Easy', duration: '5 min', tips: 'Structure: Present, Past, Future' },
  { title: 'Why Should We Hire You?', type: 'Behavioral', difficulty: 'Medium', duration: '5 min', tips: 'Match skills to job requirements' },
  { title: 'Technical Skills Demo', type: 'Technical', difficulty: 'Hard', duration: '15 min', tips: 'Prepare practical demonstrations' },
  { title: 'Handling Difficult Clients', type: 'Situational', difficulty: 'Medium', duration: '10 min', tips: 'Use STAR method (Situation, Task, Action, Result)' },
  { title: 'Salary Negotiation', type: 'Negotiation', difficulty: 'Hard', duration: '10 min', tips: 'Research market rates first' },
  { title: 'Problem-Solving Scenario', type: 'Case Study', difficulty: 'Hard', duration: '20 min', tips: 'Think out loud, show process' },
  { title: 'Teamwork Experience', type: 'Behavioral', difficulty: 'Easy', duration: '5 min', tips: 'Highlight collaboration skills' },
  { title: 'Career Goals Discussion', type: 'Behavioral', difficulty: 'Easy', duration: '5 min', tips: 'Align with company growth' },
];

const SkillsInterviewPrepPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <MessageSquare className="h-8 w-8 text-primary" /> Interview Preparation
      </h1>
      <p className="text-muted-foreground mt-1">Practice common interview scenarios with AI coaching</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {scenarios.map(s => (
        <Card key={s.title} className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold">{s.title}</h3>
              <Badge className={s.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600' : s.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-red-500/10 text-red-600'}>{s.difficulty}</Badge>
            </div>
            <div className="flex gap-2 mb-2">
              <Badge variant="outline">{s.type}</Badge>
              <Badge variant="outline"><Timer className="h-3 w-3 mr-1" />{s.duration}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">💡 {s.tips}</p>
            <Button className="w-full" size="sm" onClick={() => toast.success('Starting practice session...')}>
              <Brain className="h-4 w-4 mr-2" /> Practice with AI
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default SkillsInterviewPrepPage;
