import { useAuth } from "@/components/Auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MVPLanding from "@/components/Landing/MVPLanding";
import { LogoLoader } from "@/components/UI/LogoLoader";

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
        <LogoLoader size="lg" text="Loading..." />
      </div>
    );
  }

  return <MVPLanding />;
};

export default Index;
