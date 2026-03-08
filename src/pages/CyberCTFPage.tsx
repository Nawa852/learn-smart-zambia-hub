import React, { useState, useEffect } from 'react';
import { Flag, Trophy, Timer, Users, Zap, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const challenges = [
  { name: 'Web Exploit 101', category: 'Web', difficulty: 'Easy', points: 100, flag: 'FLAG{xss_is_fun}', hint: 'Check the page source' },
  { name: 'SQL Injection Master', category: 'Web', difficulty: 'Medium', points: 250, flag: 'FLAG{union_select_1}', hint: 'UNION SELECT is your friend' },
  { name: 'Binary Bomb', category: 'Reverse Engineering', difficulty: 'Hard', points: 500, flag: 'FLAG{gdb_master}', hint: 'Use GDB to step through' },
  { name: 'Crypto Challenge', category: 'Cryptography', difficulty: 'Medium', points: 200, flag: 'FLAG{caesar_13}', hint: 'Caesar cipher variant' },
  { name: 'Network Forensics', category: 'Forensics', difficulty: 'Hard', points: 400, flag: 'FLAG{pcap_analysis}', hint: 'Analyze the PCAP file' },
  { name: 'Steganography Hunt', category: 'Forensics', difficulty: 'Easy', points: 150, flag: 'FLAG{hidden_pixel}', hint: 'Not everything is visible' },
  { name: 'Buffer Overflow', category: 'Pwn', difficulty: 'Hard', points: 600, flag: 'FLAG{stack_smash}', hint: 'Stack smashing detected' },
  { name: 'OSINT Investigation', category: 'OSINT', difficulty: 'Medium', points: 300, flag: 'FLAG{google_dork}', hint: 'Google dorking helps' },
  { name: 'Privilege Escalation', category: 'Pwn', difficulty: 'Expert', points: 800, flag: 'FLAG{root_access}', hint: 'Check SUID binaries' },
  { name: 'JWT Token Bypass', category: 'Web', difficulty: 'Medium', points: 350, flag: 'FLAG{alg_none}', hint: 'Algorithm confusion' },
];

const diffColors: Record<string, string> = {
  Easy: 'bg-green-500/10 text-green-600', Medium: 'bg-yellow-500/10 text-yellow-600',
  Hard: 'bg-orange-500/10 text-orange-600', Expert: 'bg-red-500/10 text-red-600',
};

const CyberCTFPage = () => {
  const { user } = useAuth();
  const [flagInput, setFlagInput] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState('all');
  const [solvedSet, setSolvedSet] = useState<Set<string>>(new Set());

  // Countdown timer (1 hour from page load)
  const [endTime] = useState(() => Date.now() + 3600000);
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const t = setInterval(() => {
      const diff = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(diff);
    }, 1000);
    return () => clearInterval(t);
  }, [endTime]);

  // Load user's solved challenges
  const { data: submissions } = useQuery({
    queryKey: ['ctf-submissions', user?.id],
    queryFn: async () => {
      const { data } = await supabase.from('ctf_submissions').select('challenge_name').eq('user_id', user!.id).eq('is_correct', true);
      return data || [];
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (submissions) setSolvedSet(new Set(submissions.map(s => s.challenge_name)));
  }, [submissions]);

  // Leaderboard
  const { data: leaderboard } = useQuery({
    queryKey: ['ctf-leaderboard'],
    queryFn: async () => {
      const { data } = await supabase.from('ctf_submissions').select('user_id, points').eq('is_correct', true);
      if (!data) return [];
      const scores: Record<string, number> = {};
      data.forEach(d => { scores[d.user_id] = (scores[d.user_id] || 0) + d.points; });
      const { data: profiles } = await supabase.from('profiles').select('id, full_name').in('id', Object.keys(scores));
      return Object.entries(scores)
        .map(([id, pts]) => ({ id, name: profiles?.find(p => p.id === id)?.full_name || 'Anonymous', points: pts }))
        .sort((a, b) => b.points - a.points).slice(0, 10);
    },
    refetchInterval: 15000,
  });

  const submitFlag = async (challengeName: string) => {
    if (!user) { toast.error('Please log in'); return; }
    const challenge = challenges.find(c => c.name === challengeName);
    if (!challenge) return;
    const input = (flagInput[challengeName] || '').trim();
    const isCorrect = input === challenge.flag;

    await supabase.from('ctf_submissions').insert({
      user_id: user.id,
      challenge_name: challengeName,
      flag: input,
      is_correct: isCorrect,
      points: isCorrect ? challenge.points : 0,
      category: challenge.category,
    });

    if (isCorrect) {
      toast.success(`🎉 Correct! +${challenge.points} points`);
      setSolvedSet(prev => new Set([...prev, challengeName]));
    } else {
      toast.error('Incorrect flag. Keep trying!');
    }
  };

  const filtered = filter === 'all' ? challenges : challenges.filter(c => c.category === filter);
  const categories = [...new Set(challenges.map(c => c.category))];
  const totalPoints = challenges.reduce((a, c) => a + c.points, 0);
  const earnedPoints = challenges.filter(c => solvedSet.has(c.name)).reduce((a, c) => a + c.points, 0);
  const formatTime = (s: number) => `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Flag className="h-8 w-8 text-primary" /> Capture The Flag
        </h1>
        <p className="text-muted-foreground mt-1">Solve security challenges and capture flags</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <Flag className="h-6 w-6 mx-auto text-primary mb-1" />
          <p className="text-2xl font-bold">{challenges.length}</p>
          <p className="text-xs text-muted-foreground">Challenges</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <Trophy className="h-6 w-6 mx-auto text-yellow-500 mb-1" />
          <p className="text-2xl font-bold">{earnedPoints}/{totalPoints}</p>
          <p className="text-xs text-muted-foreground">Points</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <Lock className="h-6 w-6 mx-auto text-green-500 mb-1" />
          <p className="text-2xl font-bold">{solvedSet.size}</p>
          <p className="text-xs text-muted-foreground">Solved</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <Timer className={`h-6 w-6 mx-auto mb-1 ${timeLeft < 600 ? 'text-destructive' : 'text-primary'}`} />
          <p className="text-2xl font-bold font-mono">{formatTime(timeLeft)}</p>
          <p className="text-xs text-muted-foreground">Time Left</p>
        </CardContent></Card>
      </div>

      {/* Leaderboard */}
      {leaderboard && leaderboard.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-yellow-500" /> Live Leaderboard</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leaderboard.map((entry, i) => (
                <div key={entry.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                  <span className="font-bold text-lg w-8 text-center">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}</span>
                  <span className="flex-1 font-medium">{entry.name}</span>
                  <Badge variant="outline">{entry.points} pts</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2 flex-wrap">
        <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>All</Button>
        {categories.map(c => <Button key={c} variant={filter === c ? 'default' : 'outline'} size="sm" onClick={() => setFilter(c)}>{c}</Button>)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(c => {
          const solved = solvedSet.has(c.name);
          return (
            <Card key={c.name} className={`border-none shadow-md transition-shadow ${solved ? 'opacity-70 ring-2 ring-green-500/30' : 'hover:shadow-lg'}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold flex items-center gap-2">{solved && <Lock className="h-4 w-4 text-green-500" />}{c.name}</h3>
                  <div className="flex gap-2">
                    <Badge variant="outline">{c.category}</Badge>
                    <Badge className={diffColors[c.difficulty]}>{c.difficulty}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Zap className="h-3 w-3" />{c.points} pts</span>
                </div>
                <p className="text-xs text-muted-foreground italic mb-3">💡 Hint: {c.hint}</p>
                {solved ? (
                  <Badge className="bg-green-500/10 text-green-600">✓ Solved</Badge>
                ) : (
                  <div className="flex gap-2">
                    <input className="flex-1 px-3 py-1.5 text-sm rounded-md border bg-background font-mono" placeholder="FLAG{...}" value={flagInput[c.name] || ''} onChange={e => setFlagInput(prev => ({ ...prev, [c.name]: e.target.value }))} />
                    <Button size="sm" onClick={() => submitFlag(c.name)}>Submit</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CyberCTFPage;
