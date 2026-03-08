import React, { useState } from 'react';
import { Flag, Trophy, Timer, Users, Zap, Lock, Search, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const challenges = [
  { name: 'Web Exploit 101', category: 'Web', difficulty: 'Easy', points: 100, solvers: 342, flag: 'hidden', hint: 'Check the page source', status: 'active' },
  { name: 'SQL Injection Master', category: 'Web', difficulty: 'Medium', points: 250, solvers: 156, flag: 'hidden', hint: 'UNION SELECT is your friend', status: 'active' },
  { name: 'Binary Bomb', category: 'Reverse Engineering', difficulty: 'Hard', points: 500, solvers: 42, flag: 'hidden', hint: 'Use GDB to step through', status: 'active' },
  { name: 'Crypto Challenge', category: 'Cryptography', difficulty: 'Medium', points: 200, solvers: 198, flag: 'hidden', hint: 'Caesar cipher variant', status: 'active' },
  { name: 'Network Forensics', category: 'Forensics', difficulty: 'Hard', points: 400, solvers: 67, flag: 'hidden', hint: 'Analyze the PCAP file', status: 'active' },
  { name: 'Steganography Hunt', category: 'Forensics', difficulty: 'Easy', points: 150, solvers: 289, flag: 'hidden', hint: 'Not everything is visible', status: 'active' },
  { name: 'Buffer Overflow', category: 'Pwn', difficulty: 'Hard', points: 600, solvers: 23, flag: 'hidden', hint: 'Stack smashing detected', status: 'active' },
  { name: 'OSINT Investigation', category: 'OSINT', difficulty: 'Medium', points: 300, solvers: 112, flag: 'hidden', hint: 'Google dorking helps', status: 'active' },
  { name: 'Privilege Escalation', category: 'Pwn', difficulty: 'Expert', points: 800, solvers: 8, flag: 'hidden', hint: 'Check SUID binaries', status: 'active' },
  { name: 'JWT Token Bypass', category: 'Web', difficulty: 'Medium', points: 350, solvers: 89, flag: 'hidden', hint: 'Algorithm confusion', status: 'active' },
];

const diffColors: Record<string, string> = {
  Easy: 'bg-green-500/10 text-green-600',
  Medium: 'bg-yellow-500/10 text-yellow-600',
  Hard: 'bg-orange-500/10 text-orange-600',
  Expert: 'bg-red-500/10 text-red-600',
};

const CyberCTFPage = () => {
  const [flagInput, setFlagInput] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? challenges : challenges.filter(c => c.category === filter);
  const categories = [...new Set(challenges.map(c => c.category))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Flag className="h-8 w-8 text-primary" /> Capture The Flag
        </h1>
        <p className="text-muted-foreground mt-1">Solve security challenges and capture flags ethically</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <Flag className="h-6 w-6 mx-auto text-primary mb-1" />
          <p className="text-2xl font-bold">{challenges.length}</p>
          <p className="text-xs text-muted-foreground">Challenges</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <Trophy className="h-6 w-6 mx-auto text-yellow-500 mb-1" />
          <p className="text-2xl font-bold">{challenges.reduce((a, c) => a + c.points, 0)}</p>
          <p className="text-xs text-muted-foreground">Total Points</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <p className="text-2xl font-bold">{categories.length}</p>
          <p className="text-xs text-muted-foreground">Categories</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <p className="text-2xl font-bold">0</p>
          <p className="text-xs text-muted-foreground">Solved</p>
        </CardContent></Card>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>All</Button>
        {categories.map(c => <Button key={c} variant={filter === c ? 'default' : 'outline'} size="sm" onClick={() => setFilter(c)}>{c}</Button>)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(c => (
          <Card key={c.name} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">{c.name}</h3>
                <div className="flex gap-2">
                  <Badge variant="outline">{c.category}</Badge>
                  <Badge className={diffColors[c.difficulty]}>{c.difficulty}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Zap className="h-3 w-3" />{c.points} pts</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{c.solvers} solvers</span>
              </div>
              <p className="text-xs text-muted-foreground italic mb-3">💡 Hint: {c.hint}</p>
              <div className="flex gap-2">
                <input
                  className="flex-1 px-3 py-1.5 text-sm rounded-md border bg-background"
                  placeholder="Enter flag..."
                  value={flagInput[c.name] || ''}
                  onChange={e => setFlagInput(prev => ({ ...prev, [c.name]: e.target.value }))}
                />
                <Button size="sm" onClick={() => toast.error('Incorrect flag. Keep trying!')}>Submit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CyberCTFPage;
