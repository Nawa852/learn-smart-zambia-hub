import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Globe, Loader2, Copy, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function EntrepreneurMarketResearchPage() {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const research = async () => {
    if (!query) return;
    setLoading(true);
    setResult('');

    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/market-research-assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ query }),
      });

      if (!resp.ok) {
        const err = await resp.json();
        toast({ title: 'Error', description: err.error || 'Failed', variant: 'destructive' });
        setLoading(false);
        return;
      }

      const reader = resp.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '', content = '';

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (!line.startsWith('data: ')) continue;
          const json = line.slice(6).trim();
          if (json === '[DONE]') break;
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) { content += delta; setResult(content); }
          } catch {}
        }
      }
    } catch {
      toast({ title: 'Error', description: 'Network error', variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><Globe className="w-8 h-8" />AI Market Research</h1>
        <p className="text-muted-foreground">Get Zambian market intelligence powered by AI</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Research a Market</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="e.g. AgriTech, Mobile Money, Solar Energy in Zambia..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && research()} className="flex-1" />
            <Button onClick={research} disabled={loading || !query}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {['AgriTech', 'Mobile Money', 'Solar Energy', 'E-Commerce', 'Healthcare', 'EdTech'].map(s => (
              <Button key={s} variant="outline" size="sm" onClick={() => { setQuery(s); }}>{s}</Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Market Intelligence: {query}</CardTitle>
              <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(result); toast({ title: 'Copied!' }); }}>
                <Copy className="w-4 h-4 mr-1" />Copy
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">{result}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
