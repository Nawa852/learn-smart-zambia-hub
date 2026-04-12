import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGuardianData } from '@/hooks/useGuardianData';
import { BookOpen, Target, Clock, Flame, AlertTriangle, TrendingUp } from 'lucide-react';

export const GuardianWeeklyReport = () => {
  const { weeklySummary, students } = useGuardianData();

  if (students.length === 0) return null;

  const items = [
    { label: 'Lessons Done', value: weeklySummary.lessonsCompleted, icon: BookOpen, color: 'text-primary bg-primary/10' },
    { label: 'Quizzes', value: weeklySummary.quizzesTaken, icon: Target, color: 'text-accent bg-accent/10' },
    { label: 'Avg Score', value: weeklySummary.avgScore > 0 ? `${weeklySummary.avgScore}%` : '--', icon: TrendingUp, color: 'text-primary bg-primary/10' },
    { label: 'Focus Time', value: `${weeklySummary.focusMinutes}m`, icon: Clock, color: 'text-accent bg-accent/10' },
    { label: 'Sessions', value: weeklySummary.focusSessions, icon: Flame, color: 'text-warning bg-warning/10' },
    { label: 'Gave Up', value: weeklySummary.gaveUpCount, icon: AlertTriangle, color: 'text-destructive bg-destructive/10' },
  ];

  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" /> Weekly Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col items-center p-2.5 rounded-xl bg-secondary/30">
              <div className={`p-1.5 rounded-lg ${item.color} mb-1`}>
                <item.icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-base font-bold text-foreground">{item.value}</span>
              <span className="text-[9px] text-muted-foreground text-center leading-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
