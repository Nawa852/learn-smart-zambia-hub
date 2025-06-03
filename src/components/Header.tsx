
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Menu, X, Brain, Wand2, Target } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'AI Tutor', href: '/ai-tutor', icon: Brain },
    { name: 'Adaptive Learning', href: '/adaptive-learning', icon: Target },
    { name: 'Content Studio', href: '/ai-content-studio', icon: Wand2 },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Analytics', href: '/analytics' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-r from-zambia-copper to-zambia-emerald rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-zambia-copper to-zambia-emerald bg-clip-text text-transparent">
                Learn Smart
              </span>
              <span className="text-xs text-gray-600 -mt-1">Zambia Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-zambia-copper hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to="/landing-verse">
              <Button variant="outline" className="border-zambia-emerald text-zambia-emerald hover:bg-zambia-emerald hover:text-white">
                Explore Demo
              </Button>
            </Link>
            <Button className="bg-zambia-copper hover:bg-orange-700 text-white shadow-lg">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-zambia-copper hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-zambia-copper hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="flex flex-col space-y-3 mt-6 px-4">
              <Link to="/landing-verse">
                <Button 
                  variant="outline" 
                  className="w-full border-zambia-emerald text-zambia-emerald hover:bg-zambia-emerald hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Explore Demo
                </Button>
              </Link>
              <Button 
                className="w-full bg-zambia-copper hover:bg-orange-700 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
