
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Eye, 
  ThumbsUp, 
  Calendar,
  Brain,
  Target,
  Sparkles,
  Loader2
} from 'lucide-react';

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
  learningTopic?: string;
  difficulty?: string;
}

interface LearningTopic {
  title: string;
  description: string;
  keywords: string;
  difficulty: string;
}

interface PathMetadata {
  topic: string;
  gradeLevel: string;
  subject: string;
  totalVideos: number;
  estimatedHours: number;
}

const AILearningPathGenerator = () => {
  const [topic, setTopic] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [learningTopics, setLearningTopics] = useState<LearningTopic[]>([]);
  const [pathMetadata, setPathMetadata] = useState<PathMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const generateLearningPath = async () => {
    if (!topic.trim() || !gradeLevel || !subject) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to generate a learning path.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to generate learning paths.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Generating learning path for:', { topic, gradeLevel, subject });
      
      const { data, error } = await supabase.functions.invoke('generate-learning-path', {
        body: {
          topic,
          gradeLevel,
          subject
        }
      });

      if (error) {
        console.error('Learning path generation error:', error);
        throw error;
      }

      console.log('Learning path generated:', data);
      
      if (data.videos) {
        setVideos(data.videos);
      }
      
      if (data.learningTopics) {
        setLearningTopics(data.learningTopics);
      }
      
      if (data.pathMetadata) {
        setPathMetadata(data.pathMetadata);
      }

      toast({
        title: "Learning Path Generated!",
        description: `Found ${data.videos?.length || 0} educational videos for your learning journey.`,
      });

    } catch (error: any) {
      console.error('Error generating learning path:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate learning path. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatViewCount = (count: string) => {
    const num = parseInt(count);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return count;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI Learning Path Generator
          </CardTitle>
          <CardDescription>
            Generate personalized learning paths with curated educational videos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Learning Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., Algebra, Biology, History"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grade">Grade Level</Label>
              <Select value={gradeLevel} onValueChange={setGradeLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                    <SelectItem key={grade} value={`Grade ${grade}`}>
                      Grade {grade}
                    </SelectItem>
                  ))}
                  <SelectItem value="University">University</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject Area</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Geography">Geography</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={generateLearningPath}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Learning Path...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Learning Path
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Path Overview */}
      {pathMetadata && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Learning Path Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{pathMetadata.totalVideos}</div>
                <div className="text-sm text-gray-600">Videos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{pathMetadata.estimatedHours}h</div>
                <div className="text-sm text-gray-600">Study Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{pathMetadata.gradeLevel}</div>
                <div className="text-sm text-gray-600">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{pathMetadata.subject}</div>
                <div className="text-sm text-gray-600">Subject</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Learning Topics */}
      {learningTopics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Learning Journey</CardTitle>
            <CardDescription>
              Topics covered in your personalized learning path
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {learningTopics.map((topic, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{topic.title}</h4>
                    <p className="text-sm text-gray-600">{topic.description}</p>
                  </div>
                  <Badge variant="outline">{topic.difficulty}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Video Results */}
      {videos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Play className="h-5 w-5 text-red-600" />
            Curated Learning Videos ({videos.length})
          </h3>
          
          <div className="grid gap-4">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-lg line-clamp-2">
                          {video.title}
                        </h4>
                        {video.difficulty && (
                          <Badge variant="secondary">{video.difficulty}</Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {video.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {video.channelTitle}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {video.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {formatViewCount(video.viewCount)} views
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {formatViewCount(video.likeCount)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {formatDate(video.publishedAt)}
                        </div>
                        
                        <Button
                          onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank')}
                          size="sm"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Watch Video
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && videos.length === 0 && pathMetadata === null && (
        <Card>
          <CardContent className="text-center py-12">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Ready to Generate Your Learning Path?
            </h3>
            <p className="text-gray-600 mb-4">
              Enter your learning topic, grade level, and subject to get started with AI-powered educational content.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AILearningPathGenerator;
