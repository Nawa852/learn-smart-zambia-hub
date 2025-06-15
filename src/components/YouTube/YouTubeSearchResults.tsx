
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Play, Clock, Eye, ThumbsUp, Download } from 'lucide-react';
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
}

const YouTubeSearchResults = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gradeLevel, setGradeLevel] = useState('');
  const [subject, setSubject] = useState('');

  const searchVideos = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('youtube-search', {
        body: {
          query: searchQuery,
          gradeLevel: gradeLevel,
          subject: subject,
          maxResults: 20
        }
      });

      if (error) {
        console.error('YouTube search error:', error);
        throw new Error(error.message || 'Failed to search videos');
      }

      if (data && data.videos) {
        setVideos(data.videos);
        toast({
          title: "Success",
          description: `Found ${data.videos.length} educational videos`,
        });
      } else {
        setVideos([]);
        toast({
          title: "No Results",
          description: "No videos found for your search query",
        });
      }
    } catch (error) {
      console.error('Error searching videos:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to search videos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateNotes = async (video: Video) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-pdf-notes', {
        body: {
          videoId: video.id,
          title: video.title,
          description: video.description,
          userId: 'current-user'
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Study notes generated successfully!",
      });
    } catch (error) {
      console.error('Error generating notes:', error);
      toast({
        title: "Error",
        description: "Failed to generate notes",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchVideos();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            YouTube Educational Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search for educational videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={searchVideos} disabled={isLoading}>
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Grade level (optional)"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Subject (optional)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {videos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results ({videos.length} videos)</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="grid gap-4">
                {videos.map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="flex gap-4 p-4">
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
                        <h3 className="font-semibold text-lg line-clamp-2">{video.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-3">{video.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {parseInt(video.viewCount).toLocaleString()} views
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {parseInt(video.likeCount).toLocaleString()} likes
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(video.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-600">
                            {video.channelTitle}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`https://youtube.com/watch?v=${video.id}`, '_blank')}
                            >
                              <Play className="w-4 h-4 mr-1" />
                              Watch
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => generateNotes(video)}
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Notes
                            </Button>
                          </div>
                        </div>
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

export default YouTubeSearchResults;
