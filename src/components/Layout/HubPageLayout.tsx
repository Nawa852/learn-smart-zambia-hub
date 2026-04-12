import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabFromUrl } from '@/hooks/useTabFromUrl';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

export interface HubTab {
  id: string;
  label: string;
  icon: LucideIcon;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  badge?: string;
}

interface QuickLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface HubPageLayoutProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  tabs: HubTab[];
  defaultTab: string;
  accentColor?: string;
  quickLinks?: QuickLink[];
}

const Loader = () => (
  <div className="flex justify-center py-16">
    <LogoLoader text="Loading..." />
  </div>
);

export const HubPageLayout: React.FC<HubPageLayoutProps> = ({
  title,
  subtitle,
  icon: Icon,
  tabs,
  defaultTab,
  quickLinks,
}) => {
  const [tab, setTab] = useTabFromUrl(defaultTab);

  return (
    <div className="space-y-0">
      {/* Hero — clean Google style */}
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border/30 mb-4 lg:mb-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-accent/[0.02]" />
        <div className="relative px-4 py-4 lg:px-6 lg:py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-2xl bg-primary/8 text-primary">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-foreground leading-tight">{title}</h1>
              <p className="text-xs text-muted-foreground mt-0.5 max-w-md leading-relaxed">{subtitle}</p>
            </div>
          </div>
          {quickLinks && quickLinks.length > 0 && (
            <div className="hidden sm:flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/60 hover:bg-secondary text-xs font-medium text-secondary-foreground transition-all border border-border/20 hover:shadow-card"
                >
                  <link.icon className="w-3.5 h-3.5" />
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs — Material Design 3 style */}
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="sticky top-14 z-30 -mx-4 px-4 lg:-mx-6 lg:px-6 py-2 bg-background/95 backdrop-blur-2xl border-b border-border/20">
          <TabsList className="w-full justify-start gap-1 bg-transparent h-auto p-0 overflow-x-auto scrollbar-none">
            {tabs.map((t) => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className={cn(
                  "relative gap-1.5 px-4 py-2 rounded-full text-xs lg:text-[13px] font-medium transition-all whitespace-nowrap shrink-0",
                  "data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none",
                  "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-secondary/50 data-[state=inactive]:hover:text-foreground"
                )}
              >
                <t.icon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                <span>{t.label}</span>
                {t.badge && (
                  <span className="ml-0.5 px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-primary text-primary-foreground leading-none">
                    {t.badge}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="mt-4 lg:mt-5">
          <Suspense fallback={<Loader />}>
            {tabs.map((t) => (
              <TabsContent key={t.id} value={t.id} className="mt-0 focus-visible:outline-none">
                <t.component />
              </TabsContent>
            ))}
          </Suspense>
        </div>
      </Tabs>
    </div>
  );
};
