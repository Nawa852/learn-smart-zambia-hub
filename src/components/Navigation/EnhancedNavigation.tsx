
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  BookOpen,
  Users,
  Trophy,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  Sparkles,
  Zap,
  Globe,
  TreePine
} from 'lucide-react';
import { useAuth } from '@/components/Auth/AuthProvider';
import ModernCard from '@/components/UI/ModernCard';

const EnhancedNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Brain },
    { path: '/ai-learning-lab', label: 'AI Lab', icon: Sparkles },
    { path: '/knowledge-tree', label: 'Knowledge Tree', icon: TreePine },
    { path: '/courses', label: 'Courses', icon: BookOpen },
    { path: '/study-groups', label: 'Study Groups', icon: Users },
    { path: '/achievements', label: 'Achievements', icon: Trophy },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <>
      {/* Main Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LearningVerse
              </span>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                🇿🇲 Zambia
              </Badge>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {user && navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 group ${
                    isActivePath(item.path)
                      ? 'bg-blue-500/20 text-blue-600 shadow-lg'
                      : 'text-gray-600 hover:bg-white/10 hover:text-blue-600'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActivePath(item.path) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {/* Search */}
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    <Search className="w-4 h-4" />
                  </Button>

                  {/* Notifications */}
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  </Button>

                  {/* Profile */}
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Sign Out */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => signOut()}
                    className="hidden md:flex"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-xl">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-2">
                {user && navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                      isActivePath(item.path)
                        ? 'bg-blue-500/20 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                
                {user && (
                  <Button 
                    variant="outline" 
                    onClick={() => signOut()}
                    className="w-full mt-4"
                  >
                    Sign Out
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default EnhancedNavigation;
