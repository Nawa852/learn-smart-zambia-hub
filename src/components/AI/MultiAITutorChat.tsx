import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Send, Bot, Zap, MessageCircle, Sparkles, Cpu, Loader2, User, Copy, Check } from 'lucide-react';
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
      content: "👋 Hello! I'm **BrightSphere AI** — your personal tutor powered by multiple AI models. I specialize in the Zambian curriculum and ECZ exam preparation.\n\n**Choose a model** and ask me anything — from math problems to essay writing!",
      timestamp: new Date(),
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-flash');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const aiModels = [
    { value: 'gemini-flash', label: 'Gemini Flash', icon: Zap, color: 'bg-blue-500/10 text-blue-700', description: 'Fast & balanced — great for most questions' },
    { value: 'gemini-pro', label: 'Gemini Pro', icon: Brain, color: 'bg-purple-500/10 text-purple-700', description: 'Deep reasoning for complex problems' },
    { value: 'gpt5-mini', label: 'GPT-5 Mini', icon: Sparkles, color: 'bg-emerald-500/10 text-emerald-700', description: 'Versatile — excellent for essays & analysis' },
    { value: 'gemini-3-flash', label: 'Gemini 3 Flash', icon: Cpu, color: 'bg-orange-500/10 text-orange-700', description: 'Next-gen speed with high quality' },
    { value: 'gemini-flash-lite', label: 'Flash Lite', icon: MessageCircle, color: 'bg-cyan-500/10 text-cyan-700', description: 'Quickest responses for simple questions' },
  ];

  const getCurrentModel = () => {
    return aiModels.find(model => model.value === selectedModel) || aiModels[0];
  };

  const copyToClipboard = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

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
      const conversationHistory = messages
        .filter(m => m.id !== '1')
        .slice(-10)
        .map(m => ({ role: m.role, content: m.content }));

      const { data, error } = await supabase.functions.invoke('multi-ai-tutor', {
        body: {
          message: currentMessage,
          model: selectedModel,
          conversationHistory,
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data?.response || "I couldn't generate a response. Please try again.",
        timestamp: new Date(),
        model: getCurrentModel().label
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('AI Tutor error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "⚠️ I'm having trouble right now. Please try again in a moment, or switch to a different model.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      toast({
        title: "Connection issue",
        description: "Try again or switch AI models.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const quickPrompts = [
    "Explain photosynthesis for Grade 9",
    "Solve: 3x² + 5x - 2 = 0",
    "Help me write an English essay introduction",
    "What are the provinces of Zambia?",
    "Explain Newton's laws of motion",
  ];

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="pb-3 border-b border-border/30">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Brain className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-lg">BrightSphere AI Tutor</CardTitle>
          </div>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {aiModels.map(model => (
                <SelectItem key={model.value} value={model.value}>
                  <div className="flex items-center gap-2">
                    <model.icon className="h-3.5 w-3.5" />
                    <span className="text-sm">{model.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {getCurrentModel().description}
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[450px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      <Bot className="h-3.5 w-3.5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[80%] group ${message.role === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                  {message.role === 'assistant' && message.id !== '1' && (
                    <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {message.model && (
                        <Badge variant="outline" className="text-[10px] h-5 px-1.5">{message.model}</Badge>
                      )}
                      <button
                        onClick={() => copyToClipboard(message.content, message.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedId === message.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="bg-secondary text-xs">
                      <User className="h-3.5 w-3.5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    <Bot className="h-3.5 w-3.5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {messages.length <= 1 && (
          <div className="px-4 pb-3">
            <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => { setNewMessage(prompt); inputRef.current?.focus(); }}
                  className="text-xs px-2.5 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t border-border/30">
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            className="flex gap-2"
          >
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !newMessage.trim()} size="icon">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiAITutorChat;