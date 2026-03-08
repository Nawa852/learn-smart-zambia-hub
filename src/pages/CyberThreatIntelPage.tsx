import React from 'react';
import { Shield, AlertTriangle, Globe, Bug, Activity, TrendingUp, Newspaper } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const threats = [
  { name: 'Log4Shell (CVE-2021-44228)', severity: 'Critical', type: 'RCE', affected: 'Java applications', date: '2021-12-09', status: 'active' },
  { name: 'MOVEit Transfer Vuln', severity: 'Critical', type: 'SQLi', affected: 'File transfer systems', date: '2023-05-31', status: 'active' },
  { name: 'Spring4Shell', severity: 'High', type: 'RCE', affected: 'Spring Framework', date: '2022-03-29', status: 'patched' },
  { name: 'Heartbleed', severity: 'High', type: 'Info Leak', affected: 'OpenSSL', date: '2014-04-07', status: 'patched' },
  { name: 'EternalBlue', severity: 'Critical', type: 'RCE', affected: 'Windows SMB', date: '2017-04-14', status: 'patched' },
  { name: 'Spectre/Meltdown', severity: 'Medium', type: 'Side Channel', affected: 'CPUs', date: '2018-01-03', status: 'mitigated' },
];

const news = [
  { title: 'New AI-powered phishing attacks surge 300%', date: '2026-03-07', source: 'CyberWire' },
  { title: 'Critical vulnerability found in popular IoT firmware', date: '2026-03-06', source: 'Krebs on Security' },
  { title: 'Nation-state actors targeting African universities', date: '2026-03-05', source: 'Recorded Future' },
  { title: 'Ransomware gangs pivot to data extortion models', date: '2026-03-04', source: 'BleepingComputer' },
  { title: 'Zero-day in browser engine affects millions', date: '2026-03-03', source: 'The Hacker News' },
];

const sevColors: Record<string, string> = { Critical: 'bg-red-500/10 text-red-600', High: 'bg-orange-500/10 text-orange-600', Medium: 'bg-yellow-500/10 text-yellow-600' };

const CyberThreatIntelPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Globe className="h-8 w-8 text-primary" /> Threat Intelligence
      </h1>
      <p className="text-muted-foreground mt-1">Stay informed about the latest cyber threats and vulnerabilities</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2"><Bug className="h-5 w-5" /> Known Vulnerabilities</h3>
        {threats.map(t => (
          <Card key={t.name} className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-1">
                <p className="font-semibold text-sm">{t.name}</p>
                <Badge className={sevColors[t.severity]}>{t.severity}</Badge>
              </div>
              <div className="flex gap-2 text-xs text-muted-foreground">
                <Badge variant="outline">{t.type}</Badge>
                <span>{t.affected}</span>
                <span>{t.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2"><Newspaper className="h-5 w-5" /> Security News</h3>
        {news.map(n => (
          <Card key={n.title} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <p className="font-medium text-sm">{n.title}</p>
              <p className="text-xs text-muted-foreground">{n.source} • {n.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

export default CyberThreatIntelPage;
