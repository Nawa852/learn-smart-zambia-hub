import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Button } from '@/components/ui/button';
import { X, Eye, LogIn } from 'lucide-react';

const DemoBanner = () => {
  const { isDemo, exitDemoMode } = useAuth();
  const navigate = useNavigate();

  if (!isDemo) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-primary text-primary-foreground py-2 px-4 flex items-center justify-between gap-2 text-sm shadow-lg">
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4" />
        <span className="font-medium">Demo Mode</span>
        <span className="hidden sm:inline text-primary-foreground/80">— Exploring as a guest. Data won't be saved.</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          className="h-7 text-xs"
          onClick={() => { exitDemoMode(); navigate('/auth?mode=signup'); }}
        >
          <LogIn className="w-3 h-3 mr-1" /> Sign Up Free
        </Button>
        <button
          onClick={() => { exitDemoMode(); navigate('/'); }}
          className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DemoBanner;
