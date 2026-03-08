import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, Star, Zap, Users, BookOpen, Calendar, 
  Award, Medal, Crown, Sparkles, TrendingUp, Clock, Brain
} from "lucide-react";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

const achievements = [
  { id: 1, title: "First Steps", description: "Complete your first lesson", icon: BookOpen, category: "Learning", points: 50, earned: true, earnedDate: "2024-05-15", rarity: "common" },
  { id: 2, title: "Speed Demon", description: "Complete 5 lessons in one day", icon: Zap, category: "Performance", points: 150, earned: true, earnedDate: "2024-05-20", rarity: "rare" },
  { id: 3, title: "Perfect Score", description: "Get 100% on 10 quizzes", icon: Star, category: "Excellence", points: 300, earned: false, progress: 7, total: 10, rarity: "epic" },
  { id: 4, title: "Helping Hand", description: "Help 20 fellow students", icon: Users, category: "Community", points: 200, earned: false, progress: 12, total: 20, rarity: "rare" },
  { id: 5, title: "Night Owl", description: "Study after 10 PM for 7 days", icon: Clock, category: "Dedication", points: 100, earned: true, earnedDate: "2024-05-25", rarity: "uncommon" },
  { id: 6, title: "Brain Master", description: "Master 5 different subjects", icon: Brain, category: "Knowledge", points: 500, earned: false, progress: 3, total: 5, rarity: "legendary" },
];

const leaderboard = [
  { rank: 1, name: "Mwansa Mukuka", points: 4850, avatar: "MM" },
  { rank: 2, name: "Sarah Banda", points: 4200, avatar: "SB" },
  { rank: 3, name: "John Phiri", points: 3890, avatar: "JP" },
  { rank: 4, name: "Grace Tembo", points: 3650, avatar: "GT" },
  { rank: 5, name: "You", points: 2350, avatar: "YU", isCurrentUser: true },
];

const weeklyActivity = [
  { day: "Mon", xp: 150, active: true },
  { day: "Tue", xp: 200, active: true },
  { day: "Wed", xp: 120, active: true },
  { day: "Thu", xp: 180, active: true },
  { day: "Fri", xp: 90, active: true },
  { day: "Sat", xp: 0, active: false },
  { day: "Sun", xp: 0, active: false },
];

const rarityStyles: Record<string, { badge: string; glow: string }> = {
  common: { badge: 'bg-muted text-muted-foreground', glow: '' },
  uncommon: { badge: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', glow: '' },
  rare: { badge: 'bg-blue-500/10 text-blue-600 border-blue-500/20', glow: 'ring-1 ring-blue-500/20' },
  epic: { badge: 'bg-purple-500/10 text-purple-600 border-purple-500/20', glow: 'ring-1 ring-purple-500/20' },
  legendary: { badge: 'bg-amber-500/10 text-amber-600 border-amber-500/20', glow: 'ring-1 ring-amber-500/30 shadow-lg shadow-amber-500/10' },
};

const AchievementSystem = () => {
  const userXP = 2350;
  const nextLevelXP = 3000;
  const userLevel = 7;
  const earnedCount = achievements.filter(a => a.earned).length;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" /> Achievements
        </h1>
        <p className="text-sm text-muted-foreground">{earnedCount}/{achievements.length} unlocked · Level {userLevel}</p>
      </motion.div>

      {/* XP Bar */}
      <motion.div variants={fadeUp}>
        <Card className="border-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-lg font-bold text-foreground">Level {userLevel}</p>
                <p className="text-xs text-muted-foreground">Learning Champion</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{userXP.toLocaleString()} XP</p>
                <p className="text-xs text-muted-foreground">{nextLevelXP - userXP} to next level</p>
              </div>
            </div>
            <Progress value={(userXP / nextLevelXP) * 100} className="h-2.5" />
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Achievement Grid */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-3">
            {achievements.map((a) => (
              <Card key={a.id} className={`border-border/50 transition-all ${a.earned ? rarityStyles[a.rarity]?.glow : 'opacity-70'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${a.earned ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      <a.icon className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${rarityStyles[a.rarity]?.badge}`}>
                      {a.rarity}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">{a.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{a.description}</p>
                  {a.earned ? (
                    <div className="flex items-center justify-between">
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]">+{a.points} XP</Badge>
                      <span className="text-[10px] text-muted-foreground">{a.earnedDate}</span>
                    </div>
                  ) : a.progress !== undefined && a.total ? (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{a.progress}/{a.total}</span>
                      </div>
                      <Progress value={(a.progress / a.total) * 100} className="h-1.5" />
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div variants={fadeUp} className="space-y-4">
          {/* Leaderboard */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {leaderboard.map(u => (
                <div key={u.rank} className={`flex items-center gap-3 p-2 rounded-lg ${u.isCurrentUser ? 'bg-primary/5 border border-primary/20' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    u.rank === 1 ? 'bg-amber-400 text-amber-900' :
                    u.rank === 2 ? 'bg-muted text-muted-foreground' :
                    u.rank === 3 ? 'bg-orange-400/50 text-orange-800' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {u.rank}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                    {u.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{u.name}</p>
                    <p className="text-[10px] text-muted-foreground">{u.points.toLocaleString()} XP</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1.5">
                {weeklyActivity.map(d => (
                  <div key={d.day} className="text-center">
                    <span className="text-[10px] text-muted-foreground">{d.day}</span>
                    <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-[10px] font-semibold mt-1 ${
                      d.active ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                    }`}>
                      {d.xp}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4 pt-3 border-t border-border/50">
                <p className="text-xs text-muted-foreground">Weekly Total</p>
                <p className="text-xl font-bold text-foreground">{weeklyActivity.reduce((s, d) => s + d.xp, 0)} XP</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AchievementSystem;
