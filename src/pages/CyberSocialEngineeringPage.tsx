import React, { useState } from 'react';
import { Users, Shield, AlertTriangle, Mail, Phone, MessageSquare, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const scenarios = [
  { name: 'Phishing Email Detection', type: 'Email', difficulty: 'Easy', desc: 'Identify phishing vs legitimate emails', questions: 10, score: 0 },
  { name: 'Pretexting Call', type: 'Phone', difficulty: 'Medium', desc: 'Recognize social engineering phone calls', questions: 8, score: 0 },
  { name: 'Baiting Attack', type: 'Physical', difficulty: 'Easy', desc: 'Understand USB baiting and physical attacks', questions: 6, score: 0 },
  { name: 'Spear Phishing', type: 'Email', difficulty: 'Hard', desc: 'Detect targeted phishing attempts', questions: 12, score: 0 },
  { name: 'Vishing (Voice Phishing)', type: 'Phone', difficulty: 'Medium', desc: 'Handle suspicious voice communications', questions: 8, score: 0 },
  { name: 'CEO Fraud / BEC', type: 'Email', difficulty: 'Hard', desc: 'Identify business email compromise', questions: 10, score: 0 },
  { name: 'Tailgating Prevention', type: 'Physical', difficulty: 'Easy', desc: 'Physical access control awareness', questions: 5, score: 0 },
  { name: 'Deep Fake Detection', type: 'AI', difficulty: 'Expert', desc: 'Identify AI-generated fake content', questions: 8, score: 0 },
];

const CyberSocialEngineeringPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Users className="h-8 w-8 text-primary" /> Social Engineering Awareness
      </h1>
      <p className="text-muted-foreground mt-1">Learn to recognize and defend against social engineering attacks</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {scenarios.map(s => (
        <Card key={s.name} className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-2">
              <Badge variant="outline" className="flex items-center gap-1">
                {s.type === 'Email' ? <Mail className="h-3 w-3" /> : s.type === 'Phone' ? <Phone className="h-3 w-3" /> : s.type === 'AI' ? <Brain className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
                {s.type}
              </Badge>
              <Badge className={s.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600' : s.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600' : s.difficulty === 'Hard' ? 'bg-orange-500/10 text-orange-600' : 'bg-red-500/10 text-red-600'}>{s.difficulty}</Badge>
            </div>
            <h3 className="font-semibold mb-1">{s.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
            <p className="text-xs text-muted-foreground mb-2">{s.questions} questions</p>
            <Progress value={0} className="h-2 mb-3" />
            <Button className="w-full" size="sm" onClick={() => toast.success('Loading scenario...')}>Start Training</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default CyberSocialEngineeringPage;
