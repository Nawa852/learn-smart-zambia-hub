import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, MessageSquare, BookOpen, Brain, Video, FileText,
  Sparkles, Check, ArrowRight, Lightbulb, Target, PenTool,
  Languages, Calculator, Mic, Upload, Wand2, Zap, Clock,
  Users, Trophy, Star, GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  benefits: string[];
  stats: { value: string; label: string }[];
  image?: string;
}

const features: Feature[] = [
  {
    id: 'snap-solve',
    title: 'Snap & Solve',
    subtitle: 'Photo-based problem solving',
    description: 'Take a picture of any homework problem — math equations, science diagrams, or text questions. Our AI instantly recognizes and solves it with step-by-step explanations.',
    icon: Camera,
    gradient: 'from-blue-500 to-cyan-500',
    benefits: [
      'Handwriting recognition',
      'Step-by-step solutions',
      'Multiple solving methods',
      'Works offline'
    ],
    stats: [
      { value: '0.5s', label: 'Recognition' },
      { value: '98%', label: 'Accuracy' },
      { value: '50+', label: 'Subjects' }
    ]
  },
  {
    id: 'ai-tutor',
    title: 'AI Tutor Chat',
    subtitle: 'Your personal learning companion',
    description: 'Have conversations with an AI tutor that adapts to your learning style. Ask questions in English, Bemba, or Nyanja and get explanations that make sense to you.',
    icon: MessageSquare,
    gradient: 'from-purple-500 to-pink-500',
    benefits: [
      'Socratic method teaching',
      'Local language support',
      'Voice interaction',
      'Remembers your progress'
    ],
    stats: [
      { value: '24/7', label: 'Available' },
      { value: '7', label: 'Languages' },
      { value: '16+', label: 'AI Models' }
    ]
  },
  {
    id: 'practice-lab',
    title: 'Practice Lab',
    subtitle: 'Master through repetition',
    description: 'Adaptive quizzes and practice tests that get harder as you improve. ECZ-aligned questions with instant feedback and detailed explanations.',
    icon: Target,
    gradient: 'from-emerald-500 to-green-500',
    benefits: [
      'Adaptive difficulty',
      'ECZ exam format',
      'Instant feedback',
      'Performance tracking'
    ],
    stats: [
      { value: '100K+', label: 'Questions' },
      { value: 'Grade 7-12', label: 'Coverage' },
      { value: '15+', label: 'Subjects' }
    ]
  },
  {
    id: 'smart-courses',
    title: 'Smart Courses',
    subtitle: 'Learn at your own pace',
    description: 'Structured courses that adapt to your knowledge level. AI generates personalized learning paths based on your strengths and weaknesses.',
    icon: BookOpen,
    gradient: 'from-orange-500 to-yellow-500',
    benefits: [
      'Personalized paths',
      'Progress tracking',
      'Mixed content formats',
      'Certificate on completion'
    ],
    stats: [
      { value: '500+', label: 'Courses' },
      { value: 'ECZ', label: 'Aligned' },
      { value: '4.9★', label: 'Rating' }
    ]
  },
  {
    id: 'essay-helper',
    title: 'Essay Assistant',
    subtitle: 'Write better, faster',
    description: 'AI-powered writing assistant that helps structure essays, fix grammar, and improve your writing style. Perfect for English and comprehension subjects.',
    icon: PenTool,
    gradient: 'from-indigo-500 to-violet-500',
    benefits: [
      'Structure suggestions',
      'Grammar correction',
      'Citation help',
      'Plagiarism-safe'
    ],
    stats: [
      { value: '10x', label: 'Faster' },
      { value: 'A-A+', label: 'Avg Grade' },
      { value: '∞', label: 'Revisions' }
    ]
  },
  {
    id: 'video-learning',
    title: 'Video Library',
    subtitle: 'Visual learning made easy',
    description: 'Curated video lessons from top educators. AI-generated summaries, transcripts, and interactive notes for every video.',
    icon: Video,
    gradient: 'from-red-500 to-pink-500',
    benefits: [
      'Curated content',
      'AI summaries',
      'Offline download',
      'Interactive notes'
    ],
    stats: [
      { value: '5K+', label: 'Videos' },
      { value: 'HD', label: 'Quality' },
      { value: '∞', label: 'Rewatch' }
    ]
  },
];

const ChatEduFeatures = () => {
  const [activeFeature, setActiveFeature] = useState<Feature>(features[0]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Wand2 className="w-3 h-3 mr-1" />
            AI-Powered Learning
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Everything You Need to</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Succeed in School
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            One platform, unlimited possibilities. From homework help to exam prep, 
            we've got every tool you need to excel in your studies.
          </p>
        </motion.div>

        {/* Feature Grid & Preview */}
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-8">
          {/* Feature Selector */}
          <div className="space-y-3">
            {features.map((feature, idx) => (
              <motion.button
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setActiveFeature(feature)}
                onMouseEnter={() => setHoveredId(feature.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`w-full group relative p-4 rounded-xl border transition-all duration-300 text-left ${
                  activeFeature.id === feature.id
                    ? 'bg-card border-primary shadow-lg'
                    : 'bg-card/50 border-border hover:border-primary/30 hover:bg-card'
                }`}
              >
                {activeFeature.id === feature.id && (
                  <motion.div
                    layoutId="activeFeature"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary"
                  />
                )}
                <div className="relative flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.subtitle}</p>
                  </div>
                  <ArrowRight className={`w-5 h-5 text-muted-foreground transition-all ${
                    activeFeature.id === feature.id ? 'opacity-100 translate-x-0 text-primary' : 'opacity-0 -translate-x-2'
                  }`} />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Feature Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:sticky lg:top-24"
            >
              <Card className="overflow-hidden border-0 shadow-2xl">
                {/* Feature Header/Visual */}
                <div className={`h-48 md:h-64 bg-gradient-to-br ${activeFeature.gradient} relative flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative z-10 text-center"
                  >
                    <activeFeature.icon className="w-16 h-16 text-white/90 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white">{activeFeature.title}</h3>
                    <p className="text-white/80">{activeFeature.subtitle}</p>
                  </motion.div>
                  
                  {/* Decorative elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-xs flex items-center gap-2"
                  >
                    <Sparkles className="w-3 h-3" />
                    AI Powered
                  </motion.div>
                </div>

                <CardContent className="p-6 md:p-8 space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {activeFeature.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {activeFeature.stats.map((stat, idx) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className="text-center p-3 rounded-xl bg-muted/50"
                      >
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div className="grid grid-cols-2 gap-3">
                    {activeFeature.benefits.map((benefit, idx) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-emerald-500" />
                        </div>
                        <span className="text-sm text-foreground">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3 pt-4">
                    <Button className={`flex-1 bg-gradient-to-r ${activeFeature.gradient} hover:opacity-90`}>
                      Try {activeFeature.title}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
          <p className="text-muted-foreground mb-6">
            All features work together seamlessly in one unified experience
          </p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-xl">
            <Brain className="w-5 h-5 mr-2" />
            Start Learning Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatEduFeatures;
