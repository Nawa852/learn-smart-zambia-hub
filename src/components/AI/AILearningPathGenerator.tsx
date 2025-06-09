
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, Target, BookOpen, Clock, Star, 
  ArrowRight, Lightbulb, TrendingUp, Zap
} from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  modules: string[];
  prerequisites: string[];
  aiConfidence: number;
  adaptiveLevel: number;
}

const AILearningPathGenerator = () => {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSkillLevel, setCurrentSkillLevel] = useState('intermediate');

  const mockPaths: LearningPath[] = [
    {
      id: '1',
      title: 'AI-Powered Full Stack Development',
      description: 'Master modern web development with AI tools and methodologies',
      difficulty: 'intermediate',
      estimatedTime: '12 weeks',
      modules: ['React Fundamentals', 'AI-Assisted Coding', 'Backend APIs', 'Database Design', 'Deployment'],
      prerequisites: ['Basic Programming', 'JavaScript'],
      aiConfidence: 94,
      adaptiveLevel: 85
    },
    {
      id: '2',
      title: 'Data Science for Zambian Agriculture',
      description: 'Apply data science to solve agricultural challenges in Zambia',
      difficulty: 'advanced',
      estimatedTime: '16 weeks',
      modules: ['Python Basics', 'Data Analysis', 'Machine Learning', 'Agricultural Data', 'Policy Impact'],
      prerequisites: ['Statistics', 'Basic Math'],
      aiConfidence: 88,
      adaptiveLevel: 78
    },
    {
      id: '3',
      title: 'Digital Marketing with AI Tools',
      description: 'Leverage AI for modern marketing strategies and automation',
      difficulty: 'beginner',
      estimatedTime: '8 weeks',
      modules: ['Marketing Basics', 'AI Content Creation', 'Social Media', 'Analytics', 'Automation'],
      prerequisites: [],
      aiConfidence: 91,
      adaptiveLevel: 92
    }
  ];

  useEffect(() => {
    setLearningPaths(mockPaths);
  }, []);

  const generateNewPath = async () => {
    setIsGenerating(true);
    
    // Simulate AI path generation
    setTimeout(() => {
      const newPath: LearningPath = {
        id: Date.now().toString(),
        title: `Personalized ${selectedGoal} Learning Journey`,
        description: `Custom AI-generated path based on your goals and current skill level`,
        difficulty: currentSkillLevel as any,
        estimatedTime: '10-14 weeks',
        modules: ['Foundation', 'Intermediate Concepts', 'Advanced Applications', 'Real-world Projects'],
        prerequisites: currentSkillLevel === 'beginner' ? [] : ['Basic Knowledge'],
        aiConfidence: Math.floor(Math.random() * 20) + 80,
        adaptiveLevel: Math.floor(Math.random() * 30) + 70
      };
      
      setLearningPaths(prev => [newPath, ...prev]);
      setIsGenerating(false);
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="w-8 h-8" />
            AI Learning Path Generator
          </CardTitle>
          <p className="text-purple-100">
            Personalized learning journeys powered by advanced AI algorithms
          </p>
        </CardHeader>
      </Card>

      {/* Path Generation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Generate New Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Learning Goal</label>
            <input
              type="text"
              placeholder="e.g., Web Development, Data Science, AI/ML"
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Current Skill Level</label>
            <div className="flex gap-2">
              {['beginner', 'intermediate', 'advanced'].map(level => (
                <Button
                  key={level}
                  variant={currentSkillLevel === level ? "default" : "outline"}
                  onClick={() => setCurrentSkillLevel(level)}
                  className="capitalize"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={generateNewPath}
            disabled={!selectedGoal.trim() || isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-spin" />
                AI is generating your path...
              </>
            ) : (
              <>
                <Lightbulb className="w-4 h-4 mr-2" />
                Generate AI Learning Path
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Learning Paths */}
      <div className="grid gap-6">
        {learningPaths.map((path) => (
          <Card key={path.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                  <p className="text-gray-600 mb-3">{path.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {path.estimatedTime}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4" />
                      {path.aiConfidence}% AI match
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Learning Modules</h4>
                  <div className="flex flex-wrap gap-2">
                    {path.modules.map((module, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {index + 1}. {module}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {path.prerequisites.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Prerequisites</h4>
                    <div className="flex flex-wrap gap-2">
                      {path.prerequisites.map((prereq, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {prereq}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Adaptive Learning Level</span>
                    <span className="text-sm text-gray-600">{path.adaptiveLevel}%</span>
                  </div>
                  <Progress value={path.adaptiveLevel} className="h-2" />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Start Learning Path
                  </Button>
                  <Button variant="outline">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AILearningPathGenerator;
