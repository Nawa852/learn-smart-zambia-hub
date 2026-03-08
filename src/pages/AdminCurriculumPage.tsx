import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, CheckCircle2, AlertTriangle, ArrowLeft, FileText, Layers, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useProfile } from '@/hooks/useProfile';

const eczStandards = [
  { standard: 'ECZ-2024-MATH-001', desc: 'Algebra and Number Theory', compliance: 95 },
  { standard: 'ECZ-2024-SCI-002', desc: 'Scientific Method & Lab Skills', compliance: 88 },
  { standard: 'ECZ-2024-ENG-003', desc: 'Reading Comprehension & Analysis', compliance: 92 },
  { standard: 'ECZ-2024-BIO-004', desc: 'Cell Biology & Genetics', compliance: 78 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  ahead: { bg: 'bg-green-500/10', text: 'text-green-700', dot: 'bg-green-500' },
  'on-track': { bg: 'bg-primary/10', text: 'text-primary', dot: 'bg-primary' },
  behind: { bg: 'bg-destructive/10', text: 'text-destructive', dot: 'bg-destructive' },
};

const AdminCurriculumPage = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const schoolName = profile?.school || '';

  const { data: schoolTeachers = [] } = useQuery({
    queryKey: ['curriculum-teachers', schoolName],
    queryFn: async () => {
      if (!schoolName) return [];
      const { data } = await supabase.from('profiles').select('id, full_name').eq('school', schoolName).eq('role', 'teacher');
      return data || [];
    },
    enabled: !!schoolName,
  });

  const { data: courses = [] } = useQuery({
    queryKey: ['curriculum-courses', schoolTeachers],
    queryFn: async () => {
      if (!schoolTeachers.length) return [];
      const { data } = await supabase.from('courses').select('id, title, subject, created_by').in('created_by', schoolTeachers.map(t => t.id));
      return data || [];
    },
    enabled: schoolTeachers.length > 0,
  });

  const { data: lessons = [] } = useQuery({
    queryKey: ['curriculum-lessons', courses],
    queryFn: async () => {
      if (!courses.length) return [];
      const { data } = await supabase.from('lessons').select('id, course_id').in('course_id', courses.map(c => c.id));
      return data || [];
    },
    enabled: courses.length > 0,
  });

  const { data: completions = [] } = useQuery({
    queryKey: ['curriculum-completions', lessons],
    queryFn: async () => {
      if (!lessons.length) return [];
      const { data } = await supabase.from('lesson_completions').select('lesson_id, course_id').in('course_id', courses.map(c => c.id));
      return data || [];
    },
    enabled: lessons.length > 0,
  });

  // Build subject progress from live data
  const subjects = React.useMemo(() => {
    const subjectMap: Record<string, { courseIds: string[]; teacher: string }> = {};
    courses.forEach(c => {
      const subj = c.subject || 'Other';
      if (!subjectMap[subj]) {
        const teacher = schoolTeachers.find(t => t.id === c.created_by);
        subjectMap[subj] = { courseIds: [], teacher: teacher?.full_name || 'Unknown' };
      }
      subjectMap[subj].courseIds.push(c.id);
    });

    return Object.entries(subjectMap).map(([name, info]) => {
      const totalLessons = lessons.filter(l => info.courseIds.includes(l.course_id)).length;
      const completedLessons = new Set(
        completions.filter(c => info.courseIds.includes(c.course_id)).map(c => c.lesson_id)
      ).size;
      const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      const status = pct >= 80 ? 'ahead' : pct >= 50 ? 'on-track' : 'behind';
      return { name, teacher: info.teacher, topics: totalLessons, covered: completedLessons, status };
    });
  }, [courses, lessons, completions, schoolTeachers]);

  const totalTopics = subjects.reduce((s, sub) => s + sub.topics, 0);
  const totalCovered = subjects.reduce((s, sub) => s + sub.covered, 0);
  const behindCount = subjects.filter(s => s.status === 'behind').length;

  const stats = [
    { label: 'Total Subjects', value: String(subjects.length), icon: BookOpen, gradient: 'from-primary/20 to-accent/10', iconColor: 'text-primary' },
    { label: 'Lessons Covered', value: `${totalCovered}/${totalTopics}`, icon: CheckCircle2, gradient: 'from-green-500/15 to-emerald-500/10', iconColor: 'text-green-600' },
    { label: 'ECZ Compliance', value: '89%', icon: Target, gradient: 'from-purple-500/15 to-violet-500/10', iconColor: 'text-purple-600' },
    { label: 'Behind Schedule', value: String(behindCount), icon: AlertTriangle, gradient: 'from-amber-500/15 to-orange-500/10', iconColor: 'text-amber-600' },
  ];

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Curriculum Management</h1>
          <p className="text-muted-foreground text-sm mt-0.5">ECZ-aligned curriculum tracking and compliance</p>
        </div>
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
                  <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="subjects">
          <TabsList className="bg-muted/50 rounded-xl p-1">
            <TabsTrigger value="subjects" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Layers className="w-4 h-4" />Subject Progress
            </TabsTrigger>
            <TabsTrigger value="standards" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <FileText className="w-4 h-4" />ECZ Standards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subjects" className="space-y-3 mt-4">
            {subjects.length === 0 && <p className="text-muted-foreground text-sm">No courses found for this school. Teachers need to create courses first.</p>}
            {subjects.map((subj, i) => {
              const pct = subj.topics > 0 ? Math.round((subj.covered / subj.topics) * 100) : 0;
              const sc = statusConfig[subj.status] || statusConfig['on-track'];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="border-border/40 hover:border-primary/30 hover:shadow-md transition-all duration-300 group">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{subj.name}</h3>
                            <p className="text-xs text-muted-foreground">{subj.teacher}</p>
                          </div>
                        </div>
                        <Badge className={`${sc.bg} ${sc.text} border-0 capitalize gap-1.5 rounded-lg`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {subj.status}
                        </Badge>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Lessons: {subj.covered}/{subj.topics}</span>
                          <span className="font-semibold text-primary">{pct}%</span>
                        </div>
                        <Progress value={pct} className="h-2 rounded-full" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </TabsContent>

          <TabsContent value="standards" className="mt-4">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-primary" />ECZ Compliance Report</CardTitle>
                <CardDescription>Alignment with Examinations Council of Zambia standards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {eczStandards.map((std, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    className="p-4 rounded-xl border border-border/40 hover:border-primary/20 hover:shadow-sm transition-all space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">{std.desc}</p>
                        <p className="text-[11px] text-muted-foreground font-mono">{std.standard}</p>
                      </div>
                      <Badge className={`rounded-lg border-0 ${
                        std.compliance >= 90 ? 'bg-green-500/10 text-green-700' : std.compliance >= 80 ? 'bg-amber-500/10 text-amber-700' : 'bg-destructive/10 text-destructive'
                      }`}>{std.compliance}% compliant</Badge>
                    </div>
                    <Progress value={std.compliance} className="h-2 rounded-full" />
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default AdminCurriculumPage;
