
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Users, Search, Plus, MessageCircle, Calendar, Globe,
  Lock, Crown, Star, TrendingUp, BookOpen, Brain, Clock
} from 'lucide-react';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  maxMembers: number;
  privacy: 'public' | 'private';
  activity: 'high' | 'medium' | 'low';
  lastActive: string;
  moderators: string[];
  tags: string[];
  recentTopics: string[];
}

const StudyGroups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const groups: StudyGroup[] = [
    {
      id: '1',
      name: 'AI & Machine Learning Hub',
      description: 'Collaborative space for ML enthusiasts to share projects, discuss algorithms, and solve problems together.',
      category: 'Computer Science',
      memberCount: 1247,
      maxMembers: 2000,
      privacy: 'public',
      activity: 'high',
      lastActive: '5 min ago',
      moderators: ['Dr. Sarah Johnson', 'Alex Chen'],
      tags: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning'],
      recentTopics: ['Neural Network Architecture', 'Data Preprocessing', 'Model Optimization']
    },
    {
      id: '2',
      name: 'Calculus Study Circle',
      description: 'Get help with calculus problems, share study techniques, and prepare for exams together.',
      category: 'Mathematics',
      memberCount: 892,
      maxMembers: 1000,
      privacy: 'public',
      activity: 'high',
      lastActive: '12 min ago',
      moderators: ['Prof. Maria Rodriguez'],
      tags: ['Derivatives', 'Integrals', 'Limits', 'Applications'],
      recentTopics: ['Chain Rule Problems', 'Integration by Parts', 'Exam Prep']
    },
    {
      id: '3',
      name: 'Zambian CS Students',
      description: 'Local community for computer science students in Zambia to network and collaborate.',
      category: 'Regional',
      memberCount: 156,
      maxMembers: 500,
      privacy: 'public',
      activity: 'medium',
      lastActive: '2 hours ago',
      moderators: ['Chanda Mwanza'],
      tags: ['Networking', 'Local Events', 'Career Advice'],
      recentTopics: ['Tech Meetups in Lusaka', 'Internship Opportunities']
    },
    {
      id: '4',
      name: 'Advanced Physics Research',
      description: 'Graduate-level discussions on quantum mechanics, relativity, and cutting-edge physics research.',
      category: 'Physics',
      memberCount: 284,
      maxMembers: 300,
      privacy: 'private',
      activity: 'medium',
      lastActive: '1 day ago',
      moderators: ['Dr. Michael Thompson', 'Dr. Lisa Wang'],
      tags: ['Quantum Mechanics', 'Research Papers', 'Graduate Level'],
      recentTopics: ['Quantum Entanglement', 'Recent Publications']
    }
  ];

  const categories = ['all', 'Computer Science', 'Mathematics', 'Physics', 'Biology', 'Regional'];

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Study Groups</h1>
          <p className="text-gray-600">Join communities, collaborate with peers, and learn together</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Group
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search groups, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category === 'all' ? 'All Categories' : category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Groups */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-500" />
          Featured Groups
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.slice(0, 3).map(group => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    {group.privacy === 'private' && <Lock className="w-4 h-4 text-gray-500" />}
                  </div>
                  <Badge className={getActivityColor(group.activity)}>
                    {group.activity} activity
                  </Badge>
                </div>
                <CardTitle className="text-lg">{group.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Members</span>
                    <span className="font-medium">{group.memberCount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Last Active</span>
                    <span className="font-medium">{group.lastActive}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {group.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {group.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{group.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="pt-2">
                    <Button className="w-full" size="sm">
                      Join Group
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Groups */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Groups</h2>
        <div className="space-y-4">
          {filteredGroups.map(group => (
            <Card key={group.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{group.name}</h3>
                          {group.privacy === 'private' && <Lock className="w-4 h-4 text-gray-500" />}
                          <Badge className={getActivityColor(group.activity)}>
                            {group.activity}
                          </Badge>
                        </div>
                        <Badge variant="outline" className="mt-1">
                          {group.category}
                        </Badge>
                      </div>
                      <Button>Join Group</Button>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{group.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-500">Members: </span>
                        <span className="font-medium">{group.memberCount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Active: </span>
                        <span className="font-medium">{group.lastActive}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500">Moderators: </span>
                        <span className="font-medium">{group.moderators.join(', ')}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-500">Tags: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {group.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-500">Recent Topics: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {group.recentTopics.map(topic => (
                            <Badge key={topic} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyGroups;
