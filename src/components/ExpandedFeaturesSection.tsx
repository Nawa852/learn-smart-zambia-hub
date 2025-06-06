
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, Users, BookOpen, MessageCircle, Calendar, 
  BarChart3, Globe, Smartphone, Award, Video,
  FileText, Camera, Headphones, Zap
} from 'lucide-react';

const ExpandedFeaturesSection = () => {
  const featureCategories = [
    {
      title: "AI-Powered Learning",
      icon: Brain,
      color: "from-blue-500 to-purple-600",
      features: [
        { name: "AI Tutor Assistant", desc: "24/7 personalized help", status: "live" },
        { name: "Smart Recommendations", desc: "Adaptive learning paths", status: "live" },
        { name: "Auto-graded Assessments", desc: "Instant feedback", status: "live" },
        { name: "Speech Recognition", desc: "Practice pronunciation", status: "coming" }
      ]
    },
    {
      title: "Student Engagement",
      icon: Award,
      color: "from-green-500 to-blue-600",
      features: [
        { name: "Digital Badges", desc: "Earn achievements", status: "live" },
        { name: "Learning Streaks", desc: "Daily progress tracking", status: "live" },
        { name: "Leaderboards", desc: "Compete with peers", status: "live" },
        { name: "Study Groups", desc: "Collaborative learning", status: "coming" }
      ]
    },
    {
      title: "Parent-Teacher Tools",
      icon: Users,
      color: "from-purple-500 to-pink-600",
      features: [
        { name: "Progress Reports", desc: "Real-time updates", status: "live" },
        { name: "Parent-Teacher Chat", desc: "Direct communication", status: "live" },
        { name: "Conference Scheduling", desc: "Easy meeting setup", status: "coming" },
        { name: "Homework Tracking", desc: "Assignment monitoring", status: "live" }
      ]
    },
    {
      title: "Multimedia Learning",
      icon: Video,
      color: "from-orange-500 to-red-600",
      features: [
        { name: "Interactive Videos", desc: "Engaging content", status: "live" },
        { name: "3D Simulations", desc: "Immersive experiences", status: "coming" },
        { name: "Audio Lessons", desc: "Listen and learn", status: "live" },
        { name: "Virtual Labs", desc: "Safe experiments", status: "coming" }
      ]
    },
    {
      title: "Analytics & Reports",
      icon: BarChart3,
      color: "from-indigo-500 to-blue-600",
      features: [
        { name: "Learning Analytics", desc: "Detailed insights", status: "live" },
        { name: "Performance Tracking", desc: "Grade monitoring", status: "live" },
        { name: "Attendance Reports", desc: "Participation data", status: "live" },
        { name: "Predictive Analysis", desc: "Success forecasting", status: "coming" }
      ]
    },
    {
      title: "Accessibility",
      icon: Globe,
      color: "from-teal-500 to-green-600",
      features: [
        { name: "Multi-language Support", desc: "Local languages", status: "live" },
        { name: "Offline Mode", desc: "Learn without internet", status: "coming" },
        { name: "Mobile Optimized", desc: "Any device access", status: "live" },
        { name: "Low Bandwidth Mode", desc: "Rural connectivity", status: "coming" }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            200+ Features & Growing
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Modern Learning</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From AI-powered tutoring to parent-teacher conferences, we've built the most comprehensive 
            educational platform tailored for Zambian schools and learners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureCategories.map((category, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg bg-white/90 backdrop-blur">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{feature.name}</h4>
                        <p className="text-xs text-gray-600">{feature.desc}</p>
                      </div>
                      <Badge 
                        variant={feature.status === 'live' ? 'default' : 'secondary'}
                        className={`text-xs ${
                          feature.status === 'live' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {feature.status === 'live' ? '✓ Live' : '⏳ Soon'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-xl border border-white/50 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience the Future of Education?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Join thousands of students, teachers, and parents who are already transforming their learning experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 px-8">
                <Brain className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white h-12 px-8">
                <MessageCircle className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              🎓 No credit card required • 🇿🇲 Made for Zambian curriculum • 🚀 AI-powered learning
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpandedFeaturesSection;
