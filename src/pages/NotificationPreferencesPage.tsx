import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Bell, Mail, Smartphone, MessageSquare, BookOpen, Award, Calendar, AlertTriangle } from 'lucide-react';
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

const NotificationPreferencesPage = () => {
  const [prefs, setPrefs] = useState<Record<string, { inApp: boolean; push: boolean }>>(
    Object.fromEntries(CATEGORIES.map(c => [c.key, { inApp: true, push: true }]))
  );

  const toggle = (key: string, channel: 'inApp' | 'push') => {
    setPrefs(prev => ({ ...prev, [key]: { ...prev[key], [channel]: !prev[key][channel] } }));
  };

  const save = () => toast.success('Preferences saved!');

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
          <Button onClick={save} className="w-full">Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationPreferencesPage;
