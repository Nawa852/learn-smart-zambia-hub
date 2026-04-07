import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Brain, BookOpen, Target, Check, Sparkles,
  GraduationCap, Users, Building, Globe, Mail, Heart, Star, Play, Award, Clock, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import eduLogo from '@/assets/edu-zambia-logo-new.png';
import eduIcon from '@/assets/edu-zambia-icon.png';

const features = [
  { icon: Brain, title: 'AI Tutor', desc: 'Personal AI tutor that adapts to how you learn. Ask anything, anytime.' },
  { icon: Target, title: 'ECZ Exam Prep', desc: 'Practice with real past papers, timed simulations, and instant marking.' },
  { icon: BookOpen, title: 'Smart Courses', desc: 'Grade 7–12 courses with video lessons, notes, and progress tracking.' },
  { icon: Award, title: 'Gamified Learning', desc: 'Earn XP, badges, and climb leaderboards as you master subjects.' },
  { icon: Clock, title: 'Focus Mode', desc: 'Distraction-free study sessions with Pomodoro timer and stats.' },
  { icon: Users, title: 'Study Groups', desc: 'Collaborate with classmates, share notes, and learn together.' },
];

const roles = [
  { icon: GraduationCap, title: 'Students', desc: 'AI tutoring, quizzes, and exam prep' },
  { icon: Users, title: 'Teachers', desc: 'Course builder, gradebook, and analytics' },
  { icon: Heart, title: 'Parents', desc: 'Track progress and communicate with teachers' },
  { icon: Building, title: 'Schools', desc: 'Admin dashboard and curriculum management' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const MVPLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={eduIcon} alt="" className="w-8 h-8" />
            <span className="font-bold text-lg text-foreground">Edu Zambia</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#roles" className="hover:text-foreground transition-colors">Who It's For</a>
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/auth')} className="font-medium">
              Log in
            </Button>
            <Button size="sm" onClick={() => navigate('/auth?mode=signup')} className="font-semibold gap-1.5 shadow-sm">
              Sign Up Free <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px]" />
        </div>
        <motion.div variants={stagger} initial="hidden" animate="show" className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            Zambia's AI-Powered Learning Platform
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
            <span className="text-foreground">Study Smarter.</span>
            <br />
            <span className="text-primary">Score Higher.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            AI tutors, ECZ exam practice, smart courses, and study tools — everything Zambian students need to succeed, in one platform.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Button size="lg" onClick={() => navigate('/auth?mode=signup')} className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25 gap-2">
              Start Learning — It's Free
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/about')} className="h-12 px-8 text-base font-semibold gap-2">
              <Play className="w-4 h-4 fill-current" />
              See How It Works
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {['100% Free', 'ECZ Aligned', 'Works Offline'].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="py-8 border-y border-border/40 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { n: '50K+', l: 'Students', icon: GraduationCap },
              { n: '2,500+', l: 'Teachers', icon: Users },
              { n: '150+', l: 'Schools', icon: Building },
              { n: '10', l: 'Provinces', icon: Globe },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <s.icon className="w-5 h-5 text-primary mx-auto mb-1.5" />
                <p className="text-2xl font-bold text-foreground">{s.n}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Everything You Need to <span className="text-primary">Succeed</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Powerful AI tools built specifically for Zambian students and educators</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Card className="h-full border-border/50 bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all">
                      <f.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section id="roles" className="py-20 px-4 bg-card/50 border-y border-border/40">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Built for <span className="text-primary">Everyone</span></h2>
            <p className="text-muted-foreground">Whether you're a student, teacher, parent, or admin — we've got you covered</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {roles.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <r.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{r.title}</h3>
                    <p className="text-sm text-muted-foreground">{r.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Zap className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Ready to Transform Your Learning?</h2>
            <p className="text-muted-foreground mb-8 text-lg">Join thousands of Zambian students already learning smarter with AI.</p>
            <Button size="lg" onClick={() => navigate('/auth?mode=signup')} className="h-12 px-10 text-base font-semibold shadow-lg shadow-primary/25 gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="text-xs text-muted-foreground mt-4">No credit card required • Free forever plan</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <img src={eduIcon} alt="" className="w-5 h-5" />
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
