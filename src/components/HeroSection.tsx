
import { BookOpen, Brain, Users, Trophy, Play, ArrowRight, Sparkles, Zap, Star, Globe, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 min-h-screen flex items-center">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-15 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-25 animate-ping" style={{ animationDuration: '2s' }}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 right-1/4 animate-float">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg rotate-45 shadow-lg"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/5 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg"></div>
        </div>
        <div className="absolute top-1/2 left-1/3 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg"></div>
        </div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Enhanced Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur rounded-full shadow-lg border border-blue-200 animate-fade-in">
                <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-600">🇿🇲 Africa's #1 AI-Powered Learning Platform</span>
                <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">NEW</Badge>
              </div>
              
              {/* Enhanced Heading */}
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <span className="text-gray-900">Transform Your</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                  Learning Journey
                </span>
              </h1>
              
              {/* Enhanced Description */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <p className="text-xl lg:text-2xl text-gray-600 max-w-lg leading-relaxed">
                  Join <span className="font-bold text-blue-600">50,000+ Zambian learners</span> on our revolutionary platform featuring:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="px-3 py-1 border-blue-200 text-blue-700">
                    <Brain className="w-3 h-3 mr-1" />
                    AI Tutoring
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 border-green-200 text-green-700">
                    <Globe className="w-3 h-3 mr-1" />
                    3D Learning
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 border-purple-200 text-purple-700">
                    <Award className="w-3 h-3 mr-1" />
                    ECZ Aligned
                  </Badge>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group h-14 px-8 text-lg">
                <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Start Learning Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group h-14 px-8 text-lg">
                <Play className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Watch Demo
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">50K+</div>
                <div className="text-sm text-gray-600 font-medium">Active Learners</div>
                <div className="flex justify-center mt-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                </div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-gray-600 font-medium">AI Courses</div>
                <div className="text-xs text-green-600 font-medium">ECZ Aligned</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">95%</div>
                <div className="text-sm text-gray-600 font-medium">Success Rate</div>
                <div className="text-xs text-purple-600 font-medium">Pass Grades</div>
              </div>
            </div>
          </div>

          {/* Enhanced 3D Cards Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 bg-white/90 backdrop-blur-lg shadow-2xl border border-white/50 animate-float hover:shadow-3xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 group">
                <div className="relative">
                  <Brain className="h-12 w-12 text-blue-600 mb-4 group-hover:animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <h3 className="font-bold mb-2 text-gray-800">AI-Powered Learning</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Personalized tutoring that adapts to your learning style with real-time feedback</p>
                <Badge className="mt-2 bg-blue-100 text-blue-700">🧠 Smart AI</Badge>
              </Card>
              
              <Card className="p-6 bg-white/90 backdrop-blur-lg shadow-2xl border border-white/50 animate-float hover:shadow-3xl transform hover:scale-105 hover:-rotate-1 transition-all duration-500 group" style={{ animationDelay: '1s' }}>
                <div className="relative">
                  <Users className="h-12 w-12 text-green-600 mb-4 group-hover:animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <h3 className="font-bold mb-2 text-gray-800">Virtual Classrooms</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Connect with peers and teachers in immersive 3D learning environments</p>
                <Badge className="mt-2 bg-green-100 text-green-700">🌍 Global</Badge>
              </Card>
              
              <Card className="p-6 bg-white/90 backdrop-blur-lg shadow-2xl border border-white/50 animate-float hover:shadow-3xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 group" style={{ animationDelay: '2s' }}>
                <div className="relative">
                  <BookOpen className="h-12 w-12 text-purple-600 mb-4 group-hover:animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <h3 className="font-bold mb-2 text-gray-800">ECZ Curriculum</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Complete Zambian curriculum coverage with past papers and exam prep</p>
                <Badge className="mt-2 bg-purple-100 text-purple-700">🎓 Official</Badge>
              </Card>
              
              <Card className="p-6 bg-white/90 backdrop-blur-lg shadow-2xl border border-white/50 animate-float hover:shadow-3xl transform hover:scale-105 hover:-rotate-1 transition-all duration-500 group" style={{ animationDelay: '3s' }}>
                <div className="relative">
                  <Trophy className="h-12 w-12 text-yellow-600 mb-4 group-hover:animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <h3 className="font-bold mb-2 text-gray-800">Achievements</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Earn certificates, badges and track your progress with gamified learning</p>
                <Badge className="mt-2 bg-yellow-100 text-yellow-700">🏆 Rewards</Badge>
              </Card>
            </div>

            {/* Enhanced Floating Elements */}
            <div className="absolute -z-10 top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse blur-xl"></div>
            <div className="absolute -z-10 bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 animate-pulse blur-xl" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <p className="text-sm text-gray-500 mb-4">Trusted by leading Zambian institutions</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-xs font-medium text-gray-400">Ministry of Education</div>
            <div className="text-xs font-medium text-gray-400">ECZ Approved</div>
            <div className="text-xs font-medium text-gray-400">UNZA Partnership</div>
            <div className="text-xs font-medium text-gray-400">UNESCO Recognized</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
