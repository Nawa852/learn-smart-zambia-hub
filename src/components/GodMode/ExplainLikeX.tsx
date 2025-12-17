import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MessageSquare, Baby, Cross, Wrench, Store, Tractor, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Persona {
  id: string;
  name: string;
  icon: any;
  description: string;
  color: string;
}

export const ExplainLikeX = () => {
  const [topic, setTopic] = useState('Quantum Entanglement');
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const personas: Persona[] = [
    { id: 'child', name: 'A 7-year-old', icon: Baby, description: 'Simple words, fun examples', color: 'from-pink-500 to-rose-500' },
    { id: 'priest', name: 'A Priest', icon: Cross, description: 'Spiritual metaphors', color: 'from-purple-500 to-indigo-500' },
    { id: 'engineer', name: 'An Engineer', icon: Wrench, description: 'Technical precision', color: 'from-blue-500 to-cyan-500' },
    { id: 'vendor', name: 'A Street Vendor', icon: Store, description: 'Street-smart wisdom', color: 'from-amber-500 to-orange-500' },
    { id: 'farmer', name: 'A Zambian Farmer', icon: Tractor, description: 'Agricultural analogies', color: 'from-emerald-500 to-green-500' },
  ];

  const mockExplanations: Record<string, string> = {
    child: "Imagine you have two magic toys that are best friends! When you spin one toy, the other toy spins too - even if it's super far away! It's like they can feel each other, even from your house to grandma's house! Scientists call this 'quantum entanglement' which is a fancy way of saying 'magic friendship between tiny tiny things'! 🌟",
    priest: "Consider two souls bound by divine providence - though separated by vast distances, they remain spiritually connected. Just as the faithful remain united through prayer across the world, entangled particles share a sacred bond that transcends physical space. It is as if God has woven an invisible thread connecting them, a testament to the interconnected nature of His creation.",
    engineer: "Quantum entanglement is a phenomenon where two particles become correlated such that the quantum state of one particle instantaneously influences the state of the other, regardless of the distance separating them. This violates classical locality principles but is mathematically described by the tensor product of Hilbert spaces. The correlation coefficient exceeds Bell's inequality bounds, confirming non-local hidden variables.",
    vendor: "Eh boss, imagine you're selling same same tomatoes at two markets - Soweto and City Market! When price go up here, price go up there same time - no phone call, no WhatsApp, nothing! That's how these tiny particles work ba! They just KNOW what the other one is doing. It's like market telepathy for atoms!",
    farmer: "You know how when you plant maize, and the rain falls in Chipata, somehow the crops in Mongu also know the season has started? These quantum particles are like that - they're like seeds from the same cob. When you do something to one, the other feels it immediately, like how all your cows come home when you call just one. They share the same spirit, these particles.",
  };

  const generateExplanation = () => {
    if (!selectedPersona) return;
    setIsGenerating(true);
    setTimeout(() => {
      setExplanation(mockExplanations[selectedPersona.id]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          One-Click "Explain Like X"
          <Badge className="ml-auto bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            Infinite Perspectives
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Topic Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Topic to Explain</label>
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter any concept..."
            className="text-lg font-semibold"
          />
        </div>

        {/* Persona Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Explain it like...</label>
          <div className="grid grid-cols-5 gap-2">
            {personas.map((persona) => (
              <motion.div
                key={persona.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-xl cursor-pointer text-center transition-all ${
                  selectedPersona?.id === persona.id
                    ? `bg-gradient-to-br ${persona.color} text-white shadow-lg`
                    : 'bg-muted/50 hover:bg-muted'
                }`}
                onClick={() => {
                  setSelectedPersona(persona);
                  setExplanation(null);
                }}
              >
                <persona.icon className="w-8 h-8 mx-auto mb-2" />
                <p className="text-xs font-medium">{persona.name}</p>
              </motion.div>
            ))}
          </div>
          {selectedPersona && (
            <p className="text-xs text-muted-foreground text-center">
              {selectedPersona.description}
            </p>
          )}
        </div>

        {/* Generate Button */}
        <Button
          className="w-full gap-2"
          size="lg"
          onClick={generateExplanation}
          disabled={!selectedPersona || isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Perspective...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Explanation
            </>
          )}
        </Button>

        {/* Generated Explanation */}
        <AnimatePresence>
          {explanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 rounded-xl bg-gradient-to-br ${selectedPersona?.color} text-white`}
            >
              <div className="flex items-start gap-3">
                {selectedPersona && <selectedPersona.icon className="w-8 h-8 flex-shrink-0 mt-1" />}
                <div>
                  <h4 className="font-bold mb-2">
                    "{topic}" explained like {selectedPersona?.name}
                  </h4>
                  <p className="text-sm leading-relaxed opacity-95">{explanation}</p>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4 bg-white/20 hover:bg-white/30 text-white border-0"
                onClick={() => {
                  setExplanation(null);
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Different Perspective
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Tips */}
        <div className="text-xs text-muted-foreground text-center">
          Same concept, infinite mental models. Understanding comes from seeing things from multiple angles!
        </div>
      </CardContent>
    </Card>
  );
};
