import React, { useState } from 'react';
import { Shield, Filter, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const MinistryAuditPage = () => {
  const { user } = useAuth();
  const [filterType, setFilterType] = useState('all');

  const { data: logs, isLoading } = useQuery({
    queryKey: ['audit-logs', user?.id, filterType],
    queryFn: async () => {
      let query = supabase.from('audit_logs').select('*').eq('user_id', user!.id).order('created_at', { ascending: false }).limit(100);
      if (filterType !== 'all') query = query.eq('entity_type', filterType);
      const { data } = await query;
      return data || [];
    },
    enabled: !!user,
  });

  const actionColors: Record<string, string> = {
    create: 'bg-green-500/10 text-green-600',
    update: 'bg-blue-500/10 text-blue-600',
    delete: 'bg-red-500/10 text-red-600',
    export: 'bg-orange-500/10 text-orange-600',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" /> Audit Trail
        </h1>
        <p className="text-muted-foreground mt-1">Track all actions for transparency and accountability</p>
      </div>

      <div className="flex gap-2 items-center">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="policy">Policies</SelectItem>
            <SelectItem value="school">Schools</SelectItem>
            <SelectItem value="budget">Budget</SelectItem>
            <SelectItem value="report">Reports</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : logs && logs.length > 0 ? (
          logs.map(log => (
            <Card key={log.id} className="border-none shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{log.action}</p>
                  <p className="text-xs text-muted-foreground">{log.entity_type} {log.entity_id ? `#${log.entity_id.slice(0, 8)}` : ''}</p>
                </div>
                <Badge className={actionColors[log.action.split('_')[0]] || 'bg-muted text-muted-foreground'} variant="outline">
                  {log.action}
                </Badge>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{new Date(log.created_at).toLocaleString()}</span>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card><CardContent className="p-12 text-center text-muted-foreground">No audit logs yet. Actions will be recorded as you use ministry tools.</CardContent></Card>
        )}
      </div>
    </div>
  );
};

export default MinistryAuditPage;
