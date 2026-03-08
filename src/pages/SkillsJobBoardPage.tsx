import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Search, Building2, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const jobs = [
  { title: 'Junior Electrician', company: 'ZESCO', location: 'Lusaka', type: 'Full-time', salary: 'K4,000-K6,000', posted: '2 days ago', category: 'Trades' },
  { title: 'Auto Mechanic', company: 'CFAO Motors', location: 'Lusaka', type: 'Full-time', salary: 'K3,500-K5,500', posted: '1 day ago', category: 'Automotive' },
  { title: 'Welding Technician', company: 'FQM', location: 'Copperbelt', type: 'Contract', salary: 'K5,000-K8,000', posted: '3 days ago', category: 'Trades' },
  { title: 'Chef de Partie', company: 'Radisson Blu', location: 'Lusaka', type: 'Full-time', salary: 'K3,000-K4,500', posted: '1 week ago', category: 'Culinary' },
  { title: 'Solar Technician', company: 'SolarAfrica', location: 'Multiple', type: 'Full-time', salary: 'K4,500-K7,000', posted: '5 days ago', category: 'Digital' },
  { title: 'Carpenter', company: 'Riveria Construction', location: 'Lusaka', type: 'Contract', salary: 'K3,000-K5,000', posted: '3 days ago', category: 'Trades' },
  { title: 'Farm Manager', company: 'Zambeef', location: 'Central', type: 'Full-time', salary: 'K6,000-K10,000', posted: '1 week ago', category: 'Agriculture' },
  { title: 'Graphic Designer', company: 'Yalelo Creative', location: 'Remote', type: 'Freelance', salary: 'K2,500-K4,000', posted: '2 days ago', category: 'Digital' },
  { title: 'Plumbing Technician', company: 'LWSC', location: 'Lusaka', type: 'Full-time', salary: 'K3,500-K5,000', posted: '4 days ago', category: 'Trades' },
  { title: 'Hairstylist', company: 'Kanyanta Salon', location: 'Lusaka', type: 'Part-time', salary: 'K2,000-K3,500', posted: '1 day ago', category: 'Creative' },
];

const SkillsJobBoardPage = () => {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const filtered = jobs.filter(j => (cat === 'all' || j.category === cat) && (j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Briefcase className="h-8 w-8 text-primary" /> Job Board
        </h1>
        <p className="text-muted-foreground mt-1">Find employment opportunities matching your skills</p>
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search jobs..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="w-36"><Filter className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {['Trades', 'Automotive', 'Culinary', 'Digital', 'Agriculture', 'Creative'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-3">
        {filtered.map(j => (
          <Card key={j.title + j.company} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{j.title}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Building2 className="h-3 w-3" />{j.company}
                  <MapPin className="h-3 w-3 ml-2" />{j.location}
                </p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline">{j.type}</Badge>
                  <Badge variant="secondary">{j.category}</Badge>
                  <Badge variant="outline"><DollarSign className="h-3 w-3 mr-1" />{j.salary}</Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-2">{j.posted}</p>
                <Button size="sm" onClick={() => toast.success('Application sent!')}>Apply</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkillsJobBoardPage;
