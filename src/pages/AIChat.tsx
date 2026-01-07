import React, { useState, useRef, useEffect } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  Camera, 
  Mic, 
  Paperclip,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  "Explain photosynthesis in simple terms",
  "Help me solve this math problem",
  "Create flashcards for Zambian history",
  "Explain the water cycle for Grade 7",
  "Help me prepare for my ECZ exams",
  "Translate this text to Bemba"
];

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response - ready for backend integration
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking about: "${userMessage.content}"\n\nThis is a placeholder response. Connect to your backend AI service to get real responses. The interface is ready for streaming responses from OpenAI, Claude, Gemini, or any other AI provider.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto">
        {/* Chat Area */}
        <ScrollArea className="flex-1 px-4" ref={scrollRef}>
          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 animate-pulse">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">BrightSphere AI</h1>
              <p className="text-muted-foreground text-center max-w-md mb-8">
                Your personal AI tutor. Ask anything about your studies, get help with homework, or explore new topics.
              </p>
              
              {/* Suggested Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="p-4 text-left rounded-xl border border-border hover:border-primary/50 hover:bg-accent/30 transition-all duration-200 group"
                  >
                    <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {prompt}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages */
            <div className="py-4 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-4",
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className={cn(
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-gradient-to-br from-primary to-accent text-white'
                    )}>
                      {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={cn(
                    "flex-1 max-w-[80%]",
                    message.role === 'user' && 'flex justify-end'
                  )}>
                    <div className={cn(
                      "rounded-2xl px-4 py-3",
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-br-md' 
                        : 'bg-muted rounded-bl-md'
                    )}>
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                    </div>
                    
                    {/* Message Actions */}
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mt-2 opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex gap-4">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-background">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end gap-2 p-2 rounded-2xl border border-border bg-muted/30 focus-within:border-primary/50 transition-colors">
              {/* Attachment Buttons */}
              <div className="flex items-center gap-1 pb-2">
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Camera className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Mic className="w-4 h-4" />
                </Button>
              </div>

              {/* Text Input */}
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your studies..."
                className="flex-1 min-h-[44px] max-h-[200px] resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 py-3"
                rows={1}
              />

              {/* Send Button */}
              <Button 
                type="submit" 
                size="icon"
                disabled={!input.trim() || isLoading}
                className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 mb-1"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Footer Actions */}
          {messages.length > 0 && (
            <div className="flex justify-center mt-3">
              <Button variant="ghost" size="sm" onClick={clearChat} className="text-muted-foreground">
                <RotateCcw className="w-3 h-3 mr-2" />
                Clear chat
              </Button>
            </div>
          )}

          <p className="text-xs text-center text-muted-foreground mt-3">
            BrightSphere AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default AIChat;
