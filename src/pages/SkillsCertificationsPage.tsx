import React from 'react';
import { Award, CheckCircle, Clock, BookOpen, Star, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const certifications = [
  { name: 'Basic Electrical Safety', provider: 'TEVETA', duration: '2 weeks', modules: 5, progress: 0, level: 'Foundation' },
  { name: 'Welding Level 1', provider: 'TEVETA', duration: '1 month', modules: 8, progress: 0, level: 'Foundation' },
  { name: 'Food Hygiene Certificate', provider: 'ZABS', duration: '1 week', modules: 4, progress: 0, level: 'Foundation' },
  { name: 'Digital Literacy', provider: 'ICT Association', duration: '3 weeks', modules: 6, progress: 0, level: 'Foundation' },
  { name: 'Auto Diagnostics Level 1', provider: 'TEVETA', duration: '6 weeks', modules: 10, progress: 0, level: 'Intermediate' },
  { name: 'Advanced Carpentry', provider: 'TEVETA', duration: '2 months', modules: 12, progress: 0, level: 'Advanced' },
  { name: 'Solar Installation Pro', provider: 'REA', duration: '1 month', modules: 8, progress: 0, level: 'Intermediate' },
  { name: 'Farm Management', provider: 'ZARI', duration: '6 weeks', modules: 9, progress: 0, level: 'Intermediate' },
];

const levelColors: Record<string, string> = {
  Foundation: 'bg-green-500/10 text-green-600',
  Intermediate: 'bg-yellow-500/10 text-yellow-600',
  Advanced: 'bg-orange-500/10 text-orange-600',
};

const SkillsCertificationsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Award className="h-8 w-8 text-primary" /> Micro-Certifications
      </h1>
      <p className="text-muted-foreground mt-1">Earn recognized certifications in your skill area</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {certifications.map(c => (
        <Card key={c.name} className="border-none shadow-md">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.provider}</p>
              </div>
              <Badge className={levelColors[c.level]}>{c.level}</Badge>
            </div>
            <div className="flex gap-2 mb-3">
              <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />{c.duration}</Badge>
              <Badge variant="outline"><BookOpen className="h-3 w-3 mr-1" />{c.modules} modules</Badge>
            </div>
            <Progress value={c.progress} className="h-2 mb-3" />
            <Button className="w-full" size="sm" variant="outline" onClick={() => toast.success('Enrolled!')}>
              <Zap className="h-4 w-4 mr-2" /> Start Certification
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default SkillsCertificationsPage;
