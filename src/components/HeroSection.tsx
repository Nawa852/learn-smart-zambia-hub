
import { BookOpen, Brain, Users, Trophy, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-emerald-50 to-blue-50 py-20">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Empower Your</span>
                <br />
                <span className="bg-gradient-to-r from-orange-600 to-emerald-600 bg-clip-text text-transparent">
                  Learning Journey
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Join thousands of Zambian learners on our AI-powered platform. 
                Personalized education that adapts to your pace, goals, and learning style.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-zambia-copper hover:bg-orange-600 text-white">
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-zambia-emerald text-zambia-emerald hover:bg-emerald-50">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-zambia-copper">50K+</div>
                <div className="text-sm text-gray-600">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-zambia-emerald">500+</div>
                <div className="text-sm text-gray-600">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 bg-white/80 backdrop-blur animate-float">
                <Brain className="h-12 w-12 text-zambia-copper mb-4" />
                <h3 className="font-semibold mb-2">AI-Powered Learning</h3>
                <p className="text-sm text-gray-600">Personalized content that adapts to your learning style</p>
              </Card>
              
              <Card className="p-6 bg-white/80 backdrop-blur animate-float" style={{ animationDelay: '1s' }}>
                <Users className="h-12 w-12 text-zambia-emerald mb-4" />
                <h3 className="font-semibold mb-2">Community Learning</h3>
                <p className="text-sm text-gray-600">Connect with peers and learn together</p>
              </Card>
              
              <Card className="p-6 bg-white/80 backdrop-blur animate-float" style={{ animationDelay: '2s' }}>
                <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Rich Content</h3>
                <p className="text-sm text-gray-600">Interactive lessons, videos, and assessments</p>
              </Card>
              
              <Card className="p-6 bg-white/80 backdrop-blur animate-float" style={{ animationDelay: '3s' }}>
                <Trophy className="h-12 w-12 text-yellow-600 mb-4" />
                <h3 className="font-semibold mb-2">Track Progress</h3>
                <p className="text-sm text-gray-600">Monitor your achievements and growth</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
