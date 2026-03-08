import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DistractionState {
  count: number;
  lastLeftAt: Date | null;
  showWarning: boolean;
}

export function useDistractionDetector(isActive: boolean, sessionSubject: string) {
  const [state, setState] = useState<DistractionState>({
    count: 0,
    lastLeftAt: null,
    showWarning: false,
  });
  const countRef = useRef(0);
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
    if (!isActive) {
      countRef.current = 0;
      setState({ count: 0, lastLeftAt: null, showWarning: false });
    }
  }, [isActive]);

  const notifyGuardians = useCallback(async (distractionCount: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: links } = await supabase
        .from('guardian_links')
        .select('guardian_id')
        .eq('student_id', user.id)
        .eq('status', 'active');

      if (!links || links.length === 0) return;

      const notifications = links
        .filter(l => l.guardian_id)
        .map(link => ({
          user_id: link.guardian_id!,
          type: 'distraction_alert',
          title: '⚠️ Focus Alert',
          message: `Your child left the app ${distractionCount} times during a ${sessionSubject} study session.`,
          link: '/parent-children',
        }));

      if (notifications.length > 0) {
        await supabase.from('notifications').insert(notifications);
      }
    } catch (err) {
      console.error('Failed to notify guardians:', err);
    }
  }, [sessionSubject]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!isActiveRef.current) return;

      if (document.hidden) {
        setState(prev => ({ ...prev, lastLeftAt: new Date() }));
      } else {
        // User returned
        countRef.current += 1;
        const newCount = countRef.current;

        setState(prev => ({
          count: newCount,
          lastLeftAt: null,
          showWarning: true,
        }));

        // Notify guardians after 3+ distractions
        if (newCount === 3) {
          notifyGuardians(newCount);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [notifyGuardians]);

  const dismissWarning = useCallback(() => {
    setState(prev => ({ ...prev, showWarning: false }));
  }, []);

  const getCount = useCallback(() => countRef.current, []);

  return {
    distractionCount: state.count,
    showWarning: state.showWarning,
    dismissWarning,
    getCount,
  };
}
