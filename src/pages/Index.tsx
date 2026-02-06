import { useAuth } from "@/components/Auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChatEduNavbar,
  ChatEduHero,
  ChatEduFeatures,
  ChatEduRoles,
  ChatEduTestimonials,
  ChatEduPricing,
  ChatEduCTA,
  ChatEduFooter
} from '@/components/ChatEdu';
import GamificationSection from "@/components/Landing/GamificationSection";
import PlatformIntegrations from "@/components/Landing/PlatformIntegrations";

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
      {/* Fixed Navbar */}
      <ChatEduNavbar />

      {/* Hero with interactive AI demo */}
      <ChatEduHero />

      {/* AI Features Showcase */}
      <ChatEduFeatures />

      {/* Role-Based Solutions */}
      <ChatEduRoles />

      {/* Gamification */}
      <GamificationSection />

      {/* Platform Integrations & Offline */}
      <PlatformIntegrations />

      {/* Testimonials */}
      <ChatEduTestimonials />

      {/* Pricing */}
      <ChatEduPricing />

      {/* Final CTA */}
      <ChatEduCTA />

      {/* Footer */}
      <ChatEduFooter />
    </div>
  );
};

export default Index;
