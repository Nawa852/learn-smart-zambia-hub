import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Code, Terminal, GitBranch, Bug, Cpu, Database, Zap, Award, BookOpen,
  FileCode, Braces, Server, Layers, Sparkles
} from 'lucide-react';
import { OnboardingWelcomeBanner } from './OnboardingWelcomeBanner';
import { useDeveloperProjects } from '@/hooks/useDeveloperProjects';

interface DeveloperDashboardViewProps {
  userName: string;
}

export const DeveloperDashboardView = ({ userName }: DeveloperDashboardViewProps) => {
  const { projects, loading } = useDeveloperProjects();

  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const avgProgress = projects.length > 0 ? Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length) : 0;

  const stats = [
    { title: "Total Projects", value: String(projects.length), icon: Code, color: "text-cyan-600", bg: "bg-cyan-50", change: `${activeProjects} active` },
    { title: "Completed", value: String(completedProjects), icon: Zap, color: "text-green-600", bg: "bg-green-50", change: `${avgProgress}% avg progress` },
    { title: "Languages", value: String(new Set(projects.map(p => p.language).filter(Boolean)).size), icon: Braces, color: "text-purple-600", bg: "bg-purple-50", change: "unique" },
    { title: "In Review", value: String(projects.filter(p => p.status === 'review').length), icon: GitBranch, color: "text-orange-600", bg: "bg-orange-50", change: "" },
  ];

  const tools = [
    { icon: Layers, title: "Projects", description: "Manage projects", link: "/developer/projects", gradient: "from-gray-700 to-gray-900" },
    { icon: Cpu, title: "Challenges", description: "AI coding problems", link: "/developer/challenges", gradient: "from-red-500 to-rose-600" },
    { icon: Sparkles, title: "Code Review", description: "AI code analysis", link: "/developer/code-review", gradient: "from-emerald-500 to-teal-600" },
    { icon: Database, title: "API Explorer", description: "Test endpoints", link: "/api-flowchart", gradient: "from-blue-500 to-indigo-600" },
    { icon: Terminal, title: "AI Assistant", description: "Dev help", link: "/ai", gradient: "from-purple-500 to-violet-600" },
    { icon: Bug, title: "Focus Mode", description: "Deep work", link: "/focus-mode", gradient: "from-amber-500 to-orange-600" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-cyan-500/10 via-primary/5 to-background">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {userName}! 💻</h1>
              <p className="text-muted-foreground font-mono text-sm">$ developer-hub --mode=productive</p>
            </div>
            <div className="flex gap-2">
              <Link to="/developer/projects"><Button variant="outline"><GitBranch className="w-4 h-4 mr-2" />My Projects</Button></Link>
              <Link to="/developer/challenges"><Button><Cpu className="w-4 h-4 mr-2" />Challenges</Button></Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <OnboardingWelcomeBanner
        role="developer"
        userName={userName}
        emoji="💻"
        subtitle="Here's how to level up your coding skills."
        tips={[
          { icon: Layers, title: 'Projects', desc: 'Track your coding projects with progress and language tags.' },
          { icon: Cpu, title: 'Code Challenges', desc: 'AI-generated coding problems by difficulty.' },
          { icon: Sparkles, title: 'Code Review', desc: 'Get AI analysis and improvement suggestions.' },
          { icon: GitBranch, title: 'Open Source', desc: 'Contribute to projects and build your portfolio.' },
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
            <CardTitle className="flex items-center gap-2"><Code className="w-5 h-5 text-primary" />Recent Projects</CardTitle>
            <CardDescription>Your coding projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? <p className="text-muted-foreground">Loading...</p> :
              projects.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-2">No projects yet</p>
                  <Link to="/developer/projects"><Button size="sm">Create Your First Project</Button></Link>
                </div>
              ) : projects.slice(0, 4).map(p => (
                <div key={p.id} className="p-4 border rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{p.name}</h4>
                      <p className="text-sm text-muted-foreground">{p.language || 'N/A'}</p>
                    </div>
                    <Badge variant={p.status === 'active' ? 'default' : p.status === 'completed' ? 'secondary' : 'outline'}>{p.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={p.progress} className="h-2 flex-1" />
                    <span className="text-sm font-bold">{p.progress}%</span>
                  </div>
                </div>
              ))}
            {projects.length > 4 && (
              <Link to="/developer/projects"><Button variant="outline" className="w-full">View All Projects</Button></Link>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Award className="w-5 h-5 text-amber-600" />Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg">
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-xl font-bold">{activeProjects}</p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="text-sm text-muted-foreground">Average Progress</p>
              <p className="text-xl font-bold">{avgProgress}%</p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-xl font-bold">{completedProjects}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileCode className="w-5 h-5 text-cyan-600" />Developer Toolkit</CardTitle>
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
