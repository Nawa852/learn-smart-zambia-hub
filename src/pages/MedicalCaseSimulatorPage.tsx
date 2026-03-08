import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Play, CheckCircle, Loader2 } from 'lucide-react';
import { useClinicalCases } from '@/hooks/useClinicalCases';
import { toast } from '@/hooks/use-toast';

const BODY_SYSTEMS = ['Infectious', 'Cardiac', 'Respiratory', 'Endocrine', 'Neurological', 'Gastrointestinal', 'Renal', 'Musculoskeletal', 'Hematological', 'Dermatological'];

const STREAM_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/medical-case-simulator`;

async function streamAI(body: Record<string, string>, onDelta: (t: string) => void) {
  const resp = await fetch(STREAM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: 'AI error' }));
    throw new Error(err.error || 'AI error');
  }
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
      if (json === '[DONE]') return;
      try { const p = JSON.parse(json); const c = p.choices?.[0]?.delta?.content; if (c) onDelta(c); } catch {}
    }
  }
}

const MedicalCaseSimulatorPage = () => {
  const [system, setSystem] = useState('');
  const [caseText, setCaseText] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [feedback, setFeedback] = useState('');
  const [phase, setPhase] = useState<'idle' | 'generating' | 'ready' | 'evaluating' | 'done'>('idle');
  const { addCase } = useClinicalCases();

  const generateCase = async () => {
    setPhase('generating'); setCaseText(''); setFeedback(''); setDiagnosis('');
    try {
      await streamAI({ body_system: system, phase: 'generate' }, (t) => setCaseText(prev => prev + t));
      setPhase('ready');
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
      setPhase('idle');
    }
  };

  const evaluateDiagnosis = async () => {
    if (!diagnosis.trim()) { toast({ title: 'Enter your diagnosis first', variant: 'destructive' }); return; }
    setPhase('evaluating'); setFeedback('');
    try {
      let fullFeedback = '';
      await streamAI({ student_diagnosis: diagnosis, phase: 'evaluate' }, (t) => { fullFeedback += t; setFeedback(prev => prev + t); });
      // Extract score from feedback (look for number after "accuracy" or "score")
      const scoreMatch = fullFeedback.match(/(\d{1,3})(?:\s*(?:\/100|%|out of 100))/i);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : null;
      await addCase({
        condition: diagnosis,
        patient_summary: caseText.slice(0, 500),
        presenting_complaint: null,
        diagnosis,
        outcome: score && score >= 70 ? 'resolved' : 'ongoing',
        body_system: system || 'General',
        accuracy_score: score,
        notes: fullFeedback.slice(0, 1000),
      });
      setPhase('done');
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
      setPhase('ready');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Case Simulator 🧪</h1>
          <p className="text-muted-foreground">Practice clinical reasoning with AI-generated patient scenarios</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Brain className="w-5 h-5 text-primary" /> Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Body System (optional)</label>
              <Select value={system} onValueChange={setSystem}>
                <SelectTrigger><SelectValue placeholder="Random" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Random</SelectItem>
                  {BODY_SYSTEMS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generateCase} disabled={phase === 'generating' || phase === 'evaluating'} className="w-full">
              {phase === 'generating' ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</> : <><Play className="w-4 h-4 mr-2" /> Generate Case</>}
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Patient Case</CardTitle>
            <CardDescription>{phase === 'idle' ? 'Generate a case to begin' : system ? `${system} case` : 'Random case'}</CardDescription>
          </CardHeader>
          <CardContent>
            {caseText ? (
              <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">{caseText}</div>
            ) : (
              <p className="text-muted-foreground italic">No case generated yet. Click "Generate Case" to start.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {(phase === 'ready' || phase === 'evaluating' || phase === 'done') && (
        <Card>
          <CardHeader>
            <CardTitle>Your Diagnosis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea placeholder="Enter your diagnosis and reasoning..." value={diagnosis} onChange={e => setDiagnosis(e.target.value)} rows={3} disabled={phase === 'done'} />
            {phase !== 'done' && (
              <Button onClick={evaluateDiagnosis} disabled={phase === 'evaluating'}>
                {phase === 'evaluating' ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Evaluating...</> : <><CheckCircle className="w-4 h-4 mr-2" /> Submit Diagnosis</>}
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {feedback && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" /> AI Feedback
              {phase === 'done' && <Badge>Saved to Case Log</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">{feedback}</div>
            {phase === 'done' && (
              <Button variant="outline" className="mt-4" onClick={() => { setPhase('idle'); setCaseText(''); setFeedback(''); setDiagnosis(''); }}>
                Start New Case
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MedicalCaseSimulatorPage;
