import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { PenTool, Calendar, Sparkles, Save, BookOpen, TrendingUp, Heart } from 'lucide-react';

const JournalingPage = () => {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('');

  const moods = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😌', label: 'Calm', value: 'calm' },
    { emoji: '🤔', label: 'Thoughtful', value: 'thoughtful' },
    { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
    { emoji: '🎯', label: 'Focused', value: 'focused' },
  ];

  const recentEntries = [
    { date: '2024-01-20', title: 'Great progress in Math!', mood: 'happy', preview: 'Today I finally understood quadratic equations...' },
    { date: '2024-01-19', title: 'Physics challenges', mood: 'thoughtful', preview: 'Struggling with electricity concepts but...' },
    { date: '2024-01-18', title: 'Exam preparation', mood: 'focused', preview: 'Started my ECZ exam prep schedule today...' },
  ];

  const prompts = [
    "What did you learn today that surprised you?",
    "What's one thing you want to improve?",
    "How did you overcome a challenge today?",
    "What are you grateful for in your studies?",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <PenTool className="h-8 w-8 text-primary" />
            Learning Journal
          </h1>
          <p className="text-muted-foreground">Reflect on your learning journey</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Entry
              </CardTitle>
              <CardDescription>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">How are you feeling?</p>
                <div className="flex gap-2 flex-wrap">
                  {moods.map(m => (
                    <Button
                      key={m.value}
                      variant={mood === m.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMood(m.value)}
                    >
                      <span className="mr-1">{m.emoji}</span> {m.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Textarea
                  placeholder="Write about your learning today..."
                  className="min-h-[200px]"
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline">
                  <Sparkles className="h-4 w-4 mr-2" /> AI Suggestions
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" /> Save Entry
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEntries.map((entry, i) => (
                  <div key={i} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{entry.title}</h3>
                      <div className="flex items-center gap-2">
                        <span>{moods.find(m => m.value === entry.mood)?.emoji}</span>
                        <span className="text-sm text-muted-foreground">{entry.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.preview}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Writing Prompts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {prompts.map((prompt, i) => (
                  <div 
                    key={i} 
                    className="p-3 bg-muted/50 rounded-lg text-sm cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => setEntry(prompt + '\n\n')}
                  >
                    {prompt}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <BookOpen className="h-10 w-10 text-primary mx-auto mb-2" />
                <h3 className="font-bold text-lg">12 Entries</h3>
                <p className="text-sm text-muted-foreground">This month</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <TrendingUp className="h-6 w-6 text-green-500 mx-auto" />
                  <p className="text-sm font-medium">5 Day Streak</p>
                </div>
                <div className="text-center">
                  <Heart className="h-6 w-6 text-red-500 mx-auto" />
                  <p className="text-sm font-medium">Mostly Happy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JournalingPage;
