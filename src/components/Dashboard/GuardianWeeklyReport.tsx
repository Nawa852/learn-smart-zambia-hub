import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGuardianData } from '@/hooks/useGuardianData';
import { BookOpen, Target, Clock, Flame, AlertTriangle, TrendingUp } from 'lucide-react';

export const GuardianWeeklyReport = () => {
  const { weeklySummary, students } = useGuardianData();

  if (students.length === 0) return null;

  const items = [
    { label: 'Lessons Done', value: weeklySummary.lessonsCompleted, icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Quizzes', value: weeklySummary.quizzesTaken, icon: Target, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Avg Score', value: weeklySummary.avgScore > 0 ? `${weeklySummary.avgScore}%` : '--', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Focus Time', value: `${weeklySummary.focusMinutes}m`, icon: Clock, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Sessions', value: weeklySummary.focusSessions, icon: Flame, color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'Gave Up', value: weeklySummary.gaveUpCount, icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10' },
  ];

  return (
    <Card className="border-border/50 bg-card shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
          </div>
          Weekly Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col items-center p-3 rounded-xl bg-secondary/40 border border-border/20 hover:border-border/40 transition-colors">
              <div className={`p-1.5 rounded-lg ${item.bg} mb-1.5`}>
                <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
              </div>
              <span className="text-base font-bold text-foreground">{item.value}</span>
              <span className="text-[9px] text-muted-foreground text-center leading-tight font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
