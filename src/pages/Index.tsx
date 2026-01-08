import { useAuth } from "@/components/Auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MegaHero from "@/components/Landing/MegaHero";
import RoleSelector from "@/components/Landing/RoleSelector";
import FeatureMegaDeck from "@/components/Landing/FeatureMegaDeck";
import ImpactSection from "@/components/Landing/ImpactSection";
import SmartSearchBar from "@/components/Landing/SmartSearchBar";
import TestimonialsSection from "@/components/Landing/TestimonialsSection";
import CollaborationWall from "@/components/Landing/CollaborationWall";
import MegaFooter from "@/components/Landing/MegaFooter";

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
      {/* 1. Mega Hero with 3D Zambia Map */}
      <MegaHero />
      
      {/* 2. Role-Based Universe */}
      <RoleSelector />
      
      {/* 3. BrightSphere Feature Mega-Deck */}
      <div id="features">
        <FeatureMegaDeck />
      </div>
      
      {/* 4. Mega Impact Section */}
      <ImpactSection />
      
      {/* 5. AI-Powered Smart Search */}
      <SmartSearchBar />
      
      {/* 6. Testimonials & Success Stories */}
      <TestimonialsSection />
      
      {/* 7. Collaboration Wall */}
      <CollaborationWall />
      
      {/* 8. Mega Footer */}
      <MegaFooter />
    </div>
  );
};

export default Index;
