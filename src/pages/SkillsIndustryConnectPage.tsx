import React from 'react';
import { Building2, Users, Briefcase, Globe, Star, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const partners = [
  { name: 'TEVETA Zambia', type: 'Government', focus: 'Technical Training', programs: 15, location: 'National' },
  { name: 'Toyota Zambia', type: 'Industry', focus: 'Automotive Training', programs: 3, location: 'Lusaka' },
  { name: 'FQM Mining', type: 'Industry', focus: 'Technical Skills', programs: 5, location: 'Copperbelt' },
  { name: 'Zambeef Products', type: 'Industry', focus: 'Agriculture', programs: 4, location: 'Central' },
  { name: 'MTN Zambia', type: 'Industry', focus: 'Digital Skills', programs: 6, location: 'National' },
  { name: 'ZESCO', type: 'Government', focus: 'Electrical Training', programs: 8, location: 'National' },
  { name: 'Radisson Blu', type: 'Industry', focus: 'Hospitality', programs: 3, location: 'Lusaka' },
  { name: 'GIZ Zambia', type: 'NGO', focus: 'Vocational Training', programs: 10, location: 'National' },
];

const SkillsIndustryConnectPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Building2 className="h-8 w-8 text-primary" /> Industry Connect
      </h1>
      <p className="text-muted-foreground mt-1">Connect with industry partners for opportunities</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {partners.map(p => (
        <Card key={p.name} className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <Badge variant={p.type === 'Government' ? 'default' : p.type === 'NGO' ? 'secondary' : 'outline'}>{p.type}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{p.focus}</p>
            <div className="flex gap-2 mb-3">
              <Badge variant="outline"><MapPin className="h-3 w-3 mr-1" />{p.location}</Badge>
              <Badge variant="outline"><Briefcase className="h-3 w-3 mr-1" />{p.programs} programs</Badge>
            </div>
            <Button className="w-full" size="sm" variant="outline" onClick={() => toast.success('Connection request sent!')}>
              <Users className="h-4 w-4 mr-2" /> Connect
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default SkillsIndustryConnectPage;
