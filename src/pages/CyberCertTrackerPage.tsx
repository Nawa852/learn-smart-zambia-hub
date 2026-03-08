import React from 'react';
import { Award, CheckCircle, Clock, BookOpen, Shield, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const certifications = [
  { name: 'CompTIA Security+', provider: 'CompTIA', difficulty: 'Intermediate', duration: '3-6 months', progress: 0, status: 'not_started', topics: ['Network Security', 'Threats', 'Cryptography', 'IAM'] },
  { name: 'Certified Ethical Hacker (CEH)', provider: 'EC-Council', difficulty: 'Intermediate', duration: '4-6 months', progress: 0, status: 'not_started', topics: ['Penetration Testing', 'Social Engineering', 'Scanning'] },
  { name: 'OSCP', provider: 'Offensive Security', difficulty: 'Advanced', duration: '6-12 months', progress: 0, status: 'not_started', topics: ['Exploitation', 'Privilege Escalation', 'Report Writing'] },
  { name: 'CompTIA Network+', provider: 'CompTIA', difficulty: 'Beginner', duration: '2-4 months', progress: 0, status: 'not_started', topics: ['Networking', 'Infrastructure', 'Troubleshooting'] },
  { name: 'AWS Security Specialty', provider: 'Amazon', difficulty: 'Advanced', duration: '4-6 months', progress: 0, status: 'not_started', topics: ['Cloud Security', 'IAM', 'Encryption', 'Logging'] },
  { name: 'CISSP', provider: 'ISC²', difficulty: 'Expert', duration: '6-12 months', progress: 0, status: 'not_started', topics: ['Security Architecture', 'Risk Management', 'Governance'] },
  { name: 'Google Cybersecurity Certificate', provider: 'Google', difficulty: 'Beginner', duration: '3-6 months', progress: 0, status: 'not_started', topics: ['Linux', 'Python', 'SIEM', 'IDS'] },
  { name: 'eJPT', provider: 'INE', difficulty: 'Beginner', duration: '2-4 months', progress: 0, status: 'not_started', topics: ['Penetration Testing', 'Networking', 'Web Apps'] },
];

const diffColors: Record<string, string> = {
  Beginner: 'bg-green-500/10 text-green-600',
  Intermediate: 'bg-yellow-500/10 text-yellow-600',
  Advanced: 'bg-orange-500/10 text-orange-600',
  Expert: 'bg-red-500/10 text-red-600',
};

const CyberCertTrackerPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Award className="h-8 w-8 text-primary" /> Certification Tracker
      </h1>
      <p className="text-muted-foreground mt-1">Track your cybersecurity certification journey</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {certifications.map(c => (
        <Card key={c.name} className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.provider}</p>
              </div>
              <Badge className={diffColors[c.difficulty]}>{c.difficulty}</Badge>
            </div>
            <div className="flex gap-2 mb-3">
              <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />{c.duration}</Badge>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {c.topics.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
            </div>
            <Progress value={c.progress} className="h-2 mb-2" />
            <Button className="w-full" size="sm" variant="outline">
              <BookOpen className="h-4 w-4 mr-2" /> Start Studying
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default CyberCertTrackerPage;
