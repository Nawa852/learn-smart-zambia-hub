import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Timer, Play, Pause, Square, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const StudyTimerWidget = () => {
  const { user } = useAuth();
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [subject, setSubject] = useState('General');

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleStop = useCallback(async () => {
    setRunning(false);
    const minutes = Math.floor(seconds / 60);
    if (minutes >= 1 && user) {
      await supabase.from('focus_sessions').insert({
        user_id: user.id,
        subject,
        focus_minutes: minutes,
        sessions_completed: 1,
        started_at: new Date(Date.now() - seconds * 1000).toISOString(),
        ended_at: new Date().toISOString(),
      });
      toast.success(`${minutes} min study session saved!`);
    }
    setSeconds(0);
  }, [seconds, subject, user]);

  const progress = Math.min((seconds / 1500) * 100, 100); // 25 min = 100%

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Timer className="w-4 h-4 text-blue-500" />
          Study Timer
        </h3>
        {running && (
          <span className="flex items-center gap-1 text-[10px] text-accent font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Recording
          </span>
        )}
      </div>

      {/* Timer Display */}
      <div className="text-center mb-4">
        <div className={cn(
          "text-4xl font-mono font-bold tracking-wider",
          running ? "text-primary" : "text-foreground"
        )}>
          {formatTime(seconds)}
        </div>
        {/* Progress ring approximation */}
        <div className="w-full h-1.5 rounded-full bg-muted mt-3 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">
          {running ? `${Math.floor(seconds / 60)} min so far` : 'Tap play to start'}
        </p>
      </div>

      {/* Subject Selector */}
      {!running && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {['General', 'Math', 'Science', 'English', 'History'].map(s => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                subject === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2">
        {!running ? (
          <Button size="sm" className="flex-1 gap-1.5" onClick={() => setRunning(true)}>
            <Play className="w-3.5 h-3.5" /> Start
          </Button>
        ) : (
          <>
            <Button size="sm" variant="outline" className="flex-1 gap-1.5" onClick={() => setRunning(false)}>
              <Pause className="w-3.5 h-3.5" /> Pause
            </Button>
            <Button size="sm" variant="default" className="flex-1 gap-1.5" onClick={handleStop}>
              <CheckCircle className="w-3.5 h-3.5" /> Finish
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
