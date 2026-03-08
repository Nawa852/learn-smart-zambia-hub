import React, { useState, useRef } from 'react';
import { BookOpen, Sparkles, Save, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';

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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
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
      title: `${subject}: ${topic}`,
      description: plan.slice(0, 500),
      subject,
      grade_level: grade,
      created_by: user.id,
      is_published: false,
    });
    if (error) toast.error('Failed to save');
    else toast.success('Saved as draft course!');
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" /> AI Lesson Plan Generator
        </h1>
        <p className="text-muted-foreground mt-1">Generate ECZ-aligned lesson plans with AI</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Lesson Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['Mathematics', 'English', 'Science', 'Biology', 'Chemistry', 'Physics', 'Geography', 'History', 'Civic Education', 'Computer Studies'].map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Grade</label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Topic</label>
              <Input placeholder="e.g. Quadratic Equations" value={topic} onChange={e => setTopic(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Duration</label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['30 minutes', '40 minutes', '60 minutes', '80 minutes'].map(d => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={generate} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
              {loading ? 'Generating...' : 'Generate Lesson Plan'}
            </Button>
            {plan && (
              <Button variant="outline" onClick={saveAsCourse} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />{saving ? 'Saving...' : 'Save as Course'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {plan && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" /> Generated Lesson Plan</CardTitle></CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">{plan}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeacherLessonPlanPage;
