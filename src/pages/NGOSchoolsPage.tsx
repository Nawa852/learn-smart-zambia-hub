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
import { Plus, School, Trash2, Activity } from 'lucide-react';
import { toast } from 'sonner';

const PROVINCES = ['Lusaka', 'Copperbelt', 'Central', 'Eastern', 'Northern', 'Southern', 'Western', 'Luapula', 'Muchinga', 'North-Western'];
interface School { id: string; name: string; province: string | null; district: string | null; school_type: string | null; students_enrolled: number; contact_person: string | null; contact_phone: string | null; }
interface Intervention { id: string; school_id: string; intervention_type: string; description: string | null; intervention_date: string; students_reached: number; }

export default function NGOSchoolsPage() {
  const { user } = useAuth();
  const [schools, setSchools] = useState<School[]>([]);
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [open, setOpen] = useState(false);
  const [iOpen, setIOpen] = useState<School | null>(null);
  const [form, setForm] = useState({ name: '', province: '', district: '', school_type: 'Primary', students_enrolled: 0, contact_person: '', contact_phone: '' });
  const [iForm, setIForm] = useState({ intervention_type: '', description: '', students_reached: 0, intervention_date: new Date().toISOString().split('T')[0] });

  const load = async () => {
    if (!user) return;
    const [{ data: s }, { data: i }] = await Promise.all([
      supabase.from('partner_schools').select('*').eq('owner_id', user.id).order('created_at', { ascending: false }),
      supabase.from('school_interventions').select('*').eq('owner_id', user.id).order('intervention_date', { ascending: false }),
    ]);
    setSchools((s as School[]) || []); setInterventions((i as Intervention[]) || []);
  };
  useEffect(() => { load(); }, [user?.id]);

  const createSchool = async () => {
    if (!form.name || !user) return;
    const { error } = await supabase.from('partner_schools').insert({ ...form, owner_id: user.id });
    if (error) toast.error(error.message); else { toast.success('School added'); setOpen(false); load(); }
  };
  const createIntervention = async () => {
    if (!iOpen || !user || !iForm.intervention_type) return;
    const { error } = await supabase.from('school_interventions').insert({ ...iForm, school_id: iOpen.id, owner_id: user.id });
    if (error) toast.error(error.message); else { toast.success('Logged'); setIOpen(null); setIForm({ intervention_type: '', description: '', students_reached: 0, intervention_date: new Date().toISOString().split('T')[0] }); load(); }
  };
  const remove = async (id: string) => { if (!confirm('Delete?')) return; await supabase.from('partner_schools').delete().eq('id', id); load(); };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2"><School className="w-6 h-6" />Partner Schools</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />Add School</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Register School</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="School name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <Select value={form.province} onValueChange={v => setForm(f => ({ ...f, province: v }))}>
                <SelectTrigger><SelectValue placeholder="Province" /></SelectTrigger>
                <SelectContent>{PROVINCES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
              <Input placeholder="District" value={form.district} onChange={e => setForm(f => ({ ...f, district: e.target.value }))} />
              <Select value={form.school_type} onValueChange={v => setForm(f => ({ ...f, school_type: v }))}><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{['Primary', 'Secondary', 'Combined', 'TVET'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
              <Input type="number" placeholder="Students enrolled" value={form.students_enrolled || ''} onChange={e => setForm(f => ({ ...f, students_enrolled: Number(e.target.value) }))} />
              <Input placeholder="Contact person" value={form.contact_person} onChange={e => setForm(f => ({ ...f, contact_person: e.target.value }))} />
              <Input placeholder="Contact phone" value={form.contact_phone} onChange={e => setForm(f => ({ ...f, contact_phone: e.target.value }))} />
              <Button className="w-full" onClick={createSchool}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {schools.length === 0 ? <p className="col-span-full text-center text-muted-foreground py-8">No schools yet</p> : schools.map(s => {
          const sInts = interventions.filter(i => i.school_id === s.id);
          return (
            <Card key={s.id}>
              <CardHeader><div className="flex justify-between"><CardTitle className="text-lg">{s.name}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => remove(s.id)}><Trash2 className="w-4 h-4" /></Button></div>
                <div className="flex gap-2 flex-wrap text-xs">{s.province && <Badge variant="outline">{s.province}</Badge>}{s.district && <Badge variant="outline">{s.district}</Badge>}{s.school_type && <Badge>{s.school_type}</Badge>}</div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">{s.students_enrolled} students {s.contact_person && `• ${s.contact_person} ${s.contact_phone || ''}`}</p>
                <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">{sInts.length} interventions logged</span>
                  <Button size="sm" variant="outline" onClick={() => setIOpen(s)}><Activity className="w-3 h-3 mr-1" />Log Intervention</Button></div>
                {sInts.slice(0, 3).map(i => <p key={i.id} className="text-xs bg-muted p-2 rounded">{i.intervention_date} • {i.intervention_type} • {i.students_reached} reached</p>)}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!iOpen} onOpenChange={o => !o && setIOpen(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Log intervention at {iOpen?.name}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Type (Training, Supplies, Workshop...)" value={iForm.intervention_type} onChange={e => setIForm(f => ({ ...f, intervention_type: e.target.value }))} />
            <Textarea placeholder="Description" value={iForm.description} onChange={e => setIForm(f => ({ ...f, description: e.target.value }))} />
            <Input type="number" placeholder="Students reached" value={iForm.students_reached || ''} onChange={e => setIForm(f => ({ ...f, students_reached: Number(e.target.value) }))} />
            <Input type="date" value={iForm.intervention_date} onChange={e => setIForm(f => ({ ...f, intervention_date: e.target.value }))} />
            <Button className="w-full" onClick={createIntervention}>Log</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
