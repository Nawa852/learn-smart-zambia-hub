import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, FileText, Download, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';

const SUBJECTS = ['Mathematics', 'English Language', 'Biology', 'Chemistry', 'Physics', 'Geography', 'History', 'Civic Education', 'Religious Education', 'Computer Studies', 'Commerce', 'Principles of Accounts', 'Agricultural Science'];
const GRADES = ['Grade 7', 'Grade 9', 'Grade 12'];

const AIExamPaperGenerator = () => {
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [paper, setPaper] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  const generate = async () => {
    if (!subject || !grade) return toast({ title: 'Select subject and grade', variant: 'destructive' });
    setLoading(true);
    setPaper('');

    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-exam-generator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ subject, grade, topic, paperType: 'full', questionCount: 40 }),
      });

      if (!resp.ok || !resp.body) throw new Error('Failed to generate');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buf.indexOf('\n')) !== -1) {
          let line = buf.slice(0, idx);
          buf = buf.slice(idx + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (!line.startsWith('data: ')) continue;
          const json = line.slice(6).trim();
          if (json === '[DONE]') break;
          try {
            const c = JSON.parse(json).choices?.[0]?.delta?.content;
            if (c) { full += c; setPaper(full); }
          } catch {}
        }
      }
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const downloadPaper = () => {
    const blob = new Blob([paper], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subject}_${grade}_Exam_Paper.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <Card className="border-border/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-primary" />
            AI Exam Paper Generator
          </CardTitle>
          <p className="text-xs text-muted-foreground">Generate full ECZ-style exam papers with marking schemes</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Grade Level</Label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger><SelectValue placeholder="Select grade" /></SelectTrigger>
                <SelectContent>
                  {GRADES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Topic (optional)</Label>
              <Input placeholder="e.g. Quadratic Equations" value={topic} onChange={e => setTopic(e.target.value)} />
            </div>
          </div>
          <Button onClick={generate} disabled={loading} className="w-full gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? 'Generating Paper...' : 'Generate Exam Paper'}
          </Button>
        </CardContent>
      </Card>

      {paper && (
        <Card className="border-border/30">
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm">Generated Paper</CardTitle>
            <Button size="sm" variant="outline" onClick={downloadPaper} className="gap-1.5">
              <Download className="w-3.5 h-3.5" /> Download
            </Button>
          </CardHeader>
          <CardContent ref={resultRef}>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{paper}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIExamPaperGenerator;
