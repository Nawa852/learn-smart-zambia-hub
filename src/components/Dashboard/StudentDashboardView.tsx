import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Brain, Award, Target, TrendingUp, Clock, Lightbulb, Mic, Eye, 
  GraduationCap, Zap, Video, Globe, Trophy, Gamepad2, ArrowRight, Play,
  Camera, FileText, Users, MessageCircle, Search, Upload, Star, Flame,
  BarChart3, Calendar, CheckCircle2, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AICompanion } from '@/components/BrightSphere/AICompanion';
import { GamificationPanel } from '@/components/BrightSphere/GamificationPanel';
import BrightSphereLogo from "@/assets/brightsphere-logo.svg";

interface StudentDashboardViewProps {
  userName: string;
}

export const StudentDashboardView = ({ userName }: StudentDashboardViewProps) => {
  const quickStats = [
    { title: "Study Streak", value: "0", unit: "days", icon: Flame, gradient: "from-orange-500 to-red-500" },
    { title: "Courses", value: "0", unit: "enrolled", icon: BookOpen, gradient: "from-blue-500 to-cyan-500" },
    { title: "AI Sessions", value: "0", unit: "today", icon: Brain, gradient: "from-purple-500 to-pink-500" },
    { title: "XP Points", value: "0", unit: "total", icon: Award, gradient: "from-amber-500 to-yellow-500" },
  ];

  const platformFeatures = [
    { 
      category: "ChatEDU Style",
      items: [
        { icon: Brain, title: "AI Tutor with Citations", description: "Get answers with source references", link: "/multi-ai-tutor", gradient: "from-blue-600 to-indigo-600" },
        { icon: FileText, title: "Practice Questions", description: "Dynamic quiz generation", link: "/ai-quiz-creator", gradient: "from-cyan-500 to-blue-500" },
        { icon: Lightbulb, title: "Study Guides", description: "AI-generated study materials", link: "/ai-flashcards", gradient: "from-emerald-500 to-teal-500" },
      ]
    },
    {
      category: "Filo Style", 
      items: [
        { icon: Camera, title: "Photo Homework Solver", description: "Upload image, get solution", link: "/comprehensive-ai-study", gradient: "from-rose-500 to-pink-500" },
        { icon: Upload, title: "Document Upload", description: "Process any document", link: "/study-materials", gradient: "from-violet-500 to-purple-500" },
        { icon: BarChart3, title: "Visual Diagrams", description: "Graphs, geometry, maps", link: "/visual-mind-map", gradient: "from-orange-500 to-amber-500" },
      ]
    },
    {
      category: "Coursera/Udemy Style",
      items: [
        { icon: Video, title: "Video Learning", description: "Watch & learn with AI notes", link: "/youtube-learning", gradient: "from-red-500 to-rose-500" },
        { icon: Award, title: "Certifications", description: "Earn verified certificates", link: "/achievements", gradient: "from-amber-500 to-yellow-500" },
        { icon: Target, title: "Learning Paths", description: "Personalized course tracks", link: "/ai-learning-paths", gradient: "from-green-500 to-emerald-500" },
      ]
    }
  ];

  const quickActions = [
    { icon: Brain, label: "Ask AI Tutor", link: "/multi-ai-tutor", color: "text-blue-500" },
    { icon: Camera, label: "Photo Solver", link: "/comprehensive-ai-study", color: "text-pink-500" },
    { icon: FileText, label: "Take Quiz", link: "/ecz-exam-simulator", color: "text-purple-500" },
    { icon: Lightbulb, label: "Flashcards", link: "/ai-flashcards", color: "text-amber-500" },
    { icon: Users, label: "Study Groups", link: "/study-groups", color: "text-emerald-500" },
    { icon: MessageCircle, label: "Messages", link: "/messenger", color: "text-cyan-500" },
  ];

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 max-w-2xl bg-muted/50 p-1 rounded-xl">
        <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
          Overview
        </TabsTrigger>
        <TabsTrigger value="ai-hub" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
          <img src={BrightSphereLogo} alt="" className="w-4 h-4 mr-2" />
          AI Hub
        </TabsTrigger>
        <TabsTrigger value="gamification" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
          <Trophy className="w-4 h-4 mr-2" />
          Rewards
        </TabsTrigger>
        <TabsTrigger value="explore" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
          <Sparkles className="w-4 h-4 mr-2" />
          Explore
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6 animate-fade-in">
        {/* Welcome Header with BrightSphere branding */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 border border-primary/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32">
            <img src={BrightSphereLogo} alt="" className="w-full h-full opacity-10" />
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <img src={BrightSphereLogo} alt="BrightSphere" className="w-8 h-8" />
              <span className="text-sm font-medium text-muted-foreground">BrightSphere AI</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{userName}</span>
            </h1>
            <p className="text-muted-foreground max-w-md">
              Your AI-powered learning companion. Ask questions, solve problems, and master any subject.
            </p>
            <div className="flex gap-3 mt-6">
              <Link to="/multi-ai-tutor">
                <Button className="gap-2">
                  <Brain className="w-4 h-4" />
                  Start AI Tutor
                </Button>
              </Link>
              <Link to="/comprehensive-ai-study">
                <Button variant="outline" className="gap-2">
                  <Camera className="w-4 h-4" />
                  Photo Solver
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <span className="text-xs text-muted-foreground">{stat.unit}</span>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions Bar */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link}>
                  <Button variant="outline" size="sm" className="gap-2 hover:border-primary/50 transition-colors">
                    <action.icon className={`w-4 h-4 ${action.color}`} />
                    {action.label}
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Getting Started */}
          <Card className="lg:col-span-2 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Start Learning Today
              </CardTitle>
              <CardDescription>Complete these steps to unlock your potential</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/multi-ai-tutor" className="block">
                <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-border/80 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Try the AI Tutor</h4>
                    <p className="text-sm text-muted-foreground">Get instant help with any subject - just like having a personal teacher</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Link>
              
              <Link to="/comprehensive-ai-study" className="block">
                <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-border/80 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Upload & Solve</h4>
                    <p className="text-sm text-muted-foreground">Take a photo of any problem and get step-by-step solutions</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Link>
              
              <Link to="/courses" className="block">
                <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-border/80 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Browse Courses</h4>
                    <p className="text-sm text-muted-foreground">Explore our catalog with personalized AI recommendations</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Link>
            </CardContent>
          </Card>

          {/* AI Insights Panel */}
          <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <img src={BrightSphereLogo} alt="" className="w-5 h-5" />
                BrightSphere AI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center shadow-xl">
                  <img src={BrightSphereLogo} alt="" className="w-10 h-10" />
                </div>
                <h4 className="font-bold">Your AI Learning Companion</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Combining the best of ChatEDU, Filo, Coursera, Udemy & more
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Citation-based answers</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Photo homework solver</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Personalized learning paths</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Auto-grading & feedback</span>
                </div>
              </div>

              <Link to="/multi-ai-tutor">
                <Button className="w-full gap-2 mt-2">
                  <Sparkles className="w-4 h-4" />
                  Start Learning
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Platform Features Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-500" />
            All-in-One Learning Platform
          </h2>
          
          {platformFeatures.map((category, catIndex) => (
            <div key={catIndex} className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {category.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {category.items.map((item, index) => (
                  <Link key={index} to={item.link}>
                    <Card className="group h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer border-border/50">
                      <CardContent className="p-5">
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg mb-4`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="ai-hub" className="animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AICompanion userRole="student" userName={userName} />
          </div>
          <div className="space-y-4">
            <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <img src={BrightSphereLogo} alt="" className="w-5 h-5" />
                  BrightSphere Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/comprehensive-ai-study">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Camera className="w-4 h-4 mr-2 text-pink-500" />
                    Photo Problem Solver
                  </Button>
                </Link>
                <Link to="/ai-flashcards">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Lightbulb className="w-4 h-4 mr-2 text-amber-500" />
                    AI Flashcard Generator
                  </Button>
                </Link>
                <Link to="/visual-mind-map">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Eye className="w-4 h-4 mr-2 text-purple-500" />
                    Visual Mind Maps
                  </Button>
                </Link>
                <Link to="/multilingual-translator">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Globe className="w-4 h-4 mr-2 text-blue-500" />
                    Multi-Language Support
                  </Button>
                </Link>
                <Link to="/semantic-search">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Search className="w-4 h-4 mr-2 text-emerald-500" />
                    Smart Search
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="gamification" className="animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GamificationPanel userType="student" />
          </div>
          <div className="space-y-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-sm">Rewards Store</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all cursor-pointer">
                  <h4 className="font-semibold text-sm">Premium AI Voice</h4>
                  <p className="text-xs text-muted-foreground">Custom AI voice packs</p>
                  <Badge variant="secondary" className="mt-2">250 XP</Badge>
                </div>
                <div className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all cursor-pointer">
                  <h4 className="font-semibold text-sm">Unlimited Flashcards</h4>
                  <p className="text-xs text-muted-foreground">No daily limits</p>
                  <Badge variant="secondary" className="mt-2">500 XP</Badge>
                </div>
                <div className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all cursor-pointer">
                  <h4 className="font-semibold text-sm">Digital Certificate</h4>
                  <p className="text-xs text-muted-foreground">Verified credential</p>
                  <Badge variant="secondary" className="mt-2">1000 XP</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="explore" className="animate-fade-in space-y-6">
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center shadow-xl">
            <img src={BrightSphereLogo} alt="" className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Explore BrightSphere</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Discover all the powerful features from leading platforms like ChatEDU, Filo, Coursera, Udemy, and more.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Brain, title: "AI Tutor", desc: "ChatEDU style", link: "/multi-ai-tutor", gradient: "from-blue-500 to-indigo-600" },
            { icon: Camera, title: "Photo Solver", desc: "Filo style", link: "/comprehensive-ai-study", gradient: "from-pink-500 to-rose-600" },
            { icon: Video, title: "Video Learning", desc: "Udemy style", link: "/youtube-learning", gradient: "from-red-500 to-rose-500" },
            { icon: Award, title: "Certificates", desc: "Coursera style", link: "/achievements", gradient: "from-amber-500 to-yellow-500" },
            { icon: Target, title: "Learning Paths", desc: "Personalized", link: "/ai-learning-paths", gradient: "from-emerald-500 to-teal-500" },
            { icon: Gamepad2, title: "Interactive Games", desc: "Fun learning", link: "/interactive-ecz-games", gradient: "from-purple-500 to-violet-500" },
            { icon: Users, title: "Study Groups", desc: "Collaborate", link: "/study-groups", gradient: "from-cyan-500 to-blue-500" },
            { icon: BarChart3, title: "Analytics", desc: "Track progress", link: "/learning-analytics", gradient: "from-orange-500 to-amber-500" },
          ].map((item, index) => (
            <Link key={index} to={item.link}>
              <Card className="group hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer h-full border-border/50">
                <CardContent className="p-5 text-center">
                  <div className={`w-12 h-12 mx-auto bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg mb-3`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
