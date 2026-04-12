import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { CalendarCheck, CheckCircle, XCircle, Clock } from 'lucide-react';

export const AttendanceOverview = () => {
  const { user } = useSecureAuth();
  const [stats, setStats] = useState({ present: 0, absent: 0, late: 0, total: 0 });

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];

      const { data } = await supabase
        .from('attendance')
        .select('status')
        .eq('recorded_by', user.id)
        .gte('date', weekAgo)
        .lte('date', today);

      if (!data) return;
      const present = data.filter(a => a.status === 'present').length;
      const absent = data.filter(a => a.status === 'absent').length;
      const late = data.filter(a => a.status === 'late').length;
      setStats({ present, absent, late, total: data.length });
    };
    load();
  }, [user]);

  const items = [
    { label: 'Present', value: stats.present, icon: CheckCircle, color: 'text-accent bg-accent/10' },
    { label: 'Absent', value: stats.absent, icon: XCircle, color: 'text-destructive bg-destructive/10' },
    { label: 'Late', value: stats.late, icon: Clock, color: 'text-warning bg-warning/10' },
  ];

  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <CalendarCheck className="w-4 h-4 text-primary" /> This Week's Attendance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col items-center p-3 rounded-xl bg-secondary/30">
              <div className={`p-2 rounded-lg ${item.color} mb-1.5`}>
                <item.icon className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-foreground">{item.value}</span>
              <span className="text-[10px] text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
        {stats.total > 0 && (
          <div className="mt-3 flex items-center justify-center">
            <span className="text-xs text-muted-foreground">
              {Math.round((stats.present / stats.total) * 100)}% attendance rate this week
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
