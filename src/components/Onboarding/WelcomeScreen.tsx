import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Users, School, Heart } from "lucide-react";

interface WelcomeScreenProps {
  onRoleSelect: (role: 'student' | 'teacher' | 'institution' | 'guardian') => void;
}

export const WelcomeScreen = ({ onRoleSelect }: WelcomeScreenProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 1000);
  }, []);

  const roles = [
    {
      id: 'student' as const,
      icon: GraduationCap,
      label: "I am a Student",
      description: "Begin your learning journey",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 'teacher' as const,
      icon: Users,
      label: "I am a Teacher",
      description: "Shape the future minds",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 'institution' as const,
      icon: School,
      label: "I am an Institution",
      description: "Transform education at scale",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 'guardian' as const,
      icon: Heart,
      label: "I am a Guardian",
      description: "Guide and support learning",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, hsl(var(--primary) / 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 max-w-6xl w-full"
          >
            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12"
            >
              <motion.div
                className="inline-block mb-6"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <GraduationCap className="w-20 h-20 text-primary mx-auto" />
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text-bright-sphere">
                Welcome, Dreamer.
              </h1>
              
              <motion.p
                className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                You've entered <span className="text-primary font-semibold">Edu Zambia</span> — a living learning system
              </motion.p>
              
              <motion.p
                className="text-lg text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Powered by <span className="font-semibold gradient-text-bright-sphere">BrightSphere</span>
              </motion.p>
              
              <motion.p
                className="text-base text-muted-foreground/80 mt-4 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Here, knowledge is not consumed — it evolves with you.
              </motion.p>
            </motion.div>

            {/* Role Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {roles.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    className="relative overflow-hidden cursor-pointer group h-full border-2 hover:border-primary/50 transition-all duration-300"
                    onClick={() => onRoleSelect(role.id)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative p-8 text-center space-y-4">
                      <motion.div
                        className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${role.gradient} shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <role.icon className="w-10 h-10 text-white" />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold">{role.label}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                      
                      <Button className="w-full group-hover:shadow-lg transition-shadow" variant="outline">
                        Select
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Footer */}
            <motion.p
              className="text-center text-sm text-muted-foreground mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              Powered by <span className="gradient-text-bright-sphere font-semibold">BrightSphere</span> Intelligence
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
