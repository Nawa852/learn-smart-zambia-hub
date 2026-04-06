import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Brain, BookOpen, Target, TrendingUp, Clock,
  Star, ArrowRight, Lightbulb, Zap, RefreshCw, Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useToast } from '@/components/ui/use-toast';

interface Recommendation {
  type: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
}

interface Insights {
  strengths: string[];
  improvement_areas: string[];
  study_streak_tip: string;
  weekly_focus: string;
}

const SmartRecommendations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [suggestedSubjects, setSuggestedSubjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('learning-recommendations', {});

      if (fnError) throw fnError;

      if (data?.success) {
        setRecommendations(data.recommendations || []);
        setInsights(data.insights || null);
        setSuggestedSubjects(data.suggested_subjects || []);
      } else {
        throw new Error(data?.error || 'Failed to get recommendations');
      }
    } catch (err: any) {
      console.error('Recommendations error:', err);
      setError('Could not load recommendations right now.');
      // Fallback
      setRecommendations([
        { type: 'study_habit', title: 'Stay Consistent', description: 'Complete at least one lesson daily to build momentum.', priority: 'high', icon: '📚' },
        { type: 'exam_prep', title: 'Practice Past Papers', description: 'ECZ past papers are the best way to prepare for exams.', priority: 'medium', icon: '📝' },
        { type: 'goal', title: 'Set Weekly Goals', description: 'Students who set goals perform 40% better on assessments.', priority: 'medium', icon: '🎯' },
      ]);
      setInsights({
        strengths: ['Active learning'],
        improvement_areas: ['Consistency'],
        study_streak_tip: 'Every lesson counts — keep going!',
        weekly_focus: 'Focus on your weakest subject for 30 minutes daily.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [user]);

  const priorityStyles: Record<string, string> = {
    high: 'border-l-4 border-l-destructive/60',
    medium: 'border-l-4 border-l-primary/60',
    low: 'border-l-4 border-l-muted-foreground/30',
  };

  const typeIcons: Record<string, React.ReactNode> = {
    subject_focus: <BookOpen className="h-4 w-4" />,
    study_habit: <Clock className="h-4 w-4" />,
    exam_prep: <Target className="h-4 w-4" />,
    goal: <Star className="h-4 w-4" />,
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardContent className="p-5">
                <Skeleton className="h-5 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      {insights && (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">AI Learning Insights</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={fetchRecommendations} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">Your Strengths</p>
                <div className="flex flex-wrap gap-1.5">
                  {insights.strengths.map((s, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{s}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">Areas to Improve</p>
                <div className="flex flex-wrap gap-1.5">
                  {insights.improvement_areas.map((a, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{a}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-background/60 rounded-lg p-3">
              <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">{insights.weekly_focus}</p>
                <p className="text-xs text-muted-foreground mt-1">{insights.study_streak_tip}</p>
              </div>
            </div>

            {suggestedSubjects.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">Suggested Focus Subjects</p>
                <div className="flex gap-2">
                  {suggestedSubjects.map((s, i) => (
                    <Badge key={i} className="bg-primary/10 text-primary hover:bg-primary/20">{s}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, index) => (
          <Card key={index} className={`${priorityStyles[rec.priority] || ''} hover:shadow-md transition-shadow`}>
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{rec.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{rec.title}</h3>
                    <Badge
                      variant={rec.priority === 'high' ? 'destructive' : 'secondary'}
                      className="text-[10px] h-4 px-1.5"
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{rec.description}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {typeIcons[rec.type] || <Zap className="h-3.5 w-3.5" />}
                    <span className="text-[10px] text-muted-foreground capitalize">{rec.type.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {error && (
        <p className="text-xs text-center text-muted-foreground">
          {error} Showing general recommendations instead.
        </p>
      )}
    </div>
  );
};

export default SmartRecommendations;