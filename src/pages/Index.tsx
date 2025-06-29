
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ExpandedFeaturesSection from "@/components/ExpandedFeaturesSection";
import CoursesPreview from "@/components/CoursesPreview";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/Auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowRight, Users, BookOpen, Award, Brain, Globe, Zap, Heart, Star, MessageSquare, Target, Calendar, Upload, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 animate-pulse">Loading EDU ZAMBIA...</p>
        </div>
      </div>
    );
  }

  const features = [
    { icon: Brain, title: "AI Study Assistant", description: "24/7 multilingual AI tutor supporting ECZ & Cambridge curricula", color: "from-blue-500 to-purple-600", link: "/multi-ai-tutor" },
    { icon: BookOpen, title: "Study Materials", description: "Access thousands of notes, past papers, and resources", color: "from-green-500 to-blue-500", link: "/study-materials" },
    { icon: Users, title: "Community Learning", description: "Connect with peers, join study groups, find mentors", color: "from-purple-500 to-pink-500", link: "/social-feed" },
    { icon: Globe, title: "Multilingual Support", description: "Learn in Bemba, Nyanja, Tonga, Lozi, and English", color: "from-orange-500 to-red-500", link: "/multilingual-translator" },
    { icon: Target, title: "AI Flashcards", description: "Smart flashcards generated from your notes", color: "from-cyan-500 to-blue-500", link: "/ai-flashcards" },
    { icon: MessageSquare, title: "Study Groups", description: "Join collaborative learning sessions", color: "from-indigo-500 to-purple-500", link: "/study-groups" },
    { icon: Calendar, title: "Goal Coaching", description: "AI-powered daily goal setting and tracking", color: "from-pink-500 to-red-500", link: "/daily-goal-coach" },
    { icon: Upload, title: "Content Upload", description: "Share and discover study materials", color: "from-teal-500 to-green-500", link: "/study-materials-repo" }
  ];

  const stats = [
    { icon: Users, label: "Active Students", value: "50,000+" },
    { icon: BookOpen, label: "Study Resources", value: "10,000+" },
    { icon: Award, label: "Achievements Earned", value: "100,000+" },
    { icon: Brain, label: "AI Interactions", value: "5M+" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  EDU ZAMBIA
                </span>
                <span className="text-xs text-gray-500 font-medium">AI-Powered Learning Platform</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Features</a>
              <a href="#courses" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Courses</a>
              <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">About</a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-15 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-25 animate-ping" style={{ animationDuration: '2s' }}></div>

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">Powered by Advanced AI</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
              Transform Your Learning Journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of education with AI-powered personalized learning, multilingual support, and collaborative study environments tailored for Zambian students.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg"
            >
              Start Learning Today <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/about')}
              className="border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => navigate(feature.link)}>
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Empowering Zambian Education</h2>
          <p className="text-lg text-gray-600">Join thousands of students, teachers, and families on their learning journey</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-3 group">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Sections */}
      <div id="features">
        <ExpandedFeaturesSection />
      </div>
      <FeaturesSection />
      
      {/* Courses Preview */}
      <div id="courses">
        <CoursesPreview />
      </div>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-30 translate-y-30"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              <Heart className="w-4 h-4 text-pink-300" />
              <span className="text-sm font-medium">Made with love for Zambia</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Education in Zambia?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of Zambian students, teachers, and families already experiencing the future of learning with our AI-powered platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 px-8 py-6 text-lg font-semibold"
            >
              Start Your Journey <Star className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/ai-study-helper')}
              className="border-2 border-white text-white hover:bg-white/10 transition-all duration-300 px-8 py-6 text-lg"
            >
              Try AI Assistant
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
