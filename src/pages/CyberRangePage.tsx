import React from 'react';
import { Shield, Monitor, Trophy, Users, Zap, Target, BarChart3, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ranges = [
  { name: 'Beginner Bootcamp', machines: 10, completed: 0, difficulty: 'Easy', skills: ['Linux', 'Networking', 'Web'] },
  { name: 'Web Exploitation Path', machines: 15, completed: 0, difficulty: 'Medium', skills: ['XSS', 'SQLi', 'SSRF'] },
  { name: 'Active Directory Lab', machines: 8, completed: 0, difficulty: 'Hard', skills: ['AD', 'Kerberos', 'LDAP'] },
  { name: 'Binary Exploitation', machines: 12, completed: 0, difficulty: 'Expert', skills: ['Buffer Overflow', 'ROP', 'Shellcode'] },
  { name: 'Cloud Security Range', machines: 6, completed: 0, difficulty: 'Hard', skills: ['AWS', 'Azure', 'GCP'] },
  { name: 'Red Team Operations', machines: 20, completed: 0, difficulty: 'Expert', skills: ['Recon', 'Initial Access', 'Persistence'] },
];

const CyberRangePage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Monitor className="h-8 w-8 text-primary" /> Cyber Range
      </h1>
      <p className="text-muted-foreground mt-1">Virtual environments for hands-on security practice</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
        <p className="text-3xl font-bold text-primary">{ranges.reduce((a, r) => a + r.machines, 0)}</p>
        <p className="text-sm text-muted-foreground">Total Machines</p>
      </CardContent></Card>
      <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
        <p className="text-3xl font-bold">{ranges.length}</p>
        <p className="text-sm text-muted-foreground">Learning Paths</p>
      </CardContent></Card>
      <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
        <p className="text-3xl font-bold text-green-500">0</p>
        <p className="text-sm text-muted-foreground">Machines Pwned</p>
      </CardContent></Card>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {ranges.map(r => (
        <Card key={r.name} className="border-none shadow-md">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg">{r.name}</h3>
              <Badge className={r.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600' : r.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600' : r.difficulty === 'Hard' ? 'bg-orange-500/10 text-orange-600' : 'bg-red-500/10 text-red-600'}>{r.difficulty}</Badge>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {r.skills.map(s => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>{r.completed} / {r.machines} machines</span>
              <span>0%</span>
            </div>
            <Progress value={0} className="h-2 mb-3" />
            <Button className="w-full" size="sm" onClick={() => toast.success('Deploying virtual lab...')}>
              <Zap className="h-4 w-4 mr-2" /> Enter Range
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default CyberRangePage;
