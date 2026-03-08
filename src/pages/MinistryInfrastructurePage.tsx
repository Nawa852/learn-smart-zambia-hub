import React, { useState } from 'react';
import { Building, Wifi, Droplets, Zap, BookOpen, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const infrastructure = [
  { province: 'Lusaka', electricity: 89, water: 82, internet: 72, libraries: 65, labs: 58 },
  { province: 'Copperbelt', electricity: 85, water: 78, internet: 65, libraries: 55, labs: 50 },
  { province: 'Southern', electricity: 68, water: 62, internet: 38, libraries: 30, labs: 25 },
  { province: 'Central', electricity: 62, water: 58, internet: 32, libraries: 28, labs: 22 },
  { province: 'Eastern', electricity: 45, water: 42, internet: 18, libraries: 15, labs: 12 },
  { province: 'Northern', electricity: 38, water: 35, internet: 12, libraries: 10, labs: 8 },
  { province: 'Luapula', electricity: 32, water: 30, internet: 10, libraries: 8, labs: 6 },
  { province: 'Northwestern', electricity: 40, water: 38, internet: 15, libraries: 12, labs: 10 },
  { province: 'Western', electricity: 28, water: 25, internet: 8, libraries: 6, labs: 5 },
  { province: 'Muchinga', electricity: 25, water: 22, internet: 6, libraries: 5, labs: 4 },
];

const metrics = [
  { key: 'electricity' as const, label: 'Electricity', icon: Zap, color: 'text-yellow-500' },
  { key: 'water' as const, label: 'Clean Water', icon: Droplets, color: 'text-blue-500' },
  { key: 'internet' as const, label: 'Internet', icon: Wifi, color: 'text-green-500' },
  { key: 'libraries' as const, label: 'Libraries', icon: BookOpen, color: 'text-purple-500' },
];

const MinistryInfrastructurePage = () => {
  const [search, setSearch] = useState('');
  const filtered = infrastructure.filter(i => i.province.toLowerCase().includes(search.toLowerCase()));
  const natAvg = (key: keyof typeof infrastructure[0]) => Math.round(infrastructure.reduce((a, i) => a + (i[key] as number), 0) / infrastructure.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Building className="h-8 w-8 text-primary" /> Infrastructure Audit
        </h1>
        <p className="text-muted-foreground mt-1">School infrastructure coverage by province</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map(m => (
          <Card key={m.key} className="border-none shadow-lg">
            <CardContent className="p-4 text-center">
              <m.icon className={`h-6 w-6 mx-auto mb-1 ${m.color}`} />
              <p className="text-2xl font-bold">{natAvg(m.key)}%</p>
              <p className="text-xs text-muted-foreground">{m.label} (Avg)</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search province..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(prov => (
          <Card key={prov.province} className="border-none shadow-md">
            <CardHeader className="pb-2"><CardTitle className="text-lg">{prov.province}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {metrics.map(m => (
                <div key={m.key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-1"><m.icon className={`h-3 w-3 ${m.color}`} />{m.label}</span>
                    <span className="font-medium">{prov[m.key]}%</span>
                  </div>
                  <Progress value={prov[m.key]} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MinistryInfrastructurePage;
