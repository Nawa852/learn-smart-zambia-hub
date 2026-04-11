import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabFromUrl } from '@/hooks/useTabFromUrl';
import { LogoLoader } from '@/components/UI/LogoLoader';
import { LayoutDashboard, Building2, PieChart, Shield, DollarSign, FileText, Zap } from 'lucide-react';

const MinistryDashboard = React.lazy(() => import('@/pages/MinistryDashboard'));
const MinistrySchoolRegistryPage = React.lazy(() => import('@/pages/MinistrySchoolRegistryPage'));
const MinistryECZAnalyticsPage = React.lazy(() => import('@/pages/MinistryECZAnalyticsPage'));
const MinistryPolicyTrackerPage = React.lazy(() => import('@/pages/MinistryPolicyTrackerPage'));
const MinistryBudgetPage = React.lazy(() => import('@/pages/MinistryBudgetPage'));
const MinistryReportGeneratorPage = React.lazy(() => import('@/pages/MinistryReportGeneratorPage'));
const MinistryLiveStatsPage = React.lazy(() => import('@/pages/MinistryLiveStatsPage'));

const Loader = () => <div className="flex justify-center py-12"><LogoLoader text="Loading..." /></div>;

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'live', label: 'Live Stats', icon: Zap },
  { id: 'schools', label: 'Schools', icon: Building2 },
  { id: 'analytics', label: 'ECZ Analytics', icon: PieChart },
  { id: 'policy', label: 'Policies', icon: Shield },
  { id: 'budget', label: 'Budget', icon: DollarSign },
  { id: 'reports', label: 'Reports', icon: FileText },
];

const MinistryHub = () => {
  const [tab, setTab] = useTabFromUrl('overview');

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Ministry of Education</h1>
        <p className="text-muted-foreground text-sm">National education oversight, analytics, and policy management.</p>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full justify-start overflow-x-auto">
          {tabs.map(t => (
            <TabsTrigger key={t.id} value={t.id} className="gap-1.5">
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <Suspense fallback={<Loader />}>
          <TabsContent value="overview"><MinistryDashboard /></TabsContent>
          <TabsContent value="live"><MinistryLiveStatsPage /></TabsContent>
          <TabsContent value="schools"><MinistrySchoolRegistryPage /></TabsContent>
          <TabsContent value="analytics"><MinistryECZAnalyticsPage /></TabsContent>
          <TabsContent value="policy"><MinistryPolicyTrackerPage /></TabsContent>
          <TabsContent value="budget"><MinistryBudgetPage /></TabsContent>
          <TabsContent value="reports"><MinistryReportGeneratorPage /></TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
};

export default MinistryHub;
