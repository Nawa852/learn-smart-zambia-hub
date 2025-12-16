import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Brain, Award, Target, TrendingUp, Clock, Lightbulb, Mic, Eye, GraduationCap, Zap, Video, Globe, Trophy, Gamepad2, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AICompanion } from '@/components/BrightSphere/AICompanion';
import { GamificationPanel } from '@/components/BrightSphere/GamificationPanel';

interface StudentDashboardViewProps {
  userName: string;
}

export const StudentDashboardView = ({ userName }: StudentDashboardViewProps) => {
  const quickStats = [
    { title: "Study Streak", value: "0", unit: "days", icon: Clock, gradient: "from-blue-500 to-cyan-500" },
    { title: "Courses", value: "0", unit: "active", icon: BookOpen, gradient: "from-emerald-500 to-green-500" },
    { title: "AI Sessions", value: "0", unit: "total", icon: Brain, gradient: "from-purple-500 to-pink-500" },
    { title: "XP Points", value: "0", unit: "earned", icon: Award, gradient: "from-orange-500 to-amber-500" },
  ];

  const aiTools = [
    { icon: Brain, title: "AI Tutor", description: "Get instant help", link: "/study-assistant", gradient: "from-blue-500 to-indigo-600" },
    { icon: Lightbulb, title: "Flashcards", description: "Smart learning", link: "/ai-flashcards", gradient: "from-purple-500 to-pink-500" },
    { icon: Mic, title: "Voice Learning", description: "Audio lessons", link: "/comprehensive-ai-study", gradient: "from-emerald-500 to-teal-500" },
    { icon: Video, title: "Video Hub", description: "Watch & learn", link: "/youtube-learning", gradient: "from-rose-500 to-red-500" },
    { icon: Eye, title: "Mind Maps", description: "Visual learning", link: "/visual-mind-map", gradient: "from-pink-500 to-rose-500" },
    { icon: Globe, title: "Translator", description: "Multi-language", link: "/multilingual-translator", gradient: "from-cyan-500 to-blue-500" },
  ];

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 max-w-2xl bg-muted/50 p-1 rounded-xl">
        <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
          Overview
        </TabsTrigger>
        <TabsTrigger value="ai-companion" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
          <Brain className="w-4 h-4 mr-2" />
          AI Companion
        </TabsTrigger>
        <TabsTrigger value="gamification" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
          <Trophy className="w-4 h-4 mr-2" />
          Rewards
        </TabsTrigger>
        <TabsTrigger value="3d-world" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
          <Gamepad2 className="w-4 h-4 mr-2" />
          3D World
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6 animate-fade-in">
        {/* Welcome Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 border border-primary/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{userName}</span>
            </h1>
            <p className="text-muted-foreground max-w-md">
              Ready to continue your learning journey? Start where you left off or explore something new.
            </p>
            <div className="flex gap-3 mt-6">
              <Button className="gap-2">
                <Play className="w-4 h-4" />
                Continue Learning
              </Button>
              <Button variant="outline" className="gap-2">
                Browse Courses
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{stat.value}</span>
                      <span className="text-sm text-muted-foreground">{stat.unit}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Getting Started */}
          <Card className="lg:col-span-2 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Get Started
              </CardTitle>
              <CardDescription>Complete these steps to begin your learning journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-border/80 hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Enroll in your first course</h4>
                  <p className="text-sm text-muted-foreground">Browse our catalog and find something you love</p>
                </div>
                <Link to="/courses">
                  <Button variant="outline" size="sm">Browse</Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-border/80 hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Try the AI Tutor</h4>
                  <p className="text-sm text-muted-foreground">Get instant help with any subject</p>
                </div>
                <Link to="/multi-ai-tutor">
                  <Button variant="outline" size="sm">Try Now</Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-border/80 hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Create flashcards</h4>
                  <p className="text-sm text-muted-foreground">Generate AI-powered study cards</p>
                </div>
                <Link to="/ai-flashcards">
                  <Button variant="outline" size="sm">Create</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights Panel */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Tips & Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Set your goals</h4>
                    <p className="text-xs text-muted-foreground mt-1">Define what you want to achieve this week</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Track progress</h4>
                    <p className="text-xs text-muted-foreground mt-1">Monitor your learning analytics daily</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Join study groups</h4>
                    <p className="text-xs text-muted-foreground mt-1">Learn better with peers who share your interests</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI-Powered Tools */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              AI-Powered Study Tools
            </CardTitle>
            <CardDescription>Supercharge your learning with intelligent tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {aiTools.map((tool, index) => (
                <Link key={index} to={tool.link}>
                  <div className="group p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer text-center">
                    <div className={`w-12 h-12 mx-auto bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm mt-3">{tool.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="ai-companion" className="animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AICompanion userRole="student" userName={userName} />
          </div>
          <div className="space-y-4">
            <Card className="border-border/50">
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
            <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-bold">BrightSphere Core</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Intelligent AI adapting to your learning style
                </p>
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
                  <h4 className="font-semibold text-sm">AI Voice Pack</h4>
                  <p className="text-xs text-muted-foreground">Custom AI voices</p>
                  <Badge variant="secondary" className="mt-2">250 Points</Badge>
                </div>
                <div className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all cursor-pointer">
                  <h4 className="font-semibold text-sm">Premium Flashcards</h4>
                  <p className="text-xs text-muted-foreground">Unlimited AI cards</p>
                  <Badge variant="secondary" className="mt-2">500 Points</Badge>
                </div>
                <div className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all cursor-pointer">
                  <h4 className="font-semibold text-sm">Certificate</h4>
                  <p className="text-xs text-muted-foreground">Digital credential</p>
                  <Badge variant="secondary" className="mt-2">1000 Points</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="3d-world" className="animate-fade-in">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>3D Learning Universe</CardTitle>
            <CardDescription>Explore interactive 3D environments and virtual labs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="group p-6 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all text-center cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">Virtual Lab</h3>
                <p className="text-sm text-muted-foreground">Conduct experiments in 3D</p>
                <Button className="w-full mt-4" size="sm">Enter Lab</Button>
              </div>
              <div className="group p-6 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all text-center cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">History Explorer</h3>
                <p className="text-sm text-muted-foreground">Walk through historical events</p>
                <Button className="w-full mt-4" size="sm">Start Tour</Button>
              </div>
              <div className="group p-6 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all text-center cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">Anatomy 3D</h3>
                <p className="text-sm text-muted-foreground">Explore human body systems</p>
                <Button className="w-full mt-4" size="sm">Explore</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};