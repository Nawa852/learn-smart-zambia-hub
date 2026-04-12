import { BookOpen, Calendar, Clock, Globe, Lightbulb } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: BookOpen, title: "AI-Powered Journal Prompter", desc: "Generates ECZ prompts with GPT-4o" },
  { icon: Clock, title: "Dynamic Journal Scheduler", desc: "Schedules entries with Claude 3" },
  { icon: Calendar, title: "Offline Journal Cache", desc: "Stores journals offline" },
  { icon: Globe, title: "Multilingual Journal Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Journal Recommender", desc: "Suggests topics with DeepSeek" },
];

const AIStudyJournalPage = () => (
  <FeaturePageLayout
    title="AI Study Journal"
    subtitle="Facilitates ECZ-aligned journaling with AI-powered prompts"
    icon={BookOpen}
    features={features}
  />
);

export default AIStudyJournalPage;
