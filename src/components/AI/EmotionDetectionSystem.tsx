import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Brain, Smile, AlertTriangle } from 'lucide-react';

const EmotionDetectionSystem = () => {
  const [emotion, setEmotion] = useState('focused');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-pink-600" />
          Emotion Detection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <Smile className="w-16 h-16 mx-auto text-green-600" />
          <h3 className="text-xl font-bold">Focused & Ready</h3>
          <Badge className="bg-green-100 text-green-800">85% Confidence</Badge>
          <p className="text-sm text-gray-600">AI suggests continuing with current pace</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionDetectionSystem;