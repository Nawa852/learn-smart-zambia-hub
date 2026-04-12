import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, Zap, Trophy, Target, Star, Gift, BookOpen, Brain, Timer, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const DAILY_CHALLENGES = [
  { id: 'quiz', title: 'Quick Quiz', desc: 'Complete 1 quiz', xp: 25, icon: Brain, check: 'quiz_attempts' },
  { id: 'lesson', title: 'Learn Something', desc: 'Complete 1 lesson', xp: 15, icon: BookOpen, check: 'lesson_completions' },
  { id: 'focus', title: 'Focus 15min', desc: '15min focus session', xp: 20, icon: Timer, check: 'focus_sessions' },
  { id: 'notes', title: 'Take Notes', desc: 'Write study notes', xp: 10, icon: Target, check: 'student_notes' },
];

const DailyChallengePage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [claimedXP, setClaimedXP] = useState(false);

  const { data: stats } = useQuery({
    queryKey: ['user-stats', user?.id],
    queryFn: async () => {
      const { data } = await supabase.from('user_stats').select('*').eq('user_id', user?.id || '').single();
      return data;
    },
    enabled: !!user,
  });

  const { data: todayProgress } = useQuery({
    queryKey: ['daily-progress', user?.id],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const [quizzes, lessons, focus, notes] = await Promise.all([
        supabase.from('quiz_attempts').select('id', { count: 'exact' }).eq('user_id', user?.id || '').gte('created_at', today).limit(1),
        supabase.from('lesson_completions').select('id', { count: 'exact' }).eq('user_id', user?.id || '').gte('completed_at', today).limit(1),
        supabase.from('focus_sessions').select('id, focus_minutes').eq('user_id', user?.id || '').gte('started_at', today).eq('gave_up', false).limit(1),
        supabase.from('student_notes').select('id', { count: 'exact' }).eq('user_id', user?.id || '').gte('created_at', today).limit(1),
      ]);
      return {
        quiz_attempts: (quizzes.data?.length || 0) > 0,
        lesson_completions: (lessons.data?.length || 0) > 0,
        focus_sessions: (focus.data || []).some((s: any) => s.focus_minutes >= 15),
        student_notes: (notes.data?.length || 0) > 0,
      };
    },
    enabled: !!user,
  });

  const { data: checkin } = useQuery({
    queryKey: ['daily-checkin', user?.id],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase.from('daily_checkins').select('id').eq('user_id', user?.id || '').eq('checkin_date', today).limit(1);
      return (data?.length || 0) > 0;
    },
    enabled: !!user,
  });

  const checkinMutation = useMutation({
    mutationFn: async (mood: string) => {
      const { error } = await supabase.from('daily_checkins').insert({
        user_id: user?.id, mood, checkin_date: new Date().toISOString().split('T')[0],
      });
      if (error) throw error;
      await supabase.rpc('award_xp', { p_user_id: user?.id || '', p_xp: 5, p_coins: 2 });
    },
    onSuccess: () => {
      toast.success('+5 XP for checking in!');
      queryClient.invalidateQueries({ queryKey: ['daily-checkin'] });
      queryClient.invalidateQueries({ queryKey: ['user-stats'] });
    },
  });

  const completedCount = todayProgress ? Object.values(todayProgress).filter(Boolean).length : 0;
  const allComplete = completedCount === 4;

  const claimBonus = useMutation({
    mutationFn: async () => {
      await supabase.rpc('award_xp', { p_user_id: user?.id || '', p_xp: 50, p_coins: 25 });
    },
    onSuccess: () => {
      setClaimedXP(true);
      toast.success('🎉 +50 XP bonus for completing all daily challenges!');
      queryClient.invalidateQueries({ queryKey: ['user-stats'] });
    },
  });

  const level = stats?.level || 1;
  const xp = stats?.xp || 0;
  const nextLevelXP = level * 100;
  const xpProgress = ((xp % 100) / 100) * 100;

  return (
    <div className="space-y-5 pb-24">
      {/* Hero with XP */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-primary/10 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-lg font-black text-foreground">{stats?.current_streak || 0} day streak</span>
            </div>
            <p className="text-xs text-muted-foreground">Complete all challenges for bonus XP!</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-foreground">{xp}</p>
            <p className="text-[10px] text-muted-foreground">XP · Level {level}</p>
          </div>
        </div>
        {/* XP Bar */}
        <div className="mt-3 h-2 bg-background/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">{xp % 100}/{100} XP to Level {level + 1}</p>
      </div>

      {/* Daily Check-in */}
      {!checkin && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <p className="text-sm font-semibold text-foreground mb-2">How are you feeling today?</p>
            <div className="flex gap-2 justify-center">
              {['😊', '😐', '😤', '😴', '🤔'].map(mood => (
                <Button
                  key={mood}
                  variant="outline"
                  size="sm"
                  className="text-lg h-10 w-10 p-0"
                  onClick={() => checkinMutation.mutate(mood)}
                  disabled={checkinMutation.isPending}
                >
                  {mood}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Challenges */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" /> Daily Challenges
          </h2>
          <Badge variant="secondary" className="text-[10px]">
            {completedCount}/4
          </Badge>
        </div>

        {DAILY_CHALLENGES.map((challenge) => {
          const done = todayProgress?.[challenge.check as keyof typeof todayProgress] || false;
          const Icon = challenge.icon;
          return (
            <motion.div key={challenge.id} layout>
              <Card className={`border-border/50 transition-all ${done ? 'bg-green-500/5 border-green-500/20' : 'bg-card'} shadow-card`}>
                <CardContent className="p-3 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    done ? 'bg-green-500/20' : 'bg-primary/10'
                  }`}>
                    {done ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Icon className="w-5 h-5 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${done ? 'text-green-700 dark:text-green-400 line-through' : 'text-foreground'}`}>
                      {challenge.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{challenge.desc}</p>
                  </div>
                  <Badge variant={done ? 'default' : 'outline'} className="text-[10px]">
                    +{challenge.xp} XP
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}

        {/* Bonus */}
        <AnimatePresence>
          {allComplete && !claimedXP && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-sm font-bold text-foreground">All Challenges Complete! 🎉</p>
                  <Button
                    onClick={() => claimBonus.mutate()}
                    disabled={claimBonus.isPending}
                    className="mt-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0"
                  >
                    <Gift className="w-4 h-4 mr-2" /> Claim +50 XP Bonus
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-border/50 bg-card shadow-card">
          <CardContent className="p-3 text-center">
            <Star className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <p className="text-lg font-black text-foreground">{stats?.edu_coins || 0}</p>
            <p className="text-[10px] text-muted-foreground">EduCoins</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card shadow-card">
          <CardContent className="p-3 text-center">
            <BookOpen className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-black text-foreground">{stats?.total_lessons_completed || 0}</p>
            <p className="text-[10px] text-muted-foreground">Lessons Done</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailyChallengePage;
