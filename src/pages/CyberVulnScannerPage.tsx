import React, { useState } from 'react';
import { Search, Shield, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Finding {
  id: string; severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  title: string; description: string; port?: string; cve?: string;
}

const SIMULATED_FINDINGS: Finding[] = [
  { id: '1', severity: 'Critical', title: 'SSH Root Login Enabled', description: 'Root login via SSH is permitted. Disable PermitRootLogin in sshd_config.', port: '22/tcp', cve: 'CVE-2023-48795' },
  { id: '2', severity: 'High', title: 'Outdated OpenSSL Version', description: 'OpenSSL 1.0.2k detected. Upgrade to 3.x to patch known vulnerabilities.', port: '443/tcp', cve: 'CVE-2022-3602' },
  { id: '3', severity: 'High', title: 'Default Credentials on Web Panel', description: 'Admin panel at /admin uses default credentials admin:admin.', port: '8080/tcp' },
  { id: '4', severity: 'Medium', title: 'Missing HTTP Security Headers', description: 'X-Frame-Options, CSP, and HSTS headers are not configured.', port: '80/tcp' },
  { id: '5', severity: 'Medium', title: 'Directory Listing Enabled', description: 'Apache mod_autoindex exposes directory contents at /files/.', port: '80/tcp' },
  { id: '6', severity: 'Low', title: 'Server Version Disclosure', description: 'Apache/2.4.41 version string is visible in response headers.', port: '80/tcp' },
  { id: '7', severity: 'Info', title: 'Open DNS Resolver', description: 'DNS service responds to recursive queries from any source.', port: '53/udp' },
];

const sevColors: Record<string, string> = {
  Critical: 'bg-red-600 text-white', High: 'bg-orange-500 text-white', Medium: 'bg-yellow-500 text-black', Low: 'bg-blue-500 text-white', Info: 'bg-muted text-muted-foreground',
};

const CyberVulnScannerPage = () => {
  const [target, setTarget] = useState('192.168.1.100');
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<Finding[] | null>(null);

  const runScan = () => {
    if (!target.trim()) return;
    setScanning(true); setProgress(0); setResults(null);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) { p = 100; clearInterval(interval); setScanning(false); setResults(SIMULATED_FINDINGS); }
      setProgress(Math.min(p, 100));
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Search className="h-8 w-8 text-primary" /> Vulnerability Scanner
        </h1>
        <p className="text-muted-foreground mt-1">Simulated Nessus-style vulnerability scanning for training</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Target Configuration</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Target IP or hostname" value={target} onChange={e => setTarget(e.target.value)} className="font-mono" />
            <Button onClick={runScan} disabled={scanning}>
              {scanning ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
              {scanning ? 'Scanning...' : 'Run Scan'}
            </Button>
          </div>
          {scanning && <Progress value={progress} className="h-2" />}
        </CardContent>
      </Card>

      {results && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {['Critical', 'High', 'Medium', 'Low', 'Info'].map(sev => (
              <Card key={sev} className="border-none shadow-sm">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">{results.filter(r => r.severity === sev).length}</p>
                  <Badge className={sevColors[sev]}>{sev}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-3">
            {results.map(f => (
              <Card key={f.id} className="border-none shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {f.severity === 'Critical' || f.severity === 'High' ? <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" /> : <CheckCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={sevColors[f.severity]}>{f.severity}</Badge>
                        <span className="font-semibold text-sm">{f.title}</span>
                        {f.port && <span className="text-xs text-muted-foreground font-mono">{f.port}</span>}
                      </div>
                      <p className="text-sm text-muted-foreground">{f.description}</p>
                      {f.cve && <span className="text-xs font-mono text-primary">{f.cve}</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CyberVulnScannerPage;
