import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, Clock, FileText, AlertTriangle, CheckCircle2, 
  Calendar, Play, Target, TrendingUp, Flame
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface TodaySnapshotProps {
  subjects?: { name: string; time: string; progress: number }[];
  assignments?: { title: string; dueIn: string; urgent: boolean }[];
  upcomingTests?: { subject: string; date: string }[];
}

export const TodaySnapshot = ({ 
  subjects = [
    { name: 'Mathematics', time: '8:00 AM', progress: 65 },
    { name: 'English', time: '10:00 AM', progress: 80 },
    { name: 'Science', time: '1:00 PM', progress: 45 },
    { name: 'Geography', time: '3:00 PM', progress: 30 },
  ],
  assignments = [
    { title: 'Math Problem Set 5', dueIn: '2 hours', urgent: true },
    { title: 'English Essay Draft', dueIn: '2 days', urgent: false },
    { title: 'Science Lab Report', dueIn: '1 week', urgent: false },
  ],
  upcomingTests = [
    { subject: 'Mathematics', date: 'Friday' },
    { subject: 'English', date: 'Next Monday' },
  ]
}: TodaySnapshotProps) => {
  const totalStudyTime = '2h 45m';
  const completedToday = 2;
  const totalToday = 4;

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Today's Learning Snapshot
          </span>
          <Badge variant="secondary" className="gap-1">
            <Clock className="w-3 h-3" />
            {totalStudyTime} estimated
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <BookOpen className="w-4 h-4" />
              Subjects
            </div>
            <p className="text-xl font-bold">{subjects.length}</p>
          </div>
          <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <FileText className="w-4 h-4" />
              Assignments
            </div>
            <p className="text-xl font-bold">{assignments.length}</p>
          </div>
          <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <AlertTriangle className="w-4 h-4" />
              Urgent
            </div>
            <p className="text-xl font-bold text-red-500">{assignments.filter(a => a.urgent).length}</p>
          </div>
          <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </div>
            <p className="text-xl font-bold text-green-500">{completedToday}/{totalToday}</p>
          </div>
        </div>

        {/* Today's Subjects */}
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            Today's Classes
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {subjects.map((subject, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-green-500 animate-pulse' : 'bg-muted'}`} />
                  <div>
                    <p className="font-medium text-sm">{subject.name}</p>
                    <p className="text-xs text-muted-foreground">{subject.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={subject.progress} className="w-16 h-2" />
                  <span className="text-xs text-muted-foreground">{subject.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Assignments */}
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-orange-500" />
            Pending Assignments
          </h4>
          <div className="space-y-2">
            {assignments.map((assignment, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  assignment.urgent 
                    ? 'border-red-500/30 bg-red-500/5' 
                    : 'border-border/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {assignment.urgent && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  <span className="text-sm font-medium">{assignment.title}</span>
                </div>
                <Badge variant={assignment.urgent ? 'destructive' : 'secondary'}>
                  Due in {assignment.dueIn}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tests Alert */}
        {upcomingTests.length > 0 && (
          <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-blue-600">
              <Target className="w-4 h-4" />
              Upcoming Tests
            </h4>
            <div className="flex flex-wrap gap-2">
              {upcomingTests.map((test, index) => (
                <Badge key={index} variant="outline" className="gap-1">
                  {test.subject} - {test.date}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Link to="/ecz-exam-simulator">
            <Button size="sm" className="gap-2">
              <Play className="w-4 h-4" />
              Continue Learning
            </Button>
          </Link>
          <Link to="/ai-study-scheduler">
            <Button size="sm" variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              View Schedule
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
