import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Upload, FileText, Layers, Brain, ListChecks, Network, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';

const OUTPUT_TYPES = [
  { id: 'notes', label: 'Study Notes', icon: FileText, desc: 'Comprehensive structured notes' },
  { id: 'flashcards', label: 'Flashcards', icon: Layers, desc: 'Q&A flashcards for revision' },
  { id: 'summary', label: 'Summary', icon: Brain, desc: 'Concise key takeaways' },
  { id: 'quiz', label: 'Quiz', icon: ListChecks, desc: 'Practice questions with answers' },
  { id: 'mindmap', label: 'Mind Map', icon: Network, desc: 'Topic hierarchy outline' },
];

const AIDocumentAnalyzer = () => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [outputType, setOutputType] = useState('notes');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    
    if (file.type === 'text/plain' || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
      const text = await file.text();
      setContent(text);
    } else {
      toast({ title: 'Paste your content', description: 'For PDFs and images, copy-paste the text content into the text area.' });
    }
  }, [toast]);

  const analyze = async () => {
    if (!content.trim()) return toast({ title: 'Add content first', variant: 'destructive' });
    setLoading(true);
    setResult('');

    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-document-analyzer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ content, outputType, subject, grade }),
      });

      if (!resp.ok || !resp.body) throw new Error('Failed to analyze');

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
            if (c) { full += c; setResult(full); }
          } catch {}
        }
      }
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <Card className="border-border/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Upload className="w-5 h-5 text-primary" />
            AI Document Analyzer
          </CardTitle>
          <p className="text-xs text-muted-foreground">Upload or paste content to instantly generate notes, flashcards, quizzes & more</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Upload or Paste Content</Label>
            <div className="flex gap-2 mb-2">
              <label className="flex-1">
                <input type="file" accept=".txt,.md,.csv" className="hidden" onChange={handleFileUpload} />
                <Button variant="outline" className="w-full gap-2 pointer-events-none" tabIndex={-1}>
                  <Upload className="w-4 h-4" />
                  {fileName || 'Upload File'}
                </Button>
              </label>
              <div className="grid grid-cols-2 gap-2 flex-1">
                <Input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
                <Input placeholder="Grade" value={grade} onChange={e => setGrade(e.target.value)} />
              </div>
            </div>
            <Textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Paste your notes, textbook content, lecture transcript, or any study material here..."
              className="min-h-[120px] text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Output Type</Label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {OUTPUT_TYPES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setOutputType(t.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs transition-all ${
                    outputType === t.id
                      ? 'border-primary bg-primary/8 text-primary'
                      : 'border-border/30 text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  <t.icon className="w-4 h-4" />
                  <span className="font-medium">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button onClick={analyze} disabled={loading} className="w-full gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? 'Analyzing...' : `Generate ${OUTPUT_TYPES.find(t => t.id === outputType)?.label}`}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-border/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              {React.createElement(OUTPUT_TYPES.find(t => t.id === outputType)?.icon || FileText, { className: 'w-4 h-4 text-primary' })}
              {OUTPUT_TYPES.find(t => t.id === outputType)?.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIDocumentAnalyzer;
