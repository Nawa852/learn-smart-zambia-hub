import React from 'react';
import { BarChart3, TrendingUp, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', '#f59e0b', '#ef4444', '#8b5cf6'];

const TeacherAssignmentAnalyticsPage = () => {
  const { user } = useAuth();

  const { data: assignments } = useQuery({
    queryKey: ['teacher-assignments-analytics', user?.id],
    queryFn: async () => {
      const { data: courses } = await supabase.from('courses').select('id, title').eq('created_by', user!.id);
      if (!courses?.length) return [];
      const courseIds = courses.map(c => c.id);
      const { data } = await supabase.from('assignments').select('*, submissions(*)').in('course_id', courseIds);
      return (data || []).map(a => ({
        ...a,
        courseName: courses.find(c => c.id === a.course_id)?.title || 'Unknown',
        submissionCount: (a.submissions as any[])?.length || 0,
        avgScore: (a.submissions as any[])?.length
          ? Math.round((a.submissions as any[]).reduce((sum: number, s: any) => sum + (s.score || 0), 0) / (a.submissions as any[]).length)
          : 0,
        gradedCount: (a.submissions as any[])?.filter((s: any) => s.graded_at).length || 0,
      }));
    },
    enabled: !!user,
  });

  const totalSubmissions = assignments?.reduce((sum, a) => sum + a.submissionCount, 0) || 0;
  const avgScore = assignments?.length
    ? Math.round(assignments.reduce((sum, a) => sum + a.avgScore, 0) / assignments.length)
    : 0;
  const pendingGrading = assignments?.reduce((sum, a) => sum + (a.submissionCount - a.gradedCount), 0) || 0;

  const chartData = assignments?.map(a => ({
    name: a.title.slice(0, 20),
    submissions: a.submissionCount,
    avgScore: a.avgScore,
  })) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-primary" /> Assignment Analytics
        </h1>
        <p className="text-muted-foreground mt-1">Track submission rates, scores, and grading progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Assignments', value: assignments?.length || 0, icon: BarChart3 },
          { label: 'Total Submissions', value: totalSubmissions, icon: Users },
          { label: 'Avg Score', value: `${avgScore}%`, icon: TrendingUp },
          { label: 'Pending Grading', value: pendingGrading, icon: Clock },
        ].map(s => (
          <Card key={s.label} className="border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <s.icon className="h-6 w-6 mx-auto text-primary mb-1" />
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {chartData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Submissions per Assignment</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="submissions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Average Scores</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="avgScore" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {assignments && assignments.length === 0 && (
        <Card><CardContent className="p-12 text-center text-muted-foreground">No assignments found. Create a course and add assignments to see analytics here.</CardContent></Card>
      )}
    </div>
  );
};

export default TeacherAssignmentAnalyticsPage;
