import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, DollarSign, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Grant { id: string; donor_name: string; amount_zmw: number; status: string; deadline: string | null; awarded_date: string | null; notes: string | null; program_id: string | null; }
const STATUSES = ['prospecting', 'applied', 'awarded', 'rejected', 'reporting'];

export default function NGOGrantsPage() {
  const { user } = useAuth();
  const [list, setList] = useState<Grant[]>([]);
  const [programs, setPrograms] = useState<{ id: string; name: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ donor_name: '', amount_zmw: 0, status: 'prospecting', deadline: '', awarded_date: '', notes: '', program_id: '' });

  const load = async () => {
    if (!user) return;
    const [{ data }, { data: progs }] = await Promise.all([
      supabase.from('grants').select('*').eq('owner_id', user.id).order('created_at', { ascending: false }),
      supabase.from('ngo_programs').select('id,name').eq('owner_id', user.id),
    ]);
    setList((data as Grant[]) || []);
    setPrograms((progs as any[]) || []);
  };
  useEffect(() => { load(); }, [user?.id]);

  const create = async () => {
    if (!form.donor_name || !user) return;
    const payload: any = { ...form, owner_id: user.id };
    if (!payload.deadline) delete payload.deadline;
    if (!payload.awarded_date) delete payload.awarded_date;
    if (!payload.program_id) delete payload.program_id;
    const { error } = await supabase.from('grants').insert(payload);
    if (error) toast.error(error.message); else { toast.success('Grant added'); setOpen(false); load(); }
  };

  const remove = async (id: string) => { if (!confirm('Delete?')) return; await supabase.from('grants').delete().eq('id', id); load(); };

  const totals = { prospecting: 0, awarded: 0 } as any;
  list.forEach(g => { if (g.status === 'awarded') totals.awarded += Number(g.amount_zmw); else totals.prospecting += Number(g.amount_zmw); });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2"><DollarSign className="w-6 h-6" />Grants & Donors</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />Add Grant</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Grant</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Donor name" value={form.donor_name} onChange={e => setForm(f => ({ ...f, donor_name: e.target.value }))} />
              <Input type="number" placeholder="Amount ZMW" value={form.amount_zmw || ''} onChange={e => setForm(f => ({ ...f, amount_zmw: Number(e.target.value) }))} />
              <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
              <Select value={form.program_id} onValueChange={v => setForm(f => ({ ...f, program_id: v }))}><SelectTrigger><SelectValue placeholder="Link to program (optional)" /></SelectTrigger>
                <SelectContent>{programs.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent></Select>
              <Input type="date" placeholder="Deadline" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} />
              <Textarea placeholder="Notes" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
              <Button className="w-full" onClick={create}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Awarded</p><p className="text-2xl font-bold">ZMW {totals.awarded.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">In Pipeline</p><p className="text-2xl font-bold">ZMW {totals.prospecting.toLocaleString()}</p></CardContent></Card>
      </div>

      <div className="space-y-2">
        {list.length === 0 ? <p className="text-center text-muted-foreground py-8">No grants tracked yet</p> : list.map(g => (
          <Card key={g.id}><CardContent className="p-4 flex justify-between items-center">
            <div><p className="font-medium">{g.donor_name}</p><p className="text-sm text-muted-foreground">ZMW {Number(g.amount_zmw).toLocaleString()} {g.deadline && `• Deadline ${g.deadline}`}</p>{g.notes && <p className="text-xs text-muted-foreground mt-1">{g.notes}</p>}</div>
            <div className="flex items-center gap-2"><Badge>{g.status}</Badge><Button size="icon" variant="ghost" onClick={() => remove(g.id)}><Trash2 className="w-4 h-4" /></Button></div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
