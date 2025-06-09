
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, RotateCcw, CheckCircle, X, 
  Shuffle, BookOpen, Zap, Target
} from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  confidence: number;
  reviewCount: number;
  lastReviewed: Date;
}

const AIFlashcardGenerator = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [studyMode, setStudyMode] = useState<'review' | 'learn' | 'quiz'>('review');
  const [sessionProgress, setSessionProgress] = useState(0);

  const mockFlashcards: Flashcard[] = [
    {
      id: '1',
      front: 'What is React useState hook?',
      back: 'useState is a React Hook that lets you add state to functional components. It returns an array with the current state value and a function to update it.',
      difficulty: 'medium',
      topic: 'React Hooks',
      confidence: 75,
      reviewCount: 3,
      lastReviewed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      front: 'Explain the difference between let, const, and var in JavaScript',
      back: 'var has function scope and is hoisted; let has block scope and is not hoisted; const has block scope, is not hoisted, and cannot be reassigned.',
      difficulty: 'hard',
      topic: 'JavaScript Fundamentals',
      confidence: 60,
      reviewCount: 1,
      lastReviewed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      front: 'What is the purpose of useEffect in React?',
      back: 'useEffect lets you perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.',
      difficulty: 'medium',
      topic: 'React Hooks',
      confidence: 85,
      reviewCount: 5,
      lastReviewed: new Date()
    }
  ];

  useEffect(() => {
    setFlashcards(mockFlashcards);
  }, []);

  const generateFlashcards = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const newFlashcards: Flashcard[] = [
        {
          id: Date.now().toString(),
          front: 'What is the virtual DOM in React?',
          back: 'The virtual DOM is a JavaScript representation of the actual DOM. React uses it to optimize rendering by calculating the most efficient way to update the UI.',
          difficulty: 'medium',
          topic: 'React Concepts',
          confidence: 0,
          reviewCount: 0,
          lastReviewed: new Date()
        },
        {
          id: (Date.now() + 1).toString(),
          front: 'Explain JavaScript closures',
          back: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.',
          difficulty: 'hard',
          topic: 'JavaScript Advanced',
          confidence: 0,
          reviewCount: 0,
          lastReviewed: new Date()
        }
      ];
      
      setFlashcards(prev => [...newFlashcards, ...prev]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleConfidenceUpdate = (confidence: 'low' | 'medium' | 'high') => {
    const confidenceValue = confidence === 'low' ? 25 : confidence === 'medium' ? 60 : 90;
    
    setFlashcards(prev => prev.map((card, index) => 
      index === currentCardIndex 
        ? { 
            ...card, 
            confidence: confidenceValue,
            reviewCount: card.reviewCount + 1,
            lastReviewed: new Date()
          }
        : card
    ));
    
    nextCard();
  };

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex(prev => (prev + 1) % flashcards.length);
    setSessionProgress(prev => Math.min(100, prev + (100 / flashcards.length)));
  };

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="w-8 h-8" />
            AI Flashcard Generator
          </CardTitle>
          <p className="text-blue-100">
            AI-generated flashcards from your lessons with adaptive spaced repetition
          </p>
        </CardHeader>
      </Card>

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Study Session</h3>
              <Badge variant="outline">{flashcards.length} cards</Badge>
            </div>
            <Progress value={sessionProgress} className="mb-4" />
            <div className="flex gap-2">
              <Button onClick={shuffleCards} variant="outline" size="sm">
                <Shuffle className="w-4 h-4 mr-2" />
                Shuffle
              </Button>
              <Button onClick={() => setCurrentCardIndex(0)} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Generate New Cards</h3>
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              AI will analyze your recent lessons and create personalized flashcards
            </p>
            <Button 
              onClick={generateFlashcards}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-spin" />
                  Generating cards...
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Generate AI Flashcards
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Flashcard Display */}
      {currentCard && (
        <Card className="mx-auto max-w-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <Badge className={getDifficultyColor(currentCard.difficulty)}>
                {currentCard.difficulty}
              </Badge>
              <Badge variant="outline" className="ml-2">
                {currentCard.topic}
              </Badge>
              <div className="text-sm text-gray-500 mt-2">
                Card {currentCardIndex + 1} of {flashcards.length}
              </div>
            </div>
            
            <div className="min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-medium mb-4">
                  {showAnswer ? 'Answer:' : 'Question:'}
                </div>
                <div className="text-xl leading-relaxed">
                  {showAnswer ? currentCard.back : currentCard.front}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              {!showAnswer ? (
                <Button 
                  onClick={() => setShowAnswer(true)}
                  size="lg"
                  className="px-8"
                >
                  Show Answer
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button 
                    onClick={() => handleConfidenceUpdate('low')}
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Hard
                  </Button>
                  <Button 
                    onClick={() => handleConfidenceUpdate('medium')}
                    variant="outline"
                    className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                  >
                    Medium
                  </Button>
                  <Button 
                    onClick={() => handleConfidenceUpdate('high')}
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Easy
                  </Button>
                </div>
              )}
            </div>
            
            {showAnswer && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">
                  <div>Confidence: {currentCard.confidence}%</div>
                  <div>Reviews: {currentCard.reviewCount}</div>
                  <div>Last reviewed: {currentCard.lastReviewed.toLocaleDateString()}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIFlashcardGenerator;
