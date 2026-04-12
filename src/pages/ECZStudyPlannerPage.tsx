import { Calendar, Clock, Globe, Lightbulb, ListTodo } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Calendar, title: "AI-Powered Schedule Generator", desc: "Creates ECZ schedules with Minimax" },
  { icon: ListTodo, title: "Dynamic Task Prioritizer", desc: "Prioritizes tasks with GPT-4o" },
  { icon: Clock, title: "Offline Schedule Cache", desc: "Stores schedules offline" },
  { icon: Globe, title: "Multilingual Schedule Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Schedule Recommender", desc: "Suggests tasks with DeepSeek" },
];

const ECZStudyPlannerPage = () => (
  <FeaturePageLayout
    title="ECZ Study Planner"
    subtitle="Plans ECZ study schedules with AI-powered optimization"
    icon={Calendar}
    features={features}
  />
);

export default ECZStudyPlannerPage;
