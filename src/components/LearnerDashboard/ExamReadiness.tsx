import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, Clock, AlertTriangle, TrendingUp, Brain, 
  Calendar, Play, BookOpen, ChevronRight, Award,
  BarChart3, Zap, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExamReadiness = () => {
  const examCountdown = {
    name: 'ECZ Grade 9 Examinations',
    daysLeft: 45,
    startDate: 'March 2, 2026'
  };

  const subjectReadiness = [
    { subject: 'English Language', score: 85, trend: 'up', status: 'ready' },
    { subject: 'Mathematics', score: 68, trend: 'up', status: 'improving' },
    { subject: 'Integrated Science', score: 52, trend: 'down', status: 'needs-work' },
    { subject: 'Geography', score: 71, trend: 'stable', status: 'improving' },
    { subject: 'History', score: 78, trend: 'up', status: 'ready' },
    { subject: 'Civic Education', score: 88, trend: 'up', status: 'ready' },
  ];

  const weakTopics = [
    { topic: 'Quadratic Equations', subject: 'Mathematics', urgency: 'high' },
    { topic: 'Chemical Equations', subject: 'Science', urgency: 'high' },
    { topic: 'Map Reading', subject: 'Geography', urgency: 'medium' },
    { topic: 'Essay Structure', subject: 'English', urgency: 'low' },
  ];

  const suggestedPlan = [
    { day: 'Today', focus: 'Mathematics - Quadratic Equations', duration: '2h' },
    { day: 'Tomorrow', focus: 'Science - Chemical Equations', duration: '2h' },
    { day: 'Wednesday', focus: 'Geography - Map Reading', duration: '1.5h' },
    { day: 'Thursday', focus: 'Mock Exam Practice', duration: '3h' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-500 bg-green-100';
      case 'improving': return 'text-blue-500 bg-blue-100';
      case 'needs-work': return 'text-red-500 bg-red-100';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (trend === 'down') return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
    return <div className="w-3 h-3 rounded-full bg-yellow-500" />;
  };

  const overallReadiness = Math.round(
    subjectReadiness.reduce((acc, s) => acc + s.score, 0) / subjectReadiness.length
  );

  return (
    <div className="space-y-4">
      {/* Exam Countdown Banner */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{examCountdown.name}</h3>
                <p className="text-muted-foreground">Starting {examCountdown.startDate}</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-4xl font-bold text-primary">{examCountdown.daysLeft}</div>
              <p className="text-sm text-muted-foreground">Days Remaining</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-primary/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Readiness</span>
              <span className="text-sm font-bold">{overallReadiness}%</span>
            </div>
            <Progress value={overallReadiness} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Subject Readiness */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="w-5 h-5 text-primary" />
              Subject Readiness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {subjectReadiness.map((subject, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{subject.subject}</span>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(subject.trend)}
                      <span className="text-sm font-bold">{subject.score}%</span>
                    </div>
                  </div>
                  <Progress 
                    value={subject.score} 
                    className={`h-2 ${
                      subject.score >= 75 ? '[&>div]:bg-green-500' : 
                      subject.score >= 60 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-red-500'
                    }`} 
                  />
                </div>
                <Badge variant="outline" className={`text-xs ${getStatusColor(subject.status)}`}>
                  {subject.status === 'ready' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : null}
                  {subject.status.replace('-', ' ')}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weak Topics Alert */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Priority Topics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {weakTopics.map((topic, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border ${
                  topic.urgency === 'high' ? 'border-red-200 bg-red-50/50' :
                  topic.urgency === 'medium' ? 'border-yellow-200 bg-yellow-50/50' :
                  'border-border/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{topic.topic}</p>
                    <p className="text-xs text-muted-foreground">{topic.subject}</p>
                  </div>
                  <Link to="/multi-ai-tutor">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <Brain className="w-4 h-4" />
                      Study
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Suggested Study Plan */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Zap className="w-5 h-5 text-primary" />
            AI Suggested Revision Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {suggestedPlan.map((item, index) => (
              <div key={index} className="p-3 rounded-lg bg-background border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">{item.day}</p>
                <p className="font-medium text-sm mb-2">{item.focus}</p>
                <Badge variant="secondary" className="gap-1">
                  <Clock className="w-3 h-3" />
                  {item.duration}
                </Badge>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <Link to="/ecz-exam-simulator">
              <Button className="gap-2">
                <Play className="w-4 h-4" />
                Take Mock Exam
              </Button>
            </Link>
            <Link to="/ai-study-scheduler">
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                Full Schedule
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
