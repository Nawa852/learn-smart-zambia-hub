import React from 'react';
import { Package, MapPin, BookOpen, Monitor, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const resources = [
  { type: 'Textbooks', icon: BookOpen, distributed: 2400000, target: 3000000, provinces: ['Lusaka', 'Copperbelt', 'Southern'] },
  { type: 'Computers', icon: Monitor, distributed: 45000, target: 100000, provinces: ['Lusaka', 'Copperbelt'] },
  { type: 'Lab Equipment', icon: Package, distributed: 1200, target: 5000, provinces: ['Lusaka'] },
  { type: 'Desks & Chairs', icon: Package, distributed: 350000, target: 500000, provinces: ['National'] },
  { type: 'School Buses', icon: Truck, distributed: 120, target: 500, provinces: ['Rural'] },
];

const MinistryResourceAllocationPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Package className="h-8 w-8 text-primary" /> Resource Allocation
      </h1>
      <p className="text-muted-foreground mt-1">Track distribution of educational resources nationally</p>
    </div>
    <div className="space-y-4">
      {resources.map(r => {
        const pct = (r.distributed / r.target) * 100;
        return (
          <Card key={r.type} className="border-none shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <r.icon className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold text-lg">{r.type}</p>
                    <div className="flex gap-1">{r.provinces.map(p => <Badge key={p} variant="outline" className="text-xs">{p}</Badge>)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl">{pct.toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">{r.distributed.toLocaleString()} / {r.target.toLocaleString()}</p>
                </div>
              </div>
              <Progress value={pct} className="h-3" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
);

export default MinistryResourceAllocationPage;
