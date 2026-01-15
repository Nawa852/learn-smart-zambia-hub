import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX,
  Maximize, Settings, MessageCircle, BookOpen, Brain,
  CheckCircle2, Clock, Target, Mic, MicOff, ChevronRight,
  Lightbulb, HelpCircle, Bookmark, Share2, ThumbsUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

const AdaptiveCoursePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showTutor, setShowTutor] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(35);
  const [difficulty, setDifficulty] = useState('intermediate');

  const lessonOutline = [
    { id: 1, title: 'Introduction to Quadratics', duration: '5:30', completed: true },
    { id: 2, title: 'Standard Form Explained', duration: '8:15', completed: true },
    { id: 3, title: 'Graphing Parabolas', duration: '12:00', completed: false, current: true },
    { id: 4, title: 'Finding Vertex & Axis', duration: '10:45', completed: false },
    { id: 5, title: 'Real-World Applications', duration: '7:30', completed: false },
    { id: 6, title: 'Practice Problems', duration: '15:00', completed: false },
  ];

  const tutorMessages = [
    { type: 'tip', message: 'Great progress! Based on your performance, I\'m adjusting the content difficulty to challenge you more.' },
    { type: 'question', message: 'Would you like me to explain the vertex formula in more detail?' },
    { type: 'encouragement', message: 'You\'re doing amazing! You\'ve mastered 80% of the concepts so far.' },
  ];

  const adaptiveInsights = [
    { label: 'Learning Pace', value: 'Optimal', color: 'text-green-500' },
    { label: 'Comprehension', value: '87%', color: 'text-blue-500' },
    { label: 'Engagement', value: 'High', color: 'text-purple-500' },
    { label: 'Difficulty Level', value: 'Intermediate+', color: 'text-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {/* Video Player */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-black rounded-2xl overflow-hidden aspect-video mb-6"
          >
            {/* Video Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-4">
                  <Play className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Graphing Parabolas</h2>
                <p className="text-white/70">Chapter 3: Quadratic Functions</p>
              </div>
            </div>

            {/* AI Tutor Overlay */}
            <AnimatePresence>
              {showTutor && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute top-4 right-4 w-72 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">AI Tutor</p>
                      <p className="text-xs text-white/70">Adaptive Assistant</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/90">{tutorMessages[0].message}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="secondary" className="flex-1">
                      <HelpCircle className="w-4 h-4 mr-1" /> Ask More
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white">
                      <ThumbsUp className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="absolute bottom-16 left-0 right-0 px-4">
              <Progress value={currentProgress} className="h-1" />
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <SkipBack className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-white/20 w-12 h-12"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <SkipForward className="w-5 h-5" />
                  </Button>
                  <span className="text-white text-sm">4:12 / 12:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`text-white hover:bg-white/20 ${voiceEnabled ? 'bg-primary/50' : ''}`}
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                  >
                    {voiceEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-white/20"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`text-white hover:bg-white/20 ${showTutor ? 'bg-primary/50' : ''}`}
                    onClick={() => setShowTutor(!showTutor)}
                  >
                    <Brain className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Settings className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Maximize className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lesson Info */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Graphing Parabolas</h1>
              <p className="text-muted-foreground">Mathematics • Chapter 3: Quadratic Functions</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-1" /> Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" /> Share
              </Button>
            </div>
          </div>

          {/* Adaptive Insights */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Real-Time Adaptive Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {adaptiveInsights.map((insight, index) => (
                  <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">{insight.label}</p>
                    <p className={`text-xl font-bold ${insight.color}`}>{insight.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <span className="font-medium">AI Recommendation</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on your learning pace, I'm introducing more challenging examples. 
                  Would you like to try the advanced problem set?
                </p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm">Yes, Challenge Me</Button>
                  <Button size="sm" variant="outline">Keep Current Pace</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Notes, Transcript, Discussion */}
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="p-3 bg-yellow-500/10 border-l-4 border-yellow-500 rounded">
                      <p className="font-medium">Key Concept</p>
                      <p className="text-sm text-muted-foreground">
                        The vertex form of a quadratic equation is y = a(x-h)² + k, where (h,k) is the vertex.
                      </p>
                    </div>
                    <div className="p-3 bg-blue-500/10 border-l-4 border-blue-500 rounded">
                      <p className="font-medium">Formula</p>
                      <p className="text-sm text-muted-foreground">
                        Axis of symmetry: x = -b/(2a)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transcript" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    [00:00] Welcome back! In this lesson, we're going to learn how to graph parabolas...
                    <br /><br />
                    [04:12] Now, let's look at how the vertex affects the shape of our graph...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="discussion" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-center text-muted-foreground py-8">
                    Join the discussion with 23 other students
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Lesson Outline */}
        <div className="w-80 border-l bg-muted/30 p-4 hidden lg:block">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Lesson Outline
          </h3>
          <div className="space-y-2">
            {lessonOutline.map((lesson) => (
              <div
                key={lesson.id}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  lesson.current 
                    ? 'bg-primary text-primary-foreground' 
                    : lesson.completed 
                    ? 'bg-green-500/10 hover:bg-green-500/20' 
                    : 'bg-muted/50 hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    lesson.completed ? 'bg-green-500 text-white' : lesson.current ? 'bg-white text-primary' : 'bg-muted'
                  }`}>
                    {lesson.completed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-xs">{lesson.id}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${lesson.current ? 'text-primary-foreground' : ''}`}>
                      {lesson.title}
                    </p>
                    <p className={`text-xs ${lesson.current ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {lesson.duration}
                    </p>
                  </div>
                  {lesson.current && <Play className="w-4 h-4" />}
                </div>
              </div>
            ))}
          </div>

          {/* Voice Commands */}
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Mic className="w-4 h-4 text-primary" />
              Voice Commands
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              Say these commands while voice is enabled:
            </p>
            <div className="space-y-1 text-xs">
              <p>"Pause" / "Play"</p>
              <p>"Explain this concept"</p>
              <p>"Next lesson"</p>
              <p>"Show me an example"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveCoursePage;
