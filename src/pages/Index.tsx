
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ExpandedFeaturesSection from "@/components/ExpandedFeaturesSection";
import CoursesPreview from "@/components/CoursesPreview";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/Auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowRight, Users, BookOpen, Award, Brain, Globe, Zap, Star, Play, Heart, Lightbulb, Shield, Wifi, Languages, Camera, Gamepad2 } from "lucide-react";
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
      {/* Enhanced Hero Section - Zambian Pride */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-green-600 text-white overflow-hidden min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-orange-300 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
          <div className="absolute top-60 left-1/3 w-16 h-16 bg-green-400 rounded-full animate-pulse" style={{ animationDuration: '5s' }}></div>
          <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-red-400 rounded-full animate-bounce" style={{ animationDuration: '6s' }}></div>
        </div>

        <div className="relative container mx-auto px-6 py-20 text-center">
          {/* National Pride Badge */}
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-green-500 backdrop-blur rounded-2xl mb-8 border border-white/30 shadow-2xl">
            <span className="text-5xl mr-4 animate-bounce">🇿🇲</span>
            <div className="text-left">
              <span className="text-white font-bold text-lg block">Proudly Zambian</span>
              <span className="text-white/90 text-sm">Built for Our Future</span>
            </div>
          </div>
          
          {/* Main Heading with Gradient Text */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-yellow-200 via-white to-orange-200 bg-clip-text text-transparent animate-pulse">
              EduZambia
            </span>
            <br />
            <span className="text-3xl md:text-5xl text-white/95 font-light">
              AI-Powered Education Revolution
            </span>
          </h1>
          
          {/* Enhanced Description */}
          <div className="max-w-5xl mx-auto mb-12">
            <p className="text-2xl md:text-3xl text-white/95 mb-6 leading-relaxed font-medium">
              Transforming Zambian Education with 35+ AI Features
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              From Lusaka to rural villages • ECZ to Cambridge curricula • English, Bemba, Nyanja & more
              <br />
              <span className="font-semibold text-yellow-200">25,000+ study materials • 50,000+ students • 10+ languages supported</span>
            </p>
          </div>
          
          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-16">
            <Button 
              size="lg" 
              onClick={() => navigate('/study-materials')}
              className="bg-white text-orange-600 hover:bg-yellow-50 shadow-2xl px-12 py-6 text-xl font-bold transform hover:scale-105 transition-all duration-300 rounded-2xl"
            >
              <BookOpen className="mr-3 h-8 w-8" />
              Start Learning Now
              <ArrowRight className="ml-3 h-8 w-8" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/signup')}
              className="border-3 border-white text-white hover:bg-white hover:text-orange-600 px-12 py-6 text-xl backdrop-blur-sm rounded-2xl font-bold transform hover:scale-105 transition-all duration-300"
            >
              <Users className="mr-3 h-8 w-8" />
              Join 50,000+ Students
            </Button>
          </div>

          {/* Multilingual Welcome */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto mb-12 text-center">
            {[
              { lang: "English", text: "Welcome", flag: "🇬🇧" },
              { lang: "Bemba", text: "Mwaiseni", flag: "🇿🇲" },
              { lang: "Nyanja", text: "Muli bwanji", flag: "🇿🇲" },
              { lang: "Tonga", text: "Mwabonwa", flag: "🇿🇲" },
              { lang: "Lozi", text: "Lumeleng", flag: "🇿🇲" },
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-2xl mb-2">{item.flag}</div>
                <div className="font-bold text-lg">{item.text}</div>
                <div className="text-sm text-white/80">{item.lang}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Empowering Every Zambian Learner
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              From the Copperbelt to Western Province, we're bridging the digital divide
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: BookOpen, label: "Study Materials", value: "25,000+", color: "text-orange-600", bg: "bg-orange-100" },
              { icon: Users, label: "Active Students", value: "50,000+", color: "text-green-600", bg: "bg-green-100" },
              { icon: Globe, label: "Languages Supported", value: "10+", color: "text-blue-600", bg: "bg-blue-100" },
              { icon: Award, label: "Success Rate", value: "95%", color: "text-purple-600", bg: "bg-purple-100" },
            ].map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-300 border-t-4 border-t-orange-500 transform hover:scale-105">
                <CardContent className="p-8">
                  <div className={`w-20 h-20 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <stat.icon className={`w-10 h-10 ${stat.color}`} />
                  </div>
                  <AnimatedCounter 
                    end={parseInt(stat.value.replace(/[^0-9]/g, ''))} 
                    duration={2000}
                    suffix={stat.value.replace(/[0-9]/g, '')}
                    className="text-4xl font-bold text-gray-900 block mb-3"
                  />
                  <p className="text-gray-600 font-semibold text-lg">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Geographic Impact */}
          <div className="bg-gradient-to-r from-orange-100 to-green-100 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Reaching Every Corner of Zambia</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["Lusaka", "Copperbelt", "Southern", "Western", "Eastern", "Northern", "Central", "Luapula"].map((province, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-2xl font-bold text-orange-600">{Math.floor(Math.random() * 5000) + 1000}+</div>
                  <div className="text-gray-700 font-medium">{province}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary 35 Features Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">35 AI-Powered Features</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Every feature designed for Zambian learners, powered by cutting-edge AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Study Assistant",
                description: "Upload PDFs, ask questions in any language, get ECZ-aligned answers with voice support.",
                color: "from-blue-500 to-purple-500"
              },
              {
                icon: Languages,
                title: "Multilingual Search",
                description: "Search in English, Bemba, Nyanja, Tonga, Lozi with AI-powered translation.",
                color: "from-green-500 to-blue-500"
              },
              {
                icon: Camera,
                title: "Smart OCR & Analysis",
                description: "Photograph handwritten notes, get instant digital conversion and analysis.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Wifi,
                title: "Offline Learning Mode",
                description: "Download materials, use AI tutor offline - perfect for rural areas.",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: Heart,
                title: "Meal Planner & Nutrition",
                description: "AI-powered meal planning with local ingredients like nshima and kapenta.",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Gamepad2,
                title: "Gamified Learning",
                description: "Points, badges, leaderboards - make learning fun and competitive.",
                color: "from-pink-500 to-purple-500"
              },
              {
                icon: Shield,
                title: "ECZ Exam Prep Center",
                description: "Mock exams for Grades 7, 9, 12 with instant AI grading and feedback.",
                color: "from-red-500 to-orange-500"
              },
              {
                icon: Lightbulb,
                title: "Career & Entrepreneurship",
                description: "AI career guidance, business plan generation, and mentorship matching.",
                color: "from-teal-500 to-green-500"
              },
              {
                icon: Star,
                title: "Virtual Classroom",
                description: "Live classes, interactive whiteboards, real-time polls and quizzes.",
                color: "from-indigo-500 to-blue-500"
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-white/80 backdrop-blur group">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Features Teaser */}
          <div className="text-center mt-16">
            <Card className="bg-gradient-to-r from-orange-500 to-green-500 text-white border-0 shadow-2xl">
              <CardContent className="p-12">
                <h3 className="text-4xl font-bold mb-4">...and 26 More Revolutionary Features!</h3>
                <p className="text-xl mb-8 opacity-90">
                  Virtual Labs • Mentorship Program • Scholarship Portal • Teacher Training Hub • 
                  Parent Portal • Analytics Dashboard • Resource Creation Studio • Accessibility Hub • 
                  News & Updates • Feedback Portal • Local Content Library • And Much More!
                </p>
                <Button 
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="bg-white text-orange-600 hover:bg-yellow-50 px-12 py-4 text-xl font-bold rounded-2xl"
                >
                  Explore All Features
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cultural Relevance Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-green-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8">Built for Zambian Culture</h2>
          <p className="text-2xl mb-12 max-w-4xl mx-auto opacity-90">
            Every feature respects and celebrates our rich heritage while preparing us for the future
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/10 backdrop-blur border-white/20 text-center hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">🏫</div>
                <h3 className="text-2xl font-bold mb-4">ECZ Alignment</h3>
                <p className="opacity-90">Every resource aligned with Zambian ECZ curriculum standards</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20 text-center hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">🗣️</div>
                <h3 className="text-2xl font-bold mb-4">Local Languages</h3>
                <p className="opacity-90">Full support for Bemba, Nyanja, Tonga, Lozi and more</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20 text-center hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">🌍</div>
                <h3 className="text-2xl font-bold mb-4">Rural Access</h3>
                <p className="opacity-90">Offline mode and low-bandwidth design for rural connectivity</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-8">
            Ready to Transform Zambian Education?
          </h2>
          <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto">
            Join the revolution. Empower your future. Build a stronger Zambia through education.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <GraduationCap className="mr-3 h-8 w-8" />
              Start Your Journey
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/study-materials')}
              className="border-3 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-12 py-6 text-xl font-bold rounded-2xl transform hover:scale-105 transition-all duration-300"
            >
              <BookOpen className="mr-3 h-8 w-8" />
              Explore Resources
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
