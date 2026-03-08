import React from 'react';
import { Wifi, Server, Shield, Globe, Lock, Radio, Router } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const labs = [
  { name: 'Network Scanning with Nmap', tool: 'Nmap', difficulty: 'Easy', desc: 'Learn network discovery and port scanning', duration: '30 min' },
  { name: 'Packet Analysis', tool: 'Wireshark', difficulty: 'Medium', desc: 'Capture and analyze network packets', duration: '45 min' },
  { name: 'Firewall Configuration', tool: 'iptables', difficulty: 'Medium', desc: 'Configure Linux firewall rules', duration: '40 min' },
  { name: 'VPN Setup & Analysis', tool: 'OpenVPN', difficulty: 'Medium', desc: 'Set up and test VPN connections', duration: '50 min' },
  { name: 'DNS Security', tool: 'dig/nslookup', difficulty: 'Easy', desc: 'DNS enumeration and security', duration: '25 min' },
  { name: 'Wireless Security', tool: 'Aircrack-ng', difficulty: 'Hard', desc: 'Wireless network security testing', duration: '60 min' },
  { name: 'IDS/IPS Configuration', tool: 'Snort', difficulty: 'Hard', desc: 'Set up intrusion detection systems', duration: '55 min' },
  { name: 'Network Segmentation', tool: 'VLANs', difficulty: 'Medium', desc: 'Implement network segmentation', duration: '35 min' },
];

const CyberNetworkLabPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Wifi className="h-8 w-8 text-primary" /> Network Security Lab
      </h1>
      <p className="text-muted-foreground mt-1">Hands-on network security exercises</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {labs.map(l => (
        <Card key={l.name} className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold">{l.name}</h3>
                <p className="text-sm text-muted-foreground">{l.desc}</p>
              </div>
              <Badge className={l.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600' : l.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-red-500/10 text-red-600'}>{l.difficulty}</Badge>
            </div>
            <div className="flex gap-2 mb-3">
              <Badge variant="secondary">{l.tool}</Badge>
              <Badge variant="outline">{l.duration}</Badge>
            </div>
            <Button className="w-full" size="sm" onClick={() => toast.success('Loading lab environment...')}>
              <Server className="h-4 w-4 mr-2" /> Launch Lab
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default CyberNetworkLabPage;
