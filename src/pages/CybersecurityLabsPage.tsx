import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Terminal, Shield, Bug, Lock, Wifi, Globe, Server, Play, CheckCircle } from 'lucide-react';

interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  points: number;
  completed: boolean;
  icon: typeof Terminal;
}

const allLabs: Lab[] = [
  { id: '1', title: 'Cross-Site Scripting (XSS)', description: 'Learn to identify and exploit XSS vulnerabilities in web apps', difficulty: 'Beginner', category: 'Web', points: 50, completed: false, icon: Globe },
  { id: '2', title: 'SQL Injection Basics', description: 'Extract data from databases using SQL injection techniques', difficulty: 'Beginner', category: 'Web', points: 50, completed: false, icon: Server },
  { id: '3', title: 'Linux Privilege Escalation', description: 'Escalate from user to root on a Linux system', difficulty: 'Intermediate', category: 'System', points: 100, completed: false, icon: Terminal },
  { id: '4', title: 'WiFi Cracking with Aircrack', description: 'Capture and crack WPA2 handshakes', difficulty: 'Intermediate', category: 'Network', points: 100, completed: false, icon: Wifi },
  { id: '5', title: 'Buffer Overflow Exploitation', description: 'Exploit buffer overflow to gain shell access', difficulty: 'Advanced', category: 'Binary', points: 200, completed: false, icon: Bug },
  { id: '6', title: 'RSA Key Recovery', description: 'Recover private keys from weak RSA implementations', difficulty: 'Advanced', category: 'Crypto', points: 200, completed: false, icon: Lock },
  { id: '7', title: 'Nmap Reconnaissance', description: 'Scan and enumerate network services', difficulty: 'Beginner', category: 'Network', points: 50, completed: false, icon: Wifi },
  { id: '8', title: 'Password Hash Cracking', description: 'Use hashcat/john to crack password hashes', difficulty: 'Intermediate', category: 'Crypto', points: 100, completed: false, icon: Lock },
];

export default function CybersecurityLabsPage() {
  const [labs] = useState(allLabs);
  const categories = ['All', ...new Set(allLabs.map(l => l.category))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Terminal className="w-8 h-8 text-primary" /> Cyber Labs
        </h1>
        <p className="text-muted-foreground">Hands-on practice challenges — earn points and rank up</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">0</p><p className="text-xs text-muted-foreground">Labs Completed</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">0</p><p className="text-xs text-muted-foreground">Total Points</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{labs.length}</p><p className="text-xs text-muted-foreground">Available Labs</p></CardContent></Card>
      </div>

      <Tabs defaultValue="All">
        <TabsList className="flex-wrap h-auto">
          {categories.map(c => <TabsTrigger key={c} value={c}>{c}</TabsTrigger>)}
        </TabsList>
        {categories.map(cat => (
          <TabsContent key={cat} value={cat}>
            <div className="grid gap-4 md:grid-cols-2">
              {labs.filter(l => cat === 'All' || l.category === cat).map(lab => (
                <Card key={lab.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <lab.icon className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">{lab.title}</h3>
                      </div>
                      <Badge variant={lab.difficulty === 'Beginner' ? 'default' : lab.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                        {lab.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{lab.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{lab.points} pts</span>
                      <Button size="sm" className="gap-1">
                        {lab.completed ? <><CheckCircle className="w-3 h-3" /> Completed</> : <><Play className="w-3 h-3" /> Start Lab</>}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
