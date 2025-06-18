
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  variant?: 'glass' | 'neon' | 'gradient' | 'holographic';
  glowColor?: string;
  className?: string;
  onClick?: () => void;
  animate?: boolean;
}

const ModernCard: React.FC<ModernCardProps> = ({
  children,
  variant = 'glass',
  glowColor = '#3b82f6',
  className = '',
  onClick,
  animate = true
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return 'bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl';
      case 'neon':
        return `bg-gray-900/80 border-2 shadow-2xl hover:shadow-[0_0_30px_${glowColor}]`;
      case 'gradient':
        return 'bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/30';
      case 'holographic':
        return 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-lg border border-white/40 shadow-xl';
      default:
        return 'bg-white/10 backdrop-blur-lg border border-white/20';
    }
  };

  const animationStyles = animate ? 'transition-all duration-500 hover:scale-105 hover:rotate-1' : '';

  return (
    <Card
      className={cn(
        getVariantStyles(),
        animationStyles,
        'relative overflow-hidden group cursor-pointer',
        className
      )}
      onClick={onClick}
      style={{
        borderColor: variant === 'neon' ? glowColor : undefined,
      }}
    >
      {variant === 'holographic' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </Card>
  );
};

export default ModernCard;
