import { useMemo } from 'react';

export function useTimeOfDay() {
  return useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 5) return 'night';
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    if (hour < 21) return 'evening';
    return 'night';
  }, []);
}

export function getGreeting(timeOfDay: string) {
  switch (timeOfDay) {
    case 'morning': return 'Good morning';
    case 'afternoon': return 'Good afternoon';
    case 'evening': return 'Good evening';
    default: return 'Good evening';
  }
}
