import React, { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User, Settings, Award, BookOpen, TrendingUp, Brain,
  Camera, Edit, Globe, Clock, Target, Flame, Zap, GraduationCap
} from "lucide-react";
import { useAuth } from '@/components/Auth/AuthProvider';
import { useProfile } from '@/hooks/useProfile';
import { useUserStats } from '@/hooks/useUserStats';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

const Profile = () => {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const { stats, xpProgress, xpToNextLevel } = useUserStats();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';
  const displayEmail = profile?.email || user?.email || '';
  const roleLabel = (profile?.role || 'student').charAt(0).toUpperCase() + (profile?.role || 'student').slice(1);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    const ext = file.name.split('.').pop();
    const path = `avatars/${user.id}.${ext}`;
    const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
    if (error) {
      toast.error('Upload failed');
      return;
    }
    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(path);
    await updateProfile({ avatar_url: urlData.publicUrl });
    toast.success('Avatar updated!');
  };

  const statCards = [
    { label: 'Level', value: stats.level, icon: Zap, color: 'text-primary' },
    { label: 'XP', value: stats.xp.toLocaleString(), icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'Streak', value: `${stats.current_streak}d`, icon: Flame, color: 'text-orange-500' },
    { label: 'Coins', value: stats.edu_coins, icon: Award, color: 'text-amber-500' },
  ];

  const quickActions = [
    { label: 'Account Settings', icon: Settings, path: '/settings' },
    { label: 'Browse Courses', icon: BookOpen, path: '/course-catalog' },
    { label: 'View Achievements', icon: Award, path: '/achievements' },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <motion.div
        className="container mx-auto px-4 max-w-5xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Profile Header */}
        <motion.div variants={item}>
          <Card className="mb-8 border-border/50 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center ring-4 ring-primary/20">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Profile" className="w-28 h-28 rounded-full object-cover" />
                    ) : (
                      <User className="w-14 h-14 text-primary-foreground" />
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full w-9 h-9 p-0"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-3 mb-1 justify-center md:justify-start">
                    <h1 className="text-3xl font-bold text-foreground">{displayName}</h1>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-3">{displayEmail}</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="secondary">
                      <GraduationCap className="w-3 h-3 mr-1" />
                      {profile?.grade || 'Not Set'}
                    </Badge>
                    <Badge variant="secondary">{roleLabel}</Badge>
                    {stats.current_streak >= 3 && (
                      <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-500/30">
                        <Flame className="w-3 h-3 mr-1" /> Active Learner
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Mini stat grid */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  {statCards.map((s) => (
                    <div key={s.label} className="p-3 rounded-xl bg-muted/60">
                      <s.icon className={`w-4 h-4 mx-auto mb-1 ${s.color}`} />
                      <div className="text-lg font-bold text-foreground">{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* XP Bar */}
              <div className="mt-6 max-w-md mx-auto md:mx-0">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Level {stats.level}</span>
                  <span>{xpToNextLevel} XP to next level</span>
                </div>
                <Progress value={xpProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Activity Summary */}
            <motion.div variants={item}>
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                    Activity Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Lessons Done', value: stats.total_lessons_completed, color: 'text-primary' },
                      { label: 'Quizzes Passed', value: stats.total_quizzes_passed, color: 'text-emerald-500' },
                      { label: 'Focus Hours', value: Math.round(stats.total_focus_minutes / 60), color: 'text-violet-500' },
                      { label: 'Best Streak', value: `${stats.longest_streak}d`, color: 'text-orange-500' },
                    ].map((s) => (
                      <div key={s.label} className="text-center p-4 rounded-xl bg-muted/50">
                        <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                        <div className="text-sm text-muted-foreground">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Insights */}
            <motion.div variants={item}>
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Brain className="mr-2 h-5 w-5 text-violet-500" />
                    AI Learning Insights
                  </CardTitle>
                  <CardDescription>Personalized insights based on your patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: "Learning Style", desc: "You're a visual learner — 78% preference for visual content", icon: Brain, color: 'text-primary' },
                    { title: "Peak Performance", desc: "Most productive between 2–4 PM based on your activity", icon: Clock, color: 'text-emerald-500' },
                    { title: "Skill Growth", desc: "Strong progress in programming. Consider advanced topics.", icon: TrendingUp, color: 'text-violet-500' },
                  ].map((insight, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                      <insight.icon className={`w-5 h-5 mt-0.5 ${insight.color}`} />
                      <div>
                        <h5 className="font-semibold text-foreground">{insight.title}</h5>
                        <p className="text-sm text-muted-foreground">{insight.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Details */}
            <motion.div variants={item}>
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Globe className="mr-2 h-5 w-5 text-primary" />
                    Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {[
                    { label: 'School', value: profile?.school },
                    { label: 'Province', value: profile?.province },
                    { label: 'Phone', value: profile?.phone },
                  ].map((d) => (
                    <div key={d.label} className="flex justify-between">
                      <span className="text-muted-foreground">{d.label}</span>
                      <span className="font-medium text-foreground">{d.value || '—'}</span>
                    </div>
                  ))}
                  {profile?.bio && (
                    <div className="pt-2 border-t border-border">
                      <span className="text-muted-foreground text-xs">Bio</span>
                      <p className="text-foreground mt-1">{profile.bio}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={item}>
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickActions.map((a) => (
                    <Button
                      key={a.path}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate(a.path)}
                    >
                      <a.icon className="w-4 h-4 mr-2" />
                      {a.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Goals */}
            <motion.div variants={item}>
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Target className="mr-2 h-5 w-5 text-emerald-500" />
                    Learning Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-xl bg-muted/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">Complete JavaScript Course</span>
                      <span className="text-xs text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">Learn Data Science</span>
                      <span className="text-xs text-muted-foreground">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/study-goals')}>
                    <Target className="w-4 h-4 mr-2" />
                    Set New Goal
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
