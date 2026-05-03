import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import { useStudySchedule } from '@/hooks/useStudySchedule';
import { toast } from 'sonner';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface StudyScheduleWizardProps {
  onDone?: () => void;
  compact?: boolean;
}

export const StudyScheduleWizard = ({ onDone, compact }: StudyScheduleWizardProps) => {
  const { schedules, addSchedule, removeSchedule, loading } = useStudySchedule();
  const [subject, setSubject] = useState('');
  const [start, setStart] = useState('17:00');
  const [end, setEnd] = useState('18:00');
  const [days, setDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [saving, setSaving] = useState(false);

  const toggleDay = (d: string) =>
    setDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));

  const handleAdd = async () => {
    if (!subject.trim()) return toast.error('Add a subject');
    if (days.length === 0) return toast.error('Pick at least one day');
    if (start >= end) return toast.error('End time must be after start');
    setSaving(true);
    await addSchedule({
      subject: subject.trim(),
      startTime: `${start}:00`,
      endTime: `${end}:00`,
      days,
    });
    setSubject('');
    setSaving(false);
    toast.success('Study slot added');
  };

  const presets = [
    { label: 'Morning Math', subject: 'Mathematics', start: '06:30', end: '07:30', days: ['Mon', 'Wed', 'Fri'] },
    { label: 'Evening Sciences', subject: 'Sciences', start: '18:00', end: '19:30', days: ['Mon', 'Tue', 'Thu'] },
    { label: 'Weekend Revision', subject: 'Revision', start: '10:00', end: '12:00', days: ['Sat', 'Sun'] },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Calendar className="w-5 h-5 text-primary" /> Build your study schedule
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Set recurring study slots. We'll remind you and keep distractions in check.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Presets */}
        {!compact && (
          <div className="flex gap-2 flex-wrap">
            {presets.map((p) => (
              <Button
                key={p.label}
                size="sm"
                variant="outline"
                className="gap-1 text-xs"
                onClick={async () => {
                  await addSchedule({ subject: p.subject, startTime: `${p.start}:00`, endTime: `${p.end}:00`, days: p.days });
                  toast.success(`${p.label} added`);
                }}
              >
                <Sparkles className="w-3 h-3" /> {p.label}
              </Button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Subject</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Biology" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Start</Label>
            <Input type="time" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">End</Label>
            <Input type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {DAYS.map((d) => (
            <Badge
              key={d}
              variant={days.includes(d) ? 'default' : 'outline'}
              className="cursor-pointer select-none"
              onClick={() => toggleDay(d)}
            >
              {d}
            </Badge>
          ))}
        </div>

        <Button onClick={handleAdd} disabled={saving} className="gap-2 w-full md:w-auto">
          <Plus className="w-4 h-4" /> Add slot
        </Button>

        {/* List */}
        <div className="space-y-2 pt-2 border-t border-border/40">
          {loading && <p className="text-xs text-muted-foreground">Loading...</p>}
          {!loading && schedules.length === 0 && (
            <p className="text-xs text-muted-foreground">No slots yet — add your first study session.</p>
          )}
          {schedules.map((s) => (
            <div key={s.id} className="flex items-center justify-between p-2.5 rounded-lg border border-border/40">
              <div>
                <p className="text-sm font-medium">{s.subject}</p>
                <p className="text-[11px] text-muted-foreground">
                  {s.startTime.slice(0, 5)} – {s.endTime.slice(0, 5)} · {s.days.join(', ')}
                </p>
              </div>
              <Button size="icon" variant="ghost" onClick={() => removeSchedule(s.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        {onDone && schedules.length > 0 && (
          <Button onClick={onDone} variant="default" className="w-full gap-2">
            <CheckCircle2 className="w-4 h-4" /> Done — go to dashboard
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default StudyScheduleWizard;
