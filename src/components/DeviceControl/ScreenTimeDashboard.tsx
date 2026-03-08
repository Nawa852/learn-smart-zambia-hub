import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Clock, Monitor, Shield, TrendingDown, TrendingUp, Zap } from 'lucide-react';

interface DailyLog {
  date: string;
  minutes_used: number;
}

export const ScreenTimeDashboard: React.FC<{ userId?: string }> = ({ userId }) => {
  const { user } = useAuth();
  const targetUserId = userId || user?.id;
  const [weekData, setWeekData] = useState<DailyLog[]>([]);
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [dailyLimit, setDailyLimit] = useState<number | null>(null);

  useEffect(() => {
    if (!targetUserId) return;
    const fetchData = async () => {
      const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
      const today = new Date().toISOString().slice(0, 10);

      const [{ data: logs }, { data: controls }] = await Promise.all([
        (supabase.from('screen_time_logs') as any)
          .select('date, minutes_used')
          .eq('user_id', targetUserId)
          .gte('date', sevenDaysAgo)
          .order('date', { ascending: true }),
        (supabase.from('device_controls') as any)
          .select('daily_screen_limit_minutes')
          .eq('student_id', targetUserId)
          .maybeSingle(),
      ]);

      setWeekData(logs || []);
      const todayLog = logs?.find((l: DailyLog) => l.date === today);
      setTodayMinutes(todayLog?.minutes_used || 0);
      if (controls) setDailyLimit(controls.daily_screen_limit_minutes);
    };
    fetchData();
  }, [targetUserId]);

  const weekTotal = weekData.reduce((s, d) => s + d.minutes_used, 0);
  const weekAvg = weekData.length > 0 ? Math.round(weekTotal / weekData.length) : 0;
  const limitPercent = dailyLimit ? Math.min(100, (todayMinutes / dailyLimit) * 100) : 0;
  const maxBarMinutes = Math.max(...weekData.map(d => d.minutes_used), dailyLimit || 120, 1);

  return (
    <div className="space-y-4">
      {/* Today's Usage */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Monitor className="w-4 h-4 text-primary" /> Today's Screen Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-bold text-foreground">
                {Math.floor(todayMinutes / 60)}h {todayMinutes % 60}m
              </p>
              {dailyLimit && (
                <p className="text-sm text-muted-foreground mt-1">
                  of {Math.floor(dailyLimit / 60)}h {dailyLimit % 60}m limit
                </p>
              )}
            </div>
            {dailyLimit && (
              <Badge variant={limitPercent >= 90 ? 'destructive' : limitPercent >= 70 ? 'secondary' : 'outline'}>
                {Math.round(limitPercent)}%
              </Badge>
            )}
          </div>
          {dailyLimit && (
            <Progress value={limitPercent} className="h-3" />
          )}
        </CardContent>
      </Card>

      {/* Weekly Bar Chart */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> This Week
            </CardTitle>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" /> {Math.floor(weekTotal / 60)}h total
              </span>
              <span className="flex items-center gap-1">
                ~{Math.floor(weekAvg / 60)}h {weekAvg % 60}m/day
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-32">
            {Array.from({ length: 7 }).map((_, i) => {
              const date = new Date(Date.now() - (6 - i) * 86400000).toISOString().slice(0, 10);
              const dayLog = weekData.find(d => d.date === date);
              const minutes = dayLog?.minutes_used || 0;
              const height = (minutes / maxBarMinutes) * 100;
              const dayName = new Date(date).toLocaleDateString(undefined, { weekday: 'short' });
              const isOverLimit = dailyLimit ? minutes >= dailyLimit : false;

              return (
                <div key={date} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-muted-foreground">
                    {minutes > 0 ? `${Math.floor(minutes / 60)}h` : ''}
                  </span>
                  <div className="w-full flex items-end justify-center" style={{ height: '80px' }}>
                    <div
                      className={`w-full max-w-[28px] rounded-t transition-all ${
                        isOverLimit ? 'bg-destructive' : 'bg-primary'
                      }`}
                      style={{ height: `${Math.max(2, height * 0.8)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{dayName}</span>
                </div>
              );
            })}
          </div>
          {dailyLimit && (
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <Shield className="w-3 h-3" />
              <span>Daily limit: {Math.floor(dailyLimit / 60)}h {dailyLimit % 60}m</span>
              <div className="flex-1 border-t border-dashed border-destructive/30" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
