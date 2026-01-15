import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wand2, FileText, HelpCircle, Video, Image, Upload,
  Sparkles, Brain, Play, Pause, Settings, Download,
  RefreshCw, Check, AlertCircle, Loader2, Plus, Eye,
  MessageSquare, Mic, Volume2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AICreatorStudioPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [prompt, setPrompt] = useState('');

  const creatorTools = [
    {
      icon: FileText,
      title: 'Course Generator',
      description: 'Create full courses from a single prompt',
      color: 'bg-blue-500'
    },
    {
      icon: HelpCircle,
      title: 'Quiz Builder',
      description: 'Generate interactive quizzes automatically',
      color: 'bg-green-500'
    },
    {
      icon: Video,
      title: 'Video Creator',
      description: 'AI-powered video lesson generator',
      color: 'bg-purple-500'
    },
    {
      icon: MessageSquare,
      title: 'Avatar Studio',
      description: 'Create lifelike AI teaching avatars',
      color: 'bg-orange-500'
    },
  ];

  const recentCreations = [
    {
      id: 1,
      title: 'Introduction to Algebra',
      type: 'Course',
      status: 'completed',
      created: '2 hours ago',
      modules: 8
    },
    {
      id: 2,
      title: 'Chemistry Quiz Set',
      type: 'Quiz',
      status: 'completed',
      created: '5 hours ago',
      questions: 25
    },
    {
      id: 3,
      title: 'Biology Lesson Video',
      type: 'Video',
      status: 'processing',
      created: '1 hour ago',
      progress: 75
    },
  ];

  const templates = [
    { name: 'ECZ Grade 12 Course', uses: 245 },
    { name: 'Science Lab Guide', uses: 189 },
    { name: 'Language Learning', uses: 156 },
    { name: 'Math Practice Set', uses: 312 },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AI Creator Studio
            </h1>
            <p className="text-muted-foreground mt-1">Generate courses, quizzes, and avatars with AI</p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="w-4 h-4" /> Pro Features Enabled
          </Badge>
        </div>
      </motion.div>

      {/* Quick Tools */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {creatorTools.map((tool, index) => (
          <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className={`w-12 h-12 rounded-xl ${tool.color} bg-opacity-20 flex items-center justify-center mb-4`}>
                <tool.icon className={`w-6 h-6 ${tool.color.replace('bg-', 'text-')}`} />
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Generator */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" />
                AI Content Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="prompt" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="prompt">From Prompt</TabsTrigger>
                  <TabsTrigger value="document">From Document</TabsTrigger>
                  <TabsTrigger value="template">From Template</TabsTrigger>
                </TabsList>

                <TabsContent value="prompt">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Content Type</label>
                      <Select defaultValue="course">
                        <SelectTrigger>
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="course">Full Course</SelectItem>
                          <SelectItem value="lesson">Single Lesson</SelectItem>
                          <SelectItem value="quiz">Quiz Set</SelectItem>
                          <SelectItem value="flashcards">Flashcards</SelectItem>
                          <SelectItem value="video">Video Script</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Subject Area</label>
                      <Select defaultValue="math">
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Describe what you want to create</label>
                      <Textarea 
                        placeholder="E.g., Create a comprehensive course on quadratic equations for Grade 12 students, including video lessons, practice problems, and a final quiz..."
                        className="min-h-[150px]"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-sm font-medium mb-2 block">Grade Level</label>
                        <Select defaultValue="12">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[7, 8, 9, 10, 11, 12].map(grade => (
                              <SelectItem key={grade} value={grade.toString()}>Grade {grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1">
                        <label className="text-sm font-medium mb-2 block">Difficulty</label>
                        <Select defaultValue="intermediate">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {isGenerating && (
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-3 mb-3">
                          <Loader2 className="w-5 h-5 text-primary animate-spin" />
                          <span className="font-medium">Generating content...</span>
                        </div>
                        <Progress value={generationProgress} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-2">
                          {generationProgress < 30 && "Analyzing requirements..."}
                          {generationProgress >= 30 && generationProgress < 60 && "Creating lesson structure..."}
                          {generationProgress >= 60 && generationProgress < 90 && "Generating content..."}
                          {generationProgress >= 90 && "Finalizing..."}
                        </p>
                      </div>
                    )}

                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleGenerate}
                      disabled={isGenerating || !prompt}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" /> Generate Content
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="document">
                  <div className="border-2 border-dashed rounded-lg p-12 text-center">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">Upload a Document</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload a PDF, Word doc, or text file to generate a course
                    </p>
                    <Button>
                      <Upload className="w-4 h-4 mr-2" /> Choose File
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="template">
                  <div className="grid grid-cols-2 gap-4">
                    {templates.map((template, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all cursor-pointer">
                        <CardContent className="p-4">
                          <h3 className="font-medium">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">{template.uses} uses</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Avatar Creator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-primary/30 flex items-center justify-center">
                  <MessageSquare className="w-10 h-10 text-primary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Create a lifelike AI avatar to present your lessons
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Mic className="w-4 h-4 mr-1" /> Voice
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Volume2 className="w-4 h-4 mr-1" /> Preview
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Creations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCreations.map((creation) => (
                  <div key={creation.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        creation.status === 'completed' ? 'bg-green-500/20' : 'bg-orange-500/20'
                      }`}>
                        {creation.status === 'completed' ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{creation.title}</p>
                        <p className="text-xs text-muted-foreground">{creation.type} • {creation.created}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AICreatorStudioPage;
