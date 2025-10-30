import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, TrendingUp, AlertCircle, Calendar, MessageSquare, Award, BookOpen, Clock, Target, Users, Activity, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GuardianDashboardViewProps {
  userName: string;
}

export const GuardianDashboardView = ({ userName }: GuardianDashboardViewProps) => {
  const linkedStudents = [
    {
      name: "Brighton Mwamba",
      grade: "Grade 12",
      avatar: "BM",
      overallProgress: 78,
      studyStreak: 12,
      recentActivity: "Completed Physics Quiz",
      performance: "Excellent",
      subjects: [
        { name: "Mathematics", progress: 85, grade: "A" },
        { name: "Physics", progress: 72, grade: "B+" },
        { name: "Chemistry", progress: 80, grade: "A-" },
      ]
    },
    {
      name: "Sarah Banda",
      grade: "Grade 9",
      avatar: "SB",
      overallProgress: 92,
      studyStreak: 24,
      recentActivity: "AI Study Session",
      performance: "Outstanding",
      subjects: [
        { name: "English", progress: 95, grade: "A+" },
        { name: "Biology", progress: 88, grade: "A" },
        { name: "History", progress: 91, grade: "A" },
      ]
    },
  ];

  const insights = [
    { 
      icon: TrendingUp, 
      title: "Great Progress!", 
      description: "Brighton improved 15% in Physics this month",
      type: "positive",
      color: "text-green-600"
    },
    { 
      icon: AlertCircle, 
      title: "Needs Support", 
      description: "Sarah struggling with Algebra word problems",
      type: "warning",
      color: "text-orange-600"
    },
    { 
      icon: Award, 
      title: "Achievement Unlocked", 
      description: "Brighton earned 'Math Master' badge",
      type: "success",
      color: "text-purple-600"
    },
  ];

  const upcomingEvents = [
    { title: "Parent-Teacher Meeting", date: "Friday, 3:00 PM", student: "Brighton Mwamba" },
    { title: "Grade 9 Mock Exams Start", date: "Next Monday", student: "Sarah Banda" },
    { title: "Science Fair Presentation", date: "March 15", student: "Brighton Mwamba" },
  ];

  const weeklyReport = {
    totalStudyHours: 28,
    averageScore: 85,
    lessonsCompleted: 24,
    aiInteractions: 45,
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {userName}! 👪</h1>
              <p className="text-muted-foreground">Monitor and support your children's learning journey</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message Teachers
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            This Week's Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{weeklyReport.totalStudyHours}h</p>
              <p className="text-xs text-muted-foreground">Study Hours</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{weeklyReport.averageScore}%</p>
              <p className="text-xs text-muted-foreground">Avg Score</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{weeklyReport.lessonsCompleted}</p>
              <p className="text-xs text-muted-foreground">Lessons Done</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{weeklyReport.aiInteractions}</p>
              <p className="text-xs text-muted-foreground">AI Sessions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Linked Students */}
      {linkedStudents.map((student, studentIndex) => (
        <Card key={studentIndex} className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {student.avatar}
                </div>
                <div>
                  <CardTitle>{student.name}</CardTitle>
                  <CardDescription>{student.grade} • {student.performance} Performance</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {student.studyStreak} day streak 🔥
                </Badge>
                <Button size="sm" variant="outline">
                  View Full Report
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-bold">{student.overallProgress}%</span>
              </div>
              <Progress value={student.overallProgress} className="h-3" />
              <p className="text-xs text-muted-foreground mt-1">Recent: {student.recentActivity}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {student.subjects.map((subject, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-sm">{subject.name}</h4>
                        <Badge variant="outline" className="text-xs">Grade {subject.grade}</Badge>
                      </div>
                      <div className="space-y-1">
                        <Progress value={subject.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground text-right">{subject.progress}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600" />
              AI-Powered Insights
            </CardTitle>
            <CardDescription>Personalized recommendations for each child</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <insight.icon className={`w-5 h-5 ${insight.color} mt-0.5`} />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{insight.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-sm">{event.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{event.student}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">{event.date}</Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Bell className="w-4 h-4 mr-2" />
              Set Reminders
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Guardian Actions</CardTitle>
          <CardDescription>Support your children's learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs">Message Teachers</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="w-6 h-6" />
              <span className="text-xs">View Schedule</span>
            </Button>
            <Link to="/learning-analytics" className="w-full">
              <Button variant="outline" className="w-full h-20 flex-col gap-2">
                <Activity className="w-6 h-6" />
                <span className="text-xs">Analytics</span>
              </Button>
            </Link>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Heart className="w-6 h-6" />
              <span className="text-xs">Send Motivation</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
