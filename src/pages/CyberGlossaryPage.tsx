import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search } from 'lucide-react';

const GLOSSARY = [
  { term: 'APT', def: 'Advanced Persistent Threat — a prolonged, targeted cyberattack where an intruder gains access and remains undetected.', cat: 'Threats' },
  { term: 'Botnet', def: 'A network of compromised computers controlled remotely, often used for DDoS attacks or spam.', cat: 'Threats' },
  { term: 'CSRF', def: 'Cross-Site Request Forgery — an attack that tricks authenticated users into submitting unintended requests.', cat: 'Web Security' },
  { term: 'DDoS', def: 'Distributed Denial of Service — overwhelming a target with traffic from multiple sources.', cat: 'Attacks' },
  { term: 'Encryption', def: 'The process of converting data into a coded format to prevent unauthorized access.', cat: 'Cryptography' },
  { term: 'Firewall', def: 'A network security device that monitors and filters incoming and outgoing traffic.', cat: 'Defense' },
  { term: 'Honeypot', def: 'A decoy system designed to attract and trap attackers to study their methods.', cat: 'Defense' },
  { term: 'IDS/IPS', def: 'Intrusion Detection/Prevention System — monitors network traffic for suspicious activity.', cat: 'Defense' },
  { term: 'JWT', def: 'JSON Web Token — a compact, URL-safe token used for authentication and information exchange.', cat: 'Authentication' },
  { term: 'Keylogger', def: 'Malware that records keystrokes to capture passwords and sensitive information.', cat: 'Malware' },
  { term: 'MITM', def: 'Man-in-the-Middle — an attack where the attacker intercepts communication between two parties.', cat: 'Attacks' },
  { term: 'Nmap', def: 'Network Mapper — an open-source tool for network discovery and security auditing.', cat: 'Tools' },
  { term: 'OSINT', def: 'Open Source Intelligence — gathering information from publicly available sources.', cat: 'Reconnaissance' },
  { term: 'Pentest', def: 'Penetration Testing — simulated cyberattack to evaluate system security.', cat: 'Assessment' },
  { term: 'Ransomware', def: 'Malware that encrypts files and demands payment for the decryption key.', cat: 'Malware' },
  { term: 'Social Engineering', def: 'Manipulating people into revealing confidential information or performing actions.', cat: 'Attacks' },
  { term: 'TLS/SSL', def: 'Transport Layer Security / Secure Sockets Layer — protocols for encrypted communication.', cat: 'Cryptography' },
  { term: 'VPN', def: 'Virtual Private Network — creates a secure, encrypted connection over a less secure network.', cat: 'Defense' },
  { term: 'WAF', def: 'Web Application Firewall — filters and monitors HTTP traffic between a web app and the Internet.', cat: 'Defense' },
  { term: 'XSS', def: 'Cross-Site Scripting — injecting malicious scripts into web pages viewed by other users.', cat: 'Web Security' },
  { term: 'Zero-Day', def: 'A vulnerability unknown to the vendor, with no available patch at the time of discovery.', cat: 'Threats' },
  { term: 'Phishing', def: 'A social engineering attack using fraudulent emails or websites to steal credentials.', cat: 'Attacks' },
  { term: 'SQL Injection', def: 'An attack that inserts malicious SQL queries through input fields to access databases.', cat: 'Web Security' },
  { term: 'Two-Factor Auth', def: 'An additional layer of security requiring two forms of verification to access an account.', cat: 'Authentication' },
  { term: 'CVE', def: 'Common Vulnerabilities and Exposures — a standardized identifier for known vulnerabilities.', cat: 'Assessment' },
  { term: 'Rootkit', def: 'Malware designed to provide unauthorized root/admin access while hiding its existence.', cat: 'Malware' },
];

const CyberGlossaryPage = () => {
  const [search, setSearch] = useState('');
  const filtered = GLOSSARY.filter(g => g.term.toLowerCase().includes(search.toLowerCase()) || g.def.toLowerCase().includes(search.toLowerCase()));
  const letters = [...new Set(filtered.map(g => g.term[0]))].sort();

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="w-6 h-6 text-primary" /> Cyber Glossary</h1>
        <p className="text-sm text-muted-foreground">{GLOSSARY.length} terms</p>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search terms..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      {letters.map(letter => (
        <div key={letter}>
          <h2 className="text-lg font-bold text-primary mb-2">{letter}</h2>
          <div className="space-y-2">
            {filtered.filter(g => g.term[0] === letter).map(g => (
              <Card key={g.term} className="border-border/50">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium font-mono">{g.term}</p>
                      <p className="text-sm text-muted-foreground mt-1">{g.def}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] shrink-0">{g.cat}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CyberGlossaryPage;
