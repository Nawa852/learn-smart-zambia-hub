
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AITutorPage from "./pages/AITutorPage";
import Achievements from "./pages/Achievements";
import Analytics from "./pages/Analytics";
import LandingVersePage from "./pages/LandingVerse";
import AdaptiveLearning from "./pages/AdaptiveLearning";
import AIContentStudio from "./pages/AIContentStudio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing-verse" element={<LandingVersePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-tutor" element={<AITutorPage />} />
          <Route path="/adaptive-learning" element={<AdaptiveLearning />} />
          <Route path="/ai-content-studio" element={<AIContentStudio />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/analytics" element={<Analytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
