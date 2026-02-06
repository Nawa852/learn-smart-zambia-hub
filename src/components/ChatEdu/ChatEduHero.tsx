import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, Play, Brain, Zap, Check,
  Camera, Mic, Send, Star, Crown, GraduationCap,
  Upload, MessageCircle, BookOpen, Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const ChatEduHero = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeDemo, setActiveDemo] = useState<'chat' | 'snap' | 'quiz'>('chat');
  const [typingText, setTypingText] = useState('');
  const [showAIResponse, setShowAIResponse] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Typing animation
  useEffect(() => {
    const texts = {
      chat: "Explain the causes of World War 1 in simple terms",
      snap: "Solving quadratic equation: x² + 5x + 6 = 0",
      quiz: "Generate 10 ECZ-style questions on photosynthesis"
    };
    
    const text = texts[activeDemo];
    let index = 0;
    setTypingText('');
    setShowAIResponse(false);
    
    const timer = setInterval(() => {
      if (index <= text.length) {
        setTypingText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowAIResponse(true), 300);
      }
    }, 40);
    
    return () => clearInterval(timer);
  }, [activeDemo]);

  const universityLogos = [
    "University of Zambia",
    "Copperbelt University", 
    "Mulungushi University",
    "ZCAS University",
    "Cavendish University"
  ];

  const demoTabs = [
    { id: 'chat', icon: MessageCircle, label: 'AI Chat' },
    { id: 'snap', icon: Camera, label: 'Snap & Solve' },
    { id: 'quiz', icon: Trophy, label: 'Practice Quiz' },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-background pt-16">
      {/* Gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <motion.div 
          className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-[100px]"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-[100px]"
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10">
        <div className="container mx-auto px-4 pt-12 pb-20">
          {/* Top Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <Badge className="px-4 py-2 bg-primary/10 text-primary border-primary/20 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Zambia's #1 AI Learning Platform • 50,000+ Students
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center max-w-4xl mx-auto mb-8"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="text-foreground">Learn Anything with</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
                AI That Understands You
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Snap homework problems, chat with AI tutors, and ace your ECZ exams. 
              Built for Zambian students, powered by world-class AI.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              onClick={() => navigate('/auth?mode=signup')}
              className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-xl shadow-primary/25"
            >
              Start Learning Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg border-2"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Feature List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-16 text-sm text-muted-foreground"
          >
            {[
              "No credit card required",
              "ECZ curriculum aligned",
              "Works offline",
              "7 Zambian languages"
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>

          {/* Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            {/* Demo Tabs */}
            <div className="flex justify-center gap-2 mb-4">
              {demoTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDemo(tab.id as 'chat' | 'snap' | 'quiz')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeDemo === tab.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Demo Card */}
            <div className="relative bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">BrightSphere AI</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs text-muted-foreground">Ready to help</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Crown className="w-3 h-3 mr-1 text-yellow-500" />
                    ECZ Expert
                  </Badge>
                </div>
              </div>

              {/* Chat Content */}
              <div className="p-6 min-h-[300px] space-y-4">
                {/* User Message */}
                <motion.div
                  key={activeDemo}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] bg-primary text-white rounded-2xl rounded-br-sm px-4 py-3">
                    <p className="text-sm">{typingText}<span className="animate-pulse">|</span></p>
                  </div>
                </motion.div>

                {/* AI Response */}
                {showAIResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                      {activeDemo === 'chat' && (
                        <div className="text-sm text-foreground space-y-2">
                          <p><strong>World War 1 started because of 4 main causes (MAIN):</strong></p>
                          <ul className="list-disc list-inside space-y-1">
                            <li><strong>M</strong>ilitarism - Countries built up huge armies</li>
                            <li><strong>A</strong>lliances - Countries promised to help each other</li>
                            <li><strong>I</strong>mperialism - Fighting over colonies in Africa</li>
                            <li><strong>N</strong>ationalism - Pride in your country</li>
                          </ul>
                          <p className="text-muted-foreground mt-2">The trigger was the assassination of Archduke Franz Ferdinand in 1914.</p>
                        </div>
                      )}
                      {activeDemo === 'snap' && (
                        <div className="text-sm text-foreground space-y-2">
                          <p><strong>Solution: x² + 5x + 6 = 0</strong></p>
                          <div className="bg-background/50 p-3 rounded-lg font-mono text-xs">
                            <p>Step 1: Factor the equation</p>
                            <p>x² + 5x + 6 = (x + 2)(x + 3) = 0</p>
                            <p>Step 2: Set each factor to zero</p>
                            <p>x + 2 = 0 → x = -2</p>
                            <p>x + 3 = 0 → x = -3</p>
                            <p className="text-emerald-500 font-semibold mt-2">Answer: x = -2 or x = -3</p>
                          </div>
                        </div>
                      )}
                      {activeDemo === 'quiz' && (
                        <div className="text-sm text-foreground space-y-2">
                          <p><strong>✨ Generated 10 ECZ-Style Questions:</strong></p>
                          <div className="space-y-2">
                            <div className="p-2 bg-background/50 rounded-lg">
                              <p className="font-medium">Q1: What is the primary pigment in photosynthesis?</p>
                              <p className="text-xs text-muted-foreground">A) Chlorophyll B) Hemoglobin C) Melanin D) Carotene</p>
                            </div>
                            <div className="p-2 bg-background/50 rounded-lg">
                              <p className="font-medium">Q2: Where does the light reaction occur?</p>
                              <p className="text-xs text-muted-foreground">A) Stroma B) Thylakoid C) Mitochondria D) Nucleus</p>
                            </div>
                            <p className="text-primary text-xs">+ 8 more questions ready...</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border/50">
                        <Button size="sm" variant="ghost" className="h-7 text-xs">
                          <Mic className="w-3 h-3 mr-1" />
                          Read aloud
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 text-xs">
                          Save to notes
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-border bg-muted/30">
                <div className="flex items-center gap-2 bg-background rounded-xl border border-border p-2">
                  <Button variant="ghost" size="icon" className="rounded-lg hover:bg-muted">
                    <Camera className="w-5 h-5 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-lg hover:bg-muted">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </Button>
                  <input 
                    type="text"
                    placeholder="Ask anything about your studies..."
                    className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                  />
                  <Button size="icon" className="rounded-lg bg-primary hover:bg-primary/90">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {[
                { icon: Zap, label: '0.5s response', color: 'text-yellow-500' },
                { icon: Brain, label: '16+ AI models', color: 'text-primary' },
                { icon: BookOpen, label: '10,000+ lessons', color: 'text-emerald-500' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border text-xs">
                  <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                  <span className="text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 text-center"
          >
            <p className="text-sm text-muted-foreground mb-6">Trusted by students from leading Zambian institutions</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {universityLogos.map((uni) => (
                <div key={uni} className="text-muted-foreground/50 text-sm font-medium">
                  {uni}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ChatEduHero;
