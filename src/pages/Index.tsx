
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ExpandedFeaturesSection from "@/components/ExpandedFeaturesSection";
import CoursesPreview from "@/components/CoursesPreview";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "@/components/Auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ExpandedFeaturesSection />
      <FeaturesSection />
      <CoursesPreview />
      <Footer />
    </div>
  );
};

export default Index;
