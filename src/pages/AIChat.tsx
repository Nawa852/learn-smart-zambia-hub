import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import {
  Send, Sparkles, User, Bot, RotateCcw, Copy,
  ThumbsUp, ThumbsDown, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const suggestedPrompts = [
  "Explain photosynthesis in simple terms",
  "Help me solve a quadratic equation",
  "Create flashcards for Zambian history",
  "Explain the water cycle for Grade 7",
  "Help me prepare for my ECZ exams",
  "What are Newton's three laws of motion?",
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
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-study-chat', {
        body: {
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
        },
      });

      if (error) throw error;

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content || "Sorry, I couldn't generate a response.",
      }]);
    } catch (err: any) {
      toast.error('Failed to get AI response');
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto">
      <ScrollArea className="flex-1 px-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-5">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">BrightSphere AI</h1>
            <p className="text-muted-foreground text-center max-w-md mb-8 text-sm">
              Your personal AI study buddy. Ask about any subject, get exam help, or explore new topics.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(prompt); textareaRef.current?.focus(); }}
                  className="p-3 text-left rounded-xl border border-border hover:border-primary/40 hover:bg-accent/20 transition-all text-sm text-foreground/80 hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-5">
            {messages.map(message => (
              <div key={message.id} className={cn("flex gap-3", message.role === 'user' ? 'flex-row-reverse' : '')}>
                <Avatar className="w-7 h-7 flex-shrink-0 mt-1">
                  <AvatarFallback className={cn(
                    "text-xs",
                    message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-gradient-to-br from-primary to-accent text-white'
                  )}>
                    {message.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </AvatarFallback>
                </Avatar>
                <div className={cn("max-w-[80%]", message.role === 'user' && 'flex justify-end')}>
                  <div className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm",
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted rounded-bl-md'
                  )}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-1 mt-1 opacity-0 hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyMessage(message.content)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><ThumbsUp className="w-3 h-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><ThumbsDown className="w-3 h-3" /></Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                    <Bot className="w-3.5 h-3.5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t border-border bg-background">
        <form onSubmit={handleSubmit}>
          <div className="flex items-end gap-2 p-2 rounded-2xl border border-border bg-muted/20 focus-within:border-primary/40 transition-colors">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your studies..."
              className="flex-1 min-h-[40px] max-h-[160px] resize-none border-0 bg-transparent focus-visible:ring-0 py-2.5 text-sm"
              rows={1}
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="h-9 w-9 rounded-xl">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
        {messages.length > 0 && (
          <div className="flex justify-center mt-2">
            <Button variant="ghost" size="sm" onClick={() => setMessages([])} className="text-xs text-muted-foreground">
              <RotateCcw className="w-3 h-3 mr-1" /> Clear chat
            </Button>
          </div>
        )}
        <p className="text-[10px] text-center text-muted-foreground mt-2">
          BrightSphere AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
};

export default AIChat;
