import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useProfile } from '@/hooks/useProfile';
import { useTheme, themes as themeOptions } from '@/contexts/ThemeContext';
import {
  Settings, User, Bell, Shield, Palette, Globe, Volume2, Eye,
  Moon, Sun, Sparkles, Zap, Monitor, Smartphone, Lock, Key,
  Download, Trash2, LogOut, HelpCircle, Mail, MessageSquare,
  Check, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/Auth/AuthProvider';

const tabItems = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'notifications', label: 'Alerts', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'accessibility', label: 'Access', icon: Eye },
  { id: 'account', label: 'Account', icon: User },
];

const SettingsPage = () => {
  const { profile } = useProfile();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');

  const [settings, setSettings] = useState({
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
    toast({ title: '✨ Settings saved', description: 'Your preferences have been updated.' });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const GlassCard = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className={`glass-card border border-border/30 shadow-lg ${className}`}>
        {children}
      </Card>
    </motion.div>
  );

  const SettingRow = ({ icon: Icon, iconColor, label, desc, children }: { icon: React.ElementType; iconColor: string; label: string; desc?: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between py-3 px-1 group hover:bg-secondary/30 rounded-lg transition-colors -mx-1 px-3">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg bg-secondary/60 flex items-center justify-center ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <p className="font-medium text-sm text-foreground">{label}</p>
          {desc && <p className="text-xs text-muted-foreground">{desc}</p>}
        </div>
      </div>
      {children}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            {/* Theme Selection */}
            <GlassCard delay={0.1}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Palette className="w-5 h-5 text-primary" />
                  <span className="gradient-text">Theme & Appearance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {themeOptions.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`relative p-4 rounded-xl border transition-all duration-300 group ${
                        theme === t.id
                          ? 'border-primary/60 glow-border bg-secondary/40'
                          : 'border-border/30 hover:border-primary/30 bg-secondary/20 hover:bg-secondary/30'
                      }`}
                    >
                      <div className="flex gap-1.5 mb-3 justify-center">
                        {t.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-5 h-5 rounded-full border border-border/40 shadow-inner"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-foreground/80">{t.name}</span>
                      {theme === t.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="space-y-3 pt-2">
                  <Label className="text-sm text-muted-foreground">Font Size: {settings.fontSize[0]}px</Label>
                  <Slider
                    value={settings.fontSize}
                    onValueChange={v => setSettings(s => ({ ...s, fontSize: v }))}
                    min={12} max={24} step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </GlassCard>

            {/* Language */}
            <GlassCard delay={0.2}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="w-5 h-5 text-accent" />
                  Language & Region
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={settings.language} onValueChange={v => setSettings(s => ({ ...s, language: v }))}>
                  <SelectTrigger className="bg-secondary/40 border-border/30 focus:border-primary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border/50">
                    {['english', 'bemba', 'nyanja', 'tonga', 'lozi', 'kaonde', 'lunda', 'luvale'].map(l => (
                      <SelectItem key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </GlassCard>

            {/* Learning Preferences */}
            <GlassCard delay={0.3}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5 text-warning" />
                  Learning Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <SettingRow icon={Monitor} iconColor="text-primary" label="Auto-play videos" desc="Automatically play next video">
                  <Switch checked={settings.learning.autoplay} onCheckedChange={v => updateSetting('learning', 'autoplay', v)} />
                </SettingRow>
                <SettingRow icon={Download} iconColor="text-accent" label="Offline mode" desc="Download for offline access">
                  <Switch checked={settings.learning.offlineMode} onCheckedChange={v => updateSetting('learning', 'offlineMode', v)} />
                </SettingRow>
                <SettingRow icon={Sparkles} iconColor="text-warning" label="Adaptive difficulty" desc="AI adjusts content difficulty">
                  <Switch checked={settings.learning.adaptiveDifficulty} onCheckedChange={v => updateSetting('learning', 'adaptiveDifficulty', v)} />
                </SettingRow>
                <div className="pt-3">
                  <Label className="text-sm text-muted-foreground">Daily study reminder</Label>
                  <Input
                    type="time"
                    value={settings.learning.studyRemindersTime}
                    onChange={e => updateSetting('learning', 'studyRemindersTime', e.target.value)}
                    className="w-40 mt-2 bg-secondary/40 border-border/30"
                  />
                </div>
              </CardContent>
            </GlassCard>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <GlassCard delay={0.1}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="w-5 h-5 text-primary" />
                  <span className="gradient-text">Notification Channels</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <SettingRow icon={Mail} iconColor="text-primary" label="Email notifications">
                  <Switch checked={settings.notifications.email} onCheckedChange={v => updateSetting('notifications', 'email', v)} />
                </SettingRow>
                <SettingRow icon={Smartphone} iconColor="text-accent" label="Push notifications">
                  <Switch checked={settings.notifications.push} onCheckedChange={v => updateSetting('notifications', 'push', v)} />
                </SettingRow>
                <SettingRow icon={MessageSquare} iconColor="text-warning" label="SMS notifications">
                  <Switch checked={settings.notifications.sms} onCheckedChange={v => updateSetting('notifications', 'sms', v)} />
                </SettingRow>
              </CardContent>
            </GlassCard>
            <GlassCard delay={0.2}>
              <CardHeader><CardTitle className="text-lg">Alert Types</CardTitle></CardHeader>
              <CardContent className="space-y-1">
                {[
                  { key: 'studyReminders', label: 'Study reminders', icon: Zap, color: 'text-primary' },
                  { key: 'achievements', label: 'Achievement unlocked', icon: Sparkles, color: 'text-warning' },
                  { key: 'community', label: 'Community activity', icon: User, color: 'text-accent' },
                  { key: 'examAlerts', label: 'Exam date alerts', icon: Bell, color: 'text-destructive' },
                ].map(item => (
                  <SettingRow key={item.key} icon={item.icon} iconColor={item.color} label={item.label}>
                    <Switch checked={(settings.notifications as any)[item.key]} onCheckedChange={v => updateSetting('notifications', item.key, v)} />
                  </SettingRow>
                ))}
              </CardContent>
            </GlassCard>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <GlassCard delay={0.1}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="gradient-text">Privacy Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {[
                  { key: 'profilePublic', label: 'Public profile', desc: 'Others can see your profile', icon: User, color: 'text-primary' },
                  { key: 'showProgress', label: 'Show learning progress', desc: 'Display progress on profile', icon: Eye, color: 'text-accent' },
                  { key: 'showAchievements', label: 'Show achievements', desc: 'Display badges publicly', icon: Sparkles, color: 'text-warning' },
                  { key: 'allowMessages', label: 'Allow messages', desc: 'Anyone can send you messages', icon: MessageSquare, color: 'text-success' },
                ].map(item => (
                  <SettingRow key={item.key} icon={item.icon} iconColor={item.color} label={item.label} desc={item.desc}>
                    <Switch checked={(settings.privacy as any)[item.key]} onCheckedChange={v => updateSetting('privacy', item.key, v)} />
                  </SettingRow>
                ))}
              </CardContent>
            </GlassCard>
            <GlassCard delay={0.2}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="w-5 h-5 text-accent" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: Key, label: 'Change Password', action: () => navigate('/password-reset') },
                  { icon: Shield, label: 'Two-Factor Authentication', action: () => navigate('/mfa-setup') },
                  { icon: Eye, label: 'Active Sessions', action: () => navigate('/sessions') },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/20 hover:border-primary/30 hover:bg-secondary/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </CardContent>
            </GlassCard>
          </div>
        );

      case 'accessibility':
        return (
          <GlassCard delay={0.1}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Eye className="w-5 h-5 text-primary" />
                <span className="gradient-text">Accessibility Options</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {[
                { key: 'animations', label: 'Animations', desc: 'Enable motion and transitions', icon: Sparkles, color: 'text-primary' },
                { key: 'highContrast', label: 'High contrast', desc: 'Increase visual contrast', icon: Eye, color: 'text-accent' },
                { key: 'voiceEnabled', label: 'Voice responses', desc: 'AI reads answers aloud', icon: Volume2, color: 'text-warning' },
                { key: 'dyslexiaFont', label: 'Dyslexia-friendly font', desc: 'Use OpenDyslexic typeface', icon: HelpCircle, color: 'text-success' },
              ].map(item => (
                <SettingRow key={item.key} icon={item.icon} iconColor={item.color} label={item.label} desc={item.desc}>
                  <Switch checked={(settings.accessibility as any)[item.key]} onCheckedChange={v => updateSetting('accessibility', item.key, v)} />
                </SettingRow>
              ))}
            </CardContent>
          </GlassCard>
        );

      case 'account':
        return (
          <div className="space-y-6">
            <GlassCard delay={0.1}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="w-5 h-5 text-primary" />
                  <span className="gradient-text">Account Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Email', value: profile?.email || 'Not set' },
                  { label: 'Name', value: profile?.full_name || 'Not set' },
                  { label: 'Joined', value: profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Role</span>
                  <Badge className="bg-primary/20 text-primary border-primary/30 capitalize">{profile?.role || 'Student'}</Badge>
                </div>
              </CardContent>
            </GlassCard>

            <GlassCard delay={0.2}>
              <CardHeader><CardTitle className="text-lg">Data & Storage</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/20 hover:border-primary/30 hover:bg-secondary/50 transition-all group">
                  <div className="flex items-center gap-3">
                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium">Export My Data</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/20 hover:border-destructive/30 hover:bg-destructive/10 transition-all group">
                  <div className="flex items-center gap-3">
                    <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-destructive transition-colors" />
                    <span className="text-sm font-medium group-hover:text-destructive transition-colors">Clear Local Data</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </CardContent>
            </GlassCard>

            <GlassCard delay={0.3} className="border-destructive/20">
              <CardHeader><CardTitle className="text-lg text-destructive">Danger Zone</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" onClick={handleSignOut} className="w-full justify-start gap-2 border-border/30 hover:border-primary/40">
                  <LogOut className="w-4 h-4" /> Sign Out
                </Button>
                <Button variant="destructive" className="w-full justify-start gap-2 glow-primary" style={{ '--glow-color': 'hsl(0 72% 55%)' } as React.CSSProperties}>
                  <Trash2 className="w-4 h-4" /> Delete Account
                </Button>
              </CardContent>
            </GlassCard>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto p-4 md:p-6 max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center glow-border">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold gradient-text">Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:w-56 flex-shrink-0"
          >
            <div className="glass-card border border-border/30 rounded-2xl p-2 space-y-1 md:sticky md:top-20">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary/15 text-primary border border-primary/20 glow-border'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>

            {/* Save button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-end mt-8 gap-3"
            >
              <Button variant="outline" className="border-border/30 hover:border-primary/30">
                Reset to Defaults
              </Button>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground glow-primary hover:opacity-90 transition-opacity">
                <Sparkles className="w-4 h-4 mr-2" />
                Save All Settings
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
