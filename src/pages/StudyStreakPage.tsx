import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Calendar, Trophy, TrendingUp } from 'lucide-react';
import { format, subDays, startOfDay, eachDayOfInterval, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

const StudyStreakPage = () => {
  const { data: sessions } = useQuery({
    queryKey: ['focus-sessions-streak'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      const { data } = await supabase
        .from('focus_sessions')
        .select('started_at, focus_minutes')
        .eq('user_id', user.id)
        .gte('started_at', subDays(new Date(), 365).toISOString())
        .order('started_at', { ascending: true });
      return data || [];
    },
  });

  const { data: stats } = useQuery({
    queryKey: ['user-stats-streak'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase
        .from('user_stats')
        .select('current_streak, longest_streak, total_focus_minutes')
        .eq('user_id', user.id)
        .maybeSingle();
      return data;
    },
  });

  const heatmapData = useMemo(() => {
    const end = startOfDay(new Date());
    const start = subDays(end, 364);
    const days = eachDayOfInterval({ start, end });

    return days.map(day => {
      const dayMin = sessions?.filter(s =>
        isSameDay(new Date(s.started_at), day)
      ).reduce((sum, s) => sum + (s.focus_minutes || 0), 0) || 0;

      let level = 0;
      if (dayMin > 0) level = 1;
      if (dayMin >= 30) level = 2;
      if (dayMin >= 60) level = 3;
      if (dayMin >= 120) level = 4;

      return { date: day, minutes: dayMin, level };
    });
  }, [sessions]);

  const weeks = useMemo(() => {
    const result: typeof heatmapData[] = [];
    for (let i = 0; i < heatmapData.length; i += 7) {
      result.push(heatmapData.slice(i, i + 7));
    }
    return result;
  }, [heatmapData]);

  const levelColors = [
    'bg-muted',
    'bg-emerald-200 dark:bg-emerald-900',
    'bg-emerald-400 dark:bg-emerald-700',
    'bg-emerald-500 dark:bg-emerald-500',
    'bg-emerald-700 dark:bg-emerald-300',
  ];

  const monthLabels = useMemo(() => {
    const labels: { label: string; col: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const month = week[0]?.date.getMonth();
      if (month !== undefined && month !== lastMonth) {
        labels.push({ label: format(week[0].date, 'MMM'), col: i });
        lastMonth = month;
      }
    });
    return labels;
  }, [weeks]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Study Streak</h1>
        <p className="text-muted-foreground text-sm mt-1">Your daily study activity over the past year</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-orange-500/10">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats?.current_streak || 0}</p>
              <p className="text-xs text-muted-foreground">Current Streak</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats?.longest_streak || 0}</p>
              <p className="text-xs text-muted-foreground">Longest Streak</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{Math.round((stats?.total_focus_minutes || 0) / 60)}h</p>
              <p className="text-xs text-muted-foreground">Total Focus Time</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="w-4 h-4" />
            Activity Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {/* Month labels */}
            <div className="flex gap-[3px] mb-1 ml-8">
              {monthLabels.map((m, i) => (
                <div
                  key={i}
                  className="text-[10px] text-muted-foreground"
                  style={{ position: 'relative', left: `${m.col * 15}px` }}
                >
                  {m.label}
                </div>
              ))}
            </div>

            <div className="flex gap-[3px]">
              {/* Day labels */}
              <div className="flex flex-col gap-[3px] mr-1">
                {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                  <div key={i} className="h-[12px] text-[9px] text-muted-foreground leading-[12px]">{d}</div>
                ))}
              </div>

              {/* Grid */}
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className={cn(
                        'w-[12px] h-[12px] rounded-[2px] transition-colors',
                        levelColors[day.level]
                      )}
                      title={`${format(day.date, 'MMM d, yyyy')}: ${day.minutes} min`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1 mt-3 justify-end">
              <span className="text-[10px] text-muted-foreground mr-1">Less</span>
              {levelColors.map((color, i) => (
                <div key={i} className={cn('w-[12px] h-[12px] rounded-[2px]', color)} />
              ))}
              <span className="text-[10px] text-muted-foreground ml-1">More</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyStreakPage;
