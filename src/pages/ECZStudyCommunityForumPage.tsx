import { Calendar, Globe, Lightbulb, MessageCircle, Users } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: MessageCircle, title: "AI-Powered Forum Moderator", desc: "Moderates ECZ discussions with Minimax" },
  { icon: Users, title: "Dynamic Forum Feed", desc: "Displays posts with GPT-4o" },
  { icon: Calendar, title: "Offline Forum Cache", desc: "Stores posts offline" },
  { icon: Globe, title: "Multilingual Forum Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Forum Recommender", desc: "Suggests topics with DeepSeek" },
];

const ECZStudyCommunityForumPage = () => (
  <FeaturePageLayout
    title="ECZ Study Community Forum"
    subtitle="Hosts ECZ community discussions with AI-powered moderation"
    icon={MessageCircle}
    features={features}
  />
);

export default ECZStudyCommunityForumPage;
