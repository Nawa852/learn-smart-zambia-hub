import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { BarChart3 } from 'lucide-react';

interface TopStudent {
  name: string;
  avgScore: number;
  submissions: number;
}

export const TopStudentsWidget = () => {
  const { user } = useSecureAuth();
  const [students, setStudents] = useState<TopStudent[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data: courses } = await supabase
        .from('courses')
        .select('id')
        .eq('created_by', user.id);

      if (!courses?.length) return;
      const courseIds = courses.map(c => c.id);

      const { data: assignments } = await supabase
        .from('assignments')
        .select('id')
        .in('course_id', courseIds);

      if (!assignments?.length) return;
      const assignmentIds = assignments.map(a => a.id);

      const { data: submissions } = await supabase
        .from('submissions')
        .select('user_id, score')
        .in('assignment_id', assignmentIds)
        .not('score', 'is', null);

      if (!submissions?.length) return;

      const studentScores: Record<string, { total: number; count: number }> = {};
      submissions.forEach(s => {
        if (!studentScores[s.user_id]) studentScores[s.user_id] = { total: 0, count: 0 };
        studentScores[s.user_id].total += (s.score || 0);
        studentScores[s.user_id].count += 1;
      });

      const userIds = Object.keys(studentScores);
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);

      const profileMap = Object.fromEntries((profiles || []).map(p => [p.id, p.full_name || 'Student']));

      const top = Object.entries(studentScores)
        .map(([id, s]) => ({
          name: profileMap[id] || 'Student',
          avgScore: Math.round(s.total / s.count),
          submissions: s.count,
        }))
        .sort((a, b) => b.avgScore - a.avgScore)
        .slice(0, 5);

      setStudents(top);
    };
    load();
  }, [user]);

  if (students.length === 0) return null;

  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" /> Top Performers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {students.map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
              <p className="text-[10px] text-muted-foreground">{s.submissions} submissions</p>
            </div>
            <span className="text-sm font-bold text-accent">{s.avgScore}%</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
