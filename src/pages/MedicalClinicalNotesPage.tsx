import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Loader2, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const STREAM_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/medical-notes-generator`;

const MedicalClinicalNotesPage = () => {
  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!subjective && !objective && !assessment && !plan) {
      toast({ title: 'Enter at least one SOAP field', variant: 'destructive' }); return;
    }
    setLoading(true); setResult('');
    try {
      const resp = await fetch(STREAM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ subjective, objective, assessment, plan }),
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({ title: 'Copied to clipboard' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><FileText className="w-8 h-8 text-primary" /> Clinical Notes Generator 📋</h1>
        <p className="text-muted-foreground">AI-assisted SOAP note documentation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-sm">Subjective</CardTitle></CardHeader>
          <CardContent><Textarea placeholder="Patient's complaints, history..." value={subjective} onChange={e => setSubjective(e.target.value)} rows={3} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Objective</CardTitle></CardHeader>
          <CardContent><Textarea placeholder="Vitals, exam findings..." value={objective} onChange={e => setObjective(e.target.value)} rows={3} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Assessment</CardTitle></CardHeader>
          <CardContent><Textarea placeholder="Diagnosis, differential..." value={assessment} onChange={e => setAssessment(e.target.value)} rows={3} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Plan</CardTitle></CardHeader>
          <CardContent><Textarea placeholder="Treatment plan, follow-up..." value={plan} onChange={e => setPlan(e.target.value)} rows={3} /></CardContent>
        </Card>
      </div>

      <Button onClick={generate} disabled={loading} className="w-full md:w-auto">
        {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</> : <><FileText className="w-4 h-4 mr-2" /> Generate Clinical Note</>}
      </Button>

      {result && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated SOAP Note</CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}><Copy className="w-4 h-4 mr-1" /> Copy</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">{result}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MedicalClinicalNotesPage;
