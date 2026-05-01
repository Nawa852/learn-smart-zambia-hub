import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
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
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-border/30 bg-gradient-to-br from-card via-card to-card/60">
        {/* Ambient glow */}
        <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-primary/[0.10] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-accent/[0.08] blur-3xl pointer-events-none" />

        <div className="relative px-5 py-6 lg:px-8 lg:py-9">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-5 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back
          </button>

          <div className="flex items-start gap-4">
            <div className="shrink-0 relative">
              <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl" />
              <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-elevated">
                <Icon className="w-7 h-7" strokeWidth={2.2} />
              </div>
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/15 text-[10px] font-semibold text-primary uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                AI Feature
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-foreground leading-tight tracking-tight">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden border-border/30 bg-card hover:border-primary/30 hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            style={{ animation: `slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms backwards` }}
          >
            {/* Hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />

            <CardContent className="relative p-5 lg:p-6">
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary" strokeWidth={2.2} />
              </div>
              <h3 className="font-bold text-[15px] text-foreground mb-1.5 leading-tight">
                {feature.title}
              </h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">
                {feature.desc}
              </p>
              <Button
                size="sm"
                variant="ghost"
                className="w-full h-9 rounded-xl text-xs font-semibold text-primary hover:text-primary hover:bg-primary/10 group/btn"
              >
                Try Feature
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
