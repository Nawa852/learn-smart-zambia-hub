import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, ArrowLeft, TrendingUp, Users, BookOpen, Award, Download, PieChart as PieChartIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const AdminAnalyticsPage = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Overall Avg Score', value: '81%', sub: '+5% vs last term', icon: TrendingUp, gradient: 'from-green-500/15 to-emerald-500/10', iconColor: 'text-green-600' },
    { label: 'Pass Rate', value: '94%', sub: '+2% improvement', icon: Award, gradient: 'from-primary/20 to-accent/10', iconColor: 'text-primary' },
    { label: 'Student Retention', value: '97%', sub: 'Above target', icon: Users, gradient: 'from-purple-500/15 to-violet-500/10', iconColor: 'text-purple-600' },
    { label: 'Curriculum Coverage', value: '73%', sub: 'On schedule', icon: BookOpen, gradient: 'from-amber-500/15 to-orange-500/10', iconColor: 'text-amber-600' },
  ];

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Institution Analytics
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">Performance insights and reporting</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2 rounded-xl hover:bg-primary/5" onClick={() => toast.info('Report generation coming soon')}>
          <Download className="w-4 h-4" />Export Report
        </Button>
      </motion.div>

      {/* KPIs */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
            <CardContent className="p-5 relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                  <s.icon className={`w-6 h-6 ${s.iconColor}`} />
                </div>
                <div>
                  <p className="text-3xl font-extrabold tracking-tight">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground font-medium">{s.sub}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="performance">
          <TabsList className="bg-muted/50 rounded-xl p-1">
            <TabsTrigger value="performance" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <BarChart3 className="w-4 h-4" />Departments
            </TabsTrigger>
            <TabsTrigger value="trends" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <TrendingUp className="w-4 h-4" />Trends
            </TabsTrigger>
            <TabsTrigger value="grades" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <PieChartIcon className="w-4 h-4" />Grades
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="mt-4 space-y-4">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Average Scores by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentScores}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', boxShadow: 'var(--shadow-md)' }} />
                    <Bar dataKey="score" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Teachers */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="w-5 h-5 text-amber-500" />Top Performing Teachers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topTeachers.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center justify-between p-4 rounded-xl border border-border/40 hover:border-primary/20 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.subject}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{t.avgScore}%</p>
                      <p className="text-[11px] text-muted-foreground">{t.passRate} pass rate</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="mt-4">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Monthly Performance & Attendance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', boxShadow: 'var(--shadow-md)' }} />
                    <Line type="monotone" dataKey="avgScore" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(var(--primary))' }} name="Avg Score" />
                    <Line type="monotone" dataKey="attendance" stroke="hsl(142 76% 36%)" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(142 76% 36%)' }} name="Attendance %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="mt-4">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Grade Distribution (Last Exam)</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-center gap-8">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={65} outerRadius={105} dataKey="value" stroke="none" label={({ name, value }) => `${name}: ${value}%`}>
                      {gradeDistribution.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3 w-full md:w-auto">
                  {gradeDistribution.map((g, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: g.color }} />
                      <span className="text-sm text-muted-foreground">{g.name}</span>
                      <span className="text-sm font-bold ml-auto">{g.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default AdminAnalyticsPage;
