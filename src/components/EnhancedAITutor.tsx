
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Brain, Send, Mic, MicOff, Globe, BookOpen, Zap, Star, Volume2 } from 'lucide-react';

// Type declarations for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  language?: string;
  subject?: string;
}

const EnhancedAITutor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Muli bwanji! I am your AI tutor. I can help you with ECZ subjects in English, Bemba, Nyanja, Tonga, or Lozi. What would you like to learn today?',
      sender: 'ai',
      timestamp: new Date(),
      language: 'english'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedSubject, setSelectedSubject] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const languages = [
    { code: 'english', name: 'English', greeting: 'Hello!' },
    { code: 'bemba', name: 'Bemba', greeting: 'Muli bwanji!' },
    { code: 'nyanja', name: 'Nyanja', greeting: 'Muli bwanji!' },
    { code: 'tonga', name: 'Tonga', greeting: 'Mwabonwa!' },
    { code: 'lozi', name: 'Lozi', greeting: 'Lumela!' }
  ];

  const subjects = [
    { code: 'general', name: 'General', icon: '🎓' },
    { code: 'mathematics', name: 'Mathematics', icon: '🔢' },
    { code: 'physics', name: 'Physics', icon: '⚡' },
    { code: 'chemistry', name: 'Chemistry', icon: '🧪' },
    { code: 'biology', name: 'Biology', icon: '🧬' },
    { code: 'english', name: 'English', icon: '📖' },
    { code: 'civic', name: 'Civic Education', icon: '🏛️' },
    { code: 'geography', name: 'Geography', icon: '🌍' },
    { code: 'history', name: 'History', icon: '📜' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      language: selectedLanguage,
      subject: selectedSubject
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Simulate AI response with context awareness
      const aiResponse = await generateAIResponse(inputText, selectedLanguage, selectedSubject);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        language: selectedLanguage,
        subject: selectedSubject
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = async (question: string, language: string, subject: string): Promise<string> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Context-aware responses based on subject and language
    const responses = {
      mathematics: {
        english: "Let me help you with this math problem. I'll break it down step by step...",
        bemba: "Nga twafwaikwa ubusako bwa mathematics. Ndichita step by step...",
        nyanja: "Tiyeni tiwone mchitidwe wa mathematics. Ndichita step by step...",
        tonga: "Aka tuyandisye ku mathematics. Ndichita step by step...",
        lozi: "Hape re nyalane ku mathematics. Ndichita step by step..."
      },
      physics: {
        english: "This is an interesting physics concept! Let me explain the principles involved...",
        bemba: "Ichi ni concept ya physics iisuma! Nga ndeendelele ukwishiba...",
        nyanja: "Ichi ndi physics concept yabwino! Ndiyankhe mwatsatanetsatane...",
        tonga: "Ichi ni concept ya physics inoonga! Ndiyankhe mwina...",
        lozi: "Sena ke concept ya physics e ntle! Ke tla hlalosa..."
      },
      general: {
        english: "That's a great question! Let me provide you with a comprehensive answer...",
        bemba: "Ubufiko bwenu bwasuma! Nga ndepangeni icakwafwaikwa...",
        nyanja: "Fumba lanu labwino! Ndikupatseni yankho lofotokoza bwino...",
        tonga: "Mbubuzyo bwanu bwabotu! Ndiyankhe bwino...",
        lozi: "Potso ea hau e ntle! Ke tla u fa karabo e felletseng..."
      }
    };

    const subjectResponses = responses[subject as keyof typeof responses] || responses.general;
    return subjectResponses[language as keyof typeof subjectResponses] || subjectResponses.english;
  };

  const handleVoiceInput = () => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage === 'english' ? 'en-US' : 'en-US'; // Can be expanded for local languages
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
      };
      
      recognition.onerror = () => {
        toast({
          title: "Voice Recognition Error",
          description: "Unable to recognize speech. Please try again.",
          variant: "destructive",
        });
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      toast({
        title: "Voice Not Supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      });
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'english' ? 'en-US' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              Enhanced AI Tutor
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Zap className="w-3 h-3 mr-1" />
                Multilingual
              </Badge>
            </CardTitle>
            <p className="text-blue-100">Your intelligent learning companion for ECZ subjects in multiple Zambian languages</p>
          </CardHeader>
        </Card>

        {/* Language and Subject Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="w-5 h-5 text-blue-600" />
                Language
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={selectedLanguage === lang.code ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={selectedLanguage === lang.code ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    {lang.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="w-5 h-5 text-green-600" />
                Subject
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {subjects.slice(0, 5).map((subject) => (
                  <Button
                    key={subject.code}
                    variant={selectedSubject === subject.code ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSubject(subject.code)}
                    className={selectedSubject === subject.code ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    <span className="mr-1">{subject.icon}</span>
                    {subject.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      {message.sender === 'ai' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakText(message.text)}
                          className="h-6 w-6 p-0 hover:bg-white/20"
                        >
                          <Volume2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                      <span className="text-sm text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Ask a question in ${languages.find(l => l.code === selectedLanguage)?.name}...`}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleVoiceInput}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${
                      isListening ? 'text-red-500' : 'text-gray-400'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!inputText.trim() || isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>Press Enter to send • Click mic for voice input</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>Powered by AI</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedAITutor;
