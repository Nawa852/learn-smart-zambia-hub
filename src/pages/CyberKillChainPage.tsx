import React, { useState } from 'react';
import { Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PHASES = [
  {
    name: 'Reconnaissance', color: 'bg-blue-500', emoji: '🔍',
    description: 'Attacker gathers information about the target.',
    tools: ['Nmap', 'Shodan', 'theHarvester', 'Maltego', 'Google Dorking'],
    techniques: ['Port scanning', 'OSINT', 'Social media profiling', 'DNS enumeration'],
    defenses: ['Minimize public information', 'Monitor for scanning activity', 'Implement honeypots'],
  },
  {
    name: 'Weaponization', color: 'bg-indigo-500', emoji: '⚔️',
    description: 'Attacker creates a deliverable payload.',
    tools: ['Metasploit', 'msfvenom', 'SET (Social Engineering Toolkit)', 'Veil-Evasion'],
    techniques: ['Exploit development', 'Malware creation', 'Trojan embedding', 'Macro weaponization'],
    defenses: ['Threat intelligence feeds', 'Sandbox analysis', 'Signature-based detection'],
  },
  {
    name: 'Delivery', color: 'bg-purple-500', emoji: '📧',
    description: 'Payload is transmitted to the target.',
    tools: ['Phishing frameworks', 'USB drop attacks', 'Watering hole sites'],
    techniques: ['Spear phishing', 'Drive-by downloads', 'Supply chain compromise', 'USB baiting'],
    defenses: ['Email filtering', 'Web proxies', 'User awareness training', 'Endpoint protection'],
  },
  {
    name: 'Exploitation', color: 'bg-orange-500', emoji: '💥',
    description: 'Vulnerability is exploited to execute code.',
    tools: ['Metasploit', 'Cobalt Strike', 'BeEF', 'SQLMap'],
    techniques: ['Buffer overflow', 'SQL injection', 'Zero-day exploits', 'Privilege escalation'],
    defenses: ['Patch management', 'DEP/ASLR', 'Application whitelisting', 'WAF'],
  },
  {
    name: 'Installation', color: 'bg-red-500', emoji: '🔧',
    description: 'Malware is installed on the target system.',
    tools: ['Rootkits', 'RATs', 'Web shells', 'Registry modifications'],
    techniques: ['DLL hijacking', 'Service creation', 'Scheduled tasks', 'Boot persistence'],
    defenses: ['EDR solutions', 'File integrity monitoring', 'Application control', 'HIDS'],
  },
  {
    name: 'Command & Control', color: 'bg-pink-500', emoji: '🎮',
    description: 'Attacker establishes remote control channel.',
    tools: ['C2 frameworks (Cobalt Strike, Empire)', 'DNS tunneling', 'Tor hidden services'],
    techniques: ['Encrypted channels', 'Domain fronting', 'Beaconing', 'Dead drop resolvers'],
    defenses: ['Network monitoring', 'DNS analysis', 'Egress filtering', 'SSL inspection'],
  },
  {
    name: 'Actions on Objectives', color: 'bg-gray-700', emoji: '🎯',
    description: 'Attacker achieves their ultimate goal.',
    tools: ['Mimikatz', 'BloodHound', 'PowerSploit', 'Exfiltration tools'],
    techniques: ['Data exfiltration', 'Lateral movement', 'Privilege escalation', 'Ransomware deployment'],
    defenses: ['DLP solutions', 'Network segmentation', 'Incident response plan', 'Backup & recovery'],
  },
];

const CyberKillChainPage = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" /> Cyber Kill Chain
        </h1>
        <p className="text-muted-foreground mt-1">Interactive visualization of the Lockheed Martin Cyber Kill Chain</p>
      </div>

      <div className="space-y-3">
        {PHASES.map((phase, i) => (
          <Card key={phase.name} className={`border-none shadow-md transition-all cursor-pointer ${expanded === i ? 'ring-2 ring-primary/30' : ''}`} onClick={() => setExpanded(expanded === i ? null : i)}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className={`${phase.color} text-white text-lg px-3 py-1`}>{i + 1}</Badge>
                  <span className="text-lg">{phase.emoji} {phase.name}</span>
                </div>
                {expanded === i ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </CardTitle>
              <p className="text-sm text-muted-foreground ml-12">{phase.description}</p>
            </CardHeader>
            {expanded === i && (
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-12">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-primary">🛠️ Tools</h4>
                    <ul className="space-y-1">{phase.tools.map(t => <li key={t} className="text-sm text-muted-foreground">• {t}</li>)}</ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-orange-500">⚡ Techniques</h4>
                    <ul className="space-y-1">{phase.techniques.map(t => <li key={t} className="text-sm text-muted-foreground">• {t}</li>)}</ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-green-500">🛡️ Defenses</h4>
                    <ul className="space-y-1">{phase.defenses.map(d => <li key={d} className="text-sm text-muted-foreground">• {d}</li>)}</ul>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CyberKillChainPage;
