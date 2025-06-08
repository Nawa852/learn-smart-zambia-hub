
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, FileText, BookOpen, PenTool, Download, 
  RefreshCw, Lightbulb, CheckCircle, Copy, Star
} from 'lucide-react';

interface GeneratedContent {
  id: string;
  type: 'quiz' | 'flashcards' | 'summary' | 'essay' | 'presentation';
  title: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  createdAt: Date;
}

const AIContentGenerator = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('quiz');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);

  const contentTypes = [
    { value: 'quiz', label: 'Quiz Questions', icon: CheckCircle },
    { value: 'flashcards', label: 'Flashcards', icon: BookOpen },
    { value: 'summary', label: 'Study Summary', icon: FileText },
    { value: 'essay', label: 'Essay Outline', icon: PenTool },
    { value: 'presentation', label: 'Presentation', icon: Star }
  ];

  const sampleContent: GeneratedContent[] = [
    {
      id: '1',
      type: 'quiz',
      title: 'Machine Learning Fundamentals Quiz',
      content: `1. What is supervised learning?
A) Learning without labeled data
B) Learning with labeled training data
C) Learning through reinforcement
D) Learning through clustering

2. Which algorithm is best for classification?
A) Linear Regression
B) K-Means
C) Random Forest
D) PCA

3. What is overfitting?
A) Model performs well on training but poorly on test data
B) Model performs poorly on both training and test data
C) Model is too simple
D) Model has too few parameters`,
      difficulty: 'intermediate',
      estimatedTime: 15,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      type: 'flashcards',
      title: 'React Hooks Flashcards',
      content: `Card 1:
Front: What is useState?
Back: A Hook that lets you add React state to function components

Card 2:
Front: What is useEffect?
Back: A Hook that lets you perform side effects in function components

Card 3:
Front: What is useContext?
Back: A Hook that lets you subscribe to React context without nesting`,
      difficulty: 'beginner',
      estimatedTime: 10,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
    }
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const newContent: GeneratedContent = {
        id: Date.now().toString(),
        type: contentType as any,
        title: `${topic} - ${contentTypes.find(t => t.value === contentType)?.label}`,
        content: `Generated content for ${topic}...\n\nThis would be AI-generated content based on your topic and selected type.`,
        difficulty: difficulty as any,
        estimatedTime: Math.floor(Math.random() * 30) + 5,
        createdAt: new Date()
      };
      
      setGeneratedContent(prev => [newContent, ...prev]);
      setIsGenerating(false);
    }, 2000);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'quiz': return 'bg-blue-100 text-blue-800';
      case 'flashcards': return 'bg-purple-100 text-purple-800';
      case 'summary': return 'bg-orange-100 text-orange-800';
      case 'essay': return 'bg-cyan-100 text-cyan-800';
      case 'presentation': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Brain className="w-8 h-8 mr-3 text-blue-600" />
            AI Content Generator
          </h1>
          <p className="text-gray-600">Create quizzes, flashcards, and study materials instantly</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="generate">Generate Content</TabsTrigger>
          <TabsTrigger value="history">Content History</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Generate New Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Topic or Subject</label>
                <Input
                  placeholder="Enter a topic (e.g., Machine Learning, React Hooks, History of Rome)"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content Type</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {contentTypes.map(type => {
                    const IconComponent = type.icon;
                    return (
                      <Button
                        key={type.value}
                        variant={contentType === type.value ? "default" : "outline"}
                        onClick={() => setContentType(type.value)}
                        className="justify-start h-auto p-3"
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {type.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                <div className="flex gap-2">
                  {['beginner', 'intermediate', 'advanced'].map(level => (
                    <Button
                      key={level}
                      variant={difficulty === level ? "default" : "outline"}
                      onClick={() => setDifficulty(level)}
                      className="capitalize"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={!topic.trim() || isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="grid gap-4">
            {[...generatedContent, ...sampleContent].map(content => (
              <Card key={content.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getTypeColor(content.type)}>
                          {content.type}
                        </Badge>
                        <Badge variant="outline" className={getDifficultyColor(content.difficulty)}>
                          {content.difficulty}
                        </Badge>
                        <Badge variant="secondary">
                          {content.estimatedTime}min
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        Created {content.createdAt.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                      {content.content}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIContentGenerator;
