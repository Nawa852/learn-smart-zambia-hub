import { Calendar, Clock, Globe, HelpCircle, Lightbulb } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: HelpCircle, title: "AI-Powered Quiz Generator", desc: "Creates ECZ quizzes with Grok" },
  { icon: Clock, title: "Dynamic Quiz Scheduler", desc: "Schedules quizzes with GPT-4o" },
  { icon: Calendar, title: "Offline Quiz Cache", desc: "Stores quizzes offline" },
  { icon: Globe, title: "Multilingual Quiz Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Quiz Recommender", desc: "Suggests quizzes with DeepSeek" },
];

const AIQuizCreatorPage = () => (
  <FeaturePageLayout
    title="AI Quiz Creator"
    subtitle="Generates ECZ-aligned quizzes with AI-powered question creation"
    icon={HelpCircle}
    features={features}
  />
);

export default AIQuizCreatorPage;
