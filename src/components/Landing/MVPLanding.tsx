import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Brain, Camera, BookOpen, Target,
  Check, Sparkles, Zap, GraduationCap, Users, Building, Globe,
  Mail, Heart, Shield, Star, Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import AnimatedCounter from '@/components/UI/AnimatedCounter';
import EduZambiaLogo from '@/assets/edu-zambia-logo.svg';

const features = [
  {
    icon: Brain,
    title: 'AI Tutor',
    desc: 'Chat with an AI that adapts to your learning style. Available 24/7 in 7 Zambian languages.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Camera,
    title: 'Snap & Solve',
    desc: 'Take a photo of any homework problem and get step-by-step solutions instantly.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Target,
    title: 'Practice Lab',
    desc: 'ECZ-aligned quizzes that adapt to your level. Instant feedback on every answer.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: BookOpen,
    title: 'Smart Courses',
    desc: 'Personalized learning paths from Grade 7–12 with progress tracking and certificates.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
];

const stats = [
  { value: 50000, label: 'Students', icon: GraduationCap, suffix: '+' },
  { value: 2500, label: 'Teachers', icon: Users, suffix: '+' },
  { value: 150, label: 'Schools', icon: Building, suffix: '+' },
  { value: 10, label: 'Provinces', icon: Globe, suffix: '' },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const MVPLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center overflow-hidden shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow">
              <img src={EduZambiaLogo} alt="Edu Zambia" className="w-6 h-6" />
            </div>
            <span className="font-bold text-foreground tracking-tight">Edu Zambia</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/auth')} className="text-muted-foreground hover:text-foreground">
              Log in
            </Button>
            <Button size="sm" onClick={() => navigate('/auth?mode=signup')} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-card gap-1.5">
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="container mx-auto max-w-3xl text-center relative z-10"
        >
          <motion.div variants={fadeUp}>
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-medium">
              <Sparkles className="w-3 h-3 mr-1.5" />
              Zambia's #1 AI Learning Platform
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-5"
          >
            <span className="text-foreground">Learn Anything</span>
            <br />
            <span className="text-foreground">with </span>
            <span className="text-primary">AI That Gets You</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed"
          >
            Snap homework, chat with AI tutors, and ace your ECZ exams — built for Zambian students.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Button
              size="lg"
              onClick={() => navigate('/auth?mode=signup')}
              className="h-12 px-7 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 interactive gap-2"
            >
              Start Learning Free
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/auth')}
              className="h-12 px-7 text-sm font-semibold border-border hover:border-primary/40 hover:bg-primary/5 interactive"
            >
              <Play className="w-3.5 h-3.5 mr-1.5 fill-current" />
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
          >
            {['No credit card', 'ECZ aligned', 'Works offline'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-accent/15 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-accent" />
                </div>
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Everything you need to <span className="text-primary">succeed</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
              Powerful AI tools designed specifically for Zambian learners
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                  <CardContent className="p-5">
                    <div className={`w-10 h-10 rounded-lg ${f.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <f.icon className={`w-5 h-5 ${f.color}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1.5">{f.title}</h3>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-center p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all group"
              >
                <s.icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-2xl sm:text-3xl font-bold text-foreground mb-0.5">
                  <AnimatedCounter end={s.value} suffix={s.suffix} duration={2000} />
                </p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">{s.label}</p>
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
            className="rounded-2xl bg-card border border-border/50 p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[-30%] right-[-20%] w-[50%] h-[50%] rounded-full bg-primary/8 blur-[80px]" />
              <div className="absolute bottom-[-30%] left-[-20%] w-[40%] h-[40%] rounded-full bg-accent/8 blur-[80px]" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground">Ready to start learning?</h2>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">Free forever plan. No credit card required.</p>
              <Button
                size="lg"
                onClick={() => navigate('/auth?mode=signup')}
                className="h-12 px-8 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 interactive gap-2"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-primary-foreground" />
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
