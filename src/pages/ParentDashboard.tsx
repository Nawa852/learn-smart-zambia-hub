import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, BookOpen, TrendingUp, Calendar, Bell, MessageSquare,
  Clock, Award, AlertCircle, CheckCircle, Star, Target,
  Brain, ChevronRight, Phone, Mail, Download, Eye,
  GraduationCap, BarChart3, Shield, Heart, Zap, Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MainLayout } from '@/components/Layout/MainLayout';

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChild, setSelectedChild] = useState(0);

  const children = [
    {
      name: 'Chanda Mulenga',
      grade: 'Grade 12',
      school: 'Lusaka National High School',
      avatar: null,
      overallScore: 78,
      attendance: 94,
      subjects: [
        { name: 'Mathematics', score: 82, trend: '+5%', status: 'excellent' },
        { name: 'English', score: 75, trend: '+2%', status: 'good' },
        { name: 'Physics', score: 68, trend: '-3%', status: 'needs-attention' },
        { name: 'Biology', score: 85, trend: '+8%', status: 'excellent' },
        { name: 'Chemistry', score: 71, trend: '+1%', status: 'good' },
      ],
      ecz: { daysUntil: 120, readinessScore: 72 },
      recentActivities: [
        { type: 'assignment', title: 'Calculus Test', score: 85, date: '2024-01-18' },
        { type: 'attendance', title: 'Attended all classes', date: '2024-01-17' },
        { type: 'achievement', title: 'Top 10 in Math Quiz', date: '2024-01-15' },
      ]
    },
    {
      name: 'Bupe Mulenga',
      grade: 'Grade 9',
      school: 'Lusaka National High School',
      avatar: null,
      overallScore: 81,
      attendance: 98,
      subjects: [
        { name: 'Mathematics', score: 79, trend: '+3%', status: 'good' },
        { name: 'English', score: 88, trend: '+6%', status: 'excellent' },
        { name: 'Science', score: 75, trend: '+2%', status: 'good' },
        { name: 'Social Studies', score: 82, trend: '+4%', status: 'excellent' },
      ],
      ecz: { daysUntil: 180, readinessScore: 68 },
      recentActivities: [
        { type: 'assignment', title: 'Science Project', score: 90, date: '2024-01-19' },
        { type: 'achievement', title: 'Perfect Attendance Week', date: '2024-01-17' },
      ]
    }
  ];

  const alerts = [
    { type: 'warning', message: 'Physics grade dropped by 3% this week', child: 'Chanda', time: '2 hours ago' },
    { type: 'info', message: 'Parent-Teacher meeting scheduled for Jan 25', child: 'All', time: '1 day ago' },
    { type: 'success', message: 'Bupe achieved Perfect Attendance', child: 'Bupe', time: '2 days ago' },
  ];

  const child = children[selectedChild];

  return (
    <MainLayout>
      <div className="min-h-screen bg-background p-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Parent Dashboard</h1>
              <p className="text-muted-foreground mt-1">Monitor your children's academic progress</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                <Badge variant="destructive" className="ml-1">3</Badge>
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Teacher
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Child Selector */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {children.map((c, index) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all border-2 min-w-[200px] ${
                  selectedChild === index 
                    ? 'border-primary shadow-lg' 
                    : 'border-transparent hover:border-muted-foreground/20'
                }`}
                onClick={() => setSelectedChild(index)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={c.avatar || ''} />
                    <AvatarFallback className="bg-primary text-white">
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{c.name}</h3>
                    <p className="text-sm text-muted-foreground">{c.grade}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-none shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Score</p>
                    <h3 className="text-3xl font-bold text-primary">{child.overallScore}%</h3>
                    <p className="text-xs text-success mt-1">Above class average</p>
                  </div>
                  <div className="bg-primary/20 p-3 rounded-xl">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-none shadow-lg bg-gradient-to-br from-success/10 to-success/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Attendance</p>
                    <h3 className="text-3xl font-bold text-success">{child.attendance}%</h3>
                    <p className="text-xs text-muted-foreground mt-1">This term</p>
                  </div>
                  <div className="bg-success/20 p-3 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-none shadow-lg bg-gradient-to-br from-accent/10 to-accent/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">ECZ Countdown</p>
                    <h3 className="text-3xl font-bold text-accent">{child.ecz.daysUntil}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Days until exams</p>
                  </div>
                  <div className="bg-accent/20 p-3 rounded-xl">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-none shadow-lg bg-gradient-to-br from-warning/10 to-warning/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">ECZ Readiness</p>
                    <h3 className="text-3xl font-bold text-warning">{child.ecz.readinessScore}%</h3>
                    <p className="text-xs text-muted-foreground mt-1">Preparation score</p>
                  </div>
                  <div className="bg-warning/20 p-3 rounded-xl">
                    <Target className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Subjects
            </TabsTrigger>
            <TabsTrigger value="ai-advisor" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Advisor
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Communication
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Subject Performance */}
              <Card className="lg:col-span-2 border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Subject Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {child.subjects.map((subject, index) => (
                      <motion.div
                        key={subject.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-muted/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{subject.name}</span>
                            <Badge variant={
                              subject.status === 'excellent' ? 'default' :
                              subject.status === 'good' ? 'secondary' : 'destructive'
                            }>
                              {subject.score}%
                            </Badge>
                          </div>
                          <span className={`text-sm font-medium ${
                            subject.trend.startsWith('+') ? 'text-success' : 'text-destructive'
                          }`}>
                            {subject.trend}
                          </span>
                        </div>
                        <Progress 
                          value={subject.score} 
                          className={`h-2 ${
                            subject.status === 'needs-attention' ? '[&>div]:bg-destructive' : ''
                          }`}
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {alerts.map((alert, index) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-lg border-l-4 ${
                            alert.type === 'warning' ? 'bg-warning/5 border-warning' :
                            alert.type === 'success' ? 'bg-success/5 border-success' :
                            'bg-primary/5 border-primary'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {alert.type === 'warning' ? (
                              <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                            ) : alert.type === 'success' ? (
                              <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                            ) : (
                              <Bell className="h-4 w-4 text-primary mt-0.5" />
                            )}
                            <div>
                              <p className="text-sm">{alert.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {alert.child} • {alert.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {child.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          activity.type === 'achievement' ? 'bg-warning/10' :
                          activity.type === 'assignment' ? 'bg-primary/10' : 'bg-success/10'
                        }`}>
                          {activity.type === 'achievement' ? (
                            <Award className="h-5 w-5 text-warning" />
                          ) : activity.type === 'assignment' ? (
                            <BookOpen className="h-5 w-5 text-primary" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-success" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                      {activity.score && (
                        <Badge variant="default">{activity.score}%</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subjects Tab */}
          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {child.subjects.map((subject, index) => (
                <motion.div
                  key={subject.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border-none shadow-lg ${
                    subject.status === 'needs-attention' ? 'border-l-4 border-l-destructive' : ''
                  }`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                        <Badge variant={
                          subject.status === 'excellent' ? 'default' :
                          subject.status === 'good' ? 'secondary' : 'destructive'
                        }>
                          {subject.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <div className="text-4xl font-bold text-foreground">{subject.score}%</div>
                        <div className={`text-sm font-medium ${
                          subject.trend.startsWith('+') ? 'text-success' : 'text-destructive'
                        }`}>
                          {subject.trend} from last month
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* AI Advisor Tab */}
          <TabsContent value="ai-advisor" className="space-y-6">
            <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Parent Advisor
                </CardTitle>
                <CardDescription>
                  Get personalized advice on how to support your child's learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: BookOpen, label: 'Study Tips', desc: 'Home study strategies' },
                    { icon: Heart, label: 'Motivation', desc: 'Encourage learning' },
                    { icon: Target, label: 'Goal Setting', desc: 'Academic targets' },
                    { icon: Shield, label: 'Screen Time', desc: 'Balance guidance' },
                  ].map((tool) => (
                    <Button
                      key={tool.label}
                      variant="outline"
                      className="h-auto p-4 flex items-start gap-3 hover:bg-primary/5 hover:border-primary"
                    >
                      <tool.icon className="h-6 w-6 text-primary mt-1" />
                      <div className="text-left">
                        <span className="font-medium block">{tool.label}</span>
                        <span className="text-xs text-muted-foreground">{tool.desc}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-muted/50">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-warning" />
                    Today's Recommendation
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Based on {child.name}'s performance, we recommend focusing on <strong>Physics</strong> this week. 
                    Consider setting aside 30 minutes for practice problems and reviewing Newton's Laws together.
                  </p>
                  <Button variant="link" className="mt-2 p-0 h-auto">
                    Get detailed study plan →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Tab */}
          <TabsContent value="communication" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Message Teachers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Mathematics Teacher', 'Physics Teacher', 'Class Teacher'].map((teacher) => (
                      <Button key={teacher} variant="outline" className="w-full justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {teacher.split(' ').map(w => w[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{teacher}</span>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { title: 'Parent-Teacher Meeting', date: 'Jan 25, 2024', time: '2:00 PM' },
                      { title: 'Mid-Term Exams Start', date: 'Feb 5, 2024', time: 'All day' },
                      { title: 'Science Fair', date: 'Feb 15, 2024', time: '10:00 AM' },
                    ].map((event) => (
                      <div key={event.title} className="p-3 rounded-lg bg-muted/30">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.date} • {event.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  Reports & Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <Download className="h-6 w-6 text-primary" />
                    <span>Term Report Card</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <Download className="h-6 w-6 text-primary" />
                    <span>Attendance Record</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <Download className="h-6 w-6 text-primary" />
                    <span>ECZ Readiness Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ParentDashboard;
