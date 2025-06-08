
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, Clock, MapPin, Users, Video, Star,
  BookOpen, Brain, Globe, Award, Plus, Filter
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  type: 'workshop' | 'lecture' | 'study_group' | 'hackathon' | 'conference';
  date: Date;
  duration: number;
  attendees: number;
  maxAttendees?: number;
  host: {
    name: string;
    title: string;
  };
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isVirtual: boolean;
  location?: string;
  rating?: number;
}

const EventsLearning = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedType, setSelectedType] = useState<string>('all');

  const events: Event[] = [
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      description: 'A hands-on workshop covering the fundamentals of ML algorithms and practical applications.',
      type: 'workshop',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      duration: 120,
      attendees: 45,
      maxAttendees: 50,
      host: { name: 'Dr. Sarah Chen', title: 'ML Research Scientist' },
      tags: ['Machine Learning', 'Python', 'Beginner Friendly'],
      difficulty: 'Beginner',
      isVirtual: true
    },
    {
      id: '2',
      title: 'Deep Dive into React Hooks',
      description: 'Advanced React patterns and best practices for modern web development.',
      type: 'lecture',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      duration: 90,
      attendees: 32,
      maxAttendees: 40,
      host: { name: 'Michael Rodriguez', title: 'Senior Frontend Developer' },
      tags: ['React', 'JavaScript', 'Web Development'],
      difficulty: 'Advanced',
      isVirtual: true
    },
    {
      id: '3',
      title: 'AI Ethics Study Group',
      description: 'Weekly discussion on ethical implications of AI in society and technology.',
      type: 'study_group',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      duration: 60,
      attendees: 18,
      maxAttendees: 25,
      host: { name: 'Prof. Emily Watson', title: 'Philosophy Professor' },
      tags: ['AI Ethics', 'Philosophy', 'Discussion'],
      difficulty: 'Intermediate',
      isVirtual: false,
      location: 'Philosophy Hall, Room 205'
    },
    {
      id: '4',
      title: 'Weekend Data Science Hackathon',
      description: '48-hour challenge to solve real-world problems using data science techniques.',
      type: 'hackathon',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      duration: 2880, // 48 hours
      attendees: 87,
      maxAttendees: 100,
      host: { name: 'Tech Innovation Lab', title: 'University Incubator' },
      tags: ['Data Science', 'Competition', 'Team Project'],
      difficulty: 'Intermediate',
      isVirtual: true
    }
  ];

  const eventTypes = [
    { value: 'all', label: 'All Events', icon: Calendar },
    { value: 'workshop', label: 'Workshops', icon: BookOpen },
    { value: 'lecture', label: 'Lectures', icon: Brain },
    { value: 'study_group', label: 'Study Groups', icon: Users },
    { value: 'hackathon', label: 'Hackathons', icon: Award },
    { value: 'conference', label: 'Conferences', icon: Globe }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-blue-100 text-blue-800';
      case 'lecture': return 'bg-green-100 text-green-800';
      case 'study_group': return 'bg-purple-100 text-purple-800';
      case 'hackathon': return 'bg-red-100 text-red-800';
      case 'conference': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes >= 1440) {
      const days = Math.floor(minutes / 1440);
      return `${days} day${days > 1 ? 's' : ''}`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  const filteredEvents = selectedType === 'all' 
    ? events 
    : events.filter(event => event.type === selectedType);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-blue-600" />
            Learning Events
          </h1>
          <p className="text-gray-600">Discover workshops, lectures, and study groups in your area</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Event Type Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
            {eventTypes.map(type => {
              const IconComponent = type.icon;
              return (
                <Button
                  key={type.value}
                  variant={selectedType === type.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type.value)}
                  className="whitespace-nowrap"
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {type.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="registered">My Events</TabsTrigger>
          <TabsTrigger value="hosting">Hosting</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map(event => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline" className={getDifficultyColor(event.difficulty)}>
                          {event.difficulty}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDuration(event.duration)}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        {event.isVirtual ? (
                          <>
                            <Video className="w-4 h-4" />
                            Virtual Event
                          </>
                        ) : (
                          <>
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.attendees}{event.maxAttendees && `/${event.maxAttendees}`} attendees
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {event.host.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{event.host.name}</p>
                        <p className="text-xs text-gray-500">{event.host.title}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {event.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t">
                      {event.rating && (
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {event.rating}
                        </div>
                      )}
                      <div className="flex gap-2 ml-auto">
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                        <Button size="sm">
                          {event.maxAttendees && event.attendees >= event.maxAttendees ? 'Join Waitlist' : 'Register'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="registered">
          <Card>
            <CardHeader>
              <CardTitle>Your Registered Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">You haven't registered for any events yet. Browse upcoming events to get started!</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hosting">
          <Card>
            <CardHeader>
              <CardTitle>Events You're Hosting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">You're not hosting any events. Create your first event to share knowledge with the community!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsLearning;
