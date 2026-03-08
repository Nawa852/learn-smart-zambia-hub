import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Shield, Play, Pause, Square, Clock, Target, Brain, Flame,
  AlertTriangle, Settings, BookOpen, Timer, Trophy, Zap,
  Bell, Volume2, X, Lock
} from 'lucide-react';
import { useFocusMode, FocusPhase } from '@/hooks/useFocusMode';
import { useDistractionDetector } from '@/hooks/useDistractionDetector';
import { useStudySchedule } from '@/hooks/useStudySchedule';

// Schedule types
interface StudySlot {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  days: string[];
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const phaseColors: Record<FocusPhase, string> = {
  idle: 'from-muted to-muted/50',
  focus: 'from-red-500/20 to-orange-500/20',
  break: 'from-green-500/20 to-emerald-500/20',
  longBreak: 'from-blue-500/20 to-cyan-500/20',
};

const phaseLabels: Record<FocusPhase, string> = {
  idle: 'Ready to Focus',
  focus: '🔥 FOCUS MODE',
  break: '☕ Short Break',
  longBreak: '🌴 Long Break',
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const FocusModePage = () => {
  const {
    state, settings, startFocus, pauseResume, stop, giveUp, updateSettings, getDailyStats
  } = useFocusMode();

  const [subject, setSubject] = useState('');
  const [schedule, setSchedule] = useState<StudySlot[]>(() => {
    const saved = localStorage.getItem('study-schedule');
    return saved ? JSON.parse(saved) : [];
  });
  const [newSlot, setNewSlot] = useState({ subject: '', startTime: '08:00', endTime: '09:00', days: ['Mon'] });
  const [gaveUpCount, setGaveUpCount] = useState(0);
  const [showLockScreen, setShowLockScreen] = useState(false);
  const [wakeLock, setWakeLock] = useState<any>(null);

  const { distractionCount, showWarning, dismissWarning } = useDistractionDetector(
    state.phase === 'focus' && state.isActive,
    state.subject
  );
  const { schedules: dbSchedules, addSchedule: addDbSchedule, removeSchedule: removeDbSchedule } = useStudySchedule();

  const dailyStats = getDailyStats();

  // Wake Lock during focus
  useEffect(() => {
    if (state.phase === 'focus' && state.isActive && 'wakeLock' in navigator) {
      (navigator as any).wakeLock.request('screen').then((wl: any) => setWakeLock(wl)).catch(() => {});
    }
    return () => { if (wakeLock) { wakeLock.release(); setWakeLock(null); } };
  }, [state.phase, state.isActive]);

  // Fullscreen during focus lock screen
  useEffect(() => {
    if (showLockScreen && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (!showLockScreen && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, [showLockScreen]);

  // Save schedule
  useEffect(() => {
    localStorage.setItem('study-schedule', JSON.stringify(schedule));
  }, [schedule]);

  // Show lock screen during focus
  useEffect(() => {
    setShowLockScreen(state.phase === 'focus' && state.isActive);
  }, [state.phase, state.isActive]);

  // Check if there's a scheduled session now
  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();
      const dayName = DAYS[now.getDay() === 0 ? 6 : now.getDay() - 1];
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      const activeSlot = schedule.find(s =>
        s.days.includes(dayName) && s.startTime <= currentTime && s.endTime > currentTime
      );

      if (activeSlot && state.phase === 'idle') {
        // Notify user about scheduled session
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('📚 Study Time!', {
            body: `It's time to study ${activeSlot.subject}. Open Focus Mode to begin.`,
            icon: '/pwa-192x192.png',
          });
        }
      }
    };

    const interval = setInterval(checkSchedule, 60000);
    checkSchedule();
    return () => clearInterval(interval);
  }, [schedule, state.phase]);

  const handleStart = () => {
    if (!subject.trim()) return;
    startFocus(subject);
  };

  const handleGiveUp = () => {
    const count = giveUp();
    setGaveUpCount(count);
  };

  const addScheduleSlot = () => {
    if (!newSlot.subject.trim()) return;
    setSchedule(prev => [...prev, { ...newSlot, id: Date.now().toString() }]);
    setNewSlot({ subject: '', startTime: '08:00', endTime: '09:00', days: ['Mon'] });
  };

  const removeSlot = (id: string) => {
    setSchedule(prev => prev.filter(s => s.id !== id));
  };

  const toggleDay = (day: string) => {
    setNewSlot(prev => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day],
    }));
  };

  const progressPercent = state.phase !== 'idle'
    ? ((state.phase === 'focus' ? settings.focusMinutes * 60 :
        state.phase === 'break' ? settings.breakMinutes * 60 :
        settings.longBreakMinutes * 60) - state.secondsRemaining) /
      (state.phase === 'focus' ? settings.focusMinutes * 60 :
       state.phase === 'break' ? settings.breakMinutes * 60 :
       settings.longBreakMinutes * 60) * 100
    : 0;

  return (
    <div className="space-y-6">
      {/* Lock Screen Overlay */}
      <AnimatePresence>
        {showLockScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-center max-w-md w-full space-y-8"
            >
              <div className="space-y-2">
                <Lock className="w-16 h-16 text-primary mx-auto" />
                <h1 className="text-4xl font-black text-foreground">FOCUS MODE</h1>
                <p className="text-muted-foreground">Stay focused on <span className="font-bold text-foreground">{state.subject}</span></p>
              </div>

              {/* Giant Timer */}
              <div className="relative">
                <svg className="w-64 h-64 mx-auto" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  <circle
                    cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                    strokeDasharray={565}
                    strokeDashoffset={565 - (565 * progressPercent / 100)}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-mono font-black text-foreground">{formatTime(state.secondsRemaining)}</span>
                  <Badge className="mt-2" variant="secondary">{phaseLabels[state.phase]}</Badge>
                </div>
              </div>

              {/* Motivational Quote */}
              <p className="text-sm text-muted-foreground italic">
                "The secret of getting ahead is getting started." — Mark Twain
              </p>

              {/* Session Stats */}
              <div className="flex justify-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{state.sessionsCompleted}</p>
                  <p className="text-xs text-muted-foreground">Sessions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{Math.floor(state.totalFocusSeconds / 60)}m</p>
                  <p className="text-xs text-muted-foreground">Focused</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4">
                <Button size="lg" variant="outline" onClick={pauseResume}>
                  {state.isActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                  {state.isActive ? 'Pause' : 'Resume'}
                </Button>
                <Button size="lg" variant="destructive" onClick={handleGiveUp}>
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Give Up (-XP)
                </Button>
              </div>

              <Button variant="ghost" size="sm" onClick={() => setShowLockScreen(false)} className="text-muted-foreground">
                <X className="w-4 h-4 mr-1" /> Minimize (stay focused!)
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          Focus Mode
        </h1>
        <p className="text-muted-foreground mt-1">Lock in, eliminate distractions, and ace your exams</p>
      </div>

      <Tabs defaultValue="timer" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timer"><Timer className="w-4 h-4 mr-2" />Focus Timer</TabsTrigger>
          <TabsTrigger value="schedule"><Clock className="w-4 h-4 mr-2" />Study Schedule</TabsTrigger>
          <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2" />Settings</TabsTrigger>
        </TabsList>

        {/* ─── Timer Tab ─── */}
        <TabsContent value="timer" className="space-y-6">
          {/* Daily Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card><CardContent className="p-4 text-center">
              <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">{dailyStats.sessions}</p>
              <p className="text-xs text-muted-foreground">Sessions Today</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-primary mx-auto mb-1" />
              <p className="text-2xl font-bold">{Math.floor(dailyStats.totalSeconds / 60)}m</p>
              <p className="text-xs text-muted-foreground">Focus Time</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">{state.sessionsCompleted}</p>
              <p className="text-xs text-muted-foreground">Current Streak</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <AlertTriangle className="w-6 h-6 text-destructive mx-auto mb-1" />
              <p className="text-2xl font-bold">{dailyStats.giveUps}</p>
              <p className="text-xs text-muted-foreground">Gave Up (-XP)</p>
            </CardContent></Card>
          </div>

          {/* Timer Card */}
          <Card className={`border-0 shadow-xl bg-gradient-to-br ${phaseColors[state.phase]}`}>
            <CardContent className="p-8">
              {state.phase === 'idle' ? (
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <Brain className="w-16 h-16 text-primary mx-auto" />
                    <h2 className="text-2xl font-bold">Ready to Study?</h2>
                    <p className="text-muted-foreground">Pick a subject and lock in for {settings.focusMinutes} minutes</p>
                  </div>

                  <div className="max-w-sm mx-auto space-y-4">
                    <div>
                      <Label>What are you studying?</Label>
                      <Input
                        placeholder="e.g., Mathematics, Physics, Biology..."
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        className="text-center text-lg"
                        onKeyDown={e => e.key === 'Enter' && handleStart()}
                      />
                    </div>
                    <Button size="lg" className="w-full text-lg h-14" onClick={handleStart} disabled={!subject.trim()}>
                      <Play className="w-6 h-6 mr-2" />
                      Start Focus Session
                    </Button>
                  </div>

                  <div className="flex justify-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline"><Timer className="w-3 h-3 mr-1" />{settings.focusMinutes}min focus</Badge>
                    <Badge variant="outline"><Zap className="w-3 h-3 mr-1" />{settings.breakMinutes}min break</Badge>
                    <Badge variant="outline"><Target className="w-3 h-3 mr-1" />{settings.sessionsBeforeLongBreak} before long break</Badge>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <Badge variant="secondary" className="text-sm">{state.subject}</Badge>

                  <div className="relative w-48 h-48 mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                      <circle
                        cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                        strokeDasharray={565}
                        strokeDashoffset={565 - (565 * progressPercent / 100)}
                        strokeLinecap="round"
                        transform="rotate(-90 100 100)"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-mono font-black">{formatTime(state.secondsRemaining)}</span>
                      <span className="text-sm text-muted-foreground">{phaseLabels[state.phase]}</span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3">
                    <Button variant="outline" size="lg" onClick={pauseResume}>
                      {state.isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    {state.phase === 'focus' && (
                      <Button variant="outline" size="lg" onClick={() => setShowLockScreen(true)}>
                        <Lock className="w-5 h-5 mr-2" />Full Screen
                      </Button>
                    )}
                    <Button variant="destructive" size="lg" onClick={state.phase === 'focus' ? handleGiveUp : stop}>
                      <Square className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex justify-center gap-6 text-sm">
                    <span>Sessions: <strong>{state.sessionsCompleted}</strong></span>
                    <span>Total: <strong>{Math.floor(state.totalFocusSeconds / 60)}m</strong></span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Schedule Tab ─── */}
        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" />Study Schedule</CardTitle>
              <CardDescription>Set your study timetable and get reminders when it's time to focus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add new slot */}
              <div className="p-4 border rounded-lg space-y-4">
                <h4 className="font-semibold text-sm">Add Study Session</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Subject</Label>
                    <Input
                      placeholder="e.g., Mathematics"
                      value={newSlot.subject}
                      onChange={e => setNewSlot(prev => ({ ...prev, subject: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={newSlot.startTime}
                      onChange={e => setNewSlot(prev => ({ ...prev, startTime: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={newSlot.endTime}
                      onChange={e => setNewSlot(prev => ({ ...prev, endTime: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label>Days</Label>
                  <div className="flex gap-2 mt-1">
                    {DAYS.map(day => (
                      <Button
                        key={day}
                        size="sm"
                        variant={newSlot.days.includes(day) ? 'default' : 'outline'}
                        onClick={() => toggleDay(day)}
                        className="w-10 h-10 p-0"
                      >
                        {day.slice(0, 2)}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button onClick={addScheduleSlot} disabled={!newSlot.subject.trim()}>
                  <Bell className="w-4 h-4 mr-2" />Add to Schedule
                </Button>
              </div>

              {/* Schedule list */}
              {schedule.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No study sessions scheduled yet.</p>
                  <p className="text-sm">Add sessions above and you'll get reminders when it's time to study.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {schedule.map(slot => (
                    <div key={slot.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{slot.subject}</p>
                          <p className="text-sm text-muted-foreground">{slot.startTime} – {slot.endTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {slot.days.map(d => (
                            <Badge key={d} variant="secondary" className="text-[10px]">{d}</Badge>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeSlot(slot.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Settings Tab ─── */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Settings className="w-5 h-5 text-primary" />Focus Settings</CardTitle>
              <CardDescription>Customize your Pomodoro timer and study preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Focus Duration: {settings.focusMinutes} minutes</Label>
                  <Slider
                    value={[settings.focusMinutes]}
                    onValueChange={v => updateSettings({ focusMinutes: v[0] })}
                    min={10} max={60} step={5}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Short Break: {settings.breakMinutes} minutes</Label>
                  <Slider
                    value={[settings.breakMinutes]}
                    onValueChange={v => updateSettings({ breakMinutes: v[0] })}
                    min={3} max={15} step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Long Break: {settings.longBreakMinutes} minutes</Label>
                  <Slider
                    value={[settings.longBreakMinutes]}
                    onValueChange={v => updateSettings({ longBreakMinutes: v[0] })}
                    min={10} max={30} step={5}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Sessions before Long Break: {settings.sessionsBeforeLongBreak}</Label>
                  <Slider
                    value={[settings.sessionsBeforeLongBreak]}
                    onValueChange={v => updateSettings({ sessionsBeforeLongBreak: v[0] })}
                    min={2} max={6} step={1}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Bell className="w-4 h-4" /> Notification Permissions
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Enable notifications to get alarms when sessions start/end and when scheduled study time begins.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    if ('Notification' in window) {
                      Notification.requestPermission();
                    }
                  }}
                >
                  <Volume2 className="w-4 h-4 mr-2" />Enable Notifications
                </Button>
              </div>

              <div className="p-4 border border-destructive/30 bg-destructive/5 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-destructive">
                  <AlertTriangle className="w-4 h-4" /> Give Up Penalty
                </h4>
                <p className="text-sm text-muted-foreground">
                  Leaving a focus session early counts as a "Give Up." Each give up is tracked on your daily record.
                  Stay committed to build your study streak! 🔥
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FocusModePage;
