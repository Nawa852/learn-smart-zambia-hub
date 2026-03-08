import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cpu, Zap, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export default function DeveloperChallengesPage() {
  const [difficulty, setDifficulty] = useState('medium');
  const [topic, setTopic] = useState('algorithms');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  const generateChallenge = async () => {
    setLoading(true);
    setChallenge(''); setFeedback(''); setSolution('');
    try {
      const { data, error } = await supabase.functions.invoke('coding-challenge-generator', {
        body: { action: 'generate', difficulty, topic }
      });
      if (error) throw error;
      setChallenge(data.challenge || 'Failed to generate challenge.');
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
    setLoading(false);
  };

  const evaluateSolution = async () => {
    if (!solution.trim()) return;
    setEvaluating(true); setFeedback('');
    try {
      const { data, error } = await supabase.functions.invoke('coding-challenge-generator', {
        body: { action: 'evaluate', challenge, solution }
      });
      if (error) throw error;
      setFeedback(data.feedback || 'No feedback.');
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
    setEvaluating(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><Cpu className="w-8 h-8 text-primary" /> Coding Challenges</h1>
        <p className="text-muted-foreground">AI-generated coding problems to sharpen your skills</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Generate a Challenge</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="algorithms">Algorithms</SelectItem>
                <SelectItem value="data-structures">Data Structures</SelectItem>
                <SelectItem value="api-design">API Design</SelectItem>
                <SelectItem value="databases">Databases</SelectItem>
                <SelectItem value="system-design">System Design</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={generateChallenge} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
              Generate
            </Button>
          </div>

          {challenge && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={difficulty === 'hard' ? 'destructive' : difficulty === 'medium' ? 'default' : 'secondary'}>{difficulty}</Badge>
                <Badge variant="outline">{topic}</Badge>
              </div>
              <div className="whitespace-pre-wrap font-mono text-sm">{challenge}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {challenge && (
        <Card>
          <CardHeader><CardTitle>Your Solution</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your solution here..."
              value={solution}
              onChange={e => setSolution(e.target.value)}
              className="font-mono min-h-[200px]"
            />
            <Button onClick={evaluateSolution} disabled={evaluating || !solution.trim()}>
              {evaluating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Cpu className="w-4 h-4 mr-2" />}
              Evaluate Solution
            </Button>
            {feedback && (
              <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap text-sm">{feedback}</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
