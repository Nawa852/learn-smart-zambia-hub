import { Calendar, Clock, Globe, Lightbulb, ListTodo } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Calendar, title: "AI-Powered Schedule Optimizer", desc: "Optimizes ECZ schedules with Moonshot AI" },
  { icon: ListTodo, title: "Dynamic Task Scheduler", desc: "Schedules tasks with GPT-4o" },
  { icon: Clock, title: "Offline Schedule Cache", desc: "Stores schedules offline" },
  { icon: Globe, title: "Multilingual Schedule Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Schedule Recommender", desc: "Suggests tasks with DeepSeek" },
];

const AIStudySchedulerPage = () => (
  <FeaturePageLayout
    title="AI Study Scheduler"
    subtitle="Optimizes ECZ study schedules with AI-powered planning"
    icon={Calendar}
    features={features}
  />
);

export default AIStudySchedulerPage;
