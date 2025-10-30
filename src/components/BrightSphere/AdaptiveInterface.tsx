import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Palette, Moon, Sun, Zap, Eye, Volume2, Sparkles } from 'lucide-react';

export const AdaptiveInterface = () => {
  const [theme, setTheme] = useState('auto');
  const [fontSize, setFontSize] = useState([16]);
  const [animations, setAnimations] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [adaptiveMode, setAdaptiveMode] = useState(true);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-600" />
          Adaptive Interface Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Theme Mode</label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              onClick={() => setTheme('light')}
              className="flex items-center gap-2"
            >
              <Sun className="w-4 h-4" />
              Light
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              onClick={() => setTheme('dark')}
              className="flex items-center gap-2"
            >
              <Moon className="w-4 h-4" />
              Dark
            </Button>
            <Button
              variant={theme === 'auto' ? 'default' : 'outline'}
              onClick={() => setTheme('auto')}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Auto
            </Button>
          </div>
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Font Size: {fontSize[0]}px</label>
          <Slider
            value={fontSize}
            onValueChange={setFontSize}
            min={12}
            max={24}
            step={1}
            className="w-full"
          />
        </div>

        {/* Adaptive Features */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium">Adaptive Mode</span>
            </div>
            <Switch checked={adaptiveMode} onCheckedChange={setAdaptiveMode} />
          </div>
          {adaptiveMode && (
            <div className="ml-6 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
              AI adjusts interface based on your usage patterns, time of day, and performance
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Animations</span>
            </div>
            <Switch checked={animations} onCheckedChange={setAnimations} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Voice Responses</span>
            </div>
            <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
          </div>
        </div>

        {/* Learning Style Preference */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Preferred Learning Style</label>
          <div className="grid grid-cols-3 gap-2">
            <Badge variant="outline" className="justify-center py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">
              Visual
            </Badge>
            <Badge variant="outline" className="justify-center py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">
              Audio
            </Badge>
            <Badge variant="outline" className="justify-center py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">
              Interactive
            </Badge>
          </div>
        </div>

        <Button className="w-full">
          <Sparkles className="w-4 h-4 mr-2" />
          Save & Apply AI Customization
        </Button>
      </CardContent>
    </Card>
  );
};
