import { useState, useEffect } from 'react';

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  total: number;
}

export function useCountdown(targetDate: Date | string): CountdownResult {
  const target = new Date(targetDate).getTime();

  const calc = (): CountdownResult => {
    const diff = Math.max(0, target - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      isExpired: diff === 0,
      total: diff,
    };
  };

  const [countdown, setCountdown] = useState(calc);

  useEffect(() => {
    const interval = setInterval(() => setCountdown(calc()), 1000);
    return () => clearInterval(interval);
  }, [target]);

  return countdown;
}
