import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Target, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const PROVINCES = ['Lusaka', 'Copperbelt', 'Central', 'Eastern', 'Northern', 'Southern', 'Western', 'Luapula', 'Muchinga', 'North-Western'];

interface Program { id: string; name: string; description: string | null; focus_area: string | null; province: string | null; status: string; beneficiaries_target: number; beneficiaries_count: number; budget_zmw: number; start_date: string | null; end_date: string | null; }

export default function NGOProgramsPage() {
  const { user } = useAuth();
  const [list, setList] = useState<Program[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', focus_area: 'Education', province: '', status: 'active', beneficiaries_target: 0, budget_zmw: 0, start_date: '', end_date: '' });

  const load = async () => {
    if (!user) return;
    const { data } = await supabase.from('ngo_programs').select('*').eq('owner_id', user.id).order('created_at', { ascending: false });
    setList((data as Program[]) || []);
  };
  useEffect(() => { load(); }, [user?.id]);

  const create = async () => {
    if (!form.name || !user) return;
    const payload: any = { ...form, owner_id: user.id };
    if (!payload.start_date) delete payload.start_date;
    if (!payload.end_date) delete payload.end_date;
    const { error } = await supabase.from('ngo_programs').insert(payload);
    if (error) toast.error(error.message); else { toast.success('Program created'); setOpen(false); load(); }
  };

  const remove = async (id: string) => { if (!confirm('Delete?')) return; await supabase.from('ngo_programs').delete().eq('id', id); load(); };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><Target className="w-6 h-6" />Programs</h2></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />New Program</Button></DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Create Program</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Program name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <Textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              <Input placeholder="Focus area" value={form.focus_area} onChange={e => setForm(f => ({ ...f, focus_area: e.target.value }))} />
              <Select value={form.province} onValueChange={v => setForm(f => ({ ...f, province: v }))}>
                <SelectTrigger><SelectValue placeholder="Province" /></SelectTrigger>
                <SelectContent>{PROVINCES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-2">
                <Input type="number" placeholder="Beneficiaries target" value={form.beneficiaries_target || ''} onChange={e => setForm(f => ({ ...f, beneficiaries_target: Number(e.target.value) }))} />
                <Input type="number" placeholder="Budget ZMW" value={form.budget_zmw || ''} onChange={e => setForm(f => ({ ...f, budget_zmw: Number(e.target.value) }))} />
                <Input type="date" value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} />
                <Input type="date" value={form.end_date} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))} />
              </div>
              <Button className="w-full" onClick={create}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {list.length === 0 ? <p className="col-span-full text-center text-muted-foreground py-8">No programs yet</p> : list.map(p => {
          const pct = p.beneficiaries_target > 0 ? Math.min(100, (p.beneficiaries_count / p.beneficiaries_target) * 100) : 0;
          return (
            <Card key={p.id}>
              <CardHeader>
                <div className="flex justify-between"><CardTitle className="text-lg">{p.name}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => remove(p.id)}><Trash2 className="w-4 h-4" /></Button></div>
                <div className="flex gap-2"><Badge>{p.status}</Badge>{p.province && <Badge variant="outline">{p.province}</Badge>}{p.focus_area && <Badge variant="secondary">{p.focus_area}</Badge>}</div>
              </CardHeader>
              <CardContent className="space-y-2">
                {p.description && <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>}
                <div className="flex justify-between text-sm"><span>Beneficiaries</span><span className="font-bold">{p.beneficiaries_count} / {p.beneficiaries_target}</span></div>
                <Progress value={pct} />
                <p className="text-xs text-muted-foreground">Budget: ZMW {p.budget_zmw.toLocaleString()}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
