import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Timer, Play, Pause, RotateCcw, Coffee, Brain, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

type Mode = 'focus' | 'short-break' | 'long-break';

const DURATIONS: Record<Mode, number> = { focus: 25 * 60, 'short-break': 5 * 60, 'long-break': 15 * 60 };
const SUBJECTS = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Biology', 'Chemistry', 'Physics', 'ICT', 'General'];

const PomodoroPage = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode>('focus');
  const [timeLeft, setTimeLeft] = useState(DURATIONS.focus);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [subject, setSubject] = useState('General');
  const [soundOn, setSoundOn] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const startTimeRef = useRef<Date>();

  const totalTime = DURATIONS[mode];
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const playSound = useCallback(() => {
    if (!soundOn) return;
    try { new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbsGczE').play(); } catch {}
  }, [soundOn]);

  useEffect(() => {
    if (!running) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          playSound();
          if (mode === 'focus') {
            const newSessions = sessions + 1;
            setSessions(newSessions);
            saveSession();
            toast.success(`Focus session #${newSessions} complete! 🎉`);
            setMode(newSessions % 4 === 0 ? 'long-break' : 'short-break');
          } else {
            toast.info('Break over! Ready to focus?');
            setMode('focus');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, mode, sessions]);

  useEffect(() => { setTimeLeft(DURATIONS[mode]); }, [mode]);

  const saveSession = async () => {
    if (!user) return;
    await (supabase as any).from('focus_sessions').insert({
      user_id: user.id, subject, focus_minutes: 25, sessions_completed: 1,
      started_at: startTimeRef.current?.toISOString() || new Date().toISOString(),
      ended_at: new Date().toISOString(), gave_up: false, distraction_count: 0,
    });
  };

  const toggle = () => {
    if (!running) startTimeRef.current = new Date();
    setRunning(!running);
  };
  const reset = () => { setRunning(false); setTimeLeft(DURATIONS[mode]); };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const modeColors: Record<Mode, string> = {
    focus: 'text-primary', 'short-break': 'text-green-500', 'long-break': 'text-blue-500',
  };

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Timer className="w-6 h-6 text-primary" /> Pomodoro Timer
        </h1>
        <p className="text-sm text-muted-foreground">Stay focused with timed study sessions</p>
      </div>

      <Card>
        <CardContent className="p-6 text-center space-y-6">
          <div className="flex justify-center gap-2">
            {(['focus', 'short-break', 'long-break'] as Mode[]).map(m => (
              <Button key={m} variant={mode === m ? 'default' : 'outline'} size="sm"
                onClick={() => { setMode(m); setRunning(false); }}
                disabled={running}>
                {m === 'focus' ? <Brain className="w-3 h-3 mr-1" /> : <Coffee className="w-3 h-3 mr-1" />}
                {m === 'focus' ? 'Focus' : m === 'short-break' ? 'Short Break' : 'Long Break'}
              </Button>
            ))}
          </div>

          <motion.div className={`text-7xl font-mono font-bold ${modeColors[mode]}`}
            key={timeLeft} initial={{ scale: 1.05 }} animate={{ scale: 1 }}>
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </motion.div>

          <Progress value={progress} className="h-2" />

          <div className="flex justify-center gap-3">
            <Button size="lg" onClick={toggle} className="min-w-[120px]">
              {running ? <><Pause className="w-4 h-4 mr-2" />Pause</> : <><Play className="w-4 h-4 mr-2" />Start</>}
            </Button>
            <Button size="lg" variant="outline" onClick={reset}><RotateCcw className="w-4 h-4" /></Button>
            <Button size="icon" variant="ghost" onClick={() => setSoundOn(!soundOn)}>
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
          </div>

          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger className="w-48 mx-auto"><SelectValue /></SelectTrigger>
            <SelectContent>
              {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Today's Progress</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="text-center flex-1">
            <p className="text-3xl font-bold text-primary">{sessions}</p>
            <p className="text-xs text-muted-foreground">Sessions</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-3xl font-bold text-primary">{sessions * 25}</p>
            <p className="text-xs text-muted-foreground">Minutes</p>
          </div>
          <div className="text-center flex-1">
            <Badge variant="secondary" className="text-xs">{subject}</Badge>
            <p className="text-xs text-muted-foreground mt-1">Subject</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PomodoroPage;
