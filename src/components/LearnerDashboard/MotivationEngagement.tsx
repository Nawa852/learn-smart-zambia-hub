import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, Star, Flame, Target, Award, Medal, Crown,
  Zap, TrendingUp, Calendar, CheckCircle2, Gift,
  Sparkles, Heart, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const MotivationEngagement = () => {
  const stats = {
    xp: 2450,
    level: 12,
    streak: 7,
    badges: 15,
    rank: 23,
    totalLearners: 1500
  };

  const recentAchievements = [
    { title: 'Week Warrior', icon: Flame, description: '7-day learning streak', earned: true, xp: 100 },
    { title: 'Quiz Master', icon: Target, description: 'Score 90%+ on 5 quizzes', earned: true, xp: 150 },
    { title: 'Early Bird', icon: Star, description: 'Study before 7 AM', earned: false, xp: 50 },
    { title: 'Helping Hand', icon: Heart, description: 'Help 3 classmates', earned: false, xp: 75 },
  ];

  const dailyChallenges = [
    { task: 'Complete 2 math lessons', progress: 1, target: 2, xp: 50 },
    { task: 'Take a practice quiz', progress: 0, target: 1, xp: 30 },
    { task: 'Study for 30 minutes', progress: 15, target: 30, xp: 25 },
  ];

  const milestones = [
    { title: 'Grade 9 Ready', progress: 72, description: 'Complete all Grade 9 modules' },
    { title: 'Science Explorer', progress: 45, description: 'Master all science topics' },
    { title: 'Math Wizard', progress: 68, description: 'Complete advanced math track' },
  ];

  const xpToNextLevel = 3000;
  const currentXpInLevel = stats.xp % 1000;
  const xpProgress = (currentXpInLevel / 1000) * 100;

  return (
    <div className="space-y-4">
      {/* XP & Level Banner */}
      <Card className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-xl">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {stats.level}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Level {stats.level} Scholar</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1 text-sm">
                    <Zap className="w-4 h-4 text-amber-500" />
                    {stats.xp} XP
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Flame className="w-4 h-4 text-orange-500" />
                    {stats.streak} day streak
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">Class Rank</p>
              <p className="text-3xl font-bold text-primary">#{stats.rank}</p>
              <p className="text-xs text-muted-foreground">of {stats.totalLearners}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Level {stats.level}</span>
              <span>Level {stats.level + 1}</span>
            </div>
            <Progress value={xpProgress} className="h-3" />
            <p className="text-xs text-muted-foreground mt-1">
              {1000 - currentXpInLevel} XP to next level
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Daily Challenges */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-500" />
                Daily Challenges
              </span>
              <Badge variant="secondary" className="gap-1">
                <Gift className="w-3 h-3" />
                +105 XP
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dailyChallenges.map((challenge, index) => (
              <div key={index} className="p-3 rounded-lg border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{challenge.task}</span>
                  <Badge variant="outline" className="text-xs">+{challenge.xp} XP</Badge>
                </div>
                <Progress 
                  value={(challenge.progress / challenge.target) * 100} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {challenge.progress}/{challenge.target} completed
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Trophy className="w-5 h-5 text-amber-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {recentAchievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    achievement.earned 
                      ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200' 
                      : 'bg-muted/30 border-dashed border-muted-foreground/30 opacity-60'
                  }`}
                >
                  <achievement.icon 
                    className={`w-8 h-8 mx-auto mb-2 ${
                      achievement.earned ? 'text-amber-500' : 'text-muted-foreground'
                    }`} 
                  />
                  <h4 className="text-sm font-medium">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  {achievement.earned && (
                    <Badge className="mt-2 text-xs bg-amber-100 text-amber-700 border-0">
                      +{achievement.xp} XP
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            <Link to="/achievements">
              <Button variant="outline" className="w-full mt-4 gap-2">
                <Medal className="w-4 h-4" />
                View All Badges ({stats.badges})
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Growth Milestones */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Growth Milestones
            <Badge variant="secondary" className="ml-2 gap-1">
              <Sparkles className="w-3 h-3" />
              Progress over Perfection
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="p-4 rounded-xl border border-border/50">
                <h4 className="font-semibold mb-1">{milestone.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{milestone.description}</p>
                <div className="flex items-center gap-2">
                  <Progress value={milestone.progress} className="flex-1 h-2" />
                  <span className="text-sm font-medium">{milestone.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
