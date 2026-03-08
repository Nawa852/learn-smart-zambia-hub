import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, MapPin, BookOpen, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const provinces = ['All Provinces', 'Lusaka', 'Copperbelt', 'Southern', 'Central', 'Eastern', 'Northern', 'Luapula', 'Northwestern', 'Western', 'Muchinga'];
const reportTypes = [
  { id: 'enrollment', label: 'Enrollment Statistics', desc: 'Student and school enrollment data' },
  { id: 'performance', label: 'Academic Performance', desc: 'Pass rates, grades, subject performance' },
  { id: 'teachers', label: 'Teacher Workforce', desc: 'Teacher distribution and ratios' },
  { id: 'infrastructure', label: 'Infrastructure Status', desc: 'School facilities and connectivity' },
  { id: 'interventions', label: 'Intervention Progress', desc: 'Status of active interventions' },
  { id: 'policy', label: 'Policy Impact', desc: 'Policy implementation and outcomes' },
];

const MinistryReportGeneratorPage = () => {
  const [province, setProvince] = useState('All Provinces');
  const [year, setYear] = useState('2024');
  const [selected, setSelected] = useState<string[]>(['enrollment', 'performance']);
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const generateReport = async () => {
    if (selected.length === 0) { toast.error('Select at least one report section'); return; }
    setGenerating(true);
    setReport(null);

    try {
      const { data: stats } = await supabase.rpc('get_platform_stats');
      const sections: string[] = [];
      sections.push(`# National Education Report — ${year}`);
      sections.push(`**Province:** ${province}`);
      sections.push(`**Generated:** ${new Date().toLocaleDateString()}\n`);

      if (selected.includes('enrollment') && stats) {
        sections.push(`## Enrollment Statistics`);
        sections.push(`- Total Students: ${stats.total_students}`);
        sections.push(`- Total Teachers: ${stats.total_teachers}`);
        sections.push(`- Total Courses: ${stats.total_courses}`);
        sections.push(`- Total Enrollments: ${stats.total_enrollments}\n`);
      }
      if (selected.includes('performance') && stats) {
        sections.push(`## Academic Performance`);
        sections.push(`- Average Grade: ${stats.avg_grade}%`);
        sections.push(`- Total Schools: ${stats.total_schools}\n`);
      }
      if (selected.includes('teachers')) {
        sections.push(`## Teacher Workforce`);
        sections.push(`- Data sourced from platform profiles`);
        sections.push(`- Teacher-student ratios vary by province\n`);
      }

      setReport(sections.join('\n'));
      toast.success('Report generated successfully');
    } catch {
      toast.error('Failed to generate report');
    }
    setGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" />
          Report Generator
        </h1>
        <p className="text-muted-foreground mt-1">Generate comprehensive national education reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-lg lg:col-span-1">
          <CardHeader><CardTitle className="text-lg">Report Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm mb-2 block">Province</Label>
              <Select value={province} onValueChange={setProvince}>
                <SelectTrigger><MapPin className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  {provinces.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm mb-2 block">Year</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger><Calendar className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['2024', '2023', '2022'].map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm mb-3 block">Report Sections</Label>
              <div className="space-y-3">
                {reportTypes.map(rt => (
                  <div key={rt.id} className="flex items-start gap-3">
                    <Checkbox id={rt.id} checked={selected.includes(rt.id)} onCheckedChange={() => toggleSection(rt.id)} />
                    <div>
                      <Label htmlFor={rt.id} className="text-sm font-medium cursor-pointer">{rt.label}</Label>
                      <p className="text-xs text-muted-foreground">{rt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={generateReport} disabled={generating} className="w-full">
              {generating ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : <><FileText className="h-4 w-4 mr-2" /> Generate Report</>}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Report Preview</CardTitle>
              {report && (
                <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(report); toast.success('Copied to clipboard'); }}>
                  <Download className="h-4 w-4 mr-2" /> Copy
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {report ? (
              <div className="bg-muted/30 rounded-lg p-6 whitespace-pre-wrap font-mono text-sm min-h-[400px]">
                {report}
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
                <div className="text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p>Configure settings and click "Generate Report"</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MinistryReportGeneratorPage;
