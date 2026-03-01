import { useAuth } from "@/components/Auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChatEduNavbar,
  ChatEduHero,
  ChatEduFeatures,
  ChatEduRoles,
  ChatEduTestimonials,
  ChatEduCTA,
  ChatEduFooter
} from '@/components/ChatEdu';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          <p className="text-muted-foreground animate-pulse">Loading Edu Zambia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ChatEduNavbar />
      <ChatEduHero />
      <ChatEduFeatures />
      <ChatEduRoles />
      <ChatEduTestimonials />
      <ChatEduCTA />
      <ChatEduFooter />
    </div>
  );
};

export default Index;
