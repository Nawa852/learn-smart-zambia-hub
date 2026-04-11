import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Flame, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const StreakCalendar = () => {
  const { user } = useAuth();
  const [activeDays, setActiveDays] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
    const last28 = new Date();
    last28.setDate(last28.getDate() - 27);

    const loadActivity = async () => {
      const [{ data: lessons }, { data: focus }, { data: quizzes }] = await Promise.all([
        supabase.from('lesson_completions').select('completed_at').eq('user_id', user.id).gte('completed_at', last28.toISOString()),
        supabase.from('focus_sessions').select('started_at').eq('user_id', user.id).gte('started_at', last28.toISOString()),
        supabase.from('quiz_attempts').select('created_at').eq('user_id', user.id).gte('created_at', last28.toISOString()),
      ]);

      const days = new Set<string>();
      [...(lessons || [])].forEach(r => days.add(new Date(r.completed_at).toISOString().split('T')[0]));
      [...(focus || [])].forEach(r => days.add(new Date(r.started_at).toISOString().split('T')[0]));
      [...(quizzes || [])].forEach(r => days.add(new Date(r.created_at).toISOString().split('T')[0]));
      setActiveDays(days);
    };
    loadActivity();
  }, [user]);

  const today = new Date();
  const days = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - 27 + i);
    return d.toISOString().split('T')[0];
  });

  const streakCount = (() => {
    let count = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (activeDays.has(days[i])) count++;
      else if (i < days.length - 1) break; // allow today to be incomplete
      else break;
    }
    return count;
  })();

  const weekLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" />
          {streakCount} Day Streak
        </h3>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Last 28 days</span>
      </div>
      <TooltipProvider delayDuration={200}>
        <div className="grid grid-cols-7 gap-1.5">
          {weekLabels.map((l, i) => (
            <div key={`label-${i}`} className="text-[9px] text-muted-foreground text-center font-medium">{l}</div>
          ))}
          {days.map(day => {
            const active = activeDays.has(day);
            const isToday = day === today.toISOString().split('T')[0];
            return (
              <Tooltip key={day}>
                <TooltipTrigger asChild>
                  <div className={cn(
                    "aspect-square rounded-md flex items-center justify-center transition-colors cursor-default",
                    active ? "bg-accent text-accent-foreground" : "bg-muted/50",
                    isToday && !active && "ring-1 ring-primary/50"
                  )}>
                    {active && <Check className="w-2.5 h-2.5" />}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  {new Date(day).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  {active ? ' ✅ Active' : ' — No activity'}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
};
