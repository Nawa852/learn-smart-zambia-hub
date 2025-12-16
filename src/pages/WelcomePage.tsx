import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewOnboardingWizard } from '@/components/Onboarding/NewOnboardingWizard';
import { ThemeProvider } from '@/contexts/ThemeContext';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    // Check if already completed onboarding
    const onboardingCompleted = localStorage.getItem('edu-zambia-onboarding-completed');
    if (onboardingCompleted) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleOnboardingComplete = (data: any) => {
    // Save onboarding data
    localStorage.setItem('edu-zambia-onboarding', JSON.stringify(data));
    localStorage.setItem('edu-zambia-onboarding-completed', 'true');
    localStorage.setItem('edu-zambia-user-type', data.userType);
    
    // Navigate to dashboard
    navigate('/dashboard', { replace: true });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
        {showOnboarding && (
          <NewOnboardingWizard onComplete={handleOnboardingComplete} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default WelcomePage;