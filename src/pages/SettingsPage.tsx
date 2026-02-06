import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useProfile } from '@/hooks/useProfile';
import {
  Settings, User, Bell, Shield, Palette, Globe, Volume2, Eye,
  Moon, Sun, Sparkles, Zap, Monitor, Smartphone, Lock, Key,
  Download, Trash2, LogOut, HelpCircle, Mail, MessageSquare
} from 'lucide-react';

const SettingsPage = () => {
  const { profile, updateProfile } = useProfile();
  const { toast } = useToast();

  const [settings, setSettings] = useState({
    theme: 'system',
    fontSize: [16],
    language: 'english',
    notifications: {
      email: true, push: true, sms: false,
      studyReminders: true, achievements: true, community: true, examAlerts: true,
    },
    privacy: {
      profilePublic: true, showProgress: true, showAchievements: true, allowMessages: true,
    },
    accessibility: {
      animations: true, highContrast: false, voiceEnabled: false, dyslexiaFont: false,
    },
    learning: {
      autoplay: true, offlineMode: false, adaptiveDifficulty: true, studyRemindersTime: '18:00',
    },
  });

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: { ...(prev as any)[category], [key]: value },
    }));
  };

  const handleSave = () => {
    localStorage.setItem('edu-zambia-settings', JSON.stringify(settings));
    toast({ title: 'Settings saved', description: 'Your preferences have been updated.' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* General */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5" />Appearance</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'light', icon: Sun, label: 'Light' },
                      { value: 'dark', icon: Moon, label: 'Dark' },
                      { value: 'system', icon: Monitor, label: 'System' },
                    ].map(t => (
                      <Button key={t.value} variant={settings.theme === t.value ? 'default' : 'outline'} onClick={() => setSettings(s => ({ ...s, theme: t.value }))} className="flex items-center gap-2">
                        <t.icon className="w-4 h-4" />{t.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Font Size: {settings.fontSize[0]}px</Label>
                  <Slider value={settings.fontSize} onValueChange={v => setSettings(s => ({ ...s, fontSize: v }))} min={12} max={24} step={1} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5" />Language & Region</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Display Language</Label>
                  <Select value={settings.language} onValueChange={v => setSettings(s => ({ ...s, language: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['english', 'bemba', 'nyanja', 'tonga', 'lozi', 'kaonde', 'lunda', 'luvale'].map(l => (
                        <SelectItem key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5" />Learning Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'autoplay', label: 'Auto-play videos', desc: 'Automatically play next video in playlists' },
                  { key: 'offlineMode', label: 'Offline mode', desc: 'Download content for offline access' },
                  { key: 'adaptiveDifficulty', label: 'Adaptive difficulty', desc: 'AI adjusts content difficulty based on performance' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div><p className="font-medium text-sm">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                    <Switch checked={(settings.learning as any)[item.key]} onCheckedChange={v => updateSetting('learning', item.key, v)} />
                  </div>
                ))}
                <div className="space-y-2">
                  <Label>Daily study reminder</Label>
                  <Input type="time" value={settings.learning.studyRemindersTime} onChange={e => updateSetting('learning', 'studyRemindersTime', e.target.value)} className="w-40" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5" />Notification Channels</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'email', icon: Mail, label: 'Email notifications' },
                  { key: 'push', icon: Smartphone, label: 'Push notifications' },
                  { key: 'sms', icon: MessageSquare, label: 'SMS notifications' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><item.icon className="w-4 h-4 text-muted-foreground" /><span className="text-sm font-medium">{item.label}</span></div>
                    <Switch checked={(settings.notifications as any)[item.key]} onCheckedChange={v => updateSetting('notifications', item.key, v)} />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Alert Types</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'studyReminders', label: 'Study reminders' },
                  { key: 'achievements', label: 'Achievement unlocked' },
                  { key: 'community', label: 'Community activity' },
                  { key: 'examAlerts', label: 'Exam date alerts' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.label}</span>
                    <Switch checked={(settings.notifications as any)[item.key]} onCheckedChange={v => updateSetting('notifications', item.key, v)} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5" />Privacy Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'profilePublic', label: 'Public profile', desc: 'Others can see your profile' },
                  { key: 'showProgress', label: 'Show learning progress', desc: 'Display progress on profile' },
                  { key: 'showAchievements', label: 'Show achievements', desc: 'Display badges publicly' },
                  { key: 'allowMessages', label: 'Allow messages', desc: 'Anyone can send you messages' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div><p className="font-medium text-sm">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                    <Switch checked={(settings.privacy as any)[item.key]} onCheckedChange={v => updateSetting('privacy', item.key, v)} />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5" />Security</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start gap-2"><Key className="w-4 h-4" />Change Password</Button>
                <Button variant="outline" className="w-full justify-start gap-2"><Shield className="w-4 h-4" />Enable Two-Factor Authentication</Button>
                <Button variant="outline" className="w-full justify-start gap-2"><Eye className="w-4 h-4" />View Login History</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accessibility */}
          <TabsContent value="accessibility" className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Eye className="w-5 h-5" />Accessibility Options</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'animations', label: 'Animations', desc: 'Enable motion and transitions' },
                  { key: 'highContrast', label: 'High contrast', desc: 'Increase visual contrast' },
                  { key: 'voiceEnabled', label: 'Voice responses', desc: 'AI reads answers aloud' },
                  { key: 'dyslexiaFont', label: 'Dyslexia-friendly font', desc: 'Use OpenDyslexic typeface' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div><p className="font-medium text-sm">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                    <Switch checked={(settings.accessibility as any)[item.key]} onCheckedChange={v => updateSetting('accessibility', item.key, v)} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><User className="w-5 h-5" />Account Info</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>{profile?.email || 'Not set'}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span>{profile?.full_name || 'Not set'}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Role</span><Badge variant="secondary" className="capitalize">{profile?.user_type || 'Student'}</Badge></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Joined</span><span>{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Data & Storage</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2"><Download className="w-4 h-4" />Export My Data</Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" />Clear Local Data</Button>
              </CardContent>
            </Card>
            <Card className="border-destructive/50">
              <CardHeader><CardTitle className="text-destructive">Danger Zone</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2"><LogOut className="w-4 h-4" />Sign Out</Button>
                <Button variant="destructive" className="w-full justify-start gap-2"><Trash2 className="w-4 h-4" />Delete Account</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6 gap-3">
          <Button variant="outline">Reset to Defaults</Button>
          <Button onClick={handleSave}><Sparkles className="w-4 h-4 mr-2" />Save All Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
