import React, { useState } from 'react';
import { FileText, Sparkles, Loader2, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const CyberReportWriterPage = () => {
  const [targetName, setTargetName] = useState('');
  const [scope, setScope] = useState('');
  const [findings, setFindings] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    if (!findings.trim()) { toast.error('Enter your findings'); return; }
    setLoading(true);
    setReport('');
    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-lesson-generator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({
          subject: 'Cybersecurity',
          grade: 'Professional',
          topic: `Write a professional penetration test executive summary report for target "${targetName || 'Target System'}". Scope: ${scope || 'Full network assessment'}. Overall severity: ${severity}. Key findings: ${findings}. Include: Executive Summary, Risk Rating, Key Findings table, Recommendations, and Remediation Priority.`,
          duration: 'Full report',
        }),
      });
      if (resp.status === 429) { toast.error('Rate limit. Try again.'); setLoading(false); return; }
      if (!resp.ok || !resp.body) throw new Error('Failed');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = '', text = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buf.indexOf('\n')) !== -1) {
          let line = buf.slice(0, idx); buf = buf.slice(idx + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (!line.startsWith('data: ')) continue;
          const json = line.slice(6).trim();
          if (json === '[DONE]') break;
          try { const c = JSON.parse(json).choices?.[0]?.delta?.content; if (c) { text += c; setReport(text); } } catch {}
        }
      }
    } catch { toast.error('Generation failed'); }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" /> Security Report Writer
        </h1>
        <p className="text-muted-foreground mt-1">AI-assisted penetration test report generation</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Report Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium">Target Name</label><Input placeholder="e.g. Corporate Web App" value={targetName} onChange={e => setTargetName(e.target.value)} /></div>
            <div><label className="text-sm font-medium">Overall Severity</label>
              <Select value={severity} onValueChange={setSeverity}><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{['Critical', 'High', 'Medium', 'Low'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div><label className="text-sm font-medium">Scope</label><Input placeholder="e.g. External network, web application, API endpoints" value={scope} onChange={e => setScope(e.target.value)} /></div>
          <div><label className="text-sm font-medium">Key Findings</label><Textarea placeholder="List your findings, one per line..." rows={5} value={findings} onChange={e => setFindings(e.target.value)} /></div>
          <Button onClick={generateSummary} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
            {loading ? 'Generating...' : 'Generate Executive Summary'}
          </Button>
        </CardContent>
      </Card>

      {report && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Report</span>
              <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(report); toast.success('Copied!'); }}>
                <Copy className="h-4 w-4 mr-1" /> Copy
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent><div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">{report}</div></CardContent>
        </Card>
      )}
    </div>
  );
};

export default CyberReportWriterPage;
