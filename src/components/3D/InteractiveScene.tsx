
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Cube, Rotate3D, Move3D, ZoomIn, Play, Pause, RotateCcw, 
  Eye, Settings, Lightbulb, Atom 
} from "lucide-react";

const InteractiveScene = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentModel, setCurrentModel] = useState('atom');
  const [rotationSpeed, setRotationSpeed] = useState(1);
  
  const models = [
    { id: 'atom', name: 'Atomic Structure', icon: Atom, color: 'text-blue-500' },
    { id: 'dna', name: 'DNA Helix', icon: Rotate3D, color: 'text-green-500' },
    { id: 'molecule', name: 'Water Molecule', icon: Cube, color: 'text-purple-500' },
    { id: 'cell', name: 'Plant Cell', icon: Eye, color: 'text-emerald-500' }
  ];

  return (
    <div className="w-full space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="flex items-center">
            <Cube className="mr-2 h-6 w-6 text-zambia-copper" />
            Interactive 3D Learning Lab
          </CardTitle>
          <CardDescription>
            Explore scientific concepts through immersive 3D models and animations
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* 3D Viewport */}
          <div className="relative h-96 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center overflow-hidden">
            
            {/* Simulated 3D Scene */}
            <div className="relative w-64 h-64">
              {/* Atom Model */}
              {currentModel === 'atom' && (
                <div className="relative w-full h-full">
                  {/* Nucleus */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
                  
                  {/* Electron Orbits */}
                  <div className={`absolute inset-0 border-2 border-blue-400/30 rounded-full ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: `${3/rotationSpeed}s` }}>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                  </div>
                  
                  <div className={`absolute inset-4 border-2 border-green-400/30 rounded-full ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: `${2/rotationSpeed}s`, animationDirection: 'reverse' }}>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
                  </div>
                  
                  <div className={`absolute inset-8 border-2 border-purple-400/30 rounded-full ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: `${1.5/rotationSpeed}s` }}>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                  </div>
                </div>
              )}

              {/* DNA Model */}
              {currentModel === 'dna' && (
                <div className="relative w-full h-full">
                  <div className={`w-full h-full ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: `${4/rotationSpeed}s` }}>
                    <div className="absolute left-1/2 top-0 w-2 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2 rounded-full"></div>
                    <div className="absolute right-1/2 top-0 w-2 h-full bg-gradient-to-b from-green-500 via-emerald-500 to-teal-500 transform translate-x-1/2 rounded-full"></div>
                    
                    {/* Base pairs */}
                    {Array.from({ length: 8 }, (_, i) => (
                      <div key={i} className={`absolute left-1/2 w-20 h-1 bg-gradient-to-r from-blue-400 to-green-400 transform -translate-x-1/2 rounded-full`} style={{ top: `${12.5 * i}%`, transform: `translateX(-50%) rotate(${i * 45}deg)` }}></div>
                    ))}
                  </div>
                </div>
              )}

              {/* Molecule Model */}
              {currentModel === 'molecule' && (
                <div className="relative w-full h-full">
                  <div className={`w-full h-full ${isPlaying ? 'animate-bounce' : ''}`} style={{ animationDuration: `${2/rotationSpeed}s` }}>
                    {/* Oxygen */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg shadow-red-500/50"></div>
                    
                    {/* Hydrogen atoms */}
                    <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                    
                    {/* Bonds */}
                    <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-white/50 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                    <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-white/50 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
                  </div>
                </div>
              )}

              {/* Cell Model */}
              {currentModel === 'cell' && (
                <div className="relative w-full h-full">
                  <div className={`w-full h-full border-4 border-green-400/50 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}>
                    {/* Organelles */}
                    <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                    <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-10 h-6 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-80"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }, (_, i) => (
                <div 
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            {/* UI Overlay */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <Badge variant="secondary" className="bg-black/50 text-white border-white/20">
                3D View
              </Badge>
              <Badge variant="secondary" className="bg-black/50 text-white border-white/20">
                Real-time
              </Badge>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                
                <Button size="sm" variant="outline">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
                
                <Button size="sm" variant="outline">
                  <Settings className="h-4 w-4 mr-1" />
                  Settings
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Speed:</span>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.5"
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(Number(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm font-medium">{rotationSpeed}x</span>
              </div>
            </div>

            {/* Model Selection */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Select 3D Model:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {models.map((model) => (
                  <Button
                    key={model.id}
                    size="sm"
                    variant={currentModel === model.id ? "default" : "outline"}
                    onClick={() => setCurrentModel(model.id)}
                    className="justify-start"
                  >
                    <model.icon className={`h-4 w-4 mr-2 ${model.color}`} />
                    {model.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Current Model: {models.find(m => m.id === currentModel)?.name}</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Understand 3D structure and composition</li>
                <li>• Observe dynamic interactions</li>
                <li>• Analyze component relationships</li>
                <li>• Apply knowledge to real-world scenarios</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Interactive Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real-time 3D manipulation</li>
                <li>• Variable animation speeds</li>
                <li>• Multiple viewing angles</li>
                <li>• Detailed component labeling</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveScene;
