import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, ShieldCheck, Activity, Clock, Zap, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Alert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  title: string;
  detail: string;
  correctAction: 'block' | 'investigate' | 'ignore' | 'escalate';
}

const ALL_ALERTS: Alert[] = [
  { id: '1', severity: 'critical', source: 'IDS',  title: 'Multiple failed SSH logins from 45.13.22.91', detail: '142 attempts in 60s targeting root account', correctAction: 'block' },
  { id: '2', severity: 'medium',   source: 'EDR',  title: 'PowerShell encoded command on WS-014',         detail: 'User "jdoe" ran base64-encoded script', correctAction: 'investigate' },
  { id: '3', severity: 'low',      source: 'FW',   title: 'Outbound traffic to ad network',               detail: 'tracker.ads.example.com — known marketing CDN', correctAction: 'ignore' },
  { id: '4', severity: 'high',     source: 'SIEM', title: 'Privileged account login at 03:14 UTC',        detail: 'Admin login from new geolocation (NG)', correctAction: 'escalate' },
  { id: '5', severity: 'critical', source: 'EDR',  title: 'Ransomware behavior on FS-02',                 detail: '500+ files renamed with .lockd extension', correctAction: 'block' },
  { id: '6', severity: 'low',      source: 'AV',   title: 'EICAR test file detected',                     detail: 'Quarantined automatically — test signature', correctAction: 'ignore' },
  { id: '7', severity: 'medium',   source: 'SIEM', title: 'Unusual data egress 2.4 GB to external host',  detail: 'Endpoint LP-221 → 198.51.100.14:443', correctAction: 'investigate' },
  { id: '8', severity: 'high',     source: 'IDS',  title: 'Possible SQL injection on /api/login',         detail: '\' OR 1=1-- payload from 203.0.113.7', correctAction: 'escalate' },
];

const SEV_COLOR: Record<Alert['severity'], string> = {
  low: 'bg-blue-500/15 text-blue-600 border-blue-500/30',
  medium: 'bg-yellow-500/15 text-yellow-600 border-yellow-500/30',
  high: 'bg-orange-500/15 text-orange-600 border-orange-500/30',
  critical: 'bg-red-500/15 text-red-600 border-red-500/30',
};

const ACTIONS: { key: Alert['correctAction']; label: string; icon: any }[] = [
  { key: 'block', label: 'Block', icon: ShieldCheck },
  { key: 'investigate', label: 'Investigate', icon: Activity },
  { key: 'escalate', label: 'Escalate', icon: Zap },
  { key: 'ignore', label: 'Ignore', icon: XCircle },
];

const CyberSOCSimulatorPage = () => {
  const [queue, setQueue] = useState<Alert[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [handled, setHandled] = useState(0);
  const [time, setTime] = useState(120); // 2-min shift
  const [active, setActive] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; msg: string } | null>(null);

  const start = () => {
    setQueue([...ALL_ALERTS].sort(() => Math.random() - 0.5));
    setScore(0); setStreak(0); setHandled(0); setTime(120);
    setActive(true); setFeedback(null);
  };

  useEffect(() => {
    if (!active) return;
    const iv = setInterval(() => setTime((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(iv);
  }, [active]);

  useEffect(() => {
    if (active && time === 0) {
      setActive(false);
      toast.success(`Shift complete! Score: ${score}`);
    }
  }, [time, active, score]);

  const decide = (action: Alert['correctAction']) => {
    if (!active || queue.length === 0) return;
    const [current, ...rest] = queue;
    const correct = current.correctAction === action;
    const points = correct ? ({ low: 5, medium: 10, high: 20, critical: 30 }[current.severity]) : -5;
    setScore((s) => s + points);
    setStreak((s) => correct ? s + 1 : 0);
    setHandled((h) => h + 1);
    setFeedback({
      correct,
      msg: correct
        ? `+${points} • Correct: ${current.title}`
        : `Should have been "${current.correctAction}". Lost 5 pts.`,
    });
    setQueue(rest);
    if (rest.length === 0) {
      setActive(false);
      toast.success(`All alerts handled! Final score: ${score + points}`);
    }
  };

  const current = queue[0];
  const accuracy = handled > 0 ? Math.round((streak === handled ? 100 : (score / Math.max(1, handled * 15)) * 100)) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <AlertTriangle className="w-8 h-8 text-primary" /> SOC Mission Simulator
        </h1>
        <p className="text-muted-foreground">Triage live alerts as a Security Operations Center analyst. Make the right call, fast.</p>
      </div>

      {!active && queue.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center space-y-4">
            <ShieldCheck className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-2xl font-bold">Ready for your shift?</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              You have 2 minutes to triage incoming alerts. Choose to <b>block</b>, <b>investigate</b>,
              <b> escalate</b>, or <b>ignore</b>. Higher severity = higher reward (and risk).
            </p>
            <Button size="lg" onClick={start}>Start Shift</Button>
          </CardContent>
        </Card>
      )}

      {(active || queue.length > 0 || handled > 0) && (
        <div className="grid lg:grid-cols-[1fr,300px] gap-4">
          {/* Live alert */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" /> Live Alert
              </CardTitle>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {current ? (
                <>
                  <div className={cn('rounded-lg border p-4', SEV_COLOR[current.severity])}>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{current.source}</Badge>
                      <Badge className={SEV_COLOR[current.severity]}>{current.severity.toUpperCase()}</Badge>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{current.title}</h3>
                    <p className="text-sm text-muted-foreground">{current.detail}</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {ACTIONS.map((a) => (
                      <Button
                        key={a.key}
                        variant="outline"
                        onClick={() => decide(a.key)}
                        disabled={!active}
                        className="h-16 flex-col gap-1"
                      >
                        <a.icon className="w-4 h-4" />
                        <span className="text-xs">{a.label}</span>
                      </Button>
                    ))}
                  </div>

                  {feedback && (
                    <div
                      className={cn(
                        'rounded-md p-3 text-sm flex items-start gap-2',
                        feedback.correct
                          ? 'bg-green-500/10 text-green-600 border border-green-500/30'
                          : 'bg-red-500/10 text-red-600 border border-red-500/30'
                      )}
                    >
                      {feedback.correct ? <CheckCircle2 className="w-4 h-4 mt-0.5" /> : <XCircle className="w-4 h-4 mt-0.5" />}
                      <span>{feedback.msg}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                  <p className="font-semibold">Shift complete!</p>
                  <Button onClick={start}>Run another shift</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Performance</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Stat label="Score" value={score} />
                <Stat label="Streak" value={streak} />
                <Stat label="Handled" value={`${handled} / ${ALL_ALERTS.length}`} />
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Time</span>
                    <span>{Math.round((time / 120) * 100)}%</span>
                  </div>
                  <Progress value={(time / 120) * 100} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: any }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="font-bold text-lg">{value}</span>
  </div>
);

export default CyberSOCSimulatorPage;
