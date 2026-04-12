import { Beaker, Calendar, Eye, Globe, Lightbulb } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Beaker, title: "AI-Powered Lab Simulator", desc: "Simulates ECZ experiments with Grok" },
  { icon: Eye, title: "Dynamic Lab Visualizer", desc: "Displays simulations with GPT-4o" },
  { icon: Calendar, title: "Offline Lab Cache", desc: "Stores simulations offline" },
  { icon: Globe, title: "Multilingual Lab Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Lab Recommender", desc: "Suggests experiments with DeepSeek" },
];

const ECZVirtualLabSimulatorPage = () => (
  <FeaturePageLayout
    title="ECZ Virtual Lab Simulator"
    subtitle="Simulates ECZ science labs with AI-powered experiments"
    icon={Beaker}
    features={features}
  />
);

export default ECZVirtualLabSimulatorPage;
