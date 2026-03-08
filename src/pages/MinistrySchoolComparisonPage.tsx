import React, { useState } from 'react';
import { Building2, GitCompareArrows } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const MinistrySchoolComparisonPage = () => {
  const [schools, setSchools] = useState<string[]>(['', '', '']);

  const { data: allSchools } = useQuery({
    queryKey: ['all-schools'],
    queryFn: async () => {
      const { data } = await supabase.from('profiles').select('school').not('school', 'is', null);
      const unique = [...new Set((data || []).map(p => p.school).filter(Boolean))];
      return unique as string[];
    },
  });

  const { data: comparison, refetch } = useQuery({
    queryKey: ['school-comparison', schools],
    queryFn: async () => {
      const selected = schools.filter(Boolean);
      if (selected.length < 2) return null;
      const results = await Promise.all(selected.map(async (school) => {
        const { data: students } = await supabase.from('profiles').select('id').eq('school', school).eq('role', 'student');
        const { data: teachers } = await supabase.from('profiles').select('id').eq('school', school).eq('role', 'teacher');
        const studentIds = students?.map(s => s.id) || [];
        let avgGrade = 0;
        if (studentIds.length) {
          const { data: grades } = await supabase.from('grades').select('score').in('student_id', studentIds.slice(0, 100));
          avgGrade = grades?.length ? Math.round(grades.reduce((s, g) => s + (g.score || 0), 0) / grades.length) : 0;
        }
        return { school, students: students?.length || 0, teachers: teachers?.length || 0, avgGrade, ratio: teachers?.length ? `1:${Math.round((students?.length || 0) / teachers.length)}` : 'N/A' };
      }));
      return results;
    },
    enabled: false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <GitCompareArrows className="h-8 w-8 text-primary" /> School Comparison
        </h1>
        <p className="text-muted-foreground mt-1">Compare performance metrics across schools</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Select Schools to Compare</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {schools.map((s, i) => (
            <Input key={i} list="school-list" placeholder={`School ${i + 1}`} value={s} onChange={e => { const n = [...schools]; n[i] = e.target.value; setSchools(n); }} />
          ))}
          <datalist id="school-list">
            {allSchools?.map(s => <option key={s} value={s} />)}
          </datalist>
          <Button onClick={() => refetch()} disabled={schools.filter(Boolean).length < 2}>
            <GitCompareArrows className="h-4 w-4 mr-2" /> Compare
          </Button>
        </CardContent>
      </Card>

      {comparison && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {comparison.map(c => (
            <Card key={c.school} className="border-none shadow-lg">
              <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" /> {c.school}</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'Students', value: c.students },
                  { label: 'Teachers', value: c.teachers },
                  { label: 'Teacher:Student', value: c.ratio },
                  { label: 'Avg Grade', value: `${c.avgGrade}%` },
                ].map(m => (
                  <div key={m.label} className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="text-sm text-muted-foreground">{m.label}</span>
                    <span className="font-bold">{m.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinistrySchoolComparisonPage;
