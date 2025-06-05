
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, Star, TrendingUp, Target, Clock, Users, 
  Sparkles, BookOpen, Play, Award, Zap
} from "lucide-react";

interface Recommendation {
  id: string;
  type: 'course' | 'skill' | 'practice' | 'review';
  title: string;
  description: string;
  confidence: number;
  reasoning: string;
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

const SmartRecommendations: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'personalized' | 'trending' | 'goals'>('personalized');

  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'course',
      title: 'Advanced JavaScript Patterns',
      description: 'Master design patterns and advanced concepts in JavaScript programming',
      confidence: 92,
      reasoning: 'Based on your completed JavaScript fundamentals and high performance in coding exercises',
      estimatedTime: 8,
      difficulty: 'advanced',
      tags: ['JavaScript', 'Programming', 'Patterns']
    },
    {
      id: '2',
      type: 'skill',
      title: 'Data Visualization with D3.js',
      description: 'Create interactive data visualizations for web applications',
      confidence: 87,
      reasoning: 'Complements your web development skills and matches your visual learning style',
      estimatedTime: 6,
      difficulty: 'intermediate',
      tags: ['Data Viz', 'D3.js', 'Frontend']
    },
    {
      id: '3',
      type: 'practice',
      title: 'Algorithmic Problem Solving',
      description: 'Strengthen your problem-solving skills with coding challenges',
      confidence: 95,
      reasoning: 'Your current weakness in algorithm optimization can be improved with practice',
      estimatedTime: 2,
      difficulty: 'intermediate',
      tags: ['Algorithms', 'Practice', 'Logic']
    }
  ];

  const trendingCourses = [
    {
      id: '4',
      title: 'AI for Zambian Agriculture',
      description: 'Apply machine learning to improve farming practices in Zambia',
      popularity: 95,
      enrollments: 1247,
      tags: ['AI', 'Agriculture', 'Zambia']
    },
    {
      id: '5',
      title: 'Mobile Development with React Native',
      description: 'Build cross-platform mobile apps for African markets',
      popularity: 89,
      enrollments: 856,
      tags: ['Mobile', 'React Native', 'Cross-platform']
    }
  ];

  const goalBasedRecommendations = [
    {
      id: '6',
      title: 'Complete Full-Stack Developer Path',
      description: 'Become a well-rounded developer with front-end and back-end skills',
      progress: 65,
      nextStep: 'Learn Node.js and Express',
      timeToCompletion: '3 months'
    },
    {
      id: '7',
      title: 'Data Science Specialization',
      description: 'Master data analysis, machine learning, and statistical modeling',
      progress: 30,
      nextStep: 'Statistics for Data Science',
      timeToCompletion: '6 months'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'skill': return Star;
      case 'practice': return Target;
      case 'review': return TrendingUp;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-800';
      case 'skill': return 'bg-green-100 text-green-800';
      case 'practice': return 'bg-orange-100 text-orange-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-yellow-600';
      case 'advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Brain className="mr-3 h-8 w-8" />
            AI-Powered Learning Recommendations
          </CardTitle>
          <CardDescription className="text-purple-100">
            Personalized suggestions based on your learning patterns, goals, and preferences
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'personalized', label: 'For You', icon: Sparkles },
          { key: 'trending', label: 'Trending', icon: TrendingUp },
          { key: 'goals', label: 'Goal-Based', icon: Target }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setSelectedTab(key as any)}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md transition-colors ${
              selectedTab === key
                ? 'bg-white shadow-sm text-purple-600 font-medium'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </button>
        ))}
      </div>

      {/* Personalized Recommendations */}
      {selectedTab === 'personalized' && (
        <div className="space-y-4">
          {recommendations.map((rec) => {
            const TypeIcon = getTypeIcon(rec.type);
            return (
              <Card key={rec.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <TypeIcon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{rec.title}</h3>
                        <p className="text-gray-600 mb-3">{rec.description}</p>
                        
                        <div className="flex items-center space-x-4 mb-3">
                          <Badge className={getTypeColor(rec.type)}>
                            {rec.type.charAt(0).toUpperCase() + rec.type.slice(1)}
                          </Badge>
                          <span className={`text-sm font-medium ${getDifficultyColor(rec.difficulty)}`}>
                            {rec.difficulty.charAt(0).toUpperCase() + rec.difficulty.slice(1)}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {rec.estimatedTime}h
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {rec.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center mb-2">
                        <Brain className="w-4 h-4 text-purple-500 mr-1" />
                        <span className="text-sm font-medium">{rec.confidence}% match</span>
                      </div>
                      <Progress value={rec.confidence} className="w-20 h-2" />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Why this recommendation:</strong> {rec.reasoning}
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Play className="w-4 h-4 mr-2" />
                      Start Learning
                    </Button>
                    <Button variant="outline">
                      Save for Later
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Trending Courses */}
      {selectedTab === 'trending' && (
        <div className="space-y-4">
          {trendingCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      <p className="text-gray-600">{course.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">
                    🔥 {course.popularity}% trending
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.enrollments.toLocaleString()} enrolled
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Join Trending Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Goal-Based Recommendations */}
      {selectedTab === 'goals' && (
        <div className="space-y-4">
          {goalBasedRecommendations.map((goal) => (
            <Card key={goal.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Target className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
                      <p className="text-gray-600 mb-4">{goal.description}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-gray-600">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-3" />
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>Next step:</strong> {goal.nextStep}
                          </p>
                          <p className="text-sm text-green-600 mt-1">
                            Estimated completion: {goal.timeToCompletion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Target className="w-4 h-4 mr-2" />
                    Continue Path
                  </Button>
                  <Button variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartRecommendations;
