import { BarChart3, Brain, Calendar, Globe, Lightbulb } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Brain, title: "AI-Powered Insights Analyzer", desc: "Analyzes ECZ study data with Gemini" },
  { icon: BarChart3, title: "Dynamic Insights Visualizer", desc: "Displays trends as charts with GPT-4o" },
  { icon: Calendar, title: "Offline Insights Cache", desc: "Stores data offline" },
  { icon: Globe, title: "Multilingual Insights Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Insights Recommender", desc: "Suggests strategies with DeepSeek" },
];

const AIStudyInsightsPage = () => (
  <FeaturePageLayout
    title="AI Study Insights"
    subtitle="Provides ECZ study analytics with AI-powered insights"
    icon={Brain}
    features={features}
  />
);

export default AIStudyInsightsPage;
