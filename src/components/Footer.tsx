
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 mx-auto py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg zambia-gradient flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">Learn Smart Zambia</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering Zambian learners with AI-powered education. 
              Building the future of learning, one student at a time.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="hover:text-zambia-copper">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-zambia-copper">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-zambia-copper">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-zambia-copper">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-zambia-copper transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-zambia-copper transition-colors">Courses</a></li>
              <li><a href="#" className="text-gray-400 hover:text-zambia-copper transition-colors">Instructors</a></li>
              <li><a href="#" className="text-gray-400 hover:text-zambia-copper transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-zambia-copper transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-zambia-copper transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-zambia-copper transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-zambia-copper transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-zambia-copper transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-zambia-copper transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Stay Connected</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@learnsmartzambia.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+260 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Lusaka, Zambia</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Newsletter</h4>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Your email" 
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button className="bg-zambia-copper hover:bg-orange-600">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Learn Smart Zambia Hub. All rights reserved. Built with ❤️ for Zambian learners.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
