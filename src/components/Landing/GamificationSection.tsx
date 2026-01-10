import { motion } from 'framer-motion';
import { 
  Trophy, Star, Flame, Target, Crown, Medal, Gem, Zap,
  TrendingUp, Gift, Coins, Award, ChevronRight, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const achievements = [
  { icon: Flame, name: '30-Day Streak', desc: 'Learn every day for a month', color: 'from-orange-500 to-red-500', earned: true },
  { icon: Star, name: 'Math Master', desc: 'Complete 100 math problems', color: 'from-yellow-400 to-amber-500', earned: true },
  { icon: Trophy, name: 'Top 10%', desc: 'Score in top 10% nationally', color: 'from-purple-500 to-violet-600', earned: false },
  { icon: Gem, name: 'Perfect Week', desc: '7 days without errors', color: 'from-cyan-500 to-blue-500', earned: true },
  { icon: Crown, name: 'Champion', desc: 'Win a weekly challenge', color: 'from-amber-400 to-yellow-500', earned: false },
  { icon: Medal, name: 'Helper Hero', desc: 'Help 50 classmates', color: 'from-emerald-500 to-green-600', earned: true },
];

const leaderboard = [
  { rank: 1, name: 'Mwila C.', xp: 15420, streak: 45, avatar: '🧑🏾' },
  { rank: 2, name: 'Grace M.', xp: 14890, streak: 38, avatar: '👩🏾' },
  { rank: 3, name: 'John K.', xp: 14250, streak: 42, avatar: '👨🏾' },
  { rank: 4, name: 'Sarah T.', xp: 13980, streak: 35, avatar: '👩🏽' },
  { rank: 5, name: 'David N.', xp: 13450, streak: 30, avatar: '🧑🏿' },
];

const rewards = [
  { icon: Gift, name: 'Premium Week', points: 5000, desc: 'Unlock Pro features for 7 days' },
  { icon: Coins, name: 'Data Bundle', points: 10000, desc: '1GB MTN/Airtel data' },
  { icon: Award, name: 'Certificate', points: 25000, desc: 'Verified skill certificate' },
];

const GamificationSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            <Trophy className="w-3 h-3 mr-1" />
            Gamification
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Learn. Compete.</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Earn Real Rewards
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Inspired by Duolingo — streaks, XP, leaderboards, and achievements 
            make learning addictive. Earn points for real-world rewards!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Player Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Profile Card */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center text-3xl">
                  🧑🏾‍🎓
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Your Progress</h3>
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-muted-foreground">Gold League</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                  <p className="text-xl font-bold text-foreground">23</p>
                  <p className="text-[10px] text-muted-foreground">Day Streak</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <Zap className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                  <p className="text-xl font-bold text-foreground">8,450</p>
                  <p className="text-[10px] text-muted-foreground">Total XP</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <Target className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                  <p className="text-xl font-bold text-foreground">86%</p>
                  <p className="text-[10px] text-muted-foreground">Accuracy</p>
                </div>
              </div>

              {/* Daily goal */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Daily Goal</span>
                  <span className="text-sm text-primary font-bold">75/100 XP</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">25 XP to go! Complete 1 more lesson</p>
              </div>
            </div>

            {/* Rewards section */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-primary" />
                Redeem Points
              </h3>
              <div className="space-y-3">
                {rewards.map((reward, idx) => (
                  <motion.div
                    key={reward.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <reward.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{reward.name}</p>
                      <p className="text-xs text-muted-foreground">{reward.desc}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <Coins className="w-3 h-3 mr-1 text-yellow-500" />
                      {reward.points.toLocaleString()}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Center - Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-2xl border border-border p-6 shadow-lg h-full">
              <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
                <Medal className="w-5 h-5 text-yellow-500" />
                Achievements
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, idx) => (
                  <motion.div
                    key={achievement.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`relative p-4 rounded-xl border text-center transition-all ${
                      achievement.earned 
                        ? 'bg-gradient-to-br from-muted to-muted/50 border-primary/20' 
                        : 'bg-muted/30 border-border opacity-50'
                    }`}
                  >
                    {achievement.earned && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    )}
                    <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${achievement.color} flex items-center justify-center mb-2 ${!achievement.earned && 'grayscale'}`}>
                      <achievement.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-foreground">{achievement.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{achievement.desc}</p>
                  </motion.div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-6">
                View All Achievements
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>

          {/* Right - Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Weekly Leaderboard
                </h3>
                <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                  <Crown className="w-3 h-3 mr-1" />
                  Gold League
                </Badge>
              </div>

              <div className="space-y-3">
                {leaderboard.map((player, idx) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      player.rank <= 3 ? 'bg-gradient-to-r from-yellow-500/10 to-transparent' : 'bg-muted/50 hover:bg-muted'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      player.rank === 1 ? 'bg-yellow-500 text-white' :
                      player.rank === 2 ? 'bg-gray-400 text-white' :
                      player.rank === 3 ? 'bg-amber-700 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {player.rank}
                    </div>
                    <div className="text-2xl">{player.avatar}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-sm">{player.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Flame className="w-3 h-3 text-orange-500" />
                        <span>{player.streak} days</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{player.xp.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">XP</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Your position */}
              <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-sm text-primary">
                    12
                  </div>
                  <div className="text-2xl">🧑🏾‍🎓</div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">You</p>
                    <p className="text-xs text-primary">3 spots to top 10!</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">8,450</p>
                    <p className="text-[10px] text-muted-foreground">XP</p>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90">
                <Users className="w-4 h-4 mr-2" />
                Invite Friends for Bonus XP
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GamificationSection;
