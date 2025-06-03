
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, Star, Target, Zap, Users, BookOpen, Calendar, 
  Award, Medal, Crown, Sparkles, TrendingUp, Clock, Brain
} from "lucide-react";

const AchievementSystem = () => {
  const [userLevel, setUserLevel] = useState(7);
  const [userXP, setUserXP] = useState(2350);
  const [nextLevelXP, setNextLevelXP] = useState(3000);
  
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first lesson",
      icon: BookOpen,
      category: "Learning",
      points: 50,
      earned: true,
      earnedDate: "2024-05-15",
      rarity: "common"
    },
    {
      id: 2,
      title: "Speed Demon",
      description: "Complete 5 lessons in one day",
      icon: Zap,
      category: "Performance",
      points: 150,
      earned: true,
      earnedDate: "2024-05-20",
      rarity: "rare"
    },
    {
      id: 3,
      title: "Perfect Score",
      description: "Get 100% on 10 quizzes",
      icon: Star,
      category: "Excellence",
      points: 300,
      earned: false,
      progress: 7,
      total: 10,
      rarity: "epic"
    },
    {
      id: 4,
      title: "Helping Hand",
      description: "Help 20 fellow students",
      icon: Users,
      category: "Community",
      points: 200,
      earned: false,
      progress: 12,
      total: 20,
      rarity: "rare"
    },
    {
      id: 5,
      title: "Night Owl",
      description: "Study after 10 PM for 7 days",
      icon: Clock,
      category: "Dedication",
      points: 100,
      earned: true,
      earnedDate: "2024-05-25",
      rarity: "uncommon"
    },
    {
      id: 6,
      title: "Brain Master",
      description: "Master 5 different subjects",
      icon: Brain,
      category: "Knowledge",
      points: 500,
      earned: false,
      progress: 3,
      total: 5,
      rarity: "legendary"
    }
  ]);

  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: "Mwansa Mukuka", points: 4850, avatar: "MM" },
    { rank: 2, name: "Sarah Banda", points: 4200, avatar: "SB" },
    { rank: 3, name: "John Phiri", points: 3890, avatar: "JP" },
    { rank: 4, name: "Grace Tembo", points: 3650, avatar: "GT" },
    { rank: 5, name: "You", points: userXP, avatar: "YU", isCurrentUser: true }
  ]);

  const [weeklyProgress, setWeeklyProgress] = useState([
    { day: "Mon", xp: 150, completed: true },
    { day: "Tue", xp: 200, completed: true },
    { day: "Wed", xp: 120, completed: true },
    { day: "Thu", xp: 180, completed: true },
    { day: "Fri", xp: 90, completed: true },
    { day: "Sat", xp: 0, completed: false },
    { day: "Sun", xp: 0, completed: false }
  ]);

  const getRarityColor = (rarity: string) => {
    const colors = {
      common: "bg-gray-100 text-gray-800 border-gray-300",
      uncommon: "bg-green-100 text-green-800 border-green-300",
      rare: "bg-blue-100 text-blue-800 border-blue-300",
      epic: "bg-purple-100 text-purple-800 border-purple-300",
      legendary: "bg-yellow-100 text-yellow-800 border-yellow-300"
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  const getRarityIcon = (rarity: string) => {
    const icons = {
      common: Medal,
      uncommon: Award,
      rare: Trophy,
      epic: Crown,
      legendary: Sparkles
    };
    return icons[rarity as keyof typeof icons] || Medal;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center">
            <Trophy className="mr-3 h-10 w-10 text-zambia-copper" />
            Achievement Center
          </h1>
          <p className="text-xl text-gray-600">Track your progress and earn rewards for your learning journey</p>
        </div>

        {/* User Progress */}
        <Card className="bg-gradient-to-r from-orange-500 to-emerald-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Level {userLevel}</h2>
                <p className="text-orange-100">Learning Champion</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{userXP.toLocaleString()} XP</div>
                <div className="text-orange-100">{nextLevelXP - userXP} XP to next level</div>
              </div>
            </div>
            <Progress 
              value={(userXP / nextLevelXP) * 100} 
              className="h-3 bg-white/20" 
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Achievements Grid */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Your Achievements
                </CardTitle>
                <CardDescription>
                  {achievements.filter(a => a.earned).length} of {achievements.length} achievements unlocked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => {
                    const RarityIcon = getRarityIcon(achievement.rarity);
                    return (
                      <div 
                        key={achievement.id}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          achievement.earned 
                            ? 'bg-white shadow-md hover:shadow-lg' 
                            : 'bg-gray-50 border-dashed opacity-75'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <achievement.icon 
                            className={`h-8 w-8 ${
                              achievement.earned ? 'text-zambia-copper' : 'text-gray-400'
                            }`} 
                          />
                          <div className="flex items-center space-x-2">
                            <RarityIcon className="h-4 w-4" />
                            <Badge 
                              variant="outline" 
                              className={getRarityColor(achievement.rarity)}
                            >
                              {achievement.rarity}
                            </Badge>
                          </div>
                        </div>
                        
                        <h3 className="font-semibold mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                        
                        {achievement.earned ? (
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              +{achievement.points} XP
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Earned {achievement.earnedDate}
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {achievement.progress !== undefined && (
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Progress</span>
                                  <span>{achievement.progress}/{achievement.total}</span>
                                </div>
                                <Progress 
                                  value={(achievement.progress / achievement.total) * 100} 
                                  className="h-2"
                                />
                              </div>
                            )}
                            <div className="text-sm text-gray-500">
                              Reward: {achievement.points} XP
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Weekly Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div 
                      key={user.rank}
                      className={`flex items-center space-x-3 p-2 rounded-lg ${
                        user.isCurrentUser ? 'bg-zambia-copper/10 border border-zambia-copper/20' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        user.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                        user.rank === 2 ? 'bg-gray-300 text-gray-700' :
                        user.rank === 3 ? 'bg-orange-300 text-orange-900' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {user.rank}
                      </div>
                      <div className="w-8 h-8 bg-zambia-emerald rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.points.toLocaleString()} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  This Week's Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {weeklyProgress.map((day) => (
                    <div key={day.day} className="text-center">
                      <div className="text-xs text-gray-600 mb-1">{day.day}</div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        day.completed 
                          ? 'bg-zambia-emerald text-white' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {day.completed ? day.xp : '0'}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm font-medium">Weekly Total</div>
                  <div className="text-2xl font-bold text-zambia-copper">
                    {weeklyProgress.reduce((sum, day) => sum + day.xp, 0)} XP
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementSystem;
