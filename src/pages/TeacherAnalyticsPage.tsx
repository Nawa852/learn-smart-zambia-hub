import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTeacherStats } from '@/hooks/useTeacherStats';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { supabase } from '@/integrations/supabase/client';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, ClipboardCheck, TrendingUp, Award, BarChart3 } from 'lucide-react';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function TeacherAnalyticsPage() {
  const { user } = useSecureAuth();
  const { courses, totalStudents, pendingCount, avgPerformance, loading } = useTeacherStats();
  const [enrollmentData, setEnrollmentData] = useState<{ name: string; students: number }[]>([]);

  useEffect(() => {
    if (!user?.id || courses.length === 0) return;
    setEnrollmentData(courses.map(c => ({
      name: c.title.length > 18 ? c.title.slice(0, 18) + '…' : c.title,
      students: c.enrollment_count,
    })));
  }, [user?.id, courses]);

  if (loading) return <div className="py-20"><LogoLoader size="lg" text="Loading analytics..." /></div>;

  const publishedCount = courses.filter(c => c.is_published).length;
  const draftCount = courses.length - publishedCount;
  const courseStatusData = [
    { name: 'Published', value: publishedCount },
    { name: 'Draft', value: draftCount },
  ].filter(d => d.value > 0);

  const stats = [
    { label: 'Total Students', value: totalStudents, icon: Users },
    { label: 'Courses', value: courses.length, icon: BookOpen },
    { label: 'Pending Grading', value: pendingCount, icon: ClipboardCheck },
    { label: 'Avg Performance', value: avgPerformance > 0 ? `${avgPerformance}%` : 'N/A', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          Teacher Analytics
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Performance insights across your courses</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {courses.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <Award className="w-14 h-14 mx-auto mb-4 text-muted-foreground/20" />
            <h3 className="text-lg font-semibold text-foreground mb-1">No courses yet</h3>
            <p className="text-sm text-muted-foreground">Create a course to start seeing analytics</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Enrollment by Course</CardTitle>
                <CardDescription>Number of students per course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={enrollmentData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                      <YAxis className="fill-muted-foreground" />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                      <Bar dataKey="students" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Course Status</CardTitle>
                <CardDescription>Published vs Draft courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[240px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={courseStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} label>
                        {courseStatusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {courseStatusData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-xs text-muted-foreground">{d.name}: {d.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Per-Course Performance</CardTitle>
              <CardDescription>Average score and enrollment for each course</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {courses.map(course => (
                  <div key={course.id} className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">{course.title}</p>
                        <p className="text-xs text-muted-foreground">{course.subject || 'No subject'} • {course.grade_level || 'All grades'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <div className="text-center">
                        <p className="text-lg font-bold text-foreground">{course.enrollment_count}</p>
                        <p className="text-[10px] text-muted-foreground">Students</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-foreground">{course.avg_score != null ? `${course.avg_score}%` : 'N/A'}</p>
                        <p className="text-[10px] text-muted-foreground">Avg Score</p>
                      </div>
                      <Badge variant={course.is_published ? 'default' : 'secondary'} className="text-[10px]">
                        {course.is_published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
