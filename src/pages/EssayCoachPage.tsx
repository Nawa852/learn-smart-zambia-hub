import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PenTool, CheckCircle2, AlertCircle, ArrowUp, Star, Loader2, Sparkles, BookOpen, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const EssayCoachPage = () => {
  const [essay, setEssay] = useState('');
  const [subject, setSubject] = useState('English Language');
  const [assignmentType, setAssignmentType] = useState('essay');

  const analyze = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('essay-coach', {
        body: { essay, subject, assignment_type: assignmentType, grade_level: 'Grade 12' }
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Analysis failed');
      return data;
    },
    onError: (e: any) => toast.error(e.message || 'Could not analyze. Try again.'),
  });

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  const r = analyze.data;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/10 border-green-500/20';
    if (score >= 60) return 'bg-amber-500/10 border-amber-500/20';
    return 'bg-red-500/10 border-red-500/20';
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-primary/10 p-5">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
              <PenTool className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-foreground tracking-tight">Essay Coach</h1>
              <p className="text-xs text-muted-foreground">AI writing assistant & grader ✍️</p>
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <Card className="border-border/50 bg-card shadow-card">
        <CardContent className="p-4 space-y-3">
          <div className="flex gap-2">
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="text-xs h-8 flex-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {['English Language', 'Civic Education', 'History', 'Religious Education', 'Geography', 'Business Studies'].map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={assignmentType} onValueChange={setAssignmentType}>
              <SelectTrigger className="text-xs h-8 flex-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {['essay', 'report', 'letter', 'speech', 'summary', 'creative writing'].map(t => (
                  <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="relative">
            <Textarea
              placeholder="Paste or type your essay here... (minimum 50 characters)"
              value={essay}
              onChange={e => setEssay(e.target.value)}
              className="min-h-[180px] text-sm pr-16 leading-relaxed"
            />
            <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground bg-card/80 px-2 py-1 rounded-md">
              {wordCount} words
            </div>
          </div>
          <Button
            onClick={() => analyze.mutate()}
            disabled={essay.length < 50 || analyze.isPending}
            className="w-full h-11 font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
          >
            {analyze.isPending ? (
              <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Analyzing Your Writing...</>
            ) : (
              <><Sparkles className="w-4 h-4 mr-2" /> Get AI Feedback</>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <AnimatePresence>
        {r && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Overall Score */}
            <div className="flex items-center gap-4 bg-card rounded-2xl p-4 border border-border/50 shadow-card">
              <div className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center ${getScoreBg(r.overall_score || 0)}`}>
                <span className={`text-2xl font-black ${getScoreColor(r.overall_score || 0)}`}>{r.overall_score || 0}</span>
                <span className="text-[9px] text-muted-foreground">/100</span>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Predicted Grade: <span className="text-primary">{r.grade_prediction || 'N/A'}</span></p>
                <p className="text-xs text-muted-foreground mt-0.5">{r.ecz_tips}</p>
              </div>
            </div>

            {/* Score Breakdown */}
            {r.scores && (
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(r.scores).map(([key, val]: [string, any]) => (
                  <div key={key} className={`rounded-xl p-3 border ${getScoreBg(val.score)}`}>
                    <p className="text-[10px] text-muted-foreground capitalize">{key}</p>
                    <p className={`text-lg font-bold ${getScoreColor(val.score)}`}>{val.score}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Strengths */}
            {r.strengths?.length > 0 && (
              <Card className="border-green-500/20 bg-green-500/5">
                <CardContent className="p-3 space-y-1">
                  <p className="text-xs font-semibold text-green-700 dark:text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Strengths
                  </p>
                  {r.strengths.map((s: string, i: number) => (
                    <p key={i} className="text-xs text-muted-foreground pl-5">✓ {s}</p>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Improvements */}
            {r.improvements?.length > 0 && (
              <Card className="border-amber-500/20 bg-amber-500/5">
                <CardHeader className="pb-2 pt-3 px-3">
                  <CardTitle className="text-xs flex items-center gap-1 text-amber-700 dark:text-amber-400">
                    <ArrowUp className="w-3.5 h-3.5" /> Improvements Needed
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-3 pb-3 space-y-2">
                  {r.improvements.map((imp: any, i: number) => (
                    <div key={i} className="bg-card rounded-lg p-2.5 border border-border/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={imp.priority === 'high' ? 'destructive' : 'secondary'} className="text-[9px]">
                          {imp.priority}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">{imp.location}</span>
                      </div>
                      <p className="text-xs font-medium text-foreground">{imp.issue}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">💡 {imp.suggestion}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Grammar Fixes */}
            {r.grammar_fixes?.length > 0 && (
              <Card className="border-border/50 bg-card shadow-card">
                <CardHeader className="pb-2 pt-3 px-3">
                  <CardTitle className="text-xs flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-red-500" /> Grammar Fixes
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-3 pb-3 space-y-2">
                  {r.grammar_fixes.slice(0, 5).map((fix: any, i: number) => (
                    <div key={i} className="text-xs">
                      <span className="line-through text-red-500/70">{fix.original}</span>
                      <span className="mx-1 text-muted-foreground">→</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">{fix.corrected}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">({fix.rule})</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Vocabulary Upgrades */}
            {r.vocabulary_upgrades?.length > 0 && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-2 pt-3 px-3">
                  <CardTitle className="text-xs flex items-center gap-1 text-primary">
                    <BookOpen className="w-3.5 h-3.5" /> Vocabulary Power-Ups
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-3 pb-3 space-y-1.5">
                  {r.vocabulary_upgrades.map((v: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="text-[9px] shrink-0">{v.basic}</Badge>
                      <span className="text-muted-foreground">→</span>
                      <Badge className="text-[9px] bg-primary/10 text-primary border-0 shrink-0">{v.advanced}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Next Steps */}
            {r.next_steps?.length > 0 && (
              <Card className="border-border/50 bg-card">
                <CardContent className="p-3">
                  <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" /> Next Steps
                  </p>
                  {r.next_steps.map((s: string, i: number) => (
                    <p key={i} className="text-xs text-muted-foreground mb-1">{i + 1}. {s}</p>
                  ))}
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EssayCoachPage;
