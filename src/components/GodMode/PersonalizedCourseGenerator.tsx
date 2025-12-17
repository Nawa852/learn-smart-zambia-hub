import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Loader2, BookOpen, Video, FileText, Brain, CheckCircle2, Sparkles, Play } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GeneratedModule {
  id: number;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'project';
  duration: string;
  description: string;
}

export const PersonalizedCourseGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<{
    title: string;
    description: string;
    modules: GeneratedModule[];
  } | null>(null);
  const [progress, setProgress] = useState(0);

  const generateCourse = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate AI generation
    const steps = ['Analyzing your request...', 'Building curriculum...', 'Creating lessons...', 'Generating quizzes...', 'Finalizing...'];
    for (let i = 0; i <= 100; i += 20) {
      await new Promise((r) => setTimeout(r, 600));
      setProgress(i);
    }

    setGeneratedCourse({
      title: `Understanding ${prompt.split(' ').slice(0, 3).join(' ')}`,
      description: `A personalized course tailored to your learning style and background. Generated based on: "${prompt}"`,
      modules: [
        { id: 1, title: 'Introduction & Foundations', type: 'video', duration: '15 min', description: 'Core concepts explained simply' },
        { id: 2, title: 'Real-World Analogies', type: 'reading', duration: '10 min', description: 'Connecting to everyday life' },
        { id: 3, title: 'Interactive Practice', type: 'quiz', duration: '20 min', description: 'Test your understanding' },
        { id: 4, title: 'Deep Dive', type: 'video', duration: '25 min', description: 'Advanced concepts and nuances' },
        { id: 5, title: 'Hands-On Project', type: 'project', duration: '45 min', description: 'Apply what you learned' },
        { id: 6, title: 'Final Assessment', type: 'quiz', duration: '30 min', description: 'Prove your mastery' },
      ],
    });
    
    setIsGenerating(false);
  };

  const typeIcons = {
    video: Video,
    reading: FileText,
    quiz: Brain,
    project: Sparkles,
  };

  const typeColors = {
    video: 'from-red-500 to-rose-500',
    reading: 'from-blue-500 to-indigo-500',
    quiz: 'from-purple-500 to-pink-500',
    project: 'from-emerald-500 to-teal-500',
  };

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
            <Wand2 className="w-6 h-6 text-white" />
          </div>
          On-Demand Course Generator
          <Badge className="ml-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            AI-Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {!generatedCourse ? (
          <>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">What do you want to learn?</label>
                <Textarea
                  placeholder='e.g., "Teach me machine learning like I\'m a farmer with no math background" or "Explain quantum physics using cooking analogies"'
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {['No math background', 'Visual learner', 'Real-world examples', 'Quick pace'].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setPrompt((prev) => `${prev} (${tag})`)}
                  >
                    + {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {progress < 20 ? 'Analyzing your learning request...' : progress < 40 ? 'Building personalized curriculum...' : progress < 60 ? 'Generating lesson content...' : progress < 80 ? 'Creating assessments...' : 'Finalizing your course...'}
              </p>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              className="w-full gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              size="lg"
              onClick={generateCourse}
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Course...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate My Personalized Course
                </>
              )}
            </Button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-1" />
                <div>
                  <h3 className="font-bold text-lg">{generatedCourse.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{generatedCourse.description}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Course Modules</h4>
              {generatedCourse.modules.map((module, index) => {
                const Icon = typeIcons[module.type];
                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all cursor-pointer group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${typeColors[module.type]} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium">{module.title}</h5>
                      <p className="text-xs text-muted-foreground">{module.description}</p>
                    </div>
                    <Badge variant="outline">{module.duration}</Badge>
                    <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4" />
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 gap-2">
                <Play className="w-4 h-4" />
                Start Learning
              </Button>
              <Button variant="outline" onClick={() => setGeneratedCourse(null)}>
                Generate New Course
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
