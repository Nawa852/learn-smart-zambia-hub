import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  label?: string;
  className?: string;
}

export function BackButton({ label, className = '' }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size={label ? 'sm' : 'icon'}
      onClick={() => navigate(-1)}
      className={`gap-1.5 text-muted-foreground hover:text-foreground ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {label && <span className="text-sm">{label}</span>}
    </Button>
  );
}
