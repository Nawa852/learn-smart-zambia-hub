import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Zap, Award, TrendingUp, Target, Coins } from 'lucide-react';

interface GamificationPanelProps {
  userType: string;
}

export const GamificationPanel = ({ userType }: GamificationPanelProps) => {
  const userStats = {
    level: 12,
    xp: 2850,
    xpToNext: 3500,
    zedCoins: 1250,
    rank: "Knowledge Explorer",
    badges: [
      { name: "Math Master", icon: Trophy, color: "text-yellow-600" },
      { name: "AI Pioneer", icon: Star, color: "text-blue-600" },
      { name: "Community Helper", icon: Award, color: "text-purple-600" },
      { name: "100 Day Streak", icon: Zap, color: "text-orange-600" },
    ],
    recentAchievements: [
      { title: "Completed 50 Lessons", reward: "+100 XP", time: "2 hours ago" },
      { title: "Perfect Quiz Score", reward: "+50 ZedCoins", time: "Yesterday" },
      { title: "Helped 10 Peers", reward: "Community Helper Badge", time: "2 days ago" },
    ],
    leaderboardPosition: 15,
    skillTree: [
      { skill: "Mathematics", level: 8, progress: 75 },
      { skill: "AI Mastery", level: 6, progress: 60 },
      { skill: "Leadership", level: 5, progress: 45 },
      { skill: "Innovation", level: 7, progress: 70 },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Level & XP Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">Level {userStats.level}</h3>
              <p className="text-sm text-muted-foreground">{userStats.rank}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-2xl font-bold text-yellow-600">
                <Coins className="w-6 h-6" />
                {userStats.zedCoins}
              </div>
              <p className="text-xs text-muted-foreground">ZedCoins</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>XP Progress</span>
              <span className="font-semibold">{userStats.xp} / {userStats.xpToNext}</span>
            </div>
            <Progress value={(userStats.xp / userStats.xpToNext) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Earned Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userStats.badges.map((badge, index) => (
              <div key={index} className="text-center p-4 border rounded-lg hover:shadow-md transition-all group">
                <div className={`w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <badge.icon className={`w-6 h-6 ${badge.color}`} />
                </div>
                <p className="text-xs font-semibold">{badge.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill Tree */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Skill Tree
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {userStats.skillTree.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{skill.skill}</span>
                  <Badge variant="outline" className="text-xs">Lvl {skill.level}</Badge>
                </div>
                <span className="text-sm font-semibold">{skill.progress}%</span>
              </div>
              <Progress value={skill.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-blue-600" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {userStats.recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-start justify-between p-3 border rounded-lg hover:shadow-md transition-all">
                <div>
                  <p className="font-semibold text-sm">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground">{achievement.time}</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {achievement.reward}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Position */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
        <CardContent className="p-6 text-center">
          <TrendingUp className="w-12 h-12 mx-auto mb-2 text-blue-600" />
          <h3 className="text-3xl font-bold text-blue-600">#{userStats.leaderboardPosition}</h3>
          <p className="text-sm text-muted-foreground">National Ranking</p>
          <p className="text-xs mt-2">Top 1% of learners in Zambia 🇿🇲</p>
        </CardContent>
      </Card>
    </div>
  );
};
