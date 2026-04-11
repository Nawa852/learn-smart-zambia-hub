import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Brain, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

const DAILY_QUESTIONS: QuizQuestion[] = [
  { question: "What is the capital of Zambia?", options: ["Lusaka", "Ndola", "Kitwe", "Livingstone"], correct: 0 },
  { question: "What is 15 × 12?", options: ["160", "180", "170", "150"], correct: 1 },
  { question: "Which element has the symbol 'Fe'?", options: ["Fluorine", "Iron", "Francium", "Fermium"], correct: 1 },
  { question: "The Zambezi River flows into which ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 1 },
  { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"], correct: 2 },
  { question: "Solve: 2x + 5 = 15", options: ["x = 5", "x = 10", "x = 7", "x = 3"], correct: 0 },
  { question: "Who wrote 'Things Fall Apart'?", options: ["Wole Soyinka", "Chinua Achebe", "Ngũgĩ wa Thiong'o", "Chimamanda Adichie"], correct: 1 },
  { question: "What is H₂O commonly known as?", options: ["Hydrogen peroxide", "Water", "Heavy water", "Hydrochloric acid"], correct: 1 },
];

export const QuickQuizWidget = () => {
  const { user } = useAuth();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);

  // Pick 3 random questions
  const [questions] = useState<QuizQuestion[]>(() => {
    const shuffled = [...DAILY_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  });

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === questions[currentQ].correct;
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
      } else {
        setFinished(true);
        if (user && score + (correct ? 1 : 0) >= 2) {
          supabase.rpc('award_xp', { p_user_id: user.id, p_xp: 15, p_coins: 5 });
          toast.success('🎉 +15 XP earned from Daily Quiz!');
        }
      }
    }, 800);
  };

  if (!started) {
    return (
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-500" />
            Daily Quick Quiz
          </h3>
          <Badge variant="outline" className="text-[10px]">+15 XP</Badge>
        </div>
        <p className="text-xs text-muted-foreground mb-3">3 quick questions to keep your mind sharp</p>
        <Button size="sm" className="w-full gap-2" onClick={() => setStarted(true)}>
          Start Quiz <ArrowRight className="w-3 h-3" />
        </Button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="rounded-xl border border-border bg-card p-4 text-center">
        <div className="text-3xl mb-2">{score === 3 ? '🏆' : score >= 2 ? '🎉' : '💪'}</div>
        <p className="text-sm font-semibold text-foreground">{score}/3 Correct</p>
        <p className="text-xs text-muted-foreground mt-1">
          {score === 3 ? 'Perfect score!' : score >= 2 ? 'Great job!' : 'Keep practicing!'}
        </p>
        <Button size="sm" variant="outline" className="mt-3" onClick={() => {
          setStarted(false);
          setCurrentQ(0);
          setSelected(null);
          setScore(0);
          setFinished(false);
        }}>
          Try Again
        </Button>
      </div>
    );
  }

  const q = questions[currentQ];
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
          Q{currentQ + 1} of {questions.length}
        </span>
        <span className="text-xs font-medium text-foreground">{score} pts</span>
      </div>
      <p className="text-sm font-medium text-foreground mb-3">{q.question}</p>
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correct;
          const isSelected = i === selected;
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg border text-sm transition-all",
                selected === null && "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer",
                isSelected && isCorrect && "border-accent bg-accent/10 text-accent",
                isSelected && !isCorrect && "border-destructive bg-destructive/10 text-destructive",
                selected !== null && !isSelected && isCorrect && "border-accent/50 bg-accent/5",
                selected !== null && !isSelected && !isCorrect && "opacity-50"
              )}
            >
              <div className="flex items-center justify-between">
                <span>{opt}</span>
                {selected !== null && isCorrect && <CheckCircle className="w-4 h-4 text-accent" />}
                {isSelected && !isCorrect && <XCircle className="w-4 h-4 text-destructive" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
