import { Calendar, Eye, Globe, Lightbulb, Plus } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Plus, title: "AI-Powered Resource Generator", desc: "Creates ECZ resources with Claude 3" },
  { icon: Eye, title: "Dynamic Resource Previewer", desc: "Previews resources with GPT-4o" },
  { icon: Calendar, title: "Offline Resource Cache", desc: "Stores resources offline" },
  { icon: Globe, title: "Multilingual Resource Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Resource Recommender", desc: "Suggests content with DeepSeek" },
];

const ECZStudyResourceCreatorPage = () => (
  <FeaturePageLayout
    title="ECZ Study Resource Creator"
    subtitle="Creates ECZ-aligned resources with AI-powered generation"
    icon={Plus}
    features={features}
  />
);

export default ECZStudyResourceCreatorPage;
