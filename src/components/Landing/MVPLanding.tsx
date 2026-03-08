import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Brain, Camera, BookOpen, Target,
  Check, Sparkles, Zap, GraduationCap, Users, Building, Globe,
  Mail, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Brain,
    title: 'AI Tutor',
    desc: 'Chat with an AI that adapts to your learning style. Available 24/7 in 7 Zambian languages.',
    gradient: 'from-primary to-accent',
  },
  {
    icon: Camera,
    title: 'Snap & Solve',
    desc: 'Take a photo of any homework problem and get step-by-step solutions instantly.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Target,
    title: 'Practice Lab',
    desc: 'ECZ-aligned quizzes that adapt to your level. Instant feedback on every answer.',
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    icon: BookOpen,
    title: 'Smart Courses',
    desc: 'Personalized learning paths from Grade 7–12 with progress tracking and certificates.',
    gradient: 'from-orange-500 to-yellow-500',
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
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">Edu Zambia</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
              Log in
            </Button>
            <Button size="sm" onClick={() => navigate('/auth?mode=signup')} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Zambia's #1 AI Learning Platform
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5"
          >
            <span className="text-foreground">Learn Anything with</span>{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI That Gets You
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto"
          >
            Snap homework, chat with AI tutors, and ace your ECZ exams — built for Zambian students.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
          >
            <Button size="lg" onClick={() => navigate('/auth?mode=signup')} className="h-12 px-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/20">
              Start Learning Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth')} className="h-12 px-6">
              Log In
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground"
          >
            {['No credit card', 'ECZ aligned', 'Works offline'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" /> {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Everything you need to <span className="text-primary">succeed</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${f.gradient} flex items-center justify-center mb-3`}>
                      <f.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-4 rounded-xl bg-card border border-border">
                <s.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-accent p-8 text-white">
            <h2 className="text-2xl font-bold mb-3">Ready to start learning?</h2>
            <p className="text-white/80 mb-6 text-sm">Free forever plan. No credit card required.</p>
            <Button size="lg" onClick={() => navigate('/auth?mode=signup')} className="bg-white text-primary hover:bg-white/90 shadow-lg">
              Get Started Free <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>© 2024 Edu Zambia. Made with <Heart className="w-3 h-3 inline text-red-500 fill-red-500" /> in Zambia</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-foreground">About</Link>
            <Link to="/contact" className="hover:text-foreground">Contact</Link>
            <a href="mailto:hello@eduzambia.com" className="hover:text-foreground flex items-center gap-1">
              <Mail className="w-3 h-3" /> Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MVPLanding;
