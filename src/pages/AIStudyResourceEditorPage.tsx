import { Calendar, Edit, Eye, Globe, Lightbulb } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Edit, title: "AI-Powered Resource Editor", desc: "Edits ECZ resources with Gemini" },
  { icon: Eye, title: "Dynamic Resource Previewer", desc: "Previews edits with GPT-4o" },
  { icon: Calendar, title: "Offline Resource Cache", desc: "Stores edits offline" },
  { icon: Globe, title: "Multilingual Resource Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Resource Recommender", desc: "Suggests edits with DeepSeek" },
];

const AIStudyResourceEditorPage = () => (
  <FeaturePageLayout
    title="AI Study Resource Editor"
    subtitle="Edits ECZ-aligned resources with AI-powered assistance"
    icon={Edit}
    features={features}
  />
);

export default AIStudyResourceEditorPage;
