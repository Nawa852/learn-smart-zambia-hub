import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Users, FileText, CheckCircle, Clock, TrendingUp,
  Brain, Sparkles, Calendar, BarChart3, MessageSquare, Settings,
  Upload, Download, PlusCircle, Search, Filter, Bell, Award,
  ClipboardList, GraduationCap, Target, Zap, ChevronRight,
  Play, Edit, Trash2, Eye, Star, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MainLayout } from '@/components/Layout/MainLayout';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [lessonPrompt, setLessonPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const stats = [
    { label: 'Total Students', value: '156', icon: Users, color: 'bg-primary', change: '+12 this term' },
    { label: 'Lessons Created', value: '48', icon: BookOpen, color: 'bg-accent', change: '+8 this month' },
    { label: 'Assignments Graded', value: '324', icon: CheckCircle, color: 'bg-success', change: '92% graded' },
    { label: 'Avg. Class Score', value: '76%', icon: TrendingUp, color: 'bg-warning', change: '+5% improvement' },
  ];

  const classes = [
    { name: 'Grade 12 Mathematics', students: 42, nextLesson: 'Calculus: Integration', time: '9:00 AM', progress: 78 },
    { name: 'Grade 11 Physics', students: 38, nextLesson: 'Mechanics: Newton\'s Laws', time: '11:00 AM', progress: 65 },
    { name: 'Grade 10 Science', students: 45, nextLesson: 'Chemistry: Periodic Table', time: '2:00 PM', progress: 82 },
    { name: 'Grade 9 Mathematics', students: 31, nextLesson: 'Algebra: Quadratic Equations', time: '3:30 PM', progress: 71 },
  ];

  const recentAssignments = [
    { title: 'Calculus Test - Chapter 5', class: 'Grade 12 Math', submitted: 38, total: 42, dueDate: '2024-01-20', status: 'grading' },
    { title: 'Physics Lab Report', class: 'Grade 11 Physics', submitted: 35, total: 38, dueDate: '2024-01-18', status: 'completed' },
    { title: 'Periodic Table Quiz', class: 'Grade 10 Science', submitted: 45, total: 45, dueDate: '2024-01-22', status: 'pending' },
  ];

  const atRiskStudents = [
    { name: 'Chanda Mwamba', class: 'Grade 12 Math', issue: 'Missed 3 assignments', score: 45 },
    { name: 'Joseph Banda', class: 'Grade 11 Physics', issue: 'Declining test scores', score: 52 },
    { name: 'Grace Tembo', class: 'Grade 10 Science', issue: 'Low attendance', score: 58 },
  ];

  const handleGenerateLesson = async () => {
    if (!lessonPrompt.trim()) return;
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

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
              <h1 className="text-3xl font-bold text-foreground">Welcome back, Mr. Mulenga</h1>
              <p className="text-muted-foreground mt-1">Here's what's happening with your classes today</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                <Badge variant="destructive" className="ml-1">5</Badge>
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Lesson
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-foreground mt-1">{stat.value}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-xl`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="ai-tools" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Tools
            </TabsTrigger>
            <TabsTrigger value="classes" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              My Classes
            </TabsTrigger>
            <TabsTrigger value="grading" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Grading
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Schedule */}
              <Card className="lg:col-span-2 border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Today's Classes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classes.map((cls, index) => (
                      <motion.div
                        key={cls.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <GraduationCap className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{cls.name}</h4>
                            <p className="text-sm text-muted-foreground">{cls.nextLesson}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{cls.time}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{cls.students} students</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* At-Risk Students */}
              <Card className="border-none shadow-lg border-l-4 border-l-destructive">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    Students Needing Attention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {atRiskStudents.map((student, index) => (
                      <div key={student.name} className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-foreground">{student.name}</h4>
                          <Badge variant="destructive">{student.score}%</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{student.class}</p>
                        <p className="text-xs text-destructive mt-1">{student.issue}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All At-Risk Students
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Assignments */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    Recent Assignments
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Assignment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAssignments.map((assignment, index) => (
                    <div key={assignment.title} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          assignment.status === 'completed' ? 'bg-success/10' :
                          assignment.status === 'grading' ? 'bg-warning/10' : 'bg-primary/10'
                        }`}>
                          <FileText className={`h-5 w-5 ${
                            assignment.status === 'completed' ? 'text-success' :
                            assignment.status === 'grading' ? 'text-warning' : 'text-primary'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{assignment.title}</h4>
                          <p className="text-sm text-muted-foreground">{assignment.class}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{assignment.submitted}/{assignment.total} submitted</p>
                          <Progress value={(assignment.submitted / assignment.total) * 100} className="h-2 w-24 mt-1" />
                        </div>
                        <Badge variant={
                          assignment.status === 'completed' ? 'default' :
                          assignment.status === 'grading' ? 'secondary' : 'outline'
                        }>
                          {assignment.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Tools Tab */}
          <TabsContent value="ai-tools" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Lesson Generator */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Lesson Generator
                  </CardTitle>
                  <CardDescription>
                    Generate complete ECZ-aligned lesson plans with a single prompt
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Describe your lesson</label>
                    <Textarea
                      placeholder="e.g., Create a Grade 12 lesson on Integration for Calculus, including examples, activities, and homework..."
                      value={lessonPrompt}
                      onChange={(e) => setLessonPrompt(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={handleGenerateLesson}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4 mr-2" />
                          Generate Lesson
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t">
                    <Button variant="outline" size="sm" className="justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Scheme of Work
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <ClipboardList className="h-4 w-4 mr-2" />
                      Assessment
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Target className="h-4 w-4 mr-2" />
                      Learning Objectives
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Study Notes
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Auto Marking System */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-success/5 to-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    Smart Auto-Grading
                  </CardTitle>
                  <CardDescription>
                    AI-powered marking for objective and structured answers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/50 border-2 border-dashed border-muted-foreground/20 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drop student submissions here or click to upload
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      Select Files
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="text-sm">Multiple Choice Auto-Grading</span>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Brain className="h-5 w-5 text-primary" />
                        <span className="text-sm">AI Essay Analysis</span>
                      </div>
                      <Badge variant="secondary">Beta</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Eye className="h-5 w-5 text-accent" />
                        <span className="text-sm">Handwriting Recognition</span>
                      </div>
                      <Badge variant="outline">Coming Soon</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Assistant */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Teacher AI Assistant
                </CardTitle>
                <CardDescription>
                  Your intelligent teaching companion for quick help
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: BookOpen, label: 'Explain Topic', desc: 'Get detailed explanations' },
                    { icon: Zap, label: 'Remedial Lesson', desc: 'Create targeted help' },
                    { icon: TrendingUp, label: 'Class Insights', desc: 'Analyze performance' },
                    { icon: Award, label: 'Motivation Tips', desc: 'Engage students' },
                  ].map((tool) => (
                    <Button
                      key={tool.label}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-primary/5 hover:border-primary"
                    >
                      <tool.icon className="h-6 w-6 text-primary" />
                      <span className="font-medium">{tool.label}</span>
                      <span className="text-xs text-muted-foreground">{tool.desc}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search classes..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button className="bg-primary">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Class
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {classes.map((cls, index) => (
                <motion.div
                  key={cls.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{cls.name}</CardTitle>
                        <Badge variant="outline">{cls.students} students</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Syllabus Progress</span>
                          <span className="font-medium">{cls.progress}%</span>
                        </div>
                        <Progress value={cls.progress} className="h-2" />
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Next: {cls.nextLesson}</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                        <Button size="sm" className="flex-1 bg-primary">
                          <Play className="h-4 w-4 mr-2" />
                          Start
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Grading Tab */}
          <TabsContent value="grading" className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pending Grading</CardTitle>
                  <Button className="bg-primary">
                    <Brain className="h-4 w-4 mr-2" />
                    Auto-Grade All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAssignments.filter(a => a.status !== 'completed').map((assignment) => (
                    <div key={assignment.title} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                      <div className="flex items-center gap-4">
                        <div className="bg-warning/10 p-3 rounded-lg">
                          <FileText className="h-5 w-5 text-warning" />
                        </div>
                        <div>
                          <h4 className="font-medium">{assignment.title}</h4>
                          <p className="text-sm text-muted-foreground">{assignment.class}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{assignment.submitted} to grade</p>
                          <p className="text-xs text-muted-foreground">Due: {assignment.dueDate}</p>
                        </div>
                        <Button size="sm" className="bg-primary">
                          Grade Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Class Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classes.map((cls) => (
                      <div key={cls.name}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="truncate">{cls.name}</span>
                          <span className="font-medium">{cls.progress}%</span>
                        </div>
                        <Progress value={cls.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Subject Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { subject: 'Mathematics', trend: '+8%', color: 'text-success' },
                      { subject: 'Physics', trend: '+5%', color: 'text-success' },
                      { subject: 'Science', trend: '-2%', color: 'text-destructive' },
                    ].map((item) => (
                      <div key={item.subject} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <span>{item.subject}</span>
                        <span className={`font-medium ${item.color}`}>{item.trend}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Term Progress Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Student Performance
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      ECZ Readiness Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default TeacherDashboard;
