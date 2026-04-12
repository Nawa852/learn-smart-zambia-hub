import { BarChart3, Calendar, Globe, Lightbulb, PieChart } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: BarChart3, title: "AI-Powered Progress Visualizer", desc: "Displays ECZ progress with Moonshot AI" },
  { icon: PieChart, title: "Dynamic Progress Analyzer", desc: "Analyzes progress with GPT-4o" },
  { icon: Calendar, title: "Offline Progress Cache", desc: "Stores data offline" },
  { icon: Globe, title: "Multilingual Progress Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Progress Recommender", desc: "Suggests focus areas with DeepSeek" },
];

const AIStudyProgressVisualizerPage = () => (
  <FeaturePageLayout
    title="AI Study Progress Visualizer"
    subtitle="Visualizes ECZ progress with AI-powered analytics"
    icon={BarChart3}
    features={features}
  />
);

export default AIStudyProgressVisualizerPage;
