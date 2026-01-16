import { ComprehensiveLearnerDashboard } from '@/components/LearnerDashboard';

interface StudentDashboardViewProps {
  userName: string;
}

export const StudentDashboardView = ({ userName }: StudentDashboardViewProps) => {
  return <ComprehensiveLearnerDashboard userName={userName} />;
};