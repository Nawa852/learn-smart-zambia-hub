import React, { useState } from 'react';
import { Target, CheckCircle, XCircle, Clock, Brain, RotateCcw, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { toast } from 'sonner';

interface Question {
  q: string;
  options: string[];
  correct: number;
}

interface Assessment {
  skill: string;
  category: string;
  duration: string;
  questions: Question[];
}

const ASSESSMENTS: Assessment[] = [
  {
    skill: 'Electrical Basics', category: 'Trades', duration: '10 min',
    questions: [
      { q: 'What unit is used to measure electrical resistance?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correct: 2 },
      { q: 'Which wire colour is commonly used for earth/ground in Zambia?', options: ['Red', 'Blue', 'Green/Yellow', 'Black'], correct: 2 },
      { q: 'What device protects circuits from overcurrent?', options: ['Resistor', 'Capacitor', 'Fuse/Circuit Breaker', 'Transformer'], correct: 2 },
      { q: 'Ohm\'s Law states that V = ?', options: ['I × R', 'I / R', 'R / I', 'I + R'], correct: 0 },
      { q: 'AC stands for:', options: ['Active Current', 'Alternating Current', 'Automatic Circuit', 'Applied Charge'], correct: 1 },
    ],
  },
  {
    skill: 'Digital Literacy', category: 'Digital', duration: '10 min',
    questions: [
      { q: 'What does URL stand for?', options: ['Uniform Resource Locator', 'Universal Reference Link', 'United Resource Language', 'User Request Line'], correct: 0 },
      { q: 'Which is a spreadsheet application?', options: ['PowerPoint', 'Word', 'Excel', 'Access'], correct: 2 },
      { q: 'What is phishing?', options: ['A type of fishing', 'Fraudulent email to steal data', 'Software update', 'Network configuration'], correct: 1 },
      { q: 'RAM stands for:', options: ['Read Access Memory', 'Random Access Memory', 'Rapid Action Module', 'Remote Access Machine'], correct: 1 },
      { q: 'Which protocol secures web traffic?', options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'], correct: 2 },
    ],
  },
  {
    skill: 'Welding Safety', category: 'Trades', duration: '8 min',
    questions: [
      { q: 'What shade of lens is recommended for arc welding?', options: ['Shade 3', 'Shade 8', 'Shade 10-14', 'No lens needed'], correct: 2 },
      { q: 'What type of gloves should a welder wear?', options: ['Rubber', 'Leather', 'Cotton', 'Latex'], correct: 1 },
      { q: 'MIG welding uses which shielding?', options: ['Flux', 'Gas', 'Water', 'None'], correct: 1 },
      { q: 'Welding fumes can cause:', options: ['Improved breathing', 'Respiratory illness', 'Better vision', 'Stronger bones'], correct: 1 },
      { q: 'What should be checked before welding?', options: ['Weather forecast', 'Ventilation and fire hazards', 'Internet connection', 'Paint colour'], correct: 1 },
    ],
  },
  {
    skill: 'Financial Literacy', category: 'Business', duration: '10 min',
    questions: [
      { q: 'What is a budget?', options: ['A type of bank', 'A plan for spending money', 'A tax form', 'A loan agreement'], correct: 1 },
      { q: 'Compound interest means:', options: ['Interest on principal only', 'Interest on principal + past interest', 'No interest', 'Flat rate'], correct: 1 },
      { q: 'What is an emergency fund?', options: ['Money for vacations', 'Savings for unexpected expenses', 'Investment account', 'Business loan'], correct: 1 },
      { q: 'GDP stands for:', options: ['General Domestic Price', 'Gross Domestic Product', 'Government Deposit Program', 'Global Development Plan'], correct: 1 },
      { q: 'Diversification in investing means:', options: ['Putting all money in one stock', 'Spreading investments across types', 'Saving cash only', 'Borrowing more'], correct: 1 },
    ],
  },
];

const SkillsAssessmentQuizPage = () => {
  const { user } = useAuth();
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState(0);

  const startAssessment = (a: Assessment) => {
    setActiveAssessment(a);
    setCurrentQ(0);
    setAnswers(new Array(a.questions.length).fill(null));
    setSelected('');
    setShowResults(false);
    setStartTime(Date.now());
  };

  const submitAnswer = () => {
    if (selected === '') return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = parseInt(selected);
    setAnswers(newAnswers);

    if (currentQ < activeAssessment!.questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected('');
    } else {
      setShowResults(true);
      const correct = newAnswers.filter((a, i) => a === activeAssessment!.questions[i].correct).length;
      // Save to quiz_attempts
      if (user) {
        supabase.from('quiz_attempts').insert({
          user_id: user.id,
          subject: activeAssessment!.skill,
          grade_level: activeAssessment!.category,
          total_questions: activeAssessment!.questions.length,
          correct_answers: correct,
          time_taken_seconds: Math.round((Date.now() - startTime) / 1000),
        }).then(() => {});
      }
    }
  };

  const correctCount = answers.filter((a, i) => activeAssessment && a === activeAssessment.questions[i].correct).length;
  const percentage = activeAssessment ? Math.round((correctCount / activeAssessment.questions.length) * 100) : 0;

  if (showResults && activeAssessment) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-8 text-center space-y-4">
            {percentage >= 70 ? (
              <Award className="h-16 w-16 mx-auto text-yellow-500" />
            ) : (
              <Target className="h-16 w-16 mx-auto text-muted-foreground" />
            )}
            <h2 className="text-2xl font-bold">{activeAssessment.skill} Results</h2>
            <div className="text-5xl font-bold text-primary">{percentage}%</div>
            <p className="text-muted-foreground">{correctCount} / {activeAssessment.questions.length} correct</p>
            <Progress value={percentage} className="h-3" />
            {percentage >= 70 ? (
              <Badge className="bg-green-500/10 text-green-600 border-green-500/30">Passed ✓</Badge>
            ) : (
              <Badge variant="destructive">Needs Improvement</Badge>
            )}
          </CardContent>
        </Card>

        {/* Review answers */}
        <div className="space-y-3">
          {activeAssessment.questions.map((q, i) => (
            <Card key={i} className={answers[i] === q.correct ? 'border-green-500/30' : 'border-red-500/30'}>
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  {answers[i] === q.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium text-sm">{q.q}</p>
                    <p className="text-xs text-green-600 mt-1">Correct: {q.options[q.correct]}</p>
                    {answers[i] !== q.correct && (
                      <p className="text-xs text-red-500">Your answer: {q.options[answers[i]!]}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => startAssessment(activeAssessment)}>
            <RotateCcw className="h-4 w-4 mr-2" /> Retry
          </Button>
          <Button className="flex-1" onClick={() => { setActiveAssessment(null); setShowResults(false); }}>
            Back to Assessments
          </Button>
        </div>
      </div>
    );
  }

  if (activeAssessment) {
    const q = activeAssessment.questions[currentQ];
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{activeAssessment.skill}</h2>
          <Badge variant="outline">Q {currentQ + 1} / {activeAssessment.questions.length}</Badge>
        </div>
        <Progress value={((currentQ + 1) / activeAssessment.questions.length) * 100} className="h-2" />

        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-medium">{q.q}</h3>
            <RadioGroup value={selected} onValueChange={setSelected}>
              {q.options.map((opt, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={i.toString()} id={`opt-${i}`} />
                  <Label htmlFor={`opt-${i}`} className="flex-1 cursor-pointer">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => { setActiveAssessment(null); }}>Cancel</Button>
          <Button className="flex-1" onClick={submitAnswer} disabled={selected === ''}>
            {currentQ < activeAssessment.questions.length - 1 ? 'Next Question' : 'Finish Assessment'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Target className="h-8 w-8 text-primary" /> Skills Assessment
        </h1>
        <p className="text-muted-foreground mt-1">Test your knowledge and identify skill gaps</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ASSESSMENTS.map(a => (
          <Card key={a.skill} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-2">{a.skill}</h3>
              <div className="flex gap-2 mb-3 flex-wrap">
                <Badge variant="secondary">{a.category}</Badge>
                <Badge variant="outline">{a.questions.length} questions</Badge>
                <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />{a.duration}</Badge>
              </div>
              <Button className="w-full" size="sm" onClick={() => startAssessment(a)}>
                <Brain className="h-4 w-4 mr-2" /> Take Assessment
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkillsAssessmentQuizPage;
