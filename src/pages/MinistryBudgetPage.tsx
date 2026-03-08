import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, PieChart, Download, Plus, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const budgetItems = [
  { category: 'Teacher Salaries', allocated: 4500000, spent: 3800000, province: 'National' },
  { category: 'Infrastructure', allocated: 2000000, spent: 1200000, province: 'National' },
  { category: 'Learning Materials', allocated: 800000, spent: 650000, province: 'National' },
  { category: 'ICT Equipment', allocated: 600000, spent: 420000, province: 'Lusaka' },
  { category: 'School Feeding', allocated: 500000, spent: 480000, province: 'Northern' },
  { category: 'Teacher Training', allocated: 350000, spent: 210000, province: 'National' },
  { category: 'Scholarships', allocated: 300000, spent: 275000, province: 'National' },
  { category: 'Transport', allocated: 250000, spent: 180000, province: 'Western' },
  { category: 'Special Needs', allocated: 200000, spent: 95000, province: 'National' },
  { category: 'Research', allocated: 150000, spent: 60000, province: 'National' },
];

const MinistryBudgetPage = () => {
  const [filter, setFilter] = useState('all');
  const totalAllocated = budgetItems.reduce((a, b) => a + b.allocated, 0);
  const totalSpent = budgetItems.reduce((a, b) => a + b.spent, 0);
  const filtered = filter === 'all' ? budgetItems : budgetItems.filter(b => b.province === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <DollarSign className="h-8 w-8 text-primary" /> Budget Allocation
          </h1>
          <p className="text-muted-foreground mt-1">Track and manage national education budget</p>
        </div>
        <div className="flex gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {['National', 'Lusaka', 'Northern', 'Western'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => toast.success('Budget report exported')}><Download className="h-4 w-4 mr-1" /> Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Total Allocated</p>
            <p className="text-3xl font-bold text-primary">K{(totalAllocated / 1000000).toFixed(1)}M</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="text-3xl font-bold">K{(totalSpent / 1000000).toFixed(1)}M</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Utilization Rate</p>
            <p className="text-3xl font-bold text-green-600">{((totalSpent / totalAllocated) * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {filtered.map((item, i) => {
          const pct = (item.spent / item.allocated) * 100;
          return (
            <motion.div key={item.category} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border-none shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold">{item.category}</p>
                      <Badge variant="secondary" className="text-xs">{item.province}</Badge>
                    </div>
                    <div className="text-right text-sm">
                      <p>K{item.spent.toLocaleString()} / K{item.allocated.toLocaleString()}</p>
                      <p className={`text-xs ${pct > 90 ? 'text-red-500' : pct > 70 ? 'text-yellow-500' : 'text-green-500'}`}>{pct.toFixed(0)}% used</p>
                    </div>
                  </div>
                  <Progress value={pct} className="h-2" />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MinistryBudgetPage;
