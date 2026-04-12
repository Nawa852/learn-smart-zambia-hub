import { Calendar, Globe, Lightbulb, MessageSquare, Users } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Users, title: "AI-Powered Community Builder", desc: "Creates ECZ communities with Moonshot AI" },
  { icon: MessageSquare, title: "Dynamic Community Feed", desc: "Displays community posts with GPT-4o" },
  { icon: Calendar, title: "Offline Community Cache", desc: "Stores posts offline" },
  { icon: Globe, title: "Multilingual Community Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Community Recommender", desc: "Suggests communities with DeepSeek" },
];

const ECZStudyCommunityPage = () => (
  <FeaturePageLayout
    title="ECZ Study Community"
    subtitle="Builds ECZ-aligned communities with AI-powered engagement"
    icon={Users}
    features={features}
  />
);

export default ECZStudyCommunityPage;
