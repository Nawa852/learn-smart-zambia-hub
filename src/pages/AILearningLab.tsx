
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Sparkles, MessageCircle, BookOpen, Lightbulb, Zap } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AILearningLab = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Create floating particle animation
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setParticles(newParticles);
  }, []);

  const handleAIQuery = async () => {
    if (!question.trim()) return;
    
    setIsTyping(true);
    setResponse('');
    
    // Simulate AI thinking and response
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const aiResponse = `🧠 AI Learning Assistant: Based on your question "${question}", here are the key insights:\n\n• Core concept explanation with Zambian examples\n• Step-by-step learning pathway\n• Related topics you might find interesting\n• Practice exercises tailored to your level\n\nBuilt with love by Nawa Mulope Brighton Nalionwa, Day, Mr. Loza, Mom, and Dad! 🇿🇲`;
    
    // Typewriter effect
    for (let i = 0; i <= aiResponse.length; i++) {
      setTimeout(() => {
        setResponse(aiResponse.slice(0, i));
      }, i * 30);
    }
    
    setIsTyping(false);
    toast({
      title: "AI Response Generated!",
      description: "Your personalized learning insight is ready.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.id * 0.1}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 animate-scale-in">
            <Brain className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            AI Learning Lab
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your personal AI tutor powered by advanced machine learning. Ask anything, learn everything.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Question Input Panel */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 animate-slide-in-right">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                Ask Your AI Tutor
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-700">What would you like to learn?</label>
                <Textarea
                  placeholder="e.g., Explain photosynthesis with examples from Zambian plants..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="min-h-32 border-2 border-gray-200 focus:border-purple-500 transition-colors duration-300 rounded-xl"
                />
              </div>
              
              <Button 
                onClick={handleAIQuery}
                disabled={isTyping || !question.trim()}
                className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
              >
                {isTyping ? (
                  <>
                    <Brain className="w-5 h-5 mr-2 animate-spin" />
                    AI is thinking...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate AI Response
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* AI Response Panel */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <Brain className="w-6 h-6" />
                AI Response
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="min-h-64 max-h-96 overflow-y-auto">
                {response ? (
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {response}
                    {isTyping && <span className="animate-pulse">|</span>}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <BookOpen className="w-16 h-16 mb-4 opacity-50" />
                    <p>Ask a question to get started with your AI tutor!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <Lightbulb className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold text-lg mb-2">Quick Explanations</h3>
              <p className="text-gray-600">Get instant explanations for any concept</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-bold text-lg mb-2">Practice Problems</h3>
              <p className="text-gray-600">Generate custom practice exercises</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-pink-600" />
              <h3 className="font-bold text-lg mb-2">Study Plans</h3>
              <p className="text-gray-600">Get personalized study recommendations</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AILearningLab;
