import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, XCircle, School } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const standards = [
  { name: 'Minimum Teacher Qualification', compliance: 88, target: 100, status: 'partial' },
  { name: 'Student-Teacher Ratio (≤40:1)', compliance: 62, target: 100, status: 'low' },
  { name: 'Curriculum Coverage', compliance: 91, target: 95, status: 'good' },
  { name: 'Safety & Sanitation', compliance: 75, target: 100, status: 'partial' },
  { name: 'ICT Integration', compliance: 35, target: 80, status: 'low' },
  { name: 'Inclusive Education', compliance: 48, target: 100, status: 'low' },
  { name: 'Assessment Standards', compliance: 82, target: 90, status: 'partial' },
  { name: 'School Governance', compliance: 70, target: 85, status: 'partial' },
  { name: 'Financial Accountability', compliance: 95, target: 100, status: 'good' },
  { name: 'Environmental Standards', compliance: 55, target: 80, status: 'low' },
];

const statusConfig: Record<string, { icon: any; color: string }> = {
  good: { icon: CheckCircle, color: 'text-green-500' },
  partial: { icon: AlertTriangle, color: 'text-yellow-500' },
  low: { icon: XCircle, color: 'text-red-500' },
};

const MinistryCompliancePage = () => {
  const avgCompliance = Math.round(standards.reduce((a, s) => a + s.compliance, 0) / standards.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-primary" /> Standards Compliance
        </h1>
        <p className="text-muted-foreground mt-1">National education standards compliance monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-primary">{avgCompliance}%</p>
            <p className="text-sm text-muted-foreground">Overall Compliance</p>
          </CardContent>
        </Card>
        {(['good', 'partial', 'low'] as const).map(s => {
          const count = standards.filter(st => st.status === s).length;
          const cfg = statusConfig[s];
          return (
            <Card key={s} className="border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <cfg.icon className={`h-6 w-6 mx-auto mb-1 ${cfg.color}`} />
                <p className="text-3xl font-bold">{count}</p>
                <p className="text-sm text-muted-foreground capitalize">{s}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="space-y-3">
        {standards.map(s => {
          const cfg = statusConfig[s.status];
          const Icon = cfg.icon;
          return (
            <Card key={s.name} className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${cfg.color}`} />
                    <p className="font-semibold">{s.name}</p>
                  </div>
                  <div className="text-right text-sm">
                    <span className="font-bold">{s.compliance}%</span>
                    <span className="text-muted-foreground"> / {s.target}%</span>
                  </div>
                </div>
                <Progress value={s.compliance} className="h-2" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MinistryCompliancePage;
