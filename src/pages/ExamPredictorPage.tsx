import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Zap, Target, TrendingUp, AlertTriangle, CheckCircle2, Loader2, Flame, Clock, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const SUBJECTS = [
  'Mathematics', 'English Language', 'Biology', 'Chemistry', 'Physics',
  'Geography', 'History', 'Civic Education', 'Religious Education',
  'Computer Studies', 'Business Studies', 'Agricultural Science',
  'Social Studies', 'Science', 'Additional Mathematics',
];

const GRADES = ['Grade 7', 'Grade 9', 'Grade 12', 'University Year 1', 'University Year 2'];

const ExamPredictorPage = () => {
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('Grade 12');
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  const predict = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('exam-predictor', {
        body: { subject, grade_level: grade, topics: [], exam_type: 'final' }
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Failed');
      return data;
    },
    onError: (e: any) => toast.error(e.message || 'Could not predict. Try again.'),
  });

  const probColors: Record<string, string> = {
    high: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    low: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  };

  const diffColors: Record<string, string> = {
    easy: 'text-green-600 dark:text-green-400',
    medium: 'text-amber-600 dark:text-amber-400',
    hard: 'text-red-600 dark:text-red-400',
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/15 via-amber-500/10 to-primary/10 p-5">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-foreground tracking-tight">Exam Predictor</h1>
              <p className="text-xs text-muted-foreground">AI predicts your exam questions 🔮</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Our AI analyzes years of ECZ past papers to predict the most likely questions. Study smarter, not harder.
          </p>
        </div>
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-red-500/10 blur-2xl" />
      </div>

      {/* Controls */}
      <Card className="border-border/50 bg-card shadow-card">
        <CardContent className="p-4 space-y-3">
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger className="text-sm h-10"><SelectValue placeholder="Select subject" /></SelectTrigger>
            <SelectContent>
              {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger className="text-sm h-10"><SelectValue /></SelectTrigger>
            <SelectContent>
              {GRADES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button
            onClick={() => predict.mutate()}
            disabled={!subject || predict.isPending}
            className="w-full h-11 font-semibold bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white border-0"
          >
            {predict.isPending ? (
              <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Analyzing Patterns...</>
            ) : (
              <><Zap className="w-4 h-4 mr-2" /> Predict My Exam</>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <AnimatePresence>
        {predict.data && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Confidence */}
            <div className="flex items-center justify-between bg-card rounded-2xl p-4 border border-border/50 shadow-card">
              <div>
                <p className="text-xs text-muted-foreground">AI Confidence</p>
                <p className="text-2xl font-black text-foreground">{predict.data.confidence_score || 0}%</p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>

            {/* Strategy Card */}
            {predict.data.strategy && (
              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-500" /> Exam Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">{predict.data.strategy.time_tips}</p>
                  </div>
                  {predict.data.strategy.exam_hacks?.length > 0 && (
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">💡 Power Hacks:</p>
                      {predict.data.strategy.exam_hacks.map((h: string, i: number) => (
                        <p key={i} className="text-muted-foreground pl-4">• {h}</p>
                      ))}
                    </div>
                  )}
                  {predict.data.strategy.common_mistakes?.length > 0 && (
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-red-500" /> Avoid These Mistakes:
                      </p>
                      {predict.data.strategy.common_mistakes.map((m: string, i: number) => (
                        <p key={i} className="text-muted-foreground pl-4">• {m}</p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Revision Priority */}
            {predict.data.revision_priority?.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {predict.data.revision_priority.map((topic: string, i: number) => (
                  <Badge key={i} variant="outline" className="shrink-0 text-[10px] border-primary/30 bg-primary/5">
                    #{i + 1} {topic}
                  </Badge>
                ))}
              </div>
            )}

            {/* Predicted Questions */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" /> Predicted Questions
              </h2>
              {predict.data.predictions?.map((q: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card
                    className="border-border/50 bg-card shadow-card hover:shadow-card-hover transition-all cursor-pointer"
                    onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-muted-foreground w-5">Q{i + 1}</span>
                          <Badge className={`text-[10px] border ${probColors[q.probability] || probColors.medium}`}>
                            {q.probability === 'high' ? '🔥 Very Likely' : q.probability === 'medium' ? '⚡ Likely' : '💭 Possible'}
                          </Badge>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{q.marks || '?'} marks</span>
                      </div>
                      <p className="text-sm font-medium text-foreground leading-relaxed">{q.question}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-[9px]">{q.topic}</Badge>
                        <span className={`text-[10px] font-medium ${diffColors[q.difficulty] || ''}`}>
                          {q.difficulty?.toUpperCase()}
                        </span>
                      </div>

                      <AnimatePresence>
                        {expandedQ === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 pt-3 border-t border-border/50 space-y-2">
                              <div>
                                <p className="text-[10px] font-semibold text-primary mb-1">KEY CONCEPTS</p>
                                <div className="flex flex-wrap gap-1">
                                  {q.key_concepts?.map((c: string, j: number) => (
                                    <Badge key={j} variant="outline" className="text-[9px]">{c}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-[10px] font-semibold text-green-600 dark:text-green-400 mb-1 flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> MODEL ANSWER OUTLINE
                                </p>
                                <p className="text-xs text-muted-foreground leading-relaxed">{q.answer_outline}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!predict.data && !predict.isPending && (
        <div className="text-center py-10">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Brain className="w-10 h-10 text-primary/40" />
          </div>
          <p className="text-sm font-medium text-foreground">Select a subject to predict your exam</p>
          <p className="text-xs text-muted-foreground mt-1">AI analyzes ECZ patterns to predict likely questions</p>
        </div>
      )}
    </div>
  );
};

export default ExamPredictorPage;
