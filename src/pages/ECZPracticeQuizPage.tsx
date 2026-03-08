import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Timer, CheckCircle, XCircle, Play, RotateCcw, Trophy, Target, Brain, ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number; // index
  explanation: string;
}

const questionBank: Record<string, Record<string, Question[]>> = {
  Mathematics: {
    '12': [
      { id: 1, question: 'Solve: 2x² - 5x - 3 = 0', options: ['x = 3, x = -½', 'x = -3, x = ½', 'x = 3, x = ½', 'x = -3, x = -½'], correct: 0, explanation: 'Using factoring: (2x + 1)(x - 3) = 0, so x = 3 or x = -½' },
      { id: 2, question: 'What is the derivative of f(x) = 3x³ - 2x + 5?', options: ['9x² - 2', '9x² + 5', '3x² - 2', '6x³ - 2'], correct: 0, explanation: 'Apply power rule: d/dx(3x³) = 9x², d/dx(-2x) = -2, d/dx(5) = 0' },
      { id: 3, question: 'If log₂(x) = 5, what is x?', options: ['10', '25', '32', '64'], correct: 2, explanation: '2⁵ = 32, so x = 32' },
      { id: 4, question: 'Find the area of a triangle with base 8cm and height 5cm.', options: ['40 cm²', '20 cm²', '13 cm²', '25 cm²'], correct: 1, explanation: 'Area = ½ × base × height = ½ × 8 × 5 = 20 cm²' },
      { id: 5, question: 'What is the sum of interior angles of a hexagon?', options: ['540°', '720°', '360°', '900°'], correct: 1, explanation: 'Sum = (n-2) × 180° = (6-2) × 180° = 720°' },
    ],
    '9': [
      { id: 1, question: 'Simplify: 3(2x + 4) - 2(x - 1)', options: ['4x + 14', '4x + 10', '8x + 14', '4x + 12'], correct: 0, explanation: '6x + 12 - 2x + 2 = 4x + 14' },
      { id: 2, question: 'What is 15% of 240?', options: ['36', '24', '48', '30'], correct: 0, explanation: '15/100 × 240 = 36' },
      { id: 3, question: 'Solve: x/3 + 2 = 7', options: ['x = 15', 'x = 12', 'x = 21', 'x = 9'], correct: 0, explanation: 'x/3 = 5, so x = 15' },
      { id: 4, question: 'What is the LCM of 12 and 18?', options: ['36', '6', '72', '24'], correct: 0, explanation: 'LCM(12,18) = 36' },
      { id: 5, question: 'A rectangle has length 12cm and width 5cm. Find the perimeter.', options: ['34 cm', '60 cm', '17 cm', '24 cm'], correct: 0, explanation: 'P = 2(l+w) = 2(12+5) = 34 cm' },
    ],
  },
  Science: {
    '12': [
      { id: 1, question: 'What is the chemical formula for sulfuric acid?', options: ['H₂SO₄', 'HCl', 'HNO₃', 'H₃PO₄'], correct: 0, explanation: 'Sulfuric acid is H₂SO₄' },
      { id: 2, question: 'What is Newton\'s second law of motion?', options: ['F = ma', 'F = mv', 'E = mc²', 'P = IV'], correct: 0, explanation: 'Force equals mass times acceleration' },
      { id: 3, question: 'Which organelle is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'], correct: 1, explanation: 'Mitochondria produce ATP through cellular respiration' },
      { id: 4, question: 'What is the pH of a neutral solution?', options: ['0', '7', '14', '1'], correct: 1, explanation: 'A neutral solution has pH = 7' },
      { id: 5, question: 'What type of bond forms between Na and Cl?', options: ['Covalent', 'Ionic', 'Metallic', 'Hydrogen'], correct: 1, explanation: 'Na donates an electron to Cl, forming an ionic bond' },
    ],
    '9': [
      { id: 1, question: 'What gas do plants absorb during photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], correct: 2, explanation: 'Plants absorb CO₂ and release O₂' },
      { id: 2, question: 'What is the unit of electric current?', options: ['Volt', 'Watt', 'Ampere', 'Ohm'], correct: 2, explanation: 'Electric current is measured in Amperes (A)' },
      { id: 3, question: 'Which planet is closest to the Sun?', options: ['Venus', 'Mars', 'Mercury', 'Earth'], correct: 2, explanation: 'Mercury is the closest planet to the Sun' },
      { id: 4, question: 'What is the boiling point of water at sea level?', options: ['90°C', '100°C', '110°C', '80°C'], correct: 1, explanation: 'Water boils at 100°C (212°F) at sea level' },
      { id: 5, question: 'What type of rock is formed from cooled lava?', options: ['Sedimentary', 'Metamorphic', 'Igneous', 'Limestone'], correct: 2, explanation: 'Igneous rocks form from cooled magma or lava' },
    ],
  },
  English: {
    '12': [
      { id: 1, question: 'Which figure of speech compares two things using "like" or "as"?', options: ['Metaphor', 'Simile', 'Personification', 'Hyperbole'], correct: 1, explanation: 'A simile uses "like" or "as" for comparison' },
      { id: 2, question: 'What is the plural of "criterion"?', options: ['Criterions', 'Criterias', 'Criteria', 'Criterium'], correct: 2, explanation: 'Criteria is the plural of criterion (Greek origin)' },
      { id: 3, question: 'Identify the correct sentence:', options: ['Their going to the park.', 'There going to the park.', 'They\'re going to the park.', 'Theyre going to the park.'], correct: 2, explanation: '"They\'re" is the contraction of "they are"' },
      { id: 4, question: 'What is an antonym of "benevolent"?', options: ['Kind', 'Generous', 'Malevolent', 'Helpful'], correct: 2, explanation: 'Malevolent means wishing evil; opposite of benevolent' },
      { id: 5, question: 'Which literary device gives human qualities to non-human things?', options: ['Alliteration', 'Onomatopoeia', 'Personification', 'Irony'], correct: 2, explanation: 'Personification attributes human characteristics to non-human entities' },
    ],
    '9': [
      { id: 1, question: 'What is a noun?', options: ['An action word', 'A describing word', 'A naming word', 'A joining word'], correct: 2, explanation: 'A noun names a person, place, thing, or idea' },
      { id: 2, question: 'Which is a conjunction?', options: ['Quickly', 'And', 'Beautiful', 'Running'], correct: 1, explanation: '"And" is a conjunction that joins words or clauses' },
      { id: 3, question: 'What type of sentence asks a question?', options: ['Declarative', 'Imperative', 'Interrogative', 'Exclamatory'], correct: 2, explanation: 'An interrogative sentence asks a question' },
      { id: 4, question: 'Choose the correct spelling:', options: ['Recieve', 'Receive', 'Receeve', 'Recive'], correct: 1, explanation: '"Receive" follows the "i before e except after c" rule' },
      { id: 5, question: 'What is the past tense of "go"?', options: ['Goed', 'Gone', 'Went', 'Going'], correct: 2, explanation: '"Went" is the irregular past tense of "go"' },
    ],
  },
};

const ECZPracticeQuizPage = () => {
  const { user } = useAuth();
  const [subject, setSubject] = useState('Mathematics');
  const [grade, setGrade] = useState('12');
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const questions = questionBank[subject]?.[grade] || [];

  useEffect(() => {
    if (started && !finished) {
      intervalRef.current = setInterval(() => setTimer(t => t + 1), 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [started, finished]);

  const startQuiz = () => {
    setStarted(true);
    setCurrentQ(0);
    setScore(0);
    setTimer(0);
    setFinished(false);
    setAnswers([]);
    setSelected(null);
    setAnswered(false);
  };

  const selectAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const isCorrect = idx === questions[currentQ].correct;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(prev => [...prev, idx]);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
      clearInterval(intervalRef.current);
      saveAttempt();
    } else {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const saveAttempt = async () => {
    if (!user) return;
    await supabase.from('quiz_attempts' as any).insert({
      user_id: user.id,
      subject,
      grade_level: grade,
      total_questions: questions.length,
      correct_answers: score + (selected === questions[currentQ]?.correct ? 0 : 0), // score already updated
      time_taken_seconds: timer,
    });
    toast.success('Quiz results saved!');
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  const pct = questions.length > 0 ? (score / questions.length) * 100 : 0;

  if (!started) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto py-8 px-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" /> ECZ Practice Quiz
          </h1>
          <p className="text-sm text-muted-foreground">Test your knowledge with ECZ-style questions</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Set Up Your Quiz</CardTitle>
            <CardDescription>Choose subject and grade level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(questionBank).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Grade</label>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(questionBank[subject] || {}).map(g => <SelectItem key={g} value={g}>Grade {g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">{questions.length} questions · Timed</span>
              <Badge variant="outline"><Timer className="w-3 h-3 mr-1" /> ~{questions.length * 2} min</Badge>
            </div>
            <Button className="w-full" size="lg" onClick={startQuiz} disabled={questions.length === 0}>
              <Play className="w-4 h-4 mr-2" /> Start Quiz
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (finished) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto py-8 px-4 space-y-6">
        <Card className="text-center">
          <CardContent className="py-10 space-y-4">
            <Trophy className={`w-16 h-16 mx-auto ${pct >= 80 ? 'text-yellow-500' : pct >= 50 ? 'text-blue-500' : 'text-muted-foreground'}`} />
            <h2 className="text-2xl font-bold text-foreground">Quiz Complete!</h2>
            <div className="text-4xl font-bold text-primary">{score}/{questions.length}</div>
            <p className="text-muted-foreground">{Math.round(pct)}% · {formatTime(timer)}</p>
            <Badge variant={pct >= 80 ? 'default' : pct >= 50 ? 'secondary' : 'destructive'} className="text-sm">
              {pct >= 80 ? 'Excellent!' : pct >= 50 ? 'Good effort!' : 'Keep practicing!'}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Review Answers</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {questions.map((q, i) => (
              <div key={q.id} className={`p-3 rounded-lg border ${answers[i] === q.correct ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-destructive/30 bg-destructive/5'}`}>
                <div className="flex items-start gap-2">
                  {answers[i] === q.correct ? <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> : <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />}
                  <div>
                    <p className="text-sm font-medium text-foreground">{q.question}</p>
                    <p className="text-xs text-muted-foreground mt-1">{q.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Button className="w-full" onClick={() => setStarted(false)}>
          <RotateCcw className="w-4 h-4 mr-2" /> Try Again
        </Button>
      </motion.div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Badge variant="outline">{subject} · Grade {grade}</Badge>
        <div className="flex items-center gap-3">
          <Badge variant="secondary"><Timer className="w-3 h-3 mr-1" /> {formatTime(timer)}</Badge>
          <Badge variant="outline">{currentQ + 1}/{questions.length}</Badge>
        </div>
      </div>
      <Progress value={((currentQ + 1) / questions.length) * 100} className="h-2" />

      {/* Question */}
      <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">{q.question}</h2>
            <div className="space-y-2">
              {q.options.map((opt, i) => {
                let cls = 'border-border/50 hover:border-primary/40 hover:bg-muted/30';
                if (answered) {
                  if (i === q.correct) cls = 'border-emerald-500 bg-emerald-500/10';
                  else if (i === selected) cls = 'border-destructive bg-destructive/10';
                  else cls = 'border-border/30 opacity-50';
                }
                return (
                  <button
                    key={i}
                    onClick={() => selectAnswer(i)}
                    disabled={answered}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${cls}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-medium shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm text-foreground">{opt}</span>
                      {answered && i === q.correct && <CheckCircle className="w-4 h-4 text-emerald-500 ml-auto shrink-0" />}
                      {answered && i === selected && i !== q.correct && <XCircle className="w-4 h-4 text-destructive ml-auto shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
            {answered && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs font-medium text-muted-foreground mb-0.5">Explanation</p>
                <p className="text-sm text-foreground">{q.explanation}</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {answered && (
        <Button className="w-full" onClick={nextQuestion}>
          {currentQ + 1 >= questions.length ? 'See Results' : 'Next Question'} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
};

export default ECZPracticeQuizPage;
