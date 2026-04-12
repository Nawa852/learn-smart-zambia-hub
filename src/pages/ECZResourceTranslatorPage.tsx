import { Calendar, Globe, Languages, Lightbulb, Volume2 } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: Languages, title: "AI-Powered Translator", desc: "Translates ECZ content with Qwen" },
  { icon: Calendar, title: "Dynamic Translation Scheduler", desc: "Schedules translations with GPT-4o" },
  { icon: Globe, title: "Offline Translation Cache", desc: "Stores translations offline" },
  { icon: Volume2, title: "Multilingual Translation Narrator", desc: "Narrates in 7 languages with Whisper" },
  { icon: Lightbulb, title: "AI-Powered Translation Recommender", desc: "Suggests content with DeepSeek" },
];

const ECZResourceTranslatorPage = () => (
  <FeaturePageLayout
    title="ECZ Resource Translator"
    subtitle="Translates ECZ resources into 7 Zambian languages"
    icon={Globe}
    features={features}
  />
);

export default ECZResourceTranslatorPage;
