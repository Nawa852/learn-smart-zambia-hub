
import React, { useState } from 'react';
import { Wand2, FileText, Video, Mic, BookOpen, Brain, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface GeneratedContent {
  id: string;
  type: 'quiz' | 'summary' | 'flashcards' | 'transcript';
  title: string;
  content: string;
  createdAt: Date;
}

const AIContentGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [selectedTopic, setSelectedTopic] = useState('');

  const generateContent = async (type: string) => {
    setIsGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      const newContent: GeneratedContent = {
        id: Date.now().toString(),
        type: type as any,
        title: `AI-Generated ${type} for ${selectedTopic || 'Current Topic'}`,
        content: `This is AI-generated ${type} content. In a real implementation, this would be created using OpenAI or LLaMA APIs.`,
        createdAt: new Date()
      };
      
      setGeneratedContent(prev => [newContent, ...prev]);
      setIsGenerating(false);
    }, 2000);
  };

  const contentTypes = [
    { type: 'quiz', icon: FileText, label: 'Generate Quiz', color: 'blue' },
    { type: 'summary', icon: BookOpen, label: 'Create Summary', color: 'green' },
    { type: 'flashcards', icon: Brain, label: 'Make Flashcards', color: 'purple' },
    { type: 'transcript', icon: Mic, label: 'Transcribe Audio', color: 'orange' }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Wand2 className="w-8 h-8" />
            AI Content Creation Studio
          </CardTitle>
          <CardDescription className="text-indigo-100">
            Powered by OpenAI GPT and LLaMA - Generate educational content instantly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contentTypes.map(({ type, icon: Icon, label, color }) => (
              <Button
                key={type}
                onClick={() => generateContent(type)}
                disabled={isGenerating}
                className="bg-white/20 hover:bg-white/30 backdrop-blur flex flex-col items-center p-6 h-auto"
              >
                <Icon className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">{label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Content Generation Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Topic/Subject</label>
              <input
                type="text"
                placeholder="Enter the topic you want to generate content for..."
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Difficulty Level</label>
              <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>English</option>
                <option>Bemba</option>
                <option>Nyanja</option>
                <option>Tonga</option>
              </select>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">AI Enhancement Features</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Zambian context integration</li>
                <li>• Real-time content adaptation</li>
                <li>• Multi-language support</li>
                <li>• Cultural relevance optimization</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
            <CardDescription>
              Your AI-generated educational materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isGenerating && (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            )}
            
            {generatedContent.length === 0 && !isGenerating && (
              <div className="text-center py-8 text-gray-500">
                <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No content generated yet. Click a button above to start!</p>
              </div>
            )}
            
            <div className="space-y-4">
              {generatedContent.map((content) => (
                <div key={content.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{content.title}</h4>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      {content.type}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{content.content}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Download</Button>
                    <Button size="sm" variant="outline">Share</Button>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIContentGenerator;
