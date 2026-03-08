import React, { useState, useEffect } from 'react';
import { QrCode, Clock, CheckCircle, RefreshCw, Shield, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

const TeacherAttendanceQRPage = () => {
  const { user } = useAuth();
  const [courseId, setCourseId] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const { data: courses } = useQuery({
    queryKey: ['teacher-courses-qr', user?.id],
    queryFn: async () => {
      const { data } = await supabase.from('courses').select('id, title').eq('created_by', user!.id);
      return data || [];
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (!expiresAt) return;
    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000));
      setTimeLeft(diff);
      if (diff === 0) { setQrCode(''); setExpiresAt(null); }
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const generateCode = () => {
    if (!courseId) { toast.error('Select a course'); return; }
    const code = `ATT-${courseId.slice(0, 8)}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`.toUpperCase();
    setQrCode(code);
    setExpiresAt(new Date(Date.now() + 5 * 60 * 1000));
    setTimeLeft(300);
    toast.success('Attendance code generated!');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(qrCode);
    toast.success('Code copied to clipboard');
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  const progress = expiresAt ? (timeLeft / 300) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <QrCode className="w-5 h-5 text-primary" />
          </div>
          Attendance Code
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Generate time-limited attendance codes for your students</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Generate Code</CardTitle>
          <CardDescription>Select a course and generate a 5-minute attendance code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-md">
            <label className="text-sm font-medium text-foreground mb-1.5 block">Select Course</label>
            <Select value={courseId} onValueChange={setCourseId}>
              <SelectTrigger><SelectValue placeholder="Choose a course..." /></SelectTrigger>
              <SelectContent>{courses?.map(c => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <Button onClick={generateCode} className="gap-2">
            <RefreshCw className="h-4 w-4" /> Generate Attendance Code
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {qrCode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-primary/20 overflow-hidden">
              {/* Progress bar */}
              <div className="h-1 bg-muted">
                <motion.div
                  className={`h-full ${timeLeft < 60 ? 'bg-destructive' : 'bg-primary'}`}
                  initial={{ width: '100%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <CardContent className="p-8 text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    Expires in: <span className={`font-bold ${timeLeft < 60 ? 'text-destructive' : 'text-primary'}`}>{formatTime(timeLeft)}</span>
                  </span>
                </div>

                <div className="bg-muted/50 rounded-2xl p-8 inline-block border border-border">
                  <p className="text-4xl md:text-6xl font-mono font-bold tracking-[0.3em] text-foreground">{qrCode}</p>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <Button variant="outline" size="sm" onClick={copyCode} className="gap-2">
                    <Copy className="w-3.5 h-3.5" /> Copy Code
                  </Button>
                  <Button variant="outline" size="sm" onClick={generateCode} className="gap-2">
                    <RefreshCw className="w-3.5 h-3.5" /> Regenerate
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Single-use code • Valid for 5 minutes only</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!qrCode && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <QrCode className="w-14 h-14 mx-auto mb-4 text-muted-foreground/20" />
            <h3 className="text-lg font-semibold text-foreground mb-1">No active code</h3>
            <p className="text-sm text-muted-foreground">Generate a code above to start taking attendance</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeacherAttendanceQRPage;
