import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import {
  Calculator,
  Sigma,
  Triangle,
  Circle,
  Square,
  TrendingUp,
  BarChart3,
  Sparkles,
  CheckCircle,
  XCircle,
  ArrowRight,
  BookOpen,
  Brain
} from 'lucide-react';

const topics = [
  { id: 'algebra', name: 'Algebra', icon: Sigma, description: 'Equations, expressions, and functions' },
  { id: 'geometry', name: 'Geometry', icon: Triangle, description: 'Shapes, angles, and measurements' },
  { id: 'calculus', name: 'Calculus', icon: TrendingUp, description: 'Derivatives, integrals, and limits' },
  { id: 'statistics', name: 'Statistics', icon: BarChart3, description: 'Probability and data analysis' },
  { id: 'trigonometry', name: 'Trigonometry', icon: Circle, description: 'Triangles and circular functions' },
  { id: 'arithmetic', name: 'Arithmetic', icon: Calculator, description: 'Basic operations and number theory' },
];

const AIMathQuizPage = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [grade, setGrade] = useState('10');
  const [customTopic, setCustomTopic] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!selectedTopic && !customTopic) return;
    setGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setGenerating(false);
      // Navigate to quiz
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-background to-indigo-50/50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
          >
            <Calculator className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            AI Math Quiz Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate personalized math quizzes with step-by-step solutions. Perfect for ECZ exam preparation.
          </p>
        </div>

        {/* Topic Selection */}
        <Card className="mb-6 shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              Choose a Topic
            </CardTitle>
            <CardDescription>Select a mathematical topic or enter your own</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {topics.map((topic) => (
                <motion.button
                  key={topic.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedTopic === topic.id
                      ? 'border-purple-600 bg-purple-50 shadow-lg'
                      : 'border-border hover:border-purple-300 hover:bg-muted/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg mb-3 flex items-center justify-center ${
                    selectedTopic === topic.id ? 'bg-purple-600 text-white' : 'bg-muted'
                  }`}>
                    <topic.icon className="w-6 h-6" />
                  </div>
                  <p className="font-semibold mb-1">{topic.name}</p>
                  <p className="text-xs text-muted-foreground">{topic.description}</p>
                </motion.button>
              ))}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or enter custom topic</span>
              </div>
            </div>

            <Input
              className="mt-4"
              placeholder="E.g., Quadratic equations, Pythagorean theorem, Linear programming..."
              value={customTopic}
              onChange={(e) => {
                setCustomTopic(e.target.value);
                if (e.target.value) setSelectedTopic(null);
              }}
            />
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="mb-6 shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Quiz Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Grade Level</label>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[7, 8, 9, 10, 11, 12].map(g => (
                      <SelectItem key={g} value={String(g)}>Grade {g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                    <SelectItem value="ecz_exam">ECZ Exam Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Questions</label>
                <Select defaultValue="10">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 15, 20, 25].map(n => (
                      <SelectItem key={n} value={String(n)}>{n} questions</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                AI Features
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  'Step-by-step solutions',
                  'Formula hints',
                  'Visual diagrams',
                  'Practice mode'
                ].map((feature, idx) => (
                  <Badge key={idx} variant="secondary" className="justify-center py-2">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg px-8 py-6"
            onClick={handleGenerate}
            disabled={(!selectedTopic && !customTopic) || generating}
          >
            {generating ? (
              'Generating Quiz...'
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Math Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>

          {generating && (
            <div className="mt-4 max-w-md mx-auto">
              <Progress value={65} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                AI is creating your personalized math quiz...
              </p>
            </div>
          )}
        </div>

        {/* Recent Quizzes */}
        <Card className="mt-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Recent Math Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { topic: 'Quadratic Equations', score: 85, date: '2 hours ago' },
                { topic: 'Geometry - Circles', score: 72, date: 'Yesterday' },
                { topic: 'Trigonometry Basics', score: 90, date: '3 days ago' },
              ].map((quiz, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">{quiz.topic}</p>
                      <p className="text-xs text-muted-foreground">{quiz.date}</p>
                    </div>
                  </div>
                  <Badge variant={quiz.score >= 80 ? 'default' : quiz.score >= 60 ? 'secondary' : 'destructive'}>
                    {quiz.score}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIMathQuizPage;