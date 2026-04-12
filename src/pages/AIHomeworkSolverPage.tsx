import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Calculator, Loader2, Lightbulb, AlertTriangle, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SUBJECTS = ['Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology', 'English', 'Geography', 'Commerce', 'Computer Studies'];

const AIHomeworkSolverPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [gradeLevel, setGradeLevel] = useState('12');
  const [result, setResult] = useState<any>(null);

  const solve = async () => {
    if (!user) return toast({ title: 'Please sign in', variant: 'destructive' });
    if (question.trim().length < 5) return toast({ title: 'Enter a complete question', variant: 'destructive' });
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('ai-homework-solver', {
        body: { question, subject, grade_level: gradeLevel }
      });
      if (error) throw error;
      setResult(data);
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const difficultyColor = (d: string) => {
    if (d === 'easy') return 'bg-green-500/10 text-green-600 dark:text-green-400';
    if (d === 'hard') return 'bg-red-500/10 text-red-600 dark:text-red-400';
    return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card className="border-primary/20 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Calculator className="w-5 h-5 text-primary" />
            AI Homework Solver
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Type or paste your homework question here...&#10;&#10;Example: Solve the quadratic equation 2x² + 5x - 3 = 0"
            rows={4}
            className="bg-background text-foreground resize-none"
          />
          <div className="grid grid-cols-2 gap-3">
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
              <SelectContent>
                {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={gradeLevel} onValueChange={setGradeLevel}>
              <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
              <SelectContent>
                {['7', '8', '9', '10', '11', '12'].map(g => <SelectItem key={g} value={g}>Grade {g}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={solve} disabled={loading} className="w-full" size="lg">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Solving...</> : <><Lightbulb className="w-4 h-4 mr-2" /> Solve Step by Step</>}
          </Button>
        </CardContent>
      </Card>

      {/* Solution */}
      {result?.solution && (
        <div className="space-y-4">
          {/* Header */}
          <Card className="bg-card border-primary/10">
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{result.solution.subject_area}</Badge>
                  <Badge className={difficultyColor(result.solution.difficulty)}>{result.solution.difficulty}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Concept: {result.solution.concept}</p>
              </div>
            </CardContent>
          </Card>

          {/* Steps */}
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-foreground">Step-by-Step Solution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.solution.steps?.map((step: any) => (
                <div key={step.step_number} className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                      {step.step_number}
                    </span>
                    <span className="font-medium text-sm text-foreground">{step.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-8">{step.explanation}</p>
                  {step.math_expression && (
                    <div className="ml-8 mt-2 p-2 bg-primary/5 rounded font-mono text-sm text-primary border border-primary/10">
                      {step.math_expression}
                    </div>
                  )}
                  {step.tip && (
                    <p className="ml-8 mt-1 text-xs text-primary/80 flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" /> {step.tip}
                    </p>
                  )}
                </div>
              ))}

              {/* Final Answer */}
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-bold text-foreground">Final Answer</span>
                </div>
                <p className="text-foreground ml-7">{result.solution.final_answer}</p>
              </div>
            </CardContent>
          </Card>

          {/* Common Mistakes */}
          {result.common_mistakes?.length > 0 && (
            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-foreground">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" /> Common Mistakes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {result.common_mistakes.map((m: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-yellow-500 mt-0.5">⚠</span> {m}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Practice */}
          {result.similar_questions?.length > 0 && (
            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-foreground">
                  <BookOpen className="w-4 h-4 text-primary" /> Practice Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.similar_questions.map((q: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2 p-2 rounded bg-muted/30">
                      <ArrowRight className="w-3 h-3 text-primary mt-1 shrink-0" /> {q}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {result.ecz_relevance && (
            <Card className="bg-card border-primary/10">
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">ECZ Relevance:</span> {result.ecz_relevance}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default AIHomeworkSolverPage;
