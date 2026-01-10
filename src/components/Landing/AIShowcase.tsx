import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, MessageSquare, BookOpen, Brain, Mic, Video, FileText,
  Sparkles, Check, ArrowRight, Play, Lightbulb, Target, Wand2,
  Languages, Calculator, FlaskConical, BookMarked, PenTool
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AIFeature {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
  demo: string;
  benefits: string[];
  inspired: string;
}

const aiFeatures: AIFeature[] = [
  {
    id: 'snap-solve',
    name: 'Snap & Solve',
    icon: Camera,
    color: 'from-blue-500 to-cyan-500',
    description: 'Take a photo of any problem — math, science, or text. Get instant step-by-step solutions.',
    demo: '/demos/snap-solve.gif',
    benefits: ['Photo recognition', 'Handwriting support', 'Step-by-step breakdown', 'Multiple solution methods'],
    inspired: 'QANDA / Socratic',
  },
  {
    id: 'ai-tutor',
    name: 'AI Tutor Chat',
    icon: MessageSquare,
    color: 'from-purple-500 to-pink-500',
    description: 'Chat with your personal AI tutor 24/7. Get explanations at your level, in your language.',
    demo: '/demos/ai-tutor.gif',
    benefits: ['Adaptive explanations', 'Bemba & Nyanja support', 'Voice chat enabled', 'Remembers your history'],
    inspired: 'Khanmigo / ChatGPT',
  },
  {
    id: 'adaptive-courses',
    name: 'Smart Courses',
    icon: BookOpen,
    color: 'from-emerald-500 to-green-500',
    description: 'AI-generated courses that adapt to your learning style, pace, and goals.',
    demo: '/demos/courses.gif',
    benefits: ['Personalized paths', 'Mixed formats', 'Progress tracking', 'ECZ aligned'],
    inspired: 'Coursera / Oboe',
  },
  {
    id: 'flashcard-gen',
    name: 'AI Flashcards',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-500',
    description: 'Automatically generate flashcards from any content. Spaced repetition for maximum retention.',
    demo: '/demos/flashcards.gif',
    benefits: ['Auto-generation', 'Spaced repetition', 'Image support', 'Share with friends'],
    inspired: 'LearningRO / Anki',
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    icon: Target,
    color: 'from-red-500 to-rose-500',
    description: 'Adaptive quizzes that get harder as you improve. Gamified with leaderboards and rewards.',
    demo: '/demos/quiz.gif',
    benefits: ['Adaptive difficulty', 'Instant feedback', 'Leaderboards', 'Achievement badges'],
    inspired: 'Quizizz / Kahoot',
  },
  {
    id: 'essay-helper',
    name: 'Essay Assistant',
    icon: PenTool,
    color: 'from-indigo-500 to-violet-500',
    description: 'AI-powered writing assistant. Get structure suggestions, grammar fixes, and style improvements.',
    demo: '/demos/essay.gif',
    benefits: ['Structure templates', 'Grammar check', 'Citation help', 'Plagiarism safe'],
    inspired: 'Grammarly / Notion AI',
  },
  {
    id: 'language-learn',
    name: 'Language AI',
    icon: Languages,
    color: 'from-teal-500 to-cyan-500',
    description: 'Learn languages through AI conversations. Practice speaking with instant pronunciation feedback.',
    demo: '/demos/language.gif',
    benefits: ['7 Zambian languages', 'Voice practice', 'Roleplay scenarios', 'Cultural context'],
    inspired: 'Duolingo Max / Talkpal',
  },
  {
    id: 'video-lessons',
    name: 'Video Learning',
    icon: Video,
    color: 'from-pink-500 to-rose-500',
    description: 'AI-curated video lessons from YouTube and local creators. Smart summaries and transcripts.',
    demo: '/demos/video.gif',
    benefits: ['Curated content', 'Auto summaries', 'Interactive notes', 'Offline download'],
    inspired: 'uLesson / EdX',
  },
];

const AIShowcase = () => {
  const [activeFeature, setActiveFeature] = useState<AIFeature>(aiFeatures[0]);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-muted/30">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Wand2 className="w-3 h-3 mr-1" />
            AI-Powered Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Every Learning Tool,</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Powered by AI
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combining the best features from QANDA, Duolingo, Coursera, and more — 
            all adapted for Zambian students with local curriculum support
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-8 items-start">
          {/* Left - Feature selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
            {aiFeatures.map((feature, idx) => (
              <motion.button
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setActiveFeature(feature)}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`group relative p-4 rounded-2xl border transition-all duration-300 text-left ${
                  activeFeature.id === feature.id
                    ? 'bg-card border-primary shadow-lg shadow-primary/10'
                    : 'bg-card/50 border-border hover:border-primary/30 hover:bg-card'
                }`}
              >
                {/* Active indicator */}
                {activeFeature.id === feature.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary"
                  />
                )}
                
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{feature.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{feature.description.slice(0, 50)}...</p>
                  
                  {/* Inspired by badge */}
                  <div className="mt-2">
                    <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      ✨ {feature.inspired}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right - Feature detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="sticky top-24"
            >
              <div className="bg-card rounded-3xl border border-border shadow-2xl overflow-hidden">
                {/* Demo area */}
                <div className={`h-64 md:h-80 bg-gradient-to-br ${activeFeature.color} relative flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative text-center">
                    <activeFeature.icon className="w-20 h-20 text-white/90 mx-auto mb-4" />
                    <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Demo
                    </Button>
                  </div>
                  
                  {/* Floating UI elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute top-4 right-4 bg-white/90 rounded-lg px-3 py-2 shadow-lg"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-foreground">AI Processing...</span>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{activeFeature.name}</h3>
                      <p className="text-muted-foreground">{activeFeature.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Inspired by {activeFeature.inspired}
                    </Badge>
                  </div>

                  {/* Benefits grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {activeFeature.benefits.map((benefit, idx) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2 p-3 rounded-xl bg-muted/50"
                      >
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                      Try {activeFeature.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            All features work together seamlessly in one unified experience
          </p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-xl">
            <Brain className="w-5 h-5 mr-2" />
            Explore All AI Features
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AIShowcase;
