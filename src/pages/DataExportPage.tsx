import { useState } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, FileText, Database, Shield } from 'lucide-react';

const EXPORT_OPTIONS = [
  { key: 'grades', label: 'Grades', table: 'grades', filter: 'student_id' },
  { key: 'notes', label: 'Notes', table: 'student_notes', filter: 'user_id' },
  { key: 'quiz_attempts', label: 'Quiz Attempts', table: 'quiz_attempts', filter: 'user_id' },
  { key: 'focus_sessions', label: 'Focus Sessions', table: 'focus_sessions', filter: 'user_id' },
  { key: 'enrollments', label: 'Enrollments', table: 'enrollments', filter: 'user_id' },
  { key: 'lesson_completions', label: 'Lesson Completions', table: 'lesson_completions', filter: 'user_id' },
];

function toCsv(data: any[]): string {
  if (!data.length) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => JSON.stringify(row[h] ?? '')).join(','));
  return [headers.join(','), ...rows].join('\n');
}

const DataExportPage = () => {
  const { user } = useAuth();
  const [selected, setSelected] = useState<string[]>(['grades', 'notes']);
  const [exporting, setExporting] = useState(false);

  const toggle = (key: string) => setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);

  const exportData = async () => {
    if (!user || !selected.length) return;
    setExporting(true);
    try {
      for (const key of selected) {
        const opt = EXPORT_OPTIONS.find(o => o.key === key)!;
        const { data } = await (supabase as any).from(opt.table).select('*').eq(opt.filter, user.id);
        if (data?.length) {
          const csv = toCsv(data);
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a'); a.href = url; a.download = `${key}_export.csv`; a.click();
          URL.revokeObjectURL(url);
        }
      }
      toast.success('Export complete!');
    } catch { toast.error('Export failed'); }
    setExporting(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Database className="w-6 h-6 text-primary" /> Data Export</h1>
        <p className="text-sm text-muted-foreground">Download your personal data as CSV files</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Shield className="w-4 h-4" /> Your Data, Your Control</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {EXPORT_OPTIONS.map(opt => (
            <label key={opt.key} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-muted/50">
              <Checkbox checked={selected.includes(opt.key)} onCheckedChange={() => toggle(opt.key)} />
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
          <Button onClick={exportData} disabled={exporting || !selected.length} className="w-full mt-4">
            <Download className="w-4 h-4 mr-2" />{exporting ? 'Exporting...' : `Export ${selected.length} file(s)`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataExportPage;
