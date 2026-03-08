import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Rocket, TrendingUp, DollarSign, Users, Lightbulb, BarChart3,
  Target, Globe, Briefcase, FileText, Zap, Award,
  PieChart, BookOpen, MessageSquare, Star, Presentation
} from 'lucide-react';
import { OnboardingWelcomeBanner } from './OnboardingWelcomeBanner';
import { useVentures } from '@/hooks/useVentures';

interface EntrepreneurDashboardViewProps {
  userName: string;
}

export const EntrepreneurDashboardView = ({ userName }: EntrepreneurDashboardViewProps) => {
  const { ventures, milestones, loading } = useVentures();

  const totalVentures = ventures.length;
  const totalMilestones = milestones.length;
  const completedMilestones = milestones.filter(m => m.completed).length;
  const avgProgress = totalVentures > 0 ? Math.round(ventures.reduce((s, v) => s + v.progress, 0) / totalVentures) : 0;

  const stats = [
    { title: "Ventures", value: String(totalVentures), icon: Rocket, color: "text-emerald-600", bg: "bg-emerald-50", change: `${avgProgress}% avg progress` },
    { title: "Milestones", value: `${completedMilestones}/${totalMilestones}`, icon: Target, color: "text-blue-600", bg: "bg-blue-50", change: "completed" },
    { title: "Active Stage", value: ventures.find(v => v.stage === 'growth')?.name || ventures[0]?.stage || "—", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50", change: "" },
    { title: "Total Funding", value: `ZMW ${ventures.reduce((s, v) => s + v.funding_amount, 0).toLocaleString()}`, icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50", change: "" },
  ];

  const tools = [
    { icon: Lightbulb, title: "Ventures", description: "Manage ventures", link: "/entrepreneur/ventures", gradient: "from-amber-500 to-orange-600" },
    { icon: FileText, title: "Business Plan", description: "AI-generated plans", link: "/entrepreneur/business-plan", gradient: "from-blue-500 to-indigo-600" },
    { icon: Presentation, title: "Pitch Deck", description: "Investor presentations", link: "/entrepreneur/pitch-deck", gradient: "from-emerald-500 to-teal-600" },
    { icon: Globe, title: "Market Research", description: "Zambian market data", link: "/entrepreneur/market-research", gradient: "from-purple-500 to-pink-600" },
    { icon: Target, title: "Milestones", description: "Track progress", link: "/entrepreneur/milestones", gradient: "from-red-500 to-rose-600" },
    { icon: DollarSign, title: "Financials", description: "Revenue & expenses", link: "/entrepreneur/financials", gradient: "from-green-500 to-emerald-600" },
    { icon: Briefcase, title: "Funding", description: "Find opportunities", link: "/entrepreneur/funding", gradient: "from-indigo-500 to-blue-600" },
    { icon: MessageSquare, title: "Mentor Connect", description: "Expert guidance", link: "/mentorship-hub", gradient: "from-cyan-500 to-blue-600" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-500/10 via-primary/5 to-background">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {userName}! 🚀</h1>
              <p className="text-muted-foreground">Your entrepreneurship command center</p>
            </div>
            <div className="flex gap-2">
              <Link to="/entrepreneur/ventures"><Button variant="outline"><Lightbulb className="w-4 h-4 mr-2" />My Ventures</Button></Link>
              <Link to="/entrepreneur/business-plan"><Button><Rocket className="w-4 h-4 mr-2" />Business Plan</Button></Link>
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
          { icon: Lightbulb, title: 'Create Ventures', desc: 'Add and track your business ventures with milestones.' },
          { icon: FileText, title: 'Business Plan', desc: 'Generate investor-ready business plans with AI.' },
          { icon: Globe, title: 'Market Research', desc: 'Access Zambian market data and competitive insights.' },
          { icon: MessageSquare, title: 'Mentor Connect', desc: 'Find and connect with experienced business mentors.' },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  {stat.change && <p className="text-xs text-muted-foreground">{stat.change}</p>}
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
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Rocket className="w-5 h-5 text-primary" />My Ventures</CardTitle>
            <CardDescription>Track your business journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? <p className="text-muted-foreground">Loading...</p> :
              ventures.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-2">No ventures yet</p>
                  <Link to="/entrepreneur/ventures"><Button size="sm">Create Your First Venture</Button></Link>
                </div>
              ) : ventures.slice(0, 3).map(v => (
                <div key={v.id} className="p-4 border rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{v.name}</h4>
                      <p className="text-sm text-muted-foreground">{v.sector || 'General'} • {v.funding_status}</p>
                    </div>
                    <Badge variant={v.stage === 'growth' || v.stage === 'scaling' ? 'default' : v.stage === 'mvp' ? 'secondary' : 'outline'}>
                      {v.stage}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={v.progress} className="h-2 flex-1" />
                    <span className="text-sm font-bold">{v.progress}%</span>
                  </div>
                </div>
              ))}
            {ventures.length > 3 && (
              <Link to="/entrepreneur/ventures"><Button variant="outline" className="w-full">View All Ventures</Button></Link>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Star className="w-5 h-5 text-amber-600" />Recent Milestones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {milestones.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No milestones yet. Add some to your ventures!</p>
            ) : milestones.slice(0, 5).map(m => (
              <div key={m.id} className="flex items-center gap-3 p-2">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${m.completed ? 'bg-emerald-500 border-emerald-500' : 'border-muted-foreground/30'}`}>
                  {m.completed && <Zap className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${m.completed ? 'line-through text-muted-foreground' : 'font-medium'}`}>{m.title}</span>
              </div>
            ))}
            <Link to="/entrepreneur/milestones"><Button variant="outline" size="sm" className="w-full">Manage Milestones</Button></Link>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-amber-600" />Entrepreneur Toolkit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
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
