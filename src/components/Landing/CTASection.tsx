import { motion } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Play, Users, GraduationCap, 
  Stethoscope, Building2, Heart, Briefcase, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const roles = [
  { icon: GraduationCap, label: 'Student', color: 'from-blue-500 to-indigo-600' },
  { icon: Users, label: 'Teacher', color: 'from-purple-500 to-violet-600' },
  { icon: Heart, label: 'Parent', color: 'from-emerald-500 to-green-600' },
  { icon: Stethoscope, label: 'Healthcare', color: 'from-red-500 to-rose-600' },
  { icon: Building2, label: 'Institution', color: 'from-amber-500 to-orange-600' },
  { icon: Briefcase, label: 'Professional', color: 'from-cyan-500 to-teal-600' },
];

const benefits = [
  'Free to start — no credit card',
  'Works offline across Zambia',
  'ECZ curriculum aligned',
  '7 local languages supported',
];

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-95" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0tNC00aC0ydi0yaDJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-20 w-20 h-20 rounded-full bg-white/10 blur-xl"
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-white/10 blur-xl"
        animate={{ y: [0, 20, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Join 50,000+ Zambian learners
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Start Your AI-Powered
              <br />
              Learning Journey Today
            </h2>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Whether you're a student, teacher, parent, or professional — 
              BrightSphere adapts to your unique learning needs
            </p>
          </motion.div>

          {/* Role selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {roles.map((role, idx) => (
              <motion.button
                key={role.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                onClick={() => navigate('/welcome')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${role.color} flex items-center justify-center`}>
                  <role.icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">{role.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Main CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-10"
          >
            <Button
              size="lg"
              onClick={() => navigate('/welcome')}
              className="bg-white text-primary hover:bg-white/90 shadow-2xl h-14 px-8 text-lg font-semibold"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 h-14 px-8 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-white/80">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
