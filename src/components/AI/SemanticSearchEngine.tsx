
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Filter, BookOpen, Video, FileText, 
  Users, Lightbulb, Clock, Star
} from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'course' | 'video' | 'document' | 'discussion' | 'note';
  relevanceScore: number;
  tags: string[];
  author: string;
  timestamp: Date;
  semanticSummary: string;
}

const SemanticSearchEngine = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Introduction to React Hooks',
      content: 'Learn about useState, useEffect, and custom hooks in React...',
      type: 'course',
      relevanceScore: 95,
      tags: ['react', 'hooks', 'javascript'],
      author: 'Dr. Smith',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      semanticSummary: 'Comprehensive guide covering React Hooks fundamentals and practical applications'
    },
    {
      id: '2',
      title: 'State Management Discussion',
      content: 'How do you handle complex state in large React applications?',
      type: 'discussion',
      relevanceScore: 87,
      tags: ['react', 'state-management', 'redux'],
      author: 'Student Forum',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      semanticSummary: 'Community discussion about advanced state management patterns and best practices'
    },
    {
      id: '3',
      title: 'React Hooks Tutorial Video',
      content: 'Step-by-step video tutorial on implementing React hooks...',
      type: 'video',
      relevanceScore: 82,
      tags: ['react', 'tutorial', 'video'],
      author: 'CodeAcademy',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      semanticSummary: 'Visual tutorial demonstrating practical hook implementations with real examples'
    }
  ];

  const searchSuggestions = [
    'React useState patterns',
    'JavaScript async/await',
    'CSS flexbox layouts',
    'Node.js authentication',
    'Database design principles'
  ];

  useEffect(() => {
    setSuggestions(searchSuggestions);
  }, []);

  const performSemanticSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate semantic search processing
    setTimeout(() => {
      // Filter results based on semantic relevance
      const filteredResults = mockResults.filter(result => 
        selectedFilters.length === 0 || selectedFilters.includes(result.type)
      );
      
      setResults(filteredResults);
      setIsSearching(false);
    }, 1500);
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'discussion': return <Users className="w-4 h-4" />;
      case 'note': return <Lightbulb className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Search className="w-8 h-8" />
            Semantic Search Engine
          </CardTitle>
          <p className="text-purple-100">
            AI-powered intelligent search across all your learning content
          </p>
        </CardHeader>
      </Card>

      {/* Search Input */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-3 mb-4">
            <Input
              placeholder="Search for concepts, topics, or questions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && performSemanticSearch()}
              className="text-lg"
            />
            <Button 
              onClick={performSemanticSearch}
              disabled={isSearching || !query.trim()}
              size="lg"
            >
              {isSearching ? (
                <Search className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          {/* Search Suggestions */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Try searching for:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setQuery(suggestion)}
                  className="text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">Filter by type:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['course', 'video', 'document', 'discussion', 'note'].map(filter => (
                <Button
                  key={filter}
                  variant={selectedFilters.includes(filter) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter(filter)}
                  className="capitalize"
                >
                  {getTypeIcon(filter)}
                  <span className="ml-1">{filter}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Search Results</span>
              <Badge variant="outline">{results.length} results</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result) => (
                <div key={result.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(result.type)}
                      <h3 className="font-semibold text-lg">{result.title}</h3>
                      <Badge variant="outline" className="capitalize">
                        {result.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className={`w-4 h-4 ${getRelevanceColor(result.relevanceScore)}`} />
                      <span className={`text-sm font-medium ${getRelevanceColor(result.relevanceScore)}`}>
                        {result.relevanceScore}%
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-2">{result.content}</p>
                  
                  <div className="bg-blue-50 p-3 rounded-lg mb-3">
                    <p className="text-sm text-blue-800">
                      <strong>AI Summary:</strong> {result.semanticSummary}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-wrap gap-1">
                        {result.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{result.author}</span>
                      <Clock className="w-3 h-3" />
                      <span>{result.timestamp.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SemanticSearchEngine;
