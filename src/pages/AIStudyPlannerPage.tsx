import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Clock, Brain, Loader2, BookOpen, Zap, Coffee, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SUBJECTS = ['Mathematics', 'English', 'Science', 'Biology', 'Chemistry', 'Physics', 'Geography', 'History', 'Civic Education', 'Commerce', 'Computer Studies'];

const AIStudyPlannerPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [examDate, setExamDate] = useState('');
  const [dailyHours, setDailyHours] = useState([3]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Mathematics', 'English', 'Science']);
  const [plan, setPlan] = useState<any>(null);

  const toggleSubject = (s: string) => {
    setSelectedSubjects(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const generatePlan = async () => {
    if (!user) return toast({ title: 'Please sign in', variant: 'destructive' });
    if (selectedSubjects.length === 0) return toast({ title: 'Select at least one subject', variant: 'destructive' });
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-study-planner', {
        body: { exam_date: examDate, subjects: selectedSubjects, daily_hours: dailyHours[0] }
      });
      if (error) throw error;
      setPlan(data);
      toast({ title: '📅 Study plan generated!' });
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const priorityColor = (p: string) => {
    if (p === 'high') return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
    if (p === 'medium') return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
    return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Config Card */}
      <Card className="border-primary/20 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Brain className="w-5 h-5 text-primary" />
            Generate Your AI Study Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Subjects</label>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map(s => (
                <Badge
                  key={s}
                  variant={selectedSubjects.includes(s) ? 'default' : 'outline'}
                  className="cursor-pointer transition-all"
                  onClick={() => toggleSubject(s)}
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Exam Date (optional)</label>
              <Input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} className="bg-background" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Daily study hours: <span className="text-primary font-bold">{dailyHours[0]}h</span>
              </label>
              <Slider min={1} max={8} step={0.5} value={dailyHours} onValueChange={setDailyHours} className="mt-3" />
            </div>
          </div>

          <Button onClick={generatePlan} disabled={loading} className="w-full" size="lg">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating Plan...</> : <><Calendar className="w-4 h-4 mr-2" /> Generate Weekly Plan</>}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {plan?.weekly_plan && (
        <div className="space-y-4">
          {/* Focus Areas */}
          {plan.focus_areas?.length > 0 && (
            <Card className="bg-card border-primary/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-foreground">
                  <Target className="w-4 h-4 text-primary" /> Focus Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {plan.focus_areas.map((f: any, i: number) => (
                    <div key={i} className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <p className="font-semibold text-sm text-foreground">{f.subject}</p>
                      <p className="text-xs text-muted-foreground mt-1">{f.reason}</p>
                      <p className="text-xs text-primary font-medium mt-1">{f.recommended_hours}h/week recommended</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Weekly Plan */}
          {plan.weekly_plan.map((day: any, di: number) => (
            <Card key={di} className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-foreground">{day.day}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {day.sessions?.map((session: any, si: number) => (
                  <div key={si} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="text-xs font-mono text-muted-foreground whitespace-nowrap mt-0.5">
                      <Clock className="w-3 h-3 inline mr-1" />{session.time}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-foreground">{session.subject}</span>
                        {session.priority && (
                          <Badge variant="outline" className={`text-[10px] ${priorityColor(session.priority)}`}>
                            {session.priority}
                          </Badge>
                        )}
                      </div>
                      {session.topic && <p className="text-xs text-muted-foreground mt-0.5">{session.topic}</p>}
                      {session.activity && <p className="text-xs text-primary/80 mt-0.5">{session.activity}</p>}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{session.duration_minutes}min</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {/* Tips */}
          {plan.tips?.length > 0 && (
            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-foreground">
                  <Coffee className="w-4 h-4" /> Study Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.tips.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Zap className="w-3 h-3 text-primary mt-1 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default AIStudyPlannerPage;
