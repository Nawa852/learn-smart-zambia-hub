import React from 'react';
import { BookOpen, FileText, Users, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const papers = [
  { title: 'Impact of School Feeding on Academic Performance in Zambia', authors: 'Ministry Research Unit', date: '2026-02', status: 'published', category: 'Nutrition' },
  { title: 'Digital Learning Outcomes: Rural vs Urban Schools', authors: 'UNICEF Zambia & MoE', date: '2026-01', status: 'published', category: 'ICT' },
  { title: 'Teacher Retention Factors in Remote Districts', authors: 'Dr. M. Banda et al.', date: '2025-12', status: 'published', category: 'Workforce' },
  { title: 'Early Childhood Education Quality Standards Review', authors: 'ECE Task Force', date: '2026-03', status: 'in_review', category: 'ECE' },
  { title: 'Multilingual Education Effectiveness Study', authors: 'Language Policy Unit', date: '2026-02', status: 'in_progress', category: 'Languages' },
  { title: 'Climate Change Impact on School Infrastructure', authors: 'Infrastructure Dept.', date: '2026-04', status: 'planned', category: 'Infrastructure' },
  { title: 'STEM Education Gender Gap Analysis', authors: 'Gender Unit', date: '2025-11', status: 'published', category: 'Gender' },
  { title: 'Cost-Effectiveness of E-Learning Platforms', authors: 'ICT & Finance Dept.', date: '2026-01', status: 'published', category: 'Finance' },
];

const statusColors: Record<string, string> = {
  published: 'bg-green-500/10 text-green-600',
  in_review: 'bg-yellow-500/10 text-yellow-600',
  in_progress: 'bg-blue-500/10 text-blue-600',
  planned: 'bg-muted text-muted-foreground',
};

const MinistryResearchPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <BookOpen className="h-8 w-8 text-primary" /> Education Research Hub
      </h1>
      <p className="text-muted-foreground mt-1">Research publications and ongoing studies</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {['published', 'in_review', 'in_progress', 'planned'].map(s => (
        <Card key={s} className="border-none shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold">{papers.filter(p => p.status === s).length}</p>
            <p className="text-sm text-muted-foreground capitalize">{s.replace('_', ' ')}</p>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="space-y-3">
      {papers.map(p => (
        <Card key={p.title} className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.authors} • {p.date}</p>
                <Badge variant="outline" className="mt-1">{p.category}</Badge>
              </div>
              <Badge className={statusColors[p.status]}>{p.status.replace('_', ' ')}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default MinistryResearchPage;
