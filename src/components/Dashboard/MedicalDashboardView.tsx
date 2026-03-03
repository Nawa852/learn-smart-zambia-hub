import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Stethoscope, Brain, BookOpen, Activity, Users, Award,
  FileText, Clock, Target, TrendingUp, Microscope, Heart,
  Pill, ClipboardList, GraduationCap, Zap
} from 'lucide-react';
import { OnboardingWelcomeBanner } from './OnboardingWelcomeBanner';

interface MedicalDashboardViewProps {
  userName: string;
}

export const MedicalDashboardView = ({ userName }: MedicalDashboardViewProps) => {
  const stats = [
    { title: "Cases Studied", value: "186", icon: ClipboardList, color: "text-blue-600", bg: "bg-blue-50", change: "+12 this week" },
    { title: "Clinical Hours", value: "320h", icon: Clock, color: "text-emerald-600", bg: "bg-emerald-50", change: "On track" },
    { title: "Competencies", value: "24/30", icon: Target, color: "text-purple-600", bg: "bg-purple-50", change: "80% complete" },
    { title: "Peer Rating", value: "4.8", icon: Award, color: "text-amber-600", bg: "bg-amber-50", change: "Top 10%" },
  ];

  const currentRotations = [
    { name: "Internal Medicine", weeks: "Week 4/8", progress: 50, supervisor: "Dr. Mwansa", status: "active" },
    { name: "Pediatrics", weeks: "Upcoming", progress: 0, supervisor: "Dr. Banda", status: "upcoming" },
    { name: "Surgery", weeks: "Completed", progress: 100, supervisor: "Dr. Phiri", status: "completed" },
  ];

  const caseLog = [
    { condition: "Malaria (Severe)", outcome: "Resolved", date: "Today", type: "Infectious" },
    { condition: "Type 2 Diabetes Management", outcome: "Ongoing", date: "Yesterday", type: "Endocrine" },
    { condition: "Pediatric Pneumonia", outcome: "Resolved", date: "2 days ago", type: "Respiratory" },
  ];

  const studyModules = [
    { icon: Microscope, title: "3D Anatomy Lab", description: "Interactive anatomy exploration", link: "/ai-learning-lab", gradient: "from-rose-500 to-pink-600" },
    { icon: Pill, title: "Drug Reference", description: "Pharmacology database", link: "/ai-resource-center", gradient: "from-blue-500 to-cyan-600" },
    { icon: Brain, title: "Case Simulator", description: "AI clinical scenarios", link: "/ai-chat", gradient: "from-purple-500 to-indigo-600" },
    { icon: Heart, title: "Patient Care", description: "Communication skills", link: "/ai-study-buddy", gradient: "from-red-500 to-orange-500" },
    { icon: FileText, title: "Clinical Notes", description: "AI-assisted documentation", link: "/ai-study-journal", gradient: "from-emerald-500 to-teal-600" },
    { icon: GraduationCap, title: "Board Prep", description: "Exam preparation", link: "/ecz-exam-simulator", gradient: "from-amber-500 to-yellow-600" },
  ];

  const upcomingExams = [
    { name: "Pathology OSCE", date: "March 15", readiness: 72 },
    { name: "Pharmacology MCQ", date: "March 22", readiness: 85 },
    { name: "Clinical Skills Assessment", date: "April 5", readiness: 60 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-rose-500/10 via-primary/5 to-background">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, Dr. {userName}! 🩺</h1>
              <p className="text-muted-foreground">Your clinical learning command center</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <ClipboardList className="w-4 h-4 mr-2" />
                Log Case
              </Button>
              <Button>
                <Stethoscope className="w-4 h-4 mr-2" />
                Start Simulation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <OnboardingWelcomeBanner
        role="doctor"
        userName={userName}
        emoji="🩺"
        subtitle="Get started with your clinical learning tools."
        tips={[
          { icon: Microscope, title: '3D Anatomy Lab', desc: 'Explore interactive anatomical models and visualizations.' },
          { icon: Brain, title: 'Case Simulator', desc: 'Practice clinical reasoning with AI-generated patient cases.' },
          { icon: ClipboardList, title: 'Log Cases', desc: 'Track your clinical encounters and build your case portfolio.' },
          { icon: GraduationCap, title: 'Board Prep', desc: 'AI-powered exam preparation for medical licensing.' },
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
        {/* Rotations */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Clinical Rotations
            </CardTitle>
            <CardDescription>Track your rotation progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentRotations.map((rot, i) => (
              <div key={i} className="p-4 border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{rot.name}</h4>
                    <p className="text-sm text-muted-foreground">Supervisor: {rot.supervisor}</p>
                  </div>
                  <Badge variant={rot.status === 'active' ? 'default' : rot.status === 'completed' ? 'secondary' : 'outline'}>
                    {rot.weeks}
                  </Badge>
                </div>
                <Progress value={rot.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-600" />
              Exam Readiness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingExams.map((exam, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-sm">{exam.name}</h4>
                  <Badge variant="outline" className="text-xs">{exam.date}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={exam.readiness} className="h-2 flex-1" />
                  <span className="text-sm font-bold">{exam.readiness}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Cases */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Recent Case Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {caseLog.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="font-medium">{c.condition}</p>
                    <p className="text-sm text-muted-foreground">{c.type} • {c.date}</p>
                  </div>
                </div>
                <Badge variant={c.outcome === 'Resolved' ? 'secondary' : 'default'}>
                  {c.outcome}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Tools */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Medical Study Tools
          </CardTitle>
        </CardHeader>
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
