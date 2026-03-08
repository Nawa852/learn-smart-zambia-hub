import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, Loader2, Search, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export default function EntrepreneurFundingPage() {
  const [sector, setSector] = useState('technology');
  const [stage, setStage] = useState('ideation');
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);

  const searchFunding = async () => {
    setLoading(true); setResults('');
    try {
      const { data, error } = await supabase.functions.invoke('funding-opportunities', {
        body: { sector, stage }
      });
      if (error) throw error;
      setResults(data.opportunities || 'No results found.');
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><Briefcase className="w-8 h-8 text-primary" /> Funding Opportunities</h1>
        <p className="text-muted-foreground">Discover Zambian grants, incubators, angel investors, and competitions</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Find Funding</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Select value={sector} onValueChange={setSector}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="agriculture">Agriculture</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="energy">Energy</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stage} onValueChange={setStage}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ideation">Ideation</SelectItem>
                <SelectItem value="mvp">MVP</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
                <SelectItem value="scaling">Scaling</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={searchFunding} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" /> Funding Results</CardTitle></CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">{results}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
