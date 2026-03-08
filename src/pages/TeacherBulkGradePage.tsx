import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, FileUp, Table2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
        return { student_id: obj.student_id, course_id: obj.course_id, score, term: obj.term, grade_letter: obj.grade_letter || '', remarks: obj.remarks || '', valid, error: !valid ? 'Invalid data' : undefined };
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
      validRows.map(r => ({ student_id: r.student_id, course_id: r.course_id, score: r.score, term: r.term, grade_letter: r.grade_letter || null, remarks: r.remarks || null, recorded_by: user.id }))
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
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Upload className="w-5 h-5 text-primary" />
          </div>
          Bulk Grade Import
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Upload a CSV file to import student grades in bulk</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upload CSV File</CardTitle>
          <CardDescription>
            Required columns: <code className="text-xs bg-muted px-1.5 py-0.5 rounded">student_id</code>,{' '}
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">course_id</code>,{' '}
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">score</code>,{' '}
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">term</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors">
            <FileUp className="w-8 h-8 text-muted-foreground mb-2" />
            <span className="text-sm font-medium text-foreground">Click to upload CSV</span>
            <span className="text-xs text-muted-foreground mt-0.5">or drag and drop</span>
            <input type="file" accept=".csv" onChange={handleFile} className="hidden" />
          </label>
        </CardContent>
      </Card>

      {rows.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Table2 className="w-4 h-4 text-primary" /> Preview
                </CardTitle>
                <CardDescription>{rows.length} rows parsed from CSV</CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle className="h-3 w-3 text-emerald-500" /> {validCount} valid
                </Badge>
                {invalidCount > 0 && (
                  <Badge variant="destructive" className="gap-1">
                    <AlertCircle className="h-3 w-3" /> {invalidCount} invalid
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto max-h-80">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Student ID</TableHead>
                    <TableHead>Course ID</TableHead>
                    <TableHead className="text-center">Score</TableHead>
                    <TableHead>Term</TableHead>
                    <TableHead className="text-center w-20">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.slice(0, 50).map((r, i) => (
                    <TableRow key={i} className={!r.valid ? 'bg-destructive/5' : ''}>
                      <TableCell className="font-mono text-xs">{r.student_id.slice(0, 8)}…</TableCell>
                      <TableCell className="font-mono text-xs">{r.course_id.slice(0, 8)}…</TableCell>
                      <TableCell className="text-center font-semibold">{r.score}</TableCell>
                      <TableCell className="text-sm">{r.term}</TableCell>
                      <TableCell className="text-center">
                        {r.valid ? <CheckCircle className="h-4 w-4 text-emerald-500 mx-auto" /> : <AlertCircle className="h-4 w-4 text-destructive mx-auto" />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 border-t border-border">
              <Button onClick={importGrades} disabled={importing || imported || validCount === 0} className="gap-2">
                {imported ? <><CheckCircle className="w-4 h-4" /> Imported</> : importing ? 'Importing...' : `Import ${validCount} Grades`}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeacherBulkGradePage;
