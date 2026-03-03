import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Rocket, TrendingUp, DollarSign, Users, Lightbulb, BarChart3,
  Target, Globe, Briefcase, FileText, Zap, Award,
  PieChart, BookOpen, MessageSquare, Star
} from 'lucide-react';
import { OnboardingWelcomeBanner } from './OnboardingWelcomeBanner';

interface EntrepreneurDashboardViewProps {
  userName: string;
}

export const EntrepreneurDashboardView = ({ userName }: EntrepreneurDashboardViewProps) => {
  const stats = [
    { title: "Business Score", value: "78/100", icon: Target, color: "text-emerald-600", bg: "bg-emerald-50", change: "+5 this month" },
    { title: "Courses Done", value: "14", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50", change: "3 in progress" },
    { title: "Network Size", value: "156", icon: Users, color: "text-purple-600", bg: "bg-purple-50", change: "+23 connections" },
    { title: "Pitch Score", value: "8.5/10", icon: Award, color: "text-amber-600", bg: "bg-amber-50", change: "Investor ready" },
  ];

  const ventures = [
    { name: "AgriTech Zambia", stage: "Growth", funding: "ZMW 150K", progress: 68, sector: "Agriculture" },
    { name: "EduConnect App", stage: "MVP", funding: "Bootstrapped", progress: 42, sector: "EdTech" },
    { name: "HealthLink Platform", stage: "Ideation", funding: "Seeking", progress: 15, sector: "HealthTech" },
  ];

  const learningPaths = [
    { title: "Financial Modeling", progress: 90, modules: "12/14" },
    { title: "Digital Marketing", progress: 65, modules: "8/12" },
    { title: "Legal Fundamentals", progress: 30, modules: "3/10" },
  ];

  const mentors = [
    { name: "Dr. Chanda Mwale", expertise: "Venture Capital", rating: 4.9, sessions: 8 },
    { name: "Sarah Tembo", expertise: "Marketing Strategy", rating: 4.7, sessions: 5 },
  ];

  const tools = [
    { icon: Lightbulb, title: "Idea Validator", description: "AI market analysis", link: "/ai-chat", gradient: "from-amber-500 to-orange-600" },
    { icon: FileText, title: "Business Plan", description: "AI-generated plans", link: "/ai-content-studio", gradient: "from-blue-500 to-indigo-600" },
    { icon: PieChart, title: "Financial Tools", description: "Projections & models", link: "/analytics", gradient: "from-emerald-500 to-teal-600" },
    { icon: Globe, title: "Market Research", description: "Zambian market data", link: "/ai-resource-center", gradient: "from-purple-500 to-pink-600" },
    { icon: Briefcase, title: "Pitch Deck", description: "Investor presentations", link: "/ai-content-studio", gradient: "from-red-500 to-rose-600" },
    { icon: MessageSquare, title: "Mentor Connect", description: "Expert guidance", link: "/mentorship", gradient: "from-cyan-500 to-blue-600" },
  ];

  const milestones = [
    { title: "Complete Business Plan", done: true },
    { title: "Build MVP Prototype", done: true },
    { title: "First 100 Users", done: false },
    { title: "Secure Seed Funding", done: false },
    { title: "Launch Marketing Campaign", done: false },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-500/10 via-primary/5 to-background">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {userName}! 🚀</h1>
              <p className="text-muted-foreground">Your entrepreneurship command center</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Lightbulb className="w-4 h-4 mr-2" />
                New Idea
              </Button>
              <Button>
                <Rocket className="w-4 h-4 mr-2" />
                Launch Venture
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <OnboardingWelcomeBanner
        role="entrepreneur"
        userName={userName}
        emoji="🚀"
        subtitle="Here's how to kickstart your entrepreneurial journey."
        tips={[
          { icon: Lightbulb, title: 'Validate Ideas', desc: 'Use AI market analysis to test your business concepts.' },
          { icon: FileText, title: 'Business Plan', desc: 'Generate investor-ready business plans with AI.' },
          { icon: Globe, title: 'Market Research', desc: 'Access Zambian market data and competitive insights.' },
          { icon: MessageSquare, title: 'Mentor Connect', desc: 'Find and connect with experienced business mentors.' },
        ]}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-lg transition-all duration-300 group">
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
        {/* My Ventures */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" />
              My Ventures
            </CardTitle>
            <CardDescription>Track your business journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ventures.map((v, i) => (
              <div key={i} className="p-4 border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{v.name}</h4>
                    <p className="text-sm text-muted-foreground">{v.sector} • {v.funding}</p>
                  </div>
                  <Badge variant={v.stage === 'Growth' ? 'default' : v.stage === 'MVP' ? 'secondary' : 'outline'}>
                    {v.stage}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={v.progress} className="h-2 flex-1" />
                  <span className="text-sm font-bold">{v.progress}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-600" />
              Startup Milestones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-2">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${m.done ? 'bg-emerald-500 border-emerald-500' : 'border-muted-foreground/30'}`}>
                  {m.done && <Zap className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${m.done ? 'line-through text-muted-foreground' : 'font-medium'}`}>
                  {m.title}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Paths */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Business Learning Paths
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {learningPaths.map((lp, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{lp.title}</span>
                  <span className="text-xs text-muted-foreground">{lp.modules} modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={lp.progress} className="h-2 flex-1" />
                  <span className="text-sm font-bold">{lp.progress}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mentors */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              My Mentors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mentors.map((m, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.expertise}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">⭐ {m.rating}</p>
                  <p className="text-xs text-muted-foreground">{m.sessions} sessions</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2">Find More Mentors</Button>
          </CardContent>
        </Card>
      </div>

      {/* Tools */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-600" />
            Entrepreneur Toolkit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map((tool, i) => (
              <Link key={i} to={tool.link}>
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
    </div>
  );
};
