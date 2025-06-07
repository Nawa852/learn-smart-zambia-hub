
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, Pause, SkipForward, SkipBack, Search, 
  Bookmark, Clock, Eye, ThumbsUp 
} from 'lucide-react';

interface VideoContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: number;
  likes: number;
  thumbnailUrl: string;
  videoUrl: string;
  concepts: string[];
  timestamps: { time: string; concept: string; }[];
  playlist: string;
}

const VideoLearning = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videos: VideoContent[] = [
    {
      id: '1',
      title: 'Introduction to Calculus - Derivatives Made Simple',
      description: 'Learn the fundamentals of derivatives with real-world examples',
      duration: '15:30',
      views: 125000,
      likes: 4500,
      thumbnailUrl: '/video-thumb-1.jpg',
      videoUrl: '/sample-video.mp4',
      concepts: ['Derivatives', 'Limits', 'Chain Rule'],
      timestamps: [
        { time: '0:00', concept: 'Introduction' },
        { time: '2:15', concept: 'What are Derivatives?' },
        { time: '7:30', concept: 'Basic Rules' },
        { time: '12:00', concept: 'Practice Problems' }
      ],
      playlist: 'Calculus Fundamentals'
    },
    {
      id: '2',
      title: 'Physics: Understanding Newton\'s Laws',
      description: 'A comprehensive guide to Newton\'s three laws of motion',
      duration: '22:45',
      views: 89000,
      likes: 3200,
      thumbnailUrl: '/video-thumb-2.jpg',
      videoUrl: '/sample-video-2.mp4',
      concepts: ['Force', 'Acceleration', 'Momentum'],
      timestamps: [
        { time: '0:00', concept: 'Introduction to Forces' },
        { time: '5:20', concept: 'First Law - Inertia' },
        { time: '12:10', concept: 'Second Law - F=ma' },
        { time: '18:30', concept: 'Third Law - Action-Reaction' }
      ],
      playlist: 'Physics Basics'
    }
  ];

  const searchConcepts = (query: string) => {
    return videos.filter(video => 
      video.concepts.some(concept => 
        concept.toLowerCase().includes(query.toLowerCase())
      ) ||
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const jumpToTimestamp = (time: string) => {
    const [minutes, seconds] = time.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    setCurrentTime(totalSeconds);
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  if (selectedVideo) {
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          onClick={() => setSelectedVideo(null)}
          className="mb-4"
        >
          ← Back to Videos
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-black rounded-t-lg relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mx-auto mb-4" />
                      <p>Video Player Placeholder</p>
                      <p className="text-sm opacity-75">{selectedVideo.title}</p>
                    </div>
                  </div>
                  
                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <div className="flex items-center gap-4 text-white">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <SkipForward className="w-4 h-4" />
                      </Button>
                      <Progress value={30} className="flex-1 h-1" />
                      <span className="text-sm">5:30 / {selectedVideo.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h1 className="text-xl font-bold mb-2">{selectedVideo.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {formatViews(selectedVideo.views)} views
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {formatViews(selectedVideo.likes)} likes
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedVideo.duration}
                    </span>
                  </div>
                  <p className="text-gray-700">{selectedVideo.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedVideo.concepts.map((concept) => (
                      <Badge key={concept} variant="outline">{concept}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Concept Navigation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Navigate by Concept</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedVideo.timestamps.map((timestamp, index) => (
                    <button
                      key={index}
                      onClick={() => jumpToTimestamp(timestamp.time)}
                      className="w-full text-left p-2 rounded hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium">{timestamp.concept}</span>
                        <span className="text-xs text-gray-500">{timestamp.time}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* AI Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-1">Key Points</h4>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Derivatives measure rate of change</li>
                      <li>• Power rule: d/dx(x^n) = nx^(n-1)</li>
                      <li>• Chain rule for composite functions</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-1">Practice Suggestion</h4>
                    <p className="text-green-700">Try solving 5-10 basic derivative problems to reinforce these concepts.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Bookmarks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  My Bookmarks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Bookmark Current Time
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Enhanced Video Learning</CardTitle>
          <div className="flex gap-2">
            <Input
              placeholder="Search by concept or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button>
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(searchQuery ? searchConcepts(searchQuery) : videos).map((video) => (
              <Card key={video.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-12 h-12 text-gray-600" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>{formatViews(video.views)} views</span>
                      <span>{formatViews(video.likes)} likes</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {video.concepts.slice(0, 3).map((concept) => (
                        <Badge key={concept} variant="outline" className="text-xs">
                          {concept}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={() => setSelectedVideo(video)}
                      className="w-full"
                    >
                      Watch Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoLearning;
