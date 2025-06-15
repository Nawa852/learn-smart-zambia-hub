import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trees, Star, Lock, CheckCircle, Brain, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface TreeNode {
  id: string;
  title: string;
  subject: string;
  level: number;
  x: number;
  y: number;
  unlocked: boolean;
  completed: boolean;
  prerequisites: string[];
  color: string;
}

const KnowledgeTree = () => {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize the knowledge tree structure
    const nodes: TreeNode[] = [
      // Foundation Level
      { id: '1', title: 'Basic Mathematics', subject: 'Math', level: 1, x: 50, y: 85, unlocked: true, completed: true, prerequisites: [], color: 'bg-green-500' },
      { id: '2', title: 'English Fundamentals', subject: 'English', level: 1, x: 30, y: 85, unlocked: true, completed: true, prerequisites: [], color: 'bg-blue-500' },
      { id: '3', title: 'Science Basics', subject: 'Science', level: 1, x: 70, y: 85, unlocked: true, completed: false, prerequisites: [], color: 'bg-purple-500' },
      
      // Intermediate Level
      { id: '4', title: 'Algebra', subject: 'Math', level: 2, x: 45, y: 65, unlocked: true, completed: false, prerequisites: ['1'], color: 'bg-green-600' },
      { id: '5', title: 'Creative Writing', subject: 'English', level: 2, x: 25, y: 65, unlocked: true, completed: false, prerequisites: ['2'], color: 'bg-blue-600' },
      { id: '6', title: 'Chemistry', subject: 'Science', level: 2, x: 75, y: 65, unlocked: false, completed: false, prerequisites: ['3'], color: 'bg-purple-600' },
      
      // Advanced Level
      { id: '7', title: 'Calculus', subject: 'Math', level: 3, x: 40, y: 45, unlocked: false, completed: false, prerequisites: ['4'], color: 'bg-green-700' },
      { id: '8', title: 'Literature Analysis', subject: 'English', level: 3, x: 20, y: 45, unlocked: false, completed: false, prerequisites: ['5'], color: 'bg-blue-700' },
      { id: '9', title: 'Organic Chemistry', subject: 'Science', level: 3, x: 80, y: 45, unlocked: false, completed: false, prerequisites: ['6'], color: 'bg-purple-700' },
      
      // Master Level
      { id: '10', title: 'Advanced Physics', subject: 'Science', level: 4, x: 50, y: 25, unlocked: false, completed: false, prerequisites: ['7', '9'], color: 'bg-yellow-600' },
      
      // AI & Future Tech
      { id: '11', title: 'AI & Machine Learning', subject: 'Technology', level: 5, x: 50, y: 10, unlocked: false, completed: false, prerequisites: ['10'], color: 'bg-gradient-to-r from-pink-500 to-purple-600' },
    ];
    
    setTreeNodes(nodes);
  }, []);

  const handleNodeClick = (node: TreeNode) => {
    if (!node.unlocked) {
      toast({
        title: "Locked Content",
        description: "Complete prerequisite courses to unlock this topic.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedNode(node);
    toast({
      title: `${node.title} Selected`,
      description: `Ready to explore ${node.subject}? Let's begin!`,
    });
  };

  const startLearning = () => {
    if (!selectedNode) return;
    
    toast({
      title: "Journey Begins! 🚀",
      description: `Starting your ${selectedNode.title} adventure!`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-6 animate-scale-in">
            <Trees className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Knowledge Tree
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Climb the tree of knowledge! Each branch unlocks new possibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tree Visualization */}
          <div className="lg:col-span-2">
            <Card className="bg-black/20 backdrop-blur-sm border-purple-500/30 shadow-2xl min-h-[600px] relative overflow-hidden">
              <CardContent className="p-0 relative">
                {/* Tree Trunk */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-32 bg-gradient-to-t from-amber-800 to-amber-600 rounded-t-lg opacity-80" />
                
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {treeNodes.map(node => 
                    node.prerequisites.map(prereqId => {
                      const prereq = treeNodes.find(n => n.id === prereqId);
                      if (!prereq) return null;
                      return (
                        <line
                          key={`${prereqId}-${node.id}`}
                          x1={`${prereq.x}%`}
                          y1={`${prereq.y}%`}
                          x2={`${node.x}%`}
                          y2={`${node.y}%`}
                          stroke="rgba(139, 92, 246, 0.5)"
                          strokeWidth="2"
                          className="animate-pulse"
                        />
                      );
                    })
                  )}
                </svg>

                {/* Tree Nodes */}
                {treeNodes.map((node) => (
                  <div
                    key={node.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                      hoveredNode === node.id ? 'scale-125 z-20' : 'scale-100 z-10'
                    }`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => handleNodeClick(node)}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 ${
                      node.completed ? 'border-green-400 bg-green-500' :
                      node.unlocked ? 'border-blue-400 bg-blue-500' :
                      'border-gray-400 bg-gray-500'
                    } hover:shadow-2xl transition-all duration-300 ${
                      selectedNode?.id === node.id ? 'ring-4 ring-yellow-400' : ''
                    }`}>
                      {node.completed ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : node.unlocked ? (
                        <Brain className="w-8 h-8 text-white" />
                      ) : (
                        <Lock className="w-8 h-8 text-white" />
                      )}
                    </div>
                    
                    {/* Node Label */}
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                        {node.title}
                      </div>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {node.subject}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Course Details Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-black/20 backdrop-blur-sm border-purple-500/30 shadow-2xl sticky top-4">
              <CardContent className="p-6">
                {selectedNode ? (
                  <div className="text-white space-y-6">
                    <div className="text-center">
                      <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${selectedNode.color}`}>
                        <Star className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">{selectedNode.title}</h3>
                      <Badge className="mt-2">{selectedNode.subject}</Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Level</h4>
                        <div className="flex items-center gap-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < selectedNode.level ? 'text-yellow-400 fill-current' : 'text-gray-400'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Status</h4>
                        <Badge variant={selectedNode.completed ? "default" : selectedNode.unlocked ? "secondary" : "destructive"}>
                          {selectedNode.completed ? "Completed" : selectedNode.unlocked ? "Available" : "Locked"}
                        </Badge>
                      </div>
                      
                      {selectedNode.prerequisites.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Prerequisites</h4>
                          <div className="space-y-1">
                            {selectedNode.prerequisites.map(prereqId => {
                              const prereq = treeNodes.find(n => n.id === prereqId);
                              return prereq ? (
                                <div key={prereqId} className="text-sm text-purple-200">
                                  • {prereq.title}
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      onClick={startLearning}
                      disabled={!selectedNode.unlocked}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {selectedNode.completed ? "Review Course" : "Start Learning"}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-purple-200 py-12">
                    <Trees className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Click on a node in the tree to explore that topic!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeTree;
