import { Calendar, Globe, Lightbulb, Share, Users } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Share, title: "AI-Powered Resource Sharer", desc: "Shares ECZ resources with StealthGPT" },
  { icon: Users, title: "Dynamic Sharing Feed", desc: "Displays shared resources with GPT-4o" },
  { icon: Calendar, title: "Offline Sharing Cache", desc: "Stores resources offline" },
  { icon: Globe, title: "Multilingual Sharing Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Sharing Recommender", desc: "Suggests resources with DeepSeek" },
];

const ECZResourceSharingHubPage = () => (
  <FeaturePageLayout
    title="ECZ Resource Sharing Hub"
    subtitle="Shares ECZ resources with peers using AI-powered matching"
    icon={Share}
    features={features}
  />
);

export default ECZResourceSharingHubPage;
