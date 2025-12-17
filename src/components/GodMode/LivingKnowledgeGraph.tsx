import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Network, Zap, Brain, Target, BookOpen, Sparkles, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface KnowledgeNode {
  id: string;
  name: string;
  status: 'mastered' | 'fragile' | 'missing';
  connections: string[];
  x: number;
  y: number;
}

export const LivingKnowledgeGraph = () => {
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');

  const knowledgeNodes: KnowledgeNode[] = [
    { id: '1', name: 'Algebra Basics', status: 'mastered', connections: ['2', '3'], x: 50, y: 30 },
    { id: '2', name: 'Linear Equations', status: 'mastered', connections: ['4', '5'], x: 25, y: 50 },
    { id: '3', name: 'Quadratics', status: 'fragile', connections: ['5', '6'], x: 75, y: 50 },
    { id: '4', name: 'Systems of Equations', status: 'missing', connections: ['7'], x: 15, y: 75 },
    { id: '5', name: 'Polynomials', status: 'fragile', connections: ['7', '8'], x: 50, y: 75 },
    { id: '6', name: 'Complex Numbers', status: 'missing', connections: ['8'], x: 85, y: 75 },
    { id: '7', name: 'Calculus Intro', status: 'missing', connections: [], x: 35, y: 95 },
    { id: '8', name: 'Advanced Algebra', status: 'missing', connections: [], x: 65, y: 95 },
  ];

  const statusColors = {
    mastered: { bg: 'bg-emerald-500', border: 'border-emerald-500', glow: 'shadow-emerald-500/50' },
    fragile: { bg: 'bg-amber-500', border: 'border-amber-500', glow: 'shadow-amber-500/50' },
    missing: { bg: 'bg-rose-500', border: 'border-rose-500', glow: 'shadow-rose-500/50' },
  };

  const statusLabels = {
    mastered: 'Mastered',
    fragile: 'Fragile',
    missing: 'Gap',
  };

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
              <Network className="w-6 h-6 text-white" />
            </div>
            Living Knowledge Graph
          </CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={viewMode === '2d' ? 'default' : 'outline'}
              onClick={() => setViewMode('2d')}
            >
              2D Map
            </Button>
            <Button
              size="sm"
              variant={viewMode === '3d' ? 'default' : 'outline'}
              onClick={() => setViewMode('3d')}
            >
              3D Brain
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Legend */}
        <div className="flex gap-4 mb-6">
          {Object.entries(statusLabels).map(([status, label]) => (
            <div key={status} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${statusColors[status as keyof typeof statusColors].bg}`} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        {/* Interactive Graph */}
        <div className="relative h-80 bg-gradient-to-br from-background to-muted/30 rounded-xl border border-border/50 overflow-hidden">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {knowledgeNodes.map((node) =>
              node.connections.map((targetId) => {
                const target = knowledgeNodes.find((n) => n.id === targetId);
                if (!target) return null;
                return (
                  <line
                    key={`${node.id}-${targetId}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke="currentColor"
                    strokeOpacity={0.2}
                    strokeWidth={2}
                  />
                );
              })
            )}
          </svg>

          {/* Nodes */}
          {knowledgeNodes.map((node, index) => (
            <motion.div
              key={node.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedNode(node)}
            >
              <div
                className={`w-12 h-12 rounded-full ${statusColors[node.status].bg} ${statusColors[node.status].glow} shadow-lg flex items-center justify-center transition-all hover:scale-125 ${
                  selectedNode?.id === node.id ? 'ring-4 ring-white scale-125' : ''
                }`}
              >
                <Brain className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs font-medium text-center mt-1 whitespace-nowrap">{node.name}</p>
            </motion.div>
          ))}
        </div>

        {/* Selected Node Details */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-xl border border-border/50 bg-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold flex items-center gap-2">
                  {selectedNode.name}
                  <Badge className={statusColors[selectedNode.status].bg}>
                    {statusLabels[selectedNode.status]}
                  </Badge>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedNode.status === 'missing' && 'This concept needs attention. Click to generate a micro-lesson.'}
                  {selectedNode.status === 'fragile' && 'Your understanding is shaky. Review recommended.'}
                  {selectedNode.status === 'mastered' && 'Great job! This concept is solid.'}
                </p>
              </div>
            </div>
            {selectedNode.status !== 'mastered' && (
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  Generate Micro-Lesson
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Target className="w-4 h-4" />
                  3 Practice Questions
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Real-World Example
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
