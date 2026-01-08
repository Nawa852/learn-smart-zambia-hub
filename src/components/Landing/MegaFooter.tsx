import { motion } from 'framer-motion';
import { 
  GraduationCap, Shield, Globe, Award, Mail, Phone, MapPin,
  Facebook, Twitter, Linkedin, Youtube, Instagram,
  ExternalLink, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const partners = [
  { name: 'ECZ', description: 'Examination Council of Zambia' },
  { name: 'Ministry of Education', description: 'Government of Zambia' },
  { name: 'UNZA', description: 'University of Zambia' },
  { name: 'UNESCO', description: 'United Nations' },
  { name: 'UNICEF', description: 'Child Education' },
  { name: 'World Bank', description: 'Development Partner' },
];

const quickLinks = [
  {
    title: 'Stakeholder Portals',
    links: [
      { name: 'Student Dashboard', href: '/dashboard' },
      { name: 'Teacher Portal', href: '/dashboard' },
      { name: 'Parent Access', href: '/dashboard' },
      { name: 'Institution Admin', href: '/dashboard' },
    ]
  },
  {
    title: 'AI Knowledge Hub',
    links: [
      { name: 'AI Tutor Chat', href: '/ai' },
      { name: 'Learning Analytics', href: '/analytics' },
      { name: 'Study Materials', href: '/study-materials' },
      { name: 'Video Learning', href: '/video-learning' },
    ]
  },
  {
    title: 'Offline Resources',
    links: [
      { name: 'Download Packs', href: '/study-materials' },
      { name: 'SMS Learning', href: '#' },
      { name: 'Community Kiosks', href: '#' },
      { name: 'Radio Programs', href: '#' },
    ]
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', href: '/contact' },
      { name: 'FAQs', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Report Issue', href: '/contact' },
    ]
  },
];

const certifications = [
  { icon: Shield, label: 'ISO 27001 Certified' },
  { icon: Award, label: 'ECZ Approved' },
  { icon: Globe, label: 'UNESCO Partner' },
];

const MegaFooter = () => {
  return (
    <footer className="relative bg-gradient-to-b from-muted/50 to-background border-t border-border">
      {/* CTA Banner */}
      <div className="container mx-auto px-6 -mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-accent to-primary p-8 md:p-12 shadow-2xl"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0tNC00aC0ydi0yaDJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Ready to Transform Learning?
              </h3>
              <p className="text-white/80">
                Join 50,000+ Zambians on their AI-powered education journey
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                Request Demo
              </Button>
              <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                Join Beta Program
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Partners Row */}
        <div className="mb-12 pb-12 border-b border-border">
          <p className="text-sm text-muted-foreground text-center mb-6">Trusted by National Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner, idx) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{partner.name}</p>
                <p className="text-xs text-muted-foreground">{partner.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg text-foreground">EDU ZAMBIA</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Powered by BrightSphere</span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              Intelligence for Every Zambian
            </p>

            {/* Contact */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>support@eduzambia.ai</span>
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

          {/* Quick Links */}
          {quickLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications & Social */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8 border-t border-border">
          {/* Certifications */}
          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                <cert.icon className="w-4 h-4 text-primary" />
                <span>{cert.label}</span>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Linkedin, Youtube, Instagram].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Edu Zambia. All rights reserved. 
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </p>
          <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-accent" />
            Powered by BrightSphere — Intelligence for Every Zambian
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MegaFooter;
