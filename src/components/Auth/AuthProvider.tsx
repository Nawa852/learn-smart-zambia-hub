
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import RoleSelectionModal from './RoleSelectionModal';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: AuthError | null }>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signOut: () => Promise<void>;
  resendConfirmation: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === 'SIGNED_IN' && session?.user) {
          // Check if this is a new Google signup (no profile exists)
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (!profile && session.user.app_metadata.provider === 'google') {
            // New Google user - show role selection modal
            setPendingUser(session.user);
            setShowRoleModal(true);
          } else {
            toast({
              title: "Welcome back!",
              description: "You have successfully signed in.",
            });
          }
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out successfully.",
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [toast]);

  const handleRoleSelection = async (roleData: {
    accountType: string;
    grade?: string;
    school?: string;
    subject?: string;
  }) => {
    if (!pendingUser) return;

    try {
      // Create profile with role information
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: pendingUser.id,
          email: pendingUser.email,
          full_name: pendingUser.user_metadata?.full_name || pendingUser.user_metadata?.name,
          avatar_url: pendingUser.user_metadata?.avatar_url,
          role: roleData.accountType,
        });

      if (profileError) throw profileError;

      // Create user preferences
      const { error: prefsError } = await supabase
        .from('user_preferences')
        .insert({
          user_id: pendingUser.id,
          learning_style: roleData.accountType === 'student' ? 'visual' : 'mixed',
        });

      if (prefsError) throw prefsError;

      // Store additional role data in user metadata if needed
      const additionalData: any = {
        account_type: roleData.accountType,
        setup_completed: true,
      };

      if (roleData.grade) additionalData.grade = roleData.grade;
      if (roleData.school) additionalData.school = roleData.school;
      if (roleData.subject) additionalData.subject = roleData.subject;

      await supabase.auth.updateUser({
        data: additionalData
      });

      setShowRoleModal(false);
      setPendingUser(null);
      
      toast({
        title: "Welcome to EduZambia!",
        description: `Your ${roleData.accountType} account has been set up successfully.`,
      });
    } catch (error) {
      console.error('Error setting up user profile:', error);
      toast({
        title: "Setup Error",
        description: "There was an error setting up your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;

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
        throw error;
      }

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
          redirectTo: `${window.location.origin}/study-materials`
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
          redirectTo: `${window.location.origin}/study-materials`
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
          emailRedirectTo: `${window.location.origin}/`
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
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <RoleSelectionModal 
        open={showRoleModal} 
        onComplete={handleRoleSelection}
      />
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
