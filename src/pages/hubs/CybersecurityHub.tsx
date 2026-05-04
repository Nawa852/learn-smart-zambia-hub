import React from 'react';
import { HubPageLayout, HubTab } from '@/components/Layout/HubPageLayout';
import { Shield, Terminal, Bug, Trophy, Lock, Eye, Wifi, Globe, Layers, AlertTriangle, GraduationCap } from 'lucide-react';

const tabs: HubTab[] = [
  { id: 'overview',   label: 'Overview',     icon: Shield,         component: React.lazy(() => import('@/pages/CybersecurityDashboardPage')) },
  { id: 'skill-tree', label: 'Skill Tree',   icon: GraduationCap,  component: React.lazy(() => import('@/pages/CyberSkillTreePage')) },
  { id: 'terminal',   label: 'Terminal',     icon: Terminal,       component: React.lazy(() => import('@/pages/CyberTerminalSandboxPage')) },
  { id: 'soc',        label: 'SOC Sim',      icon: AlertTriangle,  component: React.lazy(() => import('@/pages/CyberSOCSimulatorPage')) },
  { id: 'labs',       label: 'Labs',         icon: Layers,         component: React.lazy(() => import('@/pages/CybersecurityLabsPage')) },
  { id: 'ctf',        label: 'CTF',          icon: Trophy,         component: React.lazy(() => import('@/pages/CyberCTFPage')) },
  { id: 'web',        label: 'Web Security', icon: Globe,          component: React.lazy(() => import('@/pages/CyberWebSecPage')) },
  { id: 'network',    label: 'Network',      icon: Wifi,           component: React.lazy(() => import('@/pages/CyberNetworkLabPage')) },
  { id: 'crypto',     label: 'Crypto',       icon: Lock,           component: React.lazy(() => import('@/pages/CyberCryptoPage')) },
  { id: 'forensics',  label: 'Forensics',    icon: Eye,            component: React.lazy(() => import('@/pages/CyberForensicsPage')) },
  { id: 'toolkit',    label: 'Toolkit',      icon: Layers,         component: React.lazy(() => import('@/pages/CyberToolkitPage')) },
  { id: 'videos',     label: 'Videos',       icon: Bug,            component: React.lazy(() => import('@/pages/CybersecurityVideoPage')) },
];

const CybersecurityHub = () => (
  <HubPageLayout
    title="Cybersecurity Academy"
    subtitle="Hands-on labs, CTF challenges, and structured paths from beginner to pro."
    icon={Shield}
    tabs={tabs}
    defaultTab="overview"
  />
);

export default CybersecurityHub;
