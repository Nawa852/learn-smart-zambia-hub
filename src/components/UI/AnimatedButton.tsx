
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: 'cosmic' | 'neon' | 'holographic' | 'pulse';
  icon?: LucideIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  glowColor?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'cosmic',
  icon: Icon,
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  glowColor = '#3b82f6'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'cosmic':
        return 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl';
      case 'neon':
        return `bg-transparent border-2 text-white hover:bg-white/10 shadow-lg hover:shadow-[0_0_20px_${glowColor}]`;
      case 'holographic':
        return 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white shadow-xl';
      case 'pulse':
        return 'bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-xl animate-pulse';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      case 'xl':
        return 'px-10 py-5 text-xl';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        getVariantStyles(),
        getSizeStyles(),
        'relative overflow-hidden group transform transition-all duration-300 hover:scale-105 active:scale-95',
        'before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%] before:skew-x-12 before:transition-transform before:duration-700 hover:before:translate-x-[100%]',
        className
      )}
      style={{
        borderColor: variant === 'neon' ? glowColor : undefined,
      }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </span>
    </Button>
  );
};

export default AnimatedButton;
