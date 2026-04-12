import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Calendar, Sparkles, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';

const SUBJECTS = ['Mathematics', 'English', 'Biology', 'Chemistry', 'Physics', 'Geography', 'History', 'Civic Education', 'Computer Studies', 'Commerce', 'Accounts'];

const AISmartStudyPlanner = () => {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<string[]>([]);
  const [currentSubject, setCurrentSubject] = useState('');
  const [weakAreas, setWeakAreas] = useState('');
  const [examDate, setExamDate] = useState('');
  const [availableHours, setAvailableHours] = useState('4');
  const [grade, setGrade] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState('');

  const addSubject = () => {
    if (currentSubject && !subjects.includes(currentSubject)) {
      setSubjects([...subjects, currentSubject]);
      setCurrentSubject('');
    }
  };

  const removeSubject = (s: string) => setSubjects(subjects.filter(x => x !== s));

  const generate = async () => {
    if (subjects.length === 0) return toast({ title: 'Add at least one subject', variant: 'destructive' });
    setLoading(true);
    setPlan('');

    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-smart-planner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          subjects,
          examDate: examDate || undefined,
          weakAreas: weakAreas ? weakAreas.split(',').map(s => s.trim()) : undefined,
          availableHours: parseInt(availableHours) || 4,
          grade,
        }),
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
            if (c) { full += c; setPlan(full); }
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
            <Calendar className="w-5 h-5 text-primary" />
            AI Smart Study Planner
          </CardTitle>
          <p className="text-xs text-muted-foreground">Get a personalized weekly study plan tailored to your subjects, exam dates & weak areas</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Grade</Label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger><SelectValue placeholder="Select grade" /></SelectTrigger>
                <SelectContent>
                  {['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Exam Date</Label>
              <Input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Subjects</Label>
            <div className="flex gap-2">
              <Select value={currentSubject} onValueChange={setCurrentSubject}>
                <SelectTrigger className="flex-1"><SelectValue placeholder="Add a subject" /></SelectTrigger>
                <SelectContent>
                  {SUBJECTS.filter(s => !subjects.includes(s)).map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={addSubject}><Plus className="w-4 h-4" /></Button>
            </div>
            {subjects.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {subjects.map(s => (
                  <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/8 text-primary text-xs font-medium">
                    {s}
                    <button onClick={() => removeSubject(s)}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Weak Areas (comma-separated)</Label>
              <Input placeholder="e.g. Algebra, Organic Chemistry" value={weakAreas} onChange={e => setWeakAreas(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Study Hours Per Day</Label>
              <Select value={availableHours} onValueChange={setAvailableHours}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['2', '3', '4', '5', '6', '8'].map(h => (
                    <SelectItem key={h} value={h}>{h} hours</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={generate} disabled={loading} className="w-full gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? 'Creating Plan...' : 'Generate Study Plan'}
          </Button>
        </CardContent>
      </Card>

      {plan && (
        <Card className="border-border/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Your Personalized Study Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{plan}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AISmartStudyPlanner;
