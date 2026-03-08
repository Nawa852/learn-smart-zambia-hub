import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Users, School, BarChart3, ArrowUp, ArrowDown, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const provinces = [
  { name: 'Lusaka', schools: 1845, students: 620000, teachers: 18500, passRate: 78, trend: '+5%', risk: 'low', urbanRural: '72/28' },
  { name: 'Copperbelt', schools: 1654, students: 485000, teachers: 14200, passRate: 75, trend: '+4%', risk: 'low', urbanRural: '65/35' },
  { name: 'Southern', schools: 1423, students: 380000, teachers: 11800, passRate: 71, trend: '+3%', risk: 'medium', urbanRural: '40/60' },
  { name: 'Central', schools: 1256, students: 345000, teachers: 10200, passRate: 69, trend: '+2%', risk: 'medium', urbanRural: '35/65' },
  { name: 'Eastern', schools: 1189, students: 312000, teachers: 9400, passRate: 67, trend: '+3%', risk: 'medium', urbanRural: '30/70' },
  { name: 'Northern', schools: 1098, students: 298000, teachers: 8700, passRate: 65, trend: '+4%', risk: 'high', urbanRural: '25/75' },
  { name: 'Luapula', schools: 987, students: 265000, teachers: 7800, passRate: 63, trend: '+2%', risk: 'high', urbanRural: '22/78' },
  { name: 'Northwestern', schools: 876, students: 234000, teachers: 6900, passRate: 64, trend: '+3%', risk: 'high', urbanRural: '28/72' },
  { name: 'Western', schools: 812, students: 218000, teachers: 6200, passRate: 62, trend: '+1%', risk: 'critical', urbanRural: '20/80' },
  { name: 'Muchinga', schools: 707, students: 178000, teachers: 5100, passRate: 61, trend: '+2%', risk: 'critical', urbanRural: '18/82' },
];

const riskColors: Record<string, string> = {
  low: 'bg-green-500/10 text-green-600 border-green-500/30',
  medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
  high: 'bg-orange-500/10 text-orange-600 border-orange-500/30',
  critical: 'bg-red-500/10 text-red-600 border-red-500/30',
};

const MinistryProvincesPage = () => {
  const [riskFilter, setRiskFilter] = useState('all');
  const filtered = riskFilter === 'all' ? provinces : provinces.filter(p => p.risk === riskFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <MapPin className="h-8 w-8 text-primary" />
            Provincial Data
          </h1>
          <p className="text-muted-foreground mt-1">Detailed education metrics by province</p>
        </div>
        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className="w-44">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by risk" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Provinces</SelectItem>
            <SelectItem value="low">Low Risk</SelectItem>
            <SelectItem value="medium">Medium Risk</SelectItem>
            <SelectItem value="high">High Risk</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((province, i) => (
          <motion.div key={province.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{province.name}</CardTitle>
                  <span className={`text-xs px-2 py-1 rounded-full border ${riskColors[province.risk]}`}>
                    {province.risk}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><School className="h-3 w-3" /> Schools</p>
                    <p className="text-xl font-bold">{province.schools.toLocaleString()}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> Students</p>
                    <p className="text-xl font-bold">{(province.students / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Teachers</p>
                    <p className="text-xl font-bold">{province.teachers.toLocaleString()}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Urban/Rural</p>
                    <p className="text-xl font-bold">{province.urbanRural}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pass Rate</span>
                    <span className="font-medium flex items-center gap-1">
                      {province.passRate}%
                      <span className="text-green-500 text-xs">{province.trend}</span>
                    </span>
                  </div>
                  <Progress value={province.passRate} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MinistryProvincesPage;
