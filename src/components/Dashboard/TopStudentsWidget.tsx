import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { Trophy } from 'lucide-react';

interface TopStudent {
  name: string;
  avgScore: number;
  submissions: number;
}

const medalColors = ['text-warning', 'text-muted-foreground', 'text-orange-500'];
const medalBg = ['bg-warning/10', 'bg-secondary', 'bg-orange-500/10'];

export const TopStudentsWidget = () => {
  const { user } = useSecureAuth();
  const [students, setStudents] = useState<TopStudent[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data: courses } = await supabase.from('courses').select('id').eq('created_by', user.id);
      if (!courses?.length) return;

      const { data: assignments } = await supabase.from('assignments').select('id').in('course_id', courses.map(c => c.id));
      if (!assignments?.length) return;

      const { data: submissions } = await supabase.from('submissions').select('user_id, score')
        .in('assignment_id', assignments.map(a => a.id)).not('score', 'is', null);
      if (!submissions?.length) return;

      const scores: Record<string, { total: number; count: number }> = {};
      submissions.forEach(s => {
        if (!scores[s.user_id]) scores[s.user_id] = { total: 0, count: 0 };
        scores[s.user_id].total += (s.score || 0);
        scores[s.user_id].count += 1;
      });

      const userIds = Object.keys(scores);
      const { data: profiles } = await supabase.from('profiles').select('id, full_name').in('id', userIds);
      const nameMap = Object.fromEntries((profiles || []).map(p => [p.id, p.full_name || 'Student']));

      setStudents(
        Object.entries(scores)
          .map(([id, s]) => ({ name: nameMap[id] || 'Student', avgScore: Math.round(s.total / s.count), submissions: s.count }))
          .sort((a, b) => b.avgScore - a.avgScore)
          .slice(0, 5)
      );
    };
    load();
  }, [user]);

  if (students.length === 0) return null;

  return (
    <Card className="border-border/50 bg-card shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <div className="w-7 h-7 rounded-lg bg-warning/10 flex items-center justify-center">
            <Trophy className="w-3.5 h-3.5 text-warning" />
          </div>
          Top Performers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {students.map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-secondary/40 transition-all duration-200 group">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i < 3 ? `${medalBg[i]} ${medalColors[i]}` : 'bg-secondary text-muted-foreground'}`}>
              {i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
              <p className="text-[10px] text-muted-foreground">{s.submissions} submissions</p>
            </div>
            <div className="px-2 py-0.5 rounded-full bg-accent/10 shrink-0">
              <span className="text-xs font-bold text-accent">{s.avgScore}%</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
