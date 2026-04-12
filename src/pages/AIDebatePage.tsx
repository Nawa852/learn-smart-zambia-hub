import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Swords, Send, Loader2, Brain, Flame, Target, TrendingUp, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface DebateMessage {
  role: 'user' | 'assistant';
  content: string;
  scores?: {
    argument_score: number;
    logic_score: number;
    evidence_score: number;
    fallacies_detected: string[];
    tip: string;
  } | null;
}

const TOPICS = [
  'Should school uniforms be mandatory?',
  'Is social media beneficial for students?',
  'Should Zambia prioritize mining over agriculture?',
  'Is AI a threat to education?',
  'Should university education be free?',
  'Are exams the best way to measure intelligence?',
  'Should voting be compulsory?',
  'Is climate change the biggest threat to Zambia?',
];

const AIDebatePage = () => {
  const [topic, setTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [stance, setStance] = useState('');
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const debate = useMutation({
    mutationFn: async (userMessage: string) => {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      if (userMessage) history.push({ role: 'user', content: userMessage });

      const { data, error } = await supabase.functions.invoke('ai-debate', {
        body: {
          topic: customTopic || topic,
          subject: 'General',
          stance,
          difficulty,
          history: history.length > 0 ? history : undefined,
        }
      });
      if (error) throw error;
      return data;
    },
    onError: (e: any) => toast.error(e.message || 'Debate error'),
  });

  const startDebate = async () => {
    const finalTopic = customTopic || topic;
    if (!finalTopic) { toast.error('Pick a topic!'); return; }
    setStarted(true);
    setMessages([]);
    const result = await debate.mutateAsync('');
    if (result?.response) {
      setMessages([{ role: 'assistant', content: result.response, scores: result.scores }]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg, scores: null }]);
    const result = await debate.mutateAsync(userMsg);
    if (result?.response) {
      setMessages(prev => [...prev, { role: 'assistant', content: result.response, scores: result.scores }]);
    }
  };

  const latestScores = [...messages].reverse().find(m => m.scores)?.scores;

  if (!started) {
    return (
      <div className="space-y-5 pb-24">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/15 via-pink-500/10 to-primary/10 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-foreground tracking-tight">AI Debate Arena</h1>
              <p className="text-xs text-muted-foreground">Sharpen your thinking with Socratic combat ⚔️</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Debate any topic against a relentless AI. It scores your logic, catches fallacies, and makes you 10x sharper.
          </p>
        </div>

        <Card className="border-border/50 bg-card shadow-card">
          <CardContent className="p-4 space-y-3">
            <p className="text-xs font-semibold text-foreground">Pick a topic or enter your own:</p>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map(t => (
                <Badge
                  key={t}
                  variant={topic === t ? 'default' : 'outline'}
                  className="cursor-pointer text-[10px] transition-all hover:scale-105"
                  onClick={() => { setTopic(t); setCustomTopic(''); }}
                >
                  {t}
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Or type your own topic..."
              value={customTopic}
              onChange={e => { setCustomTopic(e.target.value); setTopic(''); }}
              className="text-sm"
            />
            <Input
              placeholder="Your stance (e.g. 'I believe uniforms should be optional')"
              value={stance}
              onChange={e => setStance(e.target.value)}
              className="text-sm"
            />
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">🟢 Supportive — Gentle pushback</SelectItem>
                <SelectItem value="medium">🟡 Challenging — Firm counter-arguments</SelectItem>
                <SelectItem value="hard">🔴 Merciless — No mercy, full Socratic</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={startDebate}
              disabled={(!topic && !customTopic) || debate.isPending}
              className="w-full h-11 font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white border-0"
            >
              {debate.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Swords className="w-4 h-4 mr-2" />}
              Enter the Arena
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      {/* Score Bar */}
      {latestScores && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2 p-2 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1 bg-card rounded-lg px-2 py-1 border border-border/50 shrink-0">
            <Brain className="w-3 h-3 text-blue-500" />
            <span className="text-[10px] font-bold">{latestScores.argument_score}</span>
          </div>
          <div className="flex items-center gap-1 bg-card rounded-lg px-2 py-1 border border-border/50 shrink-0">
            <Target className="w-3 h-3 text-green-500" />
            <span className="text-[10px] font-bold">{latestScores.logic_score}</span>
          </div>
          <div className="flex items-center gap-1 bg-card rounded-lg px-2 py-1 border border-border/50 shrink-0">
            <TrendingUp className="w-3 h-3 text-amber-500" />
            <span className="text-[10px] font-bold">{latestScores.evidence_score}</span>
          </div>
          {latestScores.fallacies_detected?.length > 0 && (
            <Badge variant="destructive" className="text-[9px] shrink-0">
              ⚠️ {latestScores.fallacies_detected.join(', ')}
            </Badge>
          )}
        </motion.div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-2 space-y-3">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-md'
                  : 'bg-muted text-foreground rounded-bl-md'
              }`}>
                <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                {msg.scores?.tip && (
                  <p className="text-[10px] mt-2 pt-1.5 border-t border-white/10 opacity-80 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {msg.scores.tip}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {debate.isPending && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border/50 bg-card">
        <div className="flex gap-2">
          <Input
            placeholder="Make your argument..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            disabled={debate.isPending}
            className="text-sm"
          />
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={!input.trim() || debate.isPending}
            className="shrink-0 bg-gradient-to-r from-purple-600 to-pink-500"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIDebatePage;
