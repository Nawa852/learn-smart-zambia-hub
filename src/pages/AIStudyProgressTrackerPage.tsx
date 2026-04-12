import { BarChart3, Calendar, Globe, Lightbulb, TrendingUp } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: TrendingUp, title: "AI-Powered Progress Tracker", desc: "Tracks ECZ progress with LLaMA 4" },
  { icon: BarChart3, title: "Dynamic Progress Visualizer", desc: "Displays charts with Gemini" },
  { icon: Calendar, title: "Offline Progress Cache", desc: "Stores data offline" },
  { icon: Globe, title: "Multilingual Progress Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Progress Recommender", desc: "Suggests focus areas with DeepSeek" },
];

const AIStudyProgressTrackerPage = () => (
  <FeaturePageLayout
    title="AI Study Progress Tracker"
    subtitle="Tracks ECZ study progress with AI-powered analytics"
    icon={TrendingUp}
    features={features}
  />
);

export default AIStudyProgressTrackerPage;
