import { cn } from '@/lib/utils';

type Status = 'online' | 'offline' | 'away' | 'busy';

const statusColors: Record<Status, string> = {
  online: 'bg-emerald-500',
  offline: 'bg-muted-foreground/50',
  away: 'bg-amber-500',
  busy: 'bg-destructive',
};

interface StatusDotProps {
  status: Status;
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  className?: string;
}

export function StatusDot({ status, size = 'sm', pulse = false, className }: StatusDotProps) {
  const sizeClass = size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-2.5 h-2.5' : 'w-3 h-3';

  return (
    <span className={cn('relative inline-flex', className)}>
      <span className={cn('rounded-full', sizeClass, statusColors[status])} />
      {pulse && status === 'online' && (
        <span className={cn('absolute inset-0 rounded-full animate-ping opacity-75', statusColors[status])} />
      )}
    </span>
  );
}
