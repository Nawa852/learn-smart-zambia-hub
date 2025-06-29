
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Globe, BookOpen, Users, Brain, Utensils, 
  MessageSquare, Upload, Award, Calendar, Bell, ChevronRight,
  Play, Download, Eye, Heart
} from 'lucide-react';

const EnhancedIndex = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  
  const languages = ['English', 'Bemba', 'Nyanja', 'Tonga', 'Lozi'];
  
  const featureHighlights = [
    {
      icon: Brain,
      title: "AI Study Assistant",
      description: "24/7 multilingual AI tutor supporting ECZ & Cambridge curricula",
      color: "bg-blue-500"
    },
    {
      icon: BookOpen,
      title: "Study Materials",
      description: "Access thousands of notes, past papers, and resources",
      color: "bg-green-500"
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Connect with peers, join study groups, find mentors",
      color: "bg-purple-500"
    },
    {
      icon: Utensils,
      title: "Meal Planner",
      description: "Nutrition guidance for optimal learning performance",
      color: "bg-orange-500"
    }
  ];

  const latestContent = [
    {
      type: "upload",
      title: "Grade 12 Biology Notes - Cell Structure",
      author: "Teacher Mwansa",
      time: "2 days ago",
      views: 245,
      likes: 34
    },
    {
      type: "course",
      title: "Advanced Mathematics - Calculus Fundamentals",
      author: "Mr. Phiri",
      time: "1 week ago",
      views: 432,
      likes: 67
    },
    {
      type: "forum",
      title: "ECZ Exam Preparation Tips & Strategies",
      author: "Study Group Lusaka",
      time: "3 days ago",
      views: 156,
      likes: 23
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">EduZambia</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="p-2">
                <Search className="w-5 h-5" />
              </Button>
              
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="text-sm border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to EduZambia!
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Learn smarter with AI, community support, and comprehensive resources tailored for Zambian students
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                  Sign Up Free
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
                  Explore Platform
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Powerful Features for Every Learner
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureHighlights.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Latest Content</h2>
            <Link to="/study-materials">
              <Button variant="outline" className="flex items-center space-x-2">
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestContent.map((content, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="secondary" className="capitalize">
                      {content.type}
                    </Badge>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{content.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{content.likes}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 cursor-pointer">
                    {content.title}
                  </h3>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>by {content.author}</span>
                    <span>{content.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Zambian students already learning smarter with EduZambia
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                Get Started Today
              </Button>
            </Link>
            <Link to="/study-assistant">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
                Try AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-6 h-6" />
                <span className="text-xl font-bold">EduZambia</span>
              </div>
              <p className="text-gray-400">
                Empowering Zambian students with AI-driven education and community support.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
                <li><Link to="/study-assistant" className="hover:text-white">AI Assistant</Link></li>
                <li><Link to="/study-materials" className="hover:text-white">Materials</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/social-feed" className="hover:text-white">Social Feed</Link></li>
                <li><Link to="/study-groups" className="hover:text-white">Study Groups</Link></li>
                <li><Link to="/mentorship-hub" className="hover:text-white">Mentorship</Link></li>
                <li><Link to="/peer-finder" className="hover:text-white">Find Peers</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EduZambia. All rights reserved. Made with ❤️ for Zambian students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedIndex;
