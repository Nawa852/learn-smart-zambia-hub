import React from 'react';
import { Wrench, Terminal, Shield, Globe, Server, Lock, Cpu, Code } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const tools = [
  { name: 'Nmap', category: 'Scanning', desc: 'Network discovery and security auditing', usage: 'nmap -sV -sC target.com' },
  { name: 'Burp Suite', category: 'Web Testing', desc: 'Web vulnerability scanner and proxy', usage: 'GUI-based proxy tool' },
  { name: 'Metasploit', category: 'Exploitation', desc: 'Penetration testing framework', usage: 'msfconsole' },
  { name: 'Wireshark', category: 'Network', desc: 'Network protocol analyzer', usage: 'GUI packet capture' },
  { name: 'John the Ripper', category: 'Password', desc: 'Password cracking tool', usage: 'john --wordlist=rockyou.txt hash.txt' },
  { name: 'Hashcat', category: 'Password', desc: 'Advanced password recovery', usage: 'hashcat -m 0 hash.txt wordlist.txt' },
  { name: 'SQLMap', category: 'Web Testing', desc: 'Automatic SQL injection tool', usage: 'sqlmap -u "url" --dbs' },
  { name: 'Gobuster', category: 'Enumeration', desc: 'Directory/DNS brute forcing', usage: 'gobuster dir -u url -w wordlist' },
  { name: 'Hydra', category: 'Password', desc: 'Online password cracking', usage: 'hydra -l user -P pass.txt ssh://target' },
  { name: 'Nikto', category: 'Web Testing', desc: 'Web server scanner', usage: 'nikto -h target.com' },
  { name: 'Aircrack-ng', category: 'Wireless', desc: 'WiFi security auditing', usage: 'aircrack-ng capture.cap' },
  { name: 'Volatility', category: 'Forensics', desc: 'Memory forensics framework', usage: 'vol.py -f memory.dmp imageinfo' },
];

const catColors: Record<string, string> = {
  Scanning: 'bg-blue-500/10 text-blue-600',
  'Web Testing': 'bg-purple-500/10 text-purple-600',
  Exploitation: 'bg-red-500/10 text-red-600',
  Network: 'bg-green-500/10 text-green-600',
  Password: 'bg-orange-500/10 text-orange-600',
  Enumeration: 'bg-cyan-500/10 text-cyan-600',
  Wireless: 'bg-yellow-500/10 text-yellow-600',
  Forensics: 'bg-pink-500/10 text-pink-600',
};

const CyberToolkitPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Wrench className="h-8 w-8 text-primary" /> Hacker Toolkit Guide
      </h1>
      <p className="text-muted-foreground mt-1">Essential tools for ethical security testing</p>
    </div>
    <Card className="border-none shadow-lg bg-gradient-to-br from-yellow-500/5 to-yellow-500/10">
      <CardContent className="p-4">
        <p className="text-sm">⚠️ <strong>Ethics First:</strong> Only use these tools on systems you own or have written permission to test.</p>
      </CardContent>
    </Card>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map(t => (
        <Card key={t.name} className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{t.name}</h3>
              <Badge className={catColors[t.category] || 'bg-muted'}>{t.category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{t.desc}</p>
            <code className="text-xs bg-muted/50 px-2 py-1 rounded block font-mono">{t.usage}</code>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default CyberToolkitPage;
