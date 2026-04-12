import { Calendar, Eye, FileText, Globe, Lightbulb } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: FileText, title: "AI-Powered Annotation Generator", desc: "Annotates ECZ resources with LLaMA 4" },
  { icon: Eye, title: "Dynamic Annotation Viewer", desc: "Displays annotations with GPT-4o" },
  { icon: Calendar, title: "Offline Annotation Cache", desc: "Stores annotations offline" },
  { icon: Globe, title: "Multilingual Annotation Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Annotation Recommender", desc: "Suggests annotations with DeepSeek" },
];

const ECZResourceAnnotatorPage = () => (
  <FeaturePageLayout
    title="ECZ Resource Annotator"
    subtitle="Annotates ECZ resources with AI insights and explanations"
    icon={FileText}
    features={features}
  />
);

export default ECZResourceAnnotatorPage;
