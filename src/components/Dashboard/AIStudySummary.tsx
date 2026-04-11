import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const AIStudySummary = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');

  const quickPrompts = [
    { label: '📐 Explain Pythagoras', query: 'Explain the Pythagorean theorem with examples' },
    { label: '🧪 Cell Division', query: 'Summarize the process of mitosis and meiosis' },
    { label: '📝 Essay Tips', query: 'Give me tips for writing a good argumentative essay' },
    { label: '🔢 Algebra Help', query: 'Explain how to solve quadratic equations' },
  ];

  const handleAsk = (q: string) => {
    navigate(`/ai?tab=chat&q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border/50 flex items-center gap-2">
        <Brain className="w-4 h-4 text-purple-500" />
        <h3 className="text-sm font-semibold text-foreground">AI Study Helper</h3>
        <Sparkles className="w-3 h-3 text-amber-500 ml-auto" />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything about your studies..."
            className="min-h-[60px] text-sm resize-none"
            rows={2}
          />
        </div>
        <Button
          size="sm"
          className="w-full gap-2"
          disabled={!prompt.trim()}
          onClick={() => handleAsk(prompt)}
        >
          <Brain className="w-3.5 h-3.5" />
          Ask AI
          <ArrowRight className="w-3 h-3" />
        </Button>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map(qp => (
            <button
              key={qp.label}
              onClick={() => handleAsk(qp.query)}
              className="px-2.5 py-1 rounded-md bg-muted/50 text-[11px] text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              {qp.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
