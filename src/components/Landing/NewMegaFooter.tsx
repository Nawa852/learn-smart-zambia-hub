import { motion } from 'framer-motion';
import { 
  GraduationCap, Shield, Globe, Award, Mail, Phone, MapPin,
  Facebook, Twitter, Linkedin, Youtube, Instagram, Sparkles,
  ArrowRight, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const partners = [
  'ECZ', 'Ministry of Education', 'UNZA', 'CBU', 'UNESCO', 'UNICEF'
];

const quickLinks = [
  {
    title: 'Learn',
    links: ['AI Tutor', 'Courses', 'Flashcards', 'Practice Tests', 'Video Lessons']
  },
  {
    title: 'Resources',
    links: ['ECZ Syllabus', 'Past Papers', 'Study Guides', 'Offline Packs', 'SMS Learning']
  },
  {
    title: 'Community',
    links: ['Study Groups', 'Leaderboards', 'Mentorship', 'Forums', 'Events']
  },
  {
    title: 'Support',
    links: ['Help Center', 'Contact Us', 'FAQs', 'Report Bug', 'Feedback']
  }
];

const NewMegaFooter = () => {
  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/50 border-t border-border">
      {/* Newsletter section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center mb-16"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Stay Updated with Edu Zambia
          </h3>
          <p className="text-muted-foreground mb-6">
            Get weekly study tips, new features, and exam prep resources
          </p>
          <div className="flex gap-2">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="h-12"
            />
            <Button className="h-12 px-6 bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        {/* Partners */}
        <div className="mb-12 pb-12 border-b border-border">
          <p className="text-sm text-muted-foreground text-center mb-6">Trusted by National Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner) => (
              <span key={partner} className="font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg text-foreground">EDU ZAMBIA</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Powered by BrightSphere</span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              AI-powered education for every Zambian
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>hello@eduzambia.ai</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+260 211 123 456</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Lusaka, Zambia</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          {quickLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8 border-t border-border">
          {/* Certifications */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              <span>ISO 27001</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Award className="w-4 h-4 text-primary" />
              <span>ECZ Approved</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="w-4 h-4 text-primary" />
              <span>UNESCO Partner</span>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[Facebook, Twitter, Linkedin, Youtube, Instagram].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">
            © {new Date().getFullYear()} Edu Zambia. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="w-3 h-3 text-red-500 fill-current" /> in Zambia
            <span className="mx-2">|</span>
            <Sparkles className="w-3 h-3 text-accent" />
            Powered by BrightSphere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default NewMegaFooter;
