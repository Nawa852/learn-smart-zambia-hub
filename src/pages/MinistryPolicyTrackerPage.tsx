import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus, CheckCircle, Clock, AlertTriangle, TrendingUp, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { toast } from 'sonner';

interface Policy {
  id: string;
  title: string;
  description: string | null;
  status: string;
  implemented_date: string | null;
  target: string | null;
  actual_result: string | null;
  budget: string | null;
  province: string | null;
}

const statusConfig: Record<string, { icon: React.ElementType; color: string }> = {
  planned: { icon: Clock, color: 'bg-muted text-muted-foreground' },
  'in-progress': { icon: TrendingUp, color: 'bg-blue-500/10 text-blue-600' },
  'on-track': { icon: CheckCircle, color: 'bg-green-500/10 text-green-600' },
  exceeded: { icon: CheckCircle, color: 'bg-emerald-500/10 text-emerald-600' },
  delayed: { icon: AlertTriangle, color: 'bg-red-500/10 text-red-600' },
};

const MinistryPolicyTrackerPage = () => {
  const { user } = useAuth();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', status: 'planned', target: '', budget: '', province: '' });

  const fetchPolicies = async () => {
    const { data } = await supabase.from('education_policies').select('*').order('created_at', { ascending: false });
    if (data) setPolicies(data as unknown as Policy[]);
    setLoading(false);
  };

  useEffect(() => { fetchPolicies(); }, []);

  const handleCreate = async () => {
    if (!form.title || !user) return;
    const { error } = await supabase.from('education_policies').insert({
      title: form.title,
      description: form.description || null,
      status: form.status,
      target: form.target || null,
      budget: form.budget || null,
      province: form.province || null,
      created_by: user.id,
    } as any);
    if (error) { toast.error('Failed to create policy'); return; }
    toast.success('Policy created');
    setForm({ title: '', description: '', status: 'planned', target: '', budget: '', province: '' });
    setOpen(false);
    fetchPolicies();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('education_policies').delete().eq('id', id);
    toast.success('Policy deleted');
    fetchPolicies();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Policy Tracker
          </h1>
          <p className="text-muted-foreground mt-1">Track education policy implementation & impact</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Add Policy</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Education Policy</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Policy title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              <Textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="on-track">On Track</SelectItem>
                  <SelectItem value="exceeded">Exceeded</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Target (e.g. Increase enrollment by 20%)" value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} />
              <Input placeholder="Budget (e.g. K2.5B)" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} />
              <Input placeholder="Province (optional)" value={form.province} onChange={e => setForm(f => ({ ...f, province: e.target.value }))} />
              <Button onClick={handleCreate} className="w-full">Create Policy</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading policies...</p>
      ) : policies.length === 0 ? (
        <Card className="border-dashed"><CardContent className="p-12 text-center text-muted-foreground">No policies yet. Click "Add Policy" to get started.</CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {policies.map((policy, i) => {
            const config = statusConfig[policy.status] || statusConfig.planned;
            const Icon = config.icon;
            return (
              <motion.div key={policy.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="border-none shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{policy.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${config.color}`}>
                          <Icon className="h-3 w-3" /> {policy.status}
                        </span>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(policy.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {policy.description && <p className="text-muted-foreground">{policy.description}</p>}
                    <div className="grid grid-cols-2 gap-2">
                      {policy.target && <div className="bg-muted/30 rounded p-2"><span className="text-xs text-muted-foreground">Target</span><p className="font-medium">{policy.target}</p></div>}
                      {policy.actual_result && <div className="bg-muted/30 rounded p-2"><span className="text-xs text-muted-foreground">Result</span><p className="font-medium">{policy.actual_result}</p></div>}
                      {policy.budget && <div className="bg-muted/30 rounded p-2"><span className="text-xs text-muted-foreground">Budget</span><p className="font-medium">{policy.budget}</p></div>}
                      {policy.province && <div className="bg-muted/30 rounded p-2"><span className="text-xs text-muted-foreground">Province</span><p className="font-medium">{policy.province}</p></div>}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MinistryPolicyTrackerPage;
