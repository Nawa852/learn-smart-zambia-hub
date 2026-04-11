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
  accentColor = 'primary',
  quickLinks,
}) => {
  const [tab, setTab] = useTabFromUrl(defaultTab);

  return (
    <div className="space-y-0">
      {/* Hero Header — compact on mobile, expanded on desktop */}
      <div className="relative overflow-hidden rounded-xl lg:rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 mb-4 lg:mb-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="relative px-4 py-4 lg:px-6 lg:py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="shrink-0 flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">{title}</h1>
              <p className="text-xs lg:text-sm text-muted-foreground mt-0.5 max-w-lg">{subtitle}</p>
            </div>
          </div>
          {quickLinks && quickLinks.length > 0 && (
            <div className="hidden sm:flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/80 hover:bg-secondary text-xs font-medium text-secondary-foreground transition-colors border border-border/50"
                >
                  <link.icon className="w-3.5 h-3.5" />
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation — scrollable pill-style on mobile */}
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="sticky top-12 lg:top-14 z-30 -mx-4 px-4 lg:-mx-6 lg:px-6 py-2 bg-background/95 backdrop-blur-md border-b border-border/40">
          <TabsList className="w-full justify-start gap-1 bg-transparent h-auto p-0 overflow-x-auto scrollbar-none">
            {tabs.map((t) => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className={cn(
                  "relative gap-1.5 px-3 lg:px-4 py-2 rounded-full lg:rounded-lg text-xs lg:text-sm font-medium transition-all whitespace-nowrap shrink-0",
                  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm",
                  "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-secondary/60 data-[state=inactive]:hover:text-foreground"
                )}
              >
                <t.icon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                <span>{t.label}</span>
                {t.badge && (
                  <span className="ml-0.5 px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-accent text-accent-foreground leading-none">
                    {t.badge}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab Content */}
        <div className="mt-4 lg:mt-6">
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
