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
  Languages,
  BookOpen,
  Volume2,
  Sparkles,
  ArrowRight,
  Brain,
  Target,
  Globe,
  BookMarked,
  Mic,
  MessageSquare
} from 'lucide-react';

const languages = [
  { id: 'english', name: 'English', flag: '🇬🇧' },
  { id: 'bemba', name: 'Bemba', flag: '🇿🇲' },
  { id: 'nyanja', name: 'Nyanja', flag: '🇿🇲' },
  { id: 'tonga', name: 'Tonga', flag: '🇿🇲' },
  { id: 'lozi', name: 'Lozi', flag: '🇿🇲' },
  { id: 'french', name: 'French', flag: '🇫🇷' },
];

const categories = [
  { id: 'academic', name: 'Academic', desc: 'School subjects vocabulary' },
  { id: 'everyday', name: 'Everyday', desc: 'Common words and phrases' },
  { id: 'professional', name: 'Professional', desc: 'Business and career terms' },
  { id: 'exam_prep', name: 'ECZ Exam Prep', desc: 'Exam-focused vocabulary' },
];

const AIVocabularyQuizPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customTopic, setCustomTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-background to-indigo-50/50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
          >
            <Languages className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            AI Vocabulary Quiz Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Build your vocabulary with AI-powered quizzes. Learn in English, Bemba, Nyanja, and other Zambian languages.
          </p>
        </div>

        {/* Language Selection */}
        <Card className="mb-6 shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Select Language
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <Button
                  key={lang.id}
                  variant={selectedLanguage === lang.id ? 'default' : 'outline'}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className="gap-2"
                >
                  <span className="text-lg">{lang.flag}</span>
                  {lang.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <Card className="mb-6 shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-blue-600" />
              Choose Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedCategory === cat.id
                      ? 'border-blue-600 bg-blue-50 shadow-lg'
                      : 'border-border hover:border-blue-300'
                  }`}
                >
                  <p className="font-semibold mb-1">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.desc}</p>
                </motion.button>
              ))}
            </div>

            <Input
              placeholder="Or enter a custom topic (e.g., 'Medical terms', 'Agriculture', 'Technology')"
              value={customTopic}
              onChange={(e) => {
                setCustomTopic(e.target.value);
                if (e.target.value) setSelectedCategory(null);
              }}
            />
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="mb-6 shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Quiz Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty Level</label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="medium">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Words</label>
                <Select defaultValue="15">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 15, 20, 25, 30].map(n => (
                      <SelectItem key={n} value={String(n)}>{n} words</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Quiz Type</label>
                <Select defaultValue="mixed">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mixed">Mixed</SelectItem>
                    <SelectItem value="definition">Definition Match</SelectItem>
                    <SelectItem value="fill_blank">Fill in the Blank</SelectItem>
                    <SelectItem value="synonym">Synonyms</SelectItem>
                    <SelectItem value="context">Context Usage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Learning Features
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: Volume2, label: 'Audio pronunciation' },
                  { icon: MessageSquare, label: 'Example sentences' },
                  { icon: Brain, label: 'Spaced repetition' },
                  { icon: Mic, label: 'Voice practice' },
                ].map((feature, idx) => (
                  <Badge key={idx} variant="secondary" className="justify-center py-2 gap-2">
                    <feature.icon className="w-3 h-3" />
                    {feature.label}
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
            className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-lg px-8 py-6"
            onClick={handleGenerate}
            disabled={(!selectedCategory && !customTopic) || generating}
          >
            {generating ? (
              'Generating Quiz...'
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Vocabulary Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>

          {generating && (
            <div className="mt-4 max-w-md mx-auto">
              <Progress value={65} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                Creating personalized vocabulary quiz with audio...
              </p>
            </div>
          )}
        </div>

        {/* Recent Vocabulary Sets */}
        <Card className="mt-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Your Vocabulary Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { topic: 'Academic English', words: 50, mastered: 38, language: 'English' },
                { topic: 'Bemba Greetings', words: 25, mastered: 20, language: 'Bemba' },
                { topic: 'Science Terms', words: 40, mastered: 28, language: 'English' },
              ].map((set, idx) => (
                <div key={idx} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{set.topic}</p>
                      <p className="text-xs text-muted-foreground">{set.language} • {set.words} words</p>
                    </div>
                    <Badge variant={set.mastered / set.words >= 0.8 ? 'default' : 'secondary'}>
                      {set.mastered}/{set.words} mastered
                    </Badge>
                  </div>
                  <Progress value={(set.mastered / set.words) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIVocabularyQuizPage;