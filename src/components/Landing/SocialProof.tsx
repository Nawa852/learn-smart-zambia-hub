import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Star, Quote, Play, ChevronLeft, ChevronRight, 
  TrendingUp, Award, GraduationCap, Building2,
  MapPin, Clock, Heart, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  quote: string;
  rating: number;
  metric: { label: string; value: string; change: string };
  video?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Mwila Chanda',
    role: 'Grade 12 Student',
    location: 'Lusaka',
    avatar: '👨🏾‍🎓',
    quote: 'The AI tutor explained calculus in a way that finally made sense. I went from failing to scoring 85% in my ECZ exams!',
    rating: 5,
    metric: { label: 'Math Score', value: '85%', change: '+40%' },
    video: true,
  },
  {
    id: '2',
    name: 'Grace Mwamba',
    role: 'Science Teacher',
    location: 'Copperbelt',
    avatar: '👩🏾‍🏫',
    quote: 'The lesson generator saves me 3 hours daily. My students are more engaged with the interactive content.',
    rating: 5,
    metric: { label: 'Time Saved', value: '15hrs', change: '/week' },
  },
  {
    id: '3',
    name: 'David Ng\'andu',
    role: 'Parent of 3',
    location: 'Ndola',
    avatar: '👨🏾',
    quote: 'I can finally help my children with homework using the AI. The Bemba translations are perfect!',
    rating: 5,
    metric: { label: 'Kids Helped', value: '3', change: 'daily' },
  },
  {
    id: '4',
    name: 'Chilufya School',
    role: 'Rural Institution',
    location: 'Northern Province',
    avatar: '🏫',
    quote: 'Even with poor internet, our students access quality education through offline packs. Pass rates up 45%!',
    rating: 5,
    metric: { label: 'Pass Rate', value: '87%', change: '+45%' },
    video: true,
  },
];

const stats = [
  { value: '50,000+', label: 'Active Students', icon: GraduationCap },
  { value: '98%', label: 'Satisfaction Rate', icon: Heart },
  { value: '2.5K+', label: 'Educators', icon: Award },
  { value: '10', label: 'Provinces Covered', icon: MapPin },
];

const SocialProof = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Trusted by</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              50,000+ Zambians
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from students, teachers, and parents transforming education across Zambia
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, idx) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-card border border-border">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Main testimonial carousel */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-card rounded-3xl border border-border shadow-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-[1.2fr,1fr]">
              {/* Left - Quote */}
              <div className="p-8 md:p-12">
                <Quote className="w-12 h-12 text-primary/20 mb-6" />
                
                <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                  "{current.quote}"
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{current.avatar}</div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">{current.name}</h4>
                    <p className="text-muted-foreground">{current.role}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {current.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < current.rating ? 'text-yellow-500 fill-current' : 'text-muted'
                      }`}
                    />
                  ))}
                </div>

                {current.video && (
                  <Button variant="outline" className="gap-2">
                    <Play className="w-4 h-4" />
                    Watch Video Story
                  </Button>
                )}
              </div>

              {/* Right - Metric */}
              <div className="bg-gradient-to-br from-primary to-accent p-8 md:p-12 flex flex-col items-center justify-center text-center text-white">
                <p className="text-sm font-medium text-white/80 mb-2">{current.metric.label}</p>
                <p className="text-6xl md:text-7xl font-bold mb-2">{current.metric.value}</p>
                <div className="flex items-center gap-1 text-lg">
                  <TrendingUp className="w-5 h-5" />
                  <span>{current.metric.change}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full w-12 h-12"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-8 bg-primary'
                      : 'bg-muted hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full w-12 h-12"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mini testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16"
        >
          {testimonials.filter((_, i) => i !== currentIndex).slice(0, 3).map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setCurrentIndex(testimonials.findIndex(x => x.id === t.id))}
              className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">{t.avatar}</div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">"{t.quote}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
