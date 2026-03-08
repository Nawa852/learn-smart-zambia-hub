import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, ArrowLeft, TrendingUp, Users, BookOpen, Award, Download, PieChart as PieChartIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useProfile } from '@/hooks/useProfile';

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
  const { profile } = useProfile();
  const schoolName = profile?.school || '';

  // Get school teachers
  const { data: schoolTeachers = [] } = useQuery({
    queryKey: ['analytics-teachers', schoolName],
    queryFn: async () => {
      if (!schoolName) return [];
      const { data } = await supabase.from('profiles').select('id, full_name').eq('school', schoolName).eq('role', 'teacher');
      return data || [];
    },
    enabled: !!schoolName,
  });

  // Get courses by those teachers
  const { data: courses = [] } = useQuery({
    queryKey: ['analytics-courses', schoolTeachers],
    queryFn: async () => {
      if (!schoolTeachers.length) return [];
      const { data } = await supabase.from('courses').select('id, title, subject, created_by').in('created_by', schoolTeachers.map(t => t.id));
      return data || [];
    },
    enabled: schoolTeachers.length > 0,
  });

  // Get all grades for those courses
  const { data: grades = [] } = useQuery({
    queryKey: ['analytics-grades', courses],
    queryFn: async () => {
      if (!courses.length) return [];
      const { data } = await supabase.from('grades').select('score, course_id, student_id').in('course_id', courses.map(c => c.id));
      return data || [];
    },
    enabled: courses.length > 0,
  });

  // Get school students count
  const { data: studentCount = 0 } = useQuery({
    queryKey: ['analytics-student-count', schoolName],
    queryFn: async () => {
      if (!schoolName) return 0;
      const { count } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('school', schoolName).eq('role', 'student');
      return count || 0;
    },
    enabled: !!schoolName,
  });

  const avgScore = grades.length > 0 ? Math.round(grades.reduce((s, g) => s + (g.score || 0), 0) / grades.length) : 0;
  const passRate = grades.length > 0 ? Math.round((grades.filter(g => (g.score || 0) >= 40).length / grades.length) * 100) : 0;

  // Department scores
  const departmentScores = React.useMemo(() => {
    const map: Record<string, { total: number; count: number }> = {};
    courses.forEach(c => {
      const subj = c.subject || 'Other';
      if (!map[subj]) map[subj] = { total: 0, count: 0 };
    });
    grades.forEach(g => {
      const course = courses.find(c => c.id === g.course_id);
      const subj = course?.subject || 'Other';
      if (map[subj]) {
        map[subj].total += g.score || 0;
        map[subj].count += 1;
      }
    });
    return Object.entries(map).map(([name, info]) => ({
      name,
      score: info.count > 0 ? Math.round(info.total / info.count) : 0,
    }));
  }, [courses, grades]);

  // Grade distribution
  const gradeDistribution = React.useMemo(() => {
    if (grades.length === 0) return [];
    const buckets = { Distinction: 0, Merit: 0, Credit: 0, Pass: 0, Fail: 0 };
    grades.forEach(g => {
      const s = g.score || 0;
      if (s >= 80) buckets.Distinction++;
      else if (s >= 65) buckets.Merit++;
      else if (s >= 50) buckets.Credit++;
      else if (s >= 40) buckets.Pass++;
      else buckets.Fail++;
    });
    const total = grades.length;
    return [
      { name: 'Distinction', value: Math.round((buckets.Distinction / total) * 100), color: 'hsl(var(--primary))' },
      { name: 'Merit', value: Math.round((buckets.Merit / total) * 100), color: 'hsl(142 76% 36%)' },
      { name: 'Credit', value: Math.round((buckets.Credit / total) * 100), color: 'hsl(48 96% 53%)' },
      { name: 'Pass', value: Math.round((buckets.Pass / total) * 100), color: 'hsl(25 95% 53%)' },
      { name: 'Fail', value: Math.round((buckets.Fail / total) * 100), color: 'hsl(0 84% 60%)' },
    ];
  }, [grades]);

  // Top teachers
  const topTeachers = React.useMemo(() => {
    return schoolTeachers.map(t => {
      const tCourses = courses.filter(c => c.created_by === t.id);
      const tGrades = grades.filter(g => tCourses.some(c => c.id === g.course_id));
      const avg = tGrades.length > 0 ? Math.round(tGrades.reduce((s, g) => s + (g.score || 0), 0) / tGrades.length) : 0;
      const pr = tGrades.length > 0 ? Math.round((tGrades.filter(g => (g.score || 0) >= 40).length / tGrades.length) * 100) : 0;
      return { name: t.full_name || 'Unknown', avgScore: avg, passRate: `${pr}%`, subject: tCourses.map(c => c.subject).filter(Boolean).join(', ') || 'N/A' };
    }).sort((a, b) => b.avgScore - a.avgScore).slice(0, 5);
  }, [schoolTeachers, courses, grades]);

  const handleExport = () => {
    if (grades.length === 0) { toast.info('No data to export'); return; }
    const csv = ['Subject,Score\n', ...departmentScores.map(d => `${d.name},${d.score}\n`)].join('');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'analytics-report.csv'; a.click();
    toast.success('Report exported');
  };

  const stats = [
    { label: 'Overall Avg Score', value: `${avgScore}%`, sub: `${grades.length} grades recorded`, icon: TrendingUp, gradient: 'from-green-500/15 to-emerald-500/10', iconColor: 'text-green-600' },
    { label: 'Pass Rate', value: `${passRate}%`, sub: 'Score ≥ 40%', icon: Award, gradient: 'from-primary/20 to-accent/10', iconColor: 'text-primary' },
    { label: 'Students', value: String(studentCount), sub: schoolName, icon: Users, gradient: 'from-purple-500/15 to-violet-500/10', iconColor: 'text-purple-600' },
    { label: 'Subjects', value: String(departmentScores.length), sub: `${courses.length} courses`, icon: BookOpen, gradient: 'from-amber-500/15 to-orange-500/10', iconColor: 'text-amber-600' },
  ];

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Institution Analytics</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Performance insights and reporting</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2 rounded-xl hover:bg-primary/5" onClick={handleExport}>
          <Download className="w-4 h-4" />Export CSV
        </Button>
      </motion.div>

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
            <TabsTrigger value="grades" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <PieChartIcon className="w-4 h-4" />Grade Distribution
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="mt-4 space-y-4">
            <Card className="border-border/40">
              <CardHeader><CardTitle className="text-lg">Average Scores by Subject</CardTitle></CardHeader>
              <CardContent>
                {departmentScores.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-8 text-center">No grade data available yet.</p>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentScores}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))' }} />
                      <Bar dataKey="score" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Award className="w-5 h-5 text-amber-500" />Top Performing Teachers</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {topTeachers.length === 0 && <p className="text-muted-foreground text-sm">No teacher data available.</p>}
                {topTeachers.map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="flex items-center justify-between p-4 rounded-xl border border-border/40 hover:border-primary/20 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">{i + 1}</div>
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

          <TabsContent value="grades" className="mt-4">
            <Card className="border-border/40">
              <CardHeader><CardTitle className="text-lg">Grade Distribution</CardTitle></CardHeader>
              <CardContent className="flex flex-col md:flex-row items-center gap-8">
                {gradeDistribution.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-8 text-center w-full">No grade data available.</p>
                ) : (
                  <>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={65} outerRadius={105} dataKey="value" stroke="none" label={({ name, value }) => `${name}: ${value}%`}>
                          {gradeDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
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
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default AdminAnalyticsPage;
