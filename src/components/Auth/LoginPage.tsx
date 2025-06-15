
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/Auth/AuthProvider';
import EnhancedLoginForm from './EnhancedLoginForm';
import SecureSignUpForm from './SecureSignUpForm';
import { BookOpenCheck } from 'lucide-react';

const LoginPage = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('login');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <Card className="grid md:grid-cols-2 overflow-hidden shadow-2xl border-0 rounded-2xl">
          <div className="p-12 bg-gradient-to-br from-blue-600 to-purple-700 text-white hidden md:flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <BookOpenCheck size={48} />
              <h1 className="text-4xl font-bold">EduLearn Zambia</h1>
            </div>
            <p className="text-xl font-light leading-relaxed">
              Unlock your potential with our cutting-edge learning platform. Personalized paths, AI tutors, and a vibrant community await you.
            </p>
            <div className="mt-12 text-sm text-blue-200">
              © 2025 EduLearn Inc. All rights reserved.
            </div>
          </div>
          
          <div className="p-8 md:p-12 bg-white">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
                  <p className="text-gray-500 mb-6">Enter your credentials to access your account.</p>
                  <EnhancedLoginForm 
                    onSuccess={() => { /* Navigate handled by AuthProvider */ }} 
                  />
                </TabsContent>
                
                <TabsContent value="signup" className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
                  <p className="text-gray-500 mb-6">Join our community of learners today!</p>
                  <SecureSignUpForm 
                    onSuccess={() => setActiveTab('login')} 
                  />
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
