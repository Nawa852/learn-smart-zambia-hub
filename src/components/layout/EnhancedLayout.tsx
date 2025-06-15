
import React from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { PageHeader } from '@/components/ui/page-header';
import { cn } from '@/lib/utils';

interface EnhancedLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  className?: string;
  headerActions?: React.ReactNode;
  showBackButton?: boolean;
}

export const EnhancedLayout: React.FC<EnhancedLayoutProps> = ({
  children,
  title,
  description,
  showHeader = true,
  className,
  headerActions,
  showBackButton = false,
}) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  return (
    <div className={cn('min-h-screen bg-gradient-to-br from-blue-50/30 via-white/50 to-purple-50/30', className)}>
      <div className="container mx-auto px-4 py-8">
        {showHeader && title && (
          <PageHeader
            title={title}
            description={description}
            showBackButton={showBackButton}
          >
            {headerActions}
          </PageHeader>
        )}
        {children}
      </div>
    </div>
  );
};
