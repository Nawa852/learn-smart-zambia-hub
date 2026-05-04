import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Lock, CheckCircle2, Trophy, ChevronRight, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface Skill {
  id: string;
  title: string;
  desc: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
  xp: number;
  prereq?: string[];
  href?: string;
}

const TREE: Skill[] = [
  { id: 'fund', title: 'Cyber Fundamentals', desc: 'CIA triad, threats, basic networking', level: 'Beginner', xp: 50, href: '/cybersecurity?tab=overview' },
  { id: 'linux', title: 'Linux Command Line', desc: 'Shell, files, permissions, processes', level: 'Beginner', xp: 75, prereq: ['fund'], href: '/cyber-terminal' },
  { id: 'net', title: 'Network Analysis', desc: 'TCP/IP, ports, packet capture', level: 'Beginner', xp: 75, prereq: ['fund'], href: '/cybersecurity?tab=network' },
  { id: 'crypto', title: 'Cryptography Basics', desc: 'Hashing, symmetric & asymmetric encryption', level: 'Intermediate', xp: 100, prereq: ['fund'], href: '/cybersecurity?tab=crypto' },
  { id: 'web', title: 'Web Application Security', desc: 'OWASP Top 10, XSS, SQLi, CSRF', level: 'Intermediate', xp: 125, prereq: ['linux'], href: '/cybersecurity?tab=web' },
  { id: 'forensics', title: 'Digital Forensics', desc: 'Disk imaging, memory analysis, evidence', level: 'Intermediate', xp: 125, prereq: ['linux'], href: '/cybersecurity?tab=forensics' },
  { id: 'pentest', title: 'Penetration Testing', desc: 'Recon, exploitation, post-exploitation', level: 'Advanced', xp: 200, prereq: ['web', 'net'], href: '/cybersecurity?tab=labs' },
  { id: 'ir', title: 'Incident Response', desc: 'Detect, contain, eradicate, recover', level: 'Advanced', xp: 200, prereq: ['forensics'], href: '/cyber-soc' },
  { id: 'red', title: 'Red Team Operations', desc: 'Adversary emulation, evasion', level: 'Pro', xp: 300, prereq: ['pentest'] },
  { id: 'blue', title: 'Blue Team Defense', desc: 'SIEM, threat hunting, hardening', level: 'Pro', xp: 300, prereq: ['ir'] },
];

const LEVEL_COLOR: Record<Skill['level'], string> = {
  Beginner: 'bg-green-500/15 text-green-600 border-green-500/30',
  Intermediate: 'bg-blue-500/15 text-blue-600 border-blue-500/30',
  Advanced: 'bg-orange-500/15 text-orange-600 border-orange-500/30',
  Pro: 'bg-purple-500/15 text-purple-600 border-purple-500/30',
};

const STORAGE_KEY = 'edu-zambia-cyber-skills';

const CyberSkillTreePage = () => {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      setCompleted(new Set(saved));
    } catch { /* noop */ }
  }, []);

  const toggle = (id: string, locked: boolean) => {
    if (locked) return;
    const next = new Set(completed);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCompleted(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
  };

  const isLocked = (s: Skill) => !!s.prereq?.some((p) => !completed.has(p));
  const totalXP = TREE.reduce((sum, s) => sum + (completed.has(s.id) ? s.xp : 0), 0);
  const maxXP = TREE.reduce((sum, s) => sum + s.xp, 0);
  const progress = Math.round((completed.size / TREE.length) * 100);

  const groups: Skill['level'][] = ['Beginner', 'Intermediate', 'Advanced', 'Pro'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" /> Zero-to-Hero Skill Tree
        </h1>
        <p className="text-muted-foreground">Track your mastery from beginner to pro across 10 cyber skills.</p>
      </div>

      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/30">
        <CardContent className="p-5 grid sm:grid-cols-3 gap-4">
          <Stat icon={Trophy} label="Skills Mastered" value={`${completed.size} / ${TREE.length}`} />
          <Stat icon={GraduationCap} label="Total XP" value={`${totalXP} / ${maxXP}`} />
          <div>
            <p className="text-xs text-muted-foreground mb-1">Path Progress</p>
            <Progress value={progress} />
            <p className="text-xs text-right mt-1 font-semibold">{progress}%</p>
          </div>
        </CardContent>
      </Card>

      {groups.map((level) => (
        <div key={level} className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{level}</h2>
            <Badge className={LEVEL_COLOR[level]}>
              {TREE.filter((s) => s.level === level && completed.has(s.id)).length}
              {' / '}
              {TREE.filter((s) => s.level === level).length}
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {TREE.filter((s) => s.level === level).map((s) => {
              const locked = isLocked(s);
              const done = completed.has(s.id);
              return (
                <Card
                  key={s.id}
                  className={cn(
                    'transition-all',
                    locked && 'opacity-50',
                    done && 'border-primary bg-primary/5'
                  )}
                >
                  <CardHeader className="pb-2 flex flex-row items-start justify-between gap-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      {locked ? <Lock className="w-4 h-4 text-muted-foreground" /> :
                        done ? <CheckCircle2 className="w-4 h-4 text-primary" /> : null}
                      {s.title}
                    </CardTitle>
                    <Badge className={LEVEL_COLOR[s.level]}>{s.xp} XP</Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                    {locked && s.prereq && (
                      <p className="text-xs text-muted-foreground">
                        Requires: {s.prereq.map((p) => TREE.find((t) => t.id === p)?.title).join(', ')}
                      </p>
                    )}
                    <div className="flex gap-2">
                      {s.href && !locked && (
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => navigate(s.href!)}>
                          Learn <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant={done ? 'default' : 'secondary'}
                        disabled={locked}
                        onClick={() => toggle(s.id, locked)}
                        className="flex-1"
                      >
                        {done ? 'Mastered ✓' : 'Mark Complete'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const Stat = ({ icon: Icon, label, value }: { icon: any; label: string; value: any }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-bold text-lg">{value}</p>
    </div>
  </div>
);

export default CyberSkillTreePage;
