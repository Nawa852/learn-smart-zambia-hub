import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface ChecklistItem {
  id: string;
  label: string;
  route: string;
  done: boolean;
}

export const OnboardingChecklist: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();

  const { data: enrollmentCount } = useQuery({
    queryKey: ['onboarding-enrollments'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return 0;
      const { count } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      return count || 0;
    },
  });

  const { data: focusCount } = useQuery({
    queryKey: ['onboarding-focus'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return 0;
      const { count } = await supabase
        .from('focus_sessions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      return count || 0;
    },
  });

  const items: ChecklistItem[] = [
    { id: 'profile', label: 'Complete your profile', route: '/profile', done: !!(profile?.full_name && profile?.school) },
    { id: 'course', label: 'Enroll in a course', route: '/course-catalog', done: (enrollmentCount || 0) > 0 },
    { id: 'focus', label: 'Complete a focus session', route: '/focus-mode', done: (focusCount || 0) > 0 },
    { id: 'avatar', label: 'Upload a profile photo', route: '/profile', done: !!profile?.avatar_url },
  ];

  const completed = items.filter(i => i.done).length;
  const percentage = Math.round((completed / items.length) * 100);

  if (percentage === 100) return null;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Get Started</CardTitle>
          <span className="text-xs text-muted-foreground">{completed}/{items.length} complete</span>
        </div>
        <Progress value={percentage} className="h-1.5 mt-2" />
      </CardHeader>
      <CardContent className="pt-0 space-y-1">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => !item.done && navigate(item.route)}
            className={cn(
              'w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-left transition-colors text-sm',
              item.done
                ? 'text-muted-foreground cursor-default'
                : 'text-foreground hover:bg-secondary cursor-pointer'
            )}
          >
            {item.done ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            )}
            <span className={cn(item.done && 'line-through')}>{item.label}</span>
            {!item.done && <ChevronRight className="w-3.5 h-3.5 ml-auto text-muted-foreground" />}
          </button>
        ))}
      </CardContent>
    </Card>
  );
};
