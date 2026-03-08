import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ClipboardCheck, Plus, Trash2, Printer, Download, GripVertical } from 'lucide-react';

interface Criterion { name: string; levels: { label: string; points: number; description: string }[]; }

const DEFAULT_LEVELS = [
  { label: 'Excellent', points: 4, description: '' },
  { label: 'Good', points: 3, description: '' },
  { label: 'Satisfactory', points: 2, description: '' },
  { label: 'Needs Work', points: 1, description: '' },
];

const LEVEL_COLORS = [
  'bg-emerald-500/10 border-emerald-500/20',
  'bg-blue-500/10 border-blue-500/20',
  'bg-amber-500/10 border-amber-500/20',
  'bg-red-500/10 border-red-500/20',
];

const TeacherRubricBuilderPage = () => {
  const [rubricTitle, setRubricTitle] = useState('');
  const [criteria, setCriteria] = useState<Criterion[]>([
    { name: 'Content Knowledge', levels: DEFAULT_LEVELS.map(l => ({ ...l })) },
    { name: 'Presentation', levels: DEFAULT_LEVELS.map(l => ({ ...l })) },
  ]);

  const addCriterion = () => setCriteria([...criteria, { name: '', levels: DEFAULT_LEVELS.map(l => ({ ...l })) }]);
  const removeCriterion = (i: number) => setCriteria(criteria.filter((_, idx) => idx !== i));
  const updateName = (i: number, name: string) => { const c = [...criteria]; c[i].name = name; setCriteria(c); };
  const updateLevel = (ci: number, li: number, field: string, value: string | number) => {
    const c = [...criteria]; (c[ci].levels[li] as any)[field] = value; setCriteria(c);
  };

  const maxPoints = criteria.reduce((s, c) => s + Math.max(...c.levels.map(l => l.points)), 0);

  const exportCsv = () => {
    const headers = ['Criterion', ...criteria[0]?.levels.map(l => l.label) || []];
    const rows = criteria.map(c => [c.name, ...c.levels.map(l => `${l.points}pts: ${l.description}`)]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${rubricTitle || 'rubric'}.csv`; a.click();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-primary" />
            </div>
            Rubric Builder
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Create and customize grading rubrics for assignments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-2">
            <Printer className="w-4 h-4" /> Print
          </Button>
          <Button variant="outline" size="sm" onClick={exportCsv} className="gap-2">
            <Download className="w-4 h-4" /> CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <label className="text-sm font-medium text-foreground mb-1.5 block">Rubric Title</label>
          <Input
            placeholder="e.g., Essay Writing Rubric, Lab Report Rubric..."
            value={rubricTitle}
            onChange={e => setRubricTitle(e.target.value)}
            className="text-base font-medium"
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        {criteria.map((criterion, ci) => (
          <Card key={ci} className="overflow-hidden">
            <CardHeader className="pb-3 flex flex-row items-center gap-2 bg-muted/20">
              <GripVertical className="w-4 h-4 text-muted-foreground/40 shrink-0" />
              <Input
                value={criterion.name}
                onChange={e => updateName(ci, e.target.value)}
                placeholder="Criterion name"
                className="font-semibold border-none bg-transparent p-0 h-auto text-sm shadow-none focus-visible:ring-0"
              />
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0" onClick={() => removeCriterion(ci)}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {criterion.levels.map((level, li) => (
                  <div key={li} className={`space-y-2 p-3 rounded-xl border ${LEVEL_COLORS[li] || 'bg-muted/30 border-border'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground">{level.label}</span>
                      <Badge variant="outline" className="text-[10px] h-5">{level.points}pts</Badge>
                    </div>
                    <Textarea
                      className="text-xs min-h-[60px] bg-background/50 resize-none"
                      placeholder="Describe expectations..."
                      value={level.description}
                      onChange={e => updateLevel(ci, li, 'description', e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={addCriterion} className="gap-2">
          <Plus className="w-4 h-4" /> Add Criterion
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{criteria.length} criteria</span>
          <Badge className="text-sm px-4 py-1.5">Max: {maxPoints} pts</Badge>
        </div>
      </div>
    </div>
  );
};

export default TeacherRubricBuilderPage;
