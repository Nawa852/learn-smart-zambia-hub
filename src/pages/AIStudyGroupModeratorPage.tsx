import { Calendar, Globe, Lightbulb, Shield, Users } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Shield, title: "AI-Powered Group Moderator", desc: "Moderates ECZ discussions with GPT-4o" },
  { icon: Users, title: "Dynamic Group Chat", desc: "Facilitates discussions with Claude 3" },
  { icon: Calendar, title: "Offline Group Cache", desc: "Stores chats offline" },
  { icon: Globe, title: "Multilingual Group Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Group Recommender", desc: "Suggests topics with DeepSeek" },
];

const AIStudyGroupModeratorPage = () => (
  <FeaturePageLayout
    title="AI Study Group Moderator"
    subtitle="Moderates ECZ study groups with AI-powered oversight"
    icon={Shield}
    features={features}
  />
);

export default AIStudyGroupModeratorPage;
