import { useEffect, useRef } from 'react';
import { useStudySchedule } from '@/hooks/useStudySchedule';
import { showLocalNotification, getNotificationPermission } from '@/utils/pushNotifications';
import { toast } from 'sonner';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const REMIND_BEFORE_MIN = [15, 5, 0]; // minutes before slot
const FIRED_KEY = 'edu-zambia-reminders-fired';

function getFiredSet(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(FIRED_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

function persistFired(set: Set<string>) {
  // keep last 200
  const arr = Array.from(set).slice(-200);
  localStorage.setItem(FIRED_KEY, JSON.stringify(arr));
}

/**
 * Polls every 30s and fires browser push + in-app toast
 * 15min, 5min, and 0min before each scheduled study slot.
 */
export function useScheduleReminders() {
  const { schedules } = useStudySchedule();
  const schedRef = useRef(schedules);
  schedRef.current = schedules;

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const today = DAY_NAMES[now.getDay()];
      const dateKey = now.toISOString().slice(0, 10);
      const fired = getFiredSet();
      const canPush = getNotificationPermission() === 'granted';

      schedRef.current.forEach((s) => {
        if (!s.isActive || !s.days.includes(today)) return;
        const [h, m] = s.startTime.split(':').map(Number);
        const start = new Date(now);
        start.setHours(h, m, 0, 0);
        const diffMin = Math.round((start.getTime() - now.getTime()) / 60000);

        REMIND_BEFORE_MIN.forEach((mins) => {
          if (diffMin === mins) {
            const key = `${dateKey}-${s.id}-${mins}`;
            if (fired.has(key)) return;
            fired.add(key);

            const title =
              mins === 0
                ? `📚 Time to study ${s.subject}!`
                : `⏰ ${s.subject} starts in ${mins} min`;
            const body = `${s.startTime} – ${s.endTime}. Tap to start a focus session.`;

            toast(title, { description: body, duration: 8000 });
            if (canPush) {
              showLocalNotification(title, {
                body,
                tag: `study-${s.id}-${mins}`,
                data: { url: `/prepare?tab=focus&subject=${encodeURIComponent(s.subject)}` },
              });
            }
          }
        });
      });

      persistFired(fired);
    };

    tick();
    const interval = setInterval(tick, 30_000);
    return () => clearInterval(interval);
  }, []);
}
