
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  CheckSquare, 
  GraduationCap,
  Download,
  Share,
  Save,
  Wand2,
  Lightbulb,
  Target,
  Users,
  Calendar
} from 'lucide-react';

const AIContentStudio = () => {
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('');
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const contentTypes = [
    { id: 'quiz', label: 'Interactive Quiz', icon: CheckSquare, description: 'Generate multiple choice and short answer quizzes' },
    { id: 'summary', label: 'Study Summary', icon: FileText, description: 'Create concise summaries of complex topics' },
    { id: 'flashcards', label: 'Flashcards', icon: Brain, description: 'Generate memorization cards for key concepts' },
    { id: 'lesson_plan', label: 'Lesson Plan', icon: GraduationCap, description: 'Complete structured lesson plans for teachers' },
    { id: 'assignment', label: 'Assignment', icon: BookOpen, description: 'Creative assignments and homework tasks' },
    { id: 'explanation', label: 'Concept Explanation', icon: Lightbulb, description: 'Break down difficult concepts step by step' }
  ];

  const subjects = [
    'Mathematics', 'English', 'Science', 'History', 'Geography', 'Physics', 
    'Chemistry', 'Biology', 'Literature', 'Computer Science', 'Art', 'Music'
  ];

  const gradeLevels = Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`);

  const handleGenerate = async () => {
    if (!prompt || !contentType || !subject || !gradeLevel) {
      return;
    }

    setLoading(true);
    // Simulate AI generation
    setTimeout(() => {
      const mockContent = {
        quiz: {
          title: `${subject} Quiz - ${gradeLevel}`,
          questions: [
            {
              question: "What is the main concept we're testing?",
              options: ["Option A", "Option B", "Option C", "Option D"],
              correct: 0
            }
          ]
        },
        summary: {
          title: `${subject} Summary`,
          content: "This is a comprehensive summary of the topic based on your prompt..."
        },
        flashcards: {
          title: `${subject} Flashcards`,
          cards: [
            { front: "Key Term", back: "Definition and explanation" }
          ]
        }
      };

      setGeneratedContent(mockContent[contentType as keyof typeof mockContent] || { title: "Generated Content", content: prompt });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center">
          <Wand2 className="mr-4 h-10 w-10 text-blue-600" />
          AI Content Studio
        </h1>
        <p className="text-xl text-gray-600">
          Generate personalized educational content powered by advanced AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Generation Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                Content Generator
              </CardTitle>
              <CardDescription>
                Describe what you want to create and let AI do the work
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((sub) => (
                        <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">Grade Level</Label>
                  <Select value={gradeLevel} onValueChange={setGradeLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeLevels.map((grade) => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contentType">Content Type</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          <div className="flex items-center">
                            <type.icon className="mr-2 h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt">Content Description</Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe what you want to create. Be as specific as possible for better results..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={loading || !prompt || !contentType || !subject || !gradeLevel}
                className="w-full h-12 text-lg"
              >
                {loading ? (
                  <>
                    <Brain className="mr-2 h-5 w-5 animate-spin" />
                    Generating Content...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Content Display */}
          {generatedContent && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{generatedContent.title}</CardTitle>
                  <CardDescription>Generated content ready for use</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-6 rounded-lg">
                  {contentType === 'quiz' && generatedContent.questions && (
                    <div className="space-y-4">
                      {generatedContent.questions.map((q: any, index: number) => (
                        <div key={index} className="bg-white p-4 rounded border">
                          <h4 className="font-semibold mb-2">{index + 1}. {q.question}</h4>
                          <div className="space-y-1">
                            {q.options.map((option: string, optIndex: number) => (
                              <div key={optIndex} className={`p-2 rounded ${optIndex === q.correct ? 'bg-green-100 border border-green-300' : 'bg-gray-50'}`}>
                                {String.fromCharCode(65 + optIndex)}. {option}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {contentType !== 'quiz' && (
                    <div className="prose max-w-none">
                      <p>{generatedContent.content}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Content Types Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Content Types
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contentTypes.map((type) => (
                <div 
                  key={type.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    contentType === type.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setContentType(type.id)}
                >
                  <div className="flex items-start space-x-3">
                    <type.icon className={`h-5 w-5 mt-0.5 ${contentType === type.id ? 'text-blue-600' : 'text-gray-500'}`} />
                    <div>
                      <h4 className="font-medium">{type.label}</h4>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckSquare className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Math Quiz Created</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Science Summary</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Brain className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">History Flashcards</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Usage Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Content Generated</span>
                  <Badge variant="secondary">127</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Month</span>
                  <Badge variant="secondary">24</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Most Popular</span>
                  <Badge>Quizzes</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIContentStudio;
