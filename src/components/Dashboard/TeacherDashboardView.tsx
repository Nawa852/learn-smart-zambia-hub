import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, BookOpen, ClipboardCheck, TrendingUp, AlertCircle, Calendar, FileText, MessageSquare, Video, Award, PieChart, UserCheck, Brain, Wand2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AICompanion } from '@/components/BrightSphere/AICompanion';

interface TeacherDashboardViewProps {
  userName: string;
}

export const TeacherDashboardView = ({ userName }: TeacherDashboardViewProps) => {
  const quickStats = [
    { title: "Total Students", value: "124", icon: Users, color: "text-blue-600", bg: "bg-blue-50", change: "+8 this month" },
    { title: "Active Classes", value: "6", icon: BookOpen, color: "text-green-600", bg: "bg-green-50", change: "3 today" },
    { title: "Pending Assignments", value: "23", icon: ClipboardCheck, color: "text-orange-600", bg: "bg-orange-50", change: "To review" },
    { title: "Avg Performance", value: "78%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50", change: "+5% improvement" },
  ];

  const myClasses = [
    { 
      name: "Grade 12 - Physics", 
      students: 28, 
      attendance: 85, 
      avgScore: 76,
      nextSession: "Today, 10:00 AM",
      color: "bg-blue-500"
    },
    { 
      name: "Grade 11 - Mathematics", 
      students: 32, 
      attendance: 92, 
      avgScore: 82,
      nextSession: "Tomorrow, 2:00 PM",
      color: "bg-green-500"
    },
    { 
      name: "Grade 10 - Chemistry", 
      students: 25, 
      attendance: 88, 
      avgScore: 71,
      nextSession: "Friday, 9:00 AM",
      color: "bg-purple-500"
    },
  ];

  const pendingTasks = [
    { title: "Grade Physics Exam - Grade 12", count: 28, priority: "high", dueDate: "Today" },
    { title: "Review Chemistry Lab Reports", count: 15, priority: "medium", dueDate: "Tomorrow" },
    { title: "Prepare Math Quiz", count: 1, priority: "low", dueDate: "This week" },
  ];

  const studentAlerts = [
    { student: "John Mwamba", issue: "3 consecutive absences", severity: "high" },
    { student: "Grace Banda", issue: "Assignment overdue", severity: "medium" },
    { student: "Peter Phiri", issue: "Score dropped 15%", severity: "medium" },
  ];

  const teacherTools = [
    { icon: FileText, title: "Course Builder", description: "Create lessons", link: "/instructor", gradient: "from-blue-500 to-purple-600" },
    { icon: Video, title: "Live Classes", description: "Virtual classroom", link: "/live-learning", gradient: "from-green-500 to-teal-500" },
    { icon: ClipboardCheck, title: "Assignment Hub", description: "Manage tasks", link: "/ecz-assignment-hub", gradient: "from-orange-500 to-red-500" },
    { icon: PieChart, title: "Analytics", description: "Student insights", link: "/learning-analytics", gradient: "from-purple-500 to-pink-500" },
    { icon: MessageSquare, title: "Communication", description: "Message students", link: "/messenger", gradient: "from-cyan-500 to-blue-500" },
    { icon: Award, title: "Certificates", description: "Issue credentials", link: "/achievements", gradient: "from-yellow-500 to-orange-500" },
  ];

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 max-w-2xl">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="ai-assistant">
          <Brain className="w-4 h-4 mr-2" />
          AI Teaching Assistant
        </TabsTrigger>
        <TabsTrigger value="lesson-builder">
          <Wand2 className="w-4 h-4 mr-2" />
          AI Lesson Builder
        </TabsTrigger>
        <TabsTrigger value="marking">
          <ClipboardCheck className="w-4 h-4 mr-2" />
          Smart Marking
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
      {/* Welcome Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Good morning, {userName}! 👨‍🏫</h1>
              <p className="text-muted-foreground">You have 3 classes scheduled today</p>
            </div>
            <div className="flex items-center gap-2">
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                View Schedule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Classes */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              My Classes
            </CardTitle>
            <CardDescription>Overview of your teaching schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {myClasses.map((classItem, index) => (
              <Card key={index} className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{classItem.name}</h3>
                        <p className="text-sm text-muted-foreground">{classItem.students} students</p>
                      </div>
                      <Badge variant="outline" className="text-xs">{classItem.nextSession}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Attendance</p>
                        <div className="flex items-center gap-2">
                          <Progress value={classItem.attendance} className="h-2 flex-1" />
                          <span className="font-semibold">{classItem.attendance}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Avg Score</p>
                        <div className="flex items-center gap-2">
                          <Progress value={classItem.avgScore} className="h-2 flex-1" />
                          <span className="font-semibold">{classItem.avgScore}%</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="w-full">View Class Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Student Alerts */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Student Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {studentAlerts.map((alert, index) => (
              <div key={index} className="p-3 border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{alert.student}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.issue}</p>
                    <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                      Take Action
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Pending Tasks */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-green-600" />
            Pending Tasks
          </CardTitle>
          <CardDescription>Assignments and activities requiring your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <Badge variant={
                    task.priority === 'high' ? 'destructive' : 
                    task.priority === 'medium' ? 'default' : 'secondary'
                  }>
                    {task.priority}
                  </Badge>
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.count} items • Due: {task.dueDate}</p>
                  </div>
                </div>
                <Button size="sm">Review</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Teacher Tools */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            Teaching Tools
          </CardTitle>
          <CardDescription>Powerful tools to enhance your teaching</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {teacherTools.map((tool, index) => (
              <Link key={index} to={tool.link}>
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                  <CardContent className="p-4 text-center space-y-2">
                    <div className={`w-12 h-12 mx-auto bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm">{tool.title}</h3>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
      </TabsContent>

      <TabsContent value="ai-assistant">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AICompanion userRole="teacher" userName={userName} />
          </div>
          <div className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm">AI Teaching Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Lesson Plan
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Quiz
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <PieChart className="w-4 h-4 mr-2" />
                  Analyze Student Data
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Draft Parent Updates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="lesson-builder">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>AI Lesson Generator</CardTitle>
            <CardDescription>Create ECZ-aligned lessons in seconds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>English</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Grade</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>Grade 10</option>
                    <option>Grade 11</option>
                    <option>Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Duration</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>40 minutes</option>
                    <option>80 minutes</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Topic</label>
                <input 
                  type="text" 
                  placeholder="e.g., Quadratic Equations" 
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <Button className="w-full">
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Complete Lesson Plan
              </Button>
            </div>
            <div className="mt-6 p-4 border rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">What will be generated:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>✓ Lesson objectives (ECZ-aligned)</li>
                <li>✓ Starter activities</li>
                <li>✓ Main teaching content</li>
                <li>✓ Student activities & worksheets</li>
                <li>✓ Assessment questions</li>
                <li>✓ Homework assignments</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="marking">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Smart Marking System</CardTitle>
            <CardDescription>AI-powered grading and feedback generation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <ClipboardCheck className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold mb-2">Upload Scripts</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload photos or PDFs of student work
                    </p>
                    <Button className="w-full">Upload & Auto-Grade</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold mb-2">AI Feedback</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Generate personalized feedback comments
                    </p>
                    <Button className="w-full">Generate Feedback</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Recent Marking Jobs</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Grade 12 Physics - 28 scripts</p>
                    <p className="text-xs text-muted-foreground">Uploaded 2 hours ago</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Grade 11 Math Quiz - 32 scripts</p>
                    <p className="text-xs text-muted-foreground">Processing...</p>
                  </div>
                  <Badge variant="secondary">85% Done</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
