
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Bot, Users, BarChart3, Award, 
  MessageSquare, Calendar, Target, Search 
} from 'lucide-react';

const quickActions = [
  { 
    title: 'AI Study Helper', 
    description: 'Get instant help with your studies',
    icon: Bot, 
    path: '/ai-study-helper',
    color: 'from-blue-500 to-purple-600'
  },
  { 
    title: 'Browse Courses', 
    description: 'Explore available courses',
    icon: BookOpen, 
    path: '/courses',
    color: 'from-green-500 to-blue-500'
  },
  { 
    title: 'Study Groups', 
    description: 'Join collaborative learning',
    icon: Users, 
    path: '/study-groups',
    color: 'from-orange-500 to-red-500'
  },
  { 
    title: 'Analytics', 
    description: 'Track your progress',
    icon: BarChart3, 
    path: '/learning-analytics',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    title: 'Achievements', 
    description: 'View your accomplishments',
    icon: Award, 
    path: '/achievements',
    color: 'from-yellow-500 to-orange-500'
  },
  { 
    title: 'Messenger', 
    description: 'Chat with peers',
    icon: MessageSquare, 
    path: '/messenger',
    color: 'from-teal-500 to-green-500'
  },
];

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/50">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:scale-105 transition-all duration-200"
              onClick={() => navigate(action.path)}
            >
              <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color} text-white shadow-lg`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
