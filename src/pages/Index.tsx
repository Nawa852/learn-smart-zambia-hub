
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ExpandedFeaturesSection from "@/components/ExpandedFeaturesSection";
import CoursesPreview from "@/components/CoursesPreview";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/Auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowRight, Users, BookOpen, Award, Brain, Globe, Zap, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedCounter from "@/components/UI/AnimatedCounter";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Redirect authenticated users to study materials
    if (!loading && user) {
      navigate('/study-materials');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
          <p className="text-gray-600 animate-pulse">Loading EduZambia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Zambia Inspired */}
      <section className="relative bg-gradient-to-br from-orange-600 via-yellow-600 to-green-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-white rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
        </div>

        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center">
            {/* Flag and Branding */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur rounded-full mb-8 border border-white/20">
              <span className="text-4xl mr-3">🇿🇲</span>
              <span className="text-white font-medium">Proudly Built for Zambia</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                EduZambia
              </span>
              <br />
              <span className="text-3xl md:text-4xl text-white/90">
                AI-Powered Learning for Every Zambian
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
              Access 25,000+ study materials in English, Bemba, Nyanja, and more. 
              Built for ECZ and Cambridge curricula with AI-powered search, offline support, and cultural relevance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button 
                size="lg" 
                onClick={() => navigate('/study-materials')}
                className="bg-white text-orange-600 hover:bg-gray-100 shadow-2xl px-8 py-4 text-lg font-semibold"
              >
                <BookOpen className="mr-2 h-6 w-6" />
                Explore Study Materials
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/signup')}
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg backdrop-blur"
              >
                <Users className="mr-2 h-6 w-6" />
                Join Community
              </Button>
            </div>

            {/* Enhanced Navigation Bar */}
            <nav className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 mb-12 border border-white/20">
              <div className="flex flex-wrap justify-center gap-8">
                <a href="#features" className="text-white/80 hover:text-white transition-colors duration-200 font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Features
                </a>
                <a href="#materials" className="text-white/80 hover:text-white transition-colors duration-200 font-medium flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Materials
                </a>
                <a href="#stats" className="text-white/80 hover:text-white transition-colors duration-200 font-medium flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Impact
                </a>
                <a href="/login" className="text-white/80 hover:text-white transition-colors duration-200 font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Login
                </a>
              </div>
            </nav>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Empowering Zambian Education
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From rural areas to urban centers, we're bridging the educational divide across Zambia
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, label: "Study Materials", value: "25,000+", color: "text-orange-600" },
              { icon: Users, label: "Active Students", value: "50,000+", color: "text-green-600" },
              { icon: Globe, label: "Languages Supported", value: "10+", color: "text-blue-600" },
              { icon: Award, label: "Success Rate", value: "95%", color: "text-purple-600" },
            ].map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-t-4 border-t-orange-500">
                <CardContent className="p-6">
                  <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                  <AnimatedCounter 
                    end={parseInt(stat.value.replace(/[^0-9]/g, ''))} 
                    duration={2000}
                    suffix={stat.value.replace(/[0-9]/g, '')}
                    className="text-3xl font-bold text-gray-900 block mb-2"
                  />
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Revolutionary Features for Zambian Learners</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Designed specifically for Zambia's unique educational landscape, from rural connectivity challenges to multilingual needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Multilingual AI Search",
                description: "Search in English, Bemba, Nyanja, Tonga, and more. Our AI understands Zambian languages and cultural context.",
                color: "from-blue-500 to-purple-500"
              },
              {
                icon: Zap,
                title: "Offline-First Design",
                description: "Download materials for offline use. Perfect for areas with limited internet connectivity across Zambia.",
                color: "from-green-500 to-blue-500"
              },
              {
                icon: Brain,
                title: "AI-Powered Metadata",
                description: "Automatic tagging and categorization of study materials using advanced AI for better discoverability.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: BookOpen,
                title: "ECZ & Cambridge Aligned",
                description: "Materials specifically curated for Zambian ECZ curriculum and Cambridge IGCSE standards.",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Students, teachers, and parents sharing knowledge to build Zambia's educational ecosystem.",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Star,
                title: "Cultural Relevance",
                description: "Examples and content that reflect Zambian culture, history, and real-world applications.",
                color: "from-pink-500 to-purple-500"
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Preview */}
      <section id="materials" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Discover Study Materials</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From Grade 1 to Grade 12, access comprehensive study materials aligned with Zambian curricula
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/study-materials')}
              className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg"
            >
              <Play className="mr-2 w-5 h-5" />
              Explore All Materials
            </Button>
          </div>
          
          {/* Sample Material Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { subject: "Mathematics", grade: "Grade 12", curriculum: "ECZ", materials: "2,500+", icon: "📊" },
              { subject: "English", grade: "Grade 10", curriculum: "Cambridge", materials: "1,800+", icon: "📚" },
              { subject: "Science", grade: "Grade 9", curriculum: "ECZ", materials: "3,200+", icon: "🔬" },
              { subject: "Bemba", grade: "All Grades", curriculum: "ECZ", materials: "800+", icon: "🗣️" },
            ].map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{category.subject}</h3>
                  <p className="text-gray-600 mb-2">{category.grade} • {category.curriculum}</p>
                  <p className="text-orange-600 font-semibold">{category.materials} materials</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-yellow-600 to-green-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of Zambian students, teachers, and parents who are already using EduZambia to enhance their educational journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Get Started Free
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/study-materials')}
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg"
            >
              Browse Materials
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
