
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Map, Users, BookOpen, Target, Globe, Zap, Heart, Star, MessageSquare, Calendar, Upload, TrendingUp, Lightbulb, Mic } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AICurriculumMapperPage = () => {
  const [loading, setLoading] = useState(false);
  const [paths, setPaths] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [studentGoals, setStudentGoals] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const { toast } = useToast();

  const eczSubjects = [
    'Mathematics', 'English', 'Science', 'Social Studies', 'Civic Education',
    'Religious Education', 'Physical Education', 'Art', 'Music', 'Home Economics'
  ];

  const languages = ['English', 'Bemba', 'Nyanja', 'Tonga', 'Lozi', 'Lunda', 'Kaonde', 'Luvale'];

  // AI-Powered Curriculum Analyzer
  const analyzeCurriculum = async () => {
    if (!selectedSubject || !studentGoals) {
      toast({
        title: "Input Required",
        description: "Please select a subject and enter student goals.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('comprehensive-ai-assistant', {
        body: {
          query: `Map ECZ ${selectedSubject} curriculum to student goals: ${studentGoals}. Create a personalized learning path with specific topics, competencies, and assessment criteria aligned with Zambian educational standards.`,
          feature: 'curriculum_mapping',
          context: `Subject: ${selectedSubject}, Goals: ${studentGoals}`
        }
      });

      if (error) throw error;
      
      setAnalysisResult(data.response);
      toast({
        title: "Curriculum Analysis Complete",
        description: "AI has mapped your ECZ curriculum to student goals."
      });
    } catch (error) {
      toast({
        title: "Analysis Error",
        description: "Failed to analyze curriculum. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Path Visualizer
  const visualizePath = () => {
    const mockPaths = [
      { id: 1, subject: selectedSubject, completion: 75, topics: ['Topic 1', 'Topic 2', 'Topic 3'] },
      { id: 2, subject: selectedSubject, completion: 45, topics: ['Topic 4', 'Topic 5'] },
      { id: 3, subject: selectedSubject, completion: 90, topics: ['Topic 6', 'Topic 7', 'Topic 8'] }
    ];
    setPaths(mockPaths);
  };

  useEffect(() => {
    // Offline Path Cache
    const cachedPaths = localStorage.getItem('ecz_curriculum_paths');
    if (cachedPaths) {
      setPaths(JSON.parse(cachedPaths));
    }
  }, []);

  useEffect(() => {
    // Save to offline cache
    if (paths.length > 0) {
      localStorage.setItem('ecz_curriculum_paths', JSON.stringify(paths));
    }
  }, [paths]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Brain className="w-10 h-10 text-blue-600" />
            AI Curriculum Mapper
          </h1>
          <p className="text-lg text-gray-600">
            Maps ECZ subjects to personalized learning paths with AI-powered analysis
          </p>
        </div>

        <Tabs defaultValue="analyzer" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="analyzer">AI Analyzer</TabsTrigger>
            <TabsTrigger value="visualizer">Path Visualizer</TabsTrigger>
            <TabsTrigger value="cache">Offline Cache</TabsTrigger>
            <TabsTrigger value="narrator">Multilingual</TabsTrigger>
            <TabsTrigger value="recommender">Recommender</TabsTrigger>
          </TabsList>

          <TabsContent value="analyzer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  AI-Powered Curriculum Analyzer (Grok)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">ECZ Subject</label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ECZ subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {eczSubjects.map(subject => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Student Goals</label>
                    <Textarea
                      value={studentGoals}
                      onChange={(e) => setStudentGoals(e.target.value)}
                      placeholder="Enter specific learning goals and objectives..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                <Button onClick={analyzeCurriculum} disabled={loading} className="w-full">
                  {loading ? 'Analyzing...' : 'Analyze Curriculum'}
                </Button>
                {analysisResult && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Analysis Result:</h4>
                    <p className="text-sm text-gray-700">{analysisResult}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visualizer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5 text-green-600" />
                  Dynamic Path Visualizer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={visualizePath} className="mb-4">
                  Generate Path Visualization
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paths.map(path => (
                    <Card key={path.id} className="border-l-4 border-green-500">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">{path.subject} Path</h4>
                        <Progress value={path.completion} className="mb-2" />
                        <p className="text-sm text-gray-600">{path.completion}% Complete</p>
                        <div className="mt-2">
                          {path.topics.map(topic => (
                            <Badge key={topic} variant="outline" className="mr-1 mb-1">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cache" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-purple-600" />
                  Offline Path Cache
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Your learning paths are automatically cached for offline access.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800">Cached Paths</h4>
                      <p className="text-2xl font-bold text-green-600">{paths.length}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Sync Status</h4>
                      <p className="text-sm text-blue-600">Up to date</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="narrator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-orange-600" />
                  Multilingual Path Narrator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Language</label>
                    <Select defaultValue="English">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map(lang => (
                          <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Mic className="w-4 h-4 mr-2" />
                    Listen to Path Narration
                  </Button>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-800">
                      AI narrator will explain your learning paths in your selected language
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommender" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  AI-Powered Path Recommender
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-l-4 border-yellow-500">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Recommended Path 1</h4>
                        <p className="text-sm text-gray-600">ECZ Mathematics - Advanced Level</p>
                        <Badge className="mt-2">High Priority</Badge>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-blue-500">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Recommended Path 2</h4>
                        <p className="text-sm text-gray-600">ECZ Science - Laboratory Skills</p>
                        <Badge variant="outline" className="mt-2">Medium Priority</Badge>
                      </CardContent>
                    </Card>
                  </div>
                  <Button className="w-full">
                    Get More Recommendations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AICurriculumMapperPage;
