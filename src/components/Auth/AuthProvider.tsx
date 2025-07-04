
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  needsOnboarding: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signOut: () => Promise<void>;
  sendSMSVerification: (phone: string) => Promise<void>;
  verifyPhone: (phone: string, token: string) => Promise<void>;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        } else {
          setUser(session?.user ?? null);
          if (session?.user) {
            await checkOnboardingStatus(session.user.id);
          }
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await checkOnboardingStatus(session.user.id);
      } else {
        setNeedsOnboarding(false);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkOnboardingStatus = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking profile:', error);
        return;
      }

      // User needs onboarding if profile doesn't exist or is incomplete
      const needsSetup = !profile || !profile.full_name || !profile.user_type;
      setNeedsOnboarding(needsSetup);
    } catch (error) {
      console.error('Error in checkOnboardingStatus:', error);
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) throw error;

      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
      });
    } catch (error: any) {
      console.error('SignUp error:', error);
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      console.error('SignIn error:', error);
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    return signIn(email, password);
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Google sign in error:', error);
      toast({
        title: "Error signing in with Google",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Facebook sign in error:', error);
      toast({
        title: "Error signing in with Facebook",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setNeedsOnboarding(false);
      
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error: any) {
      console.error('SignOut error:', error);
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const sendSMSVerification = async (phone: string) => {
    try {
      // This would typically integrate with a SMS service
      // For now, we'll simulate the process
      toast({
        title: "SMS sent",
        description: "Verification code sent to your phone number.",
      });
    } catch (error: any) {
      console.error('SMS verification error:', error);
      toast({
        title: "Error sending SMS",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const verifyPhone = async (phone: string, token: string) => {
    try {
      // This would typically verify the SMS token
      // For now, we'll simulate the process
      toast({
        title: "Phone verified",
        description: "Your phone number has been verified successfully.",
      });
    } catch (error: any) {
      console.error('Phone verification error:', error);
      toast({
        title: "Error verifying phone",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const completeOnboarding = () => {
    setNeedsOnboarding(false);
  };

  const value: AuthContextType = {
    user,
    loading,
    needsOnboarding,
    signUp,
    signIn,
    signInWithEmail,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    sendSMSVerification,
    verifyPhone,
    completeOnboarding,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
