
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/Auth/AuthProvider';
import EnhancedLoginForm from './EnhancedLoginForm';
import SecureSignUpForm from './SecureSignUpForm';

const LoginPage = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('login');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduLearn Zambia
            </CardTitle>
            <p className="text-gray-600">Secure access to your learning platform</p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="mt-6">
                <EnhancedLoginForm 
                  onSuccess={() => window.location.href = '/dashboard'} 
                />
              </TabsContent>
              
              <TabsContent value="signup" className="mt-6">
                <SecureSignUpForm 
                  onSuccess={() => setActiveTab('login')} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>🔒 Your data is protected with enterprise-grade security</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
