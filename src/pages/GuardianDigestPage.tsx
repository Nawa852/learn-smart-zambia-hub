import React from 'react';
import { FileText, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const GuardianDigestPage = () => {
  const { user } = useAuth();

  const { data: reports, isLoading } = useQuery({
    queryKey: ['guardian-digest', user?.id],
    queryFn: async () => {
      const { data: links } = await supabase.from('guardian_links').select('id').eq('guardian_id', user!.id).eq('status', 'active');
      if (!links?.length) return [];
      const { data } = await supabase.from('guardian_reports').select('*').in('guardian_link_id', links.map(l => l.id)).order('created_at', { ascending: false }).limit(20);
      return data || [];
    },
    enabled: !!user,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" /> Weekly Digest
        </h1>
        <p className="text-muted-foreground mt-1">Weekly summaries of your child's learning progress</p>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading reports...</p>
      ) : reports && reports.length > 0 ? (
        <div className="space-y-4">
          {reports.map((r) => {
            const data = r.report_data as any;
            return (
              <Card key={r.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Report</span>
                    <span className="text-sm font-normal text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-lg font-bold">{data?.lessons_completed || 0}</p>
                      <p className="text-xs text-muted-foreground">Lessons</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-lg font-bold">{data?.focus_minutes || 0}m</p>
                      <p className="text-xs text-muted-foreground">Focus Time</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-lg font-bold">{data?.quizzes_passed || 0}</p>
                      <p className="text-xs text-muted-foreground">Quizzes Passed</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-lg font-bold">{data?.avg_grade || 'N/A'}</p>
                      <p className="text-xs text-muted-foreground">Avg Grade</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card><CardContent className="p-12 text-center text-muted-foreground">No digest reports yet. Reports are generated weekly for linked students.</CardContent></Card>
      )}
    </div>
  );
};

export default GuardianDigestPage;
