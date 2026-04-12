import { BookOpen, Calendar, Globe, Lightbulb, Search } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Search, title: "AI-Powered Resource Finder", desc: "Locates ECZ resources with GPT-4o" },
  { icon: BookOpen, title: "Dynamic Resource Browser", desc: "Displays resources with Claude 3" },
  { icon: Calendar, title: "Offline Resource Cache", desc: "Stores resources offline" },
  { icon: Globe, title: "Multilingual Resource Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Resource Recommender", desc: "Suggests resources with DeepSeek" },
];

const AIStudyResourceFinderPage = () => (
  <FeaturePageLayout
    title="AI Study Resource Finder"
    subtitle="Finds ECZ-aligned resources with AI-powered search"
    icon={Search}
    features={features}
  />
);

export default AIStudyResourceFinderPage;
