import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Lock, Bug, Terminal, Wifi, Eye, AlertTriangle,
  BookOpen, Brain, Video, Trophy, Layers, Server, Globe
} from 'lucide-react';

const learningPaths = [
  { title: 'Network Security', desc: 'Firewalls, IDS/IPS, VPNs, network hardening', progress: 0, icon: Wifi, color: 'from-blue-500 to-cyan-500' },
  { title: 'Ethical Hacking', desc: 'Penetration testing, vulnerability assessment', progress: 0, icon: Bug, color: 'from-red-500 to-orange-500' },
  { title: 'Web App Security', desc: 'OWASP Top 10, SQL injection, XSS prevention', progress: 0, icon: Globe, color: 'from-green-500 to-teal-500' },
  { title: 'Digital Forensics', desc: 'Incident response, evidence collection, analysis', progress: 0, icon: Eye, color: 'from-purple-500 to-indigo-500' },
  { title: 'Cryptography', desc: 'Encryption, hashing, PKI, secure protocols', progress: 0, icon: Lock, color: 'from-yellow-500 to-amber-500' },
  { title: 'Linux & CLI', desc: 'Bash scripting, system admin, server security', progress: 0, icon: Terminal, color: 'from-gray-600 to-gray-800' },
];

const certPrep = [
  { name: 'CompTIA Security+', level: 'Beginner', duration: '40 hours' },
  { name: 'CEH (Certified Ethical Hacker)', level: 'Intermediate', duration: '60 hours' },
  { name: 'CISSP Foundations', level: 'Advanced', duration: '80 hours' },
];

const labs = [
  { title: 'SQL Injection Lab', difficulty: 'Easy', category: 'Web' },
  { title: 'Password Cracking Challenge', difficulty: 'Medium', category: 'Crypto' },
  { title: 'Network Packet Analysis', difficulty: 'Medium', category: 'Network' },
  { title: 'Privilege Escalation', difficulty: 'Hard', category: 'System' },
];

export default function CybersecurityDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield className="w-8 h-8 text-primary" />
          Cybersecurity Academy
        </h1>
        <p className="text-muted-foreground">Master cybersecurity and ethical hacking — from beginner to pro</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button variant="outline" className="h-20 flex-col gap-1" onClick={() => navigate('/cybersecurity/labs')}>
          <Terminal className="w-5 h-5" />
          <span className="text-xs">Practice Labs</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-1" onClick={() => navigate('/ai')}>
          <Brain className="w-5 h-5" />
          <span className="text-xs">AI Mentor</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-1" onClick={() => navigate('/cybersecurity/videos')}>
          <Video className="w-5 h-5" />
          <span className="text-xs">Video Tutorials</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-1" onClick={() => navigate('/leaderboard')}>
          <Trophy className="w-5 h-5" />
          <span className="text-xs">CTF Leaderboard</span>
        </Button>
      </div>

      {/* Learning Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Layers className="w-5 h-5" /> Learning Paths</CardTitle>
          <CardDescription>Structured tracks to build security expertise</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {learningPaths.map((path, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className={`w-12 h-12 mb-3 bg-gradient-to-r ${path.color} rounded-lg flex items-center justify-center`}>
                    <path.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{path.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{path.desc}</p>
                  <Progress value={path.progress} className="h-1.5 mb-1" />
                  <p className="text-xs text-muted-foreground">{path.progress}% complete</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Practice Labs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bug className="w-5 h-5" /> Practice Labs</CardTitle>
          <CardDescription>Hands-on challenges in a safe sandbox environment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {labs.map((lab, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <h4 className="font-semibold text-sm">{lab.title}</h4>
                  <p className="text-xs text-muted-foreground">{lab.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={lab.difficulty === 'Easy' ? 'default' : lab.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                    {lab.difficulty}
                  </Badge>
                  <Button size="sm">Launch</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cert Prep */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5" /> Certification Prep</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {certPrep.map((cert, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-semibold text-sm">{cert.name}</h4>
                  <p className="text-xs text-muted-foreground">{cert.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{cert.level}</Badge>
                  <Button size="sm">Start</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Threat Alert */}
      <Card className="border-destructive/30 bg-destructive/5">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-destructive" />
          <h3 className="text-lg font-bold mb-2">⚠️ Ethical Use Only</h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            All hacking skills taught here are for defensive and ethical purposes only.
            Unauthorized access to systems is illegal. Always practice in authorized environments.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
