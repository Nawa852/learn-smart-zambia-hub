import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Send, Paperclip, Mic, Smile, MoreVertical, Phone, Video,
  Search, Settings, Brain, PlayCircle, FileText, Languages
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'video' | 'ai_suggestion';
  aiTranslation?: string;
  aiSummary?: string;
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
  isTyping?: boolean;
}

const MessengerChat = () => {
  const [selectedChat, setSelectedChat] = useState('1');
  const [message, setMessage] = useState('');
  const [showAIPanel, setShowAIPanel] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chats: ChatUser[] = [
    {
      id: '1',
      name: 'Study Group: ML Basics',
      avatar: '/group1.jpg',
      status: 'online'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: '/student1.jpg',
      status: 'online',
      isTyping: true
    },
    {
      id: '3',
      name: 'Dr. Michael Chen',
      avatar: '/instructor1.jpg',
      status: 'away',
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '4',
      name: 'Physics Study Group',
      avatar: '/group2.jpg',
      status: 'online'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      senderId: '2',
      senderName: 'Sarah',
      content: 'Hey everyone! I just finished implementing the neural network from yesterday\'s lecture. The backpropagation algorithm is working perfectly!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'text'
    },
    {
      id: '2',
      senderId: 'me',
      senderName: 'You',
      content: 'That\'s awesome! Could you share the code? I\'m struggling with the gradient calculation part.',
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      type: 'text'
    },
    {
      id: '3',
      senderId: '3',
      senderName: 'Alex',
      content: 'I found this great YouTube video that explains backpropagation visually. Should help with understanding the math behind it.',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      type: 'text'
    },
    {
      id: '4',
      senderId: 'ai',
      senderName: 'AI Assistant',
      content: 'I noticed you\'re discussing backpropagation. Would you like me to generate some practice problems or create flashcards for key concepts?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'ai_suggestion'
    }
  ];

  const aiSuggestions = [
    'Explain backpropagation in simple terms',
    'Generate practice problems for neural networks',
    'Translate this discussion to Spanish',
    'Create study notes from this conversation'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Send message logic here
      setMessage('');
    }
  };

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  return (
    <div className="h-[600px] flex bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat List Sidebar */}
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search conversations..." className="pl-10" />
          </div>
        </div>
        
        <div className="overflow-y-auto">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                selectedChat === chat.id ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
              }`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>
                      {chat.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(chat.status)}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{chat.name}</h3>
                  {chat.isTyping ? (
                    <p className="text-sm text-blue-600">Typing...</p>
                  ) : (
                    <p className="text-sm text-gray-500 truncate">
                      Last message preview...
                    </p>
                  )}
                </div>
                
                <div className="text-xs text-gray-400">
                  2m
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {selectedChatData?.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{selectedChatData?.name}</h3>
                <p className="text-sm text-gray-500">
                  {selectedChatData?.status === 'online' ? 'Active now' : 'Last seen 2h ago'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAIPanel(!showAIPanel)}
                className={showAIPanel ? 'text-blue-600 bg-blue-50' : ''}
              >
                <Brain className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${msg.senderId === 'me' ? 'order-2' : 'order-1'}`}>
                {msg.senderId !== 'me' && msg.senderId !== 'ai' && (
                  <p className="text-xs text-gray-500 mb-1 px-2">{msg.senderName}</p>
                )}
                
                <div className={`rounded-lg px-4 py-2 ${
                  msg.senderId === 'me' 
                    ? 'bg-blue-600 text-white' 
                    : msg.type === 'ai_suggestion'
                    ? 'bg-purple-100 text-purple-800 border border-purple-200'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.type === 'ai_suggestion' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4" />
                      <span className="text-xs font-medium">AI Assistant</span>
                    </div>
                  )}
                  
                  <p className="text-sm">{msg.content}</p>
                  
                  {msg.aiTranslation && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <div className="flex items-center gap-1 mb-1">
                        <Translate className="w-3 h-3" />
                        <span className="text-xs opacity-70">Translation:</span>
                      </div>
                      <p className="text-xs opacity-80">{msg.aiTranslation}</p>
                    </div>
                  )}
                  
                  <div className={`text-xs mt-1 ${
                    msg.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTimestamp(msg.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* AI Panel */}
        {showAIPanel && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-purple-600" />
              <h4 className="font-medium">AI Smart Assist</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {aiSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-left justify-start h-auto p-2"
                >
                  <span className="text-xs">{suggestion}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                <Button variant="ghost" size="sm">
                  <Smile className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <Button onClick={handleSendMessage} disabled={!message.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessengerChat;
