
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Brain, BookOpen, Target, TrendingUp, Users, Clock, 
  Star, Play, CheckCircle, ArrowRight, Lightbulb, Zap
} from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'course' | 'skill' | 'mentor' | 'project' | 'event';
  title: string;
  description: string;
  confidence: number;
  reason: string;
  image?: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
}

const SmartRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  const mockRecommendations: Recommendation[] = [
    {
      id: '1',
      type: 'course',
      title: 'Advanced Machine Learning with Python',
      description: 'Deep dive into neural networks, reinforcement learning, and AI applications',
      confidence: 92,
      reason: 'Based on your recent completion of Python Fundamentals and interest in AI',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      tags: ['AI', 'Python', 'Machine Learning', 'Data Science'],
      difficulty: 'advanced',
      estimatedTime: '8 weeks'
    },
    {
      id: '2',
      type: 'mentor',
      title: 'Dr. Sarah Chen - AI Research Specialist',
      description: 'PhD in Computer Science, 10+ years in AI research at Google',
      confidence: 88,
      reason: 'Perfect match for your AI learning goals and research interests',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b2c8c9b2?w=300',
      tags: ['AI', 'Research', 'Python', 'Career Guidance'],
      difficulty: 'advanced',
      estimatedTime: '1-2 hours/week'
    },
    {
      id: '3',
      type: 'project',
      title: 'Build a Personal AI Assistant',
      description: 'Create your own AI chatbot using OpenAI API and deploy it',
      confidence: 85,
      reason: 'Practical application of your current AI knowledge',
      tags: ['Project', 'AI', 'API', 'Deployment'],
      difficulty: 'intermediate',
      estimatedTime: '3-4 weeks'
    },
    {
      id: '4',
      type: 'skill',
      title: 'Natural Language Processing',
      description: 'Master text analysis, sentiment analysis, and language models',
      confidence: 90,
      reason: 'Next logical step in your AI learning journey',
      tags: ['NLP', 'Text Analysis', 'AI', 'Python'],
      difficulty: 'intermediate',
      estimatedTime: '6 weeks'
    },
    {
      id: '5',
      type: 'event',
      title: 'AI Ethics Workshop - Next Week',
      description: 'Interactive workshop on responsible AI development and ethics',
      confidence: 76,
      reason: 'Important complement to your technical AI studies',
      tags: ['Ethics', 'AI', 'Workshop', 'Live Session'],
      difficulty: 'beginner',
      estimatedTime: '2 hours'
    }
  ];

  useEffect(() => {
    // Simulate AI recommendation loading
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 1500);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-5 h-5" />;
      case 'mentor': return <Users className="w-5 h-5" />;
      case 'project': return <Target className="w-5 h-5" />;
      case 'skill': return <Brain className="w-5 h-5" />;
      case 'event': return <Clock className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-700';
      case 'mentor': return 'bg-green-100 text-green-700';
      case 'project': return 'bg-purple-100 text-purple-700';
      case 'skill': return 'bg-orange-100 text-orange-700';
      case 'event': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.type === selectedCategory);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Brain className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-pulse" />
            <p className="text-gray-600">AI is analyzing your learning pattern...</p>
            <div className="w-32 h-2 bg-gray-200 rounded-full mx-auto mt-4 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Zap className="w-8 h-8" />
            AI-Powered Recommendations
          </CardTitle>
          <p className="text-blue-100">
            Personalized suggestions based on your learning patterns, goals, and interests
          </p>
        </CardHeader>
      </Card>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'course', 'skill', 'mentor', 'project', 'event'].map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category === 'all' ? 'All Recommendations' : `${category}s`}
          </Button>
        ))}
      </div>

      {/* Recommendations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecommendations.map((rec) => (
          <Card key={rec.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg ${getTypeColor(rec.type)}`}>
                  {getTypeIcon(rec.type)}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4" />
                    {rec.confidence}% match
                  </div>
                  <Progress value={rec.confidence} className="w-16 h-2 mt-1" />
                </div>
              </div>
              <CardTitle className="text-lg">{rec.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {rec.image && rec.type === 'mentor' && (
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={rec.image} alt={rec.title} />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Available for mentoring</p>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      Verified Expert
                    </div>
                  </div>
                </div>
              )}
              
              <p className="text-gray-600 text-sm">{rec.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Difficulty:</span>
                  <Badge className={getDifficultyColor(rec.difficulty)} variant="outline">
                    {rec.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-medium">{rec.estimatedTime}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {rec.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {rec.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{rec.tags.length - 3} more
                  </Badge>
                )}
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-700 font-medium">Why this recommendation?</p>
                <p className="text-xs text-blue-600 mt-1">{rec.reason}</p>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Start Learning
                </Button>
                <Button variant="outline" size="icon">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            AI Learning Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">87%</div>
              <p className="text-sm text-green-700">Course Completion Rate</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <p className="text-sm text-blue-700">Skills Acquired This Month</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">5.2hrs</div>
              <p className="text-sm text-purple-700">Avg. Daily Learning Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartRecommendations;
