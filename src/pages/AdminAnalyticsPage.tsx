import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, ArrowLeft, TrendingUp, Users, BookOpen, Award, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';

const departmentScores = [
  { name: 'Science', score: 82, students: 856 },
  { name: 'Maths', score: 78, students: 892 },
  { name: 'English', score: 85, students: 745 },
  { name: 'Social', score: 79, students: 654 },
  { name: 'ICT', score: 88, students: 320 },
];

const monthlyTrend = [
  { month: 'Jan', avgScore: 72, attendance: 91 },
  { month: 'Feb', avgScore: 74, attendance: 93 },
  { month: 'Mar', avgScore: 76, attendance: 90 },
  { month: 'Apr', avgScore: 75, attendance: 88 },
  { month: 'May', avgScore: 79, attendance: 94 },
  { month: 'Jun', avgScore: 81, attendance: 92 },
];

const gradeDistribution = [
  { name: 'Distinction', value: 18, color: 'hsl(var(--primary))' },
  { name: 'Merit', value: 32, color: 'hsl(142 76% 36%)' },
  { name: 'Credit', value: 35, color: 'hsl(48 96% 53%)' },
  { name: 'Pass', value: 12, color: 'hsl(25 95% 53%)' },
  { name: 'Fail', value: 3, color: 'hsl(0 84% 60%)' },
];

const topTeachers = [
  { name: 'Dr. Mwansa', subject: 'Physics', avgScore: 92, passRate: '98%' },
  { name: 'Ms. Phiri', subject: 'English', avgScore: 88, passRate: '96%' },
  { name: 'Mr. Banda', subject: 'Mathematics', avgScore: 85, passRate: '94%' },
];

const AdminAnalyticsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Institution Analytics</h1>
            <p className="text-muted-foreground">Performance insights and reporting</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2" onClick={() => toast.info('Report generation coming soon')}>
          <Download className="w-4 h-4" />Export Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Overall Avg Score', value: '81%', change: '+5% vs last term', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
          { label: 'Pass Rate', value: '94%', change: '+2% improvement', icon: Award, color: 'text-blue-600 bg-blue-50' },
          { label: 'Student Retention', value: '97%', change: 'Above target', icon: Users, color: 'text-purple-600 bg-purple-50' },
          { label: 'Curriculum Coverage', value: '73%', change: 'On schedule', icon: BookOpen, color: 'text-orange-600 bg-orange-50' },
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">Department Scores</TabsTrigger>
          <TabsTrigger value="trends">Monthly Trends</TabsTrigger>
          <TabsTrigger value="grades">Grade Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Average Scores by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Teachers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Award className="w-5 h-5 text-yellow-600" />Top Performing Teachers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topTeachers.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{t.avgScore}% avg</p>
                    <p className="text-xs text-muted-foreground">{t.passRate} pass rate</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance & Attendance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgScore" stroke="hsl(var(--primary))" strokeWidth={2} name="Avg Score" />
                  <Line type="monotone" dataKey="attendance" stroke="hsl(142 76% 36%)" strokeWidth={2} name="Attendance %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution (Last Exam)</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-8">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                    {gradeDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 w-full md:w-auto">
                {gradeDistribution.map((g, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: g.color }} />
                    <span className="text-sm">{g.name}</span>
                    <span className="text-sm font-bold ml-auto">{g.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalyticsPage;
