import React, { useState } from 'react';
import { Download, FileText, Database, Table, BarChart3, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const datasets = [
  { id: 'enrollment', label: 'Enrollment Statistics', desc: 'Student enrollment by school, grade, province', size: '2.4 MB' },
  { id: 'performance', label: 'Academic Performance', desc: 'Exam results, pass rates, grade distributions', size: '5.1 MB' },
  { id: 'teachers', label: 'Teacher Registry', desc: 'Teacher profiles, qualifications, deployment', size: '1.8 MB' },
  { id: 'infrastructure', label: 'Infrastructure Data', desc: 'School facilities, equipment, connectivity', size: '890 KB' },
  { id: 'attendance', label: 'Attendance Records', desc: 'Student and teacher attendance data', size: '12.3 MB' },
  { id: 'budget', label: 'Budget Allocations', desc: 'Financial data, expenditures, allocations', size: '456 KB' },
  { id: 'dropout', label: 'Dropout Statistics', desc: 'Dropout rates, reasons, demographics', size: '1.2 MB' },
  { id: 'scholarships', label: 'Scholarship Data', desc: 'Recipients, amounts, programs', size: '780 KB' },
];

const MinistryDataExportPage = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [format, setFormat] = useState('csv');
  const [year, setYear] = useState('2026');

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Database className="h-8 w-8 text-primary" /> Data Export Center
        </h1>
        <p className="text-muted-foreground mt-1">Export national education datasets for analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h3 className="font-semibold text-lg">Select Datasets</h3>
          {datasets.map(ds => (
            <Card key={ds.id} className={`border-none shadow-sm cursor-pointer transition-shadow hover:shadow-md ${selected.includes(ds.id) ? 'ring-2 ring-primary' : ''}`} onClick={() => toggle(ds.id)}>
              <CardContent className="p-4 flex items-center gap-4">
                <Checkbox checked={selected.includes(ds.id)} onCheckedChange={() => toggle(ds.id)} />
                <div className="flex-1">
                  <p className="font-medium">{ds.label}</p>
                  <p className="text-sm text-muted-foreground">{ds.desc}</p>
                </div>
                <span className="text-sm text-muted-foreground">{ds.size}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-none shadow-lg h-fit sticky top-6">
          <CardHeader><CardTitle>Export Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Year</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger><Calendar className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['2026', '2025', '2024', '2023'].map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="bg-muted/30 rounded-lg p-3 text-sm">
              <p className="font-medium">{selected.length} datasets selected</p>
              <p className="text-muted-foreground">Format: {format.toUpperCase()}</p>
            </div>
            <Button className="w-full" disabled={selected.length === 0} onClick={() => toast.success(`Exported ${selected.length} datasets as ${format.toUpperCase()}`)}>
              <Download className="h-4 w-4 mr-2" /> Export Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MinistryDataExportPage;
