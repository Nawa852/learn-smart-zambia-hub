import React, { useState, useRef } from 'react';
import { BookOpen, Sparkles, Save, Loader2, Clock, GraduationCap, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';

const SUBJECTS = ['Mathematics', 'English', 'Science', 'Biology', 'Chemistry', 'Physics', 'Geography', 'History', 'Civic Education', 'Computer Studies'];
const GRADES = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
const DURATIONS = ['30 minutes', '40 minutes', '60 minutes', '80 minutes'];

const TeacherLessonPlanPage = () => {
  const { user } = useAuth();
  const [subject, setSubject] = useState('Mathematics');
  const [grade, setGrade] = useState('Grade 10');
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('40 minutes');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const generate = async () => {
    if (!topic.trim()) { toast.error('Enter a topic'); return; }
    setLoading(true);
    setPlan('');
    abortRef.current = new AbortController();

    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-lesson-generator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ subject, grade, topic, duration }),
        signal: abortRef.current.signal,
      });

      if (resp.status === 429) { toast.error('Rate limit exceeded. Try again shortly.'); setLoading(false); return; }
      if (resp.status === 402) { toast.error('AI credits exhausted.'); setLoading(false); return; }
      if (!resp.ok || !resp.body) throw new Error('Failed');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      let text = '';

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
            const p = JSON.parse(json);
            const c = p.choices?.[0]?.delta?.content;
            if (c) { text += c; setPlan(text); }
          } catch {}
        }
      }
    } catch (e: any) {
      if (e.name !== 'AbortError') toast.error('Generation failed');
    }
    setLoading(false);
  };

  const saveAsCourse = async () => {
    if (!user || !plan) return;
    setSaving(true);
    const { error } = await supabase.from('courses').insert({
      title: `${subject}: ${topic}`, description: plan.slice(0, 500), subject, grade_level: grade, created_by: user.id, is_published: false,
    });
    if (error) toast.error('Failed to save');
    else toast.success('Saved as draft course!');
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          AI Lesson Plan Generator
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Generate ECZ-aligned lesson plans powered by AI</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Lesson Configuration</CardTitle>
          <CardDescription>Set your lesson parameters to generate a tailored plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Grade Level</label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{GRADES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Topic</label>
              <Input placeholder="e.g. Quadratic Equations" value={topic} onChange={e => setTopic(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Duration</label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{DURATIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={generate} disabled={loading} className="gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {loading ? 'Generating...' : 'Generate Lesson Plan'}
            </Button>
            {plan && (
              <Button variant="outline" onClick={saveAsCourse} disabled={saving} className="gap-2">
                <Save className="h-4 w-4" />{saving ? 'Saving...' : 'Save as Course'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {!plan && !loading && (
        <Card className="border-dashed">
          <CardContent className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: GraduationCap, title: 'ECZ-Aligned', desc: 'Objectives mapped to the Zambian curriculum framework' },
                { icon: Lightbulb, title: 'Activity-Based', desc: 'Starter activities, worksheets, and assessment questions' },
                { icon: Clock, title: 'Time-Structured', desc: 'Timed sections with differentiation strategies' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {plan && (
        <Card>
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-5 w-5 text-primary" /> Generated Lesson Plan
            </CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">{subject}</Badge>
              <Badge variant="secondary" className="text-xs">{grade}</Badge>
              <Badge variant="secondary" className="text-xs">{duration}</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">{plan}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeacherLessonPlanPage;
