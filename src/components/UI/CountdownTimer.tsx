import { useCountdown } from '@/hooks/useCountdown';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  targetDate: Date | string;
  label?: string;
  className?: string;
}

export function CountdownTimer({ targetDate, label, className }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    return <span className={cn('text-sm text-destructive font-medium', className)}>Expired</span>;
  }

  const isUrgent = days === 0 && hours < 6;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Clock className={cn('w-4 h-4', isUrgent ? 'text-destructive' : 'text-muted-foreground')} />
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
      <div className="flex items-center gap-1">
        {days > 0 && (
          <span className="text-sm font-mono font-semibold text-foreground">{days}d</span>
        )}
        <span className={cn(
          'text-sm font-mono font-semibold',
          isUrgent ? 'text-destructive' : 'text-foreground'
        )}>
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
