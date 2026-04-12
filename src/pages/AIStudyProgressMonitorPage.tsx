import { Calendar, Globe, Lightbulb, Monitor, TrendingUp } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Monitor, title: "AI-Powered Progress Monitor", desc: "Tracks ECZ progress with Gemini" },
  { icon: TrendingUp, title: "Dynamic Progress Visualizer", desc: "Displays charts with GPT-4o" },
  { icon: Calendar, title: "Offline Progress Cache", desc: "Stores data offline" },
  { icon: Globe, title: "Multilingual Progress Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Progress Recommender", desc: "Suggests focus areas with DeepSeek" },
];

const AIStudyProgressMonitorPage = () => (
  <FeaturePageLayout
    title="AI Study Progress Monitor"
    subtitle="Monitors ECZ study progress with AI-powered tracking"
    icon={Monitor}
    features={features}
  />
);

export default AIStudyProgressMonitorPage;
