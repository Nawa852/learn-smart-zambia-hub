import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, BookOpen, Brain, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const suggestions = [
    { label: "Dashboard", url: "/dashboard", icon: Home },
    { label: "Course Catalog", url: "/course-catalog", icon: BookOpen },
    { label: "AI Study Buddy", url: "/ai", icon: Brain },
    { label: "Analytics", url: "/analytics", icon: BarChart3 },
    { label: "Settings", url: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-6">
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-foreground mb-2">Page not found</p>
        <p className="text-muted-foreground mb-8">
          The page <code className="bg-muted px-2 py-0.5 rounded text-sm">{location.pathname}</code> doesn't exist.
        </p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {suggestions.map(s => (
            <Link key={s.url} to={s.url}>
              <Button variant="outline" className="w-full gap-2">
                <s.icon className="w-4 h-4" />
                {s.label}
              </Button>
            </Link>
          ))}
        </div>
        <Link to="/">
          <Button className="w-full">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
