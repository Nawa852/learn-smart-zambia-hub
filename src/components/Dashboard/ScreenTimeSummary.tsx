import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGuardianData } from '@/hooks/useGuardianData';
import { Shield, Smartphone, Clock } from 'lucide-react';

export const ScreenTimeSummary = () => {
  const { students, weeklySummary } = useGuardianData();

  if (students.length === 0) return null;

  const avgDailyMinutes = weeklySummary.focusMinutes > 0 ? Math.round(weeklySummary.focusMinutes / 7) : 0;
  const sessionsPerDay = weeklySummary.focusSessions > 0 ? (weeklySummary.focusSessions / 7).toFixed(1) : '0';

  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-primary" /> Study Discipline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-secondary/30 text-center">
            <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{avgDailyMinutes}m</p>
            <p className="text-[9px] text-muted-foreground">Avg daily focus</p>
          </div>
          <div className="p-3 rounded-xl bg-secondary/30 text-center">
            <Shield className="w-5 h-5 text-accent mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{sessionsPerDay}</p>
            <p className="text-[9px] text-muted-foreground">Sessions/day</p>
          </div>
        </div>
        {weeklySummary.gaveUpCount > 0 && (
          <p className="text-[11px] text-destructive text-center mt-3">
            ⚠️ Gave up {weeklySummary.gaveUpCount} time{weeklySummary.gaveUpCount > 1 ? 's' : ''} this week
          </p>
        )}
      </CardContent>
    </Card>
  );
};
