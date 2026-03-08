import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';

interface DeviceControl {
  id: string;
  student_id: string;
  guardian_id: string;
  daily_screen_limit_minutes: number;
  focus_required_before_free_time: boolean;
  min_focus_minutes_per_day: number;
  allowed_hours_start: string;
  allowed_hours_end: string;
  content_filter_level: string;
  auto_lock_during_schedule: boolean;
}

export function useDeviceControls() {
  const { user } = useAuth();
  const [controls, setControls] = useState<DeviceControl | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWithinAllowedHours, setIsWithinAllowedHours] = useState(true);
  const [shouldAutoLock, setShouldAutoLock] = useState(false);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    const fetch = async () => {
      const { data } = await (supabase.from('device_controls') as any)
        .select('*')
        .eq('student_id', user.id)
        .maybeSingle();
      if (data) setControls(data);
      setLoading(false);
    };
    fetch();
  }, [user]);

  // Check allowed hours
  useEffect(() => {
    if (!controls) return;
    const check = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const withinHours = currentTime >= controls.allowed_hours_start && currentTime <= controls.allowed_hours_end;
      setIsWithinAllowedHours(withinHours);
    };
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [controls]);

  // Check if should auto-lock during schedule
  useEffect(() => {
    if (!controls?.auto_lock_during_schedule || !user) return;
    const check = async () => {
      const now = new Date();
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayName = dayNames[now.getDay()];
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:00`;

      const { data: activeSchedules } = await supabase
        .from('study_schedules')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .lte('start_time', currentTime)
        .gte('end_time', currentTime)
        .contains('days', [dayName]);

      setShouldAutoLock((activeSchedules?.length || 0) > 0);
    };
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [controls, user]);

  const updateControls = useCallback(async (updates: Partial<DeviceControl>) => {
    if (!controls) return;
    await (supabase.from('device_controls') as any)
      .update(updates)
      .eq('id', controls.id);
    setControls(prev => prev ? { ...prev, ...updates } : null);
  }, [controls]);

  return { controls, loading, isWithinAllowedHours, shouldAutoLock, updateControls };
}
