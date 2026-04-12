import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Sparkles, Loader2, BookOpen, TrendingUp, Lightbulb, Target, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LearningRecommendationsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const fetchRecommendations = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data: res, error } = await supabase.functions.invoke('learning-recommendations');
      if (error) throw error;
      setData(res);
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchRecommendations();
  }, [user]);

  const priorityIcon = (p: string) => {
    if (p === 'high') return '🔴';
    if (p === 'medium') return '🟡';
    return '🟢';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Learning Insights
          </h2>
          <p className="text-sm text-muted-foreground">Personalized recommendations based on your activity</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchRecommendations} disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Refresh'}
        </Button>
      </div>

      {loading && !data && (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Analyzing your learning patterns...</p>
        </div>
      )}

      {data && (
        <>
          {/* Insights */}
          {data.insights && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-card border-green-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-foreground flex items-center gap-2">
                    <Star className="w-4 h-4 text-green-500" /> Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {data.insights.strengths?.map((s: string, i: number) => (
                      <Badge key={i} variant="outline" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-xs">{s}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-orange-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-500" /> Improve
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {data.insights.improvement_areas?.map((s: string, i: number) => (
                      <Badge key={i} variant="outline" className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 text-xs">{s}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {data.insights?.weekly_focus && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">This Week's Focus</p>
                    <p className="text-sm text-muted-foreground">{data.insights.weekly_focus}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {data.recommendations?.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" /> Recommendations
              </h3>
              {data.recommendations.map((rec: any, i: number) => (
                <Card key={i} className="bg-card hover:bg-muted/30 transition-colors">
                  <CardContent className="pt-4 pb-3">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{rec.icon || '📚'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-foreground">{rec.title}</span>
                          <span className="text-xs">{priorityIcon(rec.priority)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{rec.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Suggested Subjects */}
          {data.suggested_subjects?.length > 0 && (
            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-foreground flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" /> Suggested Subjects to Explore
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {data.suggested_subjects.map((s: string, i: number) => (
                    <Badge key={i} className="bg-primary/10 text-primary border-primary/20">{s}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {data.insights?.study_streak_tip && (
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground italic">💪 {data.insights.study_streak_tip}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LearningRecommendationsPage;
