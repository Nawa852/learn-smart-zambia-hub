
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Brain, Users, MessageSquare, Calendar, Bell,
  Target, Award, TrendingUp, Upload, Settings, User,
  Lightbulb, Heart, Star, Zap, Clock, Eye, Play,
  ChevronRight, BarChart3, Handshake, Globe
} from 'lucide-react';
import { useAuth } from '@/components/Auth/AuthProvider';

const AdaptiveDashboard = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState('student'); // Default to student
  const [didYouKnowFact, setDidYouKnowFact] = useState('');
  const [notifications, setNotifications] = useState([]);

  // Sample data - in real app, this would come from the database
  const studentData = {
    name: 'Sarah Mwansa',
    progress: 75,
    currentGoals: [
      { title: 'Complete Mathematics Module 5', progress: 80, deadline: '2 days' },
      { title: 'Biology Assignment Submission', progress: 60, deadline: '5 days' },
      { title: 'Read Chemistry Chapter 8', progress: 100, deadline: 'Completed' }
    ],
    recentActivity: [
      { action: 'Completed Quiz: Quadratic Equations', time: '2 hours ago', points: 25 },
      { action: 'Joined Study Group: Grade 12 Biology', time: '1 day ago', points: 10 },
      { action: 'Asked AI Tutor about Photosynthesis', time: '2 days ago', points: 5 }
    ],
    upcomingEvents: [
      { title: 'Math Test', date: 'Tomorrow', type: 'exam' },
      { title: 'Study Group Meeting', date: 'Wednesday', type: 'social' },
      { title: 'Assignment Due: English Essay', date: 'Friday', type: 'assignment' }
    ]
  };

  const didYouKnowFacts = [
    "Victoria Falls in Zambia is twice the height of Niagara Falls!",
    "The human brain uses about 20% of your body's total energy - perfect fuel for studying!",
    "Zambia is home to the source of the Zambezi River, Africa's fourth-longest river.",
    "Reading for just 6 minutes can reduce stress levels by up to 68%!",
    "Copper from Zambian mines helped build the Statue of Liberty!"
  ];

  useEffect(() => {
    // Set random "Did You Know" fact
    const randomFact = didYouKnowFacts[Math.floor(Math.random() * didYouKnowFacts.length)];
    setDidYouKnowFact(randomFact);

    // Simulate notifications
    setNotifications([
      { id: 1, title: 'New Biology Notes Available', type: 'content', time: '1 hour ago' },
      { id: 2, title: 'Study Group Invitation', type: 'social', time: '3 hours ago' },
      { id: 3, title: 'Math Quiz Results Ready', type: 'grade', time: '1 day ago' }
    ]);
  }, []);

  const StudentDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome back, {studentData.name}! 🌟</h1>
              <p className="opacity-90">Ready to continue your learning journey?</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{studentData.progress}%</div>
              <div className="text-sm opacity-75">Overall Progress</div>
            </div>
          </div>
          <Progress value={studentData.progress} className="mt-4 bg-white/20" />
        </CardContent>
      </Card>

      {/* Did You Know Section */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <span>Did You Know?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{didYouKnowFact}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-blue-500 hover:bg-blue-600">
                <Brain className="w-6 h-6" />
                <span>Ask AI Tutor</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-green-500 hover:bg-green-600">
                <Upload className="w-6 h-6" />
                <span>Upload Material</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-purple-500 hover:bg-purple-600">
                <Users className="w-6 h-6" />
                <span>Join Study Group</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-orange-500 hover:bg-orange-600">
                <Calendar className="w-6 h-6" />
                <span>Schedule Session</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Notifications</span>
              <Bell className="w-5 h-5" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Learning Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Current Learning Goals</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {studentData.currentGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{goal.title}</span>
                <Badge variant={goal.progress === 100 ? "default" : "secondary"}>
                  {goal.deadline}
                </Badge>
              </div>
              <Progress value={goal.progress} />
              <div className="text-sm text-gray-600">{goal.progress}% complete</div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {studentData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  +{activity.points} pts
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {studentData.upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  event.type === 'exam' ? 'bg-red-500' :
                  event.type === 'social' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const TeacherDashboard = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">Teacher Dashboard</h1>
          <p>Manage your classes and support student success</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Class Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Average Performance</span>
                <span className="font-bold">78%</span>
              </div>
              <Progress value={78} />
              <div className="text-sm text-gray-600">
                <span className="text-green-600">↑ 5% from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Creation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Create Quiz
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Materials
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Create Assignment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>At Risk Students</span>
                  <span className="text-red-600">3</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>High Performers</span>
                  <span className="text-green-600">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Students</span>
                  <span>45</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const ParentDashboard = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">Parent Portal</h1>
          <p>Monitor your child's educational progress</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Child's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Overall Grade</span>
                  <span className="font-bold text-green-600">B+</span>
                </div>
                <Progress value={85} />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Attendance</span>
                  <div className="font-bold">95%</div>
                </div>
                <div>
                  <span className="text-gray-600">Assignments</span>
                  <div className="font-bold">18/20</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium">Math test scheduled</p>
                <p className="text-xs text-gray-500">Tomorrow at 10:00 AM</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium">Excellent performance in Science</p>
                <p className="text-xs text-gray-500">Scored 92% on recent quiz</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const AdminDashboard = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">Administrator Dashboard</h1>
          <p>Manage school operations and analytics</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <User className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">84</div>
                <div className="text-sm text-gray-600">Teachers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm text-gray-600">Courses</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">89%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Role Selector for Demo */}
        <div className="mb-6">
          <Tabs value={userRole} onValueChange={setUserRole} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
              <TabsTrigger value="parent">Parent</TabsTrigger>
              <TabsTrigger value="admin">Administrator</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <StudentDashboard />
            </TabsContent>
            <TabsContent value="teacher">
              <TeacherDashboard />
            </TabsContent>
            <TabsContent value="parent">
              <ParentDashboard />
            </TabsContent>
            <TabsContent value="admin">
              <AdminDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveDashboard;
