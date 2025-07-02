
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Home, Clock, Volume2, Palette, Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const VirtualStudyRoomPage = () => {
  const [roomTheme, setRoomTheme] = useState('zambian-nature');
  const [focusTimer, setFocusTimer] = useState(25);
  const [isStudying, setIsStudying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [ambientSound, setAmbientSound] = useState('birds');
  const { toast } = useToast();

  const roomThemes = [
    { id: 'zambian-nature', name: 'Zambian Nature', description: 'Victoria Falls ambiance' },
    { id: 'library', name: 'Traditional Library', description: 'Classic study environment' },
    { id: 'café', name: 'Coffee Shop', description: 'Casual study atmosphere' },
    { id: 'minimal', name: 'Minimal White', description: 'Clean, distraction-free' }
  ];

  const ambientSounds = [
    { id: 'birds', name: 'African Birds', description: 'Zambian wildlife sounds' },
    { id: 'rain', name: 'Gentle Rain', description: 'Tropical rainfall' },
    { id: 'silence', name: 'Pure Silence', description: 'Complete quiet' },
    { id: 'nature', name: 'Forest Sounds', description: 'Natural ambiance' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStudying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsStudying(false);
            toast({
              title: "Study Session Complete!",
              description: "Great work! Time for a break.",
            });
            return focusTimer * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStudying, timeRemaining, focusTimer]);

  const startStudySession = async () => {
    try {
      const { data } = await supabase.functions.invoke('comprehensive-ai-assistant', {
        body: {
          query: `Start a focused ECZ study session with ${roomTheme} theme and ${ambientSound} sounds`,
          feature: 'virtual_study_room',
          context: 'ECZ-focused study environment with Zambian cultural elements'
        }
      });

      setIsStudying(true);
      setTimeRemaining(focusTimer * 60);
      
      toast({
        title: "Study Session Started",
        description: `${focusTimer} minute ECZ study session with ${roomTheme} theme`,
      });
    } catch (error) {
      console.error('Error starting study session:', error);
      setIsStudying(true);
      setTimeRemaining(focusTimer * 60);
    }
  };

  const stopStudySession = () => {
    setIsStudying(false);
    setTimeRemaining(focusTimer * 60);
    toast({
      title: "Study Session Ended",
      description: "Session stopped. Ready for your next study period!",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const features = [
    {
      title: "AI-Powered Room Customizer",
      description: "Designs ECZ study spaces with Zambian themes",
      icon: Home,
      color: "blue"
    },
    {
      title: "Dynamic Focus Timer",
      description: "Sets ECZ study intervals with branching feedback",
      icon: Clock,
      color: "green"
    },
    {
      title: "Offline Room Cache",
      description: "Stores settings for offline rural access",
      icon: Shield,
      color: "purple"
    },
    {
      title: "Multilingual Room Narrator",
      description: "Narrates in 7 Zambian languages",
      icon: Volume2,
      color: "orange"
    },
    {
      title: "AI-Powered Distraction Blocker",
      description: "Minimizes distractions during study",
      icon: Palette,
      color: "red"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🇿🇲 Virtual Study Room
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ECZ-focused study environments with Zambian cultural themes and AI-powered focus tools
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="secondary">ECZ Aligned</Badge>
            <Badge variant="secondary">Zambian Themes</Badge>
            <Badge variant="secondary">Focus Timer</Badge>
            <Badge variant="secondary">Offline Ready</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Study Timer */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-6 h-6 text-green-600" />
                  ECZ Focus Timer
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="text-8xl font-mono font-bold text-green-600">
                  {formatTime(timeRemaining)}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Session Duration (minutes)</label>
                    <Slider
                      value={[focusTimer]}
                      onValueChange={(value) => {
                        setFocusTimer(value[0]);
                        if (!isStudying) setTimeRemaining(value[0] * 60);
                      }}
                      max={120}
                      min={5}
                      step={5}
                      className="mt-2"
                      disabled={isStudying}
                    />
                    <div className="text-sm text-gray-500 mt-1">{focusTimer} minutes</div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    {!isStudying ? (
                      <Button onClick={startStudySession} size="lg" className="px-8">
                        Start ECZ Study Session
                      </Button>
                    ) : (
                      <Button onClick={stopStudySession} variant="destructive" size="lg" className="px-8">
                        End Session
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Room Customization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-6 h-6 text-blue-600" />
                  Study Environment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="themes" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="themes">Room Themes</TabsTrigger>
                    <TabsTrigger value="sounds">Ambient Sounds</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="themes" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {roomThemes.map((theme) => (
                        <div
                          key={theme.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            roomTheme === theme.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setRoomTheme(theme.id)}
                        >
                          <h4 className="font-semibold">{theme.name}</h4>
                          <p className="text-sm text-gray-600">{theme.description}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="sounds" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ambientSounds.map((sound) => (
                        <div
                          key={sound.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            ambientSound === sound.id
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setAmbientSound(sound.id)}
                        >
                          <h4 className="font-semibold">{sound.name}</h4>
                          <p className="text-sm text-gray-600">{sound.description}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Features & Status */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current Theme</span>
                  <Badge variant="secondary">{roomThemes.find(t => t.id === roomTheme)?.name}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ambient Sound</span>
                  <Badge variant="outline">{ambientSounds.find(s => s.id === ambientSound)?.name}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status</span>
                  <Badge variant={isStudying ? "default" : "secondary"}>
                    {isStudying ? 'Studying' : 'Ready'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Focus Level</span>
                  <Badge variant="default">{isStudying ? 'High' : 'Normal'}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, idx) => (
                  <div key={idx} className={`p-3 border-l-4 border-l-${feature.color}-500 bg-${feature.color}-50 rounded`}>
                    <div className="flex items-center gap-2 mb-1">
                      <feature.icon className={`w-4 h-4 text-${feature.color}-600`} />
                      <h4 className="font-semibold text-sm">{feature.title}</h4>
                    </div>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualStudyRoomPage;
