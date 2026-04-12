import { BarChart3, Calendar, Globe, Lightbulb, MessageSquare } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: MessageSquare, title: "AI-Powered Feedback Analyzer", desc: "Analyzes ECZ feedback with Moonshot AI" },
  { icon: BarChart3, title: "Dynamic Feedback Visualizer", desc: "Displays trends with Gemini" },
  { icon: Calendar, title: "Offline Feedback Cache", desc: "Stores feedback offline" },
  { icon: Globe, title: "Multilingual Feedback Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Feedback Recommender", desc: "Suggests improvements with DeepSeek" },
];

const AIFeedbackPortalPage = () => (
  <FeaturePageLayout
    title="AI Feedback Portal"
    subtitle="Collects and analyzes ECZ feedback with AI-powered insights"
    icon={MessageSquare}
    features={features}
  />
);

export default AIFeedbackPortalPage;
