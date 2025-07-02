
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Home, Clock, Settings, Globe, Shield, Play, Pause, Volume2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const VirtualStudyRoomPage = () => {
  const [loading, setLoading] = useState(false);
  const [roomSettings, setRoomSettings] = useState({
    theme: 'library',
    ambiance: 'quiet',
    lighting: 'warm',
    music: 'nature'
  });
  const [timerActive, setTimerActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [currentTime, setCurrentTime] = useState(0);
  const { toast } = useToast();

  const roomThemes = ['Library', 'Forest', 'Ocean', 'Mountain', 'Coffee Shop', 'Zambian Classroom'];
  const ambianceTypes = ['Quiet', 'Nature Sounds', 'White Noise', 'Soft Music', 'Study Beats'];
  const languages = ['English', 'Bemba', 'Nyanja', 'Tonga', 'Lozi', 'Lunda', 'Kaonde', 'Luvale'];

  // AI-Powered Room Customizer
  const customizeRoom = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('comprehensive-ai-assistant', {
        body: {
          query: `Design an ECZ-focused study space with ${roomSettings.theme} theme, ${roomSettings.ambiance} ambiance, and ${roomSettings.lighting} lighting. Include culturally relevant Zambian elements and study optimization features.`,
          feature: 'room_customization',
          context: JSON.stringify(roomSettings)
        }
      });

      if (error) throw error;
      
      toast({
        title: "Room Customized",
        description: "Your ECZ study space has been personalized with AI."
      });
    } catch (error) {
      toast({
        title: "Customization Error",
        description: "Failed to customize room. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Focus Timer
  const startTimer = () => {
    setTimerActive(true);
    setCurrentTime(timerMinutes * 60);
  };

  const pauseTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setCurrentTime(0);
  };

  useEffect(() => {
    let interval;
    if (timerActive && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(currentTime - 1);
      }, 1000);
    } else if (currentTime === 0 && timerActive) {
      setTimerActive(false);
      toast({
        title: "Study Session Complete!",
        description: "Great job! Take a break before your next session."
      });
    }
    return () => clearInterval(interval);
  }, [timerActive, currentTime]);

  useEffect(() => {
    // Offline Room Cache
    const cachedSettings = localStorage.getItem('study_room_settings');
    if (cachedSettings) {
      setRoomSettings(JSON.parse(cachedSettings));
    }
  }, []);

  useEffect(() => {
    // Save to offline cache
    localStorage.setItem('study_room_settings', JSON.stringify(roomSettings));
  }, [roomSettings]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Home className="w-10 h-10 text-green-600" />
            Virtual Study Room
          </h1>
          <p className="text-lg text-gray-600">
            Simulates ECZ-focused study environments with AI-powered customization
          </p>
        </div>

        <Tabs defaultValue="customizer" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="customizer">Room Customizer</TabsTrigger>
            <TabsTrigger value="timer">Focus Timer</TabsTrigger>
            <TabsTrigger value="cache">Offline Cache</TabsTrigger>
            <TabsTrigger value="narrator">Multilingual</TabsTrigger>
            <TabsTrigger value="blocker">Distraction Blocker</TabsTrigger>
          </TabsList>

          <TabsContent value="customizer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-green-600" />
                  AI-Powered Room Customizer (Claude 3)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Room Theme</label>
                      <Select value={roomSettings.theme} onValueChange={(value) => 
                        setRoomSettings({...roomSettings, theme: value})
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roomThemes.map(theme => (
                            <SelectItem key={theme} value={theme.toLowerCase()}>{theme}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Ambiance</label>
                      <Select value={roomSettings.ambiance} onValueChange={(value) => 
                        setRoomSettings({...roomSettings, ambiance: value})
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ambianceTypes.map(ambiance => (
                            <SelectItem key={ambiance} value={ambiance.toLowerCase()}>{ambiance}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Lighting</label>
                      <Select value={roomSettings.lighting} onValueChange={(value) => 
                        setRoomSettings({...roomSettings, lighting: value})
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="warm">Warm</SelectItem>
                          <SelectItem value="cool">Cool</SelectItem>
                          <SelectItem value="natural">Natural</SelectItem>
                          <SelectItem value="bright">Bright</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Background Music</label>
                      <Select value={roomSettings.music} onValueChange={(value) => 
                        setRoomSettings({...roomSettings, music: value})
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nature">Nature Sounds</SelectItem>
                          <SelectItem value="classical">Classical</SelectItem>
                          <SelectItem value="instrumental">Instrumental</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Button onClick={customizeRoom} disabled={loading} className="w-full">
                  {loading ? 'Customizing...' : 'Customize Study Room'}
                </Button>
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Current Room Settings:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{roomSettings.theme}</Badge>
                    <Badge variant="outline">{roomSettings.ambiance}</Badge>
                    <Badge variant="outline">{roomSettings.lighting}</Badge>
                    <Badge variant="outline">{roomSettings.music}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Dynamic Focus Timer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-600 mb-4">
                    {formatTime(currentTime)}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Session Duration (minutes)</label>
                      <Slider
                        value={[timerMinutes]}
                        onValueChange={(value) => setTimerMinutes(value[0])}
                        max={120}
                        min={5}
                        step={5}
                        className="w-full"
                        disabled={timerActive}
                      />
                      <p className="text-sm text-gray-600 mt-1">{timerMinutes} minutes</p>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={startTimer} disabled={timerActive}>
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </Button>
                      <Button onClick={pauseTimer} disabled={!timerActive} variant="outline">
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                      <Button onClick={resetTimer} variant="outline">
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cache" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  Offline Room Cache
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Your room settings are automatically saved for offline access.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800">Cached Settings</h4>
                      <p className="text-2xl font-bold text-purple-600">4</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Last Sync</h4>
                      <p className="text-sm text-blue-600">Just now</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="narrator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-orange-600" />
                  Multilingual Room Narrator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Language</label>
                    <Select defaultValue="English">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map(lang => (
                          <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Listen to Room Description
                  </Button>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-800">
                      AI will describe your study room environment in your selected language
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blocker" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  AI-Powered Distraction Blocker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-l-4 border-red-500">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Social Media Block</h4>
                        <p className="text-sm text-gray-600">Block distracting websites</p>
                        <Badge className="mt-2 bg-red-100 text-red-800">Active</Badge>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-green-500">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Notification Filter</h4>
                        <p className="text-sm text-gray-600">Filter non-essential notifications</p>
                        <Badge className="mt-2 bg-green-100 text-green-800">Enabled</Badge>
                      </CardContent>
                    </Card>
                  </div>
                  <Button className="w-full">
                    Configure Distraction Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VirtualStudyRoomPage;
