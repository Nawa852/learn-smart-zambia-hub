import { Calendar, Clock, Globe, Lightbulb, Zap } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Zap, title: "AI-Powered Motivation Generator", desc: "Creates ECZ motivational content with Grok" },
  { icon: Clock, title: "Dynamic Motivation Scheduler", desc: "Schedules motivational messages with GPT-4o" },
  { icon: Calendar, title: "Offline Motivation Cache", desc: "Stores messages offline" },
  { icon: Globe, title: "Multilingual Motivation Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Motivation Recommender", desc: "Suggests content with DeepSeek" },
];

const AIStudyMotivatorPage = () => (
  <FeaturePageLayout
    title="AI Study Motivator"
    subtitle="Boosts ECZ study motivation with AI-powered content"
    icon={Zap}
    features={features}
  />
);

export default AIStudyMotivatorPage;
