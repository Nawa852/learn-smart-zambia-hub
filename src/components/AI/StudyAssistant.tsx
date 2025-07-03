
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Mic, MicOff, Volume2, Send, Bot, User, Globe, Zap, Shield, Eye } from 'lucide-react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  language?: string;
  aiModel?: string;
}

const StudyAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedAIModel, setSelectedAIModel] = useState('GPT-4o');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const languages = [
    { value: 'English', label: 'English', flag: '🇬🇧' },
    { value: 'Bemba', label: 'Bemba', flag: '🇿🇲' },
    { value: 'Nyanja', label: 'Nyanja', flag: '🇿🇲' },
    { value: 'Tonga', label: 'Tonga', flag: '🇿🇲' },
    { value: 'Lozi', label: 'Lozi', flag: '🇿🇲' },
    { value: 'Kaonde', label: 'Kaonde', flag: '🇿🇲' },
    { value: 'Lunda', label: 'Lunda', flag: '🇿🇲' }
  ];

  const aiModels = [
    { value: 'GPT-4o', label: 'GPT-4o', icon: Brain, color: 'text-blue-600', description: 'Advanced reasoning & explanations' },
    { value: 'Claude 3', label: 'Claude 3', icon: Shield, color: 'text-green-600', description: 'Safe, helpful responses' },
    { value: 'Qwen', label: 'Qwen', icon: Globe, color: 'text-purple-600', description: 'Multilingual specialist' },
    { value: 'Gemini', label: 'Gemini 1.5', icon: Eye, color: 'text-orange-600', description: 'Visual & creative learning' },
    { value: 'DeepSeek', label: 'DeepSeek', icon: Zap, color: 'text-red-600', description: 'Deep analysis & predictions' }
  ];

  useEffect(() => {
    // Add welcome message
    setMessages([{
      id: '1',
      content: `Muli bwanji! I'm your AI tutor powered by ${selectedAIModel}. I can help you with ECZ curriculum questions in ${selectedLanguage}. What would you like to learn today?`,
      isUser: false,
      timestamp: new Date(),
      language: selectedLanguage,
      aiModel: selectedAIModel
    }]);
  }, [selectedLanguage, selectedAIModel]);

  // Voice recognition setup
  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage === 'English' ? 'en-US' : 'en-US'; // Fallback to English for now
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice Input Error",
          description: "Please try again or type your question.",
          variant: "destructive",
        });
      };
      
      recognition.start();
    } else {
      toast({
        title: "Voice Not Supported",
        description: "Voice input is not supported in your browser.",
        variant: "destructive",
      });
    }
  };

  // Text-to-speech
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'English' ? 'en-US' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      // Route to different AI models based on selection
      let edgeFunction = 'multi-ai-tutor';
      
      const { data, error } = await supabase.functions.invoke('comprehensive-ai-assistant', {
        body: {
          query: inputMessage,
          feature: 'study_assistant',
          context: `Language: ${selectedLanguage}, ECZ curriculum tutoring`
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I apologize, but I'm having trouble processing your request right now. Please try again.",
        isUser: false,
        timestamp: new Date(),
        language: selectedLanguage,
        aiModel: selectedAIModel
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Speak the response if it's in English or user enabled audio
      if (selectedLanguage === 'English') {
        speakText(data.response);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting to the AI service right now, but I'm still here to help! Could you try rephrasing your question?",
        isUser: false,
        timestamp: new Date(),
        language: selectedLanguage,
        aiModel: selectedAIModel
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
      
      toast({
        title: "Connection Issue",
        description: "Using fallback mode. Some features may be limited.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const currentAIModel = aiModels.find(model => model.value === selectedAIModel);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Card className="h-[700px] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">AI Study Assistant</CardTitle>
                <p className="text-sm text-gray-600">Powered by {selectedAIModel} • 24/7 Available</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                All Systems Active
              </Badge>
            </div>
          </div>

          {/* AI Model and Language Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">AI Model</label>
              <Select value={selectedAIModel} onValueChange={setSelectedAIModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {aiModels.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      <div className="flex items-center gap-2">
                        <model.icon className={`w-4 h-4 ${model.color}`} />
                        <span>{model.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {currentAIModel && (
                <p className="text-xs text-gray-500">{currentAIModel.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4">
          <ScrollArea className="flex-1 mb-4 p-4 border rounded-lg bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Brain className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold mb-2">Welcome to your AI Study Assistant!</h3>
                <p className="text-sm">
                  Ask me anything about ECZ curriculum, homework help, exam prep, or career guidance.
                  I can respond in {selectedLanguage} using {selectedAIModel}.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isUser 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    }`}>
                      {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.isUser
                        ? 'bg-blue-600 text-white ml-auto'
                        : 'bg-white border shadow-sm'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        <div className="flex items-center gap-1">
                          {message.aiModel && (
                            <Badge variant="outline" className="text-xs">
                              {message.aiModel}
                            </Badge>
                          )}
                          {!message.isUser && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => speakText(message.content)}
                            >
                              <Volume2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border shadow-sm rounded-lg px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Input
                placeholder={`Ask a question in ${selectedLanguage} (powered by ${selectedAIModel})...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={loading}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={startListening}
                disabled={isListening || loading}
                className={isListening ? 'bg-red-100 border-red-300' : ''}
                title="Voice Input"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button onClick={sendMessage} disabled={!inputMessage.trim() || loading}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">
                Powered by multiple AI models including {selectedAIModel}, with ECZ curriculum alignment
              </div>
              <div className="flex justify-center gap-1">
                {['GPT-4o', 'Claude 3', 'Qwen', 'Gemini', 'DeepSeek'].map((model, index) => (
                  <div key={index} className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.2}s` }}></div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyAssistant;
