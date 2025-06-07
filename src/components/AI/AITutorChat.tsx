
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Brain, Mic, MicOff, Send, BookOpen, Target, Heart } from 'lucide-react';
import { useAuth } from '@/components/Auth/AuthProvider';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'explanation' | 'quiz' | 'motivation' | 'roleplay';
}

const AITutorChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI tutor. I can help you learn any subject, create study plans, quiz you, or even roleplay scenarios. What would you like to explore today?",
      timestamp: new Date(),
      type: 'explanation'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [tutorMode, setTutorMode] = useState<'explanation' | 'quiz' | 'motivation' | 'roleplay'>('explanation');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(newMessage, tutorMode),
        timestamp: new Date(),
        type: tutorMode
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (input: string, mode: string): string => {
    switch (mode) {
      case 'explanation':
        return `Great question! Let me break this down for you: ${input}. Here's a detailed explanation with examples...`;
      case 'quiz':
        return `Let's test your understanding! Based on what we discussed, here's a question: What do you think happens when...?`;
      case 'motivation':
        return `I can see you're working hard! Remember, every expert was once a beginner. Let's tackle this step by step...`;
      case 'roleplay':
        return `Perfect! Let's roleplay this scenario. I'll be the interviewer and you can practice your responses...`;
      default:
        return `I understand you're asking about "${input}". Let me help you with that...`;
    }
  };

  const startVoiceInput = () => {
    setIsListening(true);
    // Implement voice recognition here
    setTimeout(() => {
      setIsListening(false);
      setNewMessage("This would be the transcribed speech from voice input");
    }, 3000);
  };

  const modes = [
    { key: 'explanation', label: 'Explain Concepts', icon: BookOpen, color: 'blue' },
    { key: 'quiz', label: 'Quiz Me', icon: Target, color: 'green' },
    { key: 'motivation', label: 'Motivate Me', icon: Heart, color: 'pink' },
    { key: 'roleplay', label: 'Roleplay', icon: Brain, color: 'purple' }
  ];

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-600" />
          AI Tutor & Personal Coach
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          {modes.map(({ key, label, icon: Icon, color }) => (
            <Badge
              key={key}
              variant={tutorMode === key ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setTutorMode(key as any)}
            >
              <Icon className="w-3 h-3 mr-1" />
              {label}
            </Badge>
          ))}
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
                    <AvatarImage src="/ai-tutor-avatar.png" />
                    <AvatarFallback>
                      <Brain className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback>
                      {user?.user_metadata?.full_name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <Brain className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask me anything or describe what you'd like to learn..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button
              onClick={startVoiceInput}
              variant="outline"
              size="icon"
              className={isListening ? 'bg-red-100' : ''}
            >
              {isListening ? (
                <MicOff className="w-4 h-4 text-red-600" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
            <Button onClick={sendMessage} disabled={!newMessage.trim() || isLoading}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AITutorChat;
