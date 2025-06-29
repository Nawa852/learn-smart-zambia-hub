
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/components/Auth/AuthProvider';
import { BookOpen, Brain, Award, Target, TrendingUp, Users, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedDashboard = () => {
  const { user } = useAuth();

  const quickStats = [
    { title: "Study Sessions", value: "24", icon: Clock, color: "text-blue-600" },
    { title: "Courses Completed", value: "8", icon: BookOpen, color: "text-green-600" },
    { title: "Achievements", value: "12", icon: Award, color: "text-yellow-600" },
    { title: "Study Streak", value: "15 days", icon: TrendingUp, color: "text-purple-600" },
  ];

  const recentActivities = [
    { title: "Completed Mathematics Quiz", time: "2 hours ago", score: 85 },
    { title: "AI Tutor Session - Physics", time: "5 hours ago", score: null },
    { title: "Flashcard Review - Chemistry", time: "1 day ago", score: 92 },
    { title: "Group Study Session", time: "2 days ago", score: null }
  ];

  const aiFeatures = [
    { title: "AI Tutor", description: "Get personalized help", icon: Brain, link: "/multi-ai-tutor" },
    { title: "Smart Recommendations", description: "AI-powered learning paths", icon: Star, link: "/smart-recommendations" },
    { title: "AI Flashcards", description: "Generate smart flashcards", icon: BookOpen, link: "/ai-flashcards" },
    { title: "Study Helper", description: "AI-powered study assistant", icon: Target, link: "/ai-study-helper" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.full_name || user?.email || 'Student'}! 👋
          </h1>
          <p className="text-gray-600">Ready to continue your learning journey?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Learning Progress */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Your current learning statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mathematics</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Physics</span>
                  <span>72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Chemistry</span>
                  <span>91%</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <div className="text-sm font-medium">{activity.title}</div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      {activity.score && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {activity.score}%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Features Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI-Powered Learning Tools
            </CardTitle>
            <CardDescription>Enhance your learning with artificial intelligence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {aiFeatures.map((feature, index) => (
                <Link key={index} to={feature.link}>
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow hover:border-purple-300 cursor-pointer">
                    <feature.icon className="h-8 w-8 text-purple-600 mb-2" />
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump into your most used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/courses">
                <Button variant="outline" className="w-full h-20 flex-col gap-2">
                  <BookOpen className="h-6 w-6" />
                  Browse Courses
                </Button>
              </Link>
              <Link to="/ai-flashcards">
                <Button variant="outline" className="w-full h-20 flex-col gap-2">
                  <Brain className="h-6 w-6" />
                  Create Flashcards
                </Button>
              </Link>
              <Link to="/study-groups">
                <Button variant="outline" className="w-full h-20 flex-col gap-2">
                  <Users className="h-6 w-6" />
                  Join Study Group
                </Button>
              </Link>
              <Link to="/learning-analytics">
                <Button variant="outline" className="w-full h-20 flex-col gap-2">
                  <TrendingUp className="h-6 w-6" />
                  View Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
