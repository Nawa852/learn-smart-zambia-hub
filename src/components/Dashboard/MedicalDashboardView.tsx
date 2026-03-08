import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Stethoscope, Brain, BookOpen, Activity, Award,
  FileText, Clock, Target, Microscope, Heart,
  Pill, ClipboardList, GraduationCap, Zap, Loader2
} from 'lucide-react';
import { OnboardingWelcomeBanner } from './OnboardingWelcomeBanner';
import { useClinicalCases } from '@/hooks/useClinicalCases';
import { useClinicalRotations } from '@/hooks/useClinicalRotations';

interface MedicalDashboardViewProps {
  userName: string;
}

export const MedicalDashboardView = ({ userName }: MedicalDashboardViewProps) => {
  const { cases, loading: casesLoading } = useClinicalCases();
  const { rotations, loading: rotationsLoading } = useClinicalRotations();

  const totalCases = cases.length;
  const resolvedCases = cases.filter(c => c.outcome === 'resolved').length;
  const activeRotations = rotations.filter(r => r.status === 'active').length;
  const completedRotations = rotations.filter(r => r.status === 'completed').length;
  const avgScore = cases.filter(c => c.accuracy_score).reduce((sum, c) => sum + (c.accuracy_score || 0), 0) / (cases.filter(c => c.accuracy_score).length || 1);

  const stats = [
    { title: "Cases Studied", value: totalCases.toString(), icon: ClipboardList, color: "text-blue-600", bg: "bg-blue-50", change: `${resolvedCases} resolved` },
    { title: "Active Rotations", value: activeRotations.toString(), icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50", change: `${completedRotations} completed` },
    { title: "Avg Score", value: cases.filter(c => c.accuracy_score).length ? `${Math.round(avgScore)}%` : "—", icon: Target, color: "text-purple-600", bg: "bg-purple-50", change: "AI simulations" },
    { title: "Total Rotations", value: rotations.length.toString(), icon: Award, color: "text-amber-600", bg: "bg-amber-50", change: `${rotations.filter(r => r.status === 'upcoming').length} upcoming` },
  ];

  const recentCases = cases.slice(0, 3);

  const getRotationProgress = (r: typeof rotations[0]) => {
    if (r.status === 'completed') return 100;
    if (r.status === 'upcoming' || !r.start_date || !r.end_date) return 0;
    const start = new Date(r.start_date).getTime();
    const end = new Date(r.end_date).getTime();
    const now = Date.now();
    return Math.min(100, Math.max(0, Math.round(((now - start) / (end - start)) * 100)));
  };

  const studyModules = [
    { icon: Microscope, title: "Case Simulator", description: "AI clinical scenarios", link: "/medical/case-simulator", gradient: "from-rose-500 to-pink-600" },
    { icon: Pill, title: "Drug Reference", description: "Pharmacology database", link: "/medical/drug-reference", gradient: "from-blue-500 to-cyan-600" },
    { icon: FileText, title: "Clinical Notes", description: "SOAP note generator", link: "/medical/clinical-notes", gradient: "from-emerald-500 to-teal-600" },
    { icon: ClipboardList, title: "Case Log", description: "Track your cases", link: "/medical/case-log", gradient: "from-purple-500 to-indigo-600" },
    { icon: Activity, title: "Rotations", description: "Manage placements", link: "/medical/rotations", gradient: "from-amber-500 to-yellow-600" },
    { icon: Brain, title: "AI Assistant", description: "Ask anything", link: "/ai", gradient: "from-red-500 to-orange-500" },
  ];

  const isLoading = casesLoading || rotationsLoading;

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-rose-500/10 via-primary/5 to-background">
        <CardContent className="p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, Dr. {userName}! 🩺</h1>
              <p className="text-muted-foreground">Your clinical learning command center</p>
            </div>
            <div className="flex gap-2">
              <Link to="/medical/case-log"><Button variant="outline"><ClipboardList className="w-4 h-4 mr-2" />Log Case</Button></Link>
              <Link to="/medical/case-simulator"><Button><Stethoscope className="w-4 h-4 mr-2" />Start Simulation</Button></Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <OnboardingWelcomeBanner role="doctor" userName={userName} emoji="🩺" subtitle="Get started with your clinical learning tools."
        tips={[
          { icon: Microscope, title: 'Case Simulator', desc: 'Practice clinical reasoning with AI cases.' },
          { icon: Brain, title: 'Drug Reference', desc: 'AI pharmacology database.' },
          { icon: ClipboardList, title: 'Log Cases', desc: 'Track your clinical encounters.' },
          { icon: GraduationCap, title: 'Clinical Notes', desc: 'AI-powered SOAP note generation.' },
        ]}
      />

      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
      ) : (
        <>
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
            <Card className="lg:col-span-2 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5 text-primary" />Clinical Rotations</CardTitle>
                <CardDescription>{rotations.length ? 'Your rotation progress' : 'No rotations added yet'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {rotations.length === 0 ? (
                  <Link to="/medical/rotations"><Button variant="outline" className="w-full">Add Your First Rotation</Button></Link>
                ) : rotations.slice(0, 4).map((rot, i) => (
                  <div key={i} className="p-4 border rounded-lg hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{rot.rotation_name}</h4>
                        {rot.supervisor_name && <p className="text-sm text-muted-foreground">Supervisor: {rot.supervisor_name}</p>}
                      </div>
                      <Badge variant={rot.status === 'active' ? 'default' : rot.status === 'completed' ? 'secondary' : 'outline'}>{rot.status}</Badge>
                    </div>
                    <Progress value={getRotationProgress(rot)} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5 text-blue-600" />Recent Cases</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {recentCases.length === 0 ? (
                  <Link to="/medical/case-log"><Button variant="outline" className="w-full">Log Your First Case</Button></Link>
                ) : recentCases.map((c, i) => (
                  <div key={i} className="p-3 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center"><Stethoscope className="w-4 h-4 text-primary" /></div>
                      <div>
                        <p className="font-medium text-sm">{c.condition}</p>
                        <p className="text-xs text-muted-foreground">{c.body_system || 'General'} • {new Date(c.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Badge variant={c.outcome === 'resolved' ? 'secondary' : 'default'} className="text-xs">{c.outcome}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}

      <Card className="border-0 shadow-lg">
        <CardHeader><CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-purple-600" />Medical Study Tools</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {studyModules.map((tool, i) => (
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
