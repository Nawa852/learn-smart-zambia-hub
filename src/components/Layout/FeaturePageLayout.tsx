import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface FeaturePageLayoutProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  features: Feature[];
}

export const FeaturePageLayout: React.FC<FeaturePageLayoutProps> = ({
  title,
  subtitle,
  icon: Icon,
  features,
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-5 lg:space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border/30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-accent/[0.02]" />
        <div className="relative px-4 py-5 lg:px-6 lg:py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <div className="shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl bg-primary/8 text-primary">
              <Icon className="w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-foreground leading-tight">{title}</h1>
              <p className="text-xs text-muted-foreground mt-0.5 max-w-lg leading-relaxed">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="group border-border/30 hover:border-primary/20 hover:shadow-elevated transition-all duration-300 overflow-hidden"
          >
            <CardContent className="p-4 lg:p-5">
              <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/12 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{feature.desc}</p>
              <Button size="sm" variant="secondary" className="w-full h-9 rounded-xl text-xs font-medium border border-border/30 hover:border-primary/30 hover:bg-primary/5 transition-all">
                Access Feature
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
