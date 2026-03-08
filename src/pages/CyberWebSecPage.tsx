import React from 'react';
import { Globe, Shield, Code, Lock, Bug, AlertTriangle, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const modules = [
  { name: 'OWASP Top 10 Overview', topics: ['Injection', 'Broken Auth', 'XSS', 'CSRF'], progress: 0, difficulty: 'Beginner' },
  { name: 'SQL Injection Deep Dive', topics: ['Union-based', 'Blind SQLi', 'Time-based'], progress: 0, difficulty: 'Intermediate' },
  { name: 'Cross-Site Scripting (XSS)', topics: ['Reflected', 'Stored', 'DOM-based'], progress: 0, difficulty: 'Intermediate' },
  { name: 'Authentication Bypass', topics: ['JWT Attacks', 'Session Hijacking', 'Brute Force'], progress: 0, difficulty: 'Advanced' },
  { name: 'Server-Side Request Forgery', topics: ['Internal Scanning', 'Cloud Metadata', 'Protocol Smuggling'], progress: 0, difficulty: 'Advanced' },
  { name: 'API Security Testing', topics: ['REST', 'GraphQL', 'SOAP', 'Rate Limiting'], progress: 0, difficulty: 'Intermediate' },
  { name: 'Web Application Firewalls', topics: ['WAF Bypass', 'Rule Writing', 'Tuning'], progress: 0, difficulty: 'Advanced' },
  { name: 'Secure Code Review', topics: ['Static Analysis', 'Code Patterns', 'Remediation'], progress: 0, difficulty: 'Expert' },
];

const CyberWebSecPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Globe className="h-8 w-8 text-primary" /> Web Application Security
      </h1>
      <p className="text-muted-foreground mt-1">Master web application security testing (OWASP methodology)</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {modules.map(m => (
        <Card key={m.name} className="border-none shadow-md">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold">{m.name}</h3>
              <Badge className={m.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-600' : m.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-600' : m.difficulty === 'Advanced' ? 'bg-orange-500/10 text-orange-600' : 'bg-red-500/10 text-red-600'}>{m.difficulty}</Badge>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {m.topics.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
            </div>
            <Progress value={m.progress} className="h-2 mb-2" />
            <Button className="w-full" size="sm" variant="outline" onClick={() => toast.success('Opening module...')}>
              <Code className="h-4 w-4 mr-2" /> Start Module
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default CyberWebSecPage;
