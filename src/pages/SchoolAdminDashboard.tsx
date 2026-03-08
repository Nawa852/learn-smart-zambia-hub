import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Users, GraduationCap, BookOpen, TrendingUp, BarChart3,
  Calendar, Bell, Settings, Download, FileText, Shield, Award,
  Clock, CheckCircle, AlertTriangle, Eye, Edit, PlusCircle,
  Search, Filter, ChevronRight, Mail, Phone, MapPin, Target,
  Brain, Sparkles, PieChart, LineChart, Zap, UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MainLayout } from '@/components/Layout/MainLayout';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useProfile } from '@/hooks/useProfile';

const SchoolAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const { profile } = useProfile();
  const schoolName = profile?.school || '';

  // Live stats
  const { data: platformStats } = useQuery({
    queryKey: ['platform-stats'],
    queryFn: async () => {
      const { data } = await supabase.rpc('get_platform_stats');
      return data as Record<string, number> | null;
    },
  });

  // Students at this school
  const { data: schoolStudents = [] } = useQuery({
    queryKey: ['school-students', schoolName],
    queryFn: async () => {
      if (!schoolName) return [];
      const { data } = await supabase.from('profiles').select('id, full_name, grade, role').eq('school', schoolName).eq('role', 'student');
      return data || [];
    },
    enabled: !!schoolName,
  });

  // Teachers at this school
  const { data: schoolTeachers = [] } = useQuery({
    queryKey: ['school-teachers', schoolName],
    queryFn: async () => {
      if (!schoolName) return [];
      const { data } = await supabase.from('profiles').select('id, full_name, role').eq('school', schoolName).eq('role', 'teacher');
      return data || [];
    },
    enabled: !!schoolName,
  });

  // Courses at this school (created by school teachers)
  const { data: schoolCourses = [] } = useQuery({
    queryKey: ['school-courses', schoolTeachers],
    queryFn: async () => {
      if (!schoolTeachers.length) return [];
      const teacherIds = schoolTeachers.map(t => t.id);
      const { data } = await supabase.from('courses').select('id, title, subject, created_by').in('created_by', teacherIds);
      return data || [];
    },
    enabled: schoolTeachers.length > 0,
  });

  // Grades for school courses
  const { data: schoolGrades = [] } = useQuery({
    queryKey: ['school-grades', schoolCourses],
    queryFn: async () => {
      if (!schoolCourses.length) return [];
      const courseIds = schoolCourses.map(c => c.id);
      const { data } = await supabase.from('grades').select('score, course_id, student_id, grade_letter').in('course_id', courseIds);
      return data || [];
    },
    enabled: schoolCourses.length > 0,
  });

  const avgScore = schoolGrades.length > 0
    ? Math.round(schoolGrades.reduce((sum, g) => sum + (g.score || 0), 0) / schoolGrades.length)
    : 0;

  const passRate = schoolGrades.length > 0
    ? Math.round((schoolGrades.filter(g => (g.score || 0) >= 40).length / schoolGrades.length) * 100)
    : 0;

  const stats = [
    { label: 'Total Students', value: schoolStudents.length.toLocaleString(), icon: GraduationCap, color: 'bg-primary', change: `at ${schoolName || 'your school'}` },
    { label: 'Teaching Staff', value: String(schoolTeachers.length), icon: Users, color: 'bg-accent', change: 'Active teachers' },
    { label: 'Avg. Score', value: `${avgScore}%`, icon: TrendingUp, color: 'bg-primary', change: `${passRate}% pass rate` },
    { label: 'Courses', value: String(schoolCourses.length), icon: BookOpen, color: 'bg-primary', change: 'Created by staff' },
  ];

  // Group courses by subject for departments
  const departments = React.useMemo(() => {
    const subjectMap: Record<string, { teachers: Set<string>; courseIds: string[] }> = {};
    schoolCourses.forEach(c => {
      const subj = c.subject || 'Other';
      if (!subjectMap[subj]) subjectMap[subj] = { teachers: new Set(), courseIds: [] };
      if (c.created_by) subjectMap[subj].teachers.add(c.created_by);
      subjectMap[subj].courseIds.push(c.id);
    });
    return Object.entries(subjectMap).map(([name, info]) => {
      const deptGrades = schoolGrades.filter(g => info.courseIds.includes(g.course_id));
      const avg = deptGrades.length > 0 ? Math.round(deptGrades.reduce((s, g) => s + (g.score || 0), 0) / deptGrades.length) : 0;
      const studentSet = new Set(deptGrades.map(g => g.student_id));
      return { name, teachers: info.teachers.size, students: studentSet.size, avgScore: avg };
    });
  }, [schoolCourses, schoolGrades]);

  // Teacher performance
  const teachersList = React.useMemo(() => {
    return schoolTeachers.map(t => {
      const tCourses = schoolCourses.filter(c => c.created_by === t.id);
      const tGrades = schoolGrades.filter(g => tCourses.some(c => c.id === g.course_id));
      const avg = tGrades.length > 0 ? Math.round(tGrades.reduce((s, g) => s + (g.score || 0), 0) / tGrades.length) : 0;
      return { name: t.full_name || 'Unknown', subjects: [...new Set(tCourses.map(c => c.subject || 'N/A'))].join(', '), classes: tCourses.length, performance: avg };
    });
  }, [schoolTeachers, schoolCourses, schoolGrades]);

  // Grade-level performance
  const gradePerformance = React.useMemo(() => {
    const gradeMap: Record<string, { scores: number[]; studentIds: Set<string> }> = {};
    schoolStudents.forEach(s => {
      const g = s.grade || 'Unknown';
      if (!gradeMap[g]) gradeMap[g] = { scores: [], studentIds: new Set() };
      gradeMap[g].studentIds.add(s.id);
    });
    schoolGrades.forEach(g => {
      const student = schoolStudents.find(s => s.id === g.student_id);
      const grade = student?.grade || 'Unknown';
      if (gradeMap[grade]) gradeMap[grade].scores.push(g.score || 0);
    });
    return Object.entries(gradeMap).map(([grade, info]) => ({
      grade,
      students: info.studentIds.size,
      avgScore: info.scores.length > 0 ? Math.round(info.scores.reduce((a, b) => a + b, 0) / info.scores.length) : 0,
      passRate: info.scores.length > 0 ? Math.round((info.scores.filter(s => s >= 40).length / info.scores.length) * 100) : 0,
    }));
  }, [schoolStudents, schoolGrades]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-background p-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{schoolName || 'School Administration'}</h1>
                <p className="text-muted-foreground mt-1">School Administration Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Reports</Button>
              <Button className="bg-primary"><Settings className="h-4 w-4 mr-2" />Settings</Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-foreground mt-1">{stat.value}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-xl`}>
                      <stat.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1 flex-wrap">
            <TabsTrigger value="overview" className="flex items-center gap-2"><BarChart3 className="h-4 w-4" />Overview</TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center gap-2"><Building2 className="h-4 w-4" />Departments</TabsTrigger>
            <TabsTrigger value="teachers" className="flex items-center gap-2"><Users className="h-4 w-4" />Teachers</TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2"><TrendingUp className="h-4 w-4" />Performance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" />Department Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departments.length === 0 && <p className="text-muted-foreground text-sm">No course data available yet.</p>}
                    {departments.slice(0, 6).map((dept, index) => (
                      <motion.div key={dept.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-lg"><BookOpen className="h-5 w-5 text-primary" /></div>
                          <div>
                            <h4 className="font-semibold text-foreground">{dept.name}</h4>
                            <p className="text-sm text-muted-foreground">{dept.teachers} teacher(s)</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-lg font-bold">{dept.students}</p>
                            <p className="text-xs text-muted-foreground">Students</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-primary">{dept.avgScore}%</p>
                            <p className="text-xs text-muted-foreground">Avg Score</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader><CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-primary" />Quick Actions</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { icon: Users, label: 'User Management', desc: 'Manage staff', url: '/admin/users' },
                      { icon: BookOpen, label: 'Curriculum', desc: 'Track progress', url: '/admin/curriculum' },
                      { icon: Calendar, label: 'Scheduling', desc: 'School calendar', url: '/admin/scheduling' },
                      { icon: BarChart3, label: 'Analytics', desc: 'Performance data', url: '/admin/analytics' },
                      { icon: UserCheck, label: 'Attendance', desc: 'Daily overview', url: '/admin/attendance' },
                    ].map((action) => (
                      <Button key={action.label} variant="outline" className="w-full justify-start h-auto py-3"
                        onClick={() => window.location.href = action.url}>
                        <action.icon className="h-5 w-5 text-primary mr-3" />
                        <div className="text-left">
                          <span className="font-medium block">{action.label}</span>
                          <span className="text-xs text-muted-foreground">{action.desc}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Grade Performance */}
            <Card className="border-none shadow-lg">
              <CardHeader><CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-primary" />Grade-Level Performance</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {gradePerformance.length === 0 && <p className="text-muted-foreground text-sm col-span-4">No grade data available.</p>}
                  {gradePerformance.map((grade, index) => (
                    <motion.div key={grade.grade} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-muted/30 text-center">
                      <h4 className="font-semibold mb-2">{grade.grade}</h4>
                      <p className="text-3xl font-bold text-primary mb-1">{grade.avgScore}%</p>
                      <p className="text-xs text-muted-foreground mb-3">Avg Score</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Students</span><span className="font-medium">{grade.students}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Pass Rate</span><span className="font-medium text-primary">{grade.passRate}%</span></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.length === 0 && <p className="text-muted-foreground text-sm">No departments found. Create courses to populate departments.</p>}
              {departments.map((dept, index) => (
                <motion.div key={dept.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <Card className="border-none shadow-lg hover:shadow-xl transition-all">
                    <CardHeader>
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                      <CardDescription>{dept.teachers} teacher(s)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-2 rounded-lg bg-muted/30">
                          <p className="text-lg font-bold text-primary">{dept.teachers}</p>
                          <p className="text-xs text-muted-foreground">Teachers</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-muted/30">
                          <p className="text-lg font-bold text-accent-foreground">{dept.students}</p>
                          <p className="text-xs text-muted-foreground">Students</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-muted/30">
                          <p className="text-lg font-bold text-primary">{dept.avgScore}%</p>
                          <p className="text-xs text-muted-foreground">Avg Score</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers" className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium">Teacher</th>
                        <th className="text-left p-4 font-medium">Subjects</th>
                        <th className="text-center p-4 font-medium">Courses</th>
                        <th className="text-center p-4 font-medium">Avg Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachersList.length === 0 && (
                        <tr><td colSpan={4} className="p-4 text-center text-muted-foreground">No teachers found at this school.</td></tr>
                      )}
                      {teachersList.map((teacher, index) => (
                        <motion.tr key={teacher.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }}
                          className="border-b border-muted/30 hover:bg-muted/20">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {(teacher.name || '??').split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{teacher.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground">{teacher.subjects || 'N/A'}</td>
                          <td className="p-4 text-center">{teacher.classes}</td>
                          <td className="p-4 text-center">
                            <Badge variant={teacher.performance >= 60 ? 'default' : 'secondary'}>{teacher.performance}%</Badge>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" />Subject Performance</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departments.length === 0 && <p className="text-muted-foreground text-sm">No data yet.</p>}
                    {departments.map((dept) => (
                      <div key={dept.name} className="p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{dept.name}</span>
                          <span className="text-lg font-bold text-primary">{dept.avgScore}%</span>
                        </div>
                        <Progress value={dept.avgScore} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" />Grade Performance</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-primary mb-2">{avgScore}%</div>
                    <p className="text-muted-foreground">Overall Average Score</p>
                    <Badge variant="default" className="mt-2">{passRate}% pass rate</Badge>
                  </div>
                  <div className="space-y-3">
                    {gradePerformance.map((grade) => (
                      <div key={grade.grade} className="flex items-center justify-between">
                        <span>{grade.grade}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={grade.avgScore} className="h-2 w-32" />
                          <span className="text-sm font-medium w-12">{grade.avgScore}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SchoolAdminDashboard;
