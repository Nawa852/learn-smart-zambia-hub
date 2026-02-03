import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, fullName?: string, userType?: string, grade?: string) => Promise<{ error: any }>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  sendSMSVerification: (phone: string) => Promise<void>;
  verifyPhone: (phone: string, code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer user type storage
        if (session?.user) {
          setTimeout(() => {
            const userType = session.user.user_metadata?.user_type || 'student';
            localStorage.setItem('edu-zambia-user-type', userType);
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Sign out failed');
      throw error;
    }
    localStorage.removeItem('edu-zambia-user-type');
    localStorage.removeItem('edu-zambia-onboarding-completed');
    setUser(null);
    setSession(null);
    toast.success("Signed out successfully");
  };

  const signUp = async (email: string, password: string, fullName?: string, userType?: string, grade?: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: fullName,
            user_type: userType || 'student',
            grade: grade,
          }
        }
      });

      if (error) {
        toast.error(error.message);
        return { error };
      }

      localStorage.setItem('edu-zambia-user-type', userType || 'student');
      toast.success("Account created! Please check your email to verify your account.");
      return { error: null };
    } catch (error: any) {
      toast.error(error.message || "Sign up failed");
      return { error };
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      throw error;
    }

    toast.success("Welcome back!");
  };

  const signInWithGoogle = async () => {
    // Using Lovable Cloud managed Google OAuth
    try {
      const { lovable } = await import('@/integrations/lovable');
      const { error } = await lovable.auth.signInWithOAuth('google', {
        redirect_uri: window.location.origin,
      });
      
      if (error) {
        toast.error("Google sign in failed");
        throw error;
      }
    } catch (error: any) {
      toast.error(error.message || "Google sign in failed");
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    toast.info("Facebook sign-in is not currently available");
  };

  const sendSMSVerification = async (phone: string) => {
    toast.info("SMS verification is not currently available");
  };

  const verifyPhone = async (phone: string, code: string) => {
    toast.info("Phone verification is not currently available");
  };

  const value = {
    user,
    session,
    loading,
    signOut,
    signUp,
    signInWithEmail,
    signInWithGoogle,
    signInWithFacebook,
    sendSMSVerification,
    verifyPhone,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};