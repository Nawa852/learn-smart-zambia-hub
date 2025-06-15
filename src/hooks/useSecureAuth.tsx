
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export const useSecureAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    isAuthenticated: false
  });
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          throw error;
        }

        setAuthState({
          user: session?.user ?? null,
          loading: false,
          isAuthenticated: !!session?.user
        });
      } catch (error) {
        console.error('Authentication error:', error);
        setAuthState({
          user: null,
          loading: false,
          isAuthenticated: false
        });
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      setAuthState({
        user: session?.user ?? null,
        loading: false,
        isAuthenticated: !!session?.user
      });

      // Handle session events
      switch (event) {
        case 'SIGNED_IN':
          toast({
            title: "Welcome!",
            description: "You have been signed in successfully.",
          });
          break;
        case 'SIGNED_OUT':
          toast({
            title: "Signed out",
            description: "You have been signed out successfully.",
          });
          break;
        case 'TOKEN_REFRESHED':
          console.log('Token refreshed successfully');
          break;
        case 'USER_UPDATED':
          console.log('User profile updated');
          break;
      }
    });

    // Session timeout warning (45 minutes)
    const sessionTimeoutWarning = setTimeout(() => {
      if (authState.isAuthenticated) {
        toast({
          title: "Session Warning",
          description: "Your session will expire soon. Please save your work.",
          variant: "destructive",
        });
      }
    }, 45 * 60 * 1000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(sessionTimeoutWarning);
    };
  }, [toast, authState.isAuthenticated]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error refreshing session:', error);
      return null;
    }
  };

  return {
    ...authState,
    signOut,
    refreshSession
  };
};
