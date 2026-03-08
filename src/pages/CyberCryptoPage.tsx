import React, { useState } from 'react';
import { Lock, Key, Hash, RefreshCw, Copy, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const ciphers = [
  { name: 'Caesar Cipher', desc: 'Shift each letter by N positions', type: 'Classical' },
  { name: 'Vigenère Cipher', desc: 'Polyalphabetic substitution cipher', type: 'Classical' },
  { name: 'Base64 Encode/Decode', desc: 'Binary-to-text encoding', type: 'Encoding' },
  { name: 'ROT13', desc: 'Rotate alphabet by 13 positions', type: 'Classical' },
  { name: 'XOR Cipher', desc: 'Exclusive OR operation', type: 'Modern' },
  { name: 'MD5 Hash', desc: 'Generate MD5 hash (demonstration)', type: 'Hashing' },
  { name: 'SHA-256 Hash', desc: 'Generate SHA-256 hash', type: 'Hashing' },
  { name: 'AES Concepts', desc: 'Advanced Encryption Standard theory', type: 'Modern' },
];

const CyberCryptoPage = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [shift, setShift] = useState(3);
  const [method, setMethod] = useState('caesar');

  const encrypt = () => {
    if (!input) { toast.error('Enter text to encrypt'); return; }
    let result = '';
    switch (method) {
      case 'caesar':
        result = input.split('').map(c => {
          if (c.match(/[a-z]/)) return String.fromCharCode(((c.charCodeAt(0) - 97 + shift) % 26) + 97);
          if (c.match(/[A-Z]/)) return String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65);
          return c;
        }).join('');
        break;
      case 'base64':
        result = btoa(input);
        break;
      case 'rot13':
        result = input.replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)));
        break;
      case 'reverse':
        result = input.split('').reverse().join('');
        break;
      default:
        result = btoa(input);
    }
    setOutput(result);
    toast.success('Encrypted!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Lock className="h-8 w-8 text-primary" /> Cryptography Playground
        </h1>
        <p className="text-muted-foreground mt-1">Learn and practice encryption techniques ethically</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-lg">
          <CardHeader><CardTitle>Encrypt / Decode</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="caesar">Caesar Cipher</SelectItem>
                <SelectItem value="base64">Base64</SelectItem>
                <SelectItem value="rot13">ROT13</SelectItem>
                <SelectItem value="reverse">Reverse</SelectItem>
              </SelectContent>
            </Select>
            {method === 'caesar' && (
              <div className="flex items-center gap-2">
                <span className="text-sm">Shift:</span>
                <Input type="number" value={shift} onChange={e => setShift(Number(e.target.value))} className="w-20" min={1} max={25} />
              </div>
            )}
            <Textarea placeholder="Enter plaintext..." value={input} onChange={e => setInput(e.target.value)} rows={4} />
            <Button className="w-full" onClick={encrypt}><Key className="h-4 w-4 mr-2" /> Encrypt</Button>
            {output && (
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Output:</span>
                  <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast.success('Copied!'); }}><Copy className="h-3 w-3" /></Button>
                </div>
                <p className="font-mono text-sm break-all">{output}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Available Ciphers & Techniques</h3>
          {ciphers.map(c => (
            <Card key={c.name} className="border-none shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </div>
                <Badge variant="outline">{c.type}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CyberCryptoPage;
