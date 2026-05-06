import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/components/Auth/AuthProvider';
import JitsiRoom from '@/components/Video/JitsiRoom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GroupVideoPage: React.FC = () => {
  const { groupId } = useParams();
  const { user } = useAuth();
  const code = `nexus-group-${groupId}`;
  return (
    <Card>
      <CardHeader><CardTitle>Group Video Call</CardTitle></CardHeader>
      <CardContent>
        <JitsiRoom roomCode={code} displayName={user?.email || 'Member'} height={600} />
      </CardContent>
    </Card>
  );
};

export default GroupVideoPage;
