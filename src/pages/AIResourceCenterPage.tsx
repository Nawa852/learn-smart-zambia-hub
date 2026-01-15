import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, MessageCircle, BookOpen, HelpCircle, Video, FileText,
  ChevronRight, ThumbsUp, ThumbsDown, Send, Sparkles, Bot,
  Lightbulb, Zap, ExternalLink, Clock, Users, TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AIResourceCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI support assistant. How can I help you today?' }
  ]);

  const helpCategories = [
    { name: 'Getting Started', icon: Zap, articles: 24, color: 'bg-blue-500' },
    { name: 'Account & Billing', icon: Users, articles: 18, color: 'bg-green-500' },
    { name: 'Courses & Learning', icon: BookOpen, articles: 32, color: 'bg-purple-500' },
    { name: 'Technical Support', icon: HelpCircle, articles: 28, color: 'bg-orange-500' },
    { name: 'AI Features', icon: Sparkles, articles: 15, color: 'bg-pink-500' },
    { name: 'Mobile App', icon: Lightbulb, articles: 12, color: 'bg-cyan-500' },
  ];

  const popularArticles = [
    { title: 'How to reset your password', views: 15234, helpful: 98 },
    { title: 'Getting started with AI Tutor', views: 12456, helpful: 95 },
    { title: 'Understanding your learning dashboard', views: 9876, helpful: 92 },
    { title: 'How to download course materials', views: 8654, helpful: 89 },
    { title: 'Troubleshooting video playback issues', views: 7432, helpful: 87 },
  ];

  const videoTutorials = [
    { title: 'Platform Overview', duration: '5:30', views: 5432 },
    { title: 'Using AI Study Tools', duration: '8:15', views: 4321 },
    { title: 'Navigating Course Content', duration: '6:45', views: 3987 },
    { title: 'Mobile App Features', duration: '7:20', views: 3456 },
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    setChatHistory([
      ...chatHistory,
      { role: 'user', content: chatMessage },
      { role: 'assistant', content: 'I understand you\'re asking about "' + chatMessage + '". Let me help you with that. Based on our knowledge base, here are some resources that might help...' }
    ]);
    setChatMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
          AI Resource Center
        </h1>
        <p className="text-muted-foreground">Get instant answers powered by AI</p>
      </motion.div>

      {/* AI Search */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-2xl mx-auto mb-12"
      >
        <Card className="bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-6 h-6 text-primary" />
              <span className="font-medium">Ask our AI Assistant</span>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Ask anything... e.g., 'How do I access my courses?'"
                className="pl-12 h-14 text-lg pr-24"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2">
                <Sparkles className="w-4 h-4 mr-2" /> Ask AI
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {['Reset password', 'Download materials', 'AI tutor help', 'Payment issues'].map((term) => (
                <Badge 
                  key={term} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setSearchQuery(term)}
                >
                  {term}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Help Categories */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Browse Help Topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {helpCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group text-center">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl ${category.color} bg-opacity-20 flex items-center justify-center mx-auto mb-3`}>
                  <category.icon className={`w-6 h-6 ${category.color.replace('bg-', 'text-')}`} />
                </div>
                <h3 className="font-medium group-hover:text-primary transition-colors">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.articles} articles</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Chat */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="h-[500px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                AI Support Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatHistory.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      {message.role === 'assistant' && (
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="w-4 h-4" />
                          <span className="text-xs font-medium">AI Assistant</span>
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                      {message.role === 'assistant' && (
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                          <span className="text-xs text-muted-foreground">Was this helpful?</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ThumbsDown className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <Input 
                  placeholder="Type your question..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Popular Articles & Videos */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Tabs defaultValue="articles">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="articles">Popular Articles</TabsTrigger>
              <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
            </TabsList>

            <TabsContent value="articles">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {popularArticles.map((article, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                          <div>
                            <p className="font-medium text-sm group-hover:text-primary">{article.title}</p>
                            <p className="text-xs text-muted-foreground">{article.views.toLocaleString()} views</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videos">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {videoTutorials.map((video, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Video className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm group-hover:text-primary">{video.title}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" /> {video.duration}
                              <span>•</span>
                              <span>{video.views.toLocaleString()} views</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Contact Support */}
          <Card className="mt-6">
            <CardContent className="p-4 text-center">
              <HelpCircle className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
              <h3 className="font-semibold mb-1">Still need help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is here to assist you
              </p>
              <Button className="w-full">Contact Support</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AIResourceCenterPage;
