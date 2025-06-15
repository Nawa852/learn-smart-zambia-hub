
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Play, Clock, BookOpen, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  channelTitle: string;
  publishedAt: string;
  tags: string[];
  learningTopic: string;
  difficulty: string;
}

interface PathMetadata {
  topic: string;
  gradeLevel: string;
  subject: string;
  totalVideos: number;
  estimatedHours: number;
}

const LearningPathGenerator = () => {
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [pathMetadata, setPathMetadata] = useState<PathMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const gradeLevels = [
    'Primary School (Grades 1-7)',
    'Junior Secondary (Grades 8-9)',
    'Senior Secondary (Grades 10-12)',
    'University Level',
    'Adult Learning'
  ];

  const subjects = [
    'Mathematics',
    'Science',
    'English',
    'Social Studies',
    'Computer Science',
    'Business Studies',
    'Arts',
    'Languages'
  ];

  const generateLearningPath = async () => {
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a learning topic",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-learning-path', {
        body: {
          topic: topic,
          gradeLevel: gradeLevel,
          subject: subject,
          userId: 'current-user'
        }
      });

      if (error) {
        console.error('Learning path generation error:', error);
        throw new Error(error.message || 'Failed to generate learning path');
      }

      if (data && data.videos) {
        setVideos(data.videos);
        setPathMetadata(data.pathMetadata);
        toast({
          title: "Success",
          description: `Generated learning path with ${data.videos.length} videos`,
        });
      } else {
        setVideos([]);
        setPathMetadata(null);
        toast({
          title: "No Results",
          description: "Could not generate learning path for this topic",
        });
      }
    } catch (error) {
      console.error('Error generating learning path:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate learning path",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Learning Path Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Enter learning topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            
            <Select value={gradeLevel} onValueChange={setGradeLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select grade level" />
              </SelectTrigger>
              <SelectContent>
                {gradeLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subj) => (
                  <SelectItem key={subj} value={subj}>
                    {subj}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={generateLearningPath} disabled={isLoading} className="w-full">
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Target className="w-4 h-4 mr-2" />
            )}
            Generate Learning Path
          </Button>
        </CardContent>
      </Card>

      {pathMetadata && (
        <Card>
          <CardHeader>
            <CardTitle>Learning Path Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{pathMetadata.totalVideos}</div>
                <div className="text-sm text-gray-600">Videos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{pathMetadata.estimatedHours}h</div>
                <div className="text-sm text-gray-600">Est. Time</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-600">{pathMetadata.gradeLevel}</div>
                <div className="text-sm text-gray-600">Level</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-orange-600">{pathMetadata.subject}</div>
                <div className="text-sm text-gray-600">Subject</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {videos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Your Personalized Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {videos.map((video, index) => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="flex gap-4 p-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold">
                        {index + 1}
                      </div>
                      
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-48 h-36 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg cursor-pointer">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                        <Badge className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white">
                          {video.duration}
                        </Badge>
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(video.difficulty)}>
                            {video.difficulty}
                          </Badge>
                          <Badge variant="outline">
                            {video.learningTopic}
                          </Badge>
                        </div>
                        
                        <h3 className="font-semibold text-lg line-clamp-2">{video.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {video.duration}
                          </span>
                          <span className="text-blue-600 font-medium">
                            {video.channelTitle}
                          </span>
                        </div>
                        
                        <Button
                          size="sm"
                          onClick={() => window.open(`https://youtube.com/watch?v=${video.id}`, '_blank')}
                          className="mt-2"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LearningPathGenerator;
