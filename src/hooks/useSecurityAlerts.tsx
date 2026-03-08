import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { toast } from 'sonner';

const parseUA = (ua: string) => {
  const isMobile = /iPhone|Android.*Mobile|webOS|BlackBerry/i.test(ua);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua);
  const deviceType = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';

  let browser = 'Unknown';
  if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';

  let os = 'Unknown';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac OS')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  const deviceName = deviceType === 'desktop' ? `${os} Desktop` : `${os} ${deviceType === 'tablet' ? 'Tablet' : 'Phone'}`;
  const fingerprint = `${browser}-${os}-${deviceType}-${screen.width}x${screen.height}`;

  return { browser, os, deviceType, deviceName, fingerprint };
};

export const useSecurityAlerts = () => {
  const { user } = useAuth();

  const recordLogin = useCallback(async () => {
    if (!user) return;

    const { browser, os, deviceType, deviceName, fingerprint } = parseUA(navigator.userAgent);
    const location = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';

    // Check if this device fingerprint has been seen before
    const { data: existing } = await supabase
      .from('login_events')
      .select('id')
      .eq('user_id', user.id)
      .eq('device_fingerprint', fingerprint)
      .limit(1);

    const isNew = !existing || existing.length === 0;

    await supabase.from('login_events').insert({
      user_id: user.id,
      device_fingerprint: fingerprint,
      device_name: deviceName,
      browser,
      os,
      device_type: deviceType,
      location,
      is_new_device: isNew,
    });

    if (isNew) {
      // Create a notification for the new device
      await supabase.from('notifications').insert({
        user_id: user.id,
        type: 'security_alert',
        title: '🔐 New Device Sign-In',
        message: `New sign-in detected from ${deviceName} (${browser}) in ${location}. If this wasn't you, change your password immediately.`,
        link: '/sessions',
      });

      toast.warning('New device detected', {
        description: `Sign-in from ${deviceName} (${browser}). If this wasn't you, secure your account.`,
        duration: 8000,
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    // Record login on mount (when user is authenticated)
    const key = `last-login-recorded-${user.id}`;
    const lastRecorded = sessionStorage.getItem(key);
    if (!lastRecorded) {
      recordLogin();
      sessionStorage.setItem(key, Date.now().toString());
    }
  }, [user, recordLogin]);
};
