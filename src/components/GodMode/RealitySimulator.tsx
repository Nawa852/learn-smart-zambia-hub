import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Tractor, Crown, Stethoscope, Play, Pause, FastForward, RotateCcw, TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface SimulationMetric {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

interface Simulation {
  id: string;
  title: string;
  icon: any;
  description: string;
  color: string;
  metrics: SimulationMetric[];
  decisions: string[];
}

export const RealitySimulator = () => {
  const [activeSimulation, setActiveSimulation] = useState<Simulation | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [day, setDay] = useState(1);
  const [lastDecision, setLastDecision] = useState<string | null>(null);

  const simulations: Simulation[] = [
    {
      id: 'company',
      title: 'Run a Company',
      icon: Building2,
      description: 'Make executive decisions and grow your startup',
      color: 'from-blue-500 to-indigo-600',
      metrics: [
        { name: 'Revenue', value: 50000, trend: 'up', unit: '$' },
        { name: 'Employees', value: 12, trend: 'stable', unit: '' },
        { name: 'Satisfaction', value: 78, trend: 'up', unit: '%' },
        { name: 'Market Share', value: 3, trend: 'up', unit: '%' },
      ],
      decisions: ['Hire new developers', 'Launch marketing campaign', 'Pivot product strategy', 'Seek investor funding'],
    },
    {
      id: 'farm',
      title: 'Manage a Farm',
      icon: Tractor,
      description: 'Agricultural decision-making and resource management',
      color: 'from-emerald-500 to-green-600',
      metrics: [
        { name: 'Crop Yield', value: 2500, trend: 'stable', unit: 'kg' },
        { name: 'Water Level', value: 65, trend: 'down', unit: '%' },
        { name: 'Soil Health', value: 82, trend: 'up', unit: '%' },
        { name: 'Profit', value: 15000, trend: 'up', unit: '$' },
      ],
      decisions: ['Plant new crops', 'Install irrigation', 'Buy fertilizer', 'Hire seasonal workers'],
    },
    {
      id: 'country',
      title: 'Govern a Country',
      icon: Crown,
      description: 'Political leadership and national policy decisions',
      color: 'from-amber-500 to-orange-600',
      metrics: [
        { name: 'GDP', value: 450, trend: 'up', unit: 'B$' },
        { name: 'Approval', value: 52, trend: 'down', unit: '%' },
        { name: 'Unemployment', value: 6.5, trend: 'stable', unit: '%' },
        { name: 'Education', value: 78, trend: 'up', unit: '/100' },
      ],
      decisions: ['Increase education budget', 'Lower taxes', 'Build infrastructure', 'Strengthen healthcare'],
    },
    {
      id: 'hospital',
      title: 'Diagnose Patients',
      icon: Stethoscope,
      description: 'Medical decision-making and patient care',
      color: 'from-rose-500 to-red-600',
      metrics: [
        { name: 'Patients Treated', value: 45, trend: 'up', unit: '' },
        { name: 'Success Rate', value: 94, trend: 'up', unit: '%' },
        { name: 'Wait Time', value: 25, trend: 'down', unit: 'min' },
        { name: 'Resources', value: 72, trend: 'stable', unit: '%' },
      ],
      decisions: ['Order more tests', 'Prescribe medication', 'Refer to specialist', 'Emergency surgery'],
    },
  ];

  const makeDecision = (decision: string) => {
    setLastDecision(decision);
    setDay((prev) => prev + 1);
    // In a real app, this would update metrics based on the decision
  };

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          Reality-Based Simulators
          <Badge className="ml-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Full Simulation
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!activeSimulation ? (
          <div className="grid grid-cols-2 gap-4">
            {simulations.map((sim) => (
              <motion.div
                key={sim.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-xl bg-gradient-to-br ${sim.color} cursor-pointer text-white`}
                onClick={() => setActiveSimulation(sim)}
              >
                <sim.icon className="w-10 h-10 mb-3" />
                <h3 className="font-bold text-lg">{sim.title}</h3>
                <p className="text-sm opacity-90 mt-1">{sim.description}</p>
                <Button className="mt-4 bg-white/20 hover:bg-white/30 text-white border-0">
                  <Play className="w-4 h-4 mr-2" />
                  Start Simulation
                </Button>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Simulation Header */}
            <div className={`p-4 rounded-xl bg-gradient-to-br ${activeSimulation.color} text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <activeSimulation.icon className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold text-lg">{activeSimulation.title}</h3>
                    <p className="text-sm opacity-90">Day {day}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                    onClick={() => setIsRunning(!isRunning)}
                  >
                    {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                    onClick={() => {
                      setDay(1);
                      setLastDecision(null);
                    }}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-4 gap-3">
              {activeSimulation.metrics.map((metric, i) => (
                <div key={i} className="p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">{metric.name}</span>
                    {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                    {metric.trend === 'down' && <TrendingDown className="w-4 h-4 text-rose-500" />}
                    {metric.trend === 'stable' && <div className="w-4 h-0.5 bg-muted-foreground" />}
                  </div>
                  <p className="text-xl font-bold">
                    {metric.unit === '$' && '$'}
                    {metric.value.toLocaleString()}
                    {metric.unit !== '$' && metric.unit}
                  </p>
                </div>
              ))}
            </div>

            {/* Last Decision Feedback */}
            {lastDecision && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Decision Impact: {lastDecision}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      AI is calculating the ripple effects of your decision...
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Decision Options */}
            <div className="space-y-3">
              <h4 className="font-semibold">What will you do?</h4>
              <div className="grid grid-cols-2 gap-2">
                {activeSimulation.decisions.map((decision, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="h-auto py-3 justify-start"
                    onClick={() => makeDecision(decision)}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                    {decision}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setActiveSimulation(null)}
            >
              Exit Simulation
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
