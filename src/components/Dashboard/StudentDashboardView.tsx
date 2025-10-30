import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Brain, Award, Target, TrendingUp, Clock, Star, Globe, Lightbulb, Mic, Eye, GraduationCap, Zap, Video, FileText, Headphones, MessageSquare, Trophy, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AICompanion } from '@/components/BrightSphere/AICompanion';
import { GamificationPanel } from '@/components/BrightSphere/GamificationPanel';

interface StudentDashboardViewProps {
  userName: string;
}

export const StudentDashboardView = ({ userName }: StudentDashboardViewProps) => {
  const quickStats = [
    { title: "Study Streak", value: "12 days", icon: Clock, color: "text-blue-600", bg: "bg-blue-50", change: "Keep it up!" },
    { title: "Courses", value: "5 active", icon: BookOpen, color: "text-green-600", bg: "bg-green-50", change: "2 completed" },
    { title: "AI Sessions", value: "34", icon: Brain, color: "text-purple-600", bg: "bg-purple-50", change: "This week" },
    { title: "XP Points", value: "1,250", icon: Award, color: "text-orange-600", bg: "bg-orange-50", change: "Top 15%" },
  ];

  const activeCourses = [
    { 
      title: "Advanced Mathematics", 
      progress: 68, 
      nextLesson: "Calculus Fundamentals", 
      instructor: "Dr. Mwansa",
      dueDate: "Tomorrow",
      color: "bg-blue-500"
    },
    { 
      title: "Physics & Mechanics", 
      progress: 45, 
      nextLesson: "Newton's Laws", 
      instructor: "Mr. Banda",
      dueDate: "In 3 days",
      color: "bg-green-500"
    },
    { 
      title: "English Literature", 
      progress: 82, 
      nextLesson: "Essay Writing", 
      instructor: "Ms. Phiri",
      dueDate: "Next week",
      color: "bg-purple-500"
    },
  ];

  const aiTools = [
    { icon: Brain, title: "AI Tutor", description: "Ask anything, 24/7", link: "/study-assistant", gradient: "from-blue-500 to-purple-600" },
    { icon: Lightbulb, title: "Smart Flashcards", description: "Auto-generated", link: "/ai-flashcards", gradient: "from-purple-500 to-pink-500" },
    { icon: Mic, title: "Voice Learning", description: "Audio lessons", link: "/comprehensive-ai-study", gradient: "from-green-500 to-teal-500" },
    { icon: Video, title: "Record Lectures", description: "Auto transcribe", link: "/youtube-learning", gradient: "from-orange-500 to-red-500" },
    { icon: Eye, title: "Mind Maps", description: "Visualize concepts", link: "/visual-mind-map", gradient: "from-pink-500 to-red-500" },
    { icon: Globe, title: "Translator", description: "7 languages", link: "/multilingual-translator", gradient: "from-cyan-500 to-blue-500" },
  ];

  const recentActivities = [
    { title: "Completed Physics Quiz", time: "2 hours ago", score: 94, type: "quiz" },
    { title: "AI Voice Q&A - Chemistry", time: "5 hours ago", type: "voice" },
    { title: "Watched: Algebra Tutorial", time: "Yesterday", score: null, type: "video" },
    { title: "Generated Flashcards", time: "2 days ago", type: "flashcard" },
  ];

  const recommendations = [
    { title: "Practice Weak Topics", description: "Algebra word problems need attention", icon: Target, color: "text-red-600" },
    { title: "Best Study Time", description: "Peak performance at 8-10 AM", icon: TrendingUp, color: "text-blue-600" },
    { title: "Join Study Group", description: "3 peers studying Mathematics", icon: GraduationCap, color: "text-green-600" },
  ];

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 max-w-2xl">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="ai-companion">
          <Brain className="w-4 h-4 mr-2" />
          AI Companion
        </TabsTrigger>
        <TabsTrigger value="gamification">
          <Trophy className="w-4 h-4 mr-2" />
          Progress & Rewards
        </TabsTrigger>
        <TabsTrigger value="3d-world">
          <Gamepad2 className="w-4 h-4 mr-2" />
          3D Learning World
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
      {/* Welcome Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
              <p className="text-muted-foreground">Ready to continue your learning journey?</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                All Systems Active
              </Badge>
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
        {/* Active Courses */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              My Active Courses
            </CardTitle>
            <CardDescription>Continue where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeCourses.map((course, index) => (
              <Card key={index} className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">{course.dueDate}</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-sm text-muted-foreground">Next: {course.nextLesson}</p>
                      <Button size="sm">Continue</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-3 border rounded-lg hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-start gap-3">
                  <rec.icon className={`w-5 h-5 ${rec.color} mt-0.5`} />
                  <div>
                    <h4 className="font-semibold text-sm">{rec.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Tools */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            AI-Powered Study Tools
          </CardTitle>
          <CardDescription>Supercharge your learning with AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {aiTools.map((tool, index) => (
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

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                {activity.score && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {activity.score}%
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </TabsContent>

      <TabsContent value="ai-companion">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AICompanion userRole="student" userName={userName} />
          </div>
          <div className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm">AI Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Mic className="w-4 h-4 mr-2" />
                  Voice Learning Mode
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Smart Predictions
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Brain className="w-4 h-4 mr-2" />
                  Multi-Agent Mode
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Globe className="w-4 h-4 mr-2" />
                  Language Switcher
                </Button>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-4 text-center">
                <Brain className="w-12 h-12 mx-auto mb-2 text-purple-600" />
                <h4 className="font-bold">BrightSphere Core</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Quantum-powered AI adapting to your learning style
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="gamification">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GamificationPanel userType="student" />
          </div>
          <div className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm">Rewards Store</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg hover:shadow-md transition-all cursor-pointer">
                  <h4 className="font-semibold text-sm">AI Voice Pack</h4>
                  <p className="text-xs text-muted-foreground">Custom AI voices</p>
                  <Badge variant="secondary" className="mt-2">250 ZedCoins</Badge>
                </div>
                <div className="p-3 border rounded-lg hover:shadow-md transition-all cursor-pointer">
                  <h4 className="font-semibold text-sm">Premium Flashcards</h4>
                  <p className="text-xs text-muted-foreground">Unlimited AI cards</p>
                  <Badge variant="secondary" className="mt-2">500 ZedCoins</Badge>
                </div>
                <div className="p-3 border rounded-lg hover:shadow-md transition-all cursor-pointer">
                  <h4 className="font-semibold text-sm">Certificate</h4>
                  <p className="text-xs text-muted-foreground">Digital credential</p>
                  <Badge variant="secondary" className="mt-2">1000 ZedCoins</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="3d-world">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>3D Learning Universe</CardTitle>
            <CardDescription>Explore interactive 3D environments and virtual labs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Virtual Lab</h3>
                  <p className="text-sm text-muted-foreground">Conduct physics experiments in 3D</p>
                  <Button className="w-full mt-4" size="sm">Enter Lab</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-2">History Explorer</h3>
                  <p className="text-sm text-muted-foreground">Walk through historical events</p>
                  <Button className="w-full mt-4" size="sm">Start Tour</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Anatomy 3D</h3>
                  <p className="text-sm text-muted-foreground">Explore human body systems</p>
                  <Button className="w-full mt-4" size="sm">Explore</Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
