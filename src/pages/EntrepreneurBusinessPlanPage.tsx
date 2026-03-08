import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVentures } from '@/hooks/useVentures';
import { FileText, Loader2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const sectors = ['Agriculture', 'EdTech', 'HealthTech', 'FinTech', 'E-Commerce', 'Manufacturing', 'Tourism', 'Energy', 'Other'];

export default function EntrepreneurBusinessPlanPage() {
  const { ventures } = useVentures();
  const { toast } = useToast();
  const [mode, setMode] = useState<'venture' | 'custom'>('custom');
  const [selectedVenture, setSelectedVenture] = useState('');
  const [name, setName] = useState('');
  const [sector, setSector] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    let reqName = name, reqSector = sector, reqDesc = description;
    if (mode === 'venture' && selectedVenture) {
      const v = ventures.find(v => v.id === selectedVenture);
      if (v) { reqName = v.name; reqSector = v.sector || ''; reqDesc = v.description || ''; }
    }
    if (!reqName) { toast({ title: 'Error', description: 'Please enter a venture name', variant: 'destructive' }); return; }

    setLoading(true);
    setResult('');

    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/business-plan-generator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ name: reqName, sector: reqSector, description: reqDesc }),
      });

      if (!resp.ok) {
        const err = await resp.json();
        toast({ title: 'Error', description: err.error || 'Failed to generate', variant: 'destructive' });
        setLoading(false);
        return;
      }

      const reader = resp.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let content = '';

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
    } catch (e) {
      toast({ title: 'Error', description: 'Network error', variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><FileText className="w-8 h-8" />AI Business Plan Generator</h1>
        <p className="text-muted-foreground">Generate investor-ready business plans for the Zambian market</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Generate Business Plan</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button variant={mode === 'custom' ? 'default' : 'outline'} onClick={() => setMode('custom')}>New Idea</Button>
            <Button variant={mode === 'venture' ? 'default' : 'outline'} onClick={() => setMode('venture')}>From Venture</Button>
          </div>

          {mode === 'venture' ? (
            <Select value={selectedVenture} onValueChange={setSelectedVenture}>
              <SelectTrigger><SelectValue placeholder="Select venture" /></SelectTrigger>
              <SelectContent>{ventures.map(v => <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>)}</SelectContent>
            </Select>
          ) : (
            <>
              <Input placeholder="Business name" value={name} onChange={e => setName(e.target.value)} />
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger><SelectValue placeholder="Sector" /></SelectTrigger>
                <SelectContent>{sectors.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
              <Textarea placeholder="Describe your business idea..." value={description} onChange={e => setDescription(e.target.value)} />
            </>
          )}

          <Button onClick={generate} disabled={loading} className="w-full">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</> : 'Generate Business Plan'}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Business Plan</CardTitle>
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
