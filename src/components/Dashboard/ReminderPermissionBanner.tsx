import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, X } from 'lucide-react';
import {
  getNotificationPermission,
  requestNotificationPermission,
  isNotificationSupported,
} from '@/utils/pushNotifications';
import { toast } from 'sonner';

const DISMISS_KEY = 'edu-zambia-reminder-prompt-dismissed';

/** Small inline banner shown on the dashboard nudging users to enable reminders. */
export function ReminderPermissionBanner() {
  const [perm, setPerm] = useState<string>('default');
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem(DISMISS_KEY) === 'true'
  );

  useEffect(() => {
    if (!isNotificationSupported()) return;
    setPerm(getNotificationPermission());
  }, []);

  if (!isNotificationSupported() || perm === 'granted' || dismissed) return null;

  const handleEnable = async () => {
    const granted = await requestNotificationPermission();
    setPerm(granted ? 'granted' : 'denied');
    if (granted) toast.success('Study reminders enabled');
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, 'true');
    setDismissed(true);
  };

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
          {perm === 'denied' ? (
            <BellOff className="w-5 h-5 text-primary" />
          ) : (
            <Bell className="w-5 h-5 text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">
            {perm === 'denied'
              ? 'Notifications are blocked'
              : 'Get reminded before each study slot'}
          </p>
          <p className="text-xs text-muted-foreground">
            {perm === 'denied'
              ? 'Enable in your browser settings to receive study reminders.'
              : 'We’ll ping you 15 min, 5 min, and right when your study time begins.'}
          </p>
        </div>
        {perm !== 'denied' && (
          <Button size="sm" onClick={handleEnable}>
            Enable
          </Button>
        )}
        <Button size="icon" variant="ghost" onClick={handleDismiss} aria-label="Dismiss">
          <X className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
