import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pill, Search, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const STREAM_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/medical-drug-reference`;

const MedicalDrugReferencePage = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true); setResult('');
    try {
      const resp = await fetch(STREAM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ drug_name: query }),
      });
      if (!resp.ok) { const e = await resp.json().catch(() => ({})); throw new Error(e.error || 'Error'); }
      const reader = resp.body!.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buf.indexOf('\n')) !== -1) {
          let line = buf.slice(0, idx); buf = buf.slice(idx + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (!line.startsWith('data: ')) continue;
          const json = line.slice(6).trim();
          if (json === '[DONE]') break;
          try { const p = JSON.parse(json); const c = p.choices?.[0]?.delta?.content; if (c) setResult(prev => prev + c); } catch {}
        }
      }
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><Pill className="w-8 h-8 text-primary" /> Drug Reference 💊</h1>
        <p className="text-muted-foreground">AI-powered pharmacology database with Zambian formulary context</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Search Drug</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="e.g. Metformin, Amoxicillin, Artemether..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && search()} />
            <Button onClick={search} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader><CardTitle>Results for "{query}"</CardTitle></CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">{result}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MedicalDrugReferencePage;
