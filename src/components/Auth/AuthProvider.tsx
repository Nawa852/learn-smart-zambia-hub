
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithFacebook: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, fullName: string, role?: string, gradeLevel?: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  resendConfirmation: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state listener');
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email || 'No session');
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === 'SIGNED_IN' && session?.user) {
          // Create or update user profile after successful sign in
          setTimeout(async () => {
            try {
              const { data: existingProfile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

              if (!existingProfile) {
                const { error: profileError } = await supabase
                  .from('profiles')
                  .insert({
                    id: session.user.id,
                    email: session.user.email,
                    full_name: session.user.user_metadata?.full_name || 
                              session.user.user_metadata?.name || 
                              session.user.email?.split('@')[0] || '',
                    role: session.user.user_metadata?.role || 'student',
                    grade_level: session.user.user_metadata?.grade_level,
                    avatar_url: session.user.user_metadata?.avatar_url
                  });
                
                if (profileError) {
                  console.error('Error creating profile:', profileError);
                } else {
                  console.log('Profile created successfully');
                }
              }
            } catch (error) {
              console.error('Error handling profile:', error);
            }
          }, 100);
        }

        if (event === 'SIGNED_UP') {
          toast({
            title: "Account created successfully!",
            description: "Please check your email to verify your account.",
          });
        }
      }
    );

    // Then get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting initial session:', error);
          setLoading(false);
          return;
        }
        
        console.log('Initial session:', session?.user?.email || 'No session');
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        setLoading(false);
      }
    };

    getInitialSession();

    return () => {
      console.log('AuthProvider: Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []);

  const signInWithFacebook = async () => {
    try {
      setLoading(true);
      console.log('Attempting Facebook sign in...');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) {
        console.error('Facebook sign in error:', error);
        throw error;
      }
    } catch (error: any) {
      console.error('Facebook sign in failed:', error);
      toast({
        title: "Error signing in with Facebook",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      console.log('Attempting Google sign in...');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) {
        console.error('Google sign in error:', error);
        throw error;
      }
    } catch (error: any) {
      console.error('Google sign in failed:', error);
      toast({
        title: "Error signing in with Google",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Attempting email sign in for:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Email sign in error:', error);
        throw error;
      }

      console.log('Email sign in successful:', data.user?.email);
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      console.error('Email sign in failed:', error);
      let errorMessage = error.message;
      
      if (error.message.includes('Email not confirmed')) {
        errorMessage = "Please check your email and click the verification link before signing in.";
      } else if (error.message.includes('Invalid login credentials')) {
        errorMessage = "Invalid email or password. Please check your credentials and try again.";
      }
      
      toast({
        title: "Error signing in",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string, role: string = 'student', gradeLevel?: string) => {
    try {
      setLoading(true);
      console.log('Attempting email sign up for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
            grade_level: gradeLevel,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        },
      });
      
      if (error) {
        console.error('Email sign up error:', error);
        throw error;
      }

      if (data.user && !data.user.email_confirmed_at) {
        console.log('Email sign up successful, verification email sent');
        toast({
          title: "Account created successfully!",
          description: "Please check your email and click the verification link to complete your registration.",
        });
      } else {
        console.log('Email sign up successful:', data.user?.email);
        toast({
          title: "Welcome to EDU ZAMBIA!",
          description: "Your account has been created successfully.",
        });
      }
    } catch (error: any) {
      console.error('Email sign up failed:', error);
      let errorMessage = error.message;
      
      if (error.message.includes('User already registered')) {
        errorMessage = "An account with this email already exists. Please sign in instead.";
      }
      
      toast({
        title: "Error creating account",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
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
        title: "Verification email sent!",
        description: "Please check your email for the verification link.",
      });
    } catch (error: any) {
      console.error('Error resending confirmation:', error);
      toast({
        title: "Error sending verification email",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) {
        console.error('Error refreshing session:', error);
      } else {
        console.log('Session refreshed successfully');
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
    }
  };

  const signOut = async () => {
    try {
      console.log('Attempting sign out...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }
      
      setUser(null);
      setSession(null);
      
      console.log('Sign out successful');
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      console.error('Sign out failed:', error);
      toast({
        title: "Error signing out",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    session,
    loading,
    signInWithFacebook,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    refreshSession,
    resendConfirmation,
  };

  console.log('AuthProvider rendering with user:', user?.email || 'No user', 'loading:', loading);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
