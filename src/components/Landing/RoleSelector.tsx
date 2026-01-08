import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Stethoscope, Users, Building2, Heart, Briefcase,
  BookOpen, Brain, TrendingUp, Target, Sparkles, ChevronRight, 
  Award, MessageSquare, BarChart3, Lightbulb, Calendar, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RoleModule {
  name: string;
  icon: React.ElementType;
  description: string;
}

interface Role {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  description: string;
  modules: RoleModule[];
}

const roles: Role[] = [
  {
    id: 'educators',
    name: 'Educators',
    icon: GraduationCap,
    color: 'from-blue-500 to-blue-600',
    gradient: 'from-blue-500/20 to-blue-600/5',
    description: 'Empower your teaching with AI-powered tools',
    modules: [
      { name: 'Lesson AI Generator', icon: Lightbulb, description: 'Create engaging lessons in seconds' },
      { name: 'Curriculum Analyzer', icon: BookOpen, description: 'ECZ-aligned curriculum mapping' },
      { name: 'Student Progress Predictor', icon: TrendingUp, description: 'AI-powered performance insights' },
      { name: 'Gamified Teaching Lab', icon: Award, description: 'Interactive learning experiences' },
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare Providers',
    icon: Stethoscope,
    color: 'from-red-500 to-rose-600',
    gradient: 'from-red-500/20 to-rose-600/5',
    description: 'Medical education and training excellence',
    modules: [
      { name: 'Training Hub', icon: Brain, description: 'Continuous medical education' },
      { name: 'Patient Knowledge AI', icon: MessageSquare, description: 'Evidence-based guidance' },
      { name: 'Preventive Care AI', icon: Heart, description: 'Community health programs' },
      { name: 'Emergency Planning', icon: Target, description: 'Crisis response training' },
    ]
  },
  {
    id: 'parents',
    name: 'Parents & Guardians',
    icon: Users,
    color: 'from-emerald-500 to-green-600',
    gradient: 'from-emerald-500/20 to-green-600/5',
    description: 'Stay connected with your child\'s learning journey',
    modules: [
      { name: 'Child Progress Tracker', icon: BarChart3, description: 'Real-time performance updates' },
      { name: 'AI Tutor Suggestions', icon: Sparkles, description: 'Personalized learning tips' },
      { name: 'Family Learning Plans', icon: Calendar, description: 'Study schedules for home' },
      { name: 'Local Resource Finder', icon: Target, description: 'Nearby educational resources' },
    ]
  },
  {
    id: 'ngos',
    name: 'NGOs & Sponsors',
    icon: Heart,
    color: 'from-purple-500 to-violet-600',
    gradient: 'from-purple-500/20 to-violet-600/5',
    description: 'Maximize your impact with data-driven insights',
    modules: [
      { name: 'Impact Analyzer', icon: TrendingUp, description: 'Measure program effectiveness' },
      { name: 'Funding Optimizer', icon: Target, description: 'Resource allocation AI' },
      { name: 'Community Connection', icon: Users, description: 'Stakeholder engagement hub' },
      { name: 'Volunteer Tracker', icon: Award, description: 'Manage volunteer programs' },
    ]
  },
  {
    id: 'institutions',
    name: 'Schools & Institutions',
    icon: Building2,
    color: 'from-amber-500 to-orange-600',
    gradient: 'from-amber-500/20 to-orange-600/5',
    description: 'Transform institutional management with AI',
    modules: [
      { name: 'Institutional Dashboard', icon: BarChart3, description: 'Comprehensive analytics' },
      { name: 'Teacher Efficiency Monitor', icon: TrendingUp, description: 'Staff performance insights' },
      { name: 'Curriculum Compliance', icon: BookOpen, description: 'ECZ standards tracking' },
      { name: 'Resource Planner', icon: Calendar, description: 'Optimize resource allocation' },
    ]
  },
  {
    id: 'professionals',
    name: 'Lifelong Learners',
    icon: Briefcase,
    color: 'from-cyan-500 to-teal-600',
    gradient: 'from-cyan-500/20 to-teal-600/5',
    description: 'Advance your career with continuous learning',
    modules: [
      { name: 'Skill Gap Mapper', icon: Target, description: 'Identify growth opportunities' },
      { name: 'Career AI Coach', icon: Brain, description: 'Personalized career guidance' },
      { name: 'Mentorship Network', icon: Users, description: 'Connect with industry experts' },
      { name: 'Micro-Credential Tracker', icon: FileText, description: 'Track certifications' },
    ]
  },
];

const RoleSelector = () => {
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Role-Based Universe
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Pick Your Role. BrightSphere Adapts.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every stakeholder has a personalized AI-powered pathway to learn, grow, and make a difference
          </p>
        </motion.div>

        {/* Role Orbs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {roles.map((role, index) => (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setActiveRole(activeRole?.id === role.id ? null : role);
                setIsExpanded(true);
              }}
              className={`group relative flex flex-col items-center p-6 rounded-2xl transition-all duration-500 ${
                activeRole?.id === role.id 
                  ? `bg-gradient-to-br ${role.gradient} ring-2 ring-primary shadow-2xl scale-105` 
                  : 'bg-card hover:bg-muted/50 shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Animated orb background */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon orb */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${role.color} flex items-center justify-center mb-4 shadow-lg`}
              >
                <role.icon className="w-8 h-8 text-white" />
                {/* Pulse effect */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${role.color} animate-ping opacity-20`} />
              </motion.div>
              
              <h3 className="font-semibold text-sm text-center text-foreground">{role.name}</h3>
              
              {activeRole?.id === role.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Expanded Role Panel */}
        <AnimatePresence mode="wait">
          {activeRole && isExpanded && (
            <motion.div
              key={activeRole.id}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${activeRole.gradient} rounded-3xl p-8 border border-border/50 shadow-2xl`}>
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Role Info */}
                  <div className="lg:w-1/3">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeRole.color} flex items-center justify-center shadow-lg`}>
                        <activeRole.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{activeRole.name}</h3>
                        <p className="text-muted-foreground">{activeRole.description}</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => navigate('/welcome')}
                      className={`w-full bg-gradient-to-r ${activeRole.color} hover:opacity-90 text-white shadow-lg mt-4`}
                    >
                      Get Started as {activeRole.name}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  
                  {/* Modules Grid */}
                  <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeRole.modules.map((module, idx) => (
                      <motion.div
                        key={module.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group bg-card/80 backdrop-blur-sm rounded-xl p-5 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${activeRole.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                            <module.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">{module.name}</h4>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RoleSelector;
