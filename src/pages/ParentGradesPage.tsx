import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { FileBarChart, TrendingUp, TrendingDown, Minus, Award, BookOpen } from 'lucide-react';

const childrenGrades = [
  {
    name: "Brighton Mwamba",
    grade: "Grade 12",
    gpa: 3.7,
    rank: 5,
    totalStudents: 48,
    term: "Term 1 2026",
    subjects: [
      { name: "Mathematics", ca1: 82, ca2: 88, exam: 85, final: 85, grade: "A", trend: "up" },
      { name: "Physics", ca1: 70, ca2: 75, exam: 72, final: 72, grade: "B+", trend: "up" },
      { name: "Chemistry", ca1: 78, ca2: 82, exam: 80, final: 80, grade: "A-", trend: "stable" },
      { name: "Biology", ca1: 65, ca2: 68, exam: 70, final: 68, grade: "B", trend: "down" },
      { name: "English", ca1: 88, ca2: 92, exam: 90, final: 90, grade: "A+", trend: "up" },
      { name: "Civic Education", ca1: 75, ca2: 78, exam: 76, final: 76, grade: "B+", trend: "stable" },
    ],
  },
  {
    name: "Sarah Banda",
    grade: "Grade 9",
    gpa: 3.9,
    rank: 2,
    totalStudents: 52,
    term: "Term 1 2026",
    subjects: [
      { name: "English", ca1: 94, ca2: 96, exam: 95, final: 95, grade: "A+", trend: "up" },
      { name: "Biology", ca1: 85, ca2: 90, exam: 88, final: 88, grade: "A", trend: "up" },
      { name: "History", ca1: 88, ca2: 92, exam: 91, final: 91, grade: "A", trend: "stable" },
      { name: "Geography", ca1: 82, ca2: 86, exam: 85, final: 85, grade: "A-", trend: "up" },
      { name: "Mathematics", ca1: 78, ca2: 80, exam: 82, final: 80, grade: "A-", trend: "up" },
    ],
  },
];

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
  if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

const gradeColor = (g: string) => {
  if (g.startsWith('A')) return 'default';
  if (g.startsWith('B')) return 'secondary';
  return 'outline';
};

const ParentGradesPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <FileBarChart className="w-8 h-8 text-primary" />
        Academic Grades
      </h1>
      <p className="text-muted-foreground mt-1">Detailed grade reports with continuous assessment breakdown</p>
    </div>

    <Tabs defaultValue="0" className="space-y-4">
      <TabsList>
        {childrenGrades.map((c, i) => (
          <TabsTrigger key={i} value={String(i)}>{c.name}</TabsTrigger>
        ))}
      </TabsList>

      {childrenGrades.map((child, ci) => (
        <TabsContent key={ci} value={String(ci)} className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card><CardContent className="p-5 text-center">
              <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{child.gpa}</p>
              <p className="text-xs text-muted-foreground">GPA</p>
            </CardContent></Card>
            <Card><CardContent className="p-5 text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">#{child.rank}</p>
              <p className="text-xs text-muted-foreground">Class Rank / {child.totalStudents}</p>
            </CardContent></Card>
            <Card><CardContent className="p-5 text-center">
              <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{child.subjects.length}</p>
              <p className="text-xs text-muted-foreground">Subjects</p>
            </CardContent></Card>
            <Card><CardContent className="p-5 text-center">
              <FileBarChart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-lg font-bold">{child.term}</p>
              <p className="text-xs text-muted-foreground">{child.grade}</p>
            </CardContent></Card>
          </div>

          {/* Grades Table */}
          <Card>
            <CardHeader><CardTitle>Subject Breakdown</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Subject</th>
                      <th className="text-center py-3 px-2 font-semibold">CA 1</th>
                      <th className="text-center py-3 px-2 font-semibold">CA 2</th>
                      <th className="text-center py-3 px-2 font-semibold">Exam</th>
                      <th className="text-center py-3 px-2 font-semibold">Final</th>
                      <th className="text-center py-3 px-2 font-semibold">Grade</th>
                      <th className="text-center py-3 px-2 font-semibold">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {child.subjects.map((s, i) => (
                      <tr key={i} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-2 font-medium">{s.name}</td>
                        <td className="py-3 px-2 text-center">{s.ca1}%</td>
                        <td className="py-3 px-2 text-center">{s.ca2}%</td>
                        <td className="py-3 px-2 text-center">{s.exam}%</td>
                        <td className="py-3 px-2 text-center font-bold">{s.final}%</td>
                        <td className="py-3 px-2 text-center"><Badge variant={gradeColor(s.grade)}>{s.grade}</Badge></td>
                        <td className="py-3 px-2 text-center"><TrendIcon trend={s.trend} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  </div>
);

export default ParentGradesPage;
