import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVentures } from '@/hooks/useVentures';
import { Presentation, Loader2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function EntrepreneurPitchDeckPage() {
  const { ventures } = useVentures();
  const { toast } = useToast();
  const [selectedVenture, setSelectedVenture] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    const v = ventures.find(v => v.id === selectedVenture);
    if (!v) { toast({ title: 'Error', description: 'Select a venture first', variant: 'destructive' }); return; }

    setLoading(true);
    setResult('');

    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/pitch-deck-generator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ name: v.name, sector: v.sector, stage: v.stage, description: v.description, funding_amount: v.funding_amount }),
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
        <h1 className="text-3xl font-bold flex items-center gap-2"><Presentation className="w-8 h-8" />AI Pitch Deck Creator</h1>
        <p className="text-muted-foreground">Generate investor-ready pitch content from your ventures</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Select Venture</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedVenture} onValueChange={setSelectedVenture}>
            <SelectTrigger><SelectValue placeholder="Choose a venture" /></SelectTrigger>
            <SelectContent>{ventures.map(v => <SelectItem key={v.id} value={v.id}>{v.name} ({v.stage})</SelectItem>)}</SelectContent>
          </Select>
          <Button onClick={generate} disabled={loading || !selectedVenture} className="w-full">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</> : 'Generate Pitch Deck'}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pitch Deck Content</CardTitle>
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
