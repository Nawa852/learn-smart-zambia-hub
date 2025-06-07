
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, BookOpen, TrendingUp, Clock, Eye, MessageCircle,
  ThumbsUp, Share2, Bookmark, Filter, RefreshCw, Globe
} from 'lucide-react';

interface KnowledgeItem {
  id: string;
  title: string;
  summary: string;
  source: 'research' | 'blog' | 'video' | 'news';
  url: string;
  author: string;
  publishDate: Date;
  readTime: number;
  tags: string[];
  relevanceScore: number;
  interactions: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  aiInsights?: string;
}

const KnowledgeFeed = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const knowledgeItems: KnowledgeItem[] = [
    {
      id: '1',
      title: 'Breakthrough in Quantum Machine Learning Algorithms',
      summary: 'Researchers at MIT have developed a new quantum algorithm that could accelerate machine learning tasks by up to 100x. The algorithm leverages quantum superposition to process multiple data states simultaneously.',
      source: 'research',
      url: '#',
      author: 'Dr. Elena Vasquez et al.',
      publishDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      readTime: 8,
      tags: ['Quantum Computing', 'Machine Learning', 'Algorithm', 'MIT'],
      relevanceScore: 95,
      interactions: { views: 1247, likes: 89, comments: 23, shares: 15 },
      aiInsights: 'This breakthrough could revolutionize how we approach ML optimization problems, especially in areas where classical computers struggle with computational complexity.'
    },
    {
      id: '2',
      title: 'The Future of Remote Learning: AI-Powered Personalization',
      summary: 'Educational technology companies are integrating advanced AI to create truly personalized learning experiences. Students report 40% better engagement with AI-tutored sessions.',
      source: 'blog',
      url: '#',
      author: 'Sarah Chen',
      publishDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
      readTime: 5,
      tags: ['EdTech', 'AI', 'Personalization', 'Remote Learning'],
      relevanceScore: 88,
      interactions: { views: 892, likes: 67, comments: 31, shares: 22 }
    },
    {
      id: '3',
      title: 'Understanding Neural Networks: A Visual Guide',
      summary: 'An interactive video series that breaks down complex neural network concepts using animations and real-world examples. Perfect for visual learners.',
      source: 'video',
      url: '#',
      author: 'TechEducate Channel',
      publishDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      readTime: 12,
      tags: ['Neural Networks', 'Visual Learning', 'Beginner Friendly'],
      relevanceScore: 82,
      interactions: { views: 2341, likes: 156, comments: 87, shares: 43 },
      aiInsights: 'Excellent resource for students struggling with abstract NN concepts. The visual approach aligns well with modern learning preferences.'
    },
    {
      id: '4',
      title: 'New Study: Collaborative Learning Improves Retention by 60%',
      summary: 'University research shows that students who engage in peer-to-peer learning retain information significantly longer than those using traditional study methods.',
      source: 'research',
      url: '#',
      author: 'Journal of Educational Psychology',
      publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      readTime: 6,
      tags: ['Learning Science', 'Collaboration', 'Memory', 'Study Methods'],
      relevanceScore: 91,
      interactions: { views: 1567, likes: 103, comments: 45, shares: 28 }
    }
  ];

  const filters = ['all', 'research', 'blog', 'video', 'news'];

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'research': return BookOpen;
      case 'blog': return Globe;
      case 'video': return Brain;
      case 'news': return TrendingUp;
      default: return BookOpen;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'research': return 'bg-blue-100 text-blue-800';
      case 'blog': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'news': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredItems = selectedFilter === 'all' 
    ? knowledgeItems 
    : knowledgeItems.filter(item => item.source === selectedFilter);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Brain className="w-8 h-8 mr-3 text-blue-600" />
            Knowledge Feed
          </h1>
          <p className="text-gray-600">AI-curated insights tailored to your learning journey</p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Feed
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex gap-2 overflow-x-auto">
              {filters.map(filter => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className="whitespace-nowrap capitalize"
                >
                  {filter === 'all' ? 'All Sources' : filter}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed Items */}
      <div className="space-y-6">
        {filteredItems.map(item => {
          const SourceIcon = getSourceIcon(item.source);
          
          return (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getSourceColor(item.source)}`}>
                    <SourceIcon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          <span>by {item.author}</span>
                          <span>{formatTimeAgo(item.publishDate)}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.readTime} min read
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {item.relevanceScore}% relevant
                          </Badge>
                        </div>
                      </div>
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
                    </div>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed">{item.summary}</p>
                    
                    {/* AI Insights */}
                    {item.aiInsights && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                        <div className="flex items-center gap-2 mb-1">
                          <Brain className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">AI Insight</span>
                        </div>
                        <p className="text-sm text-blue-700">{item.aiInsights}</p>
                      </div>
                    )}
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Interactions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {item.interactions.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {item.interactions.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {item.interactions.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-4 h-4" />
                          {item.interactions.shares}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Discuss
                        </Button>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Articles
        </Button>
      </div>
    </div>
  );
};

export default KnowledgeFeed;
