import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type FocusPhase = 'idle' | 'focus' | 'break' | 'longBreak';

interface FocusSettings {
  focusMinutes: number;
  breakMinutes: number;
  longBreakMinutes: number;
  sessionsBeforeLongBreak: number;
}

interface FocusState {
  phase: FocusPhase;
  secondsRemaining: number;
  sessionsCompleted: number;
  totalFocusSeconds: number;
  isActive: boolean;
  startedAt: Date | null;
  subject: string;
  currentSessionId: string | null;
}

const DEFAULT_SETTINGS: FocusSettings = {
  focusMinutes: 25,
  breakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
};

export function useFocusMode() {
  const [settings, setSettings] = useState<FocusSettings>(() => {
    const saved = localStorage.getItem('focus-settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [state, setState] = useState<FocusState>({
    phase: 'idle',
    secondsRemaining: 0,
    sessionsCompleted: 0,
    totalFocusSeconds: 0,
    isActive: false,
    startedAt: null,
    subject: '',
    currentSessionId: null,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    localStorage.setItem('focus-settings', JSON.stringify(settings));
  }, [settings]);

  // Save daily stats to localStorage as backup
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const key = `focus-stats-${today}`;
    const existing = JSON.parse(localStorage.getItem(key) || '{"sessions":0,"totalSeconds":0}');
    existing.sessions = state.sessionsCompleted;
    existing.totalSeconds = state.totalFocusSeconds;
    localStorage.setItem(key, JSON.stringify(existing));
  }, [state.sessionsCompleted, state.totalFocusSeconds]);

  // Persist completed focus session to DB
  const saveSessionToDB = useCallback(async (subject: string, focusMinutes: number, sessionsCompleted: number, gaveUp: boolean, startedAt: Date, distractionCount: number = 0) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('focus_sessions' as any).insert({
        user_id: user.id,
        subject,
        focus_minutes: focusMinutes,
        sessions_completed: sessionsCompleted,
        gave_up: gaveUp,
        started_at: startedAt.toISOString(),
        ended_at: new Date().toISOString(),
        distraction_count: distractionCount,
      });
    } catch (err) {
      console.error('Failed to save focus session:', err);
    }
  }, []);

  const playAlarm = useCallback(() => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      gain.gain.value = 0.3;
      osc.start();
      setTimeout(() => { osc.stop(); ctx.close(); }, 500);

      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Focus Mode', {
          body: state.phase === 'focus' ? '🎉 Focus session complete! Take a break.' : '⏰ Break over! Time to focus.',
          icon: '/pwa-192x192.png',
        });
      }
    } catch (e) {
      console.log('Audio not available');
    }
  }, [state.phase]);

  // Timer tick
  useEffect(() => {
    if (!state.isActive || state.phase === 'idle') return;

    intervalRef.current = setInterval(() => {
      setState(prev => {
        if (prev.secondsRemaining <= 1) {
          playAlarm();

          if (prev.phase === 'focus') {
            const newSessions = prev.sessionsCompleted + 1;
            const isLongBreak = newSessions % settings.sessionsBeforeLongBreak === 0;

            // Save completed focus session to DB
            if (prev.startedAt) {
              saveSessionToDB(prev.subject, settings.focusMinutes, 1, false, prev.startedAt);
            }

            return {
              ...prev,
              phase: isLongBreak ? 'longBreak' : 'break',
              secondsRemaining: (isLongBreak ? settings.longBreakMinutes : settings.breakMinutes) * 60,
              sessionsCompleted: newSessions,
              totalFocusSeconds: prev.totalFocusSeconds + settings.focusMinutes * 60,
              startedAt: new Date(), // reset for next session
            };
          } else {
            return {
              ...prev,
              phase: 'focus',
              secondsRemaining: settings.focusMinutes * 60,
              startedAt: new Date(),
            };
          }
        }
        return { ...prev, secondsRemaining: prev.secondsRemaining - 1 };
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.isActive, state.phase, settings, playAlarm, saveSessionToDB]);

  const startFocus = useCallback((subject: string) => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    setState(prev => ({
      ...prev,
      phase: 'focus',
      secondsRemaining: settings.focusMinutes * 60,
      isActive: true,
      startedAt: new Date(),
      subject,
      currentSessionId: null,
    }));
  }, [settings.focusMinutes]);

  const pauseResume = useCallback(() => {
    setState(prev => ({ ...prev, isActive: !prev.isActive }));
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Save partial session if was in focus
    setState(prev => {
      if (prev.phase === 'focus' && prev.startedAt && prev.totalFocusSeconds > 0) {
        const elapsedMinutes = Math.floor((Date.now() - prev.startedAt.getTime()) / 60000);
        if (elapsedMinutes > 0) {
          saveSessionToDB(prev.subject, elapsedMinutes, 0, false, prev.startedAt);
        }
      }
      return {
        ...prev,
        phase: 'idle',
        secondsRemaining: 0,
        isActive: false,
        startedAt: null,
        subject: '',
        currentSessionId: null,
      };
    });
  }, [saveSessionToDB]);

  const giveUp = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Record give-up in DB
    setState(prev => {
      if (prev.startedAt) {
        const elapsedMinutes = Math.max(1, Math.floor((Date.now() - prev.startedAt.getTime()) / 60000));
        saveSessionToDB(prev.subject, elapsedMinutes, 0, true, prev.startedAt);
      }
      return {
        ...prev,
        phase: 'idle',
        secondsRemaining: 0,
        isActive: false,
        startedAt: null,
        subject: '',
        currentSessionId: null,
      };
    });

    // Also track locally
    const today = new Date().toISOString().slice(0, 10);
    const key = `focus-giveups-${today}`;
    const count = parseInt(localStorage.getItem(key) || '0') + 1;
    localStorage.setItem(key, String(count));
    return count;
  }, [saveSessionToDB]);

  const updateSettings = useCallback((partial: Partial<FocusSettings>) => {
    setSettings(prev => ({ ...prev, ...partial }));
  }, []);

  const getDailyStats = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10);
    const stats = JSON.parse(localStorage.getItem(`focus-stats-${today}`) || '{"sessions":0,"totalSeconds":0}');
    const giveUps = parseInt(localStorage.getItem(`focus-giveups-${today}`) || '0');
    return { ...stats, giveUps };
  }, []);

  return {
    state,
    settings,
    startFocus,
    pauseResume,
    stop,
    giveUp,
    updateSettings,
    getDailyStats,
  };
}
