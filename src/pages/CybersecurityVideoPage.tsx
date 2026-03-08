import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Play, Eye, ThumbsUp, Shield, Bug, Lock, Terminal, Wifi } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const topics = [
  { label: 'Ethical Hacking', query: 'ethical hacking full course beginner 2024', icon: Bug },
  { label: 'Kali Linux', query: 'kali linux tutorial complete beginner', icon: Terminal },
  { label: 'Web Hacking', query: 'web application hacking tutorial OWASP', icon: Shield },
  { label: 'Network Security', query: 'network security fundamentals tutorial', icon: Wifi },
  { label: 'CTF Walkthrough', query: 'capture the flag CTF walkthrough tutorial', icon: Lock },
  { label: 'Bug Bounty', query: 'bug bounty hunting tutorial beginners', icon: Bug },
];

export default function CybersecurityVideoPage() {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('youtube-search', {
        body: { query: q + ' cybersecurity', maxResults: 12 },
      });
      if (error) throw error;
      setVideos(data?.videos || []);
    } catch {
      toast({ title: 'Error', description: 'Search failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><Shield className="w-8 h-8 text-primary" /> Cyber Video Academy</h1>
        <p className="text-muted-foreground">Learn cybersecurity from top YouTube channels</p>
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
            <Input placeholder="Search cybersecurity tutorials..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && search(query)} />
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
    </div>
  );
}
