import React from 'react';
import { Search, FileSearch, HardDrive, Wifi, Clock, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const cases = [
  { name: 'Compromised Web Server', type: 'Network', difficulty: 'Medium', tools: ['Wireshark', 'tcpdump'], desc: 'Analyze network traffic to find the attack vector' },
  { name: 'Ransomware Investigation', type: 'Malware', difficulty: 'Hard', tools: ['Volatility', 'strings'], desc: 'Examine memory dump to identify ransomware family' },
  { name: 'Email Phishing Analysis', type: 'Email', difficulty: 'Easy', tools: ['Header analysis', 'URL decoder'], desc: 'Investigate suspicious email headers and payloads' },
  { name: 'Data Exfiltration Detection', type: 'Network', difficulty: 'Hard', tools: ['Zeek', 'NetworkMiner'], desc: 'Find hidden data exfiltration in normal traffic' },
  { name: 'USB Forensics', type: 'Disk', difficulty: 'Medium', tools: ['FTK Imager', 'Autopsy'], desc: 'Recover deleted files from USB image' },
  { name: 'Log Analysis Challenge', type: 'Log', difficulty: 'Easy', tools: ['grep', 'awk', 'jq'], desc: 'Parse system logs to find intrusion evidence' },
];

const CyberForensicsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <FileSearch className="h-8 w-8 text-primary" /> Digital Forensics Lab
      </h1>
      <p className="text-muted-foreground mt-1">Practice digital forensics investigation techniques ethically</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cases.map(c => (
        <Card key={c.name} className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-2">
              <Badge variant="outline">{c.type}</Badge>
              <Badge className={c.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600' : c.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-red-500/10 text-red-600'}>{c.difficulty}</Badge>
            </div>
            <h3 className="font-semibold text-lg mb-1">{c.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{c.desc}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {c.tools.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
            </div>
            <Button className="w-full" size="sm" onClick={() => toast.success('Lab environment loading...')}>
              <Shield className="h-4 w-4 mr-2" /> Start Investigation
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default CyberForensicsPage;
