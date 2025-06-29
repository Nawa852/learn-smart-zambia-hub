
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ExpandedFeaturesSection from "@/components/ExpandedFeaturesSection";
import CoursesPreview from "@/components/CoursesPreview";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/Auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowRight, Users, BookOpen, Award, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  
  // Remove the useAuth hook usage that's causing the error
  // const { user, loading } = useAuth();

  // Temporarily comment out the redirect logic to fix the error
  // useEffect(() => {
  //   // Redirect authenticated users to dashboard
  //   if (!loading && user) {
  //     navigate('/dashboard');
  //   }
  // }, [user, loading, navigate]);

  // Remove the loading state check that uses auth
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
  //       <div className="flex flex-col items-center space-y-4">
  //         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
  //         <p className="text-gray-600 animate-pulse">Loading EDU ZAMBIA...</p>
  //       </div>
  //     </div>
  //   );
  // }

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
                <span className="text-xs text-gray-500 font-medium">AI-Powered Learning</span>
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
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
              Transform Your Learning Journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of education with AI-powered personalized learning, smart recommendations, and collaborative study environments.
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
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Users, label: "Active Students", value: "10,000+" },
            { icon: BookOpen, label: "Courses Available", value: "500+" },
            { icon: Award, label: "Achievements Earned", value: "25,000+" },
            { icon: Brain, label: "AI Interactions", value: "1M+" },
          ].map((stat, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
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
      <Footer />
    </div>
  );
};

export default Index;
