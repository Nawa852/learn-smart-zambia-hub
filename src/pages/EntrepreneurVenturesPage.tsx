import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useVentures } from '@/hooks/useVentures';
import { Rocket, Plus, Trash2, Edit, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const sectors = ['Agriculture', 'EdTech', 'HealthTech', 'FinTech', 'E-Commerce', 'Manufacturing', 'Tourism', 'Energy', 'Other'];
const stages = ['ideation', 'validation', 'mvp', 'growth', 'scaling'];

export default function EntrepreneurVenturesPage() {
  const { ventures, loading, addVenture, updateVenture, deleteVenture } = useVentures();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', sector: '', stage: 'ideation', description: '', funding_status: 'bootstrapped', funding_amount: 0, team_size: 1, progress: 0, notes: '' });

  const handleSubmit = async () => {
    if (!form.name) return;
    await addVenture(form);
    setForm({ name: '', sector: '', stage: 'ideation', description: '', funding_status: 'bootstrapped', funding_amount: 0, team_size: 1, progress: 0 });
    setOpen(false);
  };

  const stageBadgeVariant = (stage: string) => {
    if (stage === 'growth' || stage === 'scaling') return 'default' as const;
    if (stage === 'mvp') return 'secondary' as const;
    return 'outline' as const;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Ventures</h1>
          <p className="text-muted-foreground">Track and manage your business ventures</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />New Venture</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create New Venture</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Venture name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <Select value={form.sector} onValueChange={v => setForm(f => ({ ...f, sector: v }))}>
                <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
                <SelectContent>{sectors.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={form.stage} onValueChange={v => setForm(f => ({ ...f, stage: v }))}>
                <SelectTrigger><SelectValue placeholder="Stage" /></SelectTrigger>
                <SelectContent>{stages.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}</SelectContent>
              </Select>
              <Textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              <div className="grid grid-cols-2 gap-2">
                <Input type="number" placeholder="Team size" value={form.team_size} onChange={e => setForm(f => ({ ...f, team_size: parseInt(e.target.value) || 1 }))} />
                <Input type="number" placeholder="Funding (ZMW)" value={form.funding_amount} onChange={e => setForm(f => ({ ...f, funding_amount: parseFloat(e.target.value) || 0 }))} />
              </div>
              <Button onClick={handleSubmit} className="w-full">Create Venture</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : ventures.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <Rocket className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold text-lg mb-2">No ventures yet</h3>
            <p className="text-muted-foreground mb-4">Start your entrepreneurial journey by creating your first venture.</p>
            <Button onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-2" />Create First Venture</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ventures.map(v => (
            <Card key={v.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{v.name}</CardTitle>
                    <CardDescription>{v.sector || 'General'} • Team of {v.team_size}</CardDescription>
                  </div>
                  <Badge variant={stageBadgeVariant(v.stage)}>{v.stage}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {v.description && <p className="text-sm text-muted-foreground line-clamp-2">{v.description}</p>}
                <div className="flex items-center gap-2">
                  <Progress value={v.progress} className="h-2 flex-1" />
                  <span className="text-sm font-bold">{v.progress}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{v.funding_status} • ZMW {v.funding_amount.toLocaleString()}</span>
                </div>
                <div className="flex gap-2">
                  <Link to={`/entrepreneur/milestones?venture=${v.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full"><TrendingUp className="w-3 h-3 mr-1" />Milestones</Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => deleteVenture(v.id)}><Trash2 className="w-3 h-3" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
