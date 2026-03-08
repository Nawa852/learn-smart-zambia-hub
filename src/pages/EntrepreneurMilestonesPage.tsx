import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVentures } from '@/hooks/useVentures';
import { Target, Plus, Trash2, Zap } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export default function EntrepreneurMilestonesPage() {
  const { ventures, milestones, loading, addMilestone, toggleMilestone, deleteMilestone } = useVentures();
  const [searchParams] = useSearchParams();
  const [selectedVenture, setSelectedVenture] = useState(searchParams.get('venture') || '');
  const [newTitle, setNewTitle] = useState('');

  const filtered = selectedVenture
    ? milestones.filter(m => m.venture_id === selectedVenture)
    : milestones;

  const completedCount = filtered.filter(m => m.completed).length;

  const handleAdd = async () => {
    if (!newTitle || !selectedVenture) return;
    await addMilestone({ venture_id: selectedVenture, title: newTitle, order_index: filtered.length });
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><Target className="w-8 h-8" />Milestone Tracker</h1>
        <p className="text-muted-foreground">Track your startup milestones</p>
      </div>

      <Select value={selectedVenture} onValueChange={setSelectedVenture}>
        <SelectTrigger className="w-full max-w-sm"><SelectValue placeholder="Select a venture" /></SelectTrigger>
        <SelectContent>
          {ventures.map(v => <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>)}
        </SelectContent>
      </Select>

      {selectedVenture && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {ventures.find(v => v.id === selectedVenture)?.name} — {completedCount}/{filtered.length} complete
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filtered.map(m => (
              <div key={m.id} className="flex items-center gap-3 p-2 border rounded-lg">
                <Checkbox checked={m.completed} onCheckedChange={c => toggleMilestone(m.id, !!c)} />
                <div className={`flex-1 ${m.completed ? 'line-through text-muted-foreground' : ''}`}>
                  <span className="text-sm font-medium">{m.title}</span>
                </div>
                {m.completed && <Zap className="w-4 h-4 text-amber-500" />}
                <Button variant="ghost" size="sm" onClick={() => deleteMilestone(m.id)}><Trash2 className="w-3 h-3" /></Button>
              </div>
            ))}

            <div className="flex gap-2 pt-2">
              <Input placeholder="New milestone..." value={newTitle} onChange={e => setNewTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdd()} />
              <Button onClick={handleAdd}><Plus className="w-4 h-4" /></Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!selectedVenture && !loading && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center text-muted-foreground">
            Select a venture above to view and manage its milestones.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
