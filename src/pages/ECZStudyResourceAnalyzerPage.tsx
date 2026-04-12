import { BarChart3, Calendar, FileText, Globe, Lightbulb } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: BarChart3, title: "AI-Powered Resource Analyzer", desc: "Evaluates ECZ resources with Grok" },
  { icon: FileText, title: "Dynamic Analysis Visualizer", desc: "Displays results as charts with GPT-4o" },
  { icon: Calendar, title: "Offline Analysis Cache", desc: "Stores data offline" },
  { icon: Globe, title: "Multilingual Analysis Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Analysis Recommender", desc: "Suggests improvements with DeepSeek" },
];

const ECZStudyResourceAnalyzerPage = () => (
  <FeaturePageLayout
    title="ECZ Study Resource Analyzer"
    subtitle="Analyzes ECZ resource effectiveness with AI-powered insights"
    icon={BarChart3}
    features={features}
  />
);

export default ECZStudyResourceAnalyzerPage;
