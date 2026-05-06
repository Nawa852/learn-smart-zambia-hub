import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Heart, TrendingUp, Users, School } from 'lucide-react';
import { toast } from 'sonner';

interface Pledge { id: string; donor_name: string; amount_zmw: number; message: string | null; created_at: string; }

const DonorImpactPage: React.FC = () => {
  const { user } = useAuth();
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [stats, setStats] = useState<any>({});
  const [form, setForm] = useState({ donor_name: '', amount_zmw: 0, message: '' });

  const load = async () => {
    const { data } = await supabase.from('donor_pledges').select('*').eq('is_public', true).order('created_at', { ascending: false }).limit(50);
    setPledges((data as Pledge[]) || []);
    const { data: s } = await supabase.rpc('get_platform_stats');
    setStats(s || {});
  };
  useEffect(() => { load(); }, []);

  const total = pledges.reduce((s, p) => s + Number(p.amount_zmw || 0), 0);

  const submit = async () => {
    if (!form.donor_name.trim() || form.amount_zmw <= 0) return toast.error('Enter name and amount');
    const { error } = await supabase.from('donor_pledges').insert({ ...form, pledger_id: user?.id || null });
    if (error) return toast.error(error.message);
    toast.success('Thank you for your pledge!'); setForm({ donor_name: '', amount_zmw: 0, message: '' }); load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><Heart className="h-7 w-7 text-rose-500" /> Donor Impact</h1>
        <p className="text-muted-foreground">Transparent funding for Zambian education.</p>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <Card><CardContent className="pt-4"><div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /><div><p className="text-xs text-muted-foreground">Pledged</p><p className="text-xl font-bold">ZMW {total.toLocaleString()}</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-4"><div className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /><div><p className="text-xs text-muted-foreground">Students</p><p className="text-xl font-bold">{stats.total_students ?? 0}</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-4"><div className="flex items-center gap-2"><School className="h-5 w-5 text-primary" /><div><p className="text-xs text-muted-foreground">Schools</p><p className="text-xl font-bold">{stats.total_schools ?? 0}</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-4"><div className="flex items-center gap-2"><Heart className="h-5 w-5 text-rose-500" /><div><p className="text-xs text-muted-foreground">Donors</p><p className="text-xl font-bold">{pledges.length}</p></div></div></CardContent></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Make a Pledge</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label>Your Name / Org</Label><Input value={form.donor_name} onChange={e => setForm({ ...form, donor_name: e.target.value })} /></div>
            <div><Label>Amount (ZMW)</Label><Input type="number" value={form.amount_zmw || ''} onChange={e => setForm({ ...form, amount_zmw: Number(e.target.value) })} /></div>
            <div><Label>Message (optional)</Label><Textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></div>
            <Button onClick={submit} className="w-full">Pledge</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent Pledges</CardTitle></CardHeader>
          <CardContent className="space-y-2 max-h-96 overflow-y-auto">
            {pledges.map(p => (
              <div key={p.id} className="flex justify-between gap-2 p-2 border-b last:border-b-0">
                <div className="min-w-0">
                  <p className="font-medium truncate">{p.donor_name}</p>
                  {p.message && <p className="text-xs text-muted-foreground truncate">{p.message}</p>}
                </div>
                <p className="font-semibold text-primary shrink-0">ZMW {Number(p.amount_zmw).toLocaleString()}</p>
              </div>
            ))}
            {pledges.length === 0 && <p className="text-sm text-muted-foreground">Be the first to pledge.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonorImpactPage;
