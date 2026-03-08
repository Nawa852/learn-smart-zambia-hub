import { cn } from '@/lib/utils';

interface GlowBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'new';
  className?: string;
}

const variants = {
  primary: 'bg-primary/15 text-primary border-primary/30 shadow-[0_0_12px_hsl(var(--primary)/0.2)]',
  success: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30 shadow-[0_0_12px_hsl(142_76%_36%/0.2)]',
  warning: 'bg-amber-500/15 text-amber-600 border-amber-500/30 shadow-[0_0_12px_hsl(45_93%_47%/0.2)]',
  new: 'bg-primary/15 text-primary border-primary/30 shadow-[0_0_12px_hsl(var(--primary)/0.3)] animate-pulse',
};

export function GlowBadge({ children, variant = 'primary', className }: GlowBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all',
      variants[variant],
      className,
    )}>
      {children}
    </span>
  );
}
