import { BarChart3, Calendar, Globe, Lightbulb, TrendingUp } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: BarChart3, title: "AI-Powered Pattern Analyzer", desc: "Tracks ECZ study habits with Gemini" },
  { icon: TrendingUp, title: "Dynamic Analytics Visualizer", desc: "Displays trends as charts with GPT-4o" },
  { icon: Calendar, title: "Offline Analytics Cache", desc: "Stores data offline" },
  { icon: Globe, title: "Multilingual Analytics Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Analytics Recommender", desc: "Suggests strategies with DeepSeek" },
];

const AIStudyAnalyticsPage = () => (
  <FeaturePageLayout
    title="AI Study Analytics"
    subtitle="Analyzes ECZ study patterns with AI-powered insights"
    icon={BarChart3}
    features={features}
  />
);

export default AIStudyAnalyticsPage;
