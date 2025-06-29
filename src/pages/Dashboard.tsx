
import React from 'react';
import EnhancedDashboard from '@/components/Dashboard/EnhancedDashboard';
import AIAPIStatus from '@/components/AI/AIAPIStatus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Tabs defaultValue="dashboard" className="w-full">
        <div className="container mx-auto px-4 pt-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Learning Dashboard
            </TabsTrigger>
            <TabsTrigger value="ai-status" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI System Status
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="dashboard" className="mt-0">
          <EnhancedDashboard />
        </TabsContent>
        
        <TabsContent value="ai-status" className="mt-0">
          <div className="container mx-auto px-4 pb-8">
            <AIAPIStatus />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
