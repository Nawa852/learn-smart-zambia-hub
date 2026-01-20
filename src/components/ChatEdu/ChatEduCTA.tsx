import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Check, Zap, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatEduCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 20, 0] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -30, 0], 
            y: [0, -20, 0] 
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"
        />
        
        {/* Floating icons */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${20 + Math.floor(i / 4) * 60}%`,
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              {i % 4 === 0 && <GraduationCap className="w-6 h-6 text-white/50" />}
              {i % 4 === 1 && <Sparkles className="w-6 h-6 text-white/50" />}
              {i % 4 === 2 && <Zap className="w-6 h-6 text-white/50" />}
              {i % 4 === 3 && <Check className="w-6 h-6 text-white/50" />}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Join 50,000+ Zambian Students</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to Transform
            <br />
            Your Learning?
          </h2>

          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Start with our free plan and experience AI-powered education. 
            No credit card required. Upgrade when you're ready.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
            {[
              'Free forever plan',
              'ECZ curriculum aligned',
              'Works offline',
              'Mobile money payments'
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-white/90">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                {feature}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate('/signup')}
              className="h-14 px-8 text-lg bg-white text-primary hover:bg-white/90 shadow-xl"
            >
              Start Learning Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/contact')}
              className="h-14 px-8 text-lg border-2 border-white/30 text-white hover:bg-white/10"
            >
              Talk to Sales
            </Button>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <p className="text-white/60 text-sm mb-4">
              Trusted by leading Zambian institutions
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/40 text-sm">
              <span>UNZA</span>
              <span>CBU</span>
              <span>Mulungushi</span>
              <span>Ministry of Education</span>
              <span>ZICTA</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatEduCTA;
