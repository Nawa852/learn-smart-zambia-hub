
import { 
  Brain, Users, BookOpen, BarChart3, MessageSquare, Shield,
  Smartphone, Globe, Award, Zap, Target, TrendingUp
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Personalization",
      description: "Adaptive learning pathways that adjust to your pace and style",
      color: "text-zambia-copper"
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Connect with peers, join study groups, and learn together",
      color: "text-zambia-emerald"
    },
    {
      icon: BookOpen,
      title: "Rich Content Library",
      description: "Comprehensive courses in multiple languages and formats",
      color: "text-blue-600"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track your progress with detailed insights and reports",
      color: "text-purple-600"
    },
    {
      icon: MessageSquare,
      title: "AI Tutoring",
      description: "24/7 AI assistant for instant help and guidance",
      color: "text-pink-600"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security",
      color: "text-green-600"
    },
    {
      icon: Smartphone,
      title: "Mobile Learning",
      description: "Learn anywhere, anytime with our mobile-optimized platform",
      color: "text-indigo-600"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Available in English, Bemba, Nyanja, and other local languages",
      color: "text-orange-600"
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Earn recognized certificates and digital badges",
      color: "text-yellow-600"
    },
    {
      icon: Zap,
      title: "Microlearning",
      description: "Bite-sized lessons that fit into your busy schedule",
      color: "text-red-600"
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Set and track personal learning objectives",
      color: "text-teal-600"
    },
    {
      icon: TrendingUp,
      title: "Skill Assessment",
      description: "Regular evaluations to measure your progress",
      color: "text-cyan-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Powerful Features for 
            <span className="text-zambia-copper"> Modern Learning</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge AI technology with proven educational methods 
            to deliver a personalized learning experience that adapts to you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-md"
            >
              <CardHeader className="pb-3">
                <feature.icon className={`h-12 w-12 ${feature.color} mb-3 group-hover:scale-110 transition-transform duration-300`} />
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
