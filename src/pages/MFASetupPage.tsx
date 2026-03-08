import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import {
  Shield, Smartphone, Key, Check, Copy, AlertTriangle,
  ArrowLeft, QrCode, Lock, Fingerprint, ChevronRight, RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type MFAStep = 'overview' | 'enroll' | 'verify' | 'backup' | 'complete';

const MFASetupPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState<MFAStep>('overview');
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [factorId, setFactorId] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [factors, setFactors] = useState<any[]>([]);
  const [backupCodes] = useState(() =>
    Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('')
    )
  );
  const [copiedBackup, setCopiedBackup] = useState(false);

  useEffect(() => {
    loadFactors();
  }, []);

  const loadFactors = async () => {
    const { data, error } = await supabase.auth.mfa.listFactors();
    if (!error && data) {
      setFactors(data.totp || []);
    }
  };

  const startEnrollment = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Edu Zambia Authenticator',
      });

      if (error) throw error;

      setQrCode(data.totp.qr_code);
      setSecret(data.totp.secret);
      setFactorId(data.id);
      setStep('enroll');
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Failed to start MFA enrollment', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const verifyMFA = async () => {
    if (verifyCode.length !== 6) return;
    setLoading(true);
    try {
      const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });
      if (challengeError) throw challengeError;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.id,
        code: verifyCode,
      });
      if (verifyError) throw verifyError;

      setStep('backup');
      toast({ title: '✅ MFA Verified', description: 'Two-factor authentication is now active.' });
    } catch (err: any) {
      toast({ title: 'Verification Failed', description: err.message || 'Invalid code. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const unenrollFactor = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.mfa.unenroll({ factorId: id });
      if (error) throw error;
      toast({ title: 'MFA Removed', description: 'Two-factor authentication has been disabled.' });
      loadFactors();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    setCopiedBackup(true);
    toast({ title: 'Copied!', description: 'Backup codes copied to clipboard.' });
    setTimeout(() => setCopiedBackup(false), 2000);
  };

  const GlassCard = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <Card className={`bg-card border border-border shadow-card ${className}`}>{children}</Card>
    </motion.div>
  );

  const verifiedFactors = factors.filter(f => f.status === 'verified');

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto p-4 md:p-6 max-w-2xl relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/settings')} className="border border-border/30 hover:border-primary/30">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">Two-Factor Authentication</h1>
            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              {/* Status */}
              <GlassCard>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        verifiedFactors.length > 0
                          ? 'bg-success/15 border border-success/30'
                          : 'bg-warning/15 border border-warning/30'
                      }`}>
                        {verifiedFactors.length > 0
                          ? <Check className="w-7 h-7 text-success" />
                          : <AlertTriangle className="w-7 h-7 text-warning" />
                        }
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">
                          {verifiedFactors.length > 0 ? 'MFA is Active' : 'MFA Not Enabled'}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {verifiedFactors.length > 0
                            ? `${verifiedFactors.length} authenticator(s) configured`
                            : 'Your account is not protected with 2FA'
                          }
                        </p>
                      </div>
                    </div>
                    <Badge className={verifiedFactors.length > 0
                      ? 'bg-success/15 text-success border-success/30'
                      : 'bg-warning/15 text-warning border-warning/30'
                    }>
                      {verifiedFactors.length > 0 ? 'Protected' : 'Vulnerable'}
                    </Badge>
                  </div>
                </CardContent>
              </GlassCard>

              {/* Methods */}
              <GlassCard delay={0.1}>
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Authentication Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <button
                    onClick={startEnrollment}
                    disabled={loading}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/20 hover:border-primary/30 hover:bg-secondary/50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm">Authenticator App</p>
                        <p className="text-xs text-muted-foreground">Google Authenticator, Authy, etc.</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/20 border border-border/10 opacity-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-secondary/40 border border-border/20 flex items-center justify-center">
                        <Key className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm">Security Key</p>
                        <p className="text-xs text-muted-foreground">YubiKey, hardware tokens</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs border-border/30">Coming Soon</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/20 border border-border/10 opacity-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-secondary/40 border border-border/20 flex items-center justify-center">
                        <Fingerprint className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm">Biometric</p>
                        <p className="text-xs text-muted-foreground">Fingerprint, Face ID</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs border-border/30">Coming Soon</Badge>
                  </div>
                </CardContent>
              </GlassCard>

              {/* Active Factors */}
              {verifiedFactors.length > 0 && (
                <GlassCard delay={0.2}>
                  <CardHeader>
                    <CardTitle className="text-lg">Active Authenticators</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {verifiedFactors.map((factor) => (
                      <div key={factor.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/20">
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{factor.friendly_name || 'Authenticator'}</p>
                            <p className="text-xs text-muted-foreground">Added {new Date(factor.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline" size="sm"
                          onClick={() => unenrollFactor(factor.id)}
                          disabled={loading}
                          className="border-destructive/30 text-destructive hover:bg-destructive/10"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </GlassCard>
              )}
            </motion.div>
          )}

          {step === 'enroll' && (
            <motion.div key="enroll" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <GlassCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <QrCode className="w-5 h-5 text-primary" />
                    <span className="text-primary">Scan QR Code</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm text-muted-foreground">
                    Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                  </p>

                  {/* QR Code */}
                  <div className="flex justify-center">
                    <div className="p-4 bg-white rounded-2xl shadow-card border border-border">
                      {qrCode && <img src={qrCode} alt="MFA QR Code" className="w-48 h-48" />}
                    </div>
                  </div>

                  {/* Manual Secret */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Can't scan? Enter this code manually:</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 p-3 bg-secondary/40 border border-border/30 rounded-xl text-xs font-mono text-foreground/80 break-all">
                        {secret}
                      </code>
                      <Button
                        variant="outline" size="icon"
                        onClick={() => { navigator.clipboard.writeText(secret); toast({ title: 'Copied!' }); }}
                        className="border-border/30 hover:border-primary/30 shrink-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <Button onClick={() => setStep('verify')} className="w-full bg-primary text-primary-foreground">
                    I've scanned the code
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </GlassCard>
            </motion.div>
          )}

          {step === 'verify' && (
            <motion.div key="verify" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <GlassCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lock className="w-5 h-5 text-primary" />
                    <span className="text-primary">Verify Setup</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm text-muted-foreground">
                    Enter the 6-digit code from your authenticator app to verify the setup.
                  </p>

                  <div className="flex justify-center">
                    <Input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={verifyCode}
                      onChange={e => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      className="w-48 text-center text-2xl font-mono tracking-[0.5em] bg-secondary/40 border-border/30 focus:border-primary/50 h-14"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep('enroll')} className="flex-1 border-border/30">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button
                      onClick={verifyMFA}
                      disabled={verifyCode.length !== 6 || loading}
                      className="flex-1 bg-primary text-primary-foreground"
                    >
                      {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                      Verify
                    </Button>
                  </div>
                </CardContent>
              </GlassCard>
            </motion.div>
          )}

          {step === 'backup' && (
            <motion.div key="backup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <GlassCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Key className="w-5 h-5 text-warning" />
                    <span className="gradient-text">Backup Codes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="p-3 rounded-xl bg-warning/10 border border-warning/20">
                    <p className="text-sm text-warning flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                      Save these codes in a safe place. You'll need them if you lose access to your authenticator app.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {backupCodes.map((code, i) => (
                      <div key={i} className="p-2.5 bg-secondary/40 border border-border/20 rounded-lg text-center font-mono text-sm text-foreground/80">
                        {code}
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={copyBackupCodes}
                    className="w-full border-border/30 hover:border-primary/30"
                  >
                    {copiedBackup ? <Check className="w-4 h-4 mr-2 text-success" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copiedBackup ? 'Copied!' : 'Copy All Codes'}
                  </Button>

                  <Button
                    onClick={() => setStep('complete')}
                    className="w-full bg-primary text-primary-foreground glow-primary"
                  >
                    I've saved my codes
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </GlassCard>
            </motion.div>
          )}

          {step === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              <GlassCard>
                <CardContent className="p-8 text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-success/15 border border-success/30 flex items-center justify-center mx-auto"
                  >
                    <Shield className="w-10 h-10 text-success" />
                  </motion.div>

                  <div>
                    <h2 className="text-2xl font-bold gradient-text mb-2">MFA Enabled!</h2>
                    <p className="text-muted-foreground text-sm">
                      Your account is now protected with two-factor authentication.
                      You'll need your authenticator app each time you sign in.
                    </p>
                  </div>

                  <Button
                    onClick={() => navigate('/settings')}
                    className="bg-primary text-primary-foreground glow-primary"
                  >
                    Back to Settings
                  </Button>
                </CardContent>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MFASetupPage;
