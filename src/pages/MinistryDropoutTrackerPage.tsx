import React, { useState } from 'react';
import { AlertTriangle, TrendingDown, Users, MapPin, School, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const dropoutData = [
  { province: 'Western', rate: 18.5, total: 12400, reasons: ['Distance', 'Early marriage', 'Poverty'], trend: 'rising' },
  { province: 'Muchinga', rate: 16.2, total: 8900, reasons: ['Poverty', 'Child labor', 'Distance'], trend: 'stable' },
  { province: 'Northern', rate: 14.8, total: 10200, reasons: ['Early marriage', 'Lack of schools'], trend: 'falling' },
  { province: 'Luapula', rate: 13.5, total: 7800, reasons: ['Fishing season', 'Poverty'], trend: 'rising' },
  { province: 'Eastern', rate: 12.1, total: 9100, reasons: ['Child labor', 'Distance'], trend: 'falling' },
  { province: 'Northwestern', rate: 11.8, total: 6200, reasons: ['Mining employment', 'Distance'], trend: 'stable' },
  { province: 'Central', rate: 9.4, total: 7500, reasons: ['Poverty', 'Transport'], trend: 'falling' },
  { province: 'Southern', rate: 8.7, total: 6800, reasons: ['Drought impact', 'Poverty'], trend: 'falling' },
  { province: 'Copperbelt', rate: 6.2, total: 5400, reasons: ['Urban migration', 'Teen pregnancy'], trend: 'stable' },
  { province: 'Lusaka', rate: 4.8, total: 4200, reasons: ['Economic factors'], trend: 'falling' },
];

const MinistryDropoutTrackerPage = () => {
  const [gradeFilter, setGradeFilter] = useState('all');
  const totalDropouts = dropoutData.reduce((a, d) => a + d.total, 0);
  const avgRate = (dropoutData.reduce((a, d) => a + d.rate, 0) / dropoutData.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-destructive" /> Dropout Tracker
          </h1>
          <p className="text-muted-foreground mt-1">Monitor and address student dropout rates nationally</p>
        </div>
        <Select value={gradeFilter} onValueChange={setGradeFilter}>
          <SelectTrigger className="w-40"><Filter className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            <SelectItem value="primary">Primary</SelectItem>
            <SelectItem value="secondary">Secondary</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-lg bg-gradient-to-br from-red-500/10 to-red-500/5">
          <CardContent className="p-6 text-center">
            <TrendingDown className="h-8 w-8 mx-auto text-red-500 mb-2" />
            <p className="text-3xl font-bold text-red-500">{totalDropouts.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Dropouts (2025)</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold">{avgRate}%</p>
            <p className="text-sm text-muted-foreground">National Average Rate</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-green-500">{dropoutData.filter(d => d.trend === 'falling').length}</p>
            <p className="text-sm text-muted-foreground">Provinces Improving</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {dropoutData.map((d, i) => (
          <Card key={d.province} className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">{d.province}</p>
                    <div className="flex gap-1 mt-1">{d.reasons.map(r => <Badge key={r} variant="outline" className="text-xs">{r}</Badge>)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <div>
                    <p className="font-bold text-lg">{d.rate}%</p>
                    <p className="text-xs text-muted-foreground">{d.total.toLocaleString()} students</p>
                  </div>
                  <Badge className={d.trend === 'falling' ? 'bg-green-500/10 text-green-600' : d.trend === 'rising' ? 'bg-red-500/10 text-red-600' : 'bg-yellow-500/10 text-yellow-600'}>
                    {d.trend === 'falling' ? '↓' : d.trend === 'rising' ? '↑' : '→'} {d.trend}
                  </Badge>
                </div>
              </div>
              <Progress value={d.rate} max={20} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MinistryDropoutTrackerPage;
