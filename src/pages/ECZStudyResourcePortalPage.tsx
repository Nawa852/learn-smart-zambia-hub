import { Calendar, Globe, Lightbulb, Search, Volume2 } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Globe, title: "AI-Powered Resource Portal", desc: "Curates ECZ resources with Minimax" },
  { icon: Search, title: "Dynamic Resource Browser", desc: "Displays resources with GPT-4o" },
  { icon: Calendar, title: "Offline Resource Cache", desc: "Stores resources offline" },
  { icon: Volume2, title: "Multilingual Resource Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Resource Recommender", desc: "Suggests resources with DeepSeek" },
];

const ECZStudyResourcePortalPage = () => (
  <FeaturePageLayout
    title="ECZ Study Resource Portal"
    subtitle="Central portal for ECZ resources with AI-powered curation and management"
    icon={Globe}
    features={features}
  />
);

export default ECZStudyResourcePortalPage;
