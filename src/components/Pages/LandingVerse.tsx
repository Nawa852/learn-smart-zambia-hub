
import React, { useEffect, useRef } from 'react';
import { Play, ArrowRight, Globe, Users, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AnimatedCounter from '@/components/UI/AnimatedCounter';

const LandingVerse: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create floating 3D classroom animation
    const students = Array.from({ length: 8 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: 20 + Math.random() * 15,
      color: `hsl(${i * 45}, 70%, 60%)`
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create cosmic background
      const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width/2);
      gradient.addColorStop(0, '#1e1b4b');
      gradient.addColorStop(1, '#0f0a2e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw floating students/books
      students.forEach((student) => {
        ctx.save();
        ctx.translate(student.x, student.y);
        
        // Create glowing effect
        ctx.shadowColor = student.color;
        ctx.shadowBlur = 15;
        
        ctx.fillStyle = student.color;
        ctx.beginPath();
        ctx.arc(0, 0, student.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add floating animation
        student.x += student.vx;
        student.y += student.vy;
        
        // Bounce off edges
        if (student.x < 0 || student.x > canvas.width) student.vx *= -1;
        if (student.y < 0 || student.y > canvas.height) student.vy *= -1;
        
        ctx.restore();
      });
      
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur rounded-full mb-8 border border-white/20">
            <Zap className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Proudly Built by Team Zambia 🇿🇲</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              LearningVerse
            </span>
            <br />
            <span className="text-4xl md:text-5xl text-gray-300">
              Zambia's AI Future
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Experience the future of education with our revolutionary AI-powered platform. 
            Built by <span className="text-yellow-400 font-semibold">Nawa Mulope Brighton Nalionwa, Day, Mr. Loza, Mom, and Dad</span> - 
            transforming Zambian education through cutting-edge technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-2xl px-8 py-4 text-lg">
              <Play className="mr-2 h-6 w-6" />
              Start Your Journey
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur">
              <Globe className="mr-2 h-6 w-6" />
              Explore 3D Demo
            </Button>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur border-white/20 text-center p-6">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-4" />
            <AnimatedCounter 
              end={50000} 
              duration={2000} 
              suffix="+" 
              className="text-3xl font-bold text-white block"
            />
            <p className="text-gray-300 text-sm">Active Learners</p>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur border-white/20 text-center p-6">
            <Award className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
            <AnimatedCounter 
              end={500} 
              duration={2500} 
              suffix="+" 
              className="text-3xl font-bold text-white block"
            />
            <p className="text-gray-300 text-sm">AI Courses</p>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur border-white/20 text-center p-6">
            <Globe className="w-8 h-8 text-green-400 mx-auto mb-4" />
            <AnimatedCounter 
              end={95} 
              duration={3000} 
              suffix="%" 
              className="text-3xl font-bold text-white block"
            />
            <p className="text-gray-300 text-sm">Success Rate</p>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur border-white/20 text-center p-6">
            <Zap className="w-8 h-8 text-purple-400 mx-auto mb-4" />
            <AnimatedCounter 
              end={24} 
              duration={1500} 
              suffix="/7" 
              className="text-3xl font-bold text-white block"
            />
            <p className="text-gray-300 text-sm">AI Support</p>
          </Card>
        </div>
        
        {/* Feature Highlights */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Revolutionary Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur border-white/20 p-6 hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">3D Interactive Learning</h3>
                <p className="text-gray-300">Immersive 3D environments that bring complex concepts to life</p>
              </div>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur border-white/20 p-6 hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">AI-Powered Tutoring</h3>
                <p className="text-gray-300">Personal AI assistant that adapts to your learning style</p>
              </div>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur border-white/20 p-6 hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Global Standards</h3>
                <p className="text-gray-300">World-class education tailored for Zambian learners</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Floating elements for extra visual appeal */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-15 animate-pulse"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-25 animate-ping"></div>
    </div>
  );
};

export default LandingVerse;
