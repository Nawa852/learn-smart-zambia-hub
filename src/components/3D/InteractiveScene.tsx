
import React, { useEffect, useRef } from 'react';
import { Box, Play, RotateCcw, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const InteractiveScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let rotation = 0;
    let scale = 1;
    let direction = 1;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#4f46e5');
      gradient.addColorStop(1, '#06b6d4');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw animated 3D-like cube
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      
      // Cube faces
      const size = 40;
      
      // Front face
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(-size, -size, size * 2, size * 2);
      
      // Top face (3D effect)
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.moveTo(-size, -size);
      ctx.lineTo(-size + 20, -size - 20);
      ctx.lineTo(size + 20, -size - 20);
      ctx.lineTo(size, -size);
      ctx.closePath();
      ctx.fill();
      
      // Right face (3D effect)
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.moveTo(size, -size);
      ctx.lineTo(size + 20, -size - 20);
      ctx.lineTo(size + 20, size - 20);
      ctx.lineTo(size, size);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
      
      // Update animation
      rotation += 0.02;
      scale += direction * 0.005;
      
      if (scale > 1.2 || scale < 0.8) {
        direction *= -1;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const resetAnimation = () => {
    // Reset animation state
    console.log('Resetting 3D animation');
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Box className="w-5 h-5 text-purple-600" />
            3D Learning Lab
          </h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={resetAnimation}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Play className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <canvas 
          ref={canvasRef}
          className="w-full h-64 rounded-lg shadow-inner border border-purple-300"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        />
        
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span>Interactive 3D Models</span>
          </div>
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-blue-500" />
            <span>Real-time Animation</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InteractiveScene;
