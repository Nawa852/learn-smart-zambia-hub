import React from 'react';
import { HubPageLayout, HubTab } from '@/components/Layout/HubPageLayout';
import { LayoutDashboard, Building2, PieChart, Shield, DollarSign, FileText, Zap } from 'lucide-react';

const tabs: HubTab[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, component: React.lazy(() => import('@/pages/MinistryDashboard')) },
  { id: 'live', label: 'Live Stats', icon: Zap, component: React.lazy(() => import('@/pages/MinistryLiveStatsPage')), badge: 'LIVE' },
  { id: 'schools', label: 'Schools', icon: Building2, component: React.lazy(() => import('@/pages/MinistrySchoolRegistryPage')) },
  { id: 'analytics', label: 'ECZ Analytics', icon: PieChart, component: React.lazy(() => import('@/pages/MinistryECZAnalyticsPage')) },
  { id: 'policy', label: 'Policies', icon: Shield, component: React.lazy(() => import('@/pages/MinistryPolicyTrackerPage')) },
  { id: 'budget', label: 'Budget', icon: DollarSign, component: React.lazy(() => import('@/pages/MinistryBudgetPage')) },
  { id: 'reports', label: 'Reports', icon: FileText, component: React.lazy(() => import('@/pages/MinistryReportGeneratorPage')) },
];

const MinistryHub = () => (
  <HubPageLayout
    title="Ministry of Education"
    subtitle="National education oversight, analytics, and policy management."
    icon={Building2}
    tabs={tabs}
    defaultTab="overview"
  />
);

export default MinistryHub;
