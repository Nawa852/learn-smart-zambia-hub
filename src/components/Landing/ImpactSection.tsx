import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  Users, GraduationCap, Building2, Heart, Briefcase, CheckCircle,
  TrendingUp, Sparkles
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Metric {
  label: string;
  value: number;
  suffix: string;
  icon: React.ElementType;
  color: string;
}

const metrics: Metric[] = [
  { label: 'Students Learning', value: 50000, suffix: '+', icon: GraduationCap, color: 'from-blue-500 to-indigo-600' },
  { label: 'Educators Empowered', value: 2500, suffix: '+', icon: Users, color: 'from-emerald-500 to-green-600' },
  { label: 'Hospitals Connected', value: 120, suffix: '+', icon: Building2, color: 'from-red-500 to-rose-600' },
  { label: 'NGOs Active', value: 85, suffix: '+', icon: Heart, color: 'from-purple-500 to-violet-600' },
  { label: 'Sponsors Participating', value: 150, suffix: '+', icon: Briefcase, color: 'from-amber-500 to-orange-600' },
  { label: 'Projects Completed', value: 1200, suffix: '+', icon: CheckCircle, color: 'from-cyan-500 to-teal-600' },
];

const AnimatedCounter = ({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animationFrame = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('impact-counter');
    if (element) observer.observe(element);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (element) observer.unobserve(element);
    };
  }, [value, duration]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

interface ImpactStory {
  title: string;
  location: string;
  impact: string;
  image: string;
  beforeAfter?: { before: string; after: string };
}

const impactStories: ImpactStory[] = [
  {
    title: 'Rural School Transformation',
    location: 'Northwestern Province',
    impact: '85% improvement in exam pass rates',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop',
    beforeAfter: { before: '42% pass rate', after: '85% pass rate' }
  },
  {
    title: 'Community Health Hub',
    location: 'Luapula Province',
    impact: '12 clinics connected to AI training',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
    beforeAfter: { before: '2 trained staff', after: '24 trained staff' }
  },
  {
    title: 'Youth Empowerment Program',
    location: 'Copperbelt Province',
    impact: '500+ youth skilled in digital literacy',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    beforeAfter: { before: '0% digital skills', after: '78% certified' }
  },
];

const ImpactSection = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="impact-counter">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      
      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Real-Time Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Transforming Zambia's Future
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch the impact unfold in real-time as BrightSphere connects communities across the nation
          </p>
        </motion.div>

        {/* Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <Card className="p-5 text-center bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                {/* Icon */}
                <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Counter */}
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                </div>
                
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                
                {/* Live indicator */}
                <div className="absolute top-2 right-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Impact Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {impactStories.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <Card className="overflow-hidden bg-card border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all duration-500">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-white/80 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      {story.location}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-foreground mb-2">{story.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{story.impact}</p>
                  
                  {/* Before/After */}
                  {story.beforeAfter && (
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Before</p>
                        <p className="text-sm font-semibold text-destructive">{story.beforeAfter.before}</p>
                      </div>
                      <div className="text-primary">→</div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">After</p>
                        <p className="text-sm font-semibold text-emerald-600">{story.beforeAfter.after}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View Full Dashboard CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
            <Sparkles className="w-4 h-4" />
            View Live Impact Dashboard
            <TrendingUp className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
