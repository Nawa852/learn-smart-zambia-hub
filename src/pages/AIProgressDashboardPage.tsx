import { BarChart3, Calendar, Globe, Lightbulb, TrendingUp } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: BarChart3, title: "AI-Powered Progress Analyzer", desc: "Tracks ECZ progress with Gemini" },
  { icon: TrendingUp, title: "Dynamic Progress Visualizer", desc: "Displays charts with GPT-4o" },
  { icon: Calendar, title: "Offline Progress Cache", desc: "Stores data offline" },
  { icon: Globe, title: "Multilingual Progress Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Progress Recommender", desc: "Suggests focus areas with DeepSeek" },
];

const AIProgressDashboardPage = () => (
  <FeaturePageLayout
    title="AI Progress Dashboard"
    subtitle="Visualizes ECZ academic progress with AI-powered analytics"
    icon={BarChart3}
    features={features}
  />
);

export default AIProgressDashboardPage;
