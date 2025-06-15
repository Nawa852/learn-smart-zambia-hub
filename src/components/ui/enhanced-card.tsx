
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass';
  actions?: React.ReactNode;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  title,
  description,
  children,
  className,
  variant = 'default',
  actions,
  badge,
  badgeVariant = 'default',
}) => {
  const variantClasses = {
    default: 'border shadow-md hover:shadow-lg transition-shadow duration-300',
    gradient: 'border-0 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl hover:shadow-2xl transition-all duration-300',
    glass: 'border border-white/20 bg-white/10 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300',
  };

  return (
    <Card className={cn(variantClasses[variant], className)}>
      {title && (
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
            {badge && (
              <Badge variant={badgeVariant}>{badge}</Badge>
            )}
          </div>
          {actions && <div className="mt-3">{actions}</div>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
};
