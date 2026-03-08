import React, { useState, useEffect } from 'react';
import { QrCode, Clock, CheckCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
    toast.success('Attendance code generated! Valid for 5 minutes.');
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <QrCode className="h-8 w-8 text-primary" /> Attendance Code
        </h1>
        <p className="text-muted-foreground mt-1">Generate time-limited attendance codes for your class</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Generate Code</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-md">
            <label className="text-sm font-medium">Select Course</label>
            <Select value={courseId} onValueChange={setCourseId}>
              <SelectTrigger><SelectValue placeholder="Choose a course" /></SelectTrigger>
              <SelectContent>
                {courses?.map(c => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={generateCode}>
            <RefreshCw className="h-4 w-4 mr-2" /> Generate Attendance Code
          </Button>
        </CardContent>
      </Card>

      {qrCode && (
        <Card className="border-primary/20">
          <CardContent className="p-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-lg font-medium">Expires in: <span className={`font-bold ${timeLeft < 60 ? 'text-destructive' : 'text-primary'}`}>{formatTime(timeLeft)}</span></span>
            </div>
            <div className="bg-muted rounded-xl p-8 inline-block">
              <p className="text-4xl md:text-6xl font-mono font-bold tracking-widest text-foreground">{qrCode}</p>
            </div>
            <p className="text-sm text-muted-foreground">Share this code with students to mark attendance</p>
            <Badge variant="outline" className="text-xs">
              <CheckCircle className="h-3 w-3 mr-1" /> Valid for 5 minutes only
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeacherAttendanceQRPage;
