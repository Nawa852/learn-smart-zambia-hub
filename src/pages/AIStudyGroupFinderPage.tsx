import { Calendar, Globe, Lightbulb, Search, Users } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Users, title: "AI-Powered Group Matcher", desc: "Matches students by ECZ subjects with LLaMA 4" },
  { icon: Search, title: "Dynamic Group Browser", desc: "Displays groups with GPT-4o" },
  { icon: Calendar, title: "Offline Group Cache", desc: "Stores groups offline" },
  { icon: Globe, title: "Multilingual Group Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Group Recommender", desc: "Suggests groups with DeepSeek" },
];

const AIStudyGroupFinderPage = () => (
  <FeaturePageLayout
    title="AI Study Group Finder"
    subtitle="Connects students to ECZ study groups with AI matching"
    icon={Users}
    features={features}
  />
);

export default AIStudyGroupFinderPage;
