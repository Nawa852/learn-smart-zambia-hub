
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, TrendingUp, TrendingDown, Target, 
  BarChart, Zap, Settings, AlertCircle
} from 'lucide-react';

interface DifficultyMetrics {
  currentLevel: number;
  targetLevel: number;
  performanceScore: number;
  frustrationLevel: number;
  engagementScore: number;
  adaptationRate: number;
}

interface LearningSession {
  id: string;
  topic: string;
  difficulty: number;
  performance: number;
  timeSpent: number;
  errors: number;
  hints: number;
}

const AdaptiveDifficultyEngine = () => {
  const [metrics, setMetrics] = useState<DifficultyMetrics>({
    currentLevel: 65,
    targetLevel: 80,
    performanceScore: 78,
    frustrationLevel: 25,
    engagementScore: 85,
    adaptationRate: 92
  });

  const [sessions, setSessions] = useState<LearningSession[]>([]);
  const [isAdapting, setIsAdapting] = useState(false);
  const [autoAdapt, setAutoAdapt] = useState(true);

  const mockSessions: LearningSession[] = [
    {
      id: '1',
      topic: 'React Hooks',
      difficulty: 70,
      performance: 85,
      timeSpent: 45,
      errors: 2,
      hints: 1
    },
    {
      id: '2',
      topic: 'State Management',
      difficulty: 75,
      performance: 65,
      timeSpent: 60,
      errors: 5,
      hints: 3
    },
    {
      id: '3',
      topic: 'API Integration',
      difficulty: 65,
      performance: 90,
      timeSpent: 30,
      errors: 1,
      hints: 0
    }
  ];

  useEffect(() => {
    setSessions(mockSessions);
    
    // Simulate real-time adaptation
    const interval = setInterval(() => {
      if (autoAdapt) {
        setMetrics(prev => ({
          ...prev,
          currentLevel: Math.min(100, Math.max(0, prev.currentLevel + (Math.random() - 0.5) * 5)),
          performanceScore: Math.min(100, Math.max(0, prev.performanceScore + (Math.random() - 0.5) * 3)),
          frustrationLevel: Math.min(100, Math.max(0, prev.frustrationLevel + (Math.random() - 0.5) * 2)),
          engagementScore: Math.min(100, Math.max(0, prev.engagementScore + (Math.random() - 0.5) * 2))
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [autoAdapt]);

  const adaptDifficulty = async () => {
    setIsAdapting(true);
    
    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        currentLevel: prev.targetLevel,
        adaptationRate: Math.min(100, prev.adaptationRate + 5)
      }));
      setIsAdapting(false);
    }, 1500);
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getFrustrationColor = (level: number) => {
    if (level <= 30) return 'text-green-600';
    if (level <= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="w-8 h-8" />
            Adaptive Difficulty Engine
          </CardTitle>
          <p className="text-blue-100">
            LLaMA-powered real-time difficulty adjustment based on your learning patterns
          </p>
        </CardHeader>
      </Card>

      {/* Real-time Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Current Difficulty</span>
              </div>
              <Badge variant="outline">{metrics.currentLevel}%</Badge>
            </div>
            <Progress value={metrics.currentLevel} className="mb-2" />
            <p className="text-sm text-gray-600">
              Target: {metrics.targetLevel}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Performance</span>
              </div>
              <Badge className={getPerformanceColor(metrics.performanceScore)}>
                {metrics.performanceScore}%
              </Badge>
            </div>
            <Progress value={metrics.performanceScore} className="mb-2" />
            <div className="flex items-center gap-1 text-sm">
              {metrics.performanceScore > 75 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className="text-gray-600">Trending</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="font-semibold">Frustration Level</span>
              </div>
              <Badge className={getFrustrationColor(metrics.frustrationLevel)}>
                {metrics.frustrationLevel}%
              </Badge>
            </div>
            <Progress value={metrics.frustrationLevel} className="mb-2" />
            <p className="text-sm text-gray-600">
              Engagement: {metrics.engagementScore}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Adaptation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-purple-600" />
            Adaptation Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Auto-Adaptation</h4>
              <p className="text-sm text-gray-600">Let AI automatically adjust difficulty in real-time</p>
            </div>
            <Button
              variant={autoAdapt ? "default" : "outline"}
              onClick={() => setAutoAdapt(!autoAdapt)}
            >
              {autoAdapt ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Manual Adaptation</h4>
              <p className="text-sm text-gray-600">Trigger immediate difficulty adjustment</p>
            </div>
            <Button 
              onClick={adaptDifficulty}
              disabled={isAdapting}
              variant="outline"
            >
              {isAdapting ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-spin" />
                  Adapting...
                </>
              ) : (
                'Adapt Now'
              )}
            </Button>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">AI Adaptation Rate</h4>
            <div className="flex items-center gap-2">
              <Progress value={metrics.adaptationRate} className="flex-1" />
              <span className="text-blue-700 font-medium">{metrics.adaptationRate}%</span>
            </div>
            <p className="text-sm text-blue-600 mt-2">
              System is learning your patterns and improving adaptations
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Learning Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Learning Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">{session.topic}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Difficulty: {session.difficulty}%</span>
                    <span>Performance: {session.performance}%</span>
                    <span>{session.timeSpent}min</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    {session.errors} errors, {session.hints} hints
                  </div>
                  <Badge className={getPerformanceColor(session.performance)}>
                    {session.performance >= 80 ? 'Excellent' : session.performance >= 60 ? 'Good' : 'Needs Work'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaptiveDifficultyEngine;
