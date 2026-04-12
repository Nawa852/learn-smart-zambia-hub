import { Calendar, CheckCircle, FileText, Globe, Lightbulb } from 'lucide-react';
import { FeaturePageLayout } from '@/components/Layout/FeaturePageLayout';

const features = [
  { icon: CheckCircle, title: "AI-Powered Validation Engine", desc: "Validates ECZ resources with Minimax" },
  { icon: FileText, title: "Dynamic Validation Report", desc: "Generates quality reports with GPT-4o" },
  { icon: Calendar, title: "Offline Validation Cache", desc: "Stores reports offline" },
  { icon: Globe, title: "Multilingual Validation Narrator", desc: "Narrates in 7 languages" },
  { icon: Lightbulb, title: "AI-Powered Validation Recommender", desc: "Suggests improvements with DeepSeek" },
];

const ECZResourceValidatorPage = () => (
  <FeaturePageLayout
    title="ECZ Resource Validator"
    subtitle="Ensures ECZ resource quality with AI-powered validation"
    icon={CheckCircle}
    features={features}
  />
);

export default ECZResourceValidatorPage;
