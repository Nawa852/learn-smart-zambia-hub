import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Code, Terminal, GitBranch, Bug, Cpu, Globe,
  Database, Zap, Award, BookOpen, Users, TrendingUp,
  FileCode, Braces, Server, Layers
} from 'lucide-react';

interface DeveloperDashboardViewProps {
  userName: string;
}

export const DeveloperDashboardView = ({ userName }: DeveloperDashboardViewProps) => {
  const stats = [
    { title: "Projects Built", value: "12", icon: Code, color: "text-cyan-600", bg: "bg-cyan-50", change: "3 active" },
    { title: "Challenges Solved", value: "87", icon: Bug, color: "text-green-600", bg: "bg-green-50", change: "+8 this week" },
    { title: "Skill Level", value: "Lvl 14", icon: Zap, color: "text-purple-600", bg: "bg-purple-50", change: "Advanced" },
    { title: "Contributions", value: "234", icon: GitBranch, color: "text-orange-600", bg: "bg-orange-50", change: "Open source" },
  ];

  const activeProjects = [
    { name: "Zambia Transit API", language: "TypeScript", progress: 75, stars: 42, status: "active" },
    { name: "EduMobile React Native", language: "React Native", progress: 45, stars: 18, status: "active" },
    { name: "AgriData Dashboard", language: "Python", progress: 92, stars: 67, status: "review" },
  ];

  const learningTracks = [
    { title: "Full-Stack Development", progress: 82, tech: "React + Node.js" },
    { title: "Cloud & DevOps", progress: 55, tech: "AWS + Docker" },
    { title: "AI/ML Engineering", progress: 38, tech: "Python + TensorFlow" },
    { title: "Mobile Development", progress: 70, tech: "React Native" },
  ];

  const codingChallenges = [
    { title: "Binary Tree Traversal", difficulty: "Medium", xp: 50, solved: true },
    { title: "API Rate Limiter", difficulty: "Hard", xp: 100, solved: true },
    { title: "Graph Shortest Path", difficulty: "Hard", xp: 100, solved: false },
    { title: "REST API Design", difficulty: "Easy", xp: 25, solved: false },
  ];

  const tools = [
    { icon: Terminal, title: "Code Sandbox", description: "Live coding environment", link: "/ai-learning-lab", gradient: "from-gray-700 to-gray-900" },
    { icon: Bug, title: "Debug Assistant", description: "AI error resolver", link: "/ai-chat", gradient: "from-red-500 to-rose-600" },
    { icon: Database, title: "API Explorer", description: "Test endpoints live", link: "/api-flowchart", gradient: "from-blue-500 to-indigo-600" },
    { icon: Braces, title: "Code Review", description: "AI code analysis", link: "/ai-study-buddy", gradient: "from-emerald-500 to-teal-600" },
    { icon: Server, title: "Deploy Lab", description: "CI/CD simulation", link: "/ai-resource-center", gradient: "from-purple-500 to-violet-600" },
    { icon: Layers, title: "Architecture", description: "System design tools", link: "/visual-mind-map", gradient: "from-amber-500 to-orange-600" },
  ];

  const leaderboard = [
    { rank: 1, name: "Alice Mwamba", xp: 4520, badge: "🏆" },
    { rank: 2, name: userName, xp: 3890, badge: "🥈" },
    { rank: 3, name: "Peter Banda", xp: 3450, badge: "🥉" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-cyan-500/10 via-primary/5 to-background">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {userName}! 💻</h1>
              <p className="text-muted-foreground font-mono text-sm">$ developer-hub --mode=productive</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <GitBranch className="w-4 h-4 mr-2" />
                New Project
              </Button>
              <Button>
                <Terminal className="w-4 h-4 mr-2" />
                Open Sandbox
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
        {/* Active Projects */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Active Projects
            </CardTitle>
            <CardDescription>Your coding projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeProjects.map((p, i) => (
              <div key={i} className="p-4 border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{p.name}</h4>
                    <p className="text-sm text-muted-foreground">{p.language} • ⭐ {p.stars}</p>
                  </div>
                  <Badge variant={p.status === 'active' ? 'default' : 'secondary'}>
                    {p.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={p.progress} className="h-2 flex-1" />
                  <span className="text-sm font-bold">{p.progress}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Dev Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {leaderboard.map((l, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${l.name === userName ? 'bg-primary/10 border border-primary/20' : 'border'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-lg">{l.badge}</span>
                  <div>
                    <p className="font-semibold text-sm">{l.name}</p>
                    <p className="text-xs text-muted-foreground">Rank #{l.rank}</p>
                  </div>
                </div>
                <Badge variant="outline">{l.xp} XP</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Tracks */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Learning Tracks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {learningTracks.map((t, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{t.title}</span>
                  <Badge variant="outline" className="text-xs font-mono">{t.tech}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={t.progress} className="h-2 flex-1" />
                  <span className="text-sm font-bold">{t.progress}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Coding Challenges */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-green-600" />
              Coding Challenges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {codingChallenges.map((ch, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${ch.solved ? 'bg-green-500 border-green-500' : 'border-muted-foreground/30'}`}>
                    {ch.solved && <Zap className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <p className={`text-sm ${ch.solved ? 'text-muted-foreground' : 'font-medium'}`}>{ch.title}</p>
                    <p className="text-xs text-muted-foreground">+{ch.xp} XP</p>
                  </div>
                </div>
                <Badge variant={ch.difficulty === 'Hard' ? 'destructive' : ch.difficulty === 'Medium' ? 'default' : 'secondary'}>
                  {ch.difficulty}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Dev Tools */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-cyan-600" />
            Developer Toolkit
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
