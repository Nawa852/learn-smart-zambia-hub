import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Activity, Plus, Trash2 } from 'lucide-react';
import { useClinicalRotations } from '@/hooks/useClinicalRotations';
import { toast } from '@/hooks/use-toast';

const STATUSES = ['upcoming', 'active', 'completed'];

const MedicalRotationsPage = () => {
  const { rotations, loading, addRotation, deleteRotation } = useClinicalRotations();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ rotation_name: '', supervisor_name: '', start_date: '', end_date: '', status: 'upcoming', notes: '' });

  const handleAdd = async () => {
    if (!form.rotation_name.trim()) { toast({ title: 'Rotation name required', variant: 'destructive' }); return; }
    await addRotation({
      rotation_name: form.rotation_name,
      supervisor_name: form.supervisor_name || null,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      status: form.status,
      notes: form.notes || null,
    });
    setForm({ rotation_name: '', supervisor_name: '', start_date: '', end_date: '', status: 'upcoming', notes: '' });
    setOpen(false);
    toast({ title: 'Rotation added' });
  };

  const getProgress = (r: typeof rotations[0]) => {
    if (r.status === 'completed') return 100;
    if (r.status === 'upcoming' || !r.start_date || !r.end_date) return 0;
    const start = new Date(r.start_date).getTime();
    const end = new Date(r.end_date).getTime();
    const now = Date.now();
    if (now >= end) return 100;
    if (now <= start) return 0;
    return Math.round(((now - start) / (end - start)) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2"><Activity className="w-8 h-8 text-primary" /> Clinical Rotations</h1>
          <p className="text-muted-foreground">Track your placement progress</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" /> Add Rotation</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Rotation</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Rotation Name *" value={form.rotation_name} onChange={e => setForm(f => ({ ...f, rotation_name: e.target.value }))} />
              <Input placeholder="Supervisor Name" value={form.supervisor_name} onChange={e => setForm(f => ({ ...f, supervisor_name: e.target.value }))} />
              <div className="grid grid-cols-2 gap-2">
                <div><label className="text-xs text-muted-foreground">Start</label><Input type="date" value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} /></div>
                <div><label className="text-xs text-muted-foreground">End</label><Input type="date" value={form.end_date} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))} /></div>
              </div>
              <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
              <Textarea placeholder="Notes" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
              <Button onClick={handleAdd} className="w-full">Save Rotation</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : rotations.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">No rotations added yet.</CardContent></Card>
      ) : (
        <div className="space-y-4">
          {rotations.map(r => (
            <Card key={r.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{r.rotation_name}</h4>
                    {r.supervisor_name && <p className="text-sm text-muted-foreground">Supervisor: {r.supervisor_name}</p>}
                    {r.start_date && r.end_date && (
                      <p className="text-xs text-muted-foreground">{new Date(r.start_date).toLocaleDateString()} — {new Date(r.end_date).toLocaleDateString()}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={r.status === 'active' ? 'default' : r.status === 'completed' ? 'secondary' : 'outline'}>{r.status}</Badge>
                    <Button variant="ghost" size="icon" onClick={() => deleteRotation(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                </div>
                <Progress value={getProgress(r)} className="h-2" />
                {r.notes && <p className="text-sm text-muted-foreground mt-2">{r.notes}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalRotationsPage;
