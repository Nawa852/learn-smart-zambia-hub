import React from 'react';
import { DollarSign, TrendingUp, PiggyBank, Calculator, BookOpen, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const modules = [
  { name: 'Budgeting Basics', topics: ['Income tracking', 'Expense categories', 'Savings goals'], progress: 0 },
  { name: 'Saving & Investing', topics: ['Emergency fund', 'Compound interest', 'Investment types'], progress: 0 },
  { name: 'Banking & Mobile Money', topics: ['Bank accounts', 'Mobile money', 'Digital payments'], progress: 0 },
  { name: 'Debt Management', topics: ['Good vs bad debt', 'Repayment strategies', 'Credit scores'], progress: 0 },
  { name: 'Business Finance', topics: ['Pricing strategies', 'Cash flow', 'Record keeping'], progress: 0 },
  { name: 'Insurance & Protection', topics: ['Health insurance', 'Business insurance', 'Risk management'], progress: 0 },
  { name: 'Tax Basics', topics: ['Income tax', 'Business tax', 'Filing returns'], progress: 0 },
  { name: 'Retirement Planning', topics: ['NAPSA', 'Pension funds', 'Long-term savings'], progress: 0 },
];

const SkillsFinancialLiteracyPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <DollarSign className="h-8 w-8 text-primary" /> Financial Literacy
      </h1>
      <p className="text-muted-foreground mt-1">Master personal and business financial management</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {modules.map(m => (
        <Card key={m.name} className="border-none shadow-md">
          <CardContent className="p-5">
            <h3 className="font-semibold mb-2">{m.name}</h3>
            <div className="flex flex-wrap gap-1 mb-3">
              {m.topics.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
            </div>
            <Progress value={0} className="h-2 mb-3" />
            <Button className="w-full" size="sm" variant="outline" onClick={() => toast.success('Module started!')}>
              <BookOpen className="h-4 w-4 mr-2" /> Start Learning
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default SkillsFinancialLiteracyPage;
