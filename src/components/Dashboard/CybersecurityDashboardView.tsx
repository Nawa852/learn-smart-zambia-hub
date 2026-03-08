import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Shield, Terminal, Bug, Video, Trophy, Lock, Brain, AlertTriangle } from 'lucide-react';

const CybersecurityDashboardView = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2"><Shield className="w-6 h-6" /> Cybersecurity Dashboard</h2>
        <p className="text-muted-foreground">Your ethical hacking & security training command center</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Practice Labs', icon: Terminal, path: '/cybersecurity/labs', color: 'text-green-500' },
          { label: 'AI Mentor', icon: Brain, path: '/ai', color: 'text-purple-500' },
          { label: 'Video Tutorials', icon: Video, path: '/cybersecurity/videos', color: 'text-red-500' },
          { label: 'CTF Rankings', icon: Trophy, path: '/leaderboard', color: 'text-yellow-500' },
        ].map((item) => (
          <Card key={item.label} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(item.path)}>
            <CardContent className="p-4 text-center">
              <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
              <p className="text-sm font-medium">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Bug className="w-5 h-5" /> Active Challenges</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: 'Web App Pentesting', difficulty: 'Medium', points: 100 },
            { name: 'Network Recon', difficulty: 'Easy', points: 50 },
            { name: 'Binary Exploitation', difficulty: 'Hard', points: 200 },
          ].map((challenge) => (
            <div key={challenge.name} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">{challenge.name}</p>
                <p className="text-xs text-muted-foreground">{challenge.points} pts</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={challenge.difficulty === 'Easy' ? 'default' : challenge.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                  {challenge.difficulty}
                </Badge>
                <Button size="sm">Start</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
          <p className="text-sm">Remember: Only practice on authorized systems. Ethical hacking = legal hacking.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CybersecurityDashboardView;
