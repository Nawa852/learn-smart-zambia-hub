import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Brain, Rocket } from "lucide-react";
import { toast } from "sonner";

interface LearningSphereVisualizationProps {
  userRole: string;
  onComplete: () => void;
}

export const LearningSphereVisualization = ({ userRole, onComplete }: LearningSphereVisualizationProps) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Simulate AI generation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const centerX = canvas.width / 4;
    const centerY = canvas.height / 4;
    
    // Animated orbital system
    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
      
      // Central sphere
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)');
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0.2)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.fill();

      // Orbiting subjects
      const subjects = [
        { name: 'Math', angle: 0, radius: 100, color: '#3b82f6' },
        { name: 'Science', angle: Math.PI * 0.5, radius: 120, color: '#10b981' },
        { name: 'English', angle: Math.PI, radius: 110, color: '#f59e0b' },
        { name: 'History', angle: Math.PI * 1.5, radius: 130, color: '#8b5cf6' },
      ];

      subjects.forEach((subject) => {
        const x = centerX + Math.cos(subject.angle + frame * 0.01) * subject.radius;
        const y = centerY + Math.sin(subject.angle + frame * 0.01) * subject.radius;
        
        // Orbit path
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, subject.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Subject planet
        ctx.fillStyle = subject.color;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        const planetGradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
        planetGradient.addColorStop(0, subject.color + '80');
        planetGradient.addColorStop(1, subject.color + '00');
        ctx.fillStyle = planetGradient;
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
      });

      frame++;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const subjects = [
    { name: "Mathematics", topics: 12, color: "from-blue-500 to-cyan-500" },
    { name: "Science", topics: 15, color: "from-green-500 to-emerald-500" },
    { name: "English", topics: 10, color: "from-orange-500 to-yellow-500" },
    { name: "Social Studies", topics: 8, color: "from-purple-500 to-pink-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-16 h-16 text-primary mx-auto" />
        </motion.div>
        
        {isGenerating ? (
          <>
            <h2 className="text-3xl font-bold gradient-text-bright-sphere">
              Generating Your Learning Universe
            </h2>
            <p className="text-muted-foreground">
              Analyzing patterns... synthesizing knowledge... creating your personalized path
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{progress}% Complete</p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold gradient-text-bright-sphere">
              Your Learning Sphere Awaits
            </h2>
            <p className="text-muted-foreground">
              Explore your personalized knowledge universe
            </p>
          </>
        )}
      </div>

      {!isGenerating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* 3D Visualization */}
          <Card className="p-6 bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
            <div className="aspect-video rounded-lg overflow-hidden bg-background/50 backdrop-blur">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ maxHeight: '400px' }}
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Click any planet to begin your journey
            </p>
          </Card>

          {/* Subject Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className={`p-4 cursor-pointer hover:shadow-lg transition-all bg-gradient-to-br ${subject.color} text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-8 h-8" />
                      <div>
                        <h3 className="font-semibold">{subject.name}</h3>
                        <p className="text-sm opacity-90">{subject.topics} topics ready</p>
                      </div>
                    </div>
                    <Rocket className="w-5 h-5" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <Brain className="w-8 h-8 text-primary flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold mb-2">AI Tutor Ready</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your personal AI companion is ready to help with any topic. Ask questions, generate notes, or start learning immediately.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Ask AI Tutor</Button>
                  <Button variant="outline" size="sm">Generate Notes</Button>
                  <Button variant="outline" size="sm">Take Quiz</Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-center">
            <Button
              onClick={() => {
                toast.success("Welcome to your learning universe! 🚀");
                onComplete();
              }}
              size="lg"
              className="min-w-48"
            >
              Enter My Universe
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
