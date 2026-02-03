import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import {
  FlaskConical,
  Atom,
  Leaf,
  Globe,
  Microscope,
  Beaker,
  Sparkles,
  ArrowRight,
  Brain,
  BookOpen,
  Dna,
  Sun
} from 'lucide-react';

const subjects = [
  { id: 'physics', name: 'Physics', icon: Atom, color: 'from-blue-500 to-cyan-500', topics: ['Mechanics', 'Waves', 'Electricity', 'Magnetism', 'Optics', 'Nuclear Physics'] },
  { id: 'chemistry', name: 'Chemistry', icon: FlaskConical, color: 'from-green-500 to-emerald-500', topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Biochemistry'] },
  { id: 'biology', name: 'Biology', icon: Leaf, color: 'from-green-600 to-lime-500', topics: ['Cell Biology', 'Genetics', 'Ecology', 'Human Biology', 'Plant Biology', 'Evolution'] },
  { id: 'earth_science', name: 'Earth Science', icon: Globe, color: 'from-orange-500 to-yellow-500', topics: ['Geology', 'Meteorology', 'Oceanography', 'Astronomy'] },
];

const AIScienceQuizPage = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [grade, setGrade] = useState('10');
  const [generating, setGenerating] = useState(false);

  const currentSubject = subjects.find(s => s.id === selectedSubject);

  const handleGenerate = async () => {
    if (!selectedSubject) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-background to-cyan-50/50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
          >
            <FlaskConical className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
            AI Science Quiz Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master Physics, Chemistry, Biology and Earth Science with AI-generated quizzes aligned to ECZ curriculum.
          </p>
        </div>

        {/* Subject Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {subjects.map((subject) => (
            <motion.button
              key={subject.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelectedSubject(subject.id);
                setSelectedTopic(null);
              }}
              className={`p-6 rounded-xl border-2 text-center transition-all ${
                selectedSubject === subject.id
                  ? 'border-transparent bg-gradient-to-br ' + subject.color + ' text-white shadow-lg'
                  : 'border-border hover:border-primary/30 bg-card'
              }`}
            >
              <subject.icon className={`w-10 h-10 mx-auto mb-3 ${selectedSubject === subject.id ? 'text-white' : ''}`} />
              <p className="font-semibold">{subject.name}</p>
            </motion.button>
          ))}
        </div>

        {/* Topic Selection */}
        {currentSubject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="mb-6 shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <currentSubject.icon className="w-5 h-5" />
                  {currentSubject.name} Topics
                </CardTitle>
                <CardDescription>Select a specific topic or generate a mixed quiz</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button
                    variant={selectedTopic === null ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTopic(null)}
                  >
                    All Topics (Mixed)
                  </Button>
                  {currentSubject.topics.map((topic) => (
                    <Button
                      key={topic}
                      variant={selectedTopic === topic ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTopic(topic)}
                    >
                      {topic}
                    </Button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Grade Level</label>
                    <Select value={grade} onValueChange={setGrade}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[8, 9, 10, 11, 12].map(g => (
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
                    <label className="text-sm font-medium">Questions</label>
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
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Features */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              Science Quiz Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Microscope, title: 'Lab Simulations', desc: 'Virtual experiment questions' },
                { icon: Dna, title: 'Diagrams', desc: 'Visual identification questions' },
                { icon: Brain, title: 'Concept Maps', desc: 'Connected topic questions' },
                { icon: BookOpen, title: 'ECZ Aligned', desc: 'Curriculum-matched content' },
              ].map((feature, idx) => (
                <div key={idx} className="text-center p-4 bg-muted/50 rounded-lg">
                  <feature.icon className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                  <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-700 hover:to-cyan-600 text-lg px-8 py-6"
            onClick={handleGenerate}
            disabled={!selectedSubject || generating}
          >
            {generating ? (
              'Generating Quiz...'
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Science Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>

          {generating && (
            <div className="mt-4 max-w-md mx-auto">
              <Progress value={70} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                Creating {currentSubject?.name} quiz with diagrams and explanations...
              </p>
            </div>
          )}
        </div>

        {/* Popular Topics */}
        <Card className="mt-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Popular Science Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { topic: 'Periodic Table', subject: 'Chemistry', quizzes: 234 },
                { topic: 'Newton\'s Laws', subject: 'Physics', quizzes: 189 },
                { topic: 'Cell Division', subject: 'Biology', quizzes: 156 },
                { topic: 'Photosynthesis', subject: 'Biology', quizzes: 145 },
                { topic: 'Electricity', subject: 'Physics', quizzes: 198 },
                { topic: 'Chemical Reactions', subject: 'Chemistry', quizzes: 167 },
                { topic: 'Human Body Systems', subject: 'Biology', quizzes: 178 },
                { topic: 'Plate Tectonics', subject: 'Earth Science', quizzes: 89 },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const subject = subjects.find(s => s.name === item.subject);
                    if (subject) {
                      setSelectedSubject(subject.id);
                      setSelectedTopic(item.topic);
                    }
                  }}
                  className="p-3 text-left rounded-lg border hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                >
                  <p className="font-medium text-sm">{item.topic}</p>
                  <p className="text-xs text-muted-foreground">{item.subject} • {item.quizzes} quizzes</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIScienceQuizPage;