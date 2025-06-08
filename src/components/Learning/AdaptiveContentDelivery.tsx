
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, BookOpen, Target, Clock, PlayCircle, 
  CheckCircle, Star, TrendingUp, Zap, Lightbulb,
  Headphones, FileText, Video, Image, PenTool
} from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  type: 'video' | 'text' | 'interactive' | 'quiz' | 'project';
  difficulty: number;
  estimatedTime: number;
  completed: boolean;
  adaptedFor: string;
  content: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
}

interface LearnerProfile {
  name: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  difficultyPreference: 'gradual' | 'challenging' | 'mixed';
  timeAvailable: number;
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  strengths: string[];
  weaknesses: string[];
}

const AdaptiveContentDelivery = () => {
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile>({
    name: 'Nawa Brighton',
    learningStyle: 'visual',
    difficultyPreference: 'gradual',
    timeAvailable: 30,
    currentLevel: 'intermediate',
    strengths: ['Problem Solving', 'Critical Thinking', 'Programming'],
    weaknesses: ['Time Management', 'Advanced Mathematics']
  });

  const [currentModule, setCurrentModule] = useState<LearningModule | null>(null);
  const [adaptedModules, setAdaptedModules] = useState<LearningModule[]>([]);
  const [isAdapting, setIsAdapting] = useState(false);
  const [progressData, setProgressData] = useState({
    overallProgress: 65,
    weeklyGoal: 80,
    streak: 7,
    totalTime: 42
  });

  const mockModules: LearningModule[] = [
    {
      id: '1',
      title: 'Introduction to Machine Learning Concepts',
      type: 'video',
      difficulty: 3,
      estimatedTime: 25,
      completed: false,
      adaptedFor: 'Visual learner with intermediate level',
      content: 'Interactive video with visual diagrams and real-world examples',
      learningStyle: 'visual'
    },
    {
      id: '2',
      title: 'Hands-on: Build Your First Neural Network',
      type: 'interactive',
      difficulty: 4,
      estimatedTime: 45,
      completed: false,
      adaptedFor: 'Kinesthetic learning with step-by-step guidance',
      content: 'Interactive coding environment with guided practice',
      learningStyle: 'kinesthetic'
    },
    {
      id: '3',
      title: 'Understanding AI Ethics Through Case Studies',
      type: 'text',
      difficulty: 2,
      estimatedTime: 20,
      completed: false,
      adaptedFor: 'Reading/writing learner with structured content',
      content: 'Comprehensive text with interactive elements and quizzes',
      learningStyle: 'reading'
    }
  ];

  useEffect(() => {
    // Simulate AI adaptation
    setIsAdapting(true);
    setTimeout(() => {
      const adapted = mockModules.map(module => ({
        ...module,
        adaptedFor: `Optimized for ${learnerProfile.learningStyle} learner`,
        difficulty: learnerProfile.currentLevel === 'beginner' ? Math.max(1, module.difficulty - 1) :
                   learnerProfile.currentLevel === 'advanced' ? Math.min(5, module.difficulty + 1) :
                   module.difficulty
      }));
      setAdaptedModules(adapted);
      setCurrentModule(adapted[0]);
      setIsAdapting(false);
    }, 2000);
  }, [learnerProfile]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'text': return <FileText className="w-5 h-5" />;
      case 'interactive': return <PenTool className="w-5 h-5" />;
      case 'quiz': return <Target className="w-5 h-5" />;
      case 'project': return <Lightbulb className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getLearningStyleIcon = (style: string) => {
    switch (style) {
      case 'visual': return <Image className="w-4 h-4" />;
      case 'auditory': return <Headphones className="w-4 h-4" />;
      case 'kinesthetic': return <PenTool className="w-4 h-4" />;
      case 'reading': return <FileText className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const startModule = (module: LearningModule) => {
    setCurrentModule(module);
  };

  const completeModule = (moduleId: string) => {
    setAdaptedModules(prev => 
      prev.map(module => 
        module.id === moduleId ? { ...module, completed: true } : module
      )
    );
    setProgressData(prev => ({
      ...prev,
      overallProgress: Math.min(100, prev.overallProgress + 15)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="w-8 h-8" />
            Adaptive Learning Engine
          </CardTitle>
          <p className="text-purple-100">
            AI-powered content that adapts to your learning style, pace, and preferences
          </p>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Learner Profile & Progress */}
        <div className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-600" />
                Learning Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-gray-600">{progressData.overallProgress}%</span>
                </div>
                <Progress value={progressData.overallProgress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{progressData.streak}</div>
                  <p className="text-xs text-blue-700">Day Streak</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{progressData.totalTime}h</div>
                  <p className="text-xs text-green-700">This Week</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Learning Style:</span>
                  <Badge className="flex items-center gap-1">
                    {getLearningStyleIcon(learnerProfile.learningStyle)}
                    {learnerProfile.learningStyle}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Level:</span>
                  <Badge variant="outline">{learnerProfile.currentLevel}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Daily Goal:</span>
                  <span className="text-sm font-medium">{learnerProfile.timeAvailable} min</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Strengths:</p>
                <div className="flex flex-wrap gap-1">
                  {learnerProfile.strengths.map((strength) => (
                    <Badge key={strength} variant="secondary" className="text-xs">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Adaptation Status */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-600" />
                AI Adaptation
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isAdapting ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Personalizing content...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Content adapted for your style</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Difficulty optimized</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Schedule personalized</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Adaptive Content */}
        <div className="lg:col-span-2 space-y-4">
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="current">Current Module</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-4">
              {currentModule && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {getTypeIcon(currentModule.type)}
                          {currentModule.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{currentModule.adaptedFor}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge>
                          {currentModule.estimatedTime} min
                        </Badge>
                        <Badge variant="outline">
                          Level {currentModule.difficulty}/5
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">AI-Adapted Content</h4>
                      <p className="text-sm text-gray-700">{currentModule.content}</p>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Learning
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => completeModule(currentModule.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              {adaptedModules.filter(m => !m.completed && m.id !== currentModule?.id).map((module) => (
                <Card key={module.id} className="border-0 shadow hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(module.type)}
                        <div>
                          <h4 className="font-medium">{module.title}</h4>
                          <p className="text-sm text-gray-600">{module.adaptedFor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{module.estimatedTime} min</Badge>
                        <Button size="sm" onClick={() => startModule(module)}>
                          Start
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {adaptedModules.filter(m => m.completed).map((module) => (
                <Card key={module.id} className="border-0 shadow bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <h4 className="font-medium text-green-800">{module.title}</h4>
                          <p className="text-sm text-green-600">Completed successfully</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveContentDelivery;
