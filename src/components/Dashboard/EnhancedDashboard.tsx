
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/Auth/AuthProvider';
import { BookOpen, Brain, Award, Target, TrendingUp, Users, Clock, Star, Globe, Zap, Heart, MessageSquare, Upload, Calendar, Bell, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedDashboard = () => {
  const { user } = useAuth();

  const quickStats = [
    { title: "Study Sessions", value: "24", icon: Clock, color: "text-blue-600", bg: "bg-blue-50", change: "+5 this week" },
    { title: "Courses Completed", value: "8", icon: BookOpen, color: "text-green-600", bg: "bg-green-50", change: "+2 this month" },
    { title: "Achievements", value: "12", icon: Award, color: "text-yellow-600", bg: "bg-yellow-50", change: "3 new badges" },
    { title: "Study Streak", value: "15 days", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50", change: "Keep it up!" },
  ];

  const recentActivities = [
    { title: "Completed ECZ Mathematics Mock Exam", time: "2 hours ago", score: 85, type: "exam" },
    { title: "AI Tutor Session - Physics Newton's Laws", time: "5 hours ago", score: null, type: "tutor" },
    { title: "Flashcard Review - Chemistry Acids & Bases", time: "1 day ago", score: 92, type: "review" },
    { title: "Group Study Session - Grade 12 Prep", time: "2 days ago", score: null, type: "group" }
  ];

  const allFeatures = [
    { title: "AI Study Assistant", description: "Get personalized help in local languages", icon: Brain, link: "/multi-ai-tutor", gradient: "from-blue-500 to-purple-600" },
    { title: "Smart Recommendations", description: "AI-powered ECZ-aligned learning paths", icon: Star, link: "/smart-recommendations", gradient: "from-green-500 to-blue-500" },
    { title: "AI Flashcards", description: "Generate smart flashcards from notes", icon: BookOpen, link: "/ai-flashcards", gradient: "from-purple-500 to-pink-500" },
    { title: "Study Helper", description: "AI-powered study assistant", icon: Target, link: "/ai-study-helper", gradient: "from-orange-500 to-red-500" },
    { title: "Study Materials", description: "Upload and access study resources", icon: Upload, link: "/study-materials", gradient: "from-teal-500 to-cyan-500" },
    { title: "Community Forum", description: "Connect with peers and study together", icon: Users, link: "/social-feed", gradient: "from-indigo-500 to-purple-500" },
    { title: "Goal Coaching", description: "AI-powered daily goal setting", icon: Calendar, link: "/daily-goal-coach", gradient: "from-pink-500 to-red-500" },
    { title: "Multilingual Translator", description: "Learn in your preferred language", icon: Globe, link: "/multilingual-translator", gradient: "from-cyan-500 to-blue-500" },
    { title: "Visual Mind Maps", description: "Create interactive learning maps", icon: Eye, link: "/visual-mind-map", gradient: "from-yellow-500 to-orange-500" },
    { title: "Study Groups", description: "Join collaborative learning sessions", icon: MessageSquare, link: "/study-groups", gradient: "from-green-500 to-teal-500" },
    { title: "Semantic Search", description: "Find study materials intelligently", icon: Target, link: "/semantic-search", gradient: "from-purple-500 to-indigo-500" },
    { title: "Learning Analytics", description: "Track your progress and performance", icon: TrendingUp, link: "/learning-analytics", gradient: "from-blue-500 to-green-500" }
  ];

  const zambianFeatures = [
    { title: "ECZ Exam Prep", description: "Grade 7, 9 & 12 preparation", icon: Award, link: "/courses", color: "text-green-600" },
    { title: "Multilingual Support", description: "Learn in Bemba, Nyanja, Tonga, Lozi", icon: Globe, link: "/multilingual-translator", color: "text-blue-600" },
    { title: "Community Forums", description: "Connect with Zambian students", icon: MessageSquare, link: "/social-feed", color: "text-purple-600" },
    { title: "Career Guidance", description: "Explore Zambian career paths", icon: Zap, link: "/smart-recommendations", color: "text-orange-600" }
  ];

  const learningProgress = [
    { subject: "Mathematics", progress: 85, grade: "A", color: "bg-blue-500" },
    { subject: "Physics", progress: 72, grade: "B+", color: "bg-green-500" },
    { subject: "Chemistry", progress: 91, grade: "A+", color: "bg-purple-500" },
    { subject: "English", progress: 78, grade: "B+", color: "bg-orange-500" },
    { subject: "Civic Education", progress: 88, grade: "A", color: "bg-pink-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-12 translate-y-12"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-pink-300" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  Muli bwanji, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student'}! 👋
                </h1>
                <p className="text-blue-100">Ready to continue your learning journey today?</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                <Globe className="w-3 h-3 mr-1" />
                Multilingual Learning
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                <Brain className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                <Award className="w-3 h-3 mr-1" />
                ECZ Aligned
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 group border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Learning Progress */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Learning Progress
              </CardTitle>
              <CardDescription>Your ECZ curriculum performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningProgress.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{subject.subject}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Grade {subject.grade}
                      </Badge>
                      <span className="text-sm font-semibold">{subject.progress}%</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress value={subject.progress} className="h-2" />
                    <div 
                      className={`absolute top-0 left-0 h-2 ${subject.color} rounded-full transition-all duration-500`}
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{activity.title}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">{activity.time}</span>
                        {activity.score && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            {activity.score}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All AI Features Grid */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              Complete AI-Powered Learning Suite
            </CardTitle>
            <CardDescription>Access all advanced learning tools and features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {allFeatures.map((feature, index) => (
                <Link key={index} to={feature.link}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50 group">
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Zambian Education Features */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-600" />
              Zambian Education Features
            </CardTitle>
            <CardDescription>Tailored for Zambian students, curriculum, and culture</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {zambianFeatures.map((feature, index) => (
                <Link key={index} to={feature.link}>
                  <div className="p-4 border rounded-lg hover:shadow-md transition-all duration-300 hover:border-green-300 cursor-pointer group bg-white">
                    <feature.icon className={`h-8 w-8 ${feature.color} mb-2 group-hover:scale-110 transition-transform duration-300`} />
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>Jump into your most used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Link to="/courses">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <span className="text-xs">Browse Courses</span>
                </Button>
              </Link>
              <Link to="/ai-flashcards">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300">
                  <Brain className="h-6 w-6 text-purple-600" />
                  <span className="text-xs">AI Flashcards</span>
                </Button>
              </Link>
              <Link to="/study-groups">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-green-50 hover:border-green-300 transition-all duration-300">
                  <Users className="h-6 w-6 text-green-600" />
                  <span className="text-xs">Study Groups</span>
                </Button>
              </Link>
              <Link to="/learning-analytics">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                  <span className="text-xs">Analytics</span>
                </Button>
              </Link>
              <Link to="/multilingual-translator">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-pink-50 hover:border-pink-300 transition-all duration-300">
                  <Globe className="h-6 w-6 text-pink-600" />
                  <span className="text-xs">Translator</span>
                </Button>
              </Link>
              <Link to="/achievements">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300">
                  <Award className="h-6 w-6 text-yellow-600" />
                  <span className="text-xs">Achievements</span>
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
