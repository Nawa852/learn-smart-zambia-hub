import { useNavigate } from 'react-router-dom';
import { StudyScheduleWizard } from '@/components/Onboarding/StudyScheduleWizard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function SetupSchedulePage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto py-6 space-y-4">
      <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4" /> Back
      </Button>
      <div>
        <h1 className="text-2xl font-bold">Plan your study schedule</h1>
        <p className="text-sm text-muted-foreground">Add the times you'd like to focus on each subject. Skip and come back anytime.</p>
      </div>
      <StudyScheduleWizard onDone={() => navigate('/dashboard')} />
    </div>
  );
}
