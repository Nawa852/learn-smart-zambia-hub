import { useAuth } from "@/components/Auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UltraHero from "@/components/Landing/UltraHero";
import AIShowcase from "@/components/Landing/AIShowcase";
import LearningPaths from "@/components/Landing/LearningPaths";
import GamificationSection from "@/components/Landing/GamificationSection";
import RoleSelector from "@/components/Landing/RoleSelector";
import PlatformIntegrations from "@/components/Landing/PlatformIntegrations";
import SocialProof from "@/components/Landing/SocialProof";
import CTASection from "@/components/Landing/CTASection";
import NewMegaFooter from "@/components/Landing/NewMegaFooter";

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
      {/* 1. Ultra Hero - Inspired by QANDA/Socratic with interactive AI demo */}
      <UltraHero />
      
      {/* 2. AI Features Showcase - All AI tools from 40+ platforms */}
      <AIShowcase />
      
      {/* 3. Learning Paths - Coursera/Khan Academy style courses */}
      <LearningPaths />
      
      {/* 4. Gamification - Duolingo-inspired streaks & rewards */}
      <GamificationSection />
      
      {/* 5. Role-Based Universe - Stakeholder selection */}
      <RoleSelector />
      
      {/* 6. Platform Integrations - Tech stack & offline features */}
      <PlatformIntegrations />
      
      {/* 7. Social Proof - Testimonials & stats */}
      <SocialProof />
      
      {/* 8. Final CTA - Get started section */}
      <CTASection />
      
      {/* 9. Mega Footer */}
      <NewMegaFooter />
    </div>
  );
};

export default Index;
