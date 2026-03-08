import React, { useState } from 'react';
import { Target, CheckCircle, XCircle, Clock, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const assessments = [
  { skill: 'Electrical Basics', questions: 20, duration: '15 min', category: 'Trades' },
  { skill: 'Welding Safety', questions: 15, duration: '10 min', category: 'Trades' },
  { skill: 'Food Safety Standards', questions: 25, duration: '20 min', category: 'Culinary' },
  { skill: 'Basic Plumbing', questions: 15, duration: '12 min', category: 'Trades' },
  { skill: 'Digital Literacy', questions: 30, duration: '25 min', category: 'Digital' },
  { skill: 'Auto Engine Basics', questions: 20, duration: '15 min', category: 'Automotive' },
  { skill: 'Carpentry Measurements', questions: 15, duration: '10 min', category: 'Trades' },
  { skill: 'Agricultural Science', questions: 20, duration: '15 min', category: 'Agriculture' },
  { skill: 'Basic First Aid', questions: 25, duration: '20 min', category: 'Health' },
  { skill: 'Financial Literacy', questions: 20, duration: '15 min', category: 'Business' },
];

const SkillsAssessmentPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Target className="h-8 w-8 text-primary" /> Skills Assessment
      </h1>
      <p className="text-muted-foreground mt-1">Test your knowledge and identify skill gaps</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {assessments.map(a => (
        <Card key={a.skill} className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <h3 className="font-semibold mb-2">{a.skill}</h3>
            <div className="flex gap-2 mb-3">
              <Badge variant="secondary">{a.category}</Badge>
              <Badge variant="outline">{a.questions} questions</Badge>
              <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />{a.duration}</Badge>
            </div>
            <Button className="w-full" size="sm" onClick={() => toast.success('Starting assessment...')}>
              <Brain className="h-4 w-4 mr-2" /> Take Assessment
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default SkillsAssessmentPage;
