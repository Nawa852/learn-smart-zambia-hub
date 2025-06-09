
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, Brain, Lightbulb, MessageSquare, 
  Save, RefreshCw, Calendar, Target
} from 'lucide-react';

interface JournalEntry {
  id: string;
  date: Date;
  content: string;
  learningGoals: string[];
  reflections: string[];
  claudeInsights: string[];
  mood: 'excellent' | 'good' | 'neutral' | 'challenging';
  learningProgress: number;
}

interface ClaudePrompt {
  id: string;
  type: 'reflection' | 'goal-setting' | 'insight' | 'motivation';
  prompt: string;
}

const ClaudeJournalingAssistant = () => {
  const [currentEntry, setCurrentEntry] = useState('');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<'excellent' | 'good' | 'neutral' | 'challenging'>('good');
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);
  const [claudePrompts, setClaudePrompts] = useState<ClaudePrompt[]>([]);

  const mockEntries: JournalEntry[] = [
    {
      id: '1',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      content: 'Today I learned about React hooks. The concept of useEffect is still confusing to me.',
      learningGoals: ['Master React Hooks', 'Build a todo app'],
      reflections: ['Need more practice with useEffect', 'Examples help me understand better'],
      claudeInsights: [
        'Consider breaking down useEffect into smaller, focused examples',
        'Try building a simple counter app to practice useEffect patterns',
        'Your learning pace suggests you prefer hands-on practice over theory'
      ],
      mood: 'challenging',
      learningProgress: 65
    }
  ];

  const mockPrompts: ClaudePrompt[] = [
    {
      id: '1',
      type: 'reflection',
      prompt: 'What was the most challenging concept you encountered today, and what made it difficult?'
    },
    {
      id: '2',
      type: 'goal-setting',
      prompt: 'Based on your recent learning patterns, what would be a realistic goal for tomorrow?'
    },
    {
      id: '3',
      type: 'insight',
      prompt: 'How does today\'s learning connect to your overall learning journey?'
    },
    {
      id: '4',
      type: 'motivation',
      prompt: 'What small win can you celebrate from your learning session today?'
    }
  ];

  useEffect(() => {
    setJournalEntries(mockEntries);
    setClaudePrompts(mockPrompts);
  }, []);

  const generateClaudeInsights = async () => {
    setIsGeneratingInsight(true);
    
    // Simulate Claude AI processing
    setTimeout(() => {
      const insights = [
        'Your reflection shows strong self-awareness about your learning challenges',
        'Consider using visual aids or diagrams to better understand complex concepts',
        'Your consistent journaling indicates high motivation - keep building on this strength',
        'Try explaining concepts in your own words to deepen understanding'
      ];
      
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date(),
        content: currentEntry,
        learningGoals: ['Continue React learning', 'Practice daily'],
        reflections: [currentEntry.slice(0, 100) + '...'],
        claudeInsights: insights.slice(0, Math.floor(Math.random() * 3) + 2),
        mood: selectedMood,
        learningProgress: Math.floor(Math.random() * 30) + 60
      };
      
      setJournalEntries(prev => [newEntry, ...prev]);
      setCurrentEntry('');
      setIsGeneratingInsight(false);
    }, 2000);
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'neutral': return 'bg-yellow-100 text-yellow-800';
      case 'challenging': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPromptIcon = (type: string) => {
    switch (type) {
      case 'reflection': return <BookOpen className="w-4 h-4" />;
      case 'goal-setting': return <Target className="w-4 h-4" />;
      case 'insight': return <Lightbulb className="w-4 h-4" />;
      case 'motivation': return <MessageSquare className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <BookOpen className="w-8 h-8" />
            Claude Reflective Journaling
          </CardTitle>
          <p className="text-indigo-100">
            AI-powered reflective learning companion for deeper understanding
          </p>
        </CardHeader>
      </Card>

      {/* Writing Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Today's Learning Reflection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Reflect on your learning experience today. What did you learn? What challenges did you face? How do you feel about your progress?"
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            rows={6}
            className="resize-none"
          />
          
          <div>
            <label className="block text-sm font-medium mb-2">How was your learning today?</label>
            <div className="flex gap-2">
              {(['excellent', 'good', 'neutral', 'challenging'] as const).map(mood => (
                <Button
                  key={mood}
                  variant={selectedMood === mood ? "default" : "outline"}
                  onClick={() => setSelectedMood(mood)}
                  className="capitalize"
                >
                  {mood}
                </Button>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={generateClaudeInsights}
            disabled={!currentEntry.trim() || isGeneratingInsight}
            className="w-full"
            size="lg"
          >
            {isGeneratingInsight ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Claude is analyzing your reflection...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save & Get AI Insights
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Claude Prompts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
            Claude's Reflective Prompts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {claudePrompts.map((prompt) => (
              <div key={prompt.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                   onClick={() => setCurrentEntry(prompt.prompt)}>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-full">
                    {getPromptIcon(prompt.type)}
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2 capitalize">
                      {prompt.type.replace('-', ' ')}
                    </Badge>
                    <p className="text-sm text-gray-700">{prompt.prompt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Journal History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Learning Journal History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <div key={entry.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {entry.date.toLocaleDateString()}
                    </span>
                    <Badge className={getMoodColor(entry.mood)}>
                      {entry.mood}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">
                    Progress: {entry.learningProgress}%
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3">{entry.content}</p>
                
                {entry.claudeInsights.length > 0 && (
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Claude's Insights</h4>
                    <ul className="space-y-1">
                      {entry.claudeInsights.map((insight, index) => (
                        <li key={index} className="text-sm text-purple-700 flex items-start gap-2">
                          <Brain className="w-3 h-3 mt-1 flex-shrink-0" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClaudeJournalingAssistant;
