import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, Play, Brain, Zap, BookOpen, 
  MessageSquare, Camera, Mic, Send, Star, Crown,
  GraduationCap, Trophy, Target, Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const UltraHero = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [demoQuery, setDemoQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Auto-typing demo effect
  useEffect(() => {
    const demoText = "Explain photosynthesis like I'm 10 years old";
    let index = 0;
    const timer = setInterval(() => {
      if (index <= demoText.length) {
        setDemoQuery(demoText.slice(0, index));
        index++;
        setIsTyping(true);
      } else {
        setIsTyping(false);
        setTimeout(() => setShowResponse(true), 500);
        clearInterval(timer);
      }
    }, 80);
    
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: Camera, label: 'Snap & Solve', desc: 'Photo math solver' },
    { icon: MessageSquare, label: 'AI Tutor', desc: '24/7 help' },
    { icon: BookOpen, label: 'Courses', desc: '10,000+ lessons' },
    { icon: Trophy, label: 'Gamified', desc: 'Earn rewards' },
  ];

  const stats = [
    { value: '50K+', label: 'Active Students', icon: GraduationCap },
    { value: '98%', label: 'Success Rate', icon: Target },
    { value: '24/7', label: 'AI Support', icon: Brain },
    { value: '100+', label: 'ECZ Topics', icon: BookOpen },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <motion.div 
          className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, -30, 0],
            scale: [1, 1.15, 1] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10">
        <div className="container mx-auto px-4 pt-20 pb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Trust badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-card border border-border shadow-lg"
              >
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-xs text-white font-bold border-2 border-background">
                      {['M', 'K', 'S', 'T'][i-1]}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">
                  50,000+ Zambian students learning
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.div>

              {/* Main headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                  <span className="text-foreground">Your AI</span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                    Learning Companion
                  </span>
                </h1>
              </motion.div>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl"
              >
                Snap homework, get instant explanations. Chat with AI tutors. 
                Master any subject with <span className="text-primary font-semibold">personalized learning</span> paths.
              </motion.p>

              {/* Feature pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                {features.map((feature, idx) => (
                  <motion.div
                    key={feature.label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-foreground">{feature.label}</p>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  onClick={() => navigate('/welcome')}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-xl hover:shadow-2xl transition-all h-14 px-8 text-lg font-semibold group"
                >
                  Start Learning Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 h-14 px-8 text-lg group hover:bg-muted/50"
                >
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-4 gap-4 pt-8 border-t border-border/50"
              >
                {stats.map((stat, idx) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Interactive Demo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Main demo card */}
              <div className="relative bg-card rounded-3xl border border-border shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">BrightSphere AI</h3>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-muted-foreground">Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-500" />
                    <span className="text-xs font-medium text-muted-foreground">PRO</span>
                  </div>
                </div>

                {/* Chat area */}
                <div className="p-6 space-y-4 min-h-[350px]">
                  {/* User message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[80%] bg-primary text-white rounded-2xl rounded-br-sm px-4 py-3">
                      <p className="text-sm">{demoQuery}{isTyping && <span className="animate-pulse">|</span>}</p>
                    </div>
                  </motion.div>

                  {/* AI Response */}
                  {showResponse && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                        <p className="text-sm text-foreground leading-relaxed">
                          Imagine a plant is like a tiny kitchen! 🌱🍳
                          <br/><br/>
                          <strong>Ingredients:</strong> Sunlight ☀️ + Water 💧 + Air (CO₂) 💨
                          <br/><br/>
                          <strong>Recipe:</strong> The plant's leaves catch sunlight like solar panels. They mix it with water from roots and air from tiny holes. 
                          <br/><br/>
                          <strong>Result:</strong> Food (sugar) + Oxygen 🌬️ for us to breathe!
                        </p>
                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border/50">
                          <Button size="sm" variant="ghost" className="h-7 text-xs">
                            <Mic className="w-3 h-3 mr-1" />
                            Read aloud
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 text-xs">
                            More detail
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input area */}
                <div className="p-4 border-t border-border bg-muted/30">
                  <div className="flex items-center gap-2 bg-background rounded-xl border border-border p-2">
                    <Button variant="ghost" size="icon" className="rounded-lg">
                      <Camera className="w-5 h-5 text-muted-foreground" />
                    </Button>
                    <input 
                      type="text"
                      placeholder="Ask anything..."
                      className="flex-1 bg-transparent border-none outline-none text-sm"
                    />
                    <Button size="icon" className="rounded-lg bg-primary hover:bg-primary/90">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-3">
                    <span className="text-xs text-muted-foreground">Try:</span>
                    {['Math help', 'Essay writer', 'Science quiz'].map((item) => (
                      <button key={item} className="text-xs text-primary hover:underline">
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -right-4 top-1/4 bg-card rounded-xl p-3 shadow-xl border border-border"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Instant answers</p>
                    <p className="text-[10px] text-muted-foreground">0.8s avg response</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -left-4 bottom-1/3 bg-card rounded-xl p-3 shadow-xl border border-border"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Rocket className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">16+ AI Models</p>
                    <p className="text-[10px] text-muted-foreground">Powered by BrightSphere</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Explore features</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 rounded-full bg-primary" 
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default UltraHero;
