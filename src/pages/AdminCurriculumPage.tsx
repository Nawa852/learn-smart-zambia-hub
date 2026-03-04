import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, CheckCircle2, AlertTriangle, ArrowLeft, FileText, Layers, Target, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const subjects = [
  { name: 'Mathematics', grade: 'Grade 10-12', topics: 48, covered: 36, status: 'on-track', teacher: 'Mr. Banda' },
  { name: 'Physics', grade: 'Grade 10-12', topics: 42, covered: 28, status: 'on-track', teacher: 'Dr. Mwansa' },
  { name: 'English Language', grade: 'Grade 10-12', topics: 38, covered: 35, status: 'ahead', teacher: 'Ms. Phiri' },
  { name: 'Biology', grade: 'Grade 10-12', topics: 44, covered: 20, status: 'behind', teacher: 'Mr. Mumba' },
  { name: 'Chemistry', grade: 'Grade 10-12', topics: 40, covered: 30, status: 'on-track', teacher: 'Mrs. Lungu' },
  { name: 'History', grade: 'Grade 10-12', topics: 32, covered: 28, status: 'ahead', teacher: 'Mr. Tembo' },
];

const eczStandards = [
  { standard: 'ECZ-2024-MATH-001', desc: 'Algebra and Number Theory', compliance: 95 },
  { standard: 'ECZ-2024-SCI-002', desc: 'Scientific Method & Lab Skills', compliance: 88 },
  { standard: 'ECZ-2024-ENG-003', desc: 'Reading Comprehension & Analysis', compliance: 92 },
  { standard: 'ECZ-2024-BIO-004', desc: 'Cell Biology & Genetics', compliance: 78 },
];

const AdminCurriculumPage = () => {
  const navigate = useNavigate();

  const statusColor = (s: string) => s === 'ahead' ? 'bg-green-100 text-green-800' : s === 'behind' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Curriculum Management</h1>
          <p className="text-muted-foreground">ECZ-aligned curriculum tracking and compliance</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Subjects', value: '18', icon: BookOpen, color: 'text-blue-600 bg-blue-50' },
          { label: 'Topics Covered', value: '177/244', icon: CheckCircle2, color: 'text-green-600 bg-green-50' },
          { label: 'ECZ Compliance', value: '89%', icon: Target, color: 'text-purple-600 bg-purple-50' },
          { label: 'Behind Schedule', value: '3', icon: AlertTriangle, color: 'text-orange-600 bg-orange-50' },
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="subjects">
        <TabsList>
          <TabsTrigger value="subjects" className="gap-2"><Layers className="w-4 h-4" />Subject Progress</TabsTrigger>
          <TabsTrigger value="standards" className="gap-2"><FileText className="w-4 h-4" />ECZ Standards</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-4 mt-4">
          {subjects.map((subj, i) => (
            <Card key={i} className="hover:shadow-md transition-all">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{subj.name}</h3>
                    <p className="text-sm text-muted-foreground">{subj.grade} • {subj.teacher}</p>
                  </div>
                  <Badge className={statusColor(subj.status) + ' capitalize'}>{subj.status}</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Topics: {subj.covered}/{subj.topics}</span>
                    <span className="font-medium">{Math.round((subj.covered / subj.topics) * 100)}%</span>
                  </div>
                  <Progress value={(subj.covered / subj.topics) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="standards" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                ECZ Compliance Report
              </CardTitle>
              <CardDescription>Alignment with Examinations Council of Zambia standards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {eczStandards.map((std, i) => (
                <div key={i} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{std.desc}</p>
                      <p className="text-xs text-muted-foreground font-mono">{std.standard}</p>
                    </div>
                    <Badge variant={std.compliance >= 90 ? 'default' : 'secondary'}>
                      {std.compliance}% compliant
                    </Badge>
                  </div>
                  <Progress value={std.compliance} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCurriculumPage;
