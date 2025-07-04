
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ExpandedFeaturesSection from "@/components/ExpandedFeaturesSection";
import CoursesPreview from "@/components/CoursesPreview";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/Auth/AuthProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowRight, Users, BookOpen, Award, Brain, Globe, Zap, Heart, Star, MessageSquare, Target, Calendar, Upload, TrendingUp, Lightbulb, Mic, Shield, Eye, Map, Radio, Coins, Wifi, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after maximum 1 second regardless of auth state
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    // If auth check completes quickly, show content immediately
    if (!loading) {
      setShowContent(true);
      
      // Only redirect authenticated users to dashboard after a brief delay
      if (user) {
        const redirectTimer = setTimeout(() => {
          navigate('/dashboard');
        }, 100);
        
        return () => {
          clearTimeout(timer);
          clearTimeout(redirectTimer);
        };
      }
    }

    return () => clearTimeout(timer);
  }, [user, loading, navigate]);

  // Show loading state only briefly, then always show content
  if (!showContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 animate-pulse">Loading EDU ZAMBIA AI Platform...</p>
        </div>
      </div>
    );
  }

  const aiPoweredFeatures = [
    { icon: Brain, title: "GPT-4o AI Tutor", description: "24/7 multilingual AI tutor supporting ECZ & Cambridge", color: "from-blue-500 to-purple-600", link: "/study-assistant", apis: "GPT-4o, Claude 3" },
    { icon: Globe, title: "7-Language Support", description: "Learn in Bemba, Nyanja, Tonga, Lozi + English", color: "from-green-500 to-blue-500", link: "/multilingual-translator", apis: "Qwen, Whisper" },
    { icon: Lightbulb, title: "Smart Flashcards", description: "AI-generated from your notes and textbooks", color: "from-purple-500 to-pink-500", link: "/ai-flashcards", apis: "Gemini, GPT-4o" },
    { icon: Target, title: "Career Predictions", description: "AI career pathways for Zambian industries", color: "from-orange-500 to-red-500", link: "/smart-recommendations", apis: "Moonshot AI, DeepSeek" },
    { icon: Eye, title: "Visual Mind Maps", description: "AI-generated concept visualization", color: "from-cyan-500 to-blue-500", link: "/visual-mind-map", apis: "Gemini 1.5, MiniMax" },
    { icon: Mic, title: "Voice Learning", description: "Audio lessons and voice-activated Q&A", color: "from-indigo-500 to-purple-500", link: "/comprehensive-ai-study", apis: "Whisper, Azure Speech" },
    { icon: Shield, title: "Safe AI Content", description: "Verified, age-appropriate educational content", color: "from-pink-500 to-red-500", link: "/study-materials", apis: "StealthGPT, Claude 3" },
    { icon: Wifi, title: "Offline AI Mode", description: "Study without internet using cached AI", color: "from-teal-500 to-green-500", link: "/study-materials", apis: "LLaMA 3, Firebase ML" }
  ];

  const zambianFeatures = [
    { icon: GraduationCap, title: "ECZ Exam Mastery", description: "Grade 7, 9 & 12 preparation with AI", color: "text-green-600", apis: "GPT-4o, Claude 3" },
    { icon: Map, title: "Rural Learning Hubs", description: "Solar kiosks for remote communities", color: "text-blue-600", apis: "LLaMA 3, Twilio" },
    { icon: Radio, title: "Community Radio", description: "Lessons broadcast via 80+ local stations", color: "text-purple-600", apis: "Whisper, Firebase ML" },
    { icon: Coins, title: "Scholarship Finder", description: "AI matches you with funding opportunities", color: "text-orange-600", apis: "Moonshot AI, DeepSeek" },
    { icon: Heart, title: "Nutrition Planner", description: "Healthy meals with nshima and local foods", color: "text-pink-600", apis: "Google Vision, GPT-4o" },
    { icon: Truck, title: "Mobile Money Integration", description: "Airtel Money & MTN rewards for learning", color: "text-yellow-600", apis: "Twilio, Firebase" }
  ];

  const stats = [
    { icon: Users, label: "Zambian Students", value: "50,000+", description: "Across all 10 provinces" },
    { icon: BookOpen, label: "ECZ Resources", value: "25,000+", description: "Past papers, notes, guides" },
    { icon: Brain, label: "AI Interactions", value: "5M+", description: "Questions answered daily" },
    { icon: Globe, label: "Languages Supported", value: "7", description: "Bemba, Nyanja, Tonga, Lozi+" },
  ];

  const aiModels = [
    { name: "GPT-4o", purpose: "Advanced tutoring & explanations", status: "active" },
    { name: "Claude 3", purpose: "Content safety & essay grading", status: "active" },
    { name: "Qwen", purpose: "Multilingual translation", status: "active" },
    { name: "Gemini 1.5", purpose: "Visual learning & AR labs", status: "active" },
    { name: "DeepSeek", purpose: "Predictive analytics", status: "active" },
    { name: "Whisper", purpose: "Voice recognition & audio", status: "active" },
    { name: "LLaMA 3", purpose: "Offline learning support", status: "active" },
    { name: "Moonshot AI", purpose: "Career & scholarship matching", status: "active" }
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
                <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  16 AI Models Active
                </span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#ai-features" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">AI Features</a>
              <a href="#zambian-focus" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Zambian Focus</a>
              <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">About</a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/auth')}
                className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Learning <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-6 py-20 text-center relative overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-15 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-25 animate-ping" style={{ animationDuration: '2s' }}></div>

        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          <div className="space-y-6">
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-6 py-3 rounded-full shadow-lg">
                <Brain className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">Powered by 16+ Advanced AI Models</span>
                <div className="flex gap-1 ml-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
              AI-Powered Learning for Zambia
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the future of education with <strong>GPT-4o, Claude 3, Qwen,</strong> and 13+ more AI models supporting ECZ curriculum in 7 local languages. From rural kiosks to urban classrooms—learning for every Zambian student.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg"
            >
              Start AI Learning Today <Brain className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/study-assistant')}
              className="border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 px-8 py-6 text-lg"
            >
              Try AI Tutor Free
            </Button>
          </div>

          <div className="mt-12 p-6 bg-white/70 backdrop-blur rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Live AI Models Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {aiModels.slice(0, 8).map((model, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">{model.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="ai-features" className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">16 AI Models, Unlimited Possibilities</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">From GPT-4o tutoring to Whisper voice learning, experience education powered by the world's most advanced AI</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiPoweredFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-lg" onClick={() => navigate(feature.link)}>
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                <Badge variant="outline" className="text-xs bg-purple-50">
                  {feature.apis}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="zambian-focus" className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for Zambia, Powered by AI</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Addressing uniquely Zambian challenges with cutting-edge AI technology</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zambianFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white">
                <CardContent className="p-6">
                  <feature.icon className={`h-10 w-10 ${feature.color} mb-4`} />
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 mb-3">{feature.description}</p>
                  <Badge variant="outline" className="text-xs bg-green-50">
                    AI: {feature.apis}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Transforming Education Across Zambia</h2>
          <p className="text-lg text-gray-600">Join thousands of students, teachers, and families on their AI-powered learning journey</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-4 group">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <stat.icon className="w-10 h-10 text-blue-600" />
              </div>
              <div>
                <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-gray-800 font-semibold mb-1">{stat.label}</p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div id="features">
        <ExpandedFeaturesSection />
      </div>
      <FeaturesSection />
      
      <div id="courses">
        <CoursesPreview />
      </div>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-30 translate-y-30"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur px-6 py-3 rounded-full">
              <Heart className="w-5 h-5 text-pink-300" />
              <span className="text-sm font-medium">Made with love for Zambian learners</span>
              <div className="flex gap-1 ml-3">
                {["ZM", "🇿🇲"].map((flag, i) => (
                  <span key={i} className="text-lg">{flag}</span>
                ))}
              </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Join the AI Learning Revolution?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join <strong>50,000+ Zambian students</strong> already experiencing AI-powered education with GPT-4o, Claude 3, and 14 more advanced models. From Lusaka to Lundazi—intelligent learning for everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 px-8 py-6 text-lg font-semibold shadow-lg"
            >
              Start Free AI Learning <Star className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/study-assistant')}
              className="border-2 border-white text-white hover:bg-white/10 transition-all duration-300 px-8 py-6 text-lg"
            >
              Try AI Tutor Now
            </Button>
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <p className="text-sm opacity-80 mb-4">Powered by the world's most advanced AI:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["GPT-4o", "Claude 3", "Qwen", "Gemini 1.5", "DeepSeek", "Whisper", "LLaMA 3", "Moonshot AI"].map((model, index) => (
                <Badge key={index} variant="secondary" className="bg-white/20 text-white hover:bg-white/30 px-3 py-1">
                  {model}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
