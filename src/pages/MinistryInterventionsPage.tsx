import React from 'react';
import { motion } from 'framer-motion';
import { Target, AlertTriangle, Users, MapPin, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const interventions = [
  { area: 'Western Province', issue: 'Lowest national pass rate (62%)', priority: 'critical', students: 218000, progress: 25, actions: ['Deploy 200 additional teachers', 'Establish 15 learning centers', 'Launch remedial math program'] },
  { area: 'Muchinga Province', issue: 'Severe teacher shortage (1:45 ratio)', priority: 'critical', students: 178000, progress: 30, actions: ['Recruit 500 teachers', 'Implement remote teaching program', 'Partner with teacher training colleges'] },
  { area: 'Rural Mathematics', issue: 'Below 60% pass rate in rural areas', priority: 'high', students: 890000, progress: 40, actions: ['Distribute math learning kits', 'Train teachers in modern methods', 'Launch mobile tutoring vans'] },
  { area: 'Grade 7 Transition', issue: 'High dropout risk at Grade 7-8 transition', priority: 'high', students: 120000, progress: 55, actions: ['Establish mentorship programs', 'Provide financial support', 'Create bridge programs'] },
  { area: 'Digital Connectivity', issue: 'Only 45% of schools connected', priority: 'medium', students: 1500000, progress: 45, actions: ['Install solar-powered internet hubs', 'Distribute tablets to rural schools', 'Train teachers in digital tools'] },
  { area: 'School Feeding', issue: 'Malnutrition affecting learning outcomes', priority: 'medium', students: 800000, progress: 75, actions: ['Expand feeding program to 500 more schools', 'Partner with local farmers', 'Monitor nutritional outcomes'] },
];

const priorityConfig: Record<string, { color: string; badge: 'destructive' | 'default' | 'secondary' }> = {
  critical: { color: 'border-l-red-500', badge: 'destructive' },
  high: { color: 'border-l-orange-500', badge: 'default' },
  medium: { color: 'border-l-yellow-500', badge: 'secondary' },
};

const MinistryInterventionsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Target className="h-8 w-8 text-primary" />
          Intervention Manager
        </h1>
        <p className="text-muted-foreground mt-1">Track and manage critical education interventions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-lg bg-red-500/5">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto text-red-500 mb-2" />
            <p className="text-3xl font-bold">{interventions.filter(i => i.priority === 'critical').length}</p>
            <p className="text-sm text-muted-foreground">Critical</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg bg-orange-500/5">
          <CardContent className="p-6 text-center">
            <TrendingDown className="h-8 w-8 mx-auto text-orange-500 mb-2" />
            <p className="text-3xl font-bold">{interventions.filter(i => i.priority === 'high').length}</p>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg bg-blue-500/5">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto text-blue-500 mb-2" />
            <p className="text-3xl font-bold">{(interventions.reduce((a, i) => a + i.students, 0) / 1000000).toFixed(1)}M</p>
            <p className="text-sm text-muted-foreground">Students Affected</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {interventions.map((item, i) => {
          const config = priorityConfig[item.priority] || priorityConfig.medium;
          return (
            <motion.div key={item.area} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className={`border-none shadow-lg border-l-4 ${config.color}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{item.area}</h3>
                        <Badge variant={config.badge}>{item.priority}</Badge>
                      </div>
                      <p className="text-muted-foreground">{item.issue}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {item.students.toLocaleString()} students</span>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Resolution Progress</span>
                          <span className="font-medium">{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                      </div>
                    </div>
                    <div className="md:w-72 bg-muted/30 rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">Planned Actions</p>
                      <ul className="space-y-1">
                        {item.actions.map((action, j) => (
                          <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span> {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MinistryInterventionsPage;
