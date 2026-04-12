import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGuardianData } from '@/hooks/useGuardianData';
import { Shield, Smartphone, Clock, Zap } from 'lucide-react';

export const ScreenTimeSummary = () => {
  const { students, weeklySummary } = useGuardianData();

  if (students.length === 0) return null;

  const avgDailyMinutes = weeklySummary.focusMinutes > 0 ? Math.round(weeklySummary.focusMinutes / 7) : 0;
  const sessionsPerDay = weeklySummary.focusSessions > 0 ? (weeklySummary.focusSessions / 7).toFixed(1) : '0';

  return (
    <Card className="border-border/50 bg-card shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
            <Smartphone className="w-3.5 h-3.5 text-accent" />
          </div>
          Study Discipline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/20 text-center hover:border-border/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xl font-bold text-foreground">{avgDailyMinutes}m</p>
            <p className="text-[9px] text-muted-foreground font-medium">Avg daily focus</p>
          </div>
          <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/20 text-center hover:border-border/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-2">
              <Zap className="w-4 h-4 text-accent" />
            </div>
            <p className="text-xl font-bold text-foreground">{sessionsPerDay}</p>
            <p className="text-[9px] text-muted-foreground font-medium">Sessions/day</p>
          </div>
        </div>
        {weeklySummary.gaveUpCount > 0 && (
          <div className="mt-2.5 py-2 px-3 rounded-lg bg-destructive/5 border border-destructive/10 text-center">
            <span className="text-[11px] text-destructive font-medium">
              ⚠️ Gave up {weeklySummary.gaveUpCount} time{weeklySummary.gaveUpCount > 1 ? 's' : ''} this week
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
