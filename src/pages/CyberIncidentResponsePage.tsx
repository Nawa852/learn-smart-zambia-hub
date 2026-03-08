import React, { useState } from 'react';
import { AlertTriangle, Clock, Shield, CheckCircle, Users, FileText, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const scenarios = [
  { name: 'Ransomware Attack', severity: 'Critical', phase: 'Containment', steps: 6, completed: 0, desc: 'Organization hit by ransomware. Contain and recover.' },
  { name: 'Data Breach Response', severity: 'High', phase: 'Identification', steps: 8, completed: 0, desc: 'Customer data exposed. Follow IR procedures.' },
  { name: 'DDoS Mitigation', severity: 'Medium', phase: 'Detection', steps: 5, completed: 0, desc: 'Website under DDoS. Implement mitigation.' },
  { name: 'Insider Threat', severity: 'High', phase: 'Investigation', steps: 7, completed: 0, desc: 'Suspected insider activity detected.' },
  { name: 'Phishing Incident', severity: 'Medium', phase: 'Triage', steps: 4, completed: 0, desc: 'Multiple employees clicked phishing links.' },
  { name: 'Supply Chain Compromise', severity: 'Critical', phase: 'Analysis', steps: 9, completed: 0, desc: 'Third-party software compromised.' },
];

const severityColors: Record<string, string> = {
  Critical: 'bg-red-500/10 text-red-600',
  High: 'bg-orange-500/10 text-orange-600',
  Medium: 'bg-yellow-500/10 text-yellow-600',
};

const CyberIncidentResponsePage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <AlertTriangle className="h-8 w-8 text-destructive" /> Incident Response Trainer
      </h1>
      <p className="text-muted-foreground mt-1">Practice handling security incidents ethically and systematically</p>
    </div>
    <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="p-6">
        <h3 className="font-semibold mb-2">NIST Incident Response Framework</h3>
        <div className="flex gap-2 flex-wrap">
          {['Preparation', 'Detection', 'Containment', 'Eradication', 'Recovery', 'Lessons Learned'].map((p, i) => (
            <Badge key={p} variant="outline" className="text-sm py-1 px-3">{i + 1}. {p}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {scenarios.map(s => (
        <Card key={s.name} className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg">{s.name}</h3>
              <Badge className={severityColors[s.severity]}>{s.severity}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
            <div className="flex items-center gap-4 text-sm mb-3">
              <Badge variant="secondary">{s.phase}</Badge>
              <span className="text-muted-foreground">{s.steps} steps</span>
            </div>
            <Progress value={0} className="h-2 mb-3" />
            <Button className="w-full" size="sm" onClick={() => toast.success(`Starting ${s.name} scenario...`)}>
              <Zap className="h-4 w-4 mr-2" /> Begin Scenario
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default CyberIncidentResponsePage;
