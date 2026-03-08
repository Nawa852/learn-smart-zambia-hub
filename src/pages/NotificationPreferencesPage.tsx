import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Bell, Mail, Smartphone, MessageSquare, BookOpen, Award, Calendar, AlertTriangle, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const CATEGORIES = [
  { key: 'assignments', label: 'New Assignments', icon: BookOpen, desc: 'When a teacher creates a new assignment' },
  { key: 'grades', label: 'Grades & Feedback', icon: Award, desc: 'When your work is graded' },
  { key: 'messages', label: 'Messages', icon: MessageSquare, desc: 'New messages from peers and teachers' },
  { key: 'reminders', label: 'Study Reminders', icon: Calendar, desc: 'Scheduled study session reminders' },
  { key: 'alerts', label: 'Security Alerts', icon: AlertTriangle, desc: 'New device login and security events' },
  { key: 'achievements', label: 'Achievements', icon: Award, desc: 'Badge unlocks and XP milestones' },
];

const STORAGE_KEY = 'notification_preferences';

const defaultPrefs = () => Object.fromEntries(CATEGORIES.map(c => [c.key, { inApp: true, push: true }]));

const NotificationPreferencesPage = () => {
  const [prefs, setPrefs] = useState<Record<string, { inApp: boolean; push: boolean }>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultPrefs();
  });
  const [saved, setSaved] = useState(true);

  const toggle = (key: string, channel: 'inApp' | 'push') => {
    setPrefs(prev => ({ ...prev, [key]: { ...prev[key], [channel]: !prev[key][channel] } }));
    setSaved(false);
  };

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setSaved(true);
    toast.success('Preferences saved!');
  };

  const reset = () => {
    const defaults = defaultPrefs();
    setPrefs(defaults);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    setSaved(true);
    toast.info('Preferences reset to defaults');
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Bell className="w-6 h-6 text-primary" /> Notification Preferences</h1>
        <p className="text-sm text-muted-foreground">Control what notifications you receive</p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Channels</CardTitle>
            <div className="flex gap-6">
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" />In-App</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Smartphone className="w-3 h-3" />Push</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {CATEGORIES.map(cat => (
            <div key={cat.key} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
              <div className="flex items-center gap-3">
                <cat.icon className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{cat.label}</p>
                  <p className="text-xs text-muted-foreground">{cat.desc}</p>
                </div>
              </div>
              <div className="flex gap-6">
                <Switch checked={prefs[cat.key].inApp} onCheckedChange={() => toggle(cat.key, 'inApp')} />
                <Switch checked={prefs[cat.key].push} onCheckedChange={() => toggle(cat.key, 'push')} />
              </div>
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <Button onClick={save} className="flex-1" disabled={saved}>
              {saved ? '✓ Saved' : 'Save Preferences'}
            </Button>
            <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-2" />Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationPreferencesPage;
