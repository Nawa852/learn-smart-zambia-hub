
import React, { useState, useEffect } from 'react';
import { Brain, Target, TrendingUp, Zap, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimatedCounter from '@/components/UI/AnimatedCounter';

interface LearningPath {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  topics: string[];
  aiRecommendation: number;
}

const AdaptiveLearningEngine: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<LearningPath | null>(null);
  const [learningStyle, setLearningStyle] = useState<string>('visual');
  const [adaptationLevel, setAdaptationLevel] = useState(85);

  const learningPaths: LearningPath[] = [
    {
      id: '1',
      title: 'AI-Powered Mathematics Mastery',
      difficulty: 'intermediate',
      estimatedTime: 120,
      topics: ['Algebra', 'Calculus', 'Statistics', 'Machine Learning Math'],
      aiRecommendation: 92
    },
    {
      id: '2',
      title: 'Zambian History & Culture Deep Dive',
      difficulty: 'beginner',
      estimatedTime: 90,
      topics: ['Independence', 'Traditions', 'Languages', 'Modern Zambia'],
      aiRecommendation: 88
    },
    {
      id: '3',
      title: 'Advanced Programming with AI',
      difficulty: 'advanced',
      estimatedTime: 180,
      topics: ['Python', 'React', 'AI/ML', 'Cloud Computing'],
      aiRecommendation: 95
    }
  ];

  useEffect(() => {
    // Simulate AI adaptation in real-time
    const interval = setInterval(() => {
      setAdaptationLevel(prev => {
        const variation = (Math.random() - 0.5) * 5;
        return Math.min(100, Math.max(70, prev + variation));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="w-8 h-8" />
            AI Adaptive Learning Engine
          </CardTitle>
          <CardDescription className="text-purple-100">
            Powered by advanced machine learning algorithms and personalized for Zambian learners
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5" />
                <span className="font-semibold">Adaptation Level</span>
              </div>
              <AnimatedCounter 
                end={adaptationLevel} 
                duration={1000} 
                suffix="%" 
                className="text-3xl font-bold"
              />
            </div>
            
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Learning Efficiency</span>
              </div>
              <AnimatedCounter 
                end={78} 
                duration={1500} 
                suffix="%" 
                className="text-3xl font-bold"
              />
            </div>
            
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Time Saved</span>
              </div>
              <AnimatedCounter 
                end={45} 
                duration={2000} 
                suffix=" min" 
                className="text-3xl font-bold"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              AI-Recommended Learning Paths
            </CardTitle>
            <CardDescription>
              Curated specifically for your learning style and goals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {learningPaths.map((path) => (
              <div 
                key={path.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setCurrentPath(path)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-lg">{path.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
                    {path.difficulty}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {path.estimatedTime} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {path.aiRecommendation}% match
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {path.topics.map((topic, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Style Analysis</CardTitle>
            <CardDescription>
              AI-detected preferences based on your interaction patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Visual Learning</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-600">75%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Auditory Learning</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div className="w-1/2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-600">50%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Kinesthetic Learning</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div className="w-2/3 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-600">65%</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">AI Recommendation</h4>
                <p className="text-blue-700 text-sm">
                  Based on your learning patterns, we recommend incorporating more 3D visualizations 
                  and interactive content. Consider using our VR modules for better retention.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {currentPath && (
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-purple-800">Selected Learning Path</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-purple-900">{currentPath.title}</h3>
                <p className="text-purple-700">Estimated completion: {currentPath.estimatedTime} minutes</p>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Start Learning Journey
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdaptiveLearningEngine;
