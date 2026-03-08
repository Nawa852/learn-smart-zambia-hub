import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Terminal, Shield, Info, Lightbulb, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FileSystem {
  [key: string]: string | FileSystem;
}

interface HistoryEntry {
  command: string;
  output: string;
  isError?: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  hint: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  checkSolution: (history: HistoryEntry[]) => boolean;
  points: number;
}

const challenges: Challenge[] = [
  {
    id: 'recon1', title: 'Network Reconnaissance', description: 'Use nmap to scan the target 192.168.1.0/24 and find open ports.',
    hint: 'Try: nmap -sV 192.168.1.0/24', difficulty: 'Easy', category: 'Network', points: 50,
    checkSolution: (h) => h.some(e => e.command.includes('nmap') && e.command.includes('192.168.1')),
  },
  {
    id: 'hash1', title: 'Crack the Hash', description: 'Use hashcat or john to identify the hash type of: 5f4dcc3b5aa765d61d8327deb882cf99',
    hint: 'Try: hashid 5f4dcc3b5aa765d61d8327deb882cf99', difficulty: 'Easy', category: 'Crypto', points: 50,
    checkSolution: (h) => h.some(e => e.command.includes('hashid') || e.command.includes('hash-identifier')),
  },
  {
    id: 'sql1', title: 'SQL Injection', description: 'Use sqlmap to test the URL http://target.local/login?id=1 for SQL injection.',
    hint: 'Try: sqlmap -u "http://target.local/login?id=1" --dbs', difficulty: 'Medium', category: 'Web', points: 100,
    checkSolution: (h) => h.some(e => e.command.includes('sqlmap')),
  },
  {
    id: 'priv1', title: 'Linux Privilege Escalation', description: 'Find SUID binaries that could be exploited for privilege escalation.',
    hint: 'Try: find / -perm -4000 -type f 2>/dev/null', difficulty: 'Medium', category: 'System', points: 100,
    checkSolution: (h) => h.some(e => e.command.includes('find') && e.command.includes('-perm')),
  },
  {
    id: 'wifi1', title: 'WiFi Handshake Capture', description: 'Put your interface in monitor mode and capture a WPA2 handshake.',
    hint: 'Try: airmon-ng start wlan0', difficulty: 'Hard', category: 'Wireless', points: 200,
    checkSolution: (h) => h.some(e => e.command.includes('airmon-ng') || e.command.includes('airodump-ng')),
  },
];

// Simulated filesystem
const filesystem: FileSystem = {
  home: {
    hacker: {
      '.bashrc': '# ~/.bashrc\nexport PS1="\\u@kali:~$ "',
      'notes.txt': 'Target: 192.168.1.0/24\nObjective: Find vulnerable services',
      'wordlists': {
        'rockyou.txt': '[wordlist - 14,341,564 passwords]',
        'common.txt': 'admin\npassword\n123456\nletmein\nwelcome',
      },
      'tools': {
        'exploit.py': '#!/usr/bin/env python3\n# Buffer overflow exploit template\nimport socket\n\ntarget = "192.168.1.100"\nport = 9999',
        'scanner.sh': '#!/bin/bash\n# Quick port scanner\nfor port in $(seq 1 1024); do\n  (echo >/dev/tcp/$1/$port) 2>/dev/null && echo "Port $port open"\ndone',
      },
    },
  },
  etc: {
    passwd: 'root:x:0:0:root:/root:/bin/bash\nhacker:x:1000:1000::/home/hacker:/bin/bash\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin',
    shadow: '[Permission denied]',
    hosts: '127.0.0.1 localhost\n192.168.1.100 target.local\n192.168.1.1 gateway.local',
  },
  var: {
    log: {
      'auth.log': 'Mar 8 14:22:01 kali sshd[1234]: Failed password for root from 192.168.1.50\nMar 8 14:22:05 kali sshd[1234]: Accepted password for hacker',
      'syslog': 'Mar 8 system boot\nMar 8 network interface eth0 UP',
    },
  },
};

const toolResponses: Record<string, (args: string) => string> = {
  nmap: (args) => {
    if (args.includes('192.168.1')) {
      return `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for 192.168.1.1 (gateway.local)
PORT     STATE SERVICE    VERSION
22/tcp   open  ssh        OpenSSH 8.9
80/tcp   open  http       Apache 2.4.52

Nmap scan report for 192.168.1.100 (target.local)
PORT     STATE SERVICE    VERSION
21/tcp   open  ftp        vsftpd 2.3.4
22/tcp   open  ssh        OpenSSH 7.2
80/tcp   open  http       Apache 2.4.18
3306/tcp open  mysql      MySQL 5.5.62
8080/tcp open  http-proxy Squid 3.5.12

Nmap done: 256 IP addresses (4 hosts up) scanned in 12.45 seconds`;
    }
    return `Starting Nmap 7.94\nNote: No targets specified. Usage: nmap [options] <target>`;
  },
  nikto: (args) => `- Nikto v2.5.0\n+ Target: ${args || 'http://target.local'}\n+ Server: Apache/2.4.18\n+ /admin/: Directory indexing found\n+ /phpmyadmin/: phpMyAdmin found\n+ OSVDB-3233: /icons/README: Apache default file\n+ 7 items checked, 3 vulnerabilities found`,
  sqlmap: (args) => `[*] starting @ 14:30:00\n[*] testing URL: ${args.split(' ')[1] || 'target'}\n[*] testing parameter 'id'\n[!] parameter 'id' appears to be injectable\n[*] detected back-end DBMS: MySQL >= 5.0\n[*] available databases:\n[*]   information_schema\n[*]   webapp_db\n[*]   mysql\n[*] 3 databases found`,
  hashid: (args) => `Analyzing '${args.trim()}'...\n[+] MD5\n[+] MD4\n[+] Double MD5\n[+] LM\n[+] RIPEMD-128\n\nMost likely: MD5`,
  'hash-identifier': (args) => `Possible Hashs:\n[+] MD5\n[+] Domain Cached Credentials`,
  john: (args) => `Using default input encoding: UTF-8\nLoaded 1 password hash (Raw-MD5)\nPress 'q' to abort\npassword         (hash)\n1g 0:00:00:00 DONE 100.0g/s 25600p/s`,
  hashcat: (args) => `hashcat (v6.2.6) starting\nSession: hashcat\nStatus: Cracked\nHash.Type: MD5\nSpeed: 2456.2 MH/s\nRecovered: 1/1 (100.00%)\nCandidates: password -> password`,
  hydra: (args) => `Hydra v9.4 starting\n[DATA] attacking ssh://192.168.1.100:22\n[22][ssh] host: 192.168.1.100   login: admin   password: password123\n1 of 1 target completed, 1 valid password found`,
  metasploit: () => `msf6 > \nLoaded 2345 exploits, 1234 auxiliary modules\nType 'help' for available commands\nTip: Use 'search' to find modules`,
  msfconsole: () => `\n       =[ metasploit v6.3.4 ]\n+ -- --=[ 2345 exploits - 1234 auxiliary ]\n+ -- --=[ 1122 payloads - 45 encoders  ]\n\nmsf6 > `,
  airmon: (args) => `Found 2 processes that could cause trouble.\nKilling processes...\nPHY\tInterface\tDriver\tChipset\nphy0\twlan0\t\tath9k\tAtheros\n(monitor mode enabled on wlan0mon)`,
  'airmon-ng': (args) => toolResponses.airmon(args),
  'airodump-ng': (args) => `CH 6 ][ Elapsed: 12 s\n BSSID              PWR  #Data  CH  ENC   ESSID\n AA:BB:CC:DD:EE:FF  -42  125    6   WPA2  TargetNetwork\n 11:22:33:44:55:66  -68  34     1   WPA2  Neighbor_WiFi`,
  gobuster: (args) => `===============================================================\nGobuster v3.6\n===============================================================\n/admin                (Status: 200) [Size: 1234]\n/login                (Status: 200) [Size: 2345]\n/uploads              (Status: 403) [Size: 278]\n/backup               (Status: 200) [Size: 5678]\n/config               (Status: 403) [Size: 278]`,
  dirb: (args) => `---- Scanning URL: http://target.local/ ----\n+ http://target.local/admin (CODE:200|SIZE:1234)\n+ http://target.local/config (CODE:403|SIZE:278)\n+ http://target.local/uploads (CODE:403|SIZE:278)`,
  whoami: () => 'hacker',
  id: () => 'uid=1000(hacker) gid=1000(hacker) groups=1000(hacker),27(sudo)',
  uname: (args) => args.includes('-a') ? 'Linux kali 6.1.0-kali9-amd64 #1 SMP x86_64 GNU/Linux' : 'Linux',
  ifconfig: () => `eth0: flags=4163<UP,BROADCAST,RUNNING>  mtu 1500\n        inet 192.168.1.50  netmask 255.255.255.0\n        ether 08:00:27:a1:b2:c3\n\nlo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536\n        inet 127.0.0.1`,
  ip: (args) => args.includes('addr') ? `1: lo: <LOOPBACK,UP> mtu 65536\n    inet 127.0.0.1/8\n2: eth0: <BROADCAST,UP> mtu 1500\n    inet 192.168.1.50/24` : 'Usage: ip [ OPTIONS ] OBJECT { COMMAND }',
  ping: (args) => {
    const target = args.split(' ').pop() || '';
    return `PING ${target} (192.168.1.100): 56 data bytes\n64 bytes from 192.168.1.100: icmp_seq=0 ttl=64 time=1.234 ms\n64 bytes from 192.168.1.100: icmp_seq=1 ttl=64 time=0.987 ms\n--- ${target} ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss`;
  },
  curl: (args) => `HTTP/1.1 200 OK\nServer: Apache/2.4.18\nContent-Type: text/html\n\n<html><head><title>Target Web App</title></head>\n<body><h1>Welcome</h1><form action="/login" method="POST">\n<input name="username"><input name="password" type="password">\n</form></body></html>`,
  wget: (args) => `--2024-03-08 14:30:00-- ${args.split(' ').pop()}\nConnecting to target.local... connected.\nHTTP request sent, awaiting response... 200 OK\nLength: 12345 (12K) [text/html]\nSaving to: 'index.html'\nindex.html          100%[==================>]  12.05K  --.-KB/s    in 0s`,
  netstat: () => `-an\nActive Internet connections\nProto Recv-Q Send-Q Local Address    Foreign Address    State\ntcp   0      0      0.0.0.0:22       0.0.0.0:*          LISTEN\ntcp   0      0      192.168.1.50:22  192.168.1.1:54321  ESTABLISHED`,
  ss: () => `Netid  State   Recv-Q  Send-Q  Local Address:Port  Peer Address:Port\ntcp    LISTEN  0       128     0.0.0.0:22         0.0.0.0:*\ntcp    ESTAB   0       0       192.168.1.50:22    192.168.1.1:54321`,
  nc: (args) => `Connection to ${args.split(' ')[0] || 'target'} ${args.split(' ')[1] || '80'} port [tcp/*] succeeded!`,
  searchsploit: (args) => `----------- ----------------------------------------\n Exploit Title                            | Path\n----------- ----------------------------------------\n vsftpd 2.3.4 - Backdoor Command Exec    | unix/remote/17491.rb\n Apache 2.4.18 - Mod CGI Remote Code Exec | linux/remote/40961.py\n MySQL 5.5 - Auth Bypass                  | linux/remote/28234.py\n----------- ----------------------------------------`,
  python3: () => `Python 3.11.6\nType "exit()" to quit\n>>> `,
  gcc: (args) => args ? `Compiling ${args}... done.` : 'gcc: fatal error: no input files',
  chmod: (args) => '',
  mkdir: (args) => '',
  touch: (args) => '',
  echo: (args) => args.replace(/['"]/g, ''),
  date: () => new Date().toUTCString(),
  uptime: () => ' 14:30:00 up 2:15, 1 user, load average: 0.15, 0.10, 0.05',
  history: () => '', // handled separately
  pwd: () => '/home/hacker',
  hostname: () => 'kali',
  'apt-get': (args) => args.includes('install') ? `Reading package lists... Done\nInstalling ${args.split('install')[1]?.trim() || 'package'}... Done` : 'Usage: apt-get [install|update|upgrade]',
  man: (args) => `${args.toUpperCase()}(1)\n\nNAME\n  ${args} - ${args} command manual\n\nSYNOPSIS\n  ${args} [OPTIONS]\n\nDESCRIPTION\n  Standard Unix ${args} command.\n  Use --help for quick reference.`,
  clear: () => '__CLEAR__',
};

export default function HackingTerminalPage() {
  const { toast } = useToast();
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: '', output: `\x1b[32m╔═══════════════════════════════════════════════╗
║   BrightSphere Hacking Terminal v2.0          ║
║   Ethical Hacking Simulation Environment      ║
╚═══════════════════════════════════════════════╝\x1b[0m

Welcome, hacker! This is a sandboxed terminal simulator.
Type \x1b[33mhelp\x1b[0m to see available commands.
Type \x1b[33mchallenges\x1b[0m to view active challenges.

⚠️  All activities are monitored. Use skills ethically.
` },
  ]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('/home/hacker');
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const resolvePath = (path: string): string | FileSystem | null => {
    const absPath = path.startsWith('/') ? path : `${cwd}/${path}`;
    const parts = absPath.split('/').filter(Boolean);
    let current: string | FileSystem = filesystem;
    for (const part of parts) {
      if (part === '..') continue;
      if (part === '.') continue;
      if (typeof current === 'string') return null;
      if (!(part in current)) return null;
      current = current[part];
    }
    return current;
  };

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let output = '';
    let isError = false;

    if (command === 'help') {
      output = `\x1b[33mAvailable Hacking Tools:\x1b[0m
  nmap        - Network scanner & port mapper
  nikto       - Web server vulnerability scanner
  sqlmap      - SQL injection automation tool
  gobuster    - Directory/file brute-forcer
  hydra       - Password cracking tool
  hashid      - Hash type identifier
  hashcat     - Advanced password recovery
  john        - John the Ripper password cracker
  msfconsole  - Metasploit Framework
  searchsploit - Exploit database search
  airmon-ng   - WiFi monitor mode
  airodump-ng - WiFi packet capture
  nc          - Netcat networking utility
  curl/wget   - HTTP request tools

\x1b[33mSystem Commands:\x1b[0m
  ls, cd, cat, pwd, whoami, id, uname, ifconfig
  ping, netstat, history, clear, find, grep

\x1b[33mChallenge Commands:\x1b[0m
  challenges  - View available challenges
  score       - View your points`;
    } else if (command === 'challenges') {
      output = `\x1b[33m═══ Active Challenges ═══\x1b[0m\n`;
      challenges.forEach(c => {
        const done = completedChallenges.includes(c.id);
        output += `\n${done ? '✅' : '⬜'} [${c.difficulty}] ${c.title} (${c.points} pts)\n   ${c.description}\n`;
      });
    } else if (command === 'score') {
      output = `\x1b[33mYour Score:\x1b[0m ${totalPoints} points\nChallenges completed: ${completedChallenges.length}/${challenges.length}`;
    } else if (command === 'hint') {
      const active = challenges.find(c => !completedChallenges.includes(c.id));
      output = active ? `\x1b[33mHint:\x1b[0m ${active.hint}` : 'All challenges completed! 🎉';
    } else if (command === 'ls') {
      const target = args ? resolvePath(args) : resolvePath(cwd);
      if (target && typeof target === 'object') {
        output = Object.keys(target).map(k => typeof target[k] === 'object' ? `\x1b[34m${k}/\x1b[0m` : k).join('  ');
      } else {
        output = `ls: cannot access '${args}': No such file or directory`;
        isError = true;
      }
    } else if (command === 'cd') {
      if (!args || args === '~') { setCwd('/home/hacker'); return setHistory(prev => [...prev, { command: trimmed, output: '' }]); }
      const newPath = args.startsWith('/') ? args : `${cwd}/${args}`.replace(/\/+/g, '/');
      const target = resolvePath(newPath);
      if (target && typeof target === 'object') {
        setCwd(newPath.replace(/\/+/g, '/'));
        output = '';
      } else {
        output = `cd: ${args}: No such directory`;
        isError = true;
      }
    } else if (command === 'cat') {
      const target = resolvePath(args);
      if (target && typeof target === 'string') {
        output = target;
      } else if (target && typeof target === 'object') {
        output = `cat: ${args}: Is a directory`;
        isError = true;
      } else {
        output = `cat: ${args}: No such file or directory`;
        isError = true;
      }
    } else if (command === 'find') {
      if (args.includes('-perm') && args.includes('4000')) {
        output = `/usr/bin/sudo\n/usr/bin/passwd\n/usr/bin/newgrp\n/usr/bin/chfn\n/usr/bin/gpasswd\n/usr/bin/pkexec\n/usr/lib/openssh/ssh-keysign\n/usr/lib/dbus-1.0/dbus-daemon-launch-helper`;
      } else if (args.includes('-name')) {
        output = `./notes.txt\n./wordlists/rockyou.txt\n./tools/exploit.py`;
      } else {
        output = 'Usage: find <path> [options]';
      }
    } else if (command === 'grep') {
      output = args ? `[matched lines for: ${args}]` : 'Usage: grep [pattern] [file]';
    } else if (command === 'history') {
      output = commandHistory.map((c, i) => `  ${i + 1}  ${c}`).join('\n');
    } else if (command === 'clear') {
      setHistory([]);
      return;
    } else if (command === 'exit') {
      output = 'Cannot exit — this is a sandboxed simulation. Type "help" for commands.';
    } else if (command === 'sudo') {
      if (args.startsWith('su')) {
        output = `\x1b[31m[sudo] password for hacker: \nAccess denied. Root access is restricted in sandbox mode.\x1b[0m`;
      } else {
        output = `\x1b[31m[sudo] Elevated privileges not available in sandbox.\x1b[0m`;
      }
      isError = true;
    } else if (toolResponses[command]) {
      output = toolResponses[command](args);
      if (output === '__CLEAR__') { setHistory([]); return; }
    } else {
      output = `\x1b[31m${command}: command not found\x1b[0m\nType 'help' for available commands.`;
      isError = true;
    }

    const newEntry = { command: trimmed, output };

    // Check challenges
    const newHistory = [...history, newEntry];
    challenges.forEach(challenge => {
      if (!completedChallenges.includes(challenge.id) && challenge.checkSolution(newHistory)) {
        setCompletedChallenges(prev => [...prev, challenge.id]);
        setTotalPoints(prev => prev + challenge.points);
        toast({
          title: `🎯 Challenge Completed: ${challenge.title}`,
          description: `+${challenge.points} points earned!`,
        });
      }
    });

    setHistory(prev => [...prev, newEntry]);
  }, [cwd, history, completedChallenges, commandHistory, totalPoints, toast]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = historyIndex + 1;
      if (newIndex < commandHistory.length) {
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple autocomplete
      const commands = [...Object.keys(toolResponses), 'help', 'challenges', 'score', 'hint', 'ls', 'cd', 'cat', 'find', 'grep'];
      const match = commands.find(c => c.startsWith(input));
      if (match) setInput(match);
    }
  };

  const renderOutput = (text: string) => {
    return text
      .replace(/\x1b\[32m/g, '<span class="text-green-400">')
      .replace(/\x1b\[33m/g, '<span class="text-yellow-400">')
      .replace(/\x1b\[31m/g, '<span class="text-red-400">')
      .replace(/\x1b\[34m/g, '<span class="text-blue-400">')
      .replace(/\x1b\[0m/g, '</span>');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Terminal className="w-8 h-8 text-green-500" /> Hacking Terminal
          </h1>
          <p className="text-muted-foreground">Sandboxed terminal with real hacking tools simulation</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm py-1 px-3">
            🏆 {totalPoints} pts
          </Badge>
          <Badge variant="outline" className="text-sm py-1 px-3">
            ✅ {completedChallenges.length}/{challenges.length}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Terminal */}
        <div className="lg:col-span-3">
          <Card className="bg-gray-950 border-green-900/50">
            <CardHeader className="py-2 px-4 bg-gray-900 border-b border-green-900/30 flex flex-row items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-green-400 text-xs font-mono ml-2">hacker@kali: {cwd}</span>
            </CardHeader>
            <CardContent className="p-0">
              <div
                ref={terminalRef}
                className="h-[500px] overflow-y-auto p-4 font-mono text-sm text-green-300 cursor-text"
                onClick={() => inputRef.current?.focus()}
              >
                {history.map((entry, i) => (
                  <div key={i} className="mb-1">
                    {entry.command && (
                      <div className="flex items-center gap-1">
                        <span className="text-green-500">hacker@kali</span>
                        <span className="text-gray-500">:</span>
                        <span className="text-blue-400">~</span>
                        <span className="text-gray-500">$</span>
                        <span className="ml-1 text-white">{entry.command}</span>
                      </div>
                    )}
                    {entry.output && (
                      <pre
                        className="whitespace-pre-wrap text-gray-300 text-xs leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: renderOutput(entry.output) }}
                      />
                    )}
                  </div>
                ))}
                {/* Input line */}
                <div className="flex items-center gap-1">
                  <span className="text-green-500">hacker@kali</span>
                  <span className="text-gray-500">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-gray-500">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 ml-1 bg-transparent text-white outline-none font-mono text-sm caret-green-400"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm flex items-center gap-1"><Lightbulb className="w-4 h-4" /> Quick Reference</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2">
              <p className="font-semibold text-muted-foreground">Recon:</p>
              <code className="block bg-muted p-1 rounded">nmap -sV target</code>
              <code className="block bg-muted p-1 rounded">nikto -h target</code>
              <p className="font-semibold text-muted-foreground mt-2">Web:</p>
              <code className="block bg-muted p-1 rounded">sqlmap -u "url" --dbs</code>
              <code className="block bg-muted p-1 rounded">gobuster dir -u url</code>
              <p className="font-semibold text-muted-foreground mt-2">Passwords:</p>
              <code className="block bg-muted p-1 rounded">hashid &lt;hash&gt;</code>
              <code className="block bg-muted p-1 rounded">john --wordlist=...</code>
              <p className="font-semibold text-muted-foreground mt-2">Wireless:</p>
              <code className="block bg-muted p-1 rounded">airmon-ng start wlan0</code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm flex items-center gap-1"><Shield className="w-4 h-4" /> Challenges</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-1">
              {challenges.map(c => (
                <div key={c.id} className={`flex items-center gap-1 p-1 rounded ${completedChallenges.includes(c.id) ? 'text-green-500' : 'text-muted-foreground'}`}>
                  {completedChallenges.includes(c.id) ? '✅' : <ChevronRight className="w-3 h-3" />}
                  <span>{c.title}</span>
                  <Badge variant="outline" className="ml-auto text-[10px] py-0">{c.points}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-yellow-500/5">
            <CardContent className="p-3 text-xs">
              <p className="font-semibold flex items-center gap-1 text-yellow-600"><Info className="w-3 h-3" /> Ethics Notice</p>
              <p className="text-muted-foreground mt-1">This is a simulation. Never use these techniques on systems without authorization.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
