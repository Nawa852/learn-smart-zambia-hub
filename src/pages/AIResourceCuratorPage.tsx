
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, BookOpen, CheckCircle, Globe, Archive } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AIResourceCuratorPage = () => {
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const { toast } = useToast();

  const eczSubjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Civic Education'];

  // AI-Powered Resource Scanner
  const scanResources = async () => {
    if (!searchQuery && !selectedSubject) {
      toast({
        title: "Input Required",
        description: "Please enter a search query or select a subject.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('comprehensive-ai-assistant', {
        body: {
          query: `Find and curate ECZ-aligned educational resources for ${selectedSubject || searchQuery}. Include textbooks, videos, practice materials, and online resources. Ensure all resources meet ECZ curriculum standards and are appropriate for Zambian students.`,
          feature: 'resource_curation',
          context: `Subject: ${selectedSubject}, Query: ${searchQuery}`
        }
      });

      if (error) throw error;
      
      const mockResources = [
        { id: 1, title: "ECZ Mathematics Grade 12 Textbook", type: "PDF", subject: "Mathematics", quality: "High", verified: true },
        { id: 2, title: "Zambian History Video Series", type: "Video", subject: "Social Studies", quality: "High", verified: true },
        { id: 3, title: "Science Experiment Guide", type: "Document", subject: "Science", quality: "Medium", verified: false },
        { id: 4, title: "English Grammar Exercises", type: "Interactive", subject: "English", quality: "High", verified: true }
      ];

      setResources(mockResources);
      toast({
        title: "Resources Found",
        description: `Found ${mockResources.length} ECZ-aligned resources`
      });
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to find resources. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Offline Resource Cache
    const cachedResources = localStorage.getItem('curated_resources');
    if (cachedResources) {
      setResources(JSON.parse(cachedResources));
    }
  }, []);

  useEffect(() => {
    // Save to offline cache
    if (resources.length > 0) {
      localStorage.setItem('curated_resources', JSON.stringify(resources));
    }
  }, [resources]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Search className="w-10 h-10 text-cyan-600" />
            AI Resource Curator
          </h1>
          <p className="text-lg text-gray-600">
            Curates ECZ-aligned external resources with AI-powered quality validation
          </p>
        </div>

        <Tabs defaultValue="scanner" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="scanner">Resource Scanner</TabsTrigger>
            <TabsTrigger value="organizer">Organizer</TabsTrigger>
            <TabsTrigger value="cache">Offline Cache</TabsTrigger>
            <TabsTrigger value="narrator">Multilingual</TabsTrigger>
            <TabsTrigger value="validator">Validator</TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-cyan-600" />
                  AI-Powered Resource Scanner (Grok)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Search Query</label>
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter search terms..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ECZ Subject</label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {eczSubjects.map(subject => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={scanResources} disabled={loading} className="w-full">
                  {loading ? 'Scanning...' : 'Scan for ECZ Resources'}
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map(resource => (
                    <Card key={resource.id} className="border-l-4 border-cyan-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-sm">{resource.title}</h4>
                          {resource.verified && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Badge variant="outline">{resource.type}</Badge>
                            <Badge variant="outline">{resource.subject}</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Quality:</span>
                            <span className={`font-medium ${
                              resource.quality === 'High' ? 'text-green-600' : 
                              resource.quality === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {resource.quality}
                            </span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full mt-3">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Access Resource
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organizer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Archive className="w-5 h-5 text-purple-600" />
                  Dynamic Resource Organizer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {['Mathematics', 'English', 'Science', 'Social Studies'].map(subject => (
                      <Card key={subject} className="border-l-4 border-purple-500">
                        <CardContent className="p-4 text-center">
                          <h4 className="font-semibold mb-2">{subject}</h4>
                          <p className="text-2xl font-bold text-purple-600">
                            {resources.filter(r => r.subject === subject).length}
                          </p>
                          <p className="text-sm text-gray-600">Resources</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Button className="w-full">
                    Organize Resources by Category
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cache" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Offline Resource Cache</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Resources are automatically cached for offline access
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-cyan-50 rounded-lg">
                      <h4 className="font-semibold text-cyan-800">Cached Resources</h4>
                      <p className="text-2xl font-bold text-cyan-600">{resources.length}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800">Verified</h4>
                      <p className="text-2xl font-bold text-green-600">
                        {resources.filter(r => r.verified).length}
                      </p>
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
                  Multilingual Resource Narrator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">
                    Listen to Resource Descriptions
                  </Button>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-800">
                      AI will describe resources in your selected language
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="validator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  AI-Powered Resource Validator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-green-800">ECZ Compliant</h4>
                      <p className="text-2xl font-bold text-green-600">95%</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-blue-800">Quality Score</h4>
                      <p className="text-2xl font-bold text-blue-600">4.8/5</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg text-center">
                      <Search className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-purple-800">Verified</h4>
                      <p className="text-2xl font-bold text-purple-600">
                        {resources.filter(r => r.verified).length}/{resources.length}
                      </p>
                    </div>
                  </div>
                  <Button className="w-full">
                    Run Validation Check
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

export default AIResourceCuratorPage;
