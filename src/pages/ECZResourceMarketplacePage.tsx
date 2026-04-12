import { Calendar, Globe, Lightbulb, Search, Store } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Store, title: "AI-Powered Resource Matcher", desc: "Matches resources to needs with LLaMA" },
  { icon: Search, title: "Dynamic Marketplace Browser", desc: "Displays resources with GPT-4o" },
  { icon: Calendar, title: "Offline Marketplace Cache", desc: "Stores listings offline" },
  { icon: Globe, title: "Multilingual Marketplace Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Resource Recommender", desc: "Suggests resources with DeepSeek" },
];

const ECZResourceMarketplacePage = () => (
  <FeaturePageLayout
    title="ECZ Resource Marketplace"
    subtitle="Buys/sells ECZ-aligned resources with AI-powered matching"
    icon={Store}
    features={features}
  />
);

export default ECZResourceMarketplacePage;
