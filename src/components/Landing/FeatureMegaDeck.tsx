import { motion } from 'framer-motion';
import { 
  Brain, Building2, BarChart3, Users, Zap, Wifi, Map, Network,
  Sparkles, ChevronRight, Play, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Feature {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  description: string;
  highlights: string[];
}

const features: Feature[] = [
  {
    id: 'adaptive',
    title: 'Adaptive Learning Engine',
    icon: Brain,
    color: 'from-blue-500 to-indigo-600',
    description: 'Personalized learning pathways that evolve with every interaction',
    highlights: [
      'Dynamic progress heatmaps',
      'Multi-format content (text, video, VR)',
      'AI-generated quizzes',
      'Predictive performance analysis'
    ]
  },
  {
    id: 'institutional',
    title: 'Institutional Intelligence',
    icon: Building2,
    color: 'from-amber-500 to-orange-600',
    description: 'Comprehensive dashboards for schools, hospitals, and NGOs',
    highlights: [
      'Multi-institution dashboards',
      'Regional performance comparison',
      'AI workload optimization',
      'Smart resource allocation'
    ]
  },
  {
    id: 'impact',
    title: 'Impact & Analytics Engine',
    icon: BarChart3,
    color: 'from-emerald-500 to-green-600',
    description: 'Nationwide impact visualizations and predictive modeling',
    highlights: [
      'Real-time impact metrics',
      'Stakeholder-specific insights',
      'What-if scenario modeling',
      'AI-powered storytelling reports'
    ]
  },
  {
    id: 'collaboration',
    title: 'Collaboration & Mentorship',
    icon: Users,
    color: 'from-purple-500 to-violet-600',
    description: 'Expert networks with AI-powered matchmaking',
    highlights: [
      'Expert network matching',
      'Project collaboration spaces',
      'Mentorship tracking',
      'AI peer learning suggestions'
    ]
  },
  {
    id: 'automation',
    title: 'AI Assistance & Automation',
    icon: Zap,
    color: 'from-pink-500 to-rose-600',
    description: 'Smart automation for all stakeholders',
    highlights: [
      'Task automation',
      'Smart notifications',
      'AI-generated schedules',
      'Decision support engine'
    ]
  },
  {
    id: 'offline',
    title: 'Offline-First Intelligence',
    icon: Wifi,
    color: 'from-cyan-500 to-teal-600',
    description: 'Learning without internet barriers',
    highlights: [
      'Downloadable learning packs',
      'SMS/USSD integration',
      'Solar device support',
      'Auto-sync when online'
    ]
  },
  {
    id: 'mapper',
    title: 'National Opportunity Mapper',
    icon: Map,
    color: 'from-red-500 to-rose-600',
    description: 'Dynamic map of opportunities across Zambia',
    highlights: [
      'Gap detection by region',
      'Investment recommendations',
      'Volunteer program matching',
      'District impact heatmaps'
    ]
  },
  {
    id: 'cross',
    title: 'Cross-Stakeholder Intelligence',
    icon: Network,
    color: 'from-indigo-500 to-purple-600',
    description: 'Contextual AI suggestions across sectors',
    highlights: [
      'Cross-sector recommendations',
      'Knowledge fusion',
      'National development insights',
      'Unified intelligence layer'
    ]
  },
];

const FeatureMegaDeck = () => {
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            BrightSphere Feature Mega-Deck
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Intelligence for Every Zambian
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Each feature is interactive, multi-layered, and dynamic — showing real-time simulations and AI recommendations
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setActiveFeature(activeFeature?.id === feature.id ? null : feature)}
              className={`group relative bg-card rounded-2xl border border-border/50 p-6 cursor-pointer transition-all duration-500 ${
                activeFeature?.id === feature.id 
                  ? 'ring-2 ring-primary shadow-2xl scale-[1.02]' 
                  : 'hover:shadow-xl hover:border-primary/30'
              }`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </motion.div>
              
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
              
              {/* Highlights - show on hover or active */}
              <motion.div
                initial={false}
                animate={{ 
                  height: hoveredIndex === index || activeFeature?.id === feature.id ? 'auto' : 0,
                  opacity: hoveredIndex === index || activeFeature?.id === feature.id ? 1 : 0
                }}
                className="overflow-hidden"
              >
                <ul className="space-y-2 pt-4 border-t border-border/50">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-3 h-3 text-primary" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Expand indicator */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                <span className="text-xs text-muted-foreground">Click to explore</span>
                <ArrowRight className={`w-4 h-4 text-primary transition-transform duration-300 ${
                  activeFeature?.id === feature.id ? 'rotate-90' : 'group-hover:translate-x-1'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Demo CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-xl px-8"
          >
            <Play className="w-5 h-5 mr-2" />
            Watch Interactive Demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureMegaDeck;
