import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useClipboard } from '@/hooks/useClipboard';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'icon';
}

export function CopyButton({ text, className = '', size = 'icon' }: CopyButtonProps) {
  const { copied, copy } = useClipboard();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size={size === 'sm' ? 'sm' : 'icon'}
          className={`h-7 w-7 text-muted-foreground hover:text-foreground ${className}`}
          onClick={() => copy(text)}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{copied ? 'Copied!' : 'Copy'}</TooltipContent>
    </Tooltip>
  );
}
