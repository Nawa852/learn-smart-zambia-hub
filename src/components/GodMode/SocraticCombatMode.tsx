import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Swords, Send, Brain, Shield, Zap, Trophy, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DebateMessage {
  id: number;
  role: 'user' | 'ai';
  content: string;
  type?: 'challenge' | 'approval' | 'question';
}

export const SocraticCombatMode = () => {
  const [topic, setTopic] = useState('The Earth revolves around the Sun');
  const [userArgument, setUserArgument] = useState('');
  const [messages, setMessages] = useState<DebateMessage[]>([
    {
      id: 1,
      role: 'ai',
      content: "I challenge you to defend this position: 'The Earth revolves around the Sun.' Convince me with solid reasoning. I will attack every weakness in your argument.",
      type: 'challenge',
    },
  ]);
  const [defenseStrength, setDefenseStrength] = useState(0);
  const [isThinking, setIsThinking] = useState(false);

  const aiResponses = [
    { content: "Interesting, but how do you explain the apparent motion of the sun across our sky? Doesn't it LOOK like the sun moves around us?", type: 'challenge' as const },
    { content: "You mention gravity, but couldn't it also work the other way? What evidence proves the sun doesn't orbit Earth?", type: 'challenge' as const },
    { content: "That's a stronger point. The parallax effect is indeed observable. But can you explain WHY larger mass creates the center of orbit?", type: 'question' as const },
    { content: "Excellent reasoning! You've successfully defended your position with logical arguments. Your understanding is verified.", type: 'approval' as const },
  ];

  const submitArgument = () => {
    if (!userArgument.trim()) return;

    const newUserMessage: DebateMessage = {
      id: messages.length + 1,
      role: 'user',
      content: userArgument,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setUserArgument('');
    setIsThinking(true);

    setTimeout(() => {
      const responseIndex = Math.min(Math.floor(defenseStrength / 25), aiResponses.length - 1);
      const aiResponse = aiResponses[responseIndex];
      
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          role: 'ai',
          content: aiResponse.content,
          type: aiResponse.type,
        },
      ]);
      
      setDefenseStrength((prev) => Math.min(100, prev + 25));
      setIsThinking(false);
    }, 2000);
  };

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-rose-500/10 via-red-500/10 to-orange-500/10">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-red-600">
            <Swords className="w-6 h-6 text-white" />
          </div>
          Socratic Combat Mode
          <Badge className="ml-auto bg-gradient-to-r from-rose-500 to-red-500 text-white">
            <Zap className="w-3 h-3 mr-1" />
            AI Debate
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Topic Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-semibold">Defend This Position:</span>
          </div>
          <p className="text-lg font-bold">{topic}</p>
        </div>

        {/* Defense Strength Meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Defense Strength
            </span>
            <span className="text-sm font-bold">{defenseStrength}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${defenseStrength}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {defenseStrength < 50 && "The AI is winning. Strengthen your arguments!"}
            {defenseStrength >= 50 && defenseStrength < 100 && "Good progress! Keep defending your position."}
            {defenseStrength >= 100 && "Victory! You've convinced the AI."}
          </p>
        </div>

        {/* Chat Area */}
        <div className="h-64 overflow-y-auto space-y-3 p-4 rounded-xl bg-muted/30 border border-border/50">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : message.type === 'approval'
                      ? 'bg-emerald-500/10 border border-emerald-500/30'
                      : message.type === 'challenge'
                      ? 'bg-rose-500/10 border border-rose-500/30'
                      : 'bg-card border border-border/50'
                  }`}
                >
                  {message.role === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      {message.type === 'challenge' && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                      {message.type === 'approval' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {message.type === 'question' && <Brain className="w-4 h-4 text-amber-500" />}
                      <span className="text-xs font-semibold">
                        {message.type === 'challenge' && 'Challenge'}
                        {message.type === 'approval' && 'Approved!'}
                        {message.type === 'question' && 'Probing Question'}
                      </span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>
              </motion.div>
            ))}
            {isThinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-card border border-border/50 p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="text-xs text-muted-foreground ml-2">AI analyzing your argument...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <Textarea
            placeholder="Defend your position... The AI will attack weaknesses in your reasoning."
            value={userArgument}
            onChange={(e) => setUserArgument(e.target.value)}
            className="min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitArgument();
              }
            }}
          />
          <Button
            className="h-auto bg-gradient-to-r from-rose-500 to-red-500"
            onClick={submitArgument}
            disabled={isThinking || !userArgument.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>

        {defenseStrength >= 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-center"
          >
            <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <h3 className="font-bold">Debate Won!</h3>
            <p className="text-sm text-muted-foreground">You've successfully defended your position with solid reasoning.</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
