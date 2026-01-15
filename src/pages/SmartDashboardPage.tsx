import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Target, Clock, TrendingUp, BookOpen, Award, 
  Calendar, Zap, BarChart3, Users, Bell, Settings,
  ChevronRight, Play, CheckCircle2, AlertCircle, Flame
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SmartDashboardPage = () => {
  const [selectedPath, setSelectedPath] = useState(0);

  const learningPaths = [
    { id: 1, title: 'Mathematics Mastery', progress: 68, nextLesson: 'Quadratic Equations', deadline: '2 days', priority: 'high' },
    { id: 2, title: 'Science Explorer', progress: 45, nextLesson: 'Chemical Reactions', deadline: '5 days', priority: 'medium' },
    { id: 3, title: 'English Excellence', progress: 82, nextLesson: 'Essay Writing', deadline: '1 week', priority: 'low' },
  ];

  const predictedSkills = [
    { skill: 'Critical Thinking', confidence: 85, trend: 'up' },
    { skill: 'Problem Solving', confidence: 72, trend: 'up' },
    { skill: 'Data Analysis', confidence: 58, trend: 'stable' },
    { skill: 'Communication', confidence: 91, trend: 'up' },
  ];

  const upcomingDeadlines = [
    { title: 'Math Assignment #5', due: 'Tomorrow', type: 'assignment', urgent: true },
    { title: 'Science Quiz', due: 'In 3 days', type: 'quiz', urgent: false },
    { title: 'English Essay', due: 'In 1 week', type: 'project', urgent: false },
    { title: 'Physics Lab Report', due: 'In 2 weeks', type: 'report', urgent: false },
  ];

  const recentActivity = [
    { action: 'Completed', item: 'Algebra Basics', time: '2 hours ago', xp: 150 },
    { action: 'Started', item: 'Chemistry Module 3', time: '5 hours ago', xp: 50 },
    { action: 'Achieved', item: 'Quick Learner Badge', time: 'Yesterday', xp: 500 },
    { action: 'Submitted', item: 'History Essay', time: '2 days ago', xp: 200 },
  ];

  const aiInsights = [
    { type: 'recommendation', message: 'Focus on Trigonometry - your performance suggests you\'re ready for advanced concepts', priority: 'high' },
    { type: 'alert', message: 'Math assignment due tomorrow - 2 questions remaining', priority: 'urgent' },
    { type: 'achievement', message: 'You\'re on a 7-day learning streak! Keep it up!', priority: 'positive' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Mission Control
            </h1>
            <p className="text-muted-foreground mt-1">Your AI-powered learning command center</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-orange-500/10 px-4 py-2 rounded-full">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-orange-500">7 Day Streak</span>
            </div>
            <Button variant="outline" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* AI Insights Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">AI Learning Assistant</p>
                <p className="text-sm text-muted-foreground">{aiInsights[0].message}</p>
              </div>
              <Button size="sm">Take Action</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        {[
          { label: 'Total XP', value: '12,450', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
          { label: 'Courses Active', value: '5', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Badges Earned', value: '23', icon: Award, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { label: 'Study Hours', value: '156', icon: Clock, color: 'text-green-500', bg: 'bg-green-500/10' },
        ].map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Paths */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Personalized Learning Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningPaths.map((path, index) => (
                  <div 
                    key={path.id}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedPath === index 
                        ? 'border-primary bg-primary/5' 
                        : 'border-transparent bg-muted/50 hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedPath(index)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{path.title}</h3>
                          <p className="text-sm text-muted-foreground">Next: {path.nextLesson}</p>
                        </div>
                      </div>
                      <Badge variant={path.priority === 'high' ? 'destructive' : path.priority === 'medium' ? 'default' : 'secondary'}>
                        {path.deadline}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button size="sm" className="gap-2">
                        <Play className="w-4 h-4" /> Continue Learning
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Predicted Skills */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                AI-Predicted Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictedSkills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{skill.skill}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{skill.confidence}%</span>
                        {skill.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                      </div>
                    </div>
                    <Progress value={skill.confidence} className="h-2" />
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Full Skills Report
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Upcoming Deadlines */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      deadline.urgent ? 'bg-red-500/10 border border-red-500/20' : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {deadline.urgent ? (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium">{deadline.title}</p>
                        <p className="text-sm text-muted-foreground">{deadline.type}</p>
                      </div>
                    </div>
                    <Badge variant={deadline.urgent ? 'destructive' : 'outline'}>
                      {deadline.due}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          <span className="text-muted-foreground">{activity.action}</span> {activity.item}
                        </p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">+{activity.xp} XP</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SmartDashboardPage;
