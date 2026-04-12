import { Calendar, CheckSquare, Clock, Globe, Lightbulb } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: CheckSquare, title: "AI-Powered Task Generator", desc: "Creates ECZ tasks with LLaMA 4" },
  { icon: Clock, title: "Dynamic Task Scheduler", desc: "Schedules tasks with GPT-4o" },
  { icon: Calendar, title: "Offline Task Cache", desc: "Stores tasks offline" },
  { icon: Globe, title: "Multilingual Task Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Task Recommender", desc: "Suggests tasks with DeepSeek" },
];

const AIStudyTaskManagerPage = () => (
  <FeaturePageLayout
    title="AI Study Task Manager"
    subtitle="Manages ECZ study tasks with AI-powered organization"
    icon={CheckSquare}
    features={features}
  />
);

export default AIStudyTaskManagerPage;
