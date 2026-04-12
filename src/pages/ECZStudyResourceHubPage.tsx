import { BookOpen, Calendar, Globe, Lightbulb, Search } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: BookOpen, title: "AI-Powered Resource Curator", desc: "Curates ECZ resources with StealthGPT" },
  { icon: Search, title: "Dynamic Resource Browser", desc: "Displays resources with GPT-4o" },
  { icon: Calendar, title: "Offline Resource Cache", desc: "Stores resources offline" },
  { icon: Globe, title: "Multilingual Resource Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Resource Recommender", desc: "Suggests resources with DeepSeek" },
];

const ECZStudyResourceHubPage = () => (
  <FeaturePageLayout
    title="ECZ Study Resource Hub"
    subtitle="Central hub for ECZ resources with AI-powered curation"
    icon={BookOpen}
    features={features}
  />
);

export default ECZStudyResourceHubPage;
