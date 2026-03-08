import React from 'react';
import { BarChart3, TrendingUp, Clock, Users, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  const avgScore = assignments?.length ? Math.round(assignments.reduce((sum, a) => sum + a.avgScore, 0) / assignments.length) : 0;
  const pendingGrading = assignments?.reduce((sum, a) => sum + (a.submissionCount - a.gradedCount), 0) || 0;

  const chartData = assignments?.map(a => ({
    name: a.title.slice(0, 18) + (a.title.length > 18 ? '…' : ''),
    submissions: a.submissionCount,
    avgScore: a.avgScore,
  })) || [];

  const stats = [
    { label: 'Assignments', value: assignments?.length || 0, icon: FileText, desc: 'Total created' },
    { label: 'Submissions', value: totalSubmissions, icon: Users, desc: 'Total received' },
    { label: 'Avg Score', value: `${avgScore}%`, icon: TrendingUp, desc: 'Across all' },
    { label: 'Pending', value: pendingGrading, icon: Clock, desc: 'To grade' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          Assignment Analytics
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Track submission rates, scores, and grading progress</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {chartData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Submissions per Assignment</CardTitle>
              <CardDescription>How many students submitted each assignment</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" fontSize={11} className="fill-muted-foreground" />
                  <YAxis className="fill-muted-foreground" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="submissions" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Average Scores</CardTitle>
              <CardDescription>Performance distribution across assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" fontSize={11} className="fill-muted-foreground" />
                  <YAxis domain={[0, 100]} className="fill-muted-foreground" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="avgScore" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <BarChart3 className="w-14 h-14 mx-auto mb-4 text-muted-foreground/20" />
            <h3 className="text-lg font-semibold text-foreground mb-1">No assignments yet</h3>
            <p className="text-sm text-muted-foreground">Create a course and add assignments to see analytics</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeacherAssignmentAnalyticsPage;
