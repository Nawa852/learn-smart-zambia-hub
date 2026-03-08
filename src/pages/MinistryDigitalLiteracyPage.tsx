import React from 'react';
import { Laptop, Wifi, Users, School, TrendingUp, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const initiatives = [
  { name: 'Smart Classroom Project', schools: 450, target: 2000, status: 'active' },
  { name: 'Teacher Digital Skills', trained: 8500, target: 25000, status: 'active' },
  { name: 'Student Tablet Program', distributed: 35000, target: 200000, status: 'active' },
  { name: 'Rural Internet Connectivity', connected: 800, target: 5000, status: 'active' },
  { name: 'E-Learning Content Library', courses: 250, target: 1000, status: 'active' },
  { name: 'Digital Assessment System', schools: 120, target: 3000, status: 'pilot' },
];

const MinistryDigitalLiteracyPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Laptop className="h-8 w-8 text-primary" /> Digital Literacy Initiative
      </h1>
      <p className="text-muted-foreground mt-1">National digital transformation in education</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {initiatives.map(i => {
        const current = (i as any).schools || (i as any).trained || (i as any).distributed || (i as any).connected || (i as any).courses;
        const pct = (current / i.target) * 100;
        return (
          <Card key={i.name} className="border-none shadow-md">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold">{i.name}</h3>
                <Badge className={i.status === 'pilot' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-green-500/10 text-green-600'}>{i.status}</Badge>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>{current.toLocaleString()} / {i.target.toLocaleString()}</span>
                <span className="font-medium">{pct.toFixed(0)}%</span>
              </div>
              <Progress value={pct} className="h-2" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
);

export default MinistryDigitalLiteracyPage;
