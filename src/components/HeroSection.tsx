
import { BookOpen, Brain, Users, Trophy, Play, ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-emerald-50 to-blue-50 py-20 min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-15 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-25 animate-ping" style={{ animationDuration: '2s' }}></div>
        
        {/* 3D Floating Elements */}
        <div className="absolute top-1/4 right-1/4 animate-float">
          <div className="w-12 h-12 bg-gradient-to-r from-zambia-copper to-orange-500 rounded-lg rotate-45 shadow-lg"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/5 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-8 h-8 bg-gradient-to-r from-zambia-emerald to-green-500 rounded-full shadow-lg"></div>
        </div>
        <div className="absolute top-1/2 left-1/3 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg"></div>
        </div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-lg border border-orange-200 animate-fade-in">
                <Sparkles className="w-4 h-4 text-zambia-copper mr-2" />
                <span className="text-sm font-medium text-zambia-copper">AI-Powered Learning Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <span className="text-gray-900">Empower Your</span>
                <br />
                <span className="bg-gradient-to-r from-orange-600 via-red-500 to-emerald-600 bg-clip-text text-transparent animate-pulse">
                  Learning Journey
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 max-w-lg leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Join thousands of Zambian learners on our revolutionary AI-powered platform. 
                Experience <span className="font-semibold text-zambia-copper">3D interactive content</span>, 
                personalized education, and immersive learning like never before.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button size="lg" className="bg-gradient-to-r from-zambia-copper to-orange-600 hover:from-orange-700 hover:to-red-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
                <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-zambia-emerald text-zambia-emerald hover:bg-zambia-emerald hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
                <Play className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Watch 3D Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-zambia-copper to-orange-500 bg-clip-text text-transparent">50K+</div>
                <div className="text-sm text-gray-600 font-medium">Active Learners</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-zambia-emerald to-green-500 bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-gray-600 font-medium">3D Courses</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">95%</div>
                <div className="text-sm text-gray-600 font-medium">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* 3D Cards Grid with Enhanced Animations */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 bg-white/90 backdrop-blur-lg shadow-2xl border border-white/50 animate-float hover:shadow-3xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 group">
                <div className="relative">
                  <Brain className="h-12 w-12 text-zambia-copper mb-4 group-hover:animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <h3 className="font-bold mb-2 text-gray-800">AI-Powered Learning</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Experience personalized 3D content that adapts to your unique learning style and pace</p>
              </Card>
              
              <Card className="p-6 bg-white/90 backdrop-blur-lg shadow-2xl border border-white/50 animate-float hover:shadow-3xl transform hover:scale-105 hover:-rotate-1 transition-all duration-500 group" style={{ animationDelay: '1s' }}>
                <div className="relative">
                  <Users className="h-12 w-12 text-zambia-emerald mb-4 group-hover:animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <h3 className="font-bold mb-2 text-gray-800">Virtual Collaboration</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Connect with peers in immersive 3D virtual classrooms and study spaces</p>
              </Card>
              
              <Card className="p-6 bg-white/90 backdrop-blur-lg shadow-2xl border border-white/50 animate-float hover:shadow-3xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 group" style={{ animationDelay: '2s' }}>
                <div className="relative">
                  <BookOpen className="h-12 w-12 text-blue-600 mb-4 group-hover:animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <h3 className="font-bold mb-2 text-gray-800">Interactive 3D Content</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Explore complex concepts through interactive 3D models and simulations</p>
              </Card>
              
              <Card className="p-6 bg-white/90 backdrop-blur-lg shadow-2xl border border-white/50 animate-float hover:shadow-3xl transform hover:scale-105 hover:-rotate-1 transition-all duration-500 group" style={{ animationDelay: '3s' }}>
                <div className="relative">
                  <Trophy className="h-12 w-12 text-yellow-600 mb-4 group-hover:animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <h3 className="font-bold mb-2 text-gray-800">Gamified Progress</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Earn 3D badges and achievements as you master new skills and concepts</p>
              </Card>
            </div>

            {/* Floating 3D Elements */}
            <div className="absolute -z-10 top-10 right-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse blur-xl"></div>
            <div className="absolute -z-10 bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-10 animate-pulse blur-xl" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
