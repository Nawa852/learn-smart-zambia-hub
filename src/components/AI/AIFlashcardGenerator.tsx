
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Brain, Plus, RotateCcw, Save, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Flashcard {
  id: string;
  front_content: string;
  back_content: string;
  subject: string | null;
  difficulty_level: string | null;
  tags: string[] | null;
  created_at: string;
}

const AIFlashcardGenerator = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCard, setNewCard] = useState({
    front_content: '',
    back_content: '',
    subject: '',
    difficulty_level: 'medium',
    tags: ''
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFlashcards(data || []);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      toast({
        title: "Error",
        description: "Failed to fetch flashcards",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createFlashcard = async () => {
    try {
      if (!user) throw new Error('Must be logged in');
      if (!newCard.front_content || !newCard.back_content) {
        toast({
          title: "Error",
          description: "Please fill in both front and back content",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);
      const { error } = await supabase
        .from('flashcards')
        .insert({
          user_id: user.id,
          front_content: newCard.front_content,
          back_content: newCard.back_content,
          subject: newCard.subject || null,
          difficulty_level: newCard.difficulty_level,
          tags: newCard.tags ? newCard.tags.split(',').map(tag => tag.trim()) : null
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Flashcard created successfully",
      });

      setNewCard({
        front_content: '',
        back_content: '',
        subject: '',
        difficulty_level: 'medium',
        tags: ''
      });

      fetchFlashcards();
    } catch (error) {
      console.error('Error creating flashcard:', error);
      toast({
        title: "Error",
        description: "Failed to create flashcard",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteFlashcard = async (id: string) => {
    try {
      const { error } = await supabase
        .from('flashcards')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Flashcard deleted successfully",
      });

      fetchFlashcards();
      if (currentCard >= flashcards.length - 1) {
        setCurrentCard(Math.max(0, flashcards.length - 2));
      }
    } catch (error) {
      console.error('Error deleting flashcard:', error);
      toast({
        title: "Error",
        description: "Failed to delete flashcard",
        variant: "destructive",
      });
    }
  };

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-600" />
              AI Flashcard Generator
            </CardTitle>
            <CardDescription>
              Create and study with intelligent flashcards
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Flashcard Study Area */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Study Mode</h2>
            {flashcards.length > 0 ? (
              <div className="space-y-4">
                <Card className="min-h-80">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="text-sm text-gray-500">
                        Card {currentCard + 1} of {flashcards.length}
                      </div>
                      <div 
                        className="cursor-pointer min-h-40 flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg"
                        onClick={() => setIsFlipped(!isFlipped)}
                      >
                        <div className="text-center">
                          <p className="text-lg font-medium mb-2">
                            {isFlipped ? 'Answer:' : 'Question:'}
                          </p>
                          <p className="text-gray-800">
                            {isFlipped 
                              ? flashcards[currentCard].back_content 
                              : flashcards[currentCard].front_content
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {flashcards[currentCard].subject && (
                          <Badge variant="secondary">
                            {flashcards[currentCard].subject}
                          </Badge>
                        )}
                        {flashcards[currentCard].difficulty_level && (
                          <Badge variant="outline">
                            {flashcards[currentCard].difficulty_level}
                          </Badge>
                        )}
                        {flashcards[currentCard].tags?.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex gap-2 justify-center">
                  <Button onClick={prevCard} variant="outline">
                    Previous
                  </Button>
                  <Button onClick={() => setIsFlipped(!isFlipped)} variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Flip
                  </Button>
                  <Button onClick={nextCard} variant="outline">
                    Next
                  </Button>
                  <Button 
                    onClick={() => deleteFlashcard(flashcards[currentCard].id)}
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No flashcards yet</h3>
                  <p className="text-gray-600">Create your first flashcard to start studying</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Create New Flashcard */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Create New Flashcard</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Front (Question)</label>
                  <Textarea
                    placeholder="Enter the question or prompt..."
                    value={newCard.front_content}
                    onChange={(e) => setNewCard({...newCard, front_content: e.target.value})}
                    className="min-h-24"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Back (Answer)</label>
                  <Textarea
                    placeholder="Enter the answer or explanation..."
                    value={newCard.back_content}
                    onChange={(e) => setNewCard({...newCard, back_content: e.target.value})}
                    className="min-h-24"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    placeholder="e.g., Mathematics, Physics..."
                    value={newCard.subject}
                    onChange={(e) => setNewCard({...newCard, subject: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty</label>
                  <Select 
                    value={newCard.difficulty_level} 
                    onValueChange={(value) => setNewCard({...newCard, difficulty_level: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <Input
                    placeholder="e.g., algebra, equations, chapter-5..."
                    value={newCard.tags}
                    onChange={(e) => setNewCard({...newCard, tags: e.target.value})}
                  />
                </div>
                
                <Button onClick={createFlashcard} disabled={loading} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  {loading ? 'Creating...' : 'Create Flashcard'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFlashcardGenerator;
