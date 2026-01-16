import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, Clock, AlertTriangle, CheckCircle2, Upload, 
  Mic, Camera, FileImage, Send, Calendar, Eye, Edit,
  Sparkles, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  dueIn: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  priority: 'urgent' | 'normal' | 'optional';
  rubric?: string;
  score?: number;
  maxScore?: number;
  feedback?: string;
}

export const AssignmentsSystem = () => {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const assignments: Assignment[] = [
    { 
      id: '1', title: 'Quadratic Equations Problem Set', subject: 'Mathematics',
      dueDate: 'Jan 18, 2026', dueIn: '2 days', status: 'pending', priority: 'urgent',
      rubric: 'Solve 10 problems showing all working'
    },
    { 
      id: '2', title: 'Essay: Climate Change Impact on Zambia', subject: 'English',
      dueDate: 'Jan 20, 2026', dueIn: '4 days', status: 'pending', priority: 'normal',
      rubric: '500-700 words, proper citations required'
    },
    { 
      id: '3', title: 'Lab Report: Photosynthesis Experiment', subject: 'Science',
      dueDate: 'Jan 22, 2026', dueIn: '6 days', status: 'pending', priority: 'normal',
      rubric: 'Include hypothesis, method, results, conclusion'
    },
    { 
      id: '4', title: 'Map Reading Exercise', subject: 'Geography',
      dueDate: 'Jan 15, 2026', dueIn: 'Overdue', status: 'late', priority: 'urgent'
    },
    { 
      id: '5', title: 'Chapter 5 Review Questions', subject: 'History',
      dueDate: 'Jan 10, 2026', dueIn: '', status: 'graded', priority: 'normal',
      score: 85, maxScore: 100, feedback: 'Excellent analysis of colonial impact. Consider more primary sources.'
    },
  ];

  const pendingCount = assignments.filter(a => a.status === 'pending').length;
  const urgentCount = assignments.filter(a => a.priority === 'urgent' && a.status !== 'graded').length;
  const lateCount = assignments.filter(a => a.status === 'late').length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'optional': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'graded': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'late': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Assignments & Homework
          </span>
          <div className="flex gap-2">
            {urgentCount > 0 && (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="w-3 h-3" />
                {urgentCount} Urgent
              </Badge>
            )}
            {lateCount > 0 && (
              <Badge variant="outline" className="text-red-500 border-red-500">
                {lateCount} Overdue
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="pending" className="gap-1">
              Pending <Badge variant="secondary" className="ml-1">{pendingCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="graded">Graded</TabsTrigger>
            <TabsTrigger value="late">Late</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-3">
            {assignments.filter(a => a.status === 'pending').map((assignment) => (
              <Card key={assignment.id} className={`border ${
                assignment.priority === 'urgent' ? 'border-red-300 bg-red-50/30' : 'border-border/50'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{assignment.title}</h4>
                        <Badge variant={getPriorityColor(assignment.priority)}>
                          {assignment.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{assignment.dueDate}</p>
                      <p className={`text-xs ${
                        assignment.priority === 'urgent' ? 'text-red-500' : 'text-muted-foreground'
                      }`}>
                        Due in {assignment.dueIn}
                      </p>
                    </div>
                  </div>

                  {assignment.rubric && (
                    <div className="p-2 rounded-lg bg-muted/50 mb-3">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {assignment.rubric}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" className="gap-2">
                      <Edit className="w-4 h-4" />
                      Start Working
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Upload className="w-4 h-4" />
                      Upload File
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Camera className="w-4 h-4" />
                      Photo
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Mic className="w-4 h-4" />
                      Voice
                    </Button>
                    <Link to="/comprehensive-ai-study">
                      <Button size="sm" variant="secondary" className="gap-2">
                        <Sparkles className="w-4 h-4" />
                        AI Pre-Check
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="submitted" className="space-y-3">
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No assignments awaiting review</p>
            </div>
          </TabsContent>

          <TabsContent value="graded" className="space-y-3">
            {assignments.filter(a => a.status === 'graded').map((assignment) => (
              <Card key={assignment.id} className="border-green-200 bg-green-50/30">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <h4 className="font-semibold">{assignment.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        {assignment.score}/{assignment.maxScore}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((assignment.score! / assignment.maxScore!) * 100)}%
                      </p>
                    </div>
                  </div>
                  {assignment.feedback && (
                    <div className="p-3 rounded-lg bg-white border border-green-200">
                      <p className="text-sm font-medium mb-1">Teacher Feedback:</p>
                      <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="late" className="space-y-3">
            {assignments.filter(a => a.status === 'late').map((assignment) => (
              <Card key={assignment.id} className="border-red-300 bg-red-50/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <h4 className="font-semibold text-red-700">{assignment.title}</h4>
                  </div>
                  <p className="text-sm text-red-600 mb-3">{assignment.subject} • Overdue since {assignment.dueDate}</p>
                  <div className="p-2 rounded bg-red-100/50 mb-3">
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Late penalty may apply. Submit as soon as possible.
                    </p>
                  </div>
                  <Button size="sm" variant="destructive" className="gap-2">
                    <Send className="w-4 h-4" />
                    Submit Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
