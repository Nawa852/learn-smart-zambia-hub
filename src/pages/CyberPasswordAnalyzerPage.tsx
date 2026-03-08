import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Eye, EyeOff, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

function analyzePassword(pw: string) {
  const checks = [
    { label: 'At least 8 characters', pass: pw.length >= 8 },
    { label: 'At least 12 characters', pass: pw.length >= 12 },
    { label: 'Contains uppercase', pass: /[A-Z]/.test(pw) },
    { label: 'Contains lowercase', pass: /[a-z]/.test(pw) },
    { label: 'Contains number', pass: /[0-9]/.test(pw) },
    { label: 'Contains special char', pass: /[^A-Za-z0-9]/.test(pw) },
    { label: 'No common patterns', pass: !/^(password|123456|qwerty|admin|letmein)/i.test(pw) },
    { label: 'No repeated characters', pass: !/(.)\1{2,}/.test(pw) },
  ];
  const score = checks.filter(c => c.pass).length;
  const strength = score <= 2 ? 'Weak' : score <= 4 ? 'Fair' : score <= 6 ? 'Good' : 'Strong';
  const color = score <= 2 ? 'text-destructive' : score <= 4 ? 'text-yellow-500' : score <= 6 ? 'text-blue-500' : 'text-green-500';
  const entropy = Math.round(pw.length * Math.log2(
    ((/[a-z]/.test(pw) ? 26 : 0) + (/[A-Z]/.test(pw) ? 26 : 0) + (/[0-9]/.test(pw) ? 10 : 0) + (/[^A-Za-z0-9]/.test(pw) ? 32 : 0)) || 1
  ));
  const crackTime = entropy < 40 ? 'Seconds' : entropy < 60 ? 'Hours' : entropy < 80 ? 'Years' : 'Centuries';
  return { checks, score, strength, color, entropy, crackTime };
}

const CyberPasswordAnalyzerPage = () => {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const analysis = analyzePassword(password);

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Shield className="w-6 h-6 text-primary" /> Password Analyzer</h1>
        <p className="text-sm text-muted-foreground">Test password strength in real-time</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="relative">
            <Input type={show ? 'text' : 'password'} placeholder="Enter a password to test..." value={password}
              onChange={e => setPassword(e.target.value)} className="pr-10 text-lg font-mono" />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => setShow(!show)}>{show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</Button>
          </div>

          {password && (
            <>
              <div className="text-center">
                <p className={`text-3xl font-bold ${analysis.color}`}>{analysis.strength}</p>
                <Progress value={(analysis.score / 8) * 100} className="h-3 mt-2" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Card className="bg-muted/30"><CardContent className="p-3 text-center">
                  <p className="text-xs text-muted-foreground">Entropy</p>
                  <p className="font-bold">{analysis.entropy} bits</p>
                </CardContent></Card>
                <Card className="bg-muted/30"><CardContent className="p-3 text-center">
                  <p className="text-xs text-muted-foreground">Crack Time</p>
                  <p className="font-bold">{analysis.crackTime}</p>
                </CardContent></Card>
              </div>

              <div className="space-y-2">
                {analysis.checks.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    {c.pass ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-destructive" />}
                    <span className={c.pass ? 'text-foreground' : 'text-muted-foreground'}>{c.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CyberPasswordAnalyzerPage;
