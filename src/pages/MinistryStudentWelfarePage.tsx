import React from 'react';
import { Heart, Utensils, Shield, Brain, Users, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const programs = [
  { name: 'School Feeding Program', icon: Utensils, beneficiaries: 1200000, target: 2000000, budget: 'K45M' },
  { name: 'Mental Health Support', icon: Brain, beneficiaries: 85000, target: 500000, budget: 'K8M' },
  { name: 'Anti-Bullying Initiative', icon: Shield, beneficiaries: 320000, target: 500000, budget: 'K3M' },
  { name: 'Health Screenings', icon: Activity, beneficiaries: 450000, target: 1000000, budget: 'K12M' },
  { name: 'Orphan Support', icon: Heart, beneficiaries: 180000, target: 250000, budget: 'K15M' },
  { name: 'Peer Counseling Networks', icon: Users, beneficiaries: 95000, target: 300000, budget: 'K2M' },
];

const MinistryStudentWelfarePage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Heart className="h-8 w-8 text-red-500" /> Student Welfare
      </h1>
      <p className="text-muted-foreground mt-1">Student welfare and support programs</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {programs.map(p => {
        const pct = (p.beneficiaries / p.target) * 100;
        return (
          <Card key={p.name} className="border-none shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <p.icon className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">Budget: {p.budget}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>{p.beneficiaries.toLocaleString()} beneficiaries</span>
                <span>{pct.toFixed(0)}%</span>
              </div>
              <Progress value={pct} className="h-2" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
);

export default MinistryStudentWelfarePage;
