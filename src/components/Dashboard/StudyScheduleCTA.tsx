import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { useStudySchedule } from '@/hooks/useStudySchedule';

export const StudyScheduleCTA = () => {
  const { schedules, loading } = useStudySchedule();
  const navigate = useNavigate();

  if (loading || schedules.length > 0) return null;

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/[0.06] to-accent/[0.04]">
      <CardContent className="p-4 flex items-center gap-3 flex-wrap">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <p className="text-sm font-bold flex items-center gap-1">
            Set your study schedule <Sparkles className="w-3.5 h-3.5 text-primary" />
          </p>
          <p className="text-xs text-muted-foreground">
            Lock in study times so we can remind you, track focus, and hide distractions.
          </p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => navigate('/setup-schedule')}>
          Build schedule <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
};
