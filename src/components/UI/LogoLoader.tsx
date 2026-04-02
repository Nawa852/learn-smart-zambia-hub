import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import eduLogo from "@/assets/edu-zambia-mark.png";

interface LogoLoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const sizeConfig = {
  sm: { logo: 32, container: 56, ring: 64 },
  md: { logo: 48, container: 76, ring: 88 },
  lg: { logo: 64, container: 96, ring: 112 },
};

const STUDY_TIPS = [
  "Did you know? Spaced repetition improves retention by 200%",
  "Tip: Teaching others is the best way to learn",
  "Try the Pomodoro technique — 25 min focus, 5 min break",
  "Active recall beats re-reading by 150%",
  "Short study sessions are more effective than cramming",
  "Your brain consolidates memories during sleep",
  "Taking notes by hand boosts comprehension",
  "Exercise before studying improves focus and memory",
];

export function LogoLoader({ size = "md", text }: LogoLoaderProps) {
  const s = sizeConfig[size];
  const [tipIndex, setTipIndex] = useState(() => Math.floor(Math.random() * STUDY_TIPS.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(i => (i + 1) % STUDY_TIPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-[180px] w-full">
      <div className="relative" style={{ width: s.ring + 16, height: s.ring + 16 }}>
        {/* Ambient glow */}
        <motion.div
          className="absolute rounded-full bg-primary/10 blur-2xl"
          style={{ width: s.ring + 24, height: s.ring + 24, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Spinning ring */}
        <motion.div
          className="absolute border-2 border-primary/20 rounded-full"
          style={{ width: s.ring, height: s.ring, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
            style={{ top: -5, left: '50%', x: '-50%' }}
          />
        </motion.div>

        {/* Center logo */}
        <motion.div
          className="absolute bg-card rounded-2xl shadow-lg border border-border/50 flex items-center justify-center overflow-hidden"
          style={{ width: s.container, height: s.container, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
          animate={{
            scale: [1, 1.03, 1],
            boxShadow: [
              '0 0 0 0 hsl(var(--primary) / 0)',
              '0 0 16px 3px hsl(var(--primary) / 0.12)',
              '0 0 0 0 hsl(var(--primary) / 0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={eduLogo} alt="Loading" style={{ width: s.logo, height: s.logo }} className="relative z-10 rounded-lg" />
        </motion.div>
      </div>

      {text && (
        <motion.p
          className="text-sm text-muted-foreground font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}

      <motion.p
        key={tipIndex}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-muted-foreground/60 max-w-xs text-center"
      >
        💡 {STUDY_TIPS[tipIndex]}
      </motion.p>
    </div>
  );
}
