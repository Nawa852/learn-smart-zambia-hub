import { Calendar, Edit, FileText, Globe, Lightbulb } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Edit, title: "AI-Powered Notes Generator", desc: "Creates ECZ notes with Claude 3" },
  { icon: FileText, title: "Dynamic Notes Organizer", desc: "Categorizes notes with GPT-4o" },
  { icon: Calendar, title: "Offline Notes Cache", desc: "Stores notes offline" },
  { icon: Globe, title: "Multilingual Notes Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Notes Recommender", desc: "Suggests note topics with DeepSeek" },
];

const ECZStudyNotesEditorPage = () => (
  <FeaturePageLayout
    title="ECZ Study Notes Editor"
    subtitle="Creates and edits ECZ-aligned notes with AI assistance"
    icon={Edit}
    features={features}
  />
);

export default ECZStudyNotesEditorPage;
