
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, Eye, Headphones, Hand, BarChart3, TrendingUp, 
  Clock, Target, Zap, Settings, Play, Pause
} from "lucide-react";

interface LearningStyle {
  type: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  percentage: number;
  color: string;
}

interface ContentAdaptation {
  difficulty: 'easier' | 'same' | 'harder';
  format: 'video' | 'text' | 'interactive' | 'audio';
  pace: 'slower' | 'normal' | 'faster';
  examples: number;
}

const AdaptiveContentDelivery: React.FC = () => {
  const [currentDifficulty, setCurrentDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [performanceScore, setPerformanceScore] = useState(78);
  const [engagementLevel, setEngagementLevel] = useState(85);
  const [isAdapting, setIsAdapting] = useState(false);

  const learningStyles: LearningStyle[] = [
    { type: 'visual', percentage: 65, color: 'blue' },
    { type: 'kinesthetic', percentage: 20, color: 'green' },
    { type: 'auditory', percentage: 10, color: 'purple' },
    { type: 'reading', percentage: 5, color: 'orange' }
  ];

  const [currentAdaptation, setCurrentAdaptation] = useState<ContentAdaptation>({
    difficulty: 'same',
    format: 'video',
    pace: 'normal',
    examples: 3
  });

  const adaptations = [
    {
      trigger: 'Low quiz scores (< 60%)',
      action: 'Reduce difficulty, add more examples',
      status: 'inactive'
    },
    {
      trigger: 'High performance (> 90%)',
      action: 'Increase difficulty, reduce repetition',
      status: 'inactive'
    },
    {
      trigger: 'Visual learner preference',
      action: 'Prioritize video and diagram content',
      status: 'active'
    },
    {
      trigger: 'Engagement drop detected',
      action: 'Switch to interactive content',
      status: 'monitoring'
    }
  ];

  const adaptiveFeatures = [
    {
      name: 'Smart Difficulty Adjustment',
      description: 'Automatically adjusts content complexity based on performance',
      icon: BarChart3,
      active: true
    },
    {
      name: 'Learning Style Adaptation',
      description: 'Customizes content format to match your preferred learning style',
      icon: Eye,
      active: true
    },
    {
      name: 'Pace Optimization',
      description: 'Adjusts lesson pacing based on comprehension speed',
      icon: Clock,
      active: true
    },
    {
      name: 'Content Sequencing',
      description: 'Reorders topics based on prerequisite knowledge gaps',
      icon: Target,
      active: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time adaptation
      setPerformanceScore(prev => {
        const variation = (Math.random() - 0.5) * 10;
        return Math.min(100, Math.max(0, prev + variation));
      });
      
      setEngagementLevel(prev => {
        const variation = (Math.random() - 0.5) * 8;
        return Math.min(100, Math.max(0, prev + variation));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const triggerAdaptation = () => {
    setIsAdapting(true);
    setTimeout(() => {
      setCurrentAdaptation({
        difficulty: performanceScore > 85 ? 'harder' : performanceScore < 65 ? 'easier' : 'same',
        format: learningStyles[0].type === 'visual' ? 'video' : 'interactive',
        pace: engagementLevel > 80 ? 'faster' : 'slower',
        examples: performanceScore < 70 ? 5 : 3
      });
      setIsAdapting(false);
    }, 2000);
  };

  const getStyleIcon = (type: string) => {
    switch (type) {
      case 'visual': return Eye;
      case 'auditory': return Headphones;
      case 'kinesthetic': return Hand;
      case 'reading': return Brain;
      default: return Brain;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Brain className="mr-3 h-8 w-8" />
            Adaptive Content Delivery System
          </CardTitle>
          <CardDescription className="text-blue-100">
            AI-powered personalization that adapts to your learning style and performance in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Performance</span>
              </div>
              <div className="text-3xl font-bold">{performanceScore}%</div>
            </div>
            
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Engagement</span>
              </div>
              <div className="text-3xl font-bold">{engagementLevel}%</div>
            </div>
            
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5" />
                <span className="font-semibold">Difficulty</span>
              </div>
              <div className="text-xl font-bold capitalize">{currentDifficulty}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Learning Style Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="mr-2 h-5 w-5 text-blue-500" />
              Learning Style Analysis
            </CardTitle>
            <CardDescription>
              AI-detected preferences based on interaction patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {learningStyles.map((style) => {
                const StyleIcon = getStyleIcon(style.type);
                return (
                  <div key={style.type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <StyleIcon className={`w-5 h-5 text-${style.color}-500`} />
                        <span className="font-medium capitalize">{style.type}</span>
                      </div>
                      <span className="text-sm text-gray-600">{style.percentage}%</span>
                    </div>
                    <Progress value={style.percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">AI Recommendation</h4>
              <p className="text-blue-700 text-sm">
                You're primarily a visual learner. Content will prioritize videos, infographics, 
                and interactive diagrams. Consider engaging with 3D models for complex concepts.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Current Adaptations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5 text-green-500" />
              Active Adaptations
            </CardTitle>
            <CardDescription>
              Real-time adjustments being made to your learning experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Difficulty</label>
                  <div className="text-lg font-semibold capitalize">{currentAdaptation.difficulty}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Content Format</label>
                  <div className="text-lg font-semibold capitalize">{currentAdaptation.format}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Pacing</label>
                  <div className="text-lg font-semibold capitalize">{currentAdaptation.pace}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Examples</label>
                  <div className="text-lg font-semibold">{currentAdaptation.examples}</div>
                </div>
              </div>
              
              <Button 
                onClick={triggerAdaptation}
                disabled={isAdapting}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isAdapting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adapting Content...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Trigger AI Adaptation
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Adaptive Features */}
      <Card>
        <CardHeader>
          <CardTitle>Adaptive Learning Features</CardTitle>
          <CardDescription>
            AI-powered features that personalize your learning experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adaptiveFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  feature.active 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <feature.icon className={`w-6 h-6 mt-1 ${
                    feature.active ? 'text-green-600' : 'text-gray-400'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{feature.name}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                    <Badge 
                      className={`mt-2 ${
                        feature.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {feature.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Adaptation Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Adaptation Rules</CardTitle>
          <CardDescription>
            Conditions that trigger automatic content adjustments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {adaptations.map((adaptation, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{adaptation.trigger}</div>
                  <div className="text-sm text-gray-600">{adaptation.action}</div>
                </div>
                <Badge className={getStatusColor(adaptation.status)}>
                  {adaptation.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaptiveContentDelivery;
