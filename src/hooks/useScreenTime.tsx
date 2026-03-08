import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';

export function useScreenTime() {
  const { user } = useAuth();
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [dailyLimit, setDailyLimit] = useState<number | null>(null);
  const [isOverLimit, setIsOverLimit] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(Date.now());

  // Track active usage time
  useEffect(() => {
    if (!user) return;
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(async () => {
      const elapsedMinutes = Math.floor((Date.now() - startTimeRef.current) / 60000);
      if (elapsedMinutes < 1) return;
      startTimeRef.current = Date.now();

      const today = new Date().toISOString().slice(0, 10);
      const { data: existing } = await (supabase.from('screen_time_logs') as any)
        .select('id, minutes_used')
        .eq('user_id', user.id)
        .eq('date', today)
        .eq('app_name', 'edu_zambia')
        .maybeSingle();

      if (existing) {
        const newMinutes = existing.minutes_used + elapsedMinutes;
        await (supabase.from('screen_time_logs') as any)
          .update({ minutes_used: newMinutes })
          .eq('id', existing.id);
        setTodayMinutes(newMinutes);
      } else {
        await (supabase.from('screen_time_logs') as any).insert({
          user_id: user.id,
          date: today,
          app_name: 'edu_zambia',
          minutes_used: elapsedMinutes,
          category: 'learning',
        });
        setTodayMinutes(elapsedMinutes);
      }
    }, 60000); // Every minute

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [user]);

  // Fetch today's screen time and device controls
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const [{ data: log }, { data: controls }] = await Promise.all([
        (supabase.from('screen_time_logs') as any)
          .select('minutes_used')
          .eq('user_id', user.id)
          .eq('date', today)
          .eq('app_name', 'edu_zambia')
          .maybeSingle(),
        (supabase.from('device_controls') as any)
          .select('daily_screen_limit_minutes')
          .eq('student_id', user.id)
          .maybeSingle(),
      ]);
      setTodayMinutes(log?.minutes_used || 0);
      if (controls) {
        setDailyLimit(controls.daily_screen_limit_minutes);
        setIsOverLimit((log?.minutes_used || 0) >= controls.daily_screen_limit_minutes);
      }
    };
    fetchData();
  }, [user]);

  return { todayMinutes, dailyLimit, isOverLimit };
}
