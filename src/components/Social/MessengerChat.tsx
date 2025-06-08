import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, Phone, Video, MoreVertical, Paperclip, Smile, 
  Users, Search, Settings, Star, Archive, Bell, Globe
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Define types
interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'idle' | 'busy';
}

interface Conversation {
  id: string;
  name: string;
  participants: User[];
  lastMessage: string;
  lastMessageTime: string;
}

interface Message {
  id: string;
  sender: 'me' | 'other';
  text: string;
  time: string;
}

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: number;
}

// Mock Data
const mockUsers: User[] = [
  { id: 'user-1', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=1', status: 'online' },
  { id: 'user-2', name: 'Bob Williams', avatar: 'https://i.pravatar.cc/150?img=2', status: 'offline' },
  { id: 'user-3', name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?img=3', status: 'idle' },
  { id: 'user-4', name: 'Diana Miller', avatar: 'https://i.pravatar.cc/150?img=4', status: 'busy' },
];

const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    name: 'Alice Johnson',
    participants: [mockUsers[0]],
    lastMessage: 'Hey, how is the project going?',
    lastMessageTime: '10:30 AM',
  },
  {
    id: 'conv-2',
    name: 'Bob Williams',
    participants: [mockUsers[1]],
    lastMessage: 'Did you finish the assignment?',
    lastMessageTime: 'Yesterday',
  },
];

const mockMessages: Message[] = [
  { id: 'msg-1', sender: 'other', text: 'Hello!', time: '10:29 AM' },
  { id: 'msg-2', sender: 'me', text: 'Hi there!', time: '10:30 AM' },
  { id: 'msg-3', sender: 'other', text: 'How are you doing?', time: '10:31 AM' },
  { id: 'msg-4', sender: 'me', text: 'I am doing great, thanks!', time: '10:32 AM' },
];

const mockStudyGroups: StudyGroup[] = [
  { id: 'group-1', name: 'Math Study Group', description: 'Discuss math problems and solutions', members: 15 },
  { id: 'group-2', name: 'Science Club', description: 'Explore science topics together', members: 20 },
];

const MessengerChat = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg: Message = {
        id: `msg-${messages.length + 1}`,
        sender: 'me',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      scrollToBottom();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden">
      {/* Header */}
      <CardHeader className="py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Messenger</h2>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Globe className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-3">
            <Input type="text" placeholder="Search..." className="rounded-full bg-gray-100 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0" />
          </div>
          
          <Tabs defaultValue="chats" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mx-4 my-2">
              <TabsTrigger value="chats">Chats</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
              <TabsTrigger value="calls">Calls</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chats" className="flex-1 mt-0">
              <ScrollArea className="h-full px-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                      selectedConversation?.id === conv.id
                        ? 'bg-blue-100 border-l-4 border-blue-500'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedConversation(conv)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={conv.participants[0].avatar} alt={conv.name} />
                        <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-sm font-medium">{conv.name}</h3>
                        <p className="text-xs text-gray-500">{conv.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="groups" className="flex-1 mt-0">
              <ScrollArea className="h-full px-2">
                {studyGroups.map((group) => (
                  <div key={group.id} className="p-3 rounded-lg mb-2 hover:bg-gray-100 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-green-100 p-2">
                        <Users className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{group.name}</h3>
                        <p className="text-xs text-gray-500">{group.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="calls" className="flex-1 mt-0">
              <div className="p-4 text-center text-gray-500">
                <Phone className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Recent calls will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={selectedConversation.participants[0].avatar} alt={selectedConversation.name} />
                    <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedConversation.name}</h3>
                    <Badge variant="secondary">Online</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="icon">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="w-5 h-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                      <DropdownMenuItem>Block User</DropdownMenuItem>
                      <DropdownMenuItem>Report User</DropdownMenuItem>
                      <DropdownMenuItem>Archive Chat</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={messagesEndRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`rounded-xl px-4 py-2 ${
                          message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-[0.6rem] text-right opacity-70">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    className="rounded-full bg-white border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button variant="ghost" size="icon">
                    <Smile className="w-5 h-5" />
                  </Button>
                  <Button onClick={handleSendMessage}>
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessengerChat;
