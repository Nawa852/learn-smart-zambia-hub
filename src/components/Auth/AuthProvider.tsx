import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

// Mock user type (simplified from Supabase)
interface MockUser {
  id: string;
  email: string;
  full_name?: string;
  user_type?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
    [key: string]: any;
  };
}

interface AuthContextType {
  user: MockUser | null;
  session: { user: MockUser } | null;
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

// Simple mock user storage
const MOCK_USERS_KEY = 'edu-zambia-mock-users';
const CURRENT_USER_KEY = 'edu-zambia-current-user';

const getMockUsers = (): Record<string, { password: string; user: MockUser }> => {
  const stored = localStorage.getItem(MOCK_USERS_KEY);
  return stored ? JSON.parse(stored) : {};
};

const saveMockUsers = (users: Record<string, { password: string; user: MockUser }>) => {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [session, setSession] = useState<{ user: MockUser } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setSession({ user: parsedUser });
    }
    setLoading(false);
  }, []);

  const signOut = async () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
    setSession(null);
    toast.success("Signed out successfully");
  };

  const signUp = async (email: string, password: string, fullName?: string, userType?: string, grade?: string) => {
    try {
      const users = getMockUsers();
      
      if (users[email]) {
        toast.error("User already exists with this email");
        return { error: { message: "User already exists" } };
      }

      const newUser: MockUser = {
        id: `user_${Date.now()}`,
        email,
        full_name: fullName,
        user_type: userType || 'student',
        user_metadata: {
          full_name: fullName,
        },
      };

      users[email] = { password, user: newUser };
      saveMockUsers(users);

      toast.success("Account created! You can now sign in.");
      return { error: null };
    } catch (error: any) {
      toast.error(error.message || "Sign up failed");
      return { error };
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    const users = getMockUsers();
    const userRecord = users[email];

    if (!userRecord) {
      toast.error("No account found with this email");
      throw new Error("Invalid login credentials");
    }

    if (userRecord.password !== password) {
      toast.error("Invalid password");
      throw new Error("Invalid login credentials");
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userRecord.user));
    setUser(userRecord.user);
    setSession({ user: userRecord.user });
    toast.success("Welcome back!");
  };

  const signInWithGoogle = async () => {
    // Mock Google sign in - create a demo user
    const demoUser: MockUser = {
      id: 'google_user_demo',
      email: 'demo@google.com',
      full_name: 'Google Demo User',
      user_type: 'student',
      user_metadata: { full_name: 'Google Demo User' },
    };
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    setSession({ user: demoUser });
    toast.success("Signed in with Google (Demo)");
  };

  const signInWithFacebook = async () => {
    // Mock Facebook sign in - create a demo user
    const demoUser: MockUser = {
      id: 'facebook_user_demo',
      email: 'demo@facebook.com',
      full_name: 'Facebook Demo User',
      user_type: 'student',
      user_metadata: { full_name: 'Facebook Demo User' },
    };
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    setSession({ user: demoUser });
    toast.success("Signed in with Facebook (Demo)");
  };

  const sendSMSVerification = async (phone: string) => {
    toast.success("SMS sent (Demo mode)");
  };

  const verifyPhone = async (phone: string, code: string) => {
    toast.success("Phone verified (Demo mode)");
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
