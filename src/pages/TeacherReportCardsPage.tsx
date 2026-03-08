import { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Printer, User, BookOpen } from 'lucide-react';
import { LogoLoader } from '@/components/UI/LogoLoader';

interface StudentGrade { course_title: string; score: number | null; grade_letter: string | null; term: string | null; }

const TeacherReportCardsPage = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [grades, setGrades] = useState<StudentGrade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: courses } = await supabase.from('courses').select('id').eq('created_by', user.id);
      if (!courses?.length) { setLoading(false); return; }
      const courseIds = courses.map(c => c.id) as string[];
      const { data: enrollments } = await supabase.from('enrollments').select('user_id').in('course_id', courseIds);
      const uniqueIds = [...new Set((enrollments || []).map(e => e.user_id))];
      const { data: profiles } = await supabase.from('profiles').select('id, full_name, grade').in('id', uniqueIds);
      setStudents(profiles || []);
      setLoading(false);
    })();
  }, [user]);

  useEffect(() => {
    if (!selectedStudent) return;
    (async () => {
      const { data } = await (supabase as any).from('grades').select('score, grade_letter, term, course_id').eq('student_id', selectedStudent);
      if (data) {
        const courseIds = [...new Set(data.map((g: any) => g.course_id))];
        const { data: courses } = await supabase.from('courses').select('id, title').in('id', courseIds);
        const cMap = Object.fromEntries((courses || []).map(c => [c.id, c.title]));
        setGrades(data.map((g: any) => ({ ...g, course_title: cMap[g.course_id] || 'Unknown' })));
      }
    })();
  }, [selectedStudent]);

  const selectedProfile = students.find(s => s.id === selectedStudent);
  const avg = grades.length ? Math.round(grades.reduce((s, g) => s + (g.score || 0), 0) / grades.length) : 0;

  if (loading) return <div className="max-w-3xl mx-auto py-12 px-4"><LogoLoader text="Loading..." /></div>;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><FileText className="w-6 h-6 text-primary" /> Report Card Generator</h1>
        <p className="text-sm text-muted-foreground">Generate printable report cards for your students</p>
      </div>

      <Select value={selectedStudent} onValueChange={setSelectedStudent}>
        <SelectTrigger><SelectValue placeholder="Select a student" /></SelectTrigger>
        <SelectContent>
          {students.map(s => <SelectItem key={s.id} value={s.id}>{s.full_name || 'Unnamed'} {s.grade ? `(${s.grade})` : ''}</SelectItem>)}
        </SelectContent>
      </Select>

      {selectedStudent && (
        <Card id="report-card">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" />{selectedProfile?.full_name || 'Student'}</CardTitle>
                <p className="text-sm text-muted-foreground">Grade: {selectedProfile?.grade || 'N/A'}</p>
              </div>
              <Button variant="outline" onClick={() => window.print()}><Printer className="w-4 h-4 mr-2" />Print</Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {grades.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No grades recorded for this student.</p>
            ) : (
              <div className="space-y-4">
                <table className="w-full text-sm">
                  <thead><tr className="border-b text-left">
                    <th className="py-2">Subject</th><th>Score</th><th>Grade</th><th>Term</th>
                  </tr></thead>
                  <tbody>
                    {grades.map((g, i) => (
                      <tr key={i} className="border-b border-border/30">
                        <td className="py-2 flex items-center gap-2"><BookOpen className="w-3 h-3 text-muted-foreground" />{g.course_title}</td>
                        <td>{g.score ?? '-'}</td>
                        <td><Badge variant={g.grade_letter === 'A' ? 'default' : 'secondary'}>{g.grade_letter || '-'}</Badge></td>
                        <td className="text-muted-foreground">{g.term || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end">
                  <Badge className="text-sm px-3 py-1">Average: {avg}%</Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeacherReportCardsPage;
