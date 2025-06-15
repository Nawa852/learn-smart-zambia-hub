
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  BookOpen,
  Trophy,
  Clock,
  TrendingUp,
  Zap,
  Users,
  Star,
  Target,
  Calendar
} from 'lucide-react';
import ModernCard from '@/components/UI/ModernCard';
import AnimatedButton from '@/components/UI/AnimatedButton';
import AnimatedCounter from '@/components/UI/AnimatedCounter';
import FloatingElements from '@/components/3D/FloatingElements';

const ModernDashboard = () => {
  const stats = [
    { label: 'Courses Completed', value: 12, icon: BookOpen, color: 'text-blue-500' },
    { label: 'Study Hours', value: 145, icon: Clock, color: 'text-green-500' },
    { label: 'Achievements', value: 8, icon: Trophy, color: 'text-yellow-500' },
    { label: 'Study Streak', value: 23, icon: Zap, color: 'text-purple-500' },
  ];

  const recentActivities = [
    { title: 'Completed AI Fundamentals', time: '2 hours ago', type: 'completion' },
    { title: 'Joined Study Group: Math Masters', time: '5 hours ago', type: 'social' },
    { title: 'Earned "Quick Learner" Badge', time: '1 day ago', type: 'achievement' },
    { title: 'Started Advanced Physics', time: '2 days ago', type: 'enrollment' },
  ];

  const upcomingTasks = [
    { title: 'Chemistry Quiz', due: 'Tomorrow', priority: 'high' },
    { title: 'Math Assignment', due: 'In 3 days', priority: 'medium' },
    { title: 'Physics Lab Report', due: 'Next week', priority: 'low' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <FloatingElements count={30} />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Welcome back, Student! 🚀
          </h1>
          <p className="text-gray-600 text-lg">
            Ready to continue your learning journey? Let's make today amazing!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <ModernCard key={stat.label} variant="glass" animate>
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  <AnimatedCounter end={stat.value} duration={1500} />
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </ModernCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Progress */}
          <div className="lg:col-span-2 space-y-6">
            <ModernCard variant="holographic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { subject: 'Mathematics', progress: 85, color: 'bg-blue-500' },
                  { subject: 'Physics', progress: 72, color: 'bg-green-500' },
                  { subject: 'Chemistry', progress: 68, color: 'bg-purple-500' },
                  { subject: 'English', progress: 91, color: 'bg-yellow-500' },
                ].map((course) => (
                  <div key={course.subject} className="space-y-2">
                    <div className="flex justify-between text-white">
                      <span>{course.subject}</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </ModernCard>

            {/* Quick Actions */}
            <ModernCard variant="gradient">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <AnimatedButton variant="cosmic" icon={Brain} size="sm">
                    AI Tutor
                  </AnimatedButton>
                  <AnimatedButton variant="neon" icon={BookOpen} size="sm">
                    Study Now
                  </AnimatedButton>
                  <AnimatedButton variant="holographic" icon={Users} size="sm">
                    Join Group
                  </AnimatedButton>
                  <AnimatedButton variant="pulse" icon={Target} size="sm">
                    Take Quiz
                  </AnimatedButton>
                </div>
              </CardContent>
            </ModernCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <ModernCard variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </ModernCard>

            {/* Upcoming Tasks */}
            <ModernCard variant="neon" glowColor="#10b981">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Calendar className="w-5 h-5" />
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">{task.title}</p>
                      <p className="text-xs text-gray-300">{task.due}</p>
                    </div>
                    <Badge 
                      variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </ModernCard>

            {/* Achievement Showcase */}
            <ModernCard variant="holographic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Star className="w-5 h-5" />
                  Latest Achievement
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Quick Learner</h3>
                <p className="text-sm text-gray-300">
                  Completed 5 lessons in one day!
                </p>
              </CardContent>
            </ModernCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;
