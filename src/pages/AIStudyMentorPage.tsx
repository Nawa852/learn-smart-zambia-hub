import { Calendar, Clock, Globe, Lightbulb, UserCheck } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: UserCheck, title: "AI-Powered Mentor Simulator", desc: "Delivers ECZ mentorship with StealthGPT" },
  { icon: Clock, title: "Dynamic Mentor Scheduler", desc: "Schedules sessions with GPT-4o" },
  { icon: Calendar, title: "Offline Mentor Cache", desc: "Stores advice offline" },
  { icon: Globe, title: "Multilingual Mentor Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Mentor Recommender", desc: "Suggests mentors with DeepSeek" },
];

const AIStudyMentorPage = () => (
  <FeaturePageLayout
    title="AI Study Mentor"
    subtitle="Provides ECZ-aligned mentorship with AI-powered guidance"
    icon={UserCheck}
    features={features}
  />
);

export default AIStudyMentorPage;
