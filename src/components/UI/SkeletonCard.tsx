import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonCardProps {
  lines?: number;
  hasImage?: boolean;
  className?: string;
}

export function SkeletonCard({ lines = 3, hasImage = false, className = '' }: SkeletonCardProps) {
  return (
    <div className={`rounded-xl border border-border/50 bg-card p-4 space-y-3 ${className}`}>
      {hasImage && <Skeleton className="w-full h-32 rounded-lg" />}
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-3" style={{ width: `${85 - i * 15}%` }} />
      ))}
    </div>
  );
}
