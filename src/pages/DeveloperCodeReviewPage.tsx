import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Braces, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export default function DeveloperCodeReviewPage() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('typescript');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    if (!code.trim()) return;
    setLoading(true); setReview('');
    try {
      const { data, error } = await supabase.functions.invoke('ai-code-review', {
        body: { code, language }
      });
      if (error) throw error;
      setReview(data.review || 'No review generated.');
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><Braces className="w-8 h-8 text-primary" /> AI Code Review</h1>
        <p className="text-muted-foreground">Paste your code and get AI-powered feedback on bugs, style, and performance</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Submit Code for Review</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="go">Go</SelectItem>
              <SelectItem value="rust">Rust</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Paste your code here..."
            value={code}
            onChange={e => setCode(e.target.value)}
            className="font-mono min-h-[300px]"
          />
          <Button onClick={handleReview} disabled={loading || !code.trim()}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            Review Code
          </Button>
        </CardContent>
      </Card>

      {review && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" /> Review Results</CardTitle></CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">{review}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
