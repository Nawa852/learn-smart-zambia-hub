
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string, userType?: string, grade?: string) => Promise<{ error: AuthError | null }>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signOut: () => Promise<void>;
  resendConfirmation: (email: string) => Promise<void>;
  sendSMSVerification: (phoneNumber: string) => Promise<void>;
  verifyPhone: (phoneNumber: string, code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }

        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Session error:', error);
        if (mounted) {
          setSession(null);
          setUser(null);
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle session events
        switch (event) {
          case 'SIGNED_IN':
            const providerUsed = session?.user?.app_metadata?.provider;
            let welcomeMessage = "Welcome to EduZambia!";
            
            if (providerUsed === 'google') {
              welcomeMessage = "Welcome to EduZambia! Successfully signed in with Google.";
            } else if (providerUsed === 'facebook') {
              welcomeMessage = "Welcome to EduZambia! Successfully signed in with Facebook.";
            }
            
            toast({
              title: welcomeMessage,
              description: "You have successfully signed in to your learning platform.",
            });
            break;
          case 'SIGNED_OUT':
            toast({
              title: "Signed out",
              description: "You have been signed out successfully.",
            });
            break;
          case 'USER_UPDATED':
            toast({
              title: "Profile Updated",
              description: "Your profile has been updated successfully.",
            });
            break;
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [toast]);

  const signUp = async (email: string, password: string, fullName?: string, userType?: string, grade?: string) => {
    try {
      const redirectUrl = `${window.location.origin}/dashboard`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            user_type: userType,
            grade: grade,
          }
        }
      });

      if (error) throw error;

      if (data.user && !data.user.email_confirmed_at) {
        toast({
          title: "Account Created Successfully!",
          description: "Please check your email for a verification link to complete your registration.",
        });
      }

      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "An error occurred during sign up",
        variant: "destructive",
      });
      return { error: error as AuthError };
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          throw new Error('Please verify your email address before signing in. Check your inbox for a verification link.');
        }
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        }
        throw error;
      }

      // The auth state change will handle the redirect
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Sign in failed",
        description: error instanceof Error ? error.message : "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });

      if (error) throw error;
    } catch (error) {
      console.error('Google sign in error:', error);
      toast({
        title: "Google sign in failed",
        description: error instanceof Error ? error.message : "Failed to sign in with Google",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) throw error;
    } catch (error) {
      console.error('Facebook sign in error:', error);
      toast({
        title: "Facebook sign in failed",
        description: error instanceof Error ? error.message : "Failed to sign in with Facebook",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Sign out failed",
        description: error instanceof Error ? error.message : "Failed to sign out",
        variant: "destructive",
      });
      throw error;
    }
  };

  const resendConfirmation = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) throw error;

      toast({
        title: "Verification email sent",
        description: "Please check your inbox for the verification link.",
      });
    } catch (error) {
      console.error('Resend confirmation error:', error);
      toast({
        title: "Failed to resend email",
        description: error instanceof Error ? error.message : "Failed to resend verification email",
        variant: "destructive",
      });
      throw error;
    }
  };

  const sendSMSVerification = async (phoneNumber: string) => {
    try {
      const { error } = await supabase.functions.invoke('send-sms-verification', {
        body: { phoneNumber }
      });

      if (error) throw error;

      toast({
        title: "SMS Sent",
        description: "Please check your phone for the verification code.",
      });
    } catch (error) {
      console.error('SMS verification error:', error);
      toast({
        title: "SMS Failed",
        description: "Failed to send SMS verification code.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const verifyPhone = async (phoneNumber: string, code: string) => {
    try {
      const { error } = await supabase.functions.invoke('verify-phone', {
        body: { phoneNumber, code }
      });

      if (error) throw error;

      toast({
        title: "Phone Verified",
        description: "Your phone number has been verified successfully.",
      });
    } catch (error) {
      console.error('Phone verification error:', error);
      toast({
        title: "Verification Failed",
        description: "Invalid verification code.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signInWithEmail,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    resendConfirmation,
    sendSMSVerification,
    verifyPhone,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
