import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/Auth/AuthProvider';
import { motion } from 'framer-motion';
import {
  ArrowRight, Brain, BookOpen, Target, Check, Sparkles,
  GraduationCap, Users, Building, Globe, Mail, Heart, Play, Award, Clock, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0, 0, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

const MVPLanding = () => {
  const { enterDemoMode } = useAuth();
  const navigate = useNavigate();

  const handleDemo = () => {
    enterDemoMode();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar — clean, Google-style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-2xl border-b border-border/30">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={eduIcon} alt="" className="w-7 h-7 sm:w-8 sm:h-8" />
            <span className="font-bold text-base sm:text-lg text-foreground">Edu Zambia</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground font-medium">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#roles" className="hover:text-foreground transition-colors">Who It's For</a>
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button variant="ghost" size="sm" onClick={handleDemo} className="font-medium text-xs h-8 px-3 rounded-full hidden sm:flex">
              Try Demo
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/auth')} className="font-medium h-8 px-3 rounded-full">
              Log in
            </Button>
            <Button size="sm" onClick={() => navigate('/auth?mode=signup')} className="font-semibold gap-1.5 h-8 sm:h-9 px-4 rounded-full shadow-sm">
              Sign Up <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero — spacious, Google-style typography */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-primary/[0.03] blur-[100px]" />
        </div>
        <motion.div variants={stagger} initial="hidden" animate="show" className="container mx-auto max-w-3xl text-center relative z-10">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-semibold mb-6 border border-primary/15">
            <Sparkles className="w-3.5 h-3.5" />
            Zambia's AI-Powered Learning Platform
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-[32px] leading-[1.1] sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5">
            <span className="text-foreground">Study Smarter.</span>
            <br />
            <span className="text-primary">Score Higher.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            AI tutors, ECZ exam practice, smart courses, and study tools — everything Zambian students need to succeed.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <Button size="lg" onClick={() => navigate('/auth?mode=signup')} className="w-full sm:w-auto h-12 px-8 text-[15px] font-semibold rounded-full shadow-lg shadow-primary/20 gap-2">
              Start Learning — It's Free
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={handleDemo} className="w-full sm:w-auto h-12 px-8 text-[15px] font-semibold rounded-full gap-2">
              <Play className="w-4 h-4 fill-current" />
              Try Demo
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground mt-6">
            {['100% Free', 'ECZ Aligned', 'Works Offline'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-accent" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Stats bar — Google-style clean metrics */}
      <section className="py-8 sm:py-10 border-y border-border/30 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              { n: '50K+', l: 'Students', icon: GraduationCap },
              { n: '2,500+', l: 'Teachers', icon: Users },
              { n: '150+', l: 'Schools', icon: Building },
              { n: '10', l: 'Provinces', icon: Globe },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <s.icon className="w-5 h-5 text-primary mx-auto mb-2 opacity-80" />
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{s.n}</p>
                <p className="text-[11px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — Material-style cards */}
      <section id="features" className="py-16 sm:py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2.5">
              Everything You Need to <span className="text-primary">Succeed</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">Powerful AI tools built specifically for Zambian students and educators</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="h-full p-5 rounded-2xl border border-border/30 bg-card hover:border-primary/20 hover:shadow-elevated transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-3.5 group-hover:bg-primary/12 transition-colors">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-[15px] text-foreground mb-1.5">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section id="roles" className="py-16 sm:py-24 px-4 bg-card/30 border-y border-border/30">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2.5">Built for <span className="text-primary">Everyone</span></h2>
            <p className="text-sm sm:text-base text-muted-foreground">Whether you're a student, teacher, parent, or admin</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {roles.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-background border border-border/30 hover:border-primary/20 hover:shadow-card-hover transition-all">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                    <r.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[15px] text-foreground mb-0.5">{r.title}</h3>
                    <p className="text-sm text-muted-foreground">{r.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 px-4">
        <div className="container mx-auto max-w-xl text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-5">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Ready to Transform Your Learning?</h2>
            <p className="text-muted-foreground mb-8 text-sm sm:text-base">Join thousands of Zambian students already learning smarter with AI.</p>
            <Button size="lg" onClick={() => navigate('/auth?mode=signup')} className="h-12 px-10 text-[15px] font-semibold rounded-full shadow-lg shadow-primary/20 gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="text-xs text-muted-foreground mt-4">No credit card required • Free forever plan</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-6 sm:py-8 px-4 bg-card/20">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
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
