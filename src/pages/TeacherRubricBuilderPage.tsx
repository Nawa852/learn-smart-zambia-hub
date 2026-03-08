import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ClipboardCheck, Plus, Trash2, Printer, Download } from 'lucide-react';

interface Criterion { name: string; levels: { label: string; points: number; description: string }[]; }

const DEFAULT_LEVELS = [
  { label: 'Excellent', points: 4, description: '' },
  { label: 'Good', points: 3, description: '' },
  { label: 'Satisfactory', points: 2, description: '' },
  { label: 'Needs Work', points: 1, description: '' },
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
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><ClipboardCheck className="w-6 h-6 text-primary" /> Rubric Builder</h1>
          <p className="text-sm text-muted-foreground">Create grading rubrics for assignments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()}><Printer className="w-4 h-4 mr-2" />Print</Button>
          <Button variant="outline" onClick={exportCsv}><Download className="w-4 h-4 mr-2" />CSV</Button>
        </div>
      </div>

      <Input placeholder="Rubric title (e.g., Essay Rubric)" value={rubricTitle} onChange={e => setRubricTitle(e.target.value)} className="text-lg font-medium" />

      <div className="space-y-4">
        {criteria.map((criterion, ci) => (
          <Card key={ci} className="border-border/50">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <Input value={criterion.name} onChange={e => updateName(ci, e.target.value)} placeholder="Criterion name" className="font-medium border-none p-0 h-auto text-base" />
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeCriterion(ci)}><Trash2 className="w-3.5 h-3.5" /></Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {criterion.levels.map((level, li) => (
                  <div key={li} className="space-y-1 p-2 rounded bg-muted/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{level.label}</span>
                      <Badge variant="outline" className="text-[10px]">{level.points}pts</Badge>
                    </div>
                    <Textarea className="text-xs min-h-[60px]" placeholder="Description..." value={level.description}
                      onChange={e => updateLevel(ci, li, 'description', e.target.value)} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={addCriterion}><Plus className="w-4 h-4 mr-2" />Add Criterion</Button>
        <Badge className="text-sm px-3 py-1">Max Points: {maxPoints}</Badge>
      </div>
    </div>
  );
};

export default TeacherRubricBuilderPage;
