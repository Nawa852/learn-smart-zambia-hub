
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, MapPin, BookOpen, Brain, MessageCircle, UserPlus,
  Filter, Clock, Star, Globe, Award, TrendingUp
} from 'lucide-react';

interface Peer {
  id: string;
  name: string;
  role: string;
  location: string;
  interests: string[];
  skills: string[];
  matchScore: number;
  status: 'online' | 'offline' | 'away';
  studyGoals: string[];
  rating: number;
}

const PeerFinder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const peers: Peer[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Computer Science Student',
      location: 'San Francisco, CA',
      interests: ['Machine Learning', 'Web Development', 'Data Science'],
      skills: ['Python', 'React', 'TensorFlow'],
      matchScore: 95,
      status: 'online',
      studyGoals: ['Complete ML Specialization', 'Build Portfolio'],
      rating: 4.8
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      role: 'Physics PhD Candidate',
      location: 'Cambridge, MA',
      interests: ['Quantum Computing', 'Mathematics', 'Research'],
      skills: ['MATLAB', 'LaTeX', 'Python'],
      matchScore: 87,
      status: 'away',
      studyGoals: ['Finish Dissertation', 'Publish Paper'],
      rating: 4.9
    },
    {
      id: '3',
      name: 'Aisha Patel',
      role: 'UX Design Student',
      location: 'New York, NY',
      interests: ['Design Thinking', 'Psychology', 'Technology'],
      skills: ['Figma', 'User Research', 'Prototyping'],
      matchScore: 78,
      status: 'online',
      studyGoals: ['Master Interaction Design', 'Land Internship'],
      rating: 4.7
    }
  ];

  const filters = ['Same Time Zone', 'Similar Goals', 'Common Interests', 'Study Partners', 'Mentors', 'Online Now'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const filteredPeers = peers.filter(peer =>
    peer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    peer.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase())) ||
    peer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <UserPlus className="w-8 h-8 mr-3 text-blue-600" />
            Find Study Peers
          </h1>
          <p className="text-gray-600">Connect with learners who share your interests and goals</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search by name, interests, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {filters.map(filter => (
                <Button
                  key={filter}
                  variant={selectedFilters.includes(filter) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedFilters(prev => 
                      prev.includes(filter) 
                        ? prev.filter(f => f !== filter)
                        : [...prev, filter]
                    );
                  }}
                  className="whitespace-nowrap"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Peer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPeers.map(peer => (
          <Card key={peer.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback>
                      {peer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(peer.status)}`} />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{peer.name}</h3>
                  <p className="text-gray-600 text-sm">{peer.role}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <MapPin className="w-3 h-3" />
                    {peer.location}
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {peer.matchScore}% match
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-1">
                    {peer.interests.slice(0, 3).map(interest => (
                      <Badge key={interest} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {peer.skills.slice(0, 3).map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Study Goals</h4>
                  <div className="space-y-1">
                    {peer.studyGoals.slice(0, 2).map(goal => (
                      <div key={goal} className="flex items-center gap-2 text-xs text-gray-600">
                        <TrendingUp className="w-3 h-3" />
                        {goal}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {peer.rating}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button size="sm">
                      <UserPlus className="w-4 h-4 mr-1" />
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PeerFinder;
