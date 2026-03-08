import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Globe, Send, Clock, Copy } from 'lucide-react';
import { toast } from 'sonner';

const DevAPIPlaygroundPage = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [body, setBody] = useState('');
  const [headers, setHeaders] = useState('{"Content-Type": "application/json"}');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    setLoading(true); setResponse(''); setStatus(null);
    const start = Date.now();
    try {
      const opts: RequestInit = { method, headers: JSON.parse(headers || '{}') };
      if (['POST', 'PUT', 'PATCH'].includes(method) && body) opts.body = body;
      const res = await fetch(url, opts);
      setStatus(res.status);
      const text = await res.text();
      try { setResponse(JSON.stringify(JSON.parse(text), null, 2)); } catch { setResponse(text); }
    } catch (e: any) { setResponse(`Error: ${e.message}`); setStatus(0); }
    setTime(Date.now() - start);
    setLoading(false);
  };

  const statusColor = status ? (status < 300 ? 'bg-green-600' : status < 400 ? 'bg-yellow-500' : 'bg-destructive') : 'bg-muted';

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Globe className="w-6 h-6 text-primary" /> API Playground</h1>
        <p className="text-sm text-muted-foreground">Test REST APIs like Postman — right in your browser</p>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex gap-2">
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
              <SelectContent>{['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
            </Select>
            <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://api.example.com/endpoint" className="flex-1 font-mono text-sm" />
            <Button onClick={send} disabled={loading}><Send className="w-4 h-4 mr-2" />{loading ? 'Sending...' : 'Send'}</Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Headers (JSON)</p>
              <Textarea value={headers} onChange={e => setHeaders(e.target.value)} className="font-mono text-xs min-h-[80px]" />
            </div>
            {['POST', 'PUT', 'PATCH'].includes(method) && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Body (JSON)</p>
                <Textarea value={body} onChange={e => setBody(e.target.value)} className="font-mono text-xs min-h-[80px]" placeholder='{"key": "value"}' />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {(response || status !== null) && (
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Response</CardTitle>
            <div className="flex gap-2">
              {status !== null && <Badge className={statusColor}>{status}</Badge>}
              {time !== null && <Badge variant="outline" className="text-xs"><Clock className="w-3 h-3 mr-1" />{time}ms</Badge>}
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { navigator.clipboard.writeText(response); toast.success('Copied'); }}>
                <Copy className="w-3.5 h-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted/50 p-4 rounded text-xs font-mono overflow-auto max-h-[400px] whitespace-pre-wrap">{response}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DevAPIPlaygroundPage;
