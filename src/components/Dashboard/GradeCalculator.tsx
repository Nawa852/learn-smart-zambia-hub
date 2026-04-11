import React, { useState } from 'react';
import { Calculator, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SubjectGrade {
  subject: string;
  score: number;
}

const getGradeLetter = (score: number): { letter: string; color: string } => {
  if (score >= 80) return { letter: 'A', color: 'text-accent' };
  if (score >= 70) return { letter: 'B', color: 'text-blue-500' };
  if (score >= 60) return { letter: 'C', color: 'text-amber-500' };
  if (score >= 50) return { letter: 'D', color: 'text-orange-500' };
  return { letter: 'F', color: 'text-destructive' };
};

export const GradeCalculator = () => {
  const [subjects, setSubjects] = useState<SubjectGrade[]>([
    { subject: 'Mathematics', score: 0 },
    { subject: 'English', score: 0 },
    { subject: 'Science', score: 0 },
  ]);
  const [expanded, setExpanded] = useState(false);

  const updateScore = (idx: number, value: string) => {
    const score = Math.min(100, Math.max(0, parseInt(value) || 0));
    setSubjects(prev => prev.map((s, i) => i === idx ? { ...s, score } : s));
  };

  const addSubject = () => {
    setSubjects(prev => [...prev, { subject: `Subject ${prev.length + 1}`, score: 0 }]);
  };

  const removeSubject = (idx: number) => {
    setSubjects(prev => prev.filter((_, i) => i !== idx));
  };

  const validSubjects = subjects.filter(s => s.score > 0);
  const average = validSubjects.length > 0
    ? Math.round(validSubjects.reduce((sum, s) => sum + s.score, 0) / validSubjects.length)
    : 0;
  const grade = getGradeLetter(average);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-indigo-500" />
          <h3 className="text-sm font-semibold text-foreground">Grade Calculator</h3>
        </div>
        <div className="flex items-center gap-2">
          {average > 0 && (
            <Badge variant="outline" className={cn("text-xs font-bold", grade.color)}>
              {grade.letter} — {average}%
            </Badge>
          )}
          <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", expanded && "rotate-180")} />
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          {subjects.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                value={s.subject}
                onChange={(e) => setSubjects(prev => prev.map((sub, idx) => idx === i ? { ...sub, subject: e.target.value } : sub))}
                className="h-8 text-xs flex-1"
                placeholder="Subject"
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={s.score || ''}
                onChange={(e) => updateScore(i, e.target.value)}
                className="h-8 text-xs w-16 text-center"
                placeholder="0"
              />
              <span className={cn("text-xs font-bold w-6", s.score > 0 ? getGradeLetter(s.score).color : 'text-muted-foreground')}>
                {s.score > 0 ? getGradeLetter(s.score).letter : '—'}
              </span>
              {subjects.length > 1 && (
                <button onClick={() => removeSubject(i)} className="text-xs text-muted-foreground hover:text-destructive">×</button>
              )}
            </div>
          ))}
          <Button size="sm" variant="outline" className="w-full text-xs h-7" onClick={addSubject}>
            + Add Subject
          </Button>
        </div>
      )}
    </div>
  );
};
