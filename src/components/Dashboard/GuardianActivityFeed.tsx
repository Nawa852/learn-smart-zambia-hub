import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useGuardianData } from '@/hooks/useGuardianData';
import { Activity, BookOpen, Target, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  type: 'lesson' | 'quiz' | 'focus';
  description: string;
  studentName: string;
  timestamp: string;
}

const typeConfig = {
  lesson: { icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10' },
  quiz: { icon: Target, color: 'text-accent', bg: 'bg-accent/10' },
  focus: { icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
};

export const GuardianActivityFeed = () => {
  const { students } = useGuardianData();
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    if (!students.length) return;
    const load = async () => {
      const studentIds = students.map(s => s.id);
      const nameMap = Object.fromEntries(students.map(s => [s.id, s.name.split(' ')[0]]));
      const items: ActivityItem[] = [];

      const { data: completions } = await supabase
        .from('lesson_completions').select('user_id, completed_at, lessons(title)')
        .in('user_id', studentIds).order('completed_at', { ascending: false }).limit(5);

      completions?.forEach((c: any) => {
        items.push({ type: 'lesson', description: `Completed "${c.lessons?.title || 'a lesson'}"`, studentName: nameMap[c.user_id] || 'Student', timestamp: c.completed_at });
      });

      const { data: quizzes } = await supabase
        .from('quiz_attempts').select('user_id, created_at, subject, correct_answers, total_questions')
        .in('user_id', studentIds).order('created_at', { ascending: false }).limit(5);

      quizzes?.forEach(q => {
        items.push({ type: 'quiz', description: `Scored ${q.correct_answers}/${q.total_questions} in ${q.subject}`, studentName: nameMap[q.user_id] || 'Student', timestamp: q.created_at });
      });

      const { data: focus } = await supabase
        .from('focus_sessions').select('user_id, started_at, focus_minutes, subject, gave_up')
        .in('user_id', studentIds).order('started_at', { ascending: false }).limit(5);

      focus?.forEach(f => {
        items.push({ type: 'focus', description: `${f.gave_up ? 'Attempted' : 'Completed'} ${f.focus_minutes}min focus on ${f.subject}`, studentName: nameMap[f.user_id] || 'Student', timestamp: f.started_at });
      });

      items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setActivities(items.slice(0, 8));
    };
    load();
  }, [students]);

  if (activities.length === 0) return null;

  return (
    <Card className="border-border/50 bg-card shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Activity className="w-3.5 h-3.5 text-primary" />
          </div>
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0.5">
          {activities.map((a, i) => {
            const cfg = typeConfig[a.type];
            const Icon = cfg.icon;
            return (
              <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-secondary/30 transition-all duration-200">
                <div className={`w-7 h-7 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{a.studentName}</span>{' '}
                    <span className="text-muted-foreground">{a.description}</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                    {formatDistanceToNow(new Date(a.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
