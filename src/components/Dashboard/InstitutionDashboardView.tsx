import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { School, Users, TrendingUp, BookOpen, Award, BarChart3, UserCheck, Calendar, AlertCircle, Activity } from 'lucide-react';
import { OnboardingWelcomeBanner } from './OnboardingWelcomeBanner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { LogoLoader } from '@/components/UI/LogoLoader';

interface InstitutionDashboardViewProps {
  userName: string;
}

export const InstitutionDashboardView = ({ userName }: InstitutionDashboardViewProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ students: 0, teachers: 0, courses: 0, enrollments: 0, avgGrade: 0 });

  useEffect(() => {
    const load = async () => {
      const [
        { count: studentCount },
        { count: teacherCount },
        { count: courseCount },
        { count: enrollmentCount },
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'teacher'),
        supabase.from('courses').select('*', { count: 'exact', head: true }),
        supabase.from('enrollments').select('*', { count: 'exact', head: true }),
      ]);

      const { data: gradeData } = await supabase.from('grades').select('score');
      const scores = (gradeData || []).filter(g => g.score != null).map(g => g.score!);
      const avgGrade = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

      setStats({
        students: studentCount || 0,
        teachers: teacherCount || 0,
        courses: courseCount || 0,
        enrollments: enrollmentCount || 0,
        avgGrade,
      });
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <LogoLoader text="Loading dashboard..." />;

  const institutionStats = [
    { title: "Total Students", value: stats.students.toLocaleString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50", change: `${stats.enrollments} enrollments` },
    { title: "Active Teachers", value: String(stats.teachers), icon: UserCheck, color: "text-green-600", bg: "bg-green-50", change: "registered" },
    { title: "Courses", value: String(stats.courses), icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50", change: "in catalog" },
    { title: "Avg Grade", value: stats.avgGrade > 0 ? `${stats.avgGrade}%` : 'N/A', icon: Activity, color: "text-orange-600", bg: "bg-orange-50", change: "across all courses" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Institution Dashboard 🏫</h1>
              <p className="text-muted-foreground">Welcome back, {userName} • Live platform data</p>
            </div>
            <Button onClick={() => navigate('/admin/analytics')}>
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>

      <OnboardingWelcomeBanner
        role="institution"
        userName={userName}
        emoji="🎉"
        subtitle="Here are some tips to get you started managing your school."
        tips={[
          { icon: Users, title: 'Manage Your Staff', desc: 'Use the User Management tool to add teachers and assign departments.' },
          { icon: BookOpen, title: 'Set Up Curriculum', desc: 'Align your courses with ECZ standards using the Curriculum tool.' },
          { icon: BarChart3, title: 'Track Performance', desc: 'Monitor department scores and generate reports from this dashboard.' },
          { icon: Calendar, title: 'Plan the Term', desc: 'Use Scheduling to set exam dates, events, and academic calendars.' },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {institutionStats.map((stat, index) => (
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

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Institution Management</CardTitle>
          <CardDescription>Administrative tools and resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/admin/users')}>
              <Users className="w-6 h-6" />
              <span className="text-xs">User Management</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/admin/curriculum')}>
              <BookOpen className="w-6 h-6" />
              <span className="text-xs">Curriculum</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/admin/scheduling')}>
              <Calendar className="w-6 h-6" />
              <span className="text-xs">Scheduling</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/admin/analytics')}>
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
