
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, Star, Zap, BookOpen, Target, Award, 
  Coins, Crown, Shield, Gem, Fire
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  xpReward: number;
  coinReward: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface AvatarProps {
  userId: string;
  currentLevel: number;
  currentXP: number;
  totalCoins: number;
  studyStreak: number;
}

const AcademicAvatar: React.FC<AvatarProps> = ({
  userId,
  currentLevel,
  currentXP,
  totalCoins,
  studyStreak
}) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<string>('');
  const [avatarCustomization, setAvatarCustomization] = useState({
    background: 'gradient-blue',
    frame: 'gold',
    badge: 'scholar'
  });

  const baseAchievements: Achievement[] = [
    {
      id: 'first-lesson',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: BookOpen,
      color: 'bg-green-500',
      xpReward: 10,
      coinReward: 5,
      unlocked: currentXP >= 10
    },
    {
      id: 'week-streak',
      title: 'Consistent Learner',
      description: '7-day study streak',
      icon: Fire,
      color: 'bg-orange-500',
      xpReward: 50,
      coinReward: 25,
      unlocked: studyStreak >= 7
    },
    {
      id: 'level-5',
      title: 'Scholar',
      description: 'Reach Level 5',
      icon: Trophy,
      color: 'bg-purple-500',
      xpReward: 100,
      coinReward: 50,
      unlocked: currentLevel >= 5
    },
    {
      id: 'hundred-coins',
      title: 'Coin Collector',
      description: 'Collect 100 EduCoins',
      icon: Coins,
      color: 'bg-yellow-500',
      xpReward: 30,
      coinReward: 20,
      unlocked: totalCoins >= 100
    },
    {
      id: 'ai-master',
      title: 'AI Whisperer',
      description: 'Use all 5 AI tutors',
      icon: Zap,
      color: 'bg-blue-500',
      xpReward: 75,
      coinReward: 40,
      unlocked: false // Would be tracked by actual usage
    },
    {
      id: 'peer-helper',
      title: 'Peer Mentor',
      description: 'Help 10 other students',
      icon: Star,
      color: 'bg-pink-500',
      xpReward: 150,
      coinReward: 75,
      unlocked: false // Would be tracked by social features
    }
  ];

  useEffect(() => {
    setAchievements(baseAchievements);
  }, [currentLevel, currentXP, totalCoins, studyStreak]);

  const getXPToNextLevel = () => {
    return (currentLevel * 100) - (currentXP % 100);
  };

  const getProgressToNextLevel = () => {
    return (currentXP % 100);
  };

  const getAvatarIcon = () => {
    if (currentLevel >= 20) return Crown;
    if (currentLevel >= 15) return Shield;
    if (currentLevel >= 10) return Gem;
    if (currentLevel >= 5) return Trophy;
    return BookOpen;
  };

  const getAvatarColor = () => {
    if (currentLevel >= 20) return 'text-yellow-500';
    if (currentLevel >= 15) return 'text-purple-500';
    if (currentLevel >= 10) return 'text-blue-500';
    if (currentLevel >= 5) return 'text-green-500';
    return 'text-gray-500';
  };

  const getTitle = () => {
    if (currentLevel >= 20) return 'Grand Master';
    if (currentLevel >= 15) return 'Expert Scholar';
    if (currentLevel >= 10) return 'Advanced Learner';
    if (currentLevel >= 5) return 'Dedicated Student';
    return 'Novice Learner';
  };

  const AvatarIcon = getAvatarIcon();
  const unlockedAchievements = achievements.filter(a => a.unlocked);

  return (
    <div className="space-y-6">
      {/* Avatar Display */}
      <Card className="bg-gradient-to-br from-purple-100 to-blue-100">
        <CardHeader className="text-center">
          <div className="mx-auto w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
            <AvatarIcon className={`w-12 h-12 ${getAvatarColor()}`} />
          </div>
          <CardTitle className="text-xl">{getTitle()}</CardTitle>
          <div className="flex justify-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              Level {currentLevel}
            </span>
            <span className="flex items-center gap-1">
              <Coins className="w-4 h-4" />
              {totalCoins} Coins
            </span>
            <span className="flex items-center gap-1">
              <Fire className="w-4 h-4" />
              {studyStreak} Day Streak
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to Level {currentLevel + 1}</span>
                <span>{getProgressToNextLevel()}/100 XP</span>
              </div>
              <Progress value={getProgressToNextLevel()} className="h-3" />
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">{currentXP}</div>
                <div className="text-xs text-gray-600">Total XP</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-600">{totalCoins}</div>
                <div className="text-xs text-gray-600">EduCoins</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">{unlockedAchievements.length}</div>
                <div className="text-xs text-gray-600">Badges</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border ${
                    achievement.unlocked
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${achievement.color} ${
                      achievement.unlocked ? 'text-white' : 'bg-gray-300 text-gray-500'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${
                        achievement.unlocked ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          +{achievement.xpReward} XP
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          +{achievement.coinReward} Coins
                        </Badge>
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <div className="text-green-500">
                        <Trophy className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Study Streak */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fire className="w-5 h-5 text-orange-500" />
            Study Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-2">
              {studyStreak}
            </div>
            <p className="text-gray-600 mb-4">
              {studyStreak === 0 ? "Start your learning journey today!" :
               studyStreak === 1 ? "Great start! Keep it up!" :
               studyStreak < 7 ? `${7 - studyStreak} more days to unlock Consistent Learner badge!` :
               studyStreak < 30 ? `Amazing streak! ${30 - studyStreak} more days to unlock Monthly Champion!` :
               "Incredible dedication! You're a true learning champion!"}
            </p>
            
            {/* Streak visualization */}
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full ${
                    i < (studyStreak % 7) ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            
            {studyStreak === 0 && (
              <Button className="w-full">
                Start Learning Today
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicAvatar;
