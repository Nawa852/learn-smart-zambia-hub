import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { FileBarChart, Award, BookOpen } from 'lucide-react';
import { useGuardianData } from '@/hooks/useGuardianData';
import { Skeleton } from '@/components/ui/skeleton';

const gradeColor = (g: string) => {
  if (g.startsWith('A')) return 'default' as const;
  if (g.startsWith('B')) return 'secondary' as const;
  return 'outline' as const;
};

const ParentGradesPage = () => {
  const { students, loading } = useGuardianData();

  if (loading) return <div className="space-y-6"><Skeleton className="h-32" /><Skeleton className="h-64" /></div>;

  if (students.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold flex items-center gap-3"><FileBarChart className="w-8 h-8 text-primary" />Academic Grades</h1>
        <Card><CardContent className="p-12 text-center text-muted-foreground">No students linked yet.</CardContent></Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3"><FileBarChart className="w-8 h-8 text-primary" />Academic Grades</h1>
        <p className="text-muted-foreground mt-1">Grade reports from the database</p>
      </div>

      <Tabs defaultValue="0" className="space-y-4">
        <TabsList>
          {students.map((c, i) => (
            <TabsTrigger key={c.id} value={String(i)}>{c.name}</TabsTrigger>
          ))}
        </TabsList>

        {students.map((child, ci) => (
          <TabsContent key={child.id} value={String(ci)} className="space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card><CardContent className="p-5 text-center">
                <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{child.subjects.length}</p>
                <p className="text-xs text-muted-foreground">Grades Recorded</p>
              </CardContent></Card>
              <Card><CardContent className="p-5 text-center">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{child.enrollments.length}</p>
                <p className="text-xs text-muted-foreground">Enrolled Courses</p>
              </CardContent></Card>
              <Card><CardContent className="p-5 text-center">
                <FileBarChart className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-lg font-bold">{child.grade || 'N/A'}</p>
                <p className="text-xs text-muted-foreground">Grade Level</p>
              </CardContent></Card>
            </div>

            {/* Grades Table */}
            {child.subjects.length > 0 ? (
              <Card>
                <CardHeader><CardTitle>Subject Grades</CardTitle></CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-semibold">Subject</th>
                          <th className="text-center py-3 px-2 font-semibold">Score</th>
                          <th className="text-center py-3 px-2 font-semibold">Grade</th>
                          <th className="text-center py-3 px-2 font-semibold">Term</th>
                        </tr>
                      </thead>
                      <tbody>
                        {child.subjects.map((s, i) => (
                          <tr key={i} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-2 font-medium">{s.courseTitle}</td>
                            <td className="py-3 px-2 text-center font-bold">{s.score !== null ? `${s.score}%` : '--'}</td>
                            <td className="py-3 px-2 text-center">
                              {s.gradeLetter ? <Badge variant={gradeColor(s.gradeLetter)}>{s.gradeLetter}</Badge> : '--'}
                            </td>
                            <td className="py-3 px-2 text-center text-muted-foreground">{s.term || '--'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card><CardContent className="p-8 text-center text-muted-foreground">No grades recorded for this student yet.</CardContent></Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ParentGradesPage;
