import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Brain, Send, Mic, Volume2, VolumeX, Sparkles, Loader2 } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AICompanionProps {
  userRole: string;
  userName: string;
}

// Mock AI responses based on user role
const getMockResponse = (userMessage: string, userRole: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  const roleResponses: Record<string, Record<string, string>> = {
    student: {
      default: "I understand you're looking for help! As your BrightSphere AI companion, I can assist with explaining concepts, creating study plans, generating flashcards, or helping you prepare for exams. What specific topic or subject would you like to focus on?",
      math: "For mathematics, I recommend starting with understanding the core concepts. Would you like me to break down the problem step by step, create practice problems, or explain the underlying theory?",
      study: "Great question about studying! Here are my top recommendations: 1) Use spaced repetition for better retention, 2) Take breaks every 25 minutes (Pomodoro technique), 3) Teach concepts to others to reinforce learning. Which approach interests you?",
      exam: "For exam preparation, let's create a strategic plan! I can help you identify key topics, generate practice questions, create summary notes, or set up a revision schedule. What subject is the exam for?"
    },
    teacher: {
      default: "Hello! As your AI teaching assistant, I can help create lesson plans, generate assessments, analyze student performance data, or suggest engagement strategies. How can I support your teaching today?",
      lesson: "I'd be happy to help with lesson planning! Tell me the subject, grade level, and topic, and I'll generate a comprehensive ECZ-aligned lesson plan with objectives, activities, and assessments.",
      grade: "For grading assistance, I can help create rubrics, generate feedback templates, or analyze patterns in student submissions. What type of assessment are you working with?",
      student: "Student management is crucial! I can help identify at-risk students based on performance patterns, suggest intervention strategies, or draft parent communication. What's your specific concern?"
    },
    guardian: {
      default: "Welcome! As a guardian support AI, I can help you understand your child's progress, suggest ways to support their learning at home, or explain educational concepts. How can I assist you?",
      progress: "I can provide detailed insights into your child's academic progress, including strengths, areas for improvement, and recommended activities. Which subject would you like to focus on?",
      help: "Supporting learning at home is valuable! I recommend: 1) Creating a dedicated study space, 2) Establishing consistent routines, 3) Showing interest in their schoolwork. Would you like specific activity suggestions?"
    },
    institution: {
      default: "Greetings! I can assist with institutional analytics, curriculum planning, staff management insights, or compliance reporting. What aspect of institution management would you like to explore?",
      report: "I can generate comprehensive reports on student performance, attendance trends, resource utilization, and more. What specific metrics are you interested in analyzing?",
      analytics: "Our analytics capabilities include predictive dropout identification, performance benchmarking, and trend analysis across departments. Which area would you like to dive into?"
    }
  };

  const responses = roleResponses[userRole] || roleResponses.student;
  
  if (lowerMessage.includes('math') || lowerMessage.includes('calculus') || lowerMessage.includes('algebra')) {
    return responses.math || responses.default;
  }
  if (lowerMessage.includes('study') || lowerMessage.includes('learn')) {
    return responses.study || responses.default;
  }
  if (lowerMessage.includes('exam') || lowerMessage.includes('test') || lowerMessage.includes('quiz')) {
    return responses.exam || responses.default;
  }
  if (lowerMessage.includes('lesson') || lowerMessage.includes('plan')) {
    return responses.lesson || responses.default;
  }
  if (lowerMessage.includes('grade') || lowerMessage.includes('mark')) {
    return responses.grade || responses.default;
  }
  if (lowerMessage.includes('student')) {
    return responses.student || responses.default;
  }
  if (lowerMessage.includes('progress') || lowerMessage.includes('performance')) {
    return responses.progress || responses.default;
  }
  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return responses.help || responses.default;
  }
  if (lowerMessage.includes('report')) {
    return responses.report || responses.default;
  }
  if (lowerMessage.includes('analytics') || lowerMessage.includes('data')) {
    return responses.analytics || responses.default;
  }
  
  return responses.default;
};

export const AICompanion = ({ userRole, userName }: AICompanionProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello ${userName}! I'm your BrightSphere AI companion. How can I assist you today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { speak, cancel, speaking } = useTextToSpeech();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateStreamingResponse = async (userMessage: string) => {
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const fullResponse = getMockResponse(userMessage, userRole);
    let currentResponse = '';

    // Simulate streaming effect
    for (let i = 0; i < fullResponse.length; i++) {
      currentResponse += fullResponse[i];
      
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && prev.length > newMessages.length) {
          return prev.map((m, idx) => 
            idx === prev.length - 1 ? { ...m, content: currentResponse } : m
          );
        }
        return [...prev.slice(0, newMessages.length), { role: 'assistant' as const, content: currentResponse }];
      });
      
      // Add small delay for streaming effect
      if (i % 3 === 0) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }

    setIsLoading(false);
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    simulateStreamingResponse(input.trim());
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('Voice input not supported in this browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = () => {
      toast.error('Voice input failed. Please try again.');
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSpeak = (text: string) => {
    if (speaking) {
      cancel();
    } else {
      speak(text);
    }
  };

  return (
    <Card className="h-full flex flex-col border-0 shadow-lg bg-gradient-to-br from-primary/5 to-background">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">BrightSphere AI</h3>
              <p className="text-xs text-muted-foreground">Your Quantum Intelligence Companion</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            Demo Mode
          </Badge>
        </CardTitle>
      </CardHeader>

      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.role === 'assistant' && (
                    <Sparkles className="w-4 h-4 mt-1 flex-shrink-0" />
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'assistant' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleSpeak(message.content)}
                    className="mt-2 h-6 text-xs"
                  >
                    {speaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  </Button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">BrightSphere is thinking...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <CardContent className="border-t p-4">
        <div className="flex gap-2">
          <Button
            size="icon"
            variant={isListening ? "default" : "outline"}
            onClick={startVoiceInput}
            disabled={isLoading}
          >
            <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask BrightSphere anything..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Powered by BrightSphere Quantum Core • Voice enabled • Multi-language support
        </p>
      </CardContent>
    </Card>
  );
};
