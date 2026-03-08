import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Shield, Bell, Moon, Smartphone, Calendar, Clock, Play,
  Trash2, CheckCircle2, XCircle, Plus, Timer, AlertTriangle, Flame
} from 'lucide-react';
import { useStudySchedule } from '@/hooks/useStudySchedule';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { getNotificationPermission, requestNotificationPermission } from '@/utils/pushNotifications';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const AppControlPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { schedules, addSchedule, removeSchedule, getActiveNow } = useStudySchedule();
  const [notifPermission, setNotifPermission] = useState<string>('default');
  const [focusStats, setFocusStats] = useState({ sessions: 0, minutes: 0, distractions: 0, giveUps: 0 });

  // Schedule form
  const [newSubject, setNewSubject] = useState('');
  const [newStart, setNewStart] = useState('16:00');
  const [newEnd, setNewEnd] = useState('17:00');
  const [newDays, setNewDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);

  const activeNow = getActiveNow();

  useEffect(() => {
    const perm = getNotificationPermission();
    setNotifPermission(perm === 'unsupported' ? 'unsupported' : perm);
  }, []);

  // Fetch today's focus stats
  useEffect(() => {
    if (!user) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    supabase
      .from('focus_sessions')
      .select('*')
      .eq('user_id', user.id)
      .gte('started_at', today.toISOString())
      .then(({ data }) => {
        if (data) {
          setFocusStats({
            sessions: data.filter(s => !s.gave_up).length,
            minutes: data.reduce((sum, s) => sum + (s.focus_minutes || 0), 0),
            distractions: data.reduce((sum, s) => sum + (s.distraction_count || 0), 0),
            giveUps: data.filter(s => s.gave_up).length,
          });
        }
      });
  }, [user]);

  const handleRequestNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotifPermission(granted ? 'granted' : 'denied');
  };

  const handleAddSchedule = async () => {
    if (!newSubject.trim()) return;
    await addSchedule({ subject: newSubject, startTime: newStart, endTime: newEnd, days: newDays });
    setNewSubject('');
    toast({ title: 'Schedule added!' });
  };

  const toggleDay = (day: string) => {
    setNewDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          App Control Center
        </h1>
        <p className="text-muted-foreground mt-1">Manage your device settings, study schedule, and focus stats</p>
      </div>

      {/* Active Schedule Alert */}
      {activeNow && (
        <Card className="border-primary bg-primary/10">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary" />
              <div>
                <p className="font-bold text-foreground">You should be studying {activeNow.subject}!</p>
                <p className="text-sm text-muted-foreground">{activeNow.startTime} – {activeNow.endTime}</p>
              </div>
            </div>
            <Button onClick={() => navigate(`/focus-mode?subject=${encodeURIComponent(activeNow.subject)}`)}>
              <Play className="w-4 h-4 mr-2" />Start Focus
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Device Status */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 flex items-start gap-4">
            <Bell className={`w-8 h-8 shrink-0 ${notifPermission === 'granted' ? 'text-primary' : 'text-muted-foreground'}`} />
            <div className="flex-1">
              <p className="font-semibold">Notifications</p>
              <Badge variant={notifPermission === 'granted' ? 'default' : 'secondary'} className="mt-1">
                {notifPermission === 'granted' ? 'Enabled' : notifPermission === 'denied' ? 'Blocked' : 'Off'}
              </Badge>
              {notifPermission !== 'granted' && notifPermission !== 'unsupported' && (
                <Button size="sm" variant="outline" className="mt-2 w-full" onClick={handleRequestNotifications}>
                  Enable
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start gap-4">
            <Moon className="w-8 h-8 shrink-0 text-purple-500" />
            <div>
              <p className="font-semibold">Do Not Disturb</p>
              <p className="text-xs text-muted-foreground mt-1">Set up via your phone's Settings → Focus / DND</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start gap-4">
            <Smartphone className="w-8 h-8 shrink-0 text-primary" />
            <div>
              <p className="font-semibold">Social Media Limits</p>
              <p className="text-xs text-muted-foreground mt-1">Use Screen Time (iOS) or Digital Wellbeing (Android)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Focus Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Timer className="w-5 h-5 text-primary" />Today's Focus Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">{focusStats.sessions}</p>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Clock className="w-6 h-6 text-primary mx-auto mb-1" />
              <p className="text-2xl font-bold">{focusStats.minutes}m</p>
              <p className="text-xs text-muted-foreground">Focus Time</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">{focusStats.distractions}</p>
              <p className="text-xs text-muted-foreground">Distractions</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <XCircle className="w-6 h-6 text-destructive mx-auto mb-1" />
              <p className="text-2xl font-bold">{focusStats.giveUps}</p>
              <p className="text-xs text-muted-foreground">Give Ups</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Study Schedule Manager */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" />Study Schedule</CardTitle>
          <CardDescription>Manage your weekly study slots. The system will remind you when it's time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Existing schedules */}
          {schedules.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No schedules yet. Add one below!</p>
          ) : (
            <div className="space-y-2">
              {schedules.map(s => (
                <div key={s.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                  <div>
                    <span className="font-medium text-foreground">{s.subject}</span>
                    <span className="text-sm text-muted-foreground ml-2">{s.startTime} – {s.endTime}</span>
                    <div className="flex gap-1 mt-1">
                      {s.days.map(d => <Badge key={d} variant="secondary" className="text-xs">{d}</Badge>)}
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => removeSchedule(s.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Add new */}
          <div className="border rounded-lg p-4 space-y-3">
            <p className="text-sm font-semibold flex items-center gap-2"><Plus className="w-4 h-4" />Add Study Slot</p>
            <div>
              <Label>Subject</Label>
              <Input value={newSubject} onChange={e => setNewSubject(e.target.value)} placeholder="e.g., Physics" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Start</Label>
                <Input type="time" value={newStart} onChange={e => setNewStart(e.target.value)} />
              </div>
              <div>
                <Label>End</Label>
                <Input type="time" value={newEnd} onChange={e => setNewEnd(e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Days</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {DAYS.map(day => (
                  <Badge
                    key={day}
                    variant={newDays.includes(day) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleDay(day)}
                  >
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
            <Button onClick={handleAddSchedule} className="w-full" disabled={!newSubject.trim()}>
              <Plus className="w-4 h-4 mr-2" />Add Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppControlPage;
