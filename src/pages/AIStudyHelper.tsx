
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Upload, 
  FileText, 
  MessageCircle, 
  Calendar,
  BookOpen,
  Target,
  CheckCircle,
  Clock,
  TrendingUp,
  Lightbulb,
  HelpCircle,
  PenTool,
  Search
} from 'lucide-react';

const AIStudyHelper = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [question, setQuestion] = useState('');
  const [studyPlan, setStudyPlan] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File uploaded:', file.name);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    const newMessage = { type: 'user', content: question, timestamp: new Date() };
    setChatMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        content: `Here's a detailed explanation of "${question}": This concept involves multiple components that work together...`,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 2000);
    
    setQuestion('');
  };

  const generateStudyPlan = () => {
    setLoading(true);
    setTimeout(() => {
      setStudyPlan({
        subject: 'Mathematics',
        duration: '2 weeks',
        sessions: [
          {
            day: 1,
            topic: 'Algebra Basics',
            duration: '45 mins',
            activities: ['Review fundamentals', 'Practice problems', 'Take quiz']
          },
          {
            day: 2,
            topic: 'Linear Equations',
            duration: '60 mins',
            activities: ['Learn concepts', 'Solve examples', 'Homework practice']
          }
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center">
          <Brain className="mr-4 h-10 w-10 text-blue-600" />
          AI Study Helper
        </h1>
        <p className="text-xl text-gray-600">
          Upload your materials and get personalized AI assistance for studying, planning, and understanding
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload" className="flex items-center">
            <Upload className="mr-2 h-4 w-4" />
            Upload Materials
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center">
            <MessageCircle className="mr-2 h-4 w-4" />
            AI Tutor Chat
          </TabsTrigger>
          <TabsTrigger value="plan" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Study Plans
          </TabsTrigger>
          <TabsTrigger value="homework" className="flex items-center">
            <PenTool className="mr-2 h-4 w-4" />
            Homework Help
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Study Materials
                </CardTitle>
                <CardDescription>
                  Upload textbooks, notes, worksheets, or any study materials for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your files</h3>
                  <p className="text-gray-600 mb-4">
                    Support for PDF, DOC, TXT, and image files up to 10MB
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button className="w-full">Choose Files</Button>
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label>Or paste your text content:</Label>
                  <Textarea
                    placeholder="Paste your study content here for AI analysis..."
                    rows={6}
                    className="resize-none"
                  />
                  <Button className="w-full">
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze Content
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Your Study Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Mathematics Textbook Ch.5', type: 'PDF', size: '2.4 MB', status: 'Analyzed' },
                    { name: 'Physics Notes - Motion', type: 'DOC', size: '1.1 MB', status: 'Processing' },
                    { name: 'Chemistry Worksheet', type: 'PDF', size: '856 KB', status: 'Analyzed' }
                  ].map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.type} • {file.size}</p>
                        </div>
                      </div>
                      <Badge variant={file.status === 'Analyzed' ? 'default' : 'secondary'}>
                        {file.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    AI Tutor Chat
                  </CardTitle>
                  <CardDescription>
                    Ask questions about your study materials and get detailed explanations
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {chatMessages.length === 0 && (
                      <div className="text-center py-8">
                        <Brain className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-500">Start a conversation with your AI tutor</p>
                      </div>
                    )}
                    {chatMessages.map((message, index) => (
                      <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 px-4 py-2 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                            <span className="text-sm text-gray-600">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask a question about your study materials..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                      className="flex-1"
                    />
                    <Button onClick={handleAskQuestion} disabled={!question.trim() || loading}>
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Explain Concept
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Create Quiz
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="mr-2 h-4 w-4" />
                    Practice Problems
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="mr-2 h-4 w-4" />
                    Find Examples
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Study Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <p>Break complex topics into smaller parts</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <p>Use active recall when reviewing</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <p>Practice regularly with spaced repetition</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="plan" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Generate Study Plan
                </CardTitle>
                <CardDescription>
                  Create a personalized study schedule based on your materials and goals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input placeholder="e.g., Mathematics" />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input placeholder="e.g., 2 weeks" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Study Goals</Label>
                  <Textarea placeholder="What do you want to achieve? Describe your learning objectives..." rows={3} />
                </div>
                <Button onClick={generateStudyPlan} disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Brain className="mr-2 h-4 w-4 animate-spin" />
                      Generating Plan...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Generate Study Plan
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {studyPlan && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2 h-5 w-5" />
                    Your Study Plan
                  </CardTitle>
                  <CardDescription>
                    {studyPlan.subject} • {studyPlan.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studyPlan.sessions.map((session: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Day {session.day}: {session.topic}</h4>
                          <Badge variant="outline">{session.duration}</Badge>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {session.activities.map((activity: string, actIndex: number) => (
                            <li key={actIndex} className="flex items-center">
                              <CheckCircle className="mr-2 h-3 w-3" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="homework" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PenTool className="mr-2 h-5 w-5" />
                Homework Help
              </CardTitle>
              <CardDescription>
                Get step-by-step help with your homework problems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Upload homework image or describe the problem</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Upload an image of your homework problem</p>
                  <input type="file" className="hidden" id="homework-upload" accept="image/*" />
                  <Label htmlFor="homework-upload" className="cursor-pointer">
                    <Button variant="outline" className="mt-2">Choose Image</Button>
                  </Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Or type your question</Label>
                <Textarea placeholder="Describe your homework problem here..." rows={4} />
              </div>
              <Button className="w-full">
                <HelpCircle className="mr-2 h-4 w-4" />
                Get Help
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIStudyHelper;
