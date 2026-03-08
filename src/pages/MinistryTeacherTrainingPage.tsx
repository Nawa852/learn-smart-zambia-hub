import React from 'react';
import { GraduationCap, Users, Calendar, Award, BookOpen, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const programs = [
  { name: 'Digital Pedagogy Certificate', enrolled: 2400, completed: 1800, province: 'National', duration: '6 months', status: 'active' },
  { name: 'Inclusive Education Training', enrolled: 1200, completed: 400, province: 'National', duration: '3 months', status: 'active' },
  { name: 'Science Lab Methodology', enrolled: 800, completed: 650, province: 'Lusaka', duration: '2 months', status: 'active' },
  { name: 'Early Childhood Development', enrolled: 600, completed: 580, province: 'National', duration: '4 months', status: 'completed' },
  { name: 'School Leadership Program', enrolled: 350, completed: 120, province: 'National', duration: '12 months', status: 'active' },
  { name: 'Mathematics Pedagogy Refresh', enrolled: 1500, completed: 900, province: 'National', duration: '3 months', status: 'active' },
  { name: 'ICT for Teachers', enrolled: 3200, completed: 2100, province: 'National', duration: '6 months', status: 'active' },
  { name: 'Zambian Languages Curriculum', enrolled: 500, completed: 480, province: 'Rural', duration: '2 months', status: 'completed' },
];

const MinistryTeacherTrainingPage = () => {
  const totalEnrolled = programs.reduce((a, p) => a + p.enrolled, 0);
  const totalCompleted = programs.reduce((a, p) => a + p.completed, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" /> Teacher Training Programs
        </h1>
        <p className="text-muted-foreground mt-1">Professional development and training initiatives</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <p className="text-3xl font-bold text-primary">{programs.length}</p>
          <p className="text-sm text-muted-foreground">Programs</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <p className="text-3xl font-bold">{totalEnrolled.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Teachers Enrolled</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <p className="text-3xl font-bold text-green-500">{totalCompleted.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <p className="text-3xl font-bold">{((totalCompleted / totalEnrolled) * 100).toFixed(0)}%</p>
          <p className="text-sm text-muted-foreground">Completion Rate</p>
        </CardContent></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {programs.map(p => {
          const pct = (p.completed / p.enrolled) * 100;
          return (
            <Card key={p.name} className="border-none shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{p.name}</h3>
                  <Badge className={p.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'}>{p.status}</Badge>
                </div>
                <div className="flex gap-2 mb-3">
                  <Badge variant="outline"><MapPin className="h-3 w-3 mr-1" />{p.province}</Badge>
                  <Badge variant="outline"><Calendar className="h-3 w-3 mr-1" />{p.duration}</Badge>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{p.completed} / {p.enrolled} teachers</span>
                  <span className="font-medium">{pct.toFixed(0)}%</span>
                </div>
                <Progress value={pct} className="h-2" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MinistryTeacherTrainingPage;
