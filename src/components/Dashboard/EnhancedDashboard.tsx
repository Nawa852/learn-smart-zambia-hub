
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/Auth/AuthProvider';
import { BookOpen, Brain, Award, Target, TrendingUp, Users, Clock, Star, Globe, Zap, Heart, MessageSquare, Upload, Calendar, Bell, Eye, GraduationCap, Lightbulb, Mic, Shield, Map, Coins, Wifi, Radio, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedDashboard = () => {
  const { user } = useAuth();

  const quickStats = [
    { title: "Study Sessions", value: "24", icon: Clock, color: "text-blue-600", bg: "bg-blue-50", change: "+5 this week" },
    { title: "ECZ Progress", value: "78%", icon: BookOpen, color: "text-green-600", bg: "bg-green-50", change: "+12% this month" },
    { title: "AI Interactions", value: "156", icon: Brain, color: "text-purple-600", bg: "bg-purple-50", change: "Daily avg: 8" },
    { title: "Community Points", value: "1,250", icon: Award, color: "text-orange-600", bg: "bg-orange-50", change: "Top 10%" },
  ];

  const aiPoweredFeatures = [
    { title: "AI Study Assistant", description: "24/7 multilingual tutor with GPT-4o", icon: Brain, link: "/study-assistant", gradient: "from-blue-500 to-purple-600", apiPowered: "GPT-4o, Claude 3" },
    { title: "Smart ECZ Prep", description: "Adaptive exam preparation", icon: GraduationCap, link: "/ai-study-helper", gradient: "from-green-500 to-blue-500", apiPowered: "DeepSeek, Qwen" },
    { title: "Multilingual Translator", description: "Learn in Bemba, Nyanja, Tonga, Lozi", icon: Globe, link: "/multilingual-translator", gradient: "from-purple-500 to-pink-500", apiPowered: "Qwen, Whisper" },
    { title: "AI Flashcards", description: "Auto-generated from your notes", icon: Lightbulb, link: "/ai-flashcards", gradient: "from-orange-500 to-red-500", apiPowered: "GPT-4o, Gemini" },
    { title: "Career Predictions", description: "AI-powered career pathways", icon: Target, link: "/smart-recommendations", gradient: "from-teal-500 to-cyan-500", apiPowered: "Moonshot AI, DeepSeek" },
    { title: "Voice Learning", description: "Audio lessons and voice Q&A", icon: Mic, link: "/comprehensive-ai-study", gradient: "from-indigo-500 to-purple-500", apiPowered: "Whisper, Azure Speech" },
    { title: "Visual Mind Maps", description: "AI-generated concept maps", icon: Eye, link: "/visual-mind-map", gradient: "from-pink-500 to-red-500", apiPowered: "Gemini 1.5, MiniMax" },
    { title: "Offline Learning", description: "Study without internet", icon: Wifi, link: "/study-materials", gradient: "from-cyan-500 to-blue-500", apiPowered: "LLaMA 3, Firebase ML" },
  ];

  const zambianFeatures = [
    { title: "ECZ Exam Center", description: "Grade 7, 9 & 12 preparation", icon: Award, link: "/ai-study-helper", color: "text-green-600", aiPowered: "Claude 3, GPT-4o" },
    { title: "Local Language Support", description: "7 Zambian languages", icon: Globe, link: "/multilingual-translator", color: "text-blue-600", aiPowered: "Qwen, Whisper" },
    { title: "Community Learning", description: "Connect with peers nationwide", icon: Users, link: "/social-feed", color: "text-purple-600", aiPowered: "StealthGPT, Moonshot AI" },
    { title: "Rural Access Hub", description: "Offline kiosks & SMS support", icon: Radio, link: "/study-materials", color: "text-orange-600", aiPowered: "LLaMA 3, Twilio" },
    { title: "Meal & Nutrition", description: "Healthy eating for students", icon: Heart, link: "/meal-planner", color: "text-pink-600", aiPowered: "Google Vision, GPT-4o" },
    { title: "Scholarship Finder", description: "AI-matched opportunities", icon: Coins, link: "/smart-recommendations", color: "text-yellow-600", aiPowered: "Moonshot AI, DeepSeek" },
  ];

  const learningProgress = [
    { subject: "Mathematics", progress: 85, grade: "A", color: "bg-blue-500", nextTopic: "Trigonometry", aiCoach: "GPT-4o" },
    { subject: "Physics", progress: 72, grade: "B+", color: "bg-green-500", nextTopic: "Waves & Sound", aiCoach: "Claude 3" },
    { subject: "Chemistry", progress: 91, grade: "A+", color: "bg-purple-500", nextTopic: "Organic Chemistry", aiCoach: "Gemini" },
    { subject: "English", progress: 78, grade: "B+", color: "bg-orange-500", nextTopic: "Essay Writing", aiCoach: "GPT-4o" },
    { subject: "Civic Education", progress: 88, grade: "A", color: "bg-pink-500", nextTopic: "Democracy", aiCoach: "Claude 3" },
  ];

  const aiInsights = [
    { title: "Study Pattern Analysis", description: "Best performance between 8-10 AM", icon: TrendingUp, color: "text-blue-600" },
    { title: "Weakness Detection", description: "Focus on Algebra word problems", icon: Target, color: "text-red-600" },
    { title: "Peer Comparison", description: "Above average in Science subjects", icon: Users, color: "text-green-600" },
    { title: "Exam Readiness", description: "82% ready for Grade 12 Mock", icon: Shield, color: "text-purple-600" },
  ];

  const recentActivities = [
    { title: "Completed AI-Generated Physics Quiz", time: "2 hours ago", score: 94, type: "quiz", aiModel: "DeepSeek" },
    { title: "Voice Q&A Session - Chemistry Bonds", time: "4 hours ago", score: null, type: "voice", aiModel: "Whisper" },
    { title: "Multilingual Math Lesson (Bemba)", time: "1 day ago", score: 88, type: "lesson", aiModel: "Qwen" },
    { title: "AI Career Assessment Completed", time: "2 days ago", score: null, type: "assessment", aiModel: "Moonshot AI" },
    { title: "Community Study Group Discussion", time: "3 days ago", score: null, type: "community", aiModel: "StealthGPT" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Welcome Header with AI Status */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-12 translate-y-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-pink-300" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">
                    Muli bwanji, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student'}! 👋
                  </h1>
                  <p className="text-blue-100">Your AI-powered learning companion is ready!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">All AI APIs Active</span>
                </div>
                <p className="text-xs text-blue-200">GPT-4o, Claude 3, Qwen, Gemini, DeepSeek...</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                <Globe className="w-3 h-3 mr-1" />
                7 Languages Supported
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                <Brain className="w-3 h-3 mr-1" />
                16 AI Models Active
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                <Award className="w-3 h-3 mr-1" />
                ECZ Curriculum Aligned
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                <Wifi className="w-3 h-3 mr-1" />
                Offline Mode Ready
              </Badge>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 group border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enhanced Learning Progress with AI Coaches */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                AI-Enhanced Learning Progress
              </CardTitle>
              <CardDescription>Your ECZ curriculum performance with AI coaching</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningProgress.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{subject.subject}</span>
                      <Badge variant="outline" className="text-xs bg-purple-50">
                        AI Coach: {subject.aiCoach}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Grade {subject.grade}
                      </Badge>
                      <span className="text-sm font-semibold">{subject.progress}%</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress value={subject.progress} className="h-2" />
                    <div 
                      className={`absolute top-0 left-0 h-2 ${subject.color} rounded-full transition-all duration-500`}
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">Next: {subject.nextTopic}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI-Powered Recent Activities */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                AI Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{activity.title}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">{activity.time}</span>
                        <div className="flex items-center gap-1">
                          {activity.score && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              {activity.score}%
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {activity.aiModel}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Dashboard */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              AI Learning Insights
            </CardTitle>
            <CardDescription>Personalized recommendations from your AI tutors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer group bg-white">
                  <insight.icon className={`h-8 w-8 ${insight.color} mb-2 group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Complete AI-Powered Learning Suite */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              Complete AI-Powered Learning Suite
            </CardTitle>
            <CardDescription>Access all advanced learning tools powered by 16+ AI models</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {aiPoweredFeatures.map((feature, index) => (
                <Link key={index} to={feature.link}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50 group">
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                      <Badge variant="outline" className="text-xs bg-purple-50">
                        {feature.apiPowered}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Zambian Education Features with AI Integration */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="w-5 h-5 text-green-600" />
              Zambian Education Features
            </CardTitle>
            <CardDescription>Tailored for Zambian students, curriculum, and culture with AI enhancement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {zambianFeatures.map((feature, index) => (
                <Link key={index} to={feature.link}>
                  <div className="p-4 border rounded-lg hover:shadow-md transition-all duration-300 hover:border-green-300 cursor-pointer group bg-white">
                    <feature.icon className={`h-8 w-8 ${feature.color} mb-2 group-hover:scale-110 transition-transform duration-300`} />
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                    <Badge variant="outline" className="text-xs bg-green-50">
                      AI: {feature.aiPowered}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Quick Actions with AI Features */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-600" />
              AI-Powered Quick Actions
            </CardTitle>
            <CardDescription>Jump into your most used AI-enhanced features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Link to="/study-assistant">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
                  <Brain className="h-6 w-6 text-blue-600" />
                  <span className="text-xs">AI Tutor</span>
                </Button>
              </Link>
              <Link to="/ai-flashcards">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300">
                  <Lightbulb className="h-6 w-6 text-purple-600" />
                  <span className="text-xs">Smart Cards</span>
                </Button>
              </Link>
              <Link to="/multilingual-translator">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-green-50 hover:border-green-300 transition-all duration-300">
                  <Globe className="h-6 w-6 text-green-600" />
                  <span className="text-xs">Translator</span>
                </Button>
              </Link>
              <Link to="/visual-mind-map">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-pink-50 hover:border-pink-300 transition-all duration-300">
                  <Eye className="h-6 w-6 text-pink-600" />
                  <span className="text-xs">Mind Maps</span>
                </Button>
              </Link>
              <Link to="/smart-recommendations">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300">
                  <Target className="h-6 w-6 text-orange-600" />
                  <span className="text-xs">Career AI</span>
                </Button>
              </Link>
              <Link to="/comprehensive-ai-study">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-300">
                  <Mic className="h-6 w-6 text-cyan-600" />
                  <span className="text-xs">Voice Learn</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
