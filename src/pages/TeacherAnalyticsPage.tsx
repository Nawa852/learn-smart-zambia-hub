import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTeacherStats } from '@/hooks/useTeacherStats';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { supabase } from '@/integrations/supabase/client';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, ClipboardCheck, TrendingUp, Award } from 'lucide-react';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function TeacherAnalyticsPage() {
  const { user } = useSecureAuth();
  const { courses, totalStudents, pendingCount, avgPerformance, loading } = useTeacherStats();
  const [enrollmentData, setEnrollmentData] = useState<{ name: string; students: number }[]>([]);
  const [completionData, setCompletionData] = useState<{ name: string; completed: number; total: number }[]>([]);

  useEffect(() => {
    if (!user?.id || courses.length === 0) return;
    fetchAnalytics();
  }, [user?.id, courses]);

  const fetchAnalytics = async () => {
    if (!user?.id) return;
    const courseIds = courses.map(c => c.id);

    // Enrollment per course for bar chart
    setEnrollmentData(courses.map(c => ({ name: c.title.length > 20 ? c.title.slice(0, 20) + '…' : c.title, students: c.enrollment_count })));

    // Lesson completions per course
    const { data: lessons } = await supabase
      .from('lessons')
      .select('id, course_id')
      .in('course_id', courseIds);

    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('course_id, user_id')
      .in('course_id', courseIds);

    // We can't query lesson_completions for all students (RLS restricts to own), 
    // so we show enrollment-based data instead
    setCompletionData(courses.map(c => {
      const lessonCount = lessons?.filter(l => l.course_id === c.id).length || 0;
      const studentCount = c.enrollment_count;
      return {
        name: c.title.length > 20 ? c.title.slice(0, 20) + '…' : c.title,
        completed: Math.round((c.avg_score || 0) * studentCount / 100),
        total: studentCount,
      };
    }));
  };

  if (loading) return <div className="py-20"><LogoLoader size="lg" text="Loading analytics..." /></div>;

  const publishedCount = courses.filter(c => c.is_published).length;
  const draftCount = courses.length - publishedCount;

  const courseStatusData = [
    { name: 'Published', value: publishedCount },
    { name: 'Draft', value: draftCount },
  ].filter(d => d.value > 0);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Teacher Analytics</h1>
          <p className="text-muted-foreground">Performance insights across your courses</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: totalStudents, icon: Users, color: 'text-primary' },
            { label: 'Courses', value: courses.length, icon: BookOpen, color: 'text-green-600' },
            { label: 'Pending Grading', value: pendingCount, icon: ClipboardCheck, color: 'text-orange-600' },
            { label: 'Avg Performance', value: avgPerformance > 0 ? `${avgPerformance}%` : 'N/A', icon: TrendingUp, color: 'text-purple-600' },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {courses.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Award className="w-14 h-14 mx-auto mb-4 text-muted-foreground/30" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No courses yet</h3>
              <p className="text-muted-foreground">Create a course to start seeing analytics.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enrollment per Course */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Enrollment by Course</CardTitle>
                <CardDescription>Number of students per course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={enrollmentData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                      <YAxis className="fill-muted-foreground" />
                      <Tooltip />
                      <Bar dataKey="students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Course Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Status</CardTitle>
                <CardDescription>Published vs Draft courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={courseStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                        {courseStatusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {courseStatusData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-sm text-muted-foreground">{d.name}: {d.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Per-Course Performance */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Per-Course Performance</CardTitle>
                <CardDescription>Average score and enrollment for each course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map(course => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{course.title}</p>
                        <p className="text-sm text-muted-foreground">{course.subject || 'No subject'} • {course.grade_level || 'All grades'}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-lg font-bold text-foreground">{course.enrollment_count}</p>
                          <p className="text-xs text-muted-foreground">Students</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-foreground">{course.avg_score != null ? `${course.avg_score}%` : 'N/A'}</p>
                          <p className="text-xs text-muted-foreground">Avg Score</p>
                        </div>
                        <Badge variant={course.is_published ? 'default' : 'secondary'}>
                          {course.is_published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
