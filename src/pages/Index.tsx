import { useAuth } from "@/components/Auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, ArrowRight, Users, BookOpen, Award, Brain, Globe, Zap, 
  Heart, Star, MessageSquare, Target, Calendar, Upload, TrendingUp, 
  Lightbulb, Mic, Shield, Eye, Map, Radio, Coins, Wifi, Truck, Sparkles,
  Play, CheckCircle, Clock, Trophy, Rocket, Camera, FileText, Video,
  Headphones, PenTool, BarChart3, Layers, Database, Bot, Wand2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import brightSphereLogo from "@/assets/brightsphere-logo.svg";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="flex flex-col items-center space-y-4">
          <img src={brightSphereLogo} alt="BrightSphere" className="w-20 h-20 animate-pulse" />
          <p className="text-muted-foreground animate-pulse">Loading BrightSphere AI Platform...</p>
        </div>
      </div>
    );
  }

  const godModeFeatures = [
    { icon: Brain, title: "Mind-Reading AI Tutor", description: "Knows what you're confused about before you ask", color: "from-purple-500 to-pink-500" },
    { icon: Layers, title: "Living Knowledge Graph", description: "3D interactive brain map of your learning", color: "from-blue-500 to-cyan-500" },
    { icon: Wand2, title: "Auto-Generated Courses", description: "Personalized courses created just for you", color: "from-orange-500 to-red-500" },
    { icon: MessageSquare, title: "Socratic Combat Mode", description: "AI argues with you to deepen understanding", color: "from-green-500 to-emerald-500" },
    { icon: Eye, title: "Explain Like X", description: "Any concept explained your way", color: "from-indigo-500 to-purple-500" },
    { icon: Trophy, title: "Mastery Proof System", description: "Certificates that prove real knowledge", color: "from-yellow-500 to-orange-500" },
    { icon: Heart, title: "Mood-Aware Teaching", description: "AI adapts to your emotional state", color: "from-pink-500 to-rose-500" },
    { icon: Coins, title: "Learn-to-Earn Engine", description: "Turn learning into real opportunities", color: "from-teal-500 to-green-500" },
  ];

  const platformFeatures = [
    { icon: Bot, title: "16+ AI Models", description: "GPT-4o, Claude 3, Gemini, DeepSeek & more", stat: "Active" },
    { icon: Globe, title: "7 Languages", description: "Bemba, Nyanja, Tonga, Lozi + English", stat: "Live" },
    { icon: Video, title: "Live Tutoring", description: "1:1 sessions with expert tutors", stat: "24/7" },
    { icon: Camera, title: "Photo Solver", description: "Snap homework, get instant solutions", stat: "Instant" },
    { icon: FileText, title: "25,000+ Resources", description: "ECZ past papers, notes, guides", stat: "Growing" },
    { icon: BarChart3, title: "Smart Analytics", description: "Track progress & predict success", stat: "Real-time" },
  ];

  const stats = [
    { value: "50,000+", label: "Active Learners", icon: Users },
    { value: "16+", label: "AI Models", icon: Brain },
    { value: "5M+", label: "Questions Answered", icon: MessageSquare },
    { value: "98%", label: "Success Rate", icon: Trophy },
  ];

  const testimonials = [
    { name: "Mwansa K.", role: "Grade 12 Student", quote: "BrightSphere helped me pass my ECZ exams with distinction!", avatar: "MK" },
    { name: "Chanda M.", role: "Teacher, Lusaka", quote: "The AI grading saves me hours every week.", avatar: "CM" },
    { name: "Bwalya T.", role: "Parent", quote: "My children love learning now. It's like magic!", avatar: "BT" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-br from-accent/15 to-primary/10 rounded-full blur-3xl animate-levitate" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-primary/10 to-accent/20 rounded-full blur-3xl animate-morph" />
      </div>
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={brightSphereLogo} alt="BrightSphere" className="w-10 h-10" />
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  BrightSphere AI
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  16 AI Models Active
                </span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {["Features", "AI Models", "Courses", "About"].map((item) => (
                <button
                  key={item}
                  onClick={() => item === "Courses" ? navigate('/courses') : null}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/welcome')} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by 16+ Advanced AI Models
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              The Future of Learning
            </span>
            <br />
            <span className="text-foreground">is Here</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience God-Mode learning with AI that reads your mind, adapts to your mood, 
            and transforms how Zambia learns. GPT-4o, Claude 3, and 14+ more AI models at your fingertips.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/welcome')}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              <Rocket className="mr-2 w-5 h-5" />
              Start Learning Free
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/study-assistant')}
              className="text-lg px-8 py-6"
            >
              <Play className="mr-2 w-5 h-5" />
              Try AI Tutor
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* God Mode Features */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">GOD MODE FEATURES</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Beyond <span className="text-primary">Ordinary</span> Learning
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Features so advanced, they feel like superpowers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {godModeFeatures.map((feature, i) => (
              <Card 
                key={i} 
                className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 cursor-pointer"
                onClick={() => navigate('/dashboard')}
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-lg text-muted-foreground">One platform, infinite possibilities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((feature, i) => (
              <Card key={i} className="border-border/50 hover:shadow-lg transition-all">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold">{feature.title}</h3>
                      <Badge variant="outline" className="text-xs">{feature.stat}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Models Showcase */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Powered by the Best AI</h2>
            <p className="text-lg text-muted-foreground">16+ models working together for you</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {["GPT-4o", "Claude 3", "Gemini 1.5", "DeepSeek", "Qwen", "Whisper", "LLaMA 3", "Moonshot"].map((model, i) => (
              <div 
                key={i}
                className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">{model}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Loved by Learners</h2>
            <p className="text-lg text-muted-foreground">Join thousands of successful students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{t.quote}"</p>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join 50,000+ Zambian students already learning with BrightSphere AI
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/welcome')}
              className="text-lg px-8 py-6"
            >
              Start Free Today <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/about')}
              className="text-lg px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={brightSphereLogo} alt="BrightSphere" className="w-8 h-8" />
              <span className="font-bold text-lg">BrightSphere AI</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button onClick={() => navigate('/about')}>About</button>
              <button onClick={() => navigate('/contact')}>Contact</button>
              <button onClick={() => navigate('/courses')}>Courses</button>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 BrightSphere AI. Made with ❤️ in Zambia
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
