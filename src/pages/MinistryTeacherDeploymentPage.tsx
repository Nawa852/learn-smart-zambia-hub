import React, { useState } from 'react';
import { Users, MapPin, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const deployments = [
  { province: 'Lusaka', needed: 18500, deployed: 17200, ratio: '1:33', status: 'adequate' },
  { province: 'Copperbelt', needed: 14500, deployed: 13800, ratio: '1:35', status: 'adequate' },
  { province: 'Southern', needed: 12000, deployed: 10500, ratio: '1:36', status: 'moderate' },
  { province: 'Central', needed: 10500, deployed: 9200, ratio: '1:38', status: 'moderate' },
  { province: 'Eastern', needed: 9800, deployed: 7600, ratio: '1:41', status: 'critical' },
  { province: 'Northern', needed: 9000, deployed: 6800, ratio: '1:44', status: 'critical' },
  { province: 'Luapula', needed: 8200, deployed: 6100, ratio: '1:43', status: 'critical' },
  { province: 'Northwestern', needed: 7200, deployed: 5800, ratio: '1:40', status: 'moderate' },
  { province: 'Western', needed: 6500, deployed: 4200, ratio: '1:52', status: 'critical' },
  { province: 'Muchinga', needed: 5500, deployed: 3800, ratio: '1:47', status: 'critical' },
];

const statusColors: Record<string, string> = {
  adequate: 'bg-green-500/10 text-green-600',
  moderate: 'bg-yellow-500/10 text-yellow-600',
  critical: 'bg-red-500/10 text-red-600',
};

const MinistryTeacherDeploymentPage = () => {
  const totalNeeded = deployments.reduce((a, d) => a + d.needed, 0);
  const totalDeployed = deployments.reduce((a, d) => a + d.deployed, 0);
  const deficit = totalNeeded - totalDeployed;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" /> Teacher Deployment
        </h1>
        <p className="text-muted-foreground mt-1">Manage teacher allocation across provinces</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-primary">{totalDeployed.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Deployed</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold">{totalNeeded.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Required</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-red-500">{deficit.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Deficit</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold">{deployments.filter(d => d.status === 'critical').length}</p>
            <p className="text-sm text-muted-foreground">Critical Provinces</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {deployments.map((d, i) => {
          const pct = (d.deployed / d.needed) * 100;
          return (
            <Card key={d.province} className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">{d.province}</p>
                      <p className="text-xs text-muted-foreground">Ratio: {d.ratio}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{d.deployed.toLocaleString()} / {d.needed.toLocaleString()}</span>
                    <Badge className={statusColors[d.status]}>{d.status}</Badge>
                    {d.status === 'critical' && (
                      <Button size="sm" variant="destructive" onClick={() => toast.success(`Transfer request created for ${d.province}`)}>
                        Request Transfer
                      </Button>
                    )}
                  </div>
                </div>
                <Progress value={pct} className="h-2" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MinistryTeacherDeploymentPage;
