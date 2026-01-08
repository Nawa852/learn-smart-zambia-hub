import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Star, Quote, Play, ChevronLeft, ChevronRight, 
  GraduationCap, Stethoscope, Users, Building2, Award
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  quote: string;
  rating: number;
  category: 'student' | 'educator' | 'healthcare' | 'institution' | 'parent';
  impact: { metric: string; value: string };
  videoUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Mwila Chilufya',
    role: 'Grade 12 Student',
    location: 'Lusaka',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    quote: 'BrightSphere helped me improve my mathematics grade from a C to an A. The AI tutor explains concepts in a way that makes sense to me.',
    rating: 5,
    category: 'student',
    impact: { metric: 'Grade Improvement', value: 'C → A' },
  },
  {
    id: '2',
    name: 'Grace Banda',
    role: 'Science Teacher',
    location: 'Copperbelt',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    quote: 'The lesson generator saves me hours of preparation time. My students are more engaged than ever with the interactive content.',
    rating: 5,
    category: 'educator',
    impact: { metric: 'Time Saved', value: '10+ hrs/week' },
  },
  {
    id: '3',
    name: 'Dr. Kenneth Mulenga',
    role: 'Clinical Officer',
    location: 'Northern Province',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
    quote: 'The medical training modules have been invaluable for our rural clinic. We can now access the same quality education as urban centers.',
    rating: 5,
    category: 'healthcare',
    impact: { metric: 'Staff Trained', value: '24 nurses' },
  },
  {
    id: '4',
    name: 'Mercy Tembo',
    role: 'Parent of 3',
    location: 'Southern Province',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    quote: 'I can finally track my children\'s progress without waiting for parent-teacher meetings. The AI suggestions help me support their learning at home.',
    rating: 5,
    category: 'parent',
    impact: { metric: 'Children Helped', value: '3 kids' },
  },
  {
    id: '5',
    name: 'Chama Community School',
    role: 'Rural Institution',
    location: 'Muchinga Province',
    avatar: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=100&h=100&fit=crop',
    quote: 'Even with limited internet, our students can access quality education. The offline packs have transformed our school.',
    rating: 5,
    category: 'institution',
    impact: { metric: 'Pass Rate Increase', value: '+35%' },
  },
];

const categoryIcons = {
  student: GraduationCap,
  educator: Award,
  healthcare: Stethoscope,
  parent: Users,
  institution: Building2,
};

const categoryColors = {
  student: 'from-blue-500 to-indigo-600',
  educator: 'from-purple-500 to-violet-600',
  healthcare: 'from-red-500 to-rose-600',
  parent: 'from-emerald-500 to-green-600',
  institution: 'from-amber-500 to-orange-600',
};

const TestimonialsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = ['all', 'student', 'educator', 'healthcare', 'parent', 'institution'];
  
  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Voices of Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from the students, educators, and communities transforming their futures with BrightSphere
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full w-12 h-12 bg-card shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full w-12 h-12 bg-card shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {filteredTestimonials[currentIndex] && (
              <Card className="p-8 md:p-12 bg-card border-border/50 shadow-2xl">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Avatar & Info */}
                  <div className="flex-shrink-0 text-center md:text-left">
                    <div className="relative inline-block">
                      <img
                        src={filteredTestimonials[currentIndex].avatar}
                        alt={filteredTestimonials[currentIndex].name}
                        className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                      />
                      <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-gradient-to-br ${categoryColors[filteredTestimonials[currentIndex].category]} flex items-center justify-center shadow-lg`}>
                        {(() => {
                          const Icon = categoryIcons[filteredTestimonials[currentIndex].category];
                          return <Icon className="w-4 h-4 text-white" />;
                        })()}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-bold text-foreground">{filteredTestimonials[currentIndex].name}</h4>
                      <p className="text-sm text-muted-foreground">{filteredTestimonials[currentIndex].role}</p>
                      <p className="text-xs text-muted-foreground">{filteredTestimonials[currentIndex].location}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center md:justify-start gap-1 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < filteredTestimonials[currentIndex].rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="flex-1">
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    <p className="text-xl text-foreground leading-relaxed mb-6">
                      "{filteredTestimonials[currentIndex].quote}"
                    </p>

                    {/* Impact Metric */}
                    <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10">
                      <div className="text-primary font-bold text-2xl">
                        {filteredTestimonials[currentIndex].impact.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {filteredTestimonials[currentIndex].impact.metric}
                      </div>
                    </div>

                    {/* Video Button (if available) */}
                    {filteredTestimonials[currentIndex].videoUrl && (
                      <Button variant="ghost" className="ml-4">
                        <Play className="w-4 h-4 mr-2" />
                        Watch Story
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </motion.div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {filteredTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-8 bg-primary'
                    : 'bg-muted hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
