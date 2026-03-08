import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/Auth/AuthProvider';
import EnhancedLoginForm from './EnhancedLoginForm';
import SecureSignUpForm from './SecureSignUpForm';
import { BookOpenCheck, Globe, Brain, Users, Award, Zap } from 'lucide-react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import NewOnboardingWizard from '@/components/Onboarding/NewOnboardingWizard';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading your learning platform...</p>
        </div>
      </div>
    );
  }

  if (user) return <Navigate to="/dashboard" replace />;

  if (showOnboarding) {
    return (
      <NewOnboardingWizard 
        onComplete={(data) => {
          localStorage.setItem('edu-zambia-onboarding', JSON.stringify(data));
          localStorage.setItem('edu-zambia-user-type', data.userType || 'student');
          setShowOnboarding(false);
          navigate('/dashboard');
        }}
      />
    );
  }

  const features = [
    { icon: Brain, title: "AI-Powered Learning", description: "Multi-AI tutors supporting ECZ & Cambridge curricula" },
    { icon: Globe, title: "Multilingual Support", description: "Learn in Bemba, Nyanja, Tonga, and English" },
    { icon: Users, title: "Community Learning", description: "Connect with peers, mentors, and study groups" },
    { icon: Award, title: "Track Progress", description: "Gamified learning with achievements and analytics" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="absolute top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <Card className="grid lg:grid-cols-2 overflow-hidden shadow-card-hover rounded-2xl bg-card border border-border">
          {/* Left Panel */}
          <div className="p-8 lg:p-12 bg-primary text-primary-foreground flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-10 right-10 w-32 h-32 bg-primary-foreground/10 rounded-full blur-2xl" />
            <motion.div className="flex items-center gap-4 mb-8 relative z-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <motion.div className="w-16 h-16 bg-primary-foreground/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-primary-foreground/10" whileHover={{ scale: 1.05 }}>
                <BookOpenCheck size={32} />
              </motion.div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Edu Zambia</h1>
                <p className="opacity-90 text-sm flex items-center gap-1 font-medium">
                  <Zap className="w-3 h-3" /> Powered by BrightSphere
                </p>
              </div>
            </motion.div>
            
            <motion.div className="space-y-6 mb-8 relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h2 className="text-xl lg:text-2xl font-bold leading-tight">Transform Your Learning Journey</h2>
              <p className="opacity-95 leading-relaxed text-sm lg:text-base">
                Join thousands of Zambian students using AI-powered education tools designed for ECZ and Cambridge curricula.
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
              {features.map((feature, index) => (
                <motion.div key={index} className="flex items-start space-x-3 p-3 bg-primary-foreground/10 rounded-lg border border-primary-foreground/10" whileHover={{ y: -2 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }}>
                  <feature.icon className="w-5 h-5 opacity-90 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="opacity-80 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="text-xs opacity-70 border-t border-primary-foreground/20 pt-4 relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
              © 2025 Edu Zambia. Empowering Zambian students with AI-driven education.
            </motion.div>
          </div>
          
          {/* Right Panel */}
          <motion.div className="p-6 lg:p-12 bg-card flex flex-col justify-center" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-secondary p-1 rounded-lg mb-8">
                  <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-semibold transition-all">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-semibold transition-all">
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-6 animate-fade-in">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold text-primary">Welcome Back!</h2>
                    <p className="text-muted-foreground text-sm">Continue your learning journey with Edu Zambia's AI-powered platform.</p>
                  </div>
                  <EnhancedLoginForm onSuccess={() => {}} />
                  <div className="text-center text-sm text-muted-foreground">
                    <p>New to Edu Zambia?{' '}
                      <button onClick={() => setShowOnboarding(true)} className="text-primary hover:text-primary/80 font-medium underline">Get started with onboarding</button>
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-6 animate-fade-in">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold text-primary">Join Edu Zambia</h2>
                    <p className="text-muted-foreground text-sm">Start your AI-powered learning journey today. It's free!</p>
                  </div>
                  <SecureSignUpForm onSuccess={() => setActiveTab('login')} />
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Already have an account?{' '}
                      <button onClick={() => setActiveTab('login')} className="text-primary hover:text-primary/80 font-medium underline">Sign in here</button>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </motion.div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
