
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Clock, BookOpen, Award, TrendingUp, Target, Brain } from 'lucide-react';

const LearningAnalytics = () => {
  // Mock data for analytics
  const weeklyProgress = [
    { day: 'Mon', hours: 2.5, completed: 3 },
    { day: 'Tue', hours: 1.8, completed: 2 },
    { day: 'Wed', hours: 3.2, completed: 4 },
    { day: 'Thu', hours: 2.1, completed: 2 },
    { day: 'Fri', hours: 4.0, completed: 5 },
    { day: 'Sat', hours: 3.5, completed: 4 },
    { day: 'Sun', hours: 2.8, completed: 3 },
  ];

  const subjectProgress = [
    { subject: 'Mathematics', progress: 85, color: '#3B82F6' },
    { subject: 'Science', progress: 72, color: '#10B981' },
    { subject: 'Technology', progress: 94, color: '#8B5CF6' },
    { subject: 'Languages', progress: 68, color: '#F59E0B' },
    { subject: 'History', progress: 79, color: '#EF4444' },
  ];

  const learningStyle = [
    { name: 'Visual', value: 40, color: '#3B82F6' },
    { name: 'Auditory', value: 30, color: '#10B981' },
    { name: 'Kinesthetic', value: 20, color: '#F59E0B' },
    { name: 'Reading/Writing', value: 10, color: '#8B5CF6' },
  ];

  const achievements = [
    { title: 'Fast Learner', description: 'Completed 5 lessons in one day', icon: '⚡', date: '2024-01-15' },
    { title: 'Math Wizard', description: 'Scored 100% on advanced math quiz', icon: '🧮', date: '2024-01-10' },
    { title: 'Consistent Learner', description: '7-day learning streak', icon: '🔥', date: '2024-01-08' },
    { title: 'Course Completion', description: 'Completed Python Basics course', icon: '🎓', date: '2024-01-05' },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47.5 hours</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 completed this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 earned this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Learning Score</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">Excellent progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Weekly Learning Activity
            </CardTitle>
            <CardDescription>Your daily study hours and lesson completions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="hours" stroke="#3B82F6" strokeWidth={2} name="Study Hours" />
                <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} name="Lessons Completed" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Learning Style Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              Learning Style Analysis
            </CardTitle>
            <CardDescription>AI-detected learning preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={learningStyle}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {learningStyle.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Subject Progress
          </CardTitle>
          <CardDescription>Your mastery level across different subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectProgress.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{subject.subject}</span>
                  <Badge variant="outline">{subject.progress}%</Badge>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Recent Achievements
          </CardTitle>
          <CardDescription>Your latest learning milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                </div>
                <Badge variant="secondary">New</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningAnalytics;
