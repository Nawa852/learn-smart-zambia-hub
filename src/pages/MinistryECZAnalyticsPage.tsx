import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, BookOpen, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

const MinistryECZAnalyticsPage = () => {
  const [quizData, setQuizData] = useState<any[]>([]);
  const [gradeData, setGradeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [quizRes, gradeRes] = await Promise.all([
        supabase.from('quiz_attempts').select('subject, correct_answers, total_questions, grade_level'),
        supabase.from('grades').select('score, course_id, term'),
      ]);

      if (quizRes.data) {
        const bySubject = new Map<string, { total: number; correct: number; count: number }>();
        quizRes.data.forEach((q: any) => {
          const existing = bySubject.get(q.subject) || { total: 0, correct: 0, count: 0 };
          existing.total += q.total_questions;
          existing.correct += q.correct_answers;
          existing.count++;
          bySubject.set(q.subject, existing);
        });
        setQuizData(Array.from(bySubject.entries()).map(([subject, d]) => ({
          subject,
          avgScore: d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0,
          attempts: d.count,
        })));
      }

      if (gradeRes.data) {
        const ranges = [
          { name: '90-100', min: 90, max: 100, count: 0 },
          { name: '80-89', min: 80, max: 89, count: 0 },
          { name: '70-79', min: 70, max: 79, count: 0 },
          { name: '60-69', min: 60, max: 69, count: 0 },
          { name: '50-59', min: 50, max: 59, count: 0 },
          { name: 'Below 50', min: 0, max: 49, count: 0 },
        ];
        gradeRes.data.forEach((g: any) => {
          if (g.score == null) return;
          const range = ranges.find(r => g.score >= r.min && g.score <= r.max);
          if (range) range.count++;
        });
        setGradeData(ranges);
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          ECZ Exam Analytics
        </h1>
        <p className="text-muted-foreground mt-1">National examination performance breakdown</p>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading analytics...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-3xl font-bold">{quizData.length}</p>
                <p className="text-sm text-muted-foreground">Subjects Tracked</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto text-accent mb-2" />
                <p className="text-3xl font-bold">{quizData.reduce((a, q) => a + q.attempts, 0)}</p>
                <p className="text-sm text-muted-foreground">Total Quiz Attempts</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <p className="text-3xl font-bold">
                  {quizData.length > 0 ? Math.round(quizData.reduce((a, q) => a + q.avgScore, 0) / quizData.length) : 0}%
                </p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg">
              <CardHeader><CardTitle>Performance by Subject</CardTitle></CardHeader>
              <CardContent>
                {quizData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={quizData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                      <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="avgScore" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-muted-foreground py-12">No quiz data available yet</p>
                )}
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader><CardTitle>Grade Distribution</CardTitle></CardHeader>
              <CardContent>
                {gradeData.some(g => g.count > 0) ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={gradeData.filter(g => g.count > 0)} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, count }) => `${name}: ${count}`}>
                        {gradeData.filter(g => g.count > 0).map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-muted-foreground py-12">No grade data available yet</p>
                )}
              </CardContent>
            </Card>
          </div>

          {quizData.length > 0 && (
            <Card className="border-none shadow-lg">
              <CardHeader><CardTitle>Subject Breakdown</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quizData.map(q => (
                    <div key={q.subject}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{q.subject}</span>
                        <span>{q.avgScore}% avg ({q.attempts} attempts)</span>
                      </div>
                      <Progress value={q.avgScore} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default MinistryECZAnalyticsPage;
