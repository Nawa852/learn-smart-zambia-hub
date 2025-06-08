
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MapPin, Users, Calendar, Brain, BookOpen, Coffee,
  Video, MessageCircle, Award, TrendingUp, Clock, Star
} from 'lucide-react';

interface CampusLocation {
  id: string;
  name: string;
  type: 'study_group' | 'event' | 'club' | 'cafe' | 'library' | 'lab';
  description: string;
  activeUsers: number;
  upcomingEvents: number;
  rating: number;
}

const CampusMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const locations: CampusLocation[] = [
    {
      id: '1',
      name: 'AI Study Hub',
      type: 'study_group',
      description: 'Collaborative space for AI and ML enthusiasts',
      activeUsers: 24,
      upcomingEvents: 3,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Virtual Coffee Lounge',
      type: 'cafe',
      description: 'Casual discussions and networking',
      activeUsers: 18,
      upcomingEvents: 1,
      rating: 4.6
    },
    {
      id: '3',
      name: 'Data Science Lab',
      type: 'lab',
      description: 'Hands-on data analysis and visualization',
      activeUsers: 15,
      upcomingEvents: 2,
      rating: 4.9
    },
    {
      id: '4',
      name: 'Language Exchange Club',
      type: 'club',
      description: 'Practice languages with native speakers',
      activeUsers: 32,
      upcomingEvents: 5,
      rating: 4.7
    }
  ];

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'study_group': return Users;
      case 'event': return Calendar;
      case 'club': return Star;
      case 'cafe': return Coffee;
      case 'library': return BookOpen;
      case 'lab': return Brain;
      default: return MapPin;
    }
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'study_group': return 'bg-blue-100 text-blue-800';
      case 'event': return 'bg-green-100 text-green-800';
      case 'club': return 'bg-purple-100 text-purple-800';
      case 'cafe': return 'bg-orange-100 text-orange-800';
      case 'library': return 'bg-gray-100 text-gray-800';
      case 'lab': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <MapPin className="w-8 h-8 mr-3 text-blue-600" />
            Virtual Campus
          </h1>
          <p className="text-gray-600">Explore learning spaces and connect with your community</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </Button>
          <Button 
            variant={viewMode === 'map' ? 'default' : 'outline'}
            onClick={() => setViewMode('map')}
          >
            Map View
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map(location => {
          const LocationIcon = getLocationIcon(location.type);
          
          return (
            <Card 
              key={location.id} 
              className={`hover:shadow-lg transition-shadow cursor-pointer ${
                selectedLocation === location.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedLocation(location.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${getLocationColor(location.type)}`}>
                    <LocationIcon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {location.rating}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{location.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{location.description}</p>
                
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1 text-green-600">
                    <Users className="w-4 h-4" />
                    {location.activeUsers} active
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <Calendar className="w-4 h-4" />
                    {location.upcomingEvents} events
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Join
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CampusMap;
