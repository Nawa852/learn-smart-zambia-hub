import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Play, Eye, ThumbsUp, BookOpen, GraduationCap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const eczSubjects = [
  { label: 'Mathematics', query: 'Zambia ECZ Mathematics grade 12 tutorial', icon: BookOpen },
  { label: 'Science', query: 'Zambia ECZ Science biology chemistry physics tutorial', icon: BookOpen },
  { label: 'English', query: 'ECZ English language comprehension essay writing tutorial', icon: BookOpen },
  { label: 'Computer Studies', query: 'ECZ computer studies programming tutorial Zambia', icon: BookOpen },
  { label: 'Business Studies', query: 'ECZ business studies commerce tutorial Zambia', icon: BookOpen },
  { label: 'Agriculture', query: 'Zambia agriculture science farming tutorial ECZ', icon: BookOpen },
  { label: 'Civic Education', query: 'Zambia civic education government tutorial', icon: BookOpen },
  { label: 'History', query: 'Zambia history ECZ past papers tutorial', icon: BookOpen },
];

export default function StudentVideoHubPage() {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('youtube-search', {
        body: { query: q, maxResults: 12 },
      });
      if (error) throw error;
      setVideos(data?.videos || []);
      if (!data?.videos?.length) toast({ title: 'No videos found' });
    } catch {
      toast({ title: 'Error', description: 'Search failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" /> ECZ Video Learning Hub
        </h1>
        <p className="text-muted-foreground">YouTube tutorials aligned with the Zambian ECZ curriculum</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">📚 Browse by Subject</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {eczSubjects.map((s) => (
              <Button key={s.label} variant="outline" size="sm" onClick={() => { setQuery(s.query); search(s.query); }} disabled={loading}>
                {s.label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Search ECZ study videos..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && search(query)} />
            <Button onClick={() => search(query)} disabled={loading}><Search className="w-4 h-4" /></Button>
          </div>
        </CardContent>
      </Card>

      {videos.length > 0 && (
        <ScrollArea className="h-[600px]">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((v: any) => (
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

      {videos.length === 0 && !loading && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
            <h3 className="text-lg font-semibold mb-2">Study with YouTube</h3>
            <p className="text-muted-foreground">Select a subject above to find ECZ-aligned video tutorials</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
