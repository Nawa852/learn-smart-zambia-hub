import React from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, Brain, Users, Trophy, Calendar, MessageCircle,
  BarChart3, Bell, Video, Award, Clock, TrendingUp,
  CheckCircle, AlertCircle, Star, Globe, Target, FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ComprehensiveDashboard = () => {
  const { user } = useAuth();
  
  const quickStats = [
    { label: 'Courses Enrolled', value: '12', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Completed Lessons', value: '89', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Achievements', value: '24', icon: Trophy, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Study Streak', value: '15 days', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const recentActivities = [
    { action: 'Completed Mathematics Quiz', time: '2 hours ago', score: '95%' },
    { action: 'Joined Science Discussion', time: '4 hours ago', score: null },
    { action: 'Earned "Problem Solver" Badge', time: '1 day ago', score: null },
    { action: 'Submitted English Essay', time: '2 days ago', score: '88%' },
  ];

  const upcomingEvents = [
    { title: 'Parent-Teacher Conference', date: 'Tomorrow, 2:00 PM', type: 'meeting' },
    { title: 'Mathematics Exam', date: 'Friday, 10:00 AM', type: 'exam' },
    { title: 'Science Fair Project Due', date: 'Next Monday', type: 'assignment' },
    { title: 'Virtual Assembly', date: 'Next Wednesday', type: 'event' },
  ];

  const currentCourses = [
    { name: 'Advanced Mathematics', progress: 78, nextLesson: 'Calculus Basics', instructor: 'Mr. Mwansa' },
    { name: 'English Literature', progress: 65, nextLesson: 'Shakespeare Analysis', instructor: 'Mrs. Phiri' },
    { name: 'Computer Science', progress: 82, nextLesson: 'Data Structures', instructor: 'Mr. Banda' },
    { name: 'Physics', progress: 71, nextLesson: 'Quantum Mechanics', instructor: 'Dr. Tembo' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.user_metadata?.full_name || 'Student'}! 🎓
              </h1>
              <p className="text-gray-600 mt-2">Ready to continue your learning journey?</p>
            </div>
            <div className="flex space-x-3">
              <Button asChild>
                <Link to="/smart-recommendations">
                  <Brain className="mr-2 h-4 w-4" />
                  AI Tutor
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/schedule">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bg}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  My Courses
                </CardTitle>
                <CardDescription>Continue where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentCourses.map((course, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{course.name}</h3>
                      <Badge variant="outline">{course.progress}%</Badge>
                    </div>
                    <Progress value={course.progress} className="mb-2" />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Next: {course.nextLesson}</span>
                      <span>Instructor: {course.instructor}</span>
                    </div>
                    <Button size="sm" className="mt-2" asChild>
                      <Link to={`/courses/${course.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        Continue Learning
                      </Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-blue-600" />
                  AI-Powered Recommendations
                </CardTitle>
                <CardDescription>Personalized learning suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900">Focus on Math Practice</h4>
                  <p className="text-sm text-blue-700 mt-1">Based on your recent performance, spend 30 minutes on algebra problems.</p>
                  <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">Start Practice</Button>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900">Review Science Notes</h4>
                  <p className="text-sm text-green-700 mt-1">Quick review of last week's chemistry lesson before tomorrow's class.</p>
                  <Button size="sm" variant="outline" className="mt-2 border-green-600 text-green-600">Review Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex-shrink-0">
                      {event.type === 'exam' && <AlertCircle className="h-5 w-5 text-red-500" />}
                      {event.type === 'meeting' && <Video className="h-5 w-5 text-blue-500" />}
                      {event.type === 'assignment' && <FileText className="h-5 w-5 text-orange-500" />}
                      {event.type === 'event' && <Users className="h-5 w-5 text-green-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/schedule">View Full Calendar</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="border-l-2 border-blue-200 pl-3 pb-3">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
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

            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/discussions">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Join Discussion
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/achievements">
                    <Award className="mr-2 h-4 w-4" />
                    View Achievements
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/learning-analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Learning Analytics
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/help">
                    <Bell className="mr-2 h-4 w-4" />
                    Get Help
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <Globe className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">Virtual Learning Environments</h3>
              <p className="text-blue-100 mb-4">Experience immersive 3D learning spaces</p>
              <Button variant="secondary" asChild>
                <Link to="/virtual-classroom">Explore Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-gradient-to-br from-green-500 to-teal-600 text-white">
            <CardContent className="p-6">
              <Target className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">Adaptive Learning Paths</h3>
              <p className="text-green-100 mb-4">Personalized curricula that adapt to you</p>
              <Button variant="secondary" asChild>
                <Link to="/adaptive-content">Start Learning</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardContent className="p-6">
              <Star className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">Gamified Challenges</h3>
              <p className="text-orange-100 mb-4">Compete with peers and earn rewards</p>
              <Button variant="secondary" asChild>
                <Link to="/challenges">Join Challenge</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveDashboard;
