import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { School, Users, TrendingUp, DollarSign, BookOpen, Award, BarChart3, UserCheck, Calendar, AlertCircle, Globe, Activity } from 'lucide-react';

interface InstitutionDashboardViewProps {
  userName: string;
}

export const InstitutionDashboardView = ({ userName }: InstitutionDashboardViewProps) => {
  const institutionStats = [
    { title: "Total Students", value: "2,847", icon: Users, color: "text-blue-600", bg: "bg-blue-50", change: "+12% vs last term" },
    { title: "Active Teachers", value: "124", icon: UserCheck, color: "text-green-600", bg: "bg-green-50", change: "98% engagement" },
    { title: "Course Completion", value: "76%", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50", change: "+8% improvement" },
    { title: "System Usage", value: "94%", icon: Activity, color: "text-orange-600", bg: "bg-orange-50", change: "Daily active" },
  ];

  const departmentPerformance = [
    { name: "Science", students: 856, avgScore: 82, teachers: 32, growth: "+12%", color: "bg-blue-500" },
    { name: "Mathematics", students: 892, avgScore: 78, teachers: 28, growth: "+8%", color: "bg-green-500" },
    { name: "Languages", students: 745, avgScore: 85, teachers: 24, growth: "+15%", color: "bg-purple-500" },
    { name: "Social Studies", students: 654, avgScore: 79, teachers: 20, growth: "+5%", color: "bg-orange-500" },
  ];

  const systemAlerts = [
    { type: "critical", message: "Server maintenance scheduled for Saturday", icon: AlertCircle, color: "text-red-600" },
    { type: "warning", message: "23 students below attendance threshold", icon: UserCheck, color: "text-yellow-600" },
    { type: "info", message: "New curriculum updates available", icon: BookOpen, color: "text-blue-600" },
  ];

  const financialOverview = {
    revenue: "ZMW 450,000",
    expenses: "ZMW 320,000",
    subscriptions: 2847,
    growthRate: "+18%"
  };

  const topPerformers = [
    { name: "Grade 12A - Physics", teacher: "Dr. Mwansa", avgScore: 92, students: 35 },
    { name: "Grade 11B - Mathematics", teacher: "Mr. Banda", avgScore: 88, students: 32 },
    { name: "Grade 10C - English", teacher: "Ms. Phiri", avgScore: 85, students: 30 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Institution Dashboard 🏫</h1>
              <p className="text-muted-foreground">Welcome back, {userName} • Real-time insights and analytics</p>
            </div>
            <div className="flex items-center gap-2">
              <Button>
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
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

      {/* System Alerts */}
      <Card className="border-0 shadow-lg border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            System Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all">
                <alert.icon className={`w-5 h-5 ${alert.color} mt-0.5`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <Badge variant="outline" className="text-xs mt-1">{alert.type}</Badge>
                </div>
                <Button size="sm" variant="outline">Review</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Performance */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="w-5 h-5 text-primary" />
              Department Performance
            </CardTitle>
            <CardDescription>Overview across all departments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {departmentPerformance.map((dept, index) => (
              <Card key={index} className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{dept.name}</h3>
                        <p className="text-sm text-muted-foreground">{dept.students} students • {dept.teachers} teachers</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {dept.growth} growth
                      </Badge>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Average Score</span>
                        <span className="font-semibold">{dept.avgScore}%</span>
                      </div>
                      <Progress value={dept.avgScore} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Financial Overview */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Financial Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Revenue (This Term)</p>
              <p className="text-2xl font-bold text-green-700">{financialOverview.revenue}</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Operating Expenses</p>
              <p className="text-2xl font-bold text-orange-700">{financialOverview.expenses}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Active Subs</p>
                <p className="text-lg font-bold">{financialOverview.subscriptions}</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Growth</p>
                <p className="text-lg font-bold text-green-600">{financialOverview.growthRate}</p>
              </div>
            </div>
            <Button className="w-full">View Full Report</Button>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Classes */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-600" />
            Top Performing Classes
          </CardTitle>
          <CardDescription>Excellence across the institution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{performer.name}</h4>
                    <p className="text-sm text-muted-foreground">by {performer.teacher} • {performer.students} students</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{performer.avgScore}%</p>
                  <p className="text-xs text-muted-foreground">Average Score</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Management Tools */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Institution Management</CardTitle>
          <CardDescription>Administrative tools and resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="w-6 h-6" />
              <span className="text-xs">User Management</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BookOpen className="w-6 h-6" />
              <span className="text-xs">Curriculum</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="w-6 h-6" />
              <span className="text-xs">Scheduling</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
