
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, Brain, Users, Trophy, Calendar, MessageCircle,
  BarChart3, Bell, Video, Award, Clock, TrendingUp,
  CheckCircle, AlertCircle, Star, Globe, Target, FileText,
  Sparkles, Zap, Heart, MapPin, GraduationCap, PlayCircle,
  ArrowRight, Timer, BookMarked, Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedDashboard = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const quickStats = [
    { 
      label: 'Active Courses', 
      value: '8', 
      icon: BookOpen, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100',
      trend: '+2 this month',
      link: '/courses'
    },
    { 
      label: 'Study Streak', 
      value: '15 days', 
      icon: TrendingUp, 
      color: 'text-green-600', 
      bg: 'bg-green-100',
      trend: 'Personal best!',
      link: '/learning-analytics'
    },
    { 
      label: 'AI Sessions', 
      value: '32', 
      icon: Brain, 
      color: 'text-purple-600', 
      bg: 'bg-purple-100',
      trend: '+5 this week',
      link: '/multi-ai-tutor'
    },
    { 
      label: 'Achievements', 
      value: '24', 
      icon: Trophy, 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-100',
      trend: '3 pending',
      link: '/achievements'
    },
  ];

  const quickActions = [
    {
      title: 'AI Study Session',
      description: 'Get personalized help with your current topics',
      icon: Brain,
      color: 'from-blue-500 to-purple-600',
      link: '/multi-ai-tutor',
      badge: 'Smart'
    },
    {
      title: 'Continue Learning',
      description: 'Pick up where you left off in Mathematics',
      icon: BookOpen,
      color: 'from-green-500 to-teal-600',
      link: '/courses',
      badge: 'In Progress'
    },
    {
      title: 'Study Group Chat',
      description: 'Join your Physics study group discussion',
      icon: Users,
      color: 'from-orange-500 to-red-600',
      link: '/study-groups',
      badge: '4 online'
    },
    {
      title: 'Smart Recommendations',
      description: 'Discover new content tailored for you',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-600',
      link: '/smart-recommendations',
      badge: 'AI Powered'
    }
  ];

  const recentActivity = [
    { action: 'Completed "Quantum Physics Basics"', time: '2 hours ago', score: '95%', type: 'lesson' },
    { action: 'AI Tutor session on Calculus', time: '4 hours ago', score: null, type: 'ai' },
    { action: 'Joined Study Group: Chemistry Lab', time: '6 hours ago', score: null, type: 'social' },
    { action: 'Earned "Problem Solver" Badge', time: '1 day ago', score: null, type: 'achievement' },
    { action: 'Generated Mind Map for Biology', time: '1 day ago', score: null, type: 'ai' },
  ];

  const upcomingEvents = [
    { title: 'Virtual Physics Lab Session', date: 'Today, 3:00 PM', type: 'live', urgent: true },
    { title: 'Mathematics Quiz Due', date: 'Tomorrow, 11:59 PM', type: 'assignment', urgent: true },
    { title: 'AI Tutoring: Chemistry Review', date: 'Friday, 2:00 PM', type: 'ai', urgent: false },
    { title: 'Study Group Meeting', date: 'Saturday, 10:00 AM', type: 'social', urgent: false },
  ];

  const aiFeatures = [
    { name: 'Smart Flashcards', icon: BookMarked, link: '/ai-flashcards', status: 'Ready' },
    { name: 'Learning Path AI', icon: Target, link: '/ai-learning-paths', status: 'New' },
    { name: 'Mind Map Builder', icon: Lightbulb, link: '/visual-mind-map', status: 'Popular' },
    { name: 'Study Coach', icon: Timer, link: '/daily-goal-coach', status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {getTimeGreeting()}, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}! 🎓
                </h1>
                <p className="text-xl text-gray-600 mt-2">Ready to continue your learning journey?</p>
                <p className="text-sm text-gray-500 mt-1">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Link to="/multi-ai-tutor">
                  <Brain className="mr-2 h-4 w-4" />
                  AI Tutor Session
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/learning-analytics">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Link key={index} to={stat.link}>
              <Card className="hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
                    </div>
                    <div className={`p-3 rounded-2xl ${stat.bg} shadow-lg`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Jump into your learning activities</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.link}>
                    <div className={`relative p-6 rounded-xl bg-gradient-to-r ${action.color} text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}>
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          {action.badge}
                        </Badge>
                      </div>
                      <action.icon className="h-8 w-8 mb-4 opacity-90" />
                      <h3 className="text-lg font-bold mb-2">{action.title}</h3>
                      <p className="text-sm opacity-90 mb-4">{action.description}</p>
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* AI Features Grid */}
            <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
                  AI Learning Tools
                </CardTitle>
                <CardDescription>Explore our intelligent learning features</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {aiFeatures.map((feature, index) => (
                  <Link key={index} to={feature.link}>
                    <div className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center justify-between mb-3">
                        <feature.icon className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform" />
                        <Badge variant="outline" className="text-xs">{feature.status}</Badge>
                      </div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-purple-700">{feature.name}</h4>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className={`flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors ${event.urgent ? 'border-red-200 bg-red-50/50' : 'border-gray-200'}`}>
                    <div className="flex-shrink-0">
                      {event.type === 'assignment' && <FileText className="h-5 w-5 text-orange-500" />}
                      {event.type === 'live' && <Video className="h-5 w-5 text-red-500" />}
                      {event.type === 'ai' && <Brain className="h-5 w-5 text-purple-500" />}
                      {event.type === 'social' && <Users className="h-5 w-5 text-green-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.date}</p>
                      {event.urgent && (
                        <Badge variant="destructive" className="text-xs mt-1">Urgent</Badge>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/events-learning">View All Events</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-green-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="border-l-2 border-blue-200 pl-3 pb-3">
                    <div className="flex items-center space-x-2">
                      {activity.type === 'lesson' && <BookOpen className="w-3 h-3 text-blue-500" />}
                      {activity.type === 'ai' && <Brain className="w-3 h-3 text-purple-500" />}
                      {activity.type === 'social' && <Users className="w-3 h-3 text-green-500" />}
                      {activity.type === 'achievement' && <Trophy className="w-3 h-3 text-yellow-500" />}
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      {activity.score && (
                        <Badge variant="secondary" className="text-xs">{activity.score}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
