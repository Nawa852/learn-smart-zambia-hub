import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MapNode {
  id: string;
  name: string;
  x: number;
  y: number;
  type: 'school' | 'hospital' | 'community' | 'project';
  activity: number;
}

const ZambiaMap3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<MapNode | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Zambia provinces with coordinates (relative positioning)
  const provinces: MapNode[] = [
    { id: 'lusaka', name: 'Lusaka', x: 0.55, y: 0.65, type: 'school', activity: 95 },
    { id: 'copperbelt', name: 'Copperbelt', x: 0.45, y: 0.25, type: 'school', activity: 88 },
    { id: 'southern', name: 'Southern', x: 0.45, y: 0.85, type: 'hospital', activity: 72 },
    { id: 'eastern', name: 'Eastern', x: 0.85, y: 0.55, type: 'community', activity: 65 },
    { id: 'northern', name: 'Northern', x: 0.55, y: 0.15, type: 'project', activity: 78 },
    { id: 'northwestern', name: 'Northwestern', x: 0.2, y: 0.25, type: 'school', activity: 55 },
    { id: 'western', name: 'Western', x: 0.15, y: 0.55, type: 'community', activity: 48 },
    { id: 'central', name: 'Central', x: 0.5, y: 0.45, type: 'hospital', activity: 82 },
    { id: 'muchinga', name: 'Muchinga', x: 0.7, y: 0.25, type: 'project', activity: 60 },
    { id: 'luapula', name: 'Luapula', x: 0.65, y: 0.18, type: 'school', activity: 52 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    let time = 0;

    const draw = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Clear with gradient background
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width / 2
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.05)');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)');
      gradient.addColorStop(1, 'rgba(16, 185, 129, 0.02)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw simplified Zambia outline
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 2;
      
      // Simplified Zambia shape
      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) * 0.35;
      
      ctx.beginPath();
      ctx.moveTo(centerX - scale * 0.4, centerY - scale * 0.3);
      ctx.lineTo(centerX + scale * 0.2, centerY - scale * 0.4);
      ctx.lineTo(centerX + scale * 0.5, centerY - scale * 0.2);
      ctx.lineTo(centerX + scale * 0.4, centerY + scale * 0.1);
      ctx.lineTo(centerX + scale * 0.3, centerY + scale * 0.4);
      ctx.lineTo(centerX - scale * 0.1, centerY + scale * 0.5);
      ctx.lineTo(centerX - scale * 0.4, centerY + scale * 0.3);
      ctx.lineTo(centerX - scale * 0.5, centerY);
      ctx.closePath();
      
      // Glow effect
      ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Fill with subtle gradient
      const mapGradient = ctx.createLinearGradient(
        centerX - scale, centerY - scale,
        centerX + scale, centerY + scale
      );
      mapGradient.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
      mapGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.06)');
      mapGradient.addColorStop(1, 'rgba(16, 185, 129, 0.08)');
      ctx.fillStyle = mapGradient;
      ctx.fill();

      // Draw neural network connections
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
      ctx.lineWidth = 1;
      
      provinces.forEach((province, i) => {
        const x1 = province.x * width;
        const y1 = province.y * height;
        
        // Connect to nearby provinces
        provinces.slice(i + 1).forEach(other => {
          const x2 = other.x * width;
          const y2 = other.y * height;
          const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          
          if (distance < width * 0.3) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            
            // Animated data flow
            const progress = (Math.sin(time * 0.002 + i) + 1) / 2;
            const midX = (x1 + x2) / 2 + Math.sin(time * 0.003 + i) * 10;
            const midY = (y1 + y2) / 2 + Math.cos(time * 0.003 + i) * 10;
            
            ctx.quadraticCurveTo(midX, midY, x2, y2);
            ctx.stroke();
            
            // Animated particle
            const particleX = x1 + (x2 - x1) * progress;
            const particleY = y1 + (y2 - y1) * progress + Math.sin(time * 0.01 + i) * 3;
            
            ctx.beginPath();
            ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 92, 246, ${0.3 + progress * 0.4})`;
            ctx.fill();
          }
        });
      });

      // Draw province nodes
      provinces.forEach((province, i) => {
        const x = province.x * width;
        const y = province.y * height;
        const baseRadius = 8 + province.activity / 15;
        const pulseRadius = baseRadius + Math.sin(time * 0.003 + i) * 3;
        
        // Outer glow
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, pulseRadius * 2);
        const colors = {
          school: ['rgba(59, 130, 246, 0.4)', 'rgba(59, 130, 246, 0)'],
          hospital: ['rgba(239, 68, 68, 0.4)', 'rgba(239, 68, 68, 0)'],
          community: ['rgba(16, 185, 129, 0.4)', 'rgba(16, 185, 129, 0)'],
          project: ['rgba(139, 92, 246, 0.4)', 'rgba(139, 92, 246, 0)'],
        };
        glowGradient.addColorStop(0, colors[province.type][0]);
        glowGradient.addColorStop(1, colors[province.type][1]);
        
        ctx.beginPath();
        ctx.arc(x, y, pulseRadius * 2, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
        
        // Main node
        ctx.beginPath();
        ctx.arc(x, y, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = colors[province.type][0].replace('0.4', '1');
        ctx.fill();
        
        // Inner glow
        ctx.beginPath();
        ctx.arc(x, y, baseRadius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
      });

      time++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x: e.clientX, y: e.clientY });
    
    // Check if hovering over a province
    const hovered = provinces.find(p => {
      const dx = Math.abs(p.x - x);
      const dy = Math.abs(p.y - y);
      return dx < 0.05 && dy < 0.08;
    });
    
    setHoveredNode(hovered || null);
  };

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredNode(null)}
      />
      
      {/* Tooltip */}
      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed z-50 px-4 py-3 rounded-xl bg-card/95 backdrop-blur-xl border border-border shadow-2xl pointer-events-none"
          style={{
            left: mousePos.x + 15,
            top: mousePos.y - 15,
          }}
        >
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              hoveredNode.type === 'school' ? 'bg-blue-500' :
              hoveredNode.type === 'hospital' ? 'bg-red-500' :
              hoveredNode.type === 'community' ? 'bg-emerald-500' : 'bg-purple-500'
            }`} />
            <div>
              <p className="font-semibold text-foreground">{hoveredNode.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{hoveredNode.type}</p>
            </div>
            <div className="ml-3 text-right">
              <p className="text-lg font-bold text-primary">{hoveredNode.activity}%</p>
              <p className="text-xs text-muted-foreground">Activity</p>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="text-muted-foreground">Schools</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="text-muted-foreground">Hospitals</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-muted-foreground">Communities</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
          <span className="text-muted-foreground">Projects</span>
        </div>
      </div>
    </div>
  );
};

export default ZambiaMap3D;
