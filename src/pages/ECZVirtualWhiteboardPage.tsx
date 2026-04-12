import { Calendar, Edit, Globe, Lightbulb, Users } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Edit, title: "AI-Powered Whiteboard Generator", desc: "Creates ECZ whiteboards with Claude 3" },
  { icon: Users, title: "Dynamic Whiteboard Collaborator", desc: "Enables real-time collaboration with GPT-4o" },
  { icon: Calendar, title: "Offline Whiteboard Cache", desc: "Stores whiteboards offline" },
  { icon: Globe, title: "Multilingual Whiteboard Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Whiteboard Recommender", desc: "Suggests templates with DeepSeek" },
];

const ECZVirtualWhiteboardPage = () => (
  <FeaturePageLayout
    title="ECZ Virtual Whiteboard"
    subtitle="Collaborative ECZ study tool with AI-powered features"
    icon={Edit}
    features={features}
  />
);

export default ECZVirtualWhiteboardPage;
