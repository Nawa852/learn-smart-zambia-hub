import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Search, Calendar, AlertTriangle, CheckCircle, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const inspections = [
  { school: 'Lusaka Academy', province: 'Lusaka', date: '2026-02-15', status: 'completed', score: 92, issues: 1 },
  { school: 'Copperbelt Technical', province: 'Copperbelt', date: '2026-02-10', status: 'completed', score: 78, issues: 4 },
  { school: 'Chipata Day Secondary', province: 'Eastern', date: '2026-03-01', status: 'scheduled', score: 0, issues: 0 },
  { school: 'Kasama Girls', province: 'Northern', date: '2026-03-05', status: 'scheduled', score: 0, issues: 0 },
  { school: 'Mongu Secondary', province: 'Western', date: '2026-01-20', status: 'completed', score: 65, issues: 7 },
  { school: 'Solwezi Technical', province: 'Northwestern', date: '2026-01-28', status: 'completed', score: 71, issues: 5 },
  { school: 'Choma Day', province: 'Southern', date: '2026-02-22', status: 'in_progress', score: 0, issues: 0 },
  { school: 'Kabwe High', province: 'Central', date: '2026-03-10', status: 'scheduled', score: 0, issues: 0 },
];

const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
  completed: { color: 'bg-green-500/10 text-green-600', icon: CheckCircle, label: 'Completed' },
  scheduled: { color: 'bg-blue-500/10 text-blue-600', icon: Calendar, label: 'Scheduled' },
  in_progress: { color: 'bg-yellow-500/10 text-yellow-600', icon: Clock, label: 'In Progress' },
};

const MinistryInspectionsPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const filtered = inspections
    .filter(i => i.school.toLowerCase().includes(search.toLowerCase()))
    .filter(i => statusFilter === 'all' || i.status === statusFilter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <ClipboardCheck className="h-8 w-8 text-primary" /> School Inspections
        </h1>
        <p className="text-muted-foreground mt-1">Monitor and schedule school quality inspections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Inspections', value: inspections.length, color: 'text-primary' },
          { label: 'Completed', value: inspections.filter(i => i.status === 'completed').length, color: 'text-green-500' },
          { label: 'Scheduled', value: inspections.filter(i => i.status === 'scheduled').length, color: 'text-blue-500' },
          { label: 'Issues Found', value: inspections.reduce((a, b) => a + b.issues, 0), color: 'text-red-500' },
        ].map(s => (
          <Card key={s.label} className="border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search schools..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => toast.success('New inspection scheduled')}>Schedule New</Button>
      </div>

      <div className="space-y-3">
        {filtered.map((ins, i) => {
          const cfg = statusConfig[ins.status];
          const Icon = cfg.icon;
          return (
            <motion.div key={ins.school} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${cfg.color}`}><Icon className="h-5 w-5" /></div>
                    <div>
                      <p className="font-semibold">{ins.school}</p>
                      <div className="flex gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ins.province}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{ins.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {ins.score > 0 && <Badge variant={ins.score >= 80 ? 'default' : ins.score >= 60 ? 'secondary' : 'destructive'}>{ins.score}/100</Badge>}
                    {ins.issues > 0 && <Badge variant="destructive" className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{ins.issues} issues</Badge>}
                    <Badge className={cfg.color}>{cfg.label}</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MinistryInspectionsPage;
