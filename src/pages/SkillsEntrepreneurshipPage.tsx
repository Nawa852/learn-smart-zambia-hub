import React from 'react';
import { Rocket, Lightbulb, Users, DollarSign, TrendingUp, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const paths = [
  { name: 'From Skill to Business', steps: ['Identify market need', 'Price your service', 'Find first customer', 'Register business', 'Scale up'], progress: 0 },
  { name: 'Mobile Money Business', steps: ['Get agent license', 'Secure float', 'Find location', 'Build customer base', 'Add services'], progress: 0 },
  { name: 'Agricultural Micro-Business', steps: ['Choose crop/livestock', 'Secure land', 'Source inputs', 'Production', 'Market & sell'], progress: 0 },
  { name: 'Trade Service Business', steps: ['Get certified', 'Buy tools', 'Market services', 'Build reputation', 'Hire assistants'], progress: 0 },
  { name: 'Digital Freelancing', steps: ['Build portfolio', 'Join platforms', 'Bid on projects', 'Deliver & review', 'Scale income'], progress: 0 },
  { name: 'Food Business Startup', steps: ['Develop recipes', 'Get health cert', 'Source ingredients', 'Start selling', 'Expand menu'], progress: 0 },
];

const SkillsEntrepreneurshipPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Rocket className="h-8 w-8 text-primary" /> Micro-Entrepreneurship
      </h1>
      <p className="text-muted-foreground mt-1">Turn your skills into a sustainable business</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {paths.map(p => (
        <Card key={p.name} className="border-none shadow-md">
          <CardContent className="p-5">
            <h3 className="font-semibold text-lg mb-3">{p.name}</h3>
            <div className="space-y-2 mb-3">
              {p.steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">{i + 1}</div>
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <Progress value={0} className="h-2 mb-3" />
            <Button className="w-full" size="sm" onClick={() => toast.success('Path started!')}>
              <Target className="h-4 w-4 mr-2" /> Begin Journey
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default SkillsEntrepreneurshipPage;
