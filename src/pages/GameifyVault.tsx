
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Zap, Crown, Gift, Target, Flame, Award } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

interface GameStats {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalCoins: number;
  studyStreak: number;
  totalAchievements: number;
  rank: string;
}

const GameifyVault = () => {
  const [gameStats, setGameStats] = useState<GameStats>({
    level: 15,
    currentXP: 2450,
    xpToNextLevel: 3000,
    totalCoins: 8750,
    studyStreak: 23,
    totalAchievements: 12,
    rank: "Scholar Elite"
  });

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize achievements
    const achievementList: Achievement[] = [
      {
        id: '1',
        title: 'First Steps',
        description: 'Complete your first lesson',
        icon: <Star className="w-6 h-6" />,
        unlocked: true,
        rarity: 'common',
        points: 100
      },
      {
        id: '2',
        title: 'Study Streak Master',
        description: 'Study for 7 days in a row',
        icon: <Flame className="w-6 h-6" />,
        unlocked: true,
        rarity: 'rare',
        points: 500
      },
      {
        id: '3',
        title: 'Quiz Champion',
        description: 'Score 100% on 5 quizzes',
        icon: <Trophy className="w-6 h-6" />,
        unlocked: true,
        rarity: 'epic',
        points: 1000
      },
      {
        id: '4',
        title: 'Knowledge Seeker',
        description: 'Complete 25 courses',
        icon: <Crown className="w-6 h-6" />,
        unlocked: false,
        rarity: 'legendary',
        points: 2500
      },
      {
        id: '5',
        title: 'AI Collaborator',
        description: 'Use AI tutor 50 times',
        icon: <Zap className="w-6 h-6" />,
        unlocked: true,
        rarity: 'rare',
        points: 750
      },
      {
        id: '6',
        title: 'Zambian Pride',
        description: 'Complete Zambian History course',
        icon: <Award className="w-6 h-6" />,
        unlocked: true,
        rarity: 'epic',
        points: 1500
      }
    ];
    
    setAchievements(achievementList);

    // Create sparkle animation
    const newSparkles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setSparkles(newSparkles);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const claimReward = () => {
    toast({
      title: "Daily Reward Claimed! 🎁",
      description: "You earned 250 coins and 50 XP!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.id * 0.1}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 animate-scale-in">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Gameify Vault
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Your achievements, rewards, and gaming progress in one amazing place!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Crown className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <div className="text-3xl font-bold text-white">{gameStats.level}</div>
              <div className="text-yellow-200">Level</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Gift className="w-12 h-12 mx-auto mb-3 text-blue-400" />
              <div className="text-3xl font-bold text-white">{gameStats.totalCoins.toLocaleString()}</div>
              <div className="text-blue-200">Coins</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border-red-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Flame className="w-12 h-12 mx-auto mb-3 text-red-400" />
              <div className="text-3xl font-bold text-white">{gameStats.studyStreak}</div>
              <div className="text-red-200">Day Streak</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 mx-auto mb-3 text-green-400" />
              <div className="text-3xl font-bold text-white">{gameStats.totalAchievements}</div>
              <div className="text-green-200">Achievements</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* XP Progress */}
          <Card className="lg:col-span-2 bg-black/20 backdrop-blur-sm border-purple-500/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Target className="w-6 h-6 text-purple-400" />
                Experience Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-white">
                  <span>Level {gameStats.level}</span>
                  <span>{gameStats.currentXP} / {gameStats.xpToNextLevel} XP</span>
                </div>
                <Progress 
                  value={(gameStats.currentXP / gameStats.xpToNextLevel) * 100} 
                  className="h-4 bg-gray-700"
                />
                <div className="text-center">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {gameStats.rank}
                  </Badge>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={claimReward}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 text-lg"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Claim Daily Reward
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-black/20 backdrop-blur-sm border-purple-500/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Today's Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-purple-200">
                <span>Lessons Completed</span>
                <span className="text-green-400 font-bold">3/5</span>
              </div>
              <div className="flex justify-between text-purple-200">
                <span>Quiz Score Average</span>
                <span className="text-blue-400 font-bold">87%</span>
              </div>
              <div className="flex justify-between text-purple-200">
                <span>Study Time</span>
                <span className="text-yellow-400 font-bold">2h 15m</span>
              </div>
              <div className="flex justify-between text-purple-200">
                <span>AI Interactions</span>
                <span className="text-pink-400 font-bold">8</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Grid */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Your Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id}
                className={`relative overflow-hidden bg-black/20 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  achievement.unlocked 
                    ? `border-transparent bg-gradient-to-br ${getRarityColor(achievement.rarity)}/20` 
                    : 'border-gray-600 opacity-60'
                }`}
              >
                {achievement.unlocked && (
                  <div className="absolute top-2 right-2">
                    <Badge className={`bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                      {achievement.rarity.toUpperCase()}
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    achievement.unlocked 
                      ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}` 
                      : 'bg-gray-600'
                  }`}>
                    {achievement.icon}
                  </div>
                  
                  <h3 className={`font-bold text-lg mb-2 ${
                    achievement.unlocked ? 'text-white' : 'text-gray-400'
                  }`}>
                    {achievement.title}
                  </h3>
                  
                  <p className={`text-sm mb-3 ${
                    achievement.unlocked ? 'text-purple-200' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                  
                  <div className={`font-semibold ${
                    achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'
                  }`}>
                    +{achievement.points} XP
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameifyVault;
