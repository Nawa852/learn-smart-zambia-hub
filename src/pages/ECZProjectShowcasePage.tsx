import { Calendar, Eye, Globe, Lightbulb, Presentation } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Presentation, title: "AI-Powered Project Curator", desc: "Curates ECZ projects with StealthGPT" },
  { icon: Eye, title: "Dynamic Project Viewer", desc: "Shows project details with GPT-4o" },
  { icon: Calendar, title: "Offline Project Cache", desc: "Stores projects offline" },
  { icon: Globe, title: "Multilingual Project Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Project Recommender", desc: "Suggests projects with DeepSeek" },
];

const ECZProjectShowcasePage = () => (
  <FeaturePageLayout
    title="ECZ Project Showcase"
    subtitle="Displays student ECZ projects with AI-powered curation"
    icon={Presentation}
    features={features}
  />
);

export default ECZProjectShowcasePage;
