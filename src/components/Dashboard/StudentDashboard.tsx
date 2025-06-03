import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, Trophy, Target, Clock, BookOpen, Star, TrendingUp, 
  Calendar, Award, Users, MessageSquare, Zap, Activity,
  Sparkles, Play, BarChart3, Eye
} from "lucide-react";
import AnimatedCounter from '@/components/UI/AnimatedCounter';
import InteractiveScene from '@/components/3D/InteractiveScene';

const StudentDashboard = () => {
  const [learningGoals, setLearningGoals] = useState([
    { id: 1, title: "Complete JavaScript Fundamentals", progress: 75, target: "End of week" },
    { id: 2, title: "Math Problem Solving", progress: 45, target: "Next month" },
    { id: 3, title: "English Writing Skills", progress: 90, target: "2 weeks" }
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, title: "Fast Learner", icon: Zap, earned: true, description: "Complete 5 lessons in one day" },
    { id: 2, title: "Quiz Master", icon: Trophy, earned: true, description: "Score 100% on 3 quizzes" },
    { id: 3, title: "Consistent", icon: Calendar, earned: false, description: "Study for 7 days straight" },
    { id: 4, title: "Helper", icon: Users, earned: true, description: "Help 5 classmates" }
  ]);

  const [recommendedCourses, setRecommendedCourses] = useState([
    { id: 1, title: "Advanced JavaScript", difficulty: "Intermediate", match: 95 },
    { id: 2, title: "Python for Beginners", difficulty: "Beginner", match: 88 },
    { id: 3, title: "Data Structures", difficulty: "Advanced", match: 82 }
  ]);

  const [learningStats, setLearningStats] = useState({
    totalHours: 47,
    weeklyStreak: 5,
    coursesCompleted: 3,
    avgScore: 87,
    rank: 15,
    totalStudents: 1240
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Enhanced Welcome Header */}
        <div className="relative bg-gradient-to-r from-orange-600 via-red-500 to-emerald-600 rounded-2xl p-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-4 right-4 animate-float">
            <Sparkles className="h-8 w-8 text-yellow-300" />
          </div>
          <div className="absolute bottom-4 left-4 animate-pulse">
            <div className="w-16 h-16 bg-white/10 rounded-full"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2 animate-fade-in">Welcome back, Sarah! ✨</h1>
            <p className="text-orange-100 text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Continue your learning journey. You're doing great! Ready for some 3D exploration?
            </p>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-orange-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-zambia-copper to-orange-500 rounded-full">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800">
                    <AnimatedCounter end={learningStats.totalHours} suffix="h" />
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Learning Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-emerald-50 border-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-zambia-emerald to-green-500 rounded-full">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800">
                    <AnimatedCounter end={learningStats.weeklyStreak} />
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800">
                    <AnimatedCounter end={learningStats.avgScore} suffix="%" />
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Avg Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800">
                    #<AnimatedCounter end={learningStats.rank} />
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Class Rank</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3D Interactive Learning Section */}
        <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardTitle className="flex items-center text-xl">
              <Eye className="mr-3 h-6 w-6" />
              3D Interactive Learning Lab
              <Badge className="ml-3 bg-white/20 text-white border-white/30">
                New Feature!
              </Badge>
            </CardTitle>
            <CardDescription className="text-purple-100">
              Explore concepts through immersive 3D models and animations
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <InteractiveScene />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Learning Goals */}
          <Card className="lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5 text-indigo-600" />
                Personal Learning Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {learningGoals.map((goal) => (
                <div key={goal.id} className="space-y-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{goal.title}</span>
                    <span className="text-sm text-gray-500">{goal.target}</span>
                  </div>
                  <Progress value={goal.progress} className="h-3" />
                  <div className="text-sm text-gray-600 font-medium">{goal.progress}% complete</div>
                </div>
              ))}
              <Button className="w-full mt-4 bg-gradient-to-r from-zambia-copper to-orange-600 hover:from-orange-700 hover:to-red-600 transform hover:scale-105 transition-all duration-300">
                <Target className="mr-2 h-4 w-4" />
                Set New Goal
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-yellow-600" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                      achievement.earned 
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-lg' 
                        : 'bg-gray-50 border-dashed border-gray-300 opacity-75'
                    }`}
                  >
                    <achievement.icon 
                      className={`h-8 w-8 mx-auto mb-2 ${
                        achievement.earned ? 'text-yellow-500' : 'text-gray-400'
                      }`} 
                    />
                    <div className="text-sm font-medium">{achievement.title}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              AI-Powered Recommendations
            </CardTitle>
            <CardDescription>
              Based on your learning pattern and progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{course.title}</h3>
                    <Badge variant="secondary">{course.match}% match</Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Difficulty: {course.difficulty}
                  </div>
                  <Button size="sm" className="w-full bg-zambia-emerald hover:bg-green-600">
                    Start Learning
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Learning Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Weekly Progress</h4>
                <div className="space-y-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="flex items-center space-x-2">
                      <span className="w-8 text-sm">{day}</span>
                      <Progress value={Math.random() * 100} className="flex-1 h-2" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Skill Proficiency</h4>
                <div className="space-y-2">
                  {['JavaScript', 'Mathematics', 'English', 'Science'].map((skill) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-sm">{skill}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-4 w-4 ${
                              star <= Math.floor(Math.random() * 5) + 1 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
