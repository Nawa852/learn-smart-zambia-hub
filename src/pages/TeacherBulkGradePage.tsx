import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';

interface GradeRow {
  student_id: string;
  course_id: string;
  score: number;
  term: string;
  grade_letter?: string;
  remarks?: string;
  valid: boolean;
  error?: string;
}

const TeacherBulkGradePage = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<GradeRow[]>([]);
  const [importing, setImporting] = useState(false);
  const [imported, setImported] = useState(false);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.split('\n').filter(l => l.trim());
      if (lines.length < 2) { toast.error('CSV must have header + data rows'); return; }
      const header = lines[0].split(',').map(h => h.trim().toLowerCase());
      const reqCols = ['student_id', 'course_id', 'score', 'term'];
      const missing = reqCols.filter(c => !header.includes(c));
      if (missing.length) { toast.error(`Missing columns: ${missing.join(', ')}`); return; }

      const parsed: GradeRow[] = lines.slice(1).map(line => {
        const vals = line.split(',').map(v => v.trim());
        const obj: any = {};
        header.forEach((h, i) => { obj[h] = vals[i] || ''; });
        const score = parseFloat(obj.score);
        const valid = !!obj.student_id && !!obj.course_id && !isNaN(score) && score >= 0 && score <= 100 && !!obj.term;
        return {
          student_id: obj.student_id,
          course_id: obj.course_id,
          score,
          term: obj.term,
          grade_letter: obj.grade_letter || '',
          remarks: obj.remarks || '',
          valid,
          error: !valid ? 'Invalid data' : undefined,
        };
      });
      setRows(parsed);
      setImported(false);
    };
    reader.readAsText(file);
  }, []);

  const importGrades = async () => {
    if (!user) return;
    const validRows = rows.filter(r => r.valid);
    if (!validRows.length) { toast.error('No valid rows'); return; }
    setImporting(true);
    const { error } = await supabase.from('grades').insert(
      validRows.map(r => ({
        student_id: r.student_id,
        course_id: r.course_id,
        score: r.score,
        term: r.term,
        grade_letter: r.grade_letter || null,
        remarks: r.remarks || null,
        recorded_by: user.id,
      }))
    );
    if (error) toast.error('Import failed: ' + error.message);
    else { toast.success(`${validRows.length} grades imported!`); setImported(true); }
    setImporting(false);
  };

  const validCount = rows.filter(r => r.valid).length;
  const invalidCount = rows.filter(r => !r.valid).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Upload className="h-8 w-8 text-primary" /> Bulk Grade Import
        </h1>
        <p className="text-muted-foreground mt-1">Upload a CSV file to import grades in bulk</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Upload CSV</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Required columns: <code>student_id, course_id, score, term</code>. Optional: <code>grade_letter, remarks</code>
          </p>
          <input type="file" accept=".csv" onChange={handleFile} className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
        </CardContent>
      </Card>

      {rows.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Preview ({rows.length} rows)</span>
              <div className="flex gap-3 text-sm font-normal">
                <span className="flex items-center gap-1 text-green-600"><CheckCircle className="h-4 w-4" />{validCount} valid</span>
                {invalidCount > 0 && <span className="flex items-center gap-1 text-destructive"><AlertCircle className="h-4 w-4" />{invalidCount} invalid</span>}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto max-h-80">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Student ID</th>
                    <th className="text-left p-2">Course ID</th>
                    <th className="text-left p-2">Score</th>
                    <th className="text-left p-2">Term</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 50).map((r, i) => (
                    <tr key={i} className={`border-b ${!r.valid ? 'bg-destructive/5' : ''}`}>
                      <td className="p-2 font-mono text-xs">{r.student_id.slice(0, 8)}...</td>
                      <td className="p-2 font-mono text-xs">{r.course_id.slice(0, 8)}...</td>
                      <td className="p-2">{r.score}</td>
                      <td className="p-2">{r.term}</td>
                      <td className="p-2">{r.valid ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-destructive" />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <Button onClick={importGrades} disabled={importing || imported || validCount === 0}>
                {imported ? 'Imported ✓' : importing ? 'Importing...' : `Import ${validCount} Grades`}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeacherBulkGradePage;
