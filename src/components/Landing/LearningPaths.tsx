import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, Briefcase, Stethoscope, Code, Calculator, 
  FlaskConical, BookOpen, Globe, Music, Palette, Trophy,
  Clock, Users, Star, ChevronRight, Play, Lock, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface LearningPath {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  color: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  enrolled: number;
  rating: number;
  modules: number;
  description: string;
  skills: string[];
  isECZ: boolean;
  isFree: boolean;
}

const learningPaths: LearningPath[] = [
  {
    id: 'ecz-grade-12-math',
    title: 'ECZ Grade 12 Mathematics',
    category: 'ECZ Curriculum',
    icon: Calculator,
    color: 'from-blue-500 to-indigo-600',
    level: 'Advanced',
    duration: '6 months',
    enrolled: 12500,
    rating: 4.9,
    modules: 24,
    description: 'Complete Grade 12 math preparation for ECZ exams with AI practice tests',
    skills: ['Calculus', 'Algebra', 'Statistics', 'Trigonometry'],
    isECZ: true,
    isFree: true,
  },
  {
    id: 'ecz-biology',
    title: 'ECZ Biology Mastery',
    category: 'ECZ Curriculum',
    icon: FlaskConical,
    color: 'from-emerald-500 to-green-600',
    level: 'Intermediate',
    duration: '5 months',
    enrolled: 8900,
    rating: 4.8,
    modules: 20,
    description: 'From cells to ecosystems — master biology with interactive simulations',
    skills: ['Cell Biology', 'Genetics', 'Ecology', 'Human Biology'],
    isECZ: true,
    isFree: true,
  },
  {
    id: 'python-programming',
    title: 'Python for Beginners',
    category: 'Technology',
    icon: Code,
    color: 'from-yellow-500 to-orange-500',
    level: 'Beginner',
    duration: '3 months',
    enrolled: 15200,
    rating: 4.9,
    modules: 16,
    description: 'Learn to code from scratch with hands-on projects and AI mentorship',
    skills: ['Python Basics', 'Data Structures', 'Web Scraping', 'Automation'],
    isECZ: false,
    isFree: true,
  },
  {
    id: 'medical-sciences',
    title: 'Pre-Medical Sciences',
    category: 'Healthcare',
    icon: Stethoscope,
    color: 'from-red-500 to-rose-600',
    level: 'Advanced',
    duration: '8 months',
    enrolled: 5600,
    rating: 4.7,
    modules: 32,
    description: 'Foundation for aspiring medical professionals with clinical case studies',
    skills: ['Anatomy', 'Physiology', 'Biochemistry', 'Medical Ethics'],
    isECZ: false,
    isFree: false,
  },
  {
    id: 'business-foundations',
    title: 'Business Foundations',
    category: 'Business',
    icon: Briefcase,
    color: 'from-purple-500 to-violet-600',
    level: 'Beginner',
    duration: '4 months',
    enrolled: 7800,
    rating: 4.6,
    modules: 18,
    description: 'Essential business skills for entrepreneurs and professionals',
    skills: ['Accounting', 'Marketing', 'Management', 'Finance'],
    isECZ: false,
    isFree: true,
  },
  {
    id: 'english-mastery',
    title: 'English Language Mastery',
    category: 'Languages',
    icon: Globe,
    color: 'from-cyan-500 to-teal-600',
    level: 'Intermediate',
    duration: '6 months',
    enrolled: 18500,
    rating: 4.8,
    modules: 22,
    description: 'From basic grammar to advanced writing with AI conversation practice',
    skills: ['Grammar', 'Writing', 'Speaking', 'Vocabulary'],
    isECZ: true,
    isFree: true,
  },
];

const categories = ['All', 'ECZ Curriculum', 'Technology', 'Healthcare', 'Business', 'Languages'];

const LearningPaths = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const filteredPaths = activeCategory === 'All' 
    ? learningPaths 
    : learningPaths.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            <BookOpen className="w-3 h-3 mr-1" />
            Learning Paths
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Master Any Subject with</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI-Guided Learning Paths
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Structured courses from ECZ curriculum to professional skills — 
            personalized by AI to match your learning style
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Paths grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.map((path, idx) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredPath(path.id)}
              onMouseLeave={() => setHoveredPath(null)}
              className="group"
            >
              <div className={`relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 ${
                hoveredPath === path.id ? 'shadow-2xl border-primary/30 -translate-y-1' : 'shadow-lg'
              }`}>
                {/* Header gradient */}
                <div className={`h-32 bg-gradient-to-br ${path.color} relative`}>
                  <div className="absolute inset-0 bg-black/10" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {path.isECZ && (
                      <Badge className="bg-white/90 text-foreground">
                        <GraduationCap className="w-3 h-3 mr-1" />
                        ECZ
                      </Badge>
                    )}
                    {path.isFree ? (
                      <Badge className="bg-emerald-500 text-white">Free</Badge>
                    ) : (
                      <Badge className="bg-yellow-500 text-white">
                        <Lock className="w-3 h-3 mr-1" />
                        Pro
                      </Badge>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-2xl bg-card border border-border shadow-lg flex items-center justify-center">
                    <path.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-12">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{path.level}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium text-foreground">{path.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {path.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {path.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {path.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {path.modules} modules
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {path.enrolled.toLocaleString()}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {path.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="text-[10px] px-2 py-1 bg-muted rounded-full text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                    {path.skills.length > 3 && (
                      <span className="text-[10px] px-2 py-1 bg-muted rounded-full text-muted-foreground">
                        +{path.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <Button className="w-full group/btn" variant={path.isFree ? "default" : "outline"}>
                    {path.isFree ? 'Start Learning' : 'View Details'}
                    <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" className="px-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Explore All 100+ Learning Paths
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningPaths;
