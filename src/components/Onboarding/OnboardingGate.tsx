import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface OnboardingGateProps {
  children: React.ReactNode;
}

export const OnboardingGate = ({ children }: OnboardingGateProps) => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const onboardingData = localStorage.getItem('edu-zambia-onboarding');
    const onboardingCompleted = localStorage.getItem('edu-zambia-onboarding-completed');
    
    if (!onboardingData || !onboardingCompleted) {
      navigate('/welcome', { replace: true });
    } else {
      setIsReady(true);
    }
  }, [navigate]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
};