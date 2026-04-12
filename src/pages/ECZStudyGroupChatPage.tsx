import { Calendar, Globe, Lightbulb, MessageSquare, Users } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: MessageSquare, title: "AI-Powered Chat Moderator", desc: "Moderates ECZ discussions with Claude 3" },
  { icon: Users, title: "Dynamic Chat Organizer", desc: "Organizes chats by topic with GPT-4o" },
  { icon: Calendar, title: "Offline Chat Cache", desc: "Stores chats offline" },
  { icon: Globe, title: "Multilingual Chat Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Chat Recommender", desc: "Suggests topics with DeepSeek" },
];

const ECZStudyGroupChatPage = () => (
  <FeaturePageLayout
    title="ECZ Study Group Chat"
    subtitle="Facilitates ECZ group discussions with AI-powered moderation"
    icon={MessageSquare}
    features={features}
  />
);

export default ECZStudyGroupChatPage;
