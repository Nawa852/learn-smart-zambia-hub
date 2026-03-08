import React from 'react';
import { Bug, DollarSign, Trophy, Shield, Globe, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const programs = [
  { name: 'XSS Hunter', scope: 'Web Applications', reward: '$50-$500', difficulty: 'Easy', findings: 0 },
  { name: 'API Security Challenge', scope: 'REST APIs', reward: '$100-$1000', difficulty: 'Medium', findings: 0 },
  { name: 'Authentication Bypass', scope: 'Login Systems', reward: '$200-$2000', difficulty: 'Hard', findings: 0 },
  { name: 'IDOR Discovery', scope: 'Data Access Controls', reward: '$100-$800', difficulty: 'Medium', findings: 0 },
  { name: 'SSRF Investigation', scope: 'Server-side Requests', reward: '$300-$3000', difficulty: 'Hard', findings: 0 },
  { name: 'Rate Limiting Bypass', scope: 'API Endpoints', reward: '$50-$300', difficulty: 'Easy', findings: 0 },
];

const CyberBugBountyPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Bug className="h-8 w-8 text-primary" /> Bug Bounty Practice
      </h1>
      <p className="text-muted-foreground mt-1">Practice finding vulnerabilities in simulated environments</p>
    </div>
    <Card className="border-none shadow-lg bg-gradient-to-br from-green-500/5 to-green-500/10">
      <CardContent className="p-4">
        <p className="text-sm">🛡️ <strong>Ethical Note:</strong> These are simulated targets designed for learning. Never test real systems without authorization.</p>
      </CardContent>
    </Card>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {programs.map(p => (
        <Card key={p.name} className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">Scope: {p.scope}</p>
            <div className="flex gap-2 mb-3">
              <Badge variant="outline"><DollarSign className="h-3 w-3 mr-1" />{p.reward}</Badge>
              <Badge className={p.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600' : p.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-red-500/10 text-red-600'}>{p.difficulty}</Badge>
            </div>
            <Button className="w-full" size="sm" onClick={() => toast.success('Launching practice environment...')}>
              <Target className="h-4 w-4 mr-2" /> Start Hunting
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default CyberBugBountyPage;
