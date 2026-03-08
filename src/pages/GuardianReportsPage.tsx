import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileBarChart, TrendingUp, BookOpen, Target, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { format } from 'date-fns';

interface Report {
  id: string;
  guardian_link_id: string;
  report_data: {
    guardian_name?: string;
    mode?: string;
    quiz_count?: number;
    avg_score?: number;
    lessons_completed?: number;
    goals_completed?: number;
    study_hours?: number;
    summary?: string;
  };
  created_at: string;
}

const GuardianReportsPage = () => {
  const { user } = useSecureAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchReports();
  }, [user]);

  const fetchReports = async () => {
    const { data } = await supabase
      .from('guardian_reports')
      .select('*')
      .eq('student_id', user!.id)
      .order('created_at', { ascending: false });
    setReports((data as unknown as Report[]) || []);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <FileBarChart className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Guardian Reports</h1>
          <p className="text-muted-foreground">Weekly summaries sent to your guardians</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading reports...</div>
      ) : reports.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <FileBarChart className="w-16 h-16 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Reports Yet</h3>
            <p className="text-muted-foreground">Weekly reports will appear here once your guardians are linked and you start learning.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reports.map(r => (
            <Card key={r.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Weekly Report — {format(new Date(r.created_at), 'MMM d, yyyy')}
                  </CardTitle>
                  <Badge variant="secondary">{r.report_data.mode || 'monitor'} mode</Badge>
                </div>
                {r.report_data.guardian_name && (
                  <p className="text-sm text-muted-foreground">Sent to: {r.report_data.guardian_name}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5">
                    <Target className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Quizzes</p>
                      <p className="font-bold">{r.report_data.quiz_count || 0}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/5">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-xs text-muted-foreground">Avg Score</p>
                      <p className="font-bold">{r.report_data.avg_score || 0}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/5">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-muted-foreground">Lessons</p>
                      <p className="font-bold">{r.report_data.lessons_completed || 0}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/5">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-xs text-muted-foreground">Study Hrs</p>
                      <p className="font-bold">{r.report_data.study_hours || 0}</p>
                    </div>
                  </div>
                </div>
                {r.report_data.summary && (
                  <p className="mt-4 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">{r.report_data.summary}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuardianReportsPage;
