
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, Trophy, Target, Clock, BookOpen, Star, TrendingUp, 
  Calendar, Award, Users, MessageSquare, Zap, Activity 
} from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-orange-600 to-emerald-600 rounded-xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
          <p className="text-orange-100">Continue your learning journey. You're doing great!</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-zambia-copper" />
                <div>
                  <div className="text-2xl font-bold">{learningStats.totalHours}h</div>
                  <div className="text-sm text-gray-600">Learning Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-8 w-8 text-zambia-emerald" />
                <div>
                  <div className="text-2xl font-bold">{learningStats.weeklyStreak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-8 w-8 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold">{learningStats.avgScore}%</div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">#{learningStats.rank}</div>
                  <div className="text-sm text-gray-600">Class Rank</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Learning Goals */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Personal Learning Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningGoals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{goal.title}</span>
                    <span className="text-sm text-gray-500">{goal.target}</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="text-sm text-gray-600">{goal.progress}% complete</div>
                </div>
              ))}
              <Button className="w-full mt-4 bg-zambia-copper hover:bg-orange-600">
                Set New Goal
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`p-3 rounded-lg border text-center ${
                      achievement.earned ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'
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
