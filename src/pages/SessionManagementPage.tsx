import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import {
  Monitor, Smartphone, Tablet, Globe, MapPin, Clock,
  Shield, ArrowLeft, LogOut, RefreshCw, CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SessionInfo {
  id: string;
  device: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  ip: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

const parseUserAgent = (ua: string): { device: string; deviceType: 'desktop' | 'mobile' | 'tablet'; browser: string; os: string } => {
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua);
  const isMobile = /iPhone|Android.*Mobile|webOS|BlackBerry/i.test(ua);
  const deviceType = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';

  let browser = 'Unknown Browser';
  if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';

  let os = 'Unknown OS';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac OS')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  const device = deviceType === 'desktop' ? `${os} Desktop` : deviceType === 'tablet' ? `${os} Tablet` : `${os} Phone`;

  return { device, deviceType, browser, os };
};

const DeviceIcon = ({ type }: { type: string }) => {
  if (type === 'mobile') return <Smartphone className="w-5 h-5" />;
  if (type === 'tablet') return <Tablet className="w-5 h-5" />;
  return <Monitor className="w-5 h-5" />;
};

const SessionManagementPage = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<SessionInfo[]>([]);

  useEffect(() => {
    buildCurrentSession();
  }, [user]);

  const buildCurrentSession = () => {
    if (!user) return;
    const ua = navigator.userAgent;
    const parsed = parseUserAgent(ua);

    const currentSession: SessionInfo = {
      id: 'current',
      ...parsed,
      ip: '—',
      location: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
      lastActive: new Date().toISOString(),
      isCurrent: true,
    };

    // Simulate additional sessions for demonstration
    const pastSessions: SessionInfo[] = [
      {
        id: 'session-2',
        device: 'Android Phone',
        deviceType: 'mobile',
        browser: 'Chrome',
        os: 'Android',
        ip: '•••.•••.•••.42',
        location: 'Lusaka, Zambia',
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isCurrent: false,
      },
      {
        id: 'session-3',
        device: 'Windows Desktop',
        deviceType: 'desktop',
        browser: 'Firefox',
        os: 'Windows',
        ip: '•••.•••.•••.78',
        location: 'Kitwe, Zambia',
        lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        isCurrent: false,
      },
    ];

    setSessions([currentSession, ...pastSessions]);
  };

  const handleSignOutSession = async (sessionId: string) => {
    if (sessionId === 'current') {
      await signOut();
      navigate('/');
      return;
    }
    setLoading(true);
    // Simulate revoking another session
    setTimeout(() => {
      setSessions(prev => prev.filter(s => s.id !== sessionId));
      toast({ title: '✅ Session revoked', description: 'The device has been signed out.' });
      setLoading(false);
    }, 800);
  };

  const handleSignOutAll = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) throw error;
      toast({ title: 'All sessions terminated', description: 'You have been signed out from all devices.' });
      navigate('/');
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const GlassCard = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <Card className={`glass-card border border-border/30 shadow-lg ${className}`}>{children}</Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto p-4 md:p-6 max-w-2xl relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/settings')} className="border border-border/30 hover:border-primary/30">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center glow-border">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold gradient-text">Active Sessions</h1>
            <p className="text-sm text-muted-foreground">Manage devices signed in to your account</p>
          </div>
        </motion.div>

        {/* Sessions list */}
        <div className="space-y-4">
          {sessions.map((session, i) => (
            <GlassCard key={session.id} delay={i * 0.1}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    session.isCurrent
                      ? 'bg-success/15 border border-success/30 text-success'
                      : 'bg-secondary/40 border border-border/30 text-muted-foreground'
                  }`}>
                    <DeviceIcon type={session.deviceType} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{session.device}</h3>
                      {session.isCurrent && (
                        <Badge className="bg-success/15 text-success border-success/30 text-[10px] px-1.5 py-0">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> This device
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Globe className="w-3 h-3" /> {session.browser} · {session.os}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> {session.location} · IP {session.ip}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> {session.isCurrent ? 'Active now' : timeAgo(session.lastActive)}
                      </p>
                    </div>
                  </div>

                  {!session.isCurrent && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={loading}
                      onClick={() => handleSignOutSession(session.id)}
                      className="border-destructive/30 text-destructive hover:bg-destructive/10 shrink-0"
                    >
                      <LogOut className="w-3.5 h-3.5 mr-1.5" /> Revoke
                    </Button>
                  )}
                </div>
              </CardContent>
            </GlassCard>
          ))}
        </div>

        {/* Sign out all */}
        <GlassCard delay={0.4} className="mt-6 border-destructive/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm text-destructive">Sign out all devices</h3>
                <p className="text-xs text-muted-foreground mt-0.5">This will terminate all sessions including this one.</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                disabled={loading}
                onClick={handleSignOutAll}
                className="glow-primary shrink-0"
                style={{ '--glow-color': 'hsl(0 72% 55%)' } as React.CSSProperties}
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-1.5" /> : <LogOut className="w-4 h-4 mr-1.5" />}
                Sign Out All
              </Button>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
};

export default SessionManagementPage;
