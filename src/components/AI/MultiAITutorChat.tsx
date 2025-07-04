
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Send, Bot, Zap, MessageCircle, Sparkles, Cpu, Globe, Rocket, Star } from 'lucide-react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

const MultiAITutorChat = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your multi-AI tutor powered by the world's most advanced AI models. Choose an AI model and ask me anything about your studies!",
      timestamp: new Date(),
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('grok');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const aiModels = [
    { 
      value: 'grok', 
      label: 'Grok AI', 
      icon: Zap, 
      color: 'bg-cyan-100 text-cyan-800', 
      description: 'Advanced reasoning and creative problem solving with real-time knowledge' 
    },
    { 
      value: 'openai', 
      label: 'OpenAI GPT-4o-mini', 
      icon: Brain, 
      color: 'bg-green-100 text-green-800', 
      description: 'Excellent for general tutoring, explanations, and creative solutions' 
    },
    { 
      value: 'claude', 
      label: 'Anthropic Claude', 
      icon: MessageCircle, 
      color: 'bg-orange-100 text-orange-800', 
      description: 'Superior for detailed analysis, critical thinking, and comprehensive explanations' 
    },
    { 
      value: 'deepseek', 
      label: 'DeepSeek', 
      icon: Cpu, 
      color: 'bg-blue-100 text-blue-800', 
      description: 'Specialized in mathematics, coding, and technical subjects with step-by-step solutions' 
    },
    { 
      value: 'llama', 
      label: 'LLaMA 4', 
      icon: Rocket, 
      color: 'bg-red-100 text-red-800', 
      description: 'Fast responses and efficient processing for quick learning' 
    },
    { 
      value: 'gemini', 
      label: 'Google Gemini', 
      icon: Star, 
      color: 'bg-purple-100 text-purple-800', 
      description: 'Multimodal AI with strong visual understanding and analysis' 
    },
    { 
      value: 'qwen', 
      label: 'Qwen AI', 
      icon: Globe, 
      color: 'bg-indigo-100 text-indigo-800', 
      description: 'Excellent multilingual support with cultural context awareness' 
    },
    { 
      value: 'minimax', 
      label: 'MiniMax', 
      icon: Sparkles, 
      color: 'bg-pink-100 text-pink-800', 
      description: 'Creative AI for innovative problem-solving approaches' 
    },
    { 
      value: 'moonshot', 
      label: 'Moonshot AI', 
      icon: Rocket, 
      color: 'bg-yellow-100 text-yellow-800', 
      description: 'Long-context AI for comprehensive document analysis' 
    },
    { 
      value: 'kimi', 
      label: 'Kimi AI', 
      icon: Brain, 
      color: 'bg-teal-100 text-teal-800', 
      description: 'Intelligent assistant with strong reasoning capabilities' 
    }
  ];

  const getCurrentModel = () => {
    return aiModels.find(model => model.value === selectedModel) || aiModels[0];
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('multi-ai-tutor', {
        body: {
          message: currentMessage,
          model: selectedModel,
          systemPrompt: `You are an expert AI tutor for students in Zambia. Provide clear, educational explanations that are:
          - Aligned with the Educational Curriculum of Zambia (ECZ) standards
          - Step-by-step for complex topics
          - Encouraging and supportive
          - Culturally relevant to Zambian students
          - Use examples from Zambian context when possible
          - Support learning in English and local languages when appropriate`
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to get AI response');
      }

      if (!data || !data.response) {
        throw new Error('No response received from AI');
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        model: selectedModel
      };
      
      setMessages(prev => [...prev, aiResponse]);

      // Show success toast with model info
      toast({
        title: `Response from ${getCurrentModel().label}`,
        description: "AI response generated successfully",
      });

    } catch (error) {
      console.error('Error calling AI tutor:', error);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get AI response. Please try again.",
        variant: "destructive",
      });

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or try a different AI model.',
        timestamp: new Date(),
        model: selectedModel
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="h-[700px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-blue-600" />
          Multi-AI Tutor Hub
        </CardTitle>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">AI Model:</span>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {aiModels.map((model) => {
                  const IconComponent = model.icon;
                  return (
                    <SelectItem key={model.value} value={model.value}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        {model.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
            <strong>{getCurrentModel().label}:</strong> {getCurrentModel().description}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex flex-col gap-1 max-w-[80%]">
                  {message.role === 'assistant' && message.model && (
                    <Badge className={`${getCurrentModel().color} text-xs w-fit`}>
                      {aiModels.find(m => m.value === message.model)?.label || message.model}
                    </Badge>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                        : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900 border'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <span className="text-xs opacity-70 block mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-green-100 to-blue-100">
                      {user?.user_metadata?.full_name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 border">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {getCurrentModel().label} is thinking...
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t bg-gray-50">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask me anything about your studies... I'm powered by the world's best AI models!"
              onKeyDown={handleKeyPress}
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={sendMessage} 
              disabled={!newMessage.trim() || isLoading}
              className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send • Shift+Enter for new line • Powered by {getCurrentModel().label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiAITutorChat;
