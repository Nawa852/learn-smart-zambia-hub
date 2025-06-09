
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, CameraOff, Smile, Frown, Meh, 
  AlertTriangle, Brain, Eye, Settings
} from 'lucide-react';

interface EmotionData {
  emotion: 'happy' | 'sad' | 'neutral' | 'frustrated' | 'confused' | 'engaged';
  confidence: number;
  timestamp: Date;
}

interface LearningAdjustment {
  type: 'pace' | 'difficulty' | 'break' | 'encouragement';
  message: string;
  action: string;
}

const EmotionDetectionSystem = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData | null>(null);
  const [emotionHistory, setEmotionHistory] = useState<EmotionData[]>([]);
  const [learningAdjustments, setLearningAdjustments] = useState<LearningAdjustment[]>([]);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const mockEmotions: EmotionData[] = [
    { emotion: 'engaged', confidence: 85, timestamp: new Date(Date.now() - 5 * 60 * 1000) },
    { emotion: 'confused', confidence: 72, timestamp: new Date(Date.now() - 3 * 60 * 1000) },
    { emotion: 'frustrated', confidence: 68, timestamp: new Date(Date.now() - 1 * 60 * 1000) },
    { emotion: 'neutral', confidence: 78, timestamp: new Date() }
  ];

  useEffect(() => {
    setEmotionHistory(mockEmotions);
    setCurrentEmotion(mockEmotions[mockEmotions.length - 1]);
  }, []);

  useEffect(() => {
    if (isEnabled && currentEmotion) {
      generateLearningAdjustments(currentEmotion);
    }
  }, [currentEmotion, isEnabled]);

  const enableEmotionDetection = async () => {
    if (!privacyConsent) {
      alert('Please provide privacy consent before enabling emotion detection.');
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsEnabled(true);
      
      // Simulate emotion detection updates
      const interval = setInterval(() => {
        const emotions: EmotionData['emotion'][] = ['happy', 'engaged', 'neutral', 'confused'];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        const newEmotion: EmotionData = {
          emotion: randomEmotion,
          confidence: Math.floor(Math.random() * 30) + 70,
          timestamp: new Date()
        };
        
        setCurrentEmotion(newEmotion);
        setEmotionHistory(prev => [...prev.slice(-9), newEmotion]);
      }, 10000);
      
      return () => clearInterval(interval);
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Camera access is required for emotion detection.');
    }
  };

  const disableEmotionDetection = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsEnabled(false);
    setCurrentEmotion(null);
  };

  const generateLearningAdjustments = (emotion: EmotionData) => {
    const adjustments: LearningAdjustment[] = [];
    
    switch (emotion.emotion) {
      case 'frustrated':
        adjustments.push({
          type: 'break',
          message: 'You seem frustrated. Taking a short break might help!',
          action: 'Suggest 5-minute break'
        });
        adjustments.push({
          type: 'difficulty',
          message: 'Let\'s try an easier explanation of this concept.',
          action: 'Reduce difficulty level'
        });
        break;
      case 'confused':
        adjustments.push({
          type: 'pace',
          message: 'You look confused. Let me slow down and explain this differently.',
          action: 'Reduce learning pace'
        });
        break;
      case 'sad':
        adjustments.push({
          type: 'encouragement',
          message: 'You\'re doing great! Learning can be challenging, but you\'re making progress.',
          action: 'Show motivational content'
        });
        break;
      case 'engaged':
        adjustments.push({
          type: 'pace',
          message: 'You\'re really focused! Let\'s keep this momentum going.',
          action: 'Maintain current pace'
        });
        break;
    }
    
    setLearningAdjustments(adjustments);
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'happy': 
      case 'engaged': return <Smile className="w-5 h-5 text-green-600" />;
      case 'sad': 
      case 'frustrated': return <Frown className="w-5 h-5 text-red-600" />;
      case 'confused': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default: return <Meh className="w-5 h-5 text-gray-600" />;
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'happy': 
      case 'engaged': return 'bg-green-100 text-green-800';
      case 'sad': 
      case 'frustrated': return 'bg-red-100 text-red-800';
      case 'confused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Eye className="w-8 h-8" />
            Emotion Detection System
          </CardTitle>
          <p className="text-green-100">
            AI-powered emotion recognition to optimize your learning experience (Opt-in)
          </p>
        </CardHeader>
      </Card>

      {/* Privacy Consent */}
      {!privacyConsent && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-600 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Privacy Consent Required</h3>
                <p className="text-sm text-yellow-700 mb-4">
                  Emotion detection uses your camera to analyze facial expressions and optimize your learning experience. 
                  Your video data is processed locally and never stored or transmitted.
                </p>
                <Button 
                  onClick={() => setPrivacyConsent(true)}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  I Consent to Emotion Detection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Control Panel */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Camera Status</h3>
              <Badge variant={isEnabled ? "default" : "outline"}>
                {isEnabled ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            
            <div className="mb-4">
              <video 
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-32 bg-gray-200 rounded-lg object-cover"
                style={{ display: isEnabled ? 'block' : 'none' }}
              />
              {!isEnabled && (
                <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <CameraOff className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            
            <Button
              onClick={isEnabled ? disableEmotionDetection : enableEmotionDetection}
              disabled={!privacyConsent}
              className="w-full"
              variant={isEnabled ? "destructive" : "default"}
            >
              {isEnabled ? (
                <>
                  <CameraOff className="w-4 h-4 mr-2" />
                  Disable Detection
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 mr-2" />
                  Enable Detection
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Current Emotion</h3>
            {currentEmotion ? (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  {getEmotionIcon(currentEmotion.emotion)}
                  <Badge className={getEmotionColor(currentEmotion.emotion)}>
                    {currentEmotion.emotion}
                  </Badge>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Confidence</span>
                    <span>{currentEmotion.confidence}%</span>
                  </div>
                  <Progress value={currentEmotion.confidence} />
                </div>
                <p className="text-sm text-gray-600">
                  Last updated: {currentEmotion.timestamp.toLocaleTimeString()}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">No emotion data available</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Learning Adjustments */}
      {learningAdjustments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              AI Learning Adjustments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {learningAdjustments.map((adjustment, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Brain className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-purple-800">{adjustment.message}</p>
                    <p className="text-sm text-purple-600">{adjustment.action}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {adjustment.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emotion History */}
      <Card>
        <CardHeader>
          <CardTitle>Emotion Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {emotionHistory.slice(-5).map((emotion, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  {getEmotionIcon(emotion.emotion)}
                  <span className="capitalize">{emotion.emotion}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {emotion.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionDetectionSystem;
