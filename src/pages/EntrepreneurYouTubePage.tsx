import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Play, Clock, Eye, ThumbsUp, Youtube, BookOpen, TrendingUp, Lightbulb } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

const curatedTopics = [
  { label: 'Business Plan Writing', query: 'how to write a business plan step by step tutorial', icon: BookOpen },
  { label: 'Startup Funding', query: 'startup funding for beginners Africa', icon: TrendingUp },
  { label: 'Pitch Deck Creation', query: 'how to create investor pitch deck tutorial', icon: Lightbulb },
  { label: 'Financial Modeling', query: 'business financial modeling for startups tutorial', icon: TrendingUp },
  { label: 'Market Research', query: 'how to do market research for small business', icon: Search },
  { label: 'Lean Startup', query: 'lean startup methodology tutorial for beginners', icon: Lightbulb },
];

export default function EntrepreneurYouTubePage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTag, setActiveTag] = useState('');

  const searchVideos = async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);
    setActiveTag(query);
    try {
      const { data, error } = await supabase.functions.invoke('youtube-search', {
        body: { query: query + ' business entrepreneurship', maxResults: 12 },
      });
      if (error) throw error;
      if (data?.videos) {
        setVideos(data.videos);
        toast({ title: 'Success', description: `Found ${data.videos.length} videos` });
      } else {
        setVideos([]);
        toast({ title: 'No Results', description: 'No videos found' });
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to search videos', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Youtube className="w-8 h-8 text-destructive" />
          Business Video Academy
        </h1>
        <p className="text-muted-foreground">Learn business skills from top YouTube tutorials — curated for entrepreneurs</p>
      </div>

      {/* Quick Topic Chips */}
      <Card>
        <CardHeader><CardTitle className="text-lg">🔥 Popular Business Topics</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {curatedTopics.map((topic) => (
              <Button
                key={topic.label}
                variant={activeTag === topic.query ? 'default' : 'outline'}
                size="sm"
                onClick={() => { setSearchQuery(topic.query); searchVideos(topic.query); }}
                disabled={isLoading}
                className="gap-1"
              >
                <topic.icon className="w-3 h-3" />
                {topic.label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Search business tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchVideos(searchQuery)}
              className="flex-1"
            />
            <Button onClick={() => searchVideos(searchQuery)} disabled={isLoading}>
              {isLoading ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {videos.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Results ({videos.length} videos)</CardTitle></CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => window.open(`https://youtube.com/watch?v=${video.id}`, '_blank')}>
                    <div className="relative">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                      {video.duration && (
                        <Badge className="absolute bottom-2 right-2 bg-black/75 text-white">{video.duration}</Badge>
                      )}
                    </div>
                    <CardContent className="p-3 space-y-1">
                      <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
                      <p className="text-xs text-muted-foreground">{video.channelTitle}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{parseInt(video.viewCount || '0').toLocaleString()}</span>
                        <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{parseInt(video.likeCount || '0').toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {videos.length === 0 && !isLoading && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Youtube className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
            <h3 className="text-lg font-semibold mb-2">Discover Business Tutorials</h3>
            <p className="text-muted-foreground mb-4">Click a topic above or search to find the best business education videos</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
