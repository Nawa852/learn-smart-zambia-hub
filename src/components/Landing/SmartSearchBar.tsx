import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Sparkles, ArrowRight, FileText, BarChart3, 
  BookOpen, Calendar, Brain, Zap, Command
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const exampleQueries = [
  { icon: BarChart3, text: 'Show top performing schools in Lusaka this month', category: 'Analytics' },
  { icon: BookOpen, text: 'Generate weekly lesson plan for grade 9 mathematics', category: 'Content' },
  { icon: Calendar, text: 'Suggest volunteer programs in rural health', category: 'Opportunities' },
  { icon: FileText, text: 'Recommend upskilling courses for nurses', category: 'Learning' },
];

const quickActions = [
  { icon: FileText, label: 'Generate Report', color: 'from-blue-500 to-indigo-600' },
  { icon: Brain, label: 'AI Tutoring', color: 'from-purple-500 to-violet-600' },
  { icon: Calendar, label: 'Create Schedule', color: 'from-emerald-500 to-green-600' },
  { icon: BarChart3, label: 'View Analytics', color: 'from-amber-500 to-orange-600' },
];

const SmartSearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedExample, setSelectedExample] = useState<number | null>(null);

  const handleExampleClick = (example: typeof exampleQueries[0]) => {
    setQuery(example.text);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
      
      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Command className="w-4 h-4" />
            AI Command Center
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Ask BrightSphere Anything
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Natural language queries across all sectors — generate reports, dashboards, or learning paths instantly
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className={`relative bg-card rounded-2xl border-2 transition-all duration-300 shadow-2xl ${
            isFocused ? 'border-primary shadow-primary/20' : 'border-border'
          }`}>
            {/* Input */}
            <div className="flex items-center p-4 gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder="Ask anything... 'Show me learning progress for Eastern Province'"
                className="flex-1 bg-transparent text-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              
              <Button 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-lg px-6"
                disabled={!query.trim()}
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>

            {/* Expanded Panel */}
            <AnimatePresence>
              {isFocused && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border overflow-hidden"
                >
                  <div className="p-6">
                    {/* Example Queries */}
                    <div className="mb-6">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                        Try asking
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {exampleQueries.map((example, idx) => (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => handleExampleClick(example)}
                            onMouseEnter={() => setSelectedExample(idx)}
                            onMouseLeave={() => setSelectedExample(null)}
                            className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
                              selectedExample === idx 
                                ? 'bg-primary/10 border border-primary/30' 
                                : 'bg-muted/50 hover:bg-muted border border-transparent'
                            }`}
                          >
                            <example.icon className="w-5 h-5 text-primary flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground truncate">{example.text}</p>
                              <p className="text-xs text-muted-foreground">{example.category}</p>
                            </div>
                            <ArrowRight className={`w-4 h-4 text-primary transition-transform ${
                              selectedExample === idx ? 'translate-x-1' : ''
                            }`} />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                        Quick AI Actions
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {quickActions.map((action, idx) => (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + idx * 0.05 }}
                            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-200"
                          >
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                              <action.icon className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-medium text-foreground">{action.label}</span>
                            <Zap className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Keyboard shortcut hint */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            Press <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">Ctrl</kbd> + <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">K</kbd> to open anywhere
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SmartSearchBar;
