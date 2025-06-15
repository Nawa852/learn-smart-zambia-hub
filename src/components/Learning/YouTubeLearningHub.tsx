
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Play, Search, Download, BookOpen, Star, Clock, 
  Eye, ThumbsUp, FileText, Trophy, Coins
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';

interface YouTubeVideo {
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
}

interface LearningPath {
  id: string;
  title: string;
  videos: YouTubeVideo[];
  difficulty: string;
  subject: string;
  estimatedHours: number;
}

const YouTubeLearningHub = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [gradeLevel, setGradeLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userCoins, setUserCoins] = useState(100);
  const [userLevel, setUserLevel] = useState(1);
  const [userXP, setUserXP] = useState(0);

  const searchVideos = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('youtube-search', {
        body: {
          query: searchQuery,
          gradeLevel,
          subject,
          maxResults: 20
        }
      });

      if (error) throw error;
      setVideos(data.videos || []);
    } catch (error) {
      console.error('Error searching videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateLearningPath = async (topic: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-learning-path', {
        body: {
          topic,
          gradeLevel,
          subject,
          userId: user?.id
        }
      });

      if (error) throw error;
      
      const newPath: LearningPath = {
        id: Date.now().toString(),
        title: `Learning Path: ${topic}`,
        videos: data.videos || [],
        difficulty: gradeLevel || 'intermediate',
        subject: subject || 'general',
        estimatedHours: Math.ceil(data.videos?.length * 0.5) || 5
      };
      
      setLearningPaths([newPath, ...learningPaths]);
      earnXP(50, 'Created learning path');
    } catch (error) {
      console.error('Error generating learning path:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateNotesPDF = async (video: YouTubeVideo) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-pdf-notes', {
        body: {
          videoId: video.id,
          title: video.title,
          description: video.description,
          userId: user?.id
        }
      });

      if (error) throw error;

      // Create download link for PDF
      const blob = new Blob([data.pdfBuffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${video.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_notes.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);

      earnXP(25, 'Downloaded study notes');
      spendCoins(10);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const earnXP = (amount: number, action: string) => {
    setUserXP(prev => {
      const newXP = prev + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      if (newLevel > userLevel) {
        setUserLevel(newLevel);
        setUserCoins(prev => prev + 50); // Bonus coins for leveling up
      }
      return newXP;
    });
  };

  const spendCoins = (amount: number) => {
    setUserCoins(prev => Math.max(0, prev - amount));
  };

  const formatNumber = (num: string) => {
    const n = parseInt(num);
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  return (
    <div className="space-y-6">
      {/* User Progress Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Level {userLevel} Scholar</h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  <span>{userXP} XP</span>
                </div>
                <div className="flex items-center gap-1">
                  <Coins className="w-4 h-4" />
                  <span>{userCoins} EduCoins</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Progress to Level {userLevel + 1}</p>
              <div className="w-32 h-2 bg-white/20 rounded-full mt-1">
                <div 
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${(userXP % 100)}%` }}
                />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-6 h-6 text-red-600" />
            YouTube Learning Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Input
              placeholder="Search educational videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchVideos()}
              className="md:col-span-2"
            />
            <Select value={gradeLevel} onValueChange={setGradeLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Grade Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grade1-3">Grade 1-3</SelectItem>
                <SelectItem value="grade4-6">Grade 4-6</SelectItem>
                <SelectItem value="grade7-9">Grade 7-9</SelectItem>
                <SelectItem value="grade10-12">Grade 10-12</SelectItem>
                <SelectItem value="university">University</SelectItem>
              </SelectContent>
            </Select>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="geography">Geography</SelectItem>
                <SelectItem value="coding">Programming</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={searchVideos} disabled={isLoading} className="flex-1">
              <Search className="w-4 h-4 mr-2" />
              {isLoading ? 'Searching...' : 'Search Videos'}
            </Button>
            <Button 
              onClick={() => generateLearningPath(searchQuery)}
              variant="outline"
              disabled={isLoading || !searchQuery.trim()}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Create Learning Path
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Learning Paths */}
      {learningPaths.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Learning Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {learningPaths.map((path) => (
                <Card key={path.id} className="border-2 border-dashed border-purple-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{path.title}</h3>
                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                      <span>{path.videos.length} videos</span>
                      <span>{path.estimatedHours}h</span>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline">{path.difficulty}</Badge>
                      <Badge variant="outline">{path.subject}</Badge>
                    </div>
                    <Button size="sm" className="w-full">
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Video Results */}
      {videos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Educational Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <Card key={video.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-200 relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {formatNumber(video.viewCount)}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {formatNumber(video.likeCount)}
                          </span>
                        </div>
                        <span>{video.channelTitle}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => setSelectedVideo(video)}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Watch
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => generateNotesPDF(video)}
                          disabled={userCoins < 10}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default YouTubeLearningHub;
