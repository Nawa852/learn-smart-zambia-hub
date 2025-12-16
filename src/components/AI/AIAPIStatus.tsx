import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Brain, Globe, Mic, Eye, Shield, Zap } from 'lucide-react';

interface APIStatus {
  name: string;
  icon: React.ElementType;
  status: 'active' | 'inactive' | 'checking';
  lastChecked?: Date;
  purpose: string;
}

const AIAPIStatus = () => {
  const [apiStatuses, setApiStatuses] = useState<APIStatus[]>([
    { name: 'GPT-4o', icon: Brain, status: 'checking', purpose: 'Advanced tutoring & explanations' },
    { name: 'Claude 3', icon: Shield, status: 'checking', purpose: 'Content safety & essay grading' },
    { name: 'Qwen', icon: Globe, status: 'checking', purpose: 'Multilingual translation' },
    { name: 'Gemini', icon: Eye, status: 'checking', purpose: 'Visual learning & AR labs' },
    { name: 'DeepSeek', icon: Zap, status: 'checking', purpose: 'Predictive analytics' },
    { name: 'Whisper', icon: Mic, status: 'checking', purpose: 'Voice recognition & audio' },
    { name: 'LLaMA 3', icon: Brain, status: 'checking', purpose: 'Offline learning support' },
    { name: 'Moonshot AI', icon: Brain, status: 'checking', purpose: 'Career & scholarship matching' }
  ]);

  const [isChecking, setIsChecking] = useState(false);

  const checkAPIStatus = async () => {
    setIsChecking(true);
    
    // Simulate API checking with mock data
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock status - all active for demo
    setApiStatuses(prev => prev.map(api => ({
      ...api,
      status: 'active' as const,
      lastChecked: new Date()
    })));
    
    setIsChecking(false);
  };

  useEffect(() => {
    checkAPIStatus();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'inactive':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500 animate-pulse" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Offline</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Checking</Badge>;
    }
  };

  const activeCount = apiStatuses.filter(api => api.status === 'active').length;
  const totalCount = apiStatuses.length;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            AI Models Status Dashboard
          </CardTitle>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs">Demo Mode</Badge>
            <div className="text-sm text-muted-foreground">
              {activeCount}/{totalCount} Active
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={checkAPIStatus}
              disabled={isChecking}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${activeCount === totalCount ? 'bg-green-500' : activeCount > totalCount / 2 ? 'bg-yellow-500' : 'bg-red-500'} animate-pulse`}></div>
            <span className="font-semibold text-lg">
              System Status: {activeCount === totalCount ? 'All Systems Operational' : activeCount > totalCount / 2 ? 'Partial Service' : 'Service Degraded'}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${activeCount === totalCount ? 'bg-green-500' : activeCount > totalCount / 2 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${(activeCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apiStatuses.map((api, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <api.icon className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">{api.name}</span>
                </div>
                {getStatusIcon(api.status)}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{api.purpose}</p>
              <div className="flex items-center justify-between">
                {getStatusBadge(api.status)}
                {api.lastChecked && (
                  <span className="text-xs text-muted-foreground">
                    {api.lastChecked.toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/5 rounded-lg">
          <h3 className="font-semibold mb-2">About AI Integration</h3>
          <p className="text-sm text-muted-foreground">
            Edu Zambia integrates with 16+ AI models to provide comprehensive educational support. 
            Each model serves specific purposes from multilingual tutoring to career guidance, 
            ensuring reliable and diverse AI-powered learning experiences.
          </p>
          <p className="text-xs text-muted-foreground mt-2 italic">
            Note: This is a demo view. Connect your custom backend to enable live AI services.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAPIStatus;
