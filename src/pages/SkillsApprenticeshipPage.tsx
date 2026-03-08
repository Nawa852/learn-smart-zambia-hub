import React from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Search, Users, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

const apprenticeships = [
  { title: 'Electrical Installation', company: 'ZamPower Corp', location: 'Lusaka', duration: '12 months', stipend: 'K2,500/mo', spots: 5, category: 'Trades' },
  { title: 'Auto Mechanics', company: 'Toyota Zambia', location: 'Lusaka', duration: '18 months', stipend: 'K3,000/mo', spots: 3, category: 'Automotive' },
  { title: 'Welding & Fabrication', company: 'Konkola Copper', location: 'Copperbelt', duration: '12 months', stipend: 'K2,800/mo', spots: 8, category: 'Trades' },
  { title: 'Culinary Arts', company: 'Taj Pamodzi Hotel', location: 'Lusaka', duration: '6 months', stipend: 'K2,000/mo', spots: 4, category: 'Culinary' },
  { title: 'Carpentry & Joinery', company: 'ZamWood Industries', location: 'Southern', duration: '12 months', stipend: 'K2,200/mo', spots: 6, category: 'Trades' },
  { title: 'Solar Panel Installation', company: 'GreenEnergy Zambia', location: 'Lusaka', duration: '6 months', stipend: 'K3,500/mo', spots: 10, category: 'Digital' },
  { title: 'Agricultural Technology', company: 'ZamBeef', location: 'Central', duration: '12 months', stipend: 'K2,000/mo', spots: 12, category: 'Agriculture' },
  { title: 'Plumbing', company: 'Lusaka Water & Sewerage', location: 'Lusaka', duration: '9 months', stipend: 'K2,400/mo', spots: 7, category: 'Trades' },
];

const SkillsApprenticeshipPage = () => {
  const [search, setSearch] = useState('');
  const filtered = apprenticeships.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Briefcase className="h-8 w-8 text-primary" /> Apprenticeship Marketplace
        </h1>
        <p className="text-muted-foreground mt-1">Find hands-on apprenticeship opportunities</p>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search apprenticeships..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(a => (
          <Card key={a.title} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg mb-1">{a.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{a.company}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline"><MapPin className="h-3 w-3 mr-1" />{a.location}</Badge>
                <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />{a.duration}</Badge>
                <Badge variant="outline"><DollarSign className="h-3 w-3 mr-1" />{a.stipend}</Badge>
                <Badge variant="secondary">{a.category}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground"><Users className="h-3 w-3 inline mr-1" />{a.spots} spots</span>
                <Button size="sm" onClick={() => toast.success('Application submitted!')}>Apply Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkillsApprenticeshipPage;
