import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

interface UserStats {
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_active_date: string | null;
}

export const useUserStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>({ total_xp: 0, current_streak: 0, longest_streak: 0, last_active_date: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await (supabase as any)
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (data) {
        setStats(data);
      } else {
        await (supabase as any).from('user_stats').insert({ user_id: user.id });
      }
      setLoading(false);
    };
    load();
  }, [user]);

  const recalculateStreak = useCallback(async () => {
    if (!user) return;

    const { data: completions } = await supabase
      .from('lesson_completions')
      .select('completed_at')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false });

    if (!completions?.length) return;

    const uniqueDates = [...new Set(completions.map(c =>
      new Date(c.completed_at).toISOString().split('T')[0]
    ))].sort().reverse();

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    let streak = 0;
    if (uniqueDates[0] === today || uniqueDates[0] === yesterday) {
      streak = 1;
      for (let i = 1; i < uniqueDates.length; i++) {
        const prev = new Date(uniqueDates[i - 1]);
        const curr = new Date(uniqueDates[i]);
        const diff = (prev.getTime() - curr.getTime()) / 86400000;
        if (diff === 1) streak++;
        else break;
      }
    }

    const newStats = {
      current_streak: streak,
      longest_streak: Math.max(streak, stats.longest_streak),
      last_active_date: today,
      updated_at: new Date().toISOString(),
    };

    await (supabase as any).from('user_stats').update(newStats).eq('user_id', user.id);
    setStats(prev => ({ ...prev, ...newStats }));
  }, [user, stats.longest_streak]);

  const addXP = useCallback(async (amount: number) => {
    if (!user) return;
    const newXP = stats.total_xp + amount;
    await (supabase as any).from('user_stats').update({ total_xp: newXP, updated_at: new Date().toISOString() }).eq('user_id', user.id);
    setStats(prev => ({ ...prev, total_xp: newXP }));
  }, [user, stats.total_xp]);

  return { stats, loading, recalculateStreak, addXP };
};
