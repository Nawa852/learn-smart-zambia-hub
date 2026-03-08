import React from 'react';
import { Layers, Clock, Users, CheckCircle, Wrench, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const projects = [
  { title: 'Build a Simple Circuit', skill: 'Electrical', duration: '2 hours', difficulty: 'Beginner', materials: ['Breadboard', 'LEDs', 'Resistors'], progress: 0 },
  { title: 'Wooden Shelf Project', skill: 'Carpentry', duration: '4 hours', difficulty: 'Beginner', materials: ['Pine wood', 'Screws', 'Sandpaper'], progress: 0 },
  { title: 'Basic Car Service', skill: 'Automotive', duration: '3 hours', difficulty: 'Intermediate', materials: ['Oil filter', 'Engine oil', 'Tools'], progress: 0 },
  { title: 'Traditional Nshima Recipe', skill: 'Culinary', duration: '1 hour', difficulty: 'Beginner', materials: ['Mealie meal', 'Vegetables', 'Protein'], progress: 0 },
  { title: 'Solar Phone Charger', skill: 'Digital', duration: '5 hours', difficulty: 'Intermediate', materials: ['Solar panel', 'Controller', 'Battery'], progress: 0 },
  { title: 'Drip Irrigation System', skill: 'Agriculture', duration: '6 hours', difficulty: 'Intermediate', materials: ['Pipes', 'Emitters', 'Tank'], progress: 0 },
  { title: 'Basic Website', skill: 'Digital', duration: '8 hours', difficulty: 'Beginner', materials: ['Computer', 'Text editor'], progress: 0 },
  { title: 'Leaky Faucet Repair', skill: 'Plumbing', duration: '1 hour', difficulty: 'Beginner', materials: ['Washers', 'Wrench', 'Tape'], progress: 0 },
];

const SkillsProjectsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Layers className="h-8 w-8 text-primary" /> Hands-On Projects
      </h1>
      <p className="text-muted-foreground mt-1">Practice your skills with guided projects</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map(p => (
        <Card key={p.title} className="border-none shadow-md">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold">{p.title}</h3>
              <Badge className={p.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'}>{p.difficulty}</Badge>
            </div>
            <div className="flex gap-2 mb-3">
              <Badge variant="secondary">{p.skill}</Badge>
              <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />{p.duration}</Badge>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {p.materials.map(m => <span key={m} className="text-xs bg-muted px-2 py-0.5 rounded">{m}</span>)}
            </div>
            <Progress value={0} className="h-2 mb-3" />
            <Button className="w-full" size="sm" onClick={() => toast.success('Project started!')}>
              <Wrench className="h-4 w-4 mr-2" /> Start Project
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default SkillsProjectsPage;
