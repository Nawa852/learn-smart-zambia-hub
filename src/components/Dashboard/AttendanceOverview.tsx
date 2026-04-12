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
      const { data } = await supabase.from('attendance').select('status')
        .eq('recorded_by', user.id).gte('date', weekAgo).lte('date', today);
      if (!data) return;
      setStats({
        present: data.filter(a => a.status === 'present').length,
        absent: data.filter(a => a.status === 'absent').length,
        late: data.filter(a => a.status === 'late').length,
        total: data.length,
      });
    };
    load();
  }, [user]);

  const items = [
    { label: 'Present', value: stats.present, icon: CheckCircle, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Absent', value: stats.absent, icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
    { label: 'Late', value: stats.late, icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
  ];

  return (
    <Card className="border-border/50 bg-card shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <CalendarCheck className="w-3.5 h-3.5 text-primary" />
          </div>
          This Week's Attendance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col items-center p-3 rounded-xl bg-secondary/40 border border-border/20 hover:border-border/40 transition-colors">
              <div className={`p-2 rounded-lg ${item.bg} mb-1.5`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <span className="text-xl font-bold text-foreground">{item.value}</span>
              <span className="text-[10px] text-muted-foreground font-medium">{item.label}</span>
            </div>
          ))}
        </div>
        {stats.total > 0 && (
          <div className="mt-3 py-2 px-3 rounded-lg bg-accent/5 border border-accent/10 text-center">
            <span className="text-xs font-medium text-accent">
              {Math.round((stats.present / stats.total) * 100)}% attendance rate
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
