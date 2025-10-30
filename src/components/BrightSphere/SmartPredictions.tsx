import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Bell, CheckCircle } from 'lucide-react';

export const SmartPredictions = () => {
  const predictions = [
    {
      type: 'quiz',
      message: "You have a Physics quiz tomorrow. Shall I prepare revision notes?",
      confidence: 95,
      actions: ['Prepare Notes', 'Start Quiz Prep', 'Remind Me Later']
    },
    {
      type: 'assignment',
      message: "Math assignment due in 3 days. Based on your schedule, best time to work on it is tomorrow 8-10 AM.",
      confidence: 88,
      actions: ['Add to Calendar', 'View Assignment', 'Dismiss']
    },
    {
      type: 'study',
      message: "You learn best at 7:15 AM. Would you like me to schedule your study sessions then?",
      confidence: 92,
      actions: ['Auto-Schedule', 'Customize', 'No Thanks']
    },
    {
      type: 'weakness',
      message: "Detected struggle with Algebra word problems. I can create a focused practice set.",
      confidence: 85,
      actions: ['Generate Practice', 'Watch Tutorial', 'Get Tutor Help']
    }
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          Smart Predictions
          <Badge variant="secondary" className="ml-auto">AI-Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {predictions.map((prediction, index) => (
          <Card key={index} className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="w-4 h-4 text-purple-600" />
                    <Badge variant="outline" className="text-xs">
                      {prediction.confidence}% Confidence
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{prediction.message}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {prediction.actions.map((action, actionIndex) => (
                  <Button key={actionIndex} size="sm" variant={actionIndex === 0 ? "default" : "outline"}>
                    {actionIndex === 0 && <CheckCircle className="w-3 h-3 mr-1" />}
                    {action}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};
