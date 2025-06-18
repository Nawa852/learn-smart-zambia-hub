
import React, { useRef, useEffect } from 'react';

interface FloatingElementsProps {
  count?: number;
  colors?: string[];
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({
  count = 50,
  colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'],
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const element = document.createElement('div');
      element.className = 'absolute rounded-full opacity-20 animate-float';
      element.style.width = Math.random() * 20 + 10 + 'px';
      element.style.height = element.style.width;
      element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      element.style.left = Math.random() * 100 + '%';
      element.style.top = Math.random() * 100 + '%';
      element.style.animationDelay = Math.random() * 5 + 's';
      element.style.animationDuration = (Math.random() * 3 + 4) + 's';
      
      container.appendChild(element);
      elements.push(element);
    }

    return () => {
      elements.forEach(el => el.remove());
    };
  }, [count, colors]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    />
  );
};

export default FloatingElements;
