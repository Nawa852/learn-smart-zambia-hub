
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Target, TrendingUp, Bell, CheckCircle } from 'lucide-react';
import { useAuth } from '@/components/Auth/AuthProvider';

interface StudySession {
  id: string;
  subject: string;
  topic: string;
  duration: number;
  scheduledTime: Date;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  priority: 'low' | 'medium' | 'high';
}

interface StudyGoal {
  id: string;
  title: string;
  targetDate: Date;
  progress: number;
  sessions: number;
  completedSessions: number;
}

const StudyScheduler = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<StudySession[]>([
    {
      id: '1',
      subject: 'Mathematics',
      topic: 'Calculus - Derivatives',
      duration: 60,
      scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      completed: false,
      difficulty: 'hard',
      priority: 'high'
    },
    {
      id: '2',
      subject: 'Science',
      topic: 'Physics - Newton\'s Laws',
      duration: 45,
      scheduledTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
      completed: false,
      difficulty: 'medium',
      priority: 'medium'
    }
  ]);

  const [goals, setGoals] = useState<StudyGoal[]>([
    {
      id: '1',
      title: 'Master Calculus Fundamentals',
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      progress: 65,
      sessions: 20,
      completedSessions: 13
    },
    {
      id: '2',
      title: 'Complete Physics Course',
      targetDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      progress: 40,
      sessions: 15,
      completedSessions: 6
    }
  ]);

  const [weeklyStats, setWeeklyStats] = useState({
    totalHours: 12.5,
    completedSessions: 8,
    streak: 5,
    efficiency: 85
  });

  const completeSession = (sessionId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, completed: true }
        : session
    ));
    
    // Update weekly stats
    setWeeklyStats(prev => ({
      ...prev,
      completedSessions: prev.completedSessions + 1,
      totalHours: prev.totalHours + 1
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Weekly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Study Hours</p>
                <p className="text-2xl font-bold">{weeklyStats.totalHours}h</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sessions</p>
                <p className="text-2xl font-bold">{weeklyStats.completedSessions}</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Streak</p>
                <p className="text-2xl font-bold">{weeklyStats.streak} days</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Efficiency</p>
                <p className="text-2xl font-bold">{weeklyStats.efficiency}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Today's Study Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`p-4 rounded-lg border ${
                  session.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{session.subject}</h4>
                      <Badge className={getDifficultyColor(session.difficulty)}>
                        {session.difficulty}
                      </Badge>
                      <Badge className={getPriorityColor(session.priority)}>
                        {session.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-1">{session.topic}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {session.scheduledTime.toLocaleTimeString()}
                      </span>
                      <span>{session.duration} minutes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {session.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Button
                        onClick={() => completeSession(session.id)}
                        size="sm"
                        variant="outline"
                      >
                        Start Session
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Learning Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{goal.title}</h4>
                  <span className="text-sm text-gray-500">
                    Due: {goal.targetDate.toLocaleDateString()}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{goal.completedSessions} of {goal.sessions} sessions</span>
                    <span>{goal.sessions - goal.completedSessions} remaining</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            AI Coach Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-800">Study Tip</p>
              <p className="text-sm text-blue-700">
                Based on your performance, consider taking a 10-minute break every hour to improve retention.
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-800">Achievement</p>
              <p className="text-sm text-green-700">
                Great job maintaining your 5-day study streak! Keep it up!
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm font-medium text-orange-800">Focus Area</p>
              <p className="text-sm text-orange-700">
                You might want to spend more time on Calculus as it's marked as high priority.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyScheduler;
