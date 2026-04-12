import { Calendar, Globe, MessageSquare, Share, Users } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Users, title: "AI-Powered Communication Matcher", desc: "Matches parents to teachers with GPT-4o" },
  { icon: MessageSquare, title: "Dynamic Communication Notifier", desc: "Sends SMS updates with Twilio" },
  { icon: Calendar, title: "Offline Communication Cache", desc: "Stores messages offline" },
  { icon: Globe, title: "Multilingual Communication Narrator", desc: "Narrates in 7 languages" },
  { icon: Share, title: "AI-Powered Resource Sharer", desc: "Suggests resources with DeepSeek" },
];

const ECZParentTeacherPortalPage = () => (
  <FeaturePageLayout
    title="ECZ Parent-Teacher Portal"
    subtitle="Connects parents and teachers for ECZ updates with AI support"
    icon={Users}
    features={features}
  />
);

export default ECZParentTeacherPortalPage;
