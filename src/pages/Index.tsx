
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ExpandedFeaturesSection from "@/components/ExpandedFeaturesSection";
import CoursesPreview from "@/components/CoursesPreview";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/Auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Don't redirect authenticated users automatically - let them stay on landing if they want
    if (!loading && user && window.location.pathname === '/') {
      // Only redirect if they explicitly came to the root path
      const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
      if (hasVisitedBefore) {
        navigate('/study-materials');
      } else {
        localStorage.setItem('hasVisitedBefore', 'true');
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
          <p className="text-gray-600 animate-pulse">Loading EduZambia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ExpandedFeaturesSection />
      <CoursesPreview />
      <Footer />
    </div>
  );
};

export default Index;
