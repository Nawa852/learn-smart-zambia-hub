
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
  TreePine,
  BarChart3,
  MessageCircle,
  GraduationCap,
  Target,
  Heart,
  MapPin,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/components/Auth/AuthProvider';

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

  const mainNavigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3, color: 'text-blue-600' },
    { path: '/courses', label: 'Courses', icon: BookOpen, color: 'text-green-600' },
    { path: '/learning-analytics', label: 'Analytics', icon: BarChart3, color: 'text-purple-600' },
    { path: '/achievements', label: 'Achievements', icon: Trophy, color: 'text-yellow-600' },
  ];

  const aiNavigationItems = [
    { path: '/ai-learning-lab', label: 'AI Lab', icon: Sparkles, color: 'text-purple-600' },
    { path: '/multi-ai-tutor', label: 'AI Tutor', icon: Brain, color: 'text-blue-600' },
    { path: '/ai-study-helper', label: 'Study Helper', icon: Brain, color: 'text-indigo-600' },
    { path: '/smart-recommendations', label: 'Smart AI', icon: Zap, color: 'text-orange-600' },
  ];

  const socialNavigationItems = [
    { path: '/social-feed', label: 'Social Feed', icon: Heart, color: 'text-red-600' },
    { path: '/study-groups', label: 'Study Groups', icon: Users, color: 'text-green-600' },
    { path: '/messenger', label: 'Messages', icon: MessageCircle, color: 'text-blue-600' },
    { path: '/campus-map', label: 'Campus', icon: MapPin, color: 'text-teal-600' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <>
      {/* Main Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' 
          : 'bg-white/90 backdrop-blur-lg border-b border-gray-200/30'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  EDU ZAMBIA
                </span>
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs self-start">
                  🇿🇲 Learning Platform
                </Badge>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* Main Navigation */}
              <div className="flex items-center space-x-1 mr-6">
                {mainNavigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 group ${
                      isActivePath(item.path)
                        ? 'bg-blue-500/20 text-blue-600 shadow-lg scale-105'
                        : 'text-gray-600 hover:bg-white/60 hover:text-blue-600 hover:scale-105'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActivePath(item.path) ? item.color : ''}`} />
                    <span className="font-medium">{item.label}</span>
                    {isActivePath(item.path) && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    )}
                  </Link>
                ))}
              </div>

              {/* AI Features */}
              <div className="flex items-center space-x-1 mr-6 px-4 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                {aiNavigationItems.slice(0, 2).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 group ${
                      isActivePath(item.path)
                        ? 'bg-purple-500/20 text-purple-600 shadow-lg'
                        : 'text-gray-600 hover:bg-purple-100/60 hover:text-purple-600'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActivePath(item.path) ? item.color : ''}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {/* Quick Actions */}
                  <div className="hidden md:flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="relative hover:bg-blue-50" asChild>
                      <Link to="/semantic-search">
                        <Search className="w-4 h-4" />
                      </Link>
                    </Button>

                    <Button variant="ghost" size="sm" className="relative hover:bg-blue-50">
                      <Bell className="w-4 h-4" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    </Button>
                  </div>

                  {/* Profile */}
                  <Link to="/profile" className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-medium">
                        {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden md:flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {user.user_metadata?.full_name || user.email?.split('@')[0]}
                      </span>
                      <span className="text-xs text-gray-500">Student</span>
                    </div>
                  </Link>

                  {/* Sign Out */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => signOut()}
                    className="hidden md:flex hover:bg-red-50 hover:border-red-300 hover:text-red-600"
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
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-gray-200 shadow-2xl">
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-6">
                {/* Main Navigation */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">Main Navigation</h3>
                  <div className="space-y-2">
                    {mainNavigationItems.map((item) => (
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
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* AI Features */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">AI Features</h3>
                  <div className="space-y-2">
                    {aiNavigationItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                          isActivePath(item.path)
                            ? 'bg-purple-500/20 text-purple-600'
                            : 'text-gray-600 hover:bg-purple-50'
                        }`}
                      >
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Social Features */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">Social Learning</h3>
                  <div className="space-y-2">
                    {socialNavigationItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                          isActivePath(item.path)
                            ? 'bg-green-500/20 text-green-600'
                            : 'text-gray-600 hover:bg-green-50'
                        }`}
                      >
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {user && (
                  <div className="pt-4 border-t border-gray-200">
                    <Button 
                      variant="outline" 
                      onClick={() => signOut()}
                      className="w-full hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                    >
                      Sign Out
                    </Button>
                  </div>
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
