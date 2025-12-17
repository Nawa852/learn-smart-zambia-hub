import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, Globe, Sparkles, Users, DollarSign, Play, CheckCircle2, ArrowRight, BookOpen, Video, FileText, Brain } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface MasteredTopic {
  id: string;
  name: string;
  mastery: number;
  canTeach: boolean;
}

export const TeachTheWorldButton = () => {
  const [selectedTopic, setSelectedTopic] = useState<MasteredTopic | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [courseCreated, setCourseCreated] = useState(false);
  const [creationProgress, setCreationProgress] = useState(0);

  const masteredTopics: MasteredTopic[] = [
    { id: '1', name: 'Basic Algebra', mastery: 95, canTeach: true },
    { id: '2', name: 'JavaScript Fundamentals', mastery: 88, canTeach: true },
    { id: '3', name: 'Essay Writing', mastery: 92, canTeach: true },
    { id: '4', name: 'Data Analysis', mastery: 72, canTeach: false },
  ];

  const createCourse = async () => {
    if (!selectedTopic) return;
    setIsCreating(true);
    setCourseCreated(false);
    
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 400));
      setCreationProgress(i);
    }
    
    setCourseCreated(true);
    setIsCreating(false);
  };

  const creationSteps = [
    { threshold: 10, label: 'Analyzing your mastery data...', icon: Brain },
    { threshold: 30, label: 'Building curriculum from your learning path...', icon: BookOpen },
    { threshold: 50, label: 'Generating video scripts...', icon: Video },
    { threshold: 70, label: 'Creating practice materials...', icon: FileText },
    { threshold: 90, label: 'Setting up marketing...', icon: Globe },
    { threshold: 100, label: 'Course published!', icon: CheckCircle2 },
  ];

  const getCurrentStep = () => {
    return creationSteps.find((step) => creationProgress <= step.threshold) || creationSteps[creationSteps.length - 1];
  };

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-fuchsia-500/10">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
            <Globe className="w-6 h-6 text-white" />
          </div>
          "Teach the World" Button
          <Badge className="ml-auto bg-gradient-to-r from-violet-500 to-purple-500 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            Crown Jewel
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {!courseCreated ? (
          <>
            {/* Intro */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 text-center">
              <GraduationCap className="w-12 h-12 mx-auto text-violet-500 mb-3" />
              <h3 className="font-bold text-lg">Become a Global Educator</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Once you master something, AI turns you into a teacher. Auto-builds your course, markets it, handles grading.
              </p>
            </div>

            {/* Mastered Topics */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Your Mastered Topics</h4>
              {masteredTopics.map((topic) => (
                <motion.div
                  key={topic.id}
                  whileHover={{ scale: topic.canTeach ? 1.01 : 1 }}
                  className={`p-4 rounded-xl border ${
                    selectedTopic?.id === topic.id
                      ? 'border-primary bg-primary/5'
                      : topic.canTeach
                      ? 'border-border/50 hover:border-primary/30 cursor-pointer'
                      : 'border-border/30 opacity-60'
                  } transition-all`}
                  onClick={() => topic.canTeach && setSelectedTopic(topic)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        topic.canTeach ? 'bg-gradient-to-br from-violet-500 to-purple-500' : 'bg-muted'
                      }`}>
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold">{topic.name}</h5>
                        <p className="text-xs text-muted-foreground">
                          {topic.canTeach ? 'Ready to teach!' : 'Need 80%+ mastery'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${topic.mastery >= 80 ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                        {topic.mastery}%
                      </span>
                      <p className="text-xs text-muted-foreground">Mastery</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Creation Progress */}
            {isCreating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3"
              >
                <Progress value={creationProgress} className="h-3" />
                <div className="flex items-center gap-2 text-sm">
                  {(() => {
                    const step = getCurrentStep();
                    return (
                      <>
                        <step.icon className="w-4 h-4 text-primary animate-pulse" />
                        <span>{step.label}</span>
                      </>
                    );
                  })()}
                </div>
              </motion.div>
            )}

            {/* Create Course Button */}
            <Button
              className="w-full gap-2 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
              size="lg"
              onClick={createCourse}
              disabled={!selectedTopic || isCreating}
            >
              <Globe className="w-5 h-5" />
              {isCreating ? 'Creating Your Course...' : 'Teach the World - One Click'}
            </Button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Success State */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-center">
              <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
              <h3 className="font-bold text-xl">Your Course is Live!</h3>
              <p className="text-muted-foreground mt-2">
                "{selectedTopic?.name}" is now available to learners worldwide.
              </p>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-muted/50 text-center">
                <Video className="w-6 h-6 mx-auto text-primary mb-2" />
                <p className="text-xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Lessons Generated</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 text-center">
                <Users className="w-6 h-6 mx-auto text-primary mb-2" />
                <p className="text-xl font-bold">0</p>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 text-center">
                <DollarSign className="w-6 h-6 mx-auto text-emerald-500 mb-2" />
                <p className="text-xl font-bold">K0</p>
                <p className="text-xs text-muted-foreground">Earnings</p>
              </div>
            </div>

            {/* What AI Did */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <h4 className="font-semibold mb-3">AI Auto-Generated:</h4>
              <div className="space-y-2 text-sm">
                {[
                  'Video lesson scripts from your learning path',
                  'Practice quizzes with auto-grading',
                  'Marketing page and SEO',
                  'Student progress tracking',
                  'Revenue and payout system',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 gap-2">
                <Play className="w-4 h-4" />
                View Course
              </Button>
              <Button variant="outline" onClick={() => {
                setCourseCreated(false);
                setSelectedTopic(null);
              }}>
                Create Another
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
