
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/Auth/AuthProvider';
import EnhancedLoginForm from './EnhancedLoginForm';
import SecureSignUpForm from './SecureSignUpForm';
import { BookOpenCheck, Globe, Brain, Users, Award } from 'lucide-react';

const LoginPage = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('login');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Loading your learning platform...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <Card className="grid lg:grid-cols-2 overflow-hidden shadow-2xl border-0 rounded-2xl bg-white">
          {/* Left Panel - Branding & Features */}
          <div className="p-8 lg:p-12 bg-gradient-to-br from-blue-600 to-green-600 text-white flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <BookOpenCheck size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">EduZambia</h1>
                <p className="text-blue-100 text-sm">AI-Powered Learning Platform</p>
              </div>
            </div>
            
            <div className="space-y-6 mb-8">
              <h2 className="text-xl lg:text-2xl font-semibold">
                Transform Your Learning Journey
              </h2>
              <p className="text-blue-50 leading-relaxed">
                Join thousands of Zambian students using AI-powered education tools designed 
                for ECZ and Cambridge curricula. Learn smarter with personalized tutoring, 
                multilingual support, and collaborative study groups.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <feature.icon className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">{feature.title}</h3>
                    <p className="text-blue-100 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-xs text-blue-200 border-t border-blue-400/30 pt-4">
              © 2025 EduZambia. Empowering Zambian students with AI-driven education.
            </div>
          </div>
          
          {/* Right Panel - Authentication Forms */}
          <div className="p-6 lg:p-12 bg-white flex flex-col justify-center">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg mb-8">
                  <TabsTrigger 
                    value="login" 
                    className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md font-medium"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md font-medium"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Welcome Back!</h2>
                    <p className="text-gray-600">
                      Continue your learning journey with EduZambia's AI-powered platform.
                    </p>
                  </div>
                  
                  <EnhancedLoginForm 
                    onSuccess={() => { /* Navigate handled by AuthProvider */ }} 
                  />

                  <div className="text-center text-sm text-gray-600">
                    <p>
                      New to EduZambia?{' '}
                      <button
                        onClick={() => setActiveTab('signup')}
                        className="text-blue-600 hover:text-blue-700 font-medium underline"
                      >
                        Create an account
                      </button>
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Join EduZambia</h2>
                    <p className="text-gray-600">
                      Start your AI-powered learning journey today. It's free!
                    </p>
                  </div>
                  
                  <SecureSignUpForm 
                    onSuccess={() => setActiveTab('login')} 
                  />

                  <div className="text-center text-sm text-gray-600">
                    <p>
                      Already have an account?{' '}
                      <button
                        onClick={() => setActiveTab('login')}
                        className="text-blue-600 hover:text-blue-700 font-medium underline"
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
