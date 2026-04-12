import { Bot, Calendar, Clock, Globe, Lightbulb } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Bot, title: "AI-Powered Tutor Simulator", desc: "Delivers ECZ tutoring with Claude 3" },
  { icon: Clock, title: "Dynamic Tutor Scheduler", desc: "Schedules sessions with GPT-4o" },
  { icon: Calendar, title: "Offline Tutor Cache", desc: "Stores responses offline" },
  { icon: Globe, title: "Multilingual Tutor Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Tutor Recommender", desc: "Suggests topics with DeepSeek" },
];

const ECZVirtualTutorPage = () => (
  <FeaturePageLayout
    title="ECZ Virtual Tutor"
    subtitle="Provides virtual ECZ tutoring with AI-powered personalization"
    icon={Bot}
    features={features}
  />
);

export default ECZVirtualTutorPage;
