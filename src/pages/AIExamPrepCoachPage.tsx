import { Calendar, Clock, Globe, GraduationCap, Lightbulb } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: GraduationCap, title: "AI-Powered Prep Generator", desc: "Creates ECZ prep plans with Minimax" },
  { icon: Clock, title: "Dynamic Prep Scheduler", desc: "Schedules prep tasks with GPT-4o" },
  { icon: Calendar, title: "Offline Prep Cache", desc: "Stores plans offline" },
  { icon: Globe, title: "Multilingual Prep Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Prep Recommender", desc: "Suggests prep materials with DeepSeek" },
];

const AIExamPrepCoachPage = () => (
  <FeaturePageLayout
    title="AI Exam Prep Coach"
    subtitle="Prepares students for ECZ exams with AI-powered coaching"
    icon={GraduationCap}
    features={features}
  />
);

export default AIExamPrepCoachPage;
