import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Play, Eye, ThumbsUp, Video, Wrench, Code, TrendingUp, PenTool } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VideoResult {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  channelTitle: string;
}

const topics = [
  { label: 'Excel & Spreadsheets', query: 'Excel tutorial for beginners complete course', icon: Wrench },
  { label: 'Public Speaking', query: 'public speaking skills tutorial tips', icon: PenTool },
  { label: 'Data Analysis', query: 'data analysis for beginners python tutorial', icon: TrendingUp },
  { label: 'Web Development', query: 'web development full course beginner 2024', icon: Code },
  { label: 'Resume Writing', query: 'how to write a resume that gets interviews', icon: PenTool },
  { label: 'Time Management', query: 'time management productivity tips tutorial', icon: Wrench },
];

export default function SkillsVideoPage() {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<VideoResult[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('youtube-search', {
        body: { query: q + ' skills tutorial', maxResults: 12 },
      });
      if (error) throw error;
      setVideos(data?.videos || []);
      if (!data?.videos?.length) toast({ title: 'No results found' });
    } catch {
      toast({ title: 'Error', description: 'Search failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><Video className="w-8 h-8 text-primary" /> Skills Video Library</h1>
        <p className="text-muted-foreground">Free video tutorials to build practical skills</p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <Button key={t.label} variant="outline" size="sm" onClick={() => { setQuery(t.query); search(t.query); }} disabled={loading} className="gap-1">
                <t.icon className="w-3 h-3" />{t.label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Search skill tutorials..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && search(query)} />
            <Button onClick={() => search(query)} disabled={loading}><Search className="w-4 h-4" /></Button>
          </div>
        </CardContent>
      </Card>

      {videos.length > 0 && (
        <ScrollArea className="h-[600px]">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <Card key={v.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => window.open(`https://youtube.com/watch?v=${v.id}`, '_blank')}>
                <div className="relative">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-40 object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  {v.duration && <Badge className="absolute bottom-2 right-2 bg-black/75 text-white">{v.duration}</Badge>}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-2">{v.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{v.channelTitle}</p>
                  <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{parseInt(v.viewCount || '0').toLocaleString()}</span>
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{parseInt(v.likeCount || '0').toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
