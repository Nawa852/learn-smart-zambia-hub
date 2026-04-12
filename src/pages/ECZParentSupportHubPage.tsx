import { Calendar, Globe, Lightbulb, MessageSquare, Users } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Users, title: "AI-Powered Parent Guide", desc: "Provides ECZ parenting tips with GPT-4o" },
  { icon: MessageSquare, title: "Dynamic Parent Notifier", desc: "Sends SMS updates with Twilio" },
  { icon: Calendar, title: "Offline Parent Cache", desc: "Stores resources offline" },
  { icon: Globe, title: "Multilingual Parent Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Parent Recommender", desc: "Suggests resources with DeepSeek" },
];

const ECZParentSupportHubPage = () => (
  <FeaturePageLayout
    title="ECZ Parent Support Hub"
    subtitle="Supports parents with ECZ resources and AI-powered guidance"
    icon={Users}
    features={features}
  />
);

export default ECZParentSupportHubPage;
