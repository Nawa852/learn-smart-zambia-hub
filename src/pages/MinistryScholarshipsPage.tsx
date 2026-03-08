import React, { useState } from 'react';
import { GraduationCap, Users, DollarSign, Search, Plus, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const scholarships = [
  { name: 'Girls in STEM Scholarship', type: 'Merit', amount: 5000, recipients: 250, status: 'active', province: 'National', deadline: '2026-04-30' },
  { name: 'Rural Education Fund', type: 'Need-based', amount: 3000, recipients: 500, status: 'active', province: 'Rural Districts', deadline: '2026-05-15' },
  { name: 'Teacher Training Bursary', type: 'Professional', amount: 8000, recipients: 100, status: 'active', province: 'National', deadline: '2026-03-31' },
  { name: 'Orphan Support Program', type: 'Need-based', amount: 2500, recipients: 800, status: 'active', province: 'National', deadline: '2026-06-01' },
  { name: 'ICT Excellence Award', type: 'Merit', amount: 7500, recipients: 50, status: 'active', province: 'National', deadline: '2026-04-15' },
  { name: 'Disability Inclusion Grant', type: 'Inclusive', amount: 4000, recipients: 200, status: 'active', province: 'National', deadline: '2026-05-30' },
  { name: 'Agricultural Sciences Fund', type: 'Vocational', amount: 3500, recipients: 150, status: 'closed', province: 'Southern', deadline: '2026-01-31' },
  { name: 'Mining Engineering Scholarship', type: 'Industry', amount: 10000, recipients: 30, status: 'closed', province: 'Copperbelt', deadline: '2026-02-28' },
];

const MinistryScholarshipsPage = () => {
  const [search, setSearch] = useState('');
  const filtered = scholarships.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const totalBudget = scholarships.reduce((a, s) => a + (s.amount * s.recipients), 0);
  const totalRecipients = scholarships.reduce((a, s) => a + s.recipients, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" /> Scholarship Manager
          </h1>
          <p className="text-muted-foreground mt-1">Manage national scholarship and bursary programs</p>
        </div>
        <Button onClick={() => toast.success('New scholarship form opened')}><Plus className="h-4 w-4 mr-2" /> Create Program</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <DollarSign className="h-6 w-6 mx-auto text-primary mb-1" />
          <p className="text-2xl font-bold">K{(totalBudget / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-muted-foreground">Total Budget</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <Users className="h-6 w-6 mx-auto text-green-500 mb-1" />
          <p className="text-2xl font-bold">{totalRecipients.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Total Recipients</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <p className="text-2xl font-bold">{scholarships.filter(s => s.status === 'active').length}</p>
          <p className="text-xs text-muted-foreground">Active Programs</p>
        </CardContent></Card>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search scholarships..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(s => (
          <Card key={s.name} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">{s.name}</h3>
                <Badge className={s.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'}>
                  {s.status === 'active' ? <><CheckCircle className="h-3 w-3 mr-1" />Active</> : <><Clock className="h-3 w-3 mr-1" />Closed</>}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary">{s.type}</Badge>
                <Badge variant="outline">{s.province}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm text-center bg-muted/30 rounded-lg p-3">
                <div><p className="font-bold">K{s.amount.toLocaleString()}</p><p className="text-xs text-muted-foreground">Per Student</p></div>
                <div><p className="font-bold">{s.recipients}</p><p className="text-xs text-muted-foreground">Recipients</p></div>
                <div><p className="font-bold">{s.deadline}</p><p className="text-xs text-muted-foreground">Deadline</p></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MinistryScholarshipsPage;
