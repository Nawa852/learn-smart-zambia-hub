import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Brain, Camera, BookOpen, Target,
  Check, Sparkles, Zap, GraduationCap, Users, Building, Globe,
  Mail, Heart, Shield, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import EduZambiaLogo from '@/assets/edu-zambia-logo.svg';

const features = [
  {
    icon: Brain,
    title: 'AI Tutor',
    desc: 'Chat with an AI that adapts to your learning style. Available 24/7 in 7 Zambian languages.',
    glow: 'hsl(172 80% 55% / 0.15)',
  },
  {
    icon: Camera,
    title: 'Snap & Solve',
    desc: 'Take a photo of any homework problem and get step-by-step solutions instantly.',
    glow: 'hsl(262 83% 65% / 0.15)',
  },
  {
    icon: Target,
    title: 'Practice Lab',
    desc: 'ECZ-aligned quizzes that adapt to your level. Instant feedback on every answer.',
    glow: 'hsl(152 70% 45% / 0.15)',
  },
  {
    icon: BookOpen,
    title: 'Smart Courses',
    desc: 'Personalized learning paths from Grade 7–12 with progress tracking and certificates.',
    glow: 'hsl(38 92% 55% / 0.15)',
  },
];

const stats = [
  { value: '50K+', label: 'Students', icon: GraduationCap },
  { value: '2,500+', label: 'Teachers', icon: Users },
  { value: '150+', label: 'Schools', icon: Building },
  { value: '10', label: 'Provinces', icon: Globe },
];

const MVPLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 overflow-hidden">
              <img src={EduZambiaLogo} alt="Edu Zambia" className="w-7 h-7" />
            </div>
            <span className="font-bold text-lg text-foreground tracking-tight">Edu Zambia</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/auth')} className="text-muted-foreground hover:text-foreground">
              Log in
            </Button>
            <Button size="sm" onClick={() => navigate('/auth?mode=signup')} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-card">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Zambia's #1 AI Learning Platform
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            <span className="text-foreground">Learn Anything</span>
            <br />
            <span className="text-foreground">with </span>
            <span className="text-primary font-semibold">AI That Gets You</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Snap homework, chat with AI tutors, and ace your ECZ exams — built for Zambian students.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <Button
              size="lg"
              onClick={() => navigate('/auth?mode=signup')}
              className="h-14 px-8 text-base bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-xl shadow-primary/30 glow-primary"
            >
              Start Learning Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/auth')}
              className="h-14 px-8 text-base border-border/50 hover:border-primary/50 hover:bg-primary/5"
            >
              Log In
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            {['No credit card', 'ECZ aligned', 'Works offline'].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Decorative orbiting elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-30">
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ top: '10%', left: '50%', transformOrigin: '0 200px' }}
          />
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-accent"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ top: '50%', left: '10%', transformOrigin: '200px 0' }}
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to <span className="gradient-text">succeed</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Powerful AI tools designed specifically for Zambian learners
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                  <CardContent className="p-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{ background: f.glow, boxShadow: `0 0 30px ${f.glow}` }}
                    >
                      <f.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-lg">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-center p-5 rounded-2xl bg-card/60 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all"
              >
                <s.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold text-foreground mb-1">{s.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 border border-primary/20 p-10 md:p-14 relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[-30%] right-[-20%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[80px]" />
              <div className="absolute bottom-[-30%] left-[-20%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[80px]" />
            </div>
            <div className="relative z-10">
              <Star className="w-10 h-10 text-primary mx-auto mb-5" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Ready to start learning?</h2>
              <p className="text-muted-foreground mb-8 text-lg">Free forever plan. No credit card required.</p>
              <Button
                size="lg"
                onClick={() => navigate('/auth?mode=signup')}
                className="h-14 px-8 text-base bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-xl shadow-primary/30"
              >
                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10 px-4">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-primary-foreground" />
            </div>
            <span>© 2024 Edu Zambia. Made with <Heart className="w-3 h-3 inline text-destructive fill-current" /> in Zambia</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            <a href="mailto:hello@eduzambia.com" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Mail className="w-3 h-3" /> Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MVPLanding;
