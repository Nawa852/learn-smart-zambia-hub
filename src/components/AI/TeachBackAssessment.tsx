
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, MessageSquare, Lightbulb } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TeachBackAssessment = () => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [explanation, setExplanation] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [isAssessing, setIsAssessing] = useState(false);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const { toast } = useToast();

  const topics = [
    'Photosynthesis in Plants',
    'Newton\'s Laws of Motion',
    'Democratic Government Systems',
    'Market Economics Principles',
    'Computer Programming Logic',
    'Mathematical Probability',
    'Climate Change Causes',
    'Human Digestive System'
  ];

  const assessExplanation = async () => {
    if (!explanation.trim() || !selectedTopic) {
      toast({
        title: "Incomplete Submission",
        description: "Please select a topic and provide your explanation.",
        variant: "destructive",
      });
      return;
    }

    setIsAssessing(true);
    try {
      // Simulate AI assessment
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockFeedback = {
        accuracy: Math.floor(Math.random() * 40) + 60, // 60-100%
        clarity: Math.floor(Math.random() * 30) + 70,
        completeness: Math.floor(Math.random() * 35) + 65,
        strengths: [
          "Good understanding of core concepts",
          "Clear explanation structure",
          "Used relevant examples"
        ],
        improvements: [
          "Include more specific details",
          "Explain the process steps more clearly",
          "Connect to real-world applications"
        ],
        suggestions: [
          "Try using analogies to explain complex concepts",
          "Break down the process into smaller steps",
          "Consider the audience's background knowledge"
        ]
      };

      setFeedback(mockFeedback);
      setAssessmentComplete(true);
      
      toast({
        title: "Assessment Complete",
        description: "AI has analyzed your explanation and provided feedback.",
      });
    } catch (error) {
      toast({
        title: "Assessment Failed",
        description: "Unable to assess explanation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAssessing(false);
    }
  };

  const resetAssessment = () => {
    setSelectedTopic('');
    setExplanation('');
    setFeedback(null);
    setAssessmentComplete(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            AI "Teach Back" Assessment
          </CardTitle>
          <p className="text-sm text-gray-600">
            Explain a concept as if you're teaching it to someone else. AI will assess your understanding.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!assessmentComplete ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Choose a Topic</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {topics.map((topic) => (
                    <Button
                      key={topic}
                      variant={selectedTopic === topic ? "default" : "outline"}
                      onClick={() => setSelectedTopic(topic)}
                      className="text-sm h-auto p-3"
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </div>

              {selectedTopic && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Explain "{selectedTopic}" in your own words
                  </label>
                  <Textarea
                    placeholder="Imagine you're teaching this concept to a friend. Explain it clearly, step by step..."
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    className="min-h-48"
                  />
                  <p className="text-xs text-gray-500">
                    Aim for at least 100 words. Include examples, steps, or analogies.
                  </p>
                </div>
              )}

              <Button
                onClick={assessExplanation}
                disabled={isAssessing || !explanation.trim() || !selectedTopic}
                className="w-full"
                size="lg"
              >
                {isAssessing ? 'AI is Assessing...' : 'Submit for Assessment'}
              </Button>
            </>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Assessment Results</h3>
                <p className="text-sm text-gray-600">Topic: {selectedTopic}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {getScoreIcon(feedback.accuracy)}
                      <span className="text-sm font-medium">Accuracy</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(feedback.accuracy)}`}>
                      {feedback.accuracy}%
                    </div>
                    <Progress value={feedback.accuracy} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {getScoreIcon(feedback.clarity)}
                      <span className="text-sm font-medium">Clarity</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(feedback.clarity)}`}>
                      {feedback.clarity}%
                    </div>
                    <Progress value={feedback.clarity} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {getScoreIcon(feedback.completeness)}
                      <span className="text-sm font-medium">Completeness</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(feedback.completeness)}`}>
                      {feedback.completeness}%
                    </div>
                    <Progress value={feedback.completeness} className="mt-2" />
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {feedback.strengths.map((strength: string, index: number) => (
                        <li key={index} className="text-sm text-green-700">
                          • {strength}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      Areas to Improve
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {feedback.improvements.map((improvement: string, index: number) => (
                        <li key={index} className="text-sm text-red-700">
                          • {improvement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-blue-600" />
                      AI Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {feedback.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="text-sm text-blue-700">
                          • {suggestion}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-2">
                <Button onClick={resetAssessment} variant="outline" className="flex-1">
                  Try Another Topic
                </Button>
                <Button className="flex-1">
                  Practice More
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeachBackAssessment;
