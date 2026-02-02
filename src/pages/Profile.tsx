import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, Settings, Award, BookOpen, TrendingUp, Brain,
  Camera, Edit, Globe, Clock, Target
} from "lucide-react";
import { useAuth } from '@/components/Auth/AuthProvider';
import { useProfile } from '@/hooks/useProfile';

const Profile = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for demonstration
  const studySessions = [
    { id: '1', subject: 'Mathematics', duration: 45, created_at: new Date().toISOString() },
    { id: '2', subject: 'Physics', duration: 30, created_at: new Date().toISOString() },
    { id: '3', subject: 'Chemistry', duration: 60, created_at: new Date().toISOString() },
  ];

  const achievements = [
    { id: '1', title: 'First Lesson', description: 'Completed your first lesson' },
    { id: '2', title: 'Study Streak', description: '7-day study streak' },
    { id: '3', title: 'Quiz Master', description: 'Scored 100% on a quiz' },
  ];

  const learningStats = {
    totalCourses: studySessions.length,
    completedCourses: studySessions.filter(s => s.duration > 30).length,
    totalHours: studySessions.reduce((sum, session) => sum + (session.duration || 0), 0),
    currentStreak: 12,
    skillsLearned: achievements.length
  };

  const aiInsights = [
    {
      title: "Learning Style Analysis",
      description: "You're a visual learner - 78% preference for visual content",
      icon: Brain,
      color: "blue"
    },
    {
      title: "Optimal Learning Time",
      description: "Most productive between 2-4 PM based on your activity",
      icon: Clock,
      color: "green"
    },
    {
      title: "Skill Development",
      description: "Strong progress in programming, consider advanced topics",
      icon: TrendingUp,
      color: "purple"
    }
  ];

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';
  const displayEmail = profile?.email || user?.email || '';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  {profile?.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-white" />
                  )}
                </div>
                <Button 
                  size="sm" 
                  className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{displayName}</h1>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-gray-600 mb-4">{displayEmail}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary">
                    <Globe className="w-3 h-3 mr-1" />
                    {profile?.grade_level || 'Not Set'}
                  </Badge>
                  <Badge variant="secondary">{profile?.user_type || 'Student'}</Badge>
                  <Badge className="bg-green-100 text-green-800">Active Learner</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{learningStats.currentStreak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{learningStats.skillsLearned}</div>
                  <div className="text-sm text-gray-600">Skills</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Learning Progress */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Learning Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{learningStats.totalCourses}</div>
                    <div className="text-sm text-gray-600">Study Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{learningStats.completedCourses}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{Math.round(learningStats.totalHours / 60)}</div>
                    <div className="text-sm text-gray-600">Hours Learned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">87%</div>
                    <div className="text-sm text-gray-600">Avg Score</div>
                  </div>
                </div>
                
                {/* Recent Sessions */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Recent Study Sessions</h4>
                  {studySessions.map((session) => (
                    <div key={session.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium">{session.subject}</h5>
                        <p className="text-sm text-gray-600">{session.duration} minutes</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(session.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-purple-500" />
                  AI Learning Insights
                </CardTitle>
                <CardDescription>
                  Personalized insights based on your learning patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <insight.icon className={`w-6 h-6 text-${insight.color}-500 mt-1`} />
                      <div>
                        <h5 className="font-semibold">{insight.title}</h5>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-center p-3 bg-yellow-50 rounded-lg">
                      <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <div className="text-xs font-medium">{achievement.title}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-green-500" />
                  Learning Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Complete JavaScript Course</span>
                      <span className="text-xs text-gray-600">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Learn Data Science</span>
                      <span className="text-xs text-gray-600">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <Button variant="outline" className="w-full">
                    <Target className="w-4 h-4 mr-2" />
                    Set New Goal
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Courses
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  View Certificates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
