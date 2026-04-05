import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProfile } from '@/hooks/useProfile';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/components/ui/use-toast';
import { Palette, Globe, Bell, Layout, Save, CheckCircle2 } from 'lucide-react';

const PersonalizationPage = () => {
  const { profile, updateProfile } = useProfile();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [prefs, setPrefs] = useState({
    language: 'en',
    compactMode: localStorage.getItem('edu-zambia-compact') === 'true',
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem('edu-zambia-compact', String(prefs.compactMode));
      localStorage.setItem('edu-zambia-lang', prefs.language);
      toast({ title: 'Preferences saved!', description: 'Your settings have been updated.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Personalization</h1>
        <p className="text-muted-foreground">Customize your learning experience</p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg"><Palette className="w-5 h-5" /> Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Theme</Label>
              <p className="text-xs text-muted-foreground">Choose light, dark, or system</p>
            </div>
            <Select value={theme} onValueChange={(v: any) => setTheme(v)}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Compact Mode</Label>
              <p className="text-xs text-muted-foreground">Reduce spacing for more content</p>
            </div>
            <Switch checked={prefs.compactMode} onCheckedChange={v => setPrefs(p => ({ ...p, compactMode: v }))} />
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg"><Globe className="w-5 h-5" /> Language</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label>Display Language</Label>
              <p className="text-xs text-muted-foreground">UI language preference</p>
            </div>
            <Select value={prefs.language} onValueChange={v => setPrefs(p => ({ ...p, language: v }))}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="bem">Bemba</SelectItem>
                <SelectItem value="ny">Nyanja</SelectItem>
                <SelectItem value="toi">Tonga</SelectItem>
                <SelectItem value="loz">Lozi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg"><Bell className="w-5 h-5" /> Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-xs text-muted-foreground">Receive updates via email</p>
            </div>
            <Switch checked={prefs.emailNotifications} onCheckedChange={v => setPrefs(p => ({ ...p, emailNotifications: v }))} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Push Notifications</Label>
              <p className="text-xs text-muted-foreground">Browser push notifications</p>
            </div>
            <Switch checked={prefs.pushNotifications} onCheckedChange={v => setPrefs(p => ({ ...p, pushNotifications: v }))} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Weekly Digest</Label>
              <p className="text-xs text-muted-foreground">Summary of your weekly progress</p>
            </div>
            <Switch checked={prefs.weeklyDigest} onCheckedChange={v => setPrefs(p => ({ ...p, weeklyDigest: v }))} />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} className="w-full">
        {saving ? 'Saving...' : 'Save Preferences'}
        <Save className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default PersonalizationPage;
