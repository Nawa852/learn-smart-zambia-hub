import React from 'react';
import { Shield, AlertTriangle, HardHat, Flame, Eye, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const modules = [
  { name: 'Personal Protective Equipment', icon: HardHat, topics: 6, completed: 0, category: 'General' },
  { name: 'Fire Safety & Prevention', icon: Flame, topics: 8, completed: 0, category: 'General' },
  { name: 'Electrical Safety', icon: AlertTriangle, topics: 10, completed: 0, category: 'Trades' },
  { name: 'Chemical Handling', icon: Shield, topics: 7, completed: 0, category: 'General' },
  { name: 'First Aid Basics', icon: Heart, topics: 12, completed: 0, category: 'Health' },
  { name: 'Working at Heights', icon: Eye, topics: 6, completed: 0, category: 'Construction' },
  { name: 'Machine Safety', icon: Shield, topics: 8, completed: 0, category: 'Manufacturing' },
  { name: 'Food Handling Safety', icon: Shield, topics: 9, completed: 0, category: 'Culinary' },
];

const SkillsSafetyPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Shield className="h-8 w-8 text-primary" /> Workplace Safety
      </h1>
      <p className="text-muted-foreground mt-1">Essential safety training for every workplace</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {modules.map(m => (
        <Card key={m.name} className="border-none shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <m.icon className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">{m.name}</h3>
                <Badge variant="outline" className="text-xs">{m.category}</Badge>
              </div>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>{m.completed} / {m.topics} topics</span>
              <span>0%</span>
            </div>
            <Progress value={0} className="h-2 mb-3" />
            <Button className="w-full" size="sm" variant="outline" onClick={() => toast.success('Module started!')}>Start Training</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default SkillsSafetyPage;
