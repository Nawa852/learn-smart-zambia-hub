import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, Star, Users, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const feedback = [
  { from: 'Teacher - Lusaka', message: 'The new curriculum guidelines are excellent but need more training support.', rating: 4, category: 'Curriculum', date: '2026-03-05' },
  { from: 'Parent - Copperbelt', message: 'School feeding program has greatly improved my child\'s attendance.', rating: 5, category: 'Welfare', date: '2026-03-04' },
  { from: 'Principal - Eastern', message: 'Urgent need for more teachers in rural areas. Current ratio is unsustainable.', rating: 2, category: 'Staffing', date: '2026-03-03' },
  { from: 'Student - Southern', message: 'The e-learning platform is helpful but internet is unreliable.', rating: 3, category: 'ICT', date: '2026-03-02' },
  { from: 'NGO Partner', message: 'Great collaboration on the scholarship program. More provinces should be included.', rating: 4, category: 'Partnerships', date: '2026-03-01' },
  { from: 'Teacher - Western', message: 'Need lab equipment desperately. Students learning science without practicals.', rating: 1, category: 'Resources', date: '2026-02-28' },
];

const MinistryFeedbackPage = () => {
  const avgRating = (feedback.reduce((a, f) => a + f.rating, 0) / feedback.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <MessageCircle className="h-8 w-8 text-primary" /> Stakeholder Feedback
        </h1>
        <p className="text-muted-foreground mt-1">Collect and analyze feedback from education stakeholders</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <Star className="h-6 w-6 mx-auto text-yellow-500 mb-1" />
          <p className="text-3xl font-bold">{avgRating}/5</p>
          <p className="text-sm text-muted-foreground">Avg Rating</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <p className="text-3xl font-bold">{feedback.length}</p>
          <p className="text-sm text-muted-foreground">Total Feedback</p>
        </CardContent></Card>
        <Card className="border-none shadow-lg"><CardContent className="p-6 text-center">
          <p className="text-3xl font-bold text-green-500">{feedback.filter(f => f.rating >= 4).length}</p>
          <p className="text-sm text-muted-foreground">Positive</p>
        </CardContent></Card>
      </div>
      <div className="space-y-3">
        {feedback.map((f, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold">{f.from}</p>
                  <p className="text-xs text-muted-foreground">{f.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{f.category}</Badge>
                  <div className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} className={`h-3 w-3 ${i < f.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />)}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{f.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MinistryFeedbackPage;
