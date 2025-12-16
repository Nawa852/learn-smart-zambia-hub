import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/Auth/AuthProvider';
import EnhancedLoginForm from './EnhancedLoginForm';
import SecureSignUpForm from './SecureSignUpForm';
import { BookOpenCheck, Globe, Brain, Users, Award, Sparkles } from 'lucide-react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import NewOnboardingWizard from '@/components/Onboarding/NewOnboardingWizard';

const LoginPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading your learning platform...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Show onboarding wizard
  if (showOnboarding) {
    return (
      <NewOnboardingWizard 
        onComplete={(data) => {
          // Store onboarding data in localStorage for now (will be sent to backend later)
          localStorage.setItem('edu-zambia-onboarding', JSON.stringify(data));
          localStorage.setItem('edu-zambia-user-type', data.userType || 'student');
          setShowOnboarding(false);
          navigate('/dashboard');
        }}
      />
    );
  }

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Multi-AI tutors supporting ECZ & Cambridge curricula"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Learn in Bemba, Nyanja, Tonga, and English"
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Connect with peers, mentors, and study groups"
    },
    {
      icon: Award,
      title: "Track Progress",
      description: "Gamified learning with achievements and analytics"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center p-4 relative">
      {/* Theme Switcher */}
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <Card className="grid lg:grid-cols-2 overflow-hidden shadow-2xl border rounded-2xl bg-card">
          {/* Left Panel - Branding & Features */}
          <div className="p-8 lg:p-12 bg-gradient-to-br from-primary to-accent text-primary-foreground flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-background/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <BookOpenCheck size={32} />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">Edu Zambia</h1>
                <p className="opacity-80 text-sm flex items-center gap-1">
                  Powered by <Sparkles className="w-3 h-3" /> BrightSphere
                </p>
              </div>
            </div>
            
            <div className="space-y-6 mb-8">
              <h2 className="text-xl lg:text-2xl font-semibold">
                Transform Your Learning Journey
              </h2>
              <p className="opacity-90 leading-relaxed">
                Join thousands of Zambian students using AI-powered education tools designed 
                for ECZ and Cambridge curricula. Learn smarter with personalized tutoring, 
                multilingual support, and collaborative study groups.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-background/10 rounded-lg backdrop-blur-sm">
                  <feature.icon className="w-5 h-5 opacity-80 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">{feature.title}</h3>
                    <p className="opacity-80 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-xs opacity-70 border-t border-background/30 pt-4">
              © 2025 Edu Zambia. Empowering Zambian students with AI-driven education.
            </div>
          </div>
          
          {/* Right Panel - Authentication Forms */}
          <div className="p-6 lg:p-12 bg-card flex flex-col justify-center">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted p-1 rounded-lg mb-8">
                  <TabsTrigger 
                    value="login" 
                    className="data-[state=active]:bg-background data-[state=active]:shadow-md rounded-md font-medium"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="data-[state=active]:bg-background data-[state=active]:shadow-md rounded-md font-medium"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Welcome Back!</h2>
                    <p className="text-muted-foreground">
                      Continue your learning journey with Edu Zambia's AI-powered platform.
                    </p>
                  </div>
                  
                  <EnhancedLoginForm 
                    onSuccess={() => { /* Navigate handled by AuthProvider */ }} 
                  />

                  <div className="text-center text-sm text-muted-foreground">
                    <p>
                      New to Edu Zambia?{' '}
                      <button
                        onClick={() => setShowOnboarding(true)}
                        className="text-primary hover:text-primary/80 font-medium underline"
                      >
                        Get started with onboarding
                      </button>
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Join Edu Zambia</h2>
                    <p className="text-muted-foreground">
                      Start your AI-powered learning journey today. It's free!
                    </p>
                  </div>
                  
                  <SecureSignUpForm 
                    onSuccess={() => setActiveTab('login')} 
                  />

                  <div className="text-center text-sm text-muted-foreground">
                    <p>
                      Already have an account?{' '}
                      <button
                        onClick={() => setActiveTab('login')}
                        className="text-primary hover:text-primary/80 font-medium underline"
                      >
                        Sign in here
                      </button>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
