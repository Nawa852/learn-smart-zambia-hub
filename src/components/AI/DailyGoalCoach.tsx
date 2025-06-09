
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, CheckCircle, Circle, Star, Calendar, 
  TrendingUp, Brain, Zap, Trophy, Clock
} from 'lucide-react';

interface DailyGoal {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: number;
  completed: boolean;
  progress: number;
  aiGenerated: boolean;
  category: 'learning' | 'practice' | 'review' | 'project';
}

interface CoachingInsight {
  type: 'motivation' | 'adjustment' | 'celebration' | 'strategy';
  message: string;
  actionable: boolean;
}

const DailyGoalCoach = () => {
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [coachingInsights, setCoachingInsights] = useState<CoachingInsight[]>([]);
  const [isGeneratingGoals, setIsGeneratingGoals] = useState(false);
  const [streak, setStreak] = useState(7);
  const [todayProgress, setTodayProgress] = useState(65);

  const mockGoals: DailyGoal[] = [
    {
      id: '1',
      title: 'Complete React Hooks Tutorial',
      description: 'Finish the useState and useEffect sections',
      priority: 'high',
      estimatedTime: 45,
      completed: false,
      progress: 75,
      aiGenerated: true,
      category: 'learning'
    },
    {
      id: '2',
      title: 'Build Todo App Component',
      description: 'Apply hooks knowledge in a practical project',
      priority: 'medium',
      estimatedTime: 60,
      completed: false,
      progress: 30,
      aiGenerated: true,
      category: 'practice'
    },
    {
      id: '3',
      title: 'Review Yesterday\'s Notes',
      description: 'Reinforce learning from previous session',
      priority: 'low',
      estimatedTime: 15,
      completed: true,
      progress: 100,
      aiGenerated: false,
      category: 'review'
    }
  ];

  const mockInsights: CoachingInsight[] = [
    {
      type: 'motivation',
      message: 'You\'re 65% through today\'s goals! Keep up the great momentum.',
      actionable: false
    },
    {
      type: 'strategy',
      message: 'Consider breaking the Todo App into smaller 15-minute chunks for better focus.',
      actionable: true
    },
    {
      type: 'celebration',
      message: '🎉 Amazing! You\'ve maintained a 7-day learning streak!',
      actionable: false
    }
  ];

  useEffect(() => {
    setDailyGoals(mockGoals);
    setCoachingInsights(mockInsights);
  }, []);

  const generateAIGoals = async () => {
    setIsGeneratingGoals(true);
    
    setTimeout(() => {
      const aiGoals: DailyGoal[] = [
        {
          id: Date.now().toString(),
          title: 'Practice State Management',
          description: 'AI suggests focusing on this based on your recent struggles',
          priority: 'high',
          estimatedTime: 30,
          completed: false,
          progress: 0,
          aiGenerated: true,
          category: 'practice'
        },
        {
          id: (Date.now() + 1).toString(),
          title: 'Read Documentation',
          description: 'Review React docs for deeper understanding',
          priority: 'medium',
          estimatedTime: 20,
          completed: false,
          progress: 0,
          aiGenerated: true,
          category: 'learning'
        }
      ];
      
      setDailyGoals(prev => [...prev, ...aiGoals]);
      setIsGeneratingGoals(false);
    }, 2000);
  };

  const toggleGoalCompletion = (goalId: string) => {
    setDailyGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, completed: !goal.completed, progress: goal.completed ? 0 : 100 }
        : goal
    ));
    
    // Update overall progress
    const updatedGoals = dailyGoals.map(goal => 
      goal.id === goalId 
        ? { ...goal, completed: !goal.completed, progress: goal.completed ? 0 : 100 }
        : goal
    );
    const completedGoals = updatedGoals.filter(goal => goal.completed).length;
    const newProgress = Math.round((completedGoals / updatedGoals.length) * 100);
    setTodayProgress(newProgress);
  };

  const addCustomGoal = () => {
    if (!newGoal.trim()) return;
    
    const customGoal: DailyGoal = {
      id: Date.now().toString(),
      title: newGoal,
      description: 'Custom goal set by user',
      priority: 'medium',
      estimatedTime: 30,
      completed: false,
      progress: 0,
      aiGenerated: false,
      category: 'learning'
    };
    
    setDailyGoals(prev => [...prev, customGoal]);
    setNewGoal('');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'learning': return <Brain className="w-4 h-4" />;
      case 'practice': return <Target className="w-4 h-4" />;
      case 'review': return <TrendingUp className="w-4 h-4" />;
      case 'project': return <Trophy className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'motivation': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'strategy': return <Brain className="w-5 h-5 text-purple-500" />;
      case 'celebration': return <Trophy className="w-5 h-5 text-green-500" />;
      case 'adjustment': return <Target className="w-5 h-5 text-blue-500" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Target className="w-8 h-8" />
            Daily Goal Coach
          </CardTitle>
          <p className="text-green-100">
            AI-powered daily goal setting and progress tracking
          </p>
        </CardHeader>
      </Card>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Today's Progress</span>
              </div>
              <Badge variant="outline">{todayProgress}%</Badge>
            </div>
            <Progress value={todayProgress} className="mb-2" />
            <p className="text-sm text-gray-600">
              {dailyGoals.filter(g => g.completed).length} of {dailyGoals.length} goals completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold">Learning Streak</span>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">{streak} days</Badge>
            </div>
            <div className="text-2xl font-bold text-yellow-600 mb-2">{streak}</div>
            <p className="text-sm text-gray-600">Keep going! You're doing great!</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="font-semibold">Time Today</span>
              </div>
              <Badge variant="outline">
                {dailyGoals.reduce((total, goal) => total + (goal.completed ? goal.estimatedTime : 0), 0)}min
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {dailyGoals.reduce((total, goal) => total + goal.estimatedTime, 0)}min
            </div>
            <p className="text-sm text-gray-600">Estimated total time</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Coaching Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            AI Coaching Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {coachingInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <p className="text-sm">{insight.message}</p>
                  {insight.actionable && (
                    <Badge variant="outline" className="mt-2 text-xs">
                      Actionable Tip
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goal Management */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-green-600" />
              Today's Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dailyGoals.map((goal) => (
              <div key={goal.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleGoalCompletion(goal.id)}
                  className="mt-0.5"
                >
                  {goal.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </Button>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold ${goal.completed ? 'line-through text-gray-500' : ''}`}>
                      {goal.title}
                    </h4>
                    {goal.aiGenerated && (
                      <Badge variant="outline" className="text-xs">
                        AI
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getPriorityColor(goal.priority)}>
                      {goal.priority}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      {getCategoryIcon(goal.category)}
                      {goal.category}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {goal.estimatedTime}min
                    </div>
                  </div>
                  
                  {!goal.completed && goal.progress > 0 && (
                    <Progress value={goal.progress} className="h-2" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add New Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter a new learning goal..."
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomGoal()}
              />
              <Button onClick={addCustomGoal}>Add</Button>
            </div>
            
            <Button 
              onClick={generateAIGoals}
              disabled={isGeneratingGoals}
              className="w-full"
              variant="outline"
            >
              {isGeneratingGoals ? (
                <>
                  <Brain className="w-4 h-4 mr-2 animate-spin" />
                  AI is generating goals...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Generate AI Goals
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailyGoalCoach;
