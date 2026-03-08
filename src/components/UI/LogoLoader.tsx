import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import loadingLogo from "@/assets/loading-logo.svg";

interface LogoLoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const sizeConfig = {
  sm: { logo: 40, container: 64, ring: 72, dots: 80 },
  md: { logo: 56, container: 88, ring: 100, dots: 112 },
  lg: { logo: 80, container: 120, ring: 136, dots: 152 },
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
  const dotCount = 8;
  const dotRadius = s.dots / 2;
  const [tipIndex, setTipIndex] = useState(() => Math.floor(Math.random() * STUDY_TIPS.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(i => (i + 1) % STUDY_TIPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-[200px] w-full">
      <div className="relative" style={{ width: s.dots, height: s.dots }}>
        {/* Ambient glow */}
        <motion.div
          className="absolute rounded-full bg-primary/15 blur-2xl"
          style={{
            width: s.ring + 20,
            height: s.ring + 20,
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Outer spinning ring */}
        <motion.div
          className="absolute border-2 border-primary/20 rounded-full"
          style={{
            width: s.ring,
            height: s.ring,
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.6)]"
            style={{ top: -6, left: '50%', x: '-50%' }}
          />
        </motion.div>

        {/* Inner counter-spinning ring */}
        <motion.div
          className="absolute border border-primary/10 rounded-full"
          style={{
            width: s.ring - 16,
            height: s.ring - 16,
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-primary/50"
            style={{ top: -4, left: '50%', x: '-50%' }}
          />
        </motion.div>

        {/* Orbiting dots */}
        {Array.from({ length: dotCount }).map((_, i) => {
          const angle = (360 / dotCount) * i;
          const delay = (i / dotCount) * 1.5;
          return (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
              style={{ top: '50%', left: '50%' }}
              animate={{
                x: [
                  Math.cos(((angle) * Math.PI) / 180) * dotRadius - 3,
                  Math.cos(((angle + 360) * Math.PI) / 180) * dotRadius - 3,
                ],
                y: [
                  Math.sin(((angle) * Math.PI) / 180) * dotRadius - 3,
                  Math.sin(((angle + 360) * Math.PI) / 180) * dotRadius - 3,
                ],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                x: { duration: 6, repeat: Infinity, ease: "linear" },
                y: { duration: 6, repeat: Infinity, ease: "linear" },
                opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay },
                scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay },
              }}
            />
          );
        })}

        {/* Center container with logo */}
        <motion.div
          className="absolute bg-card rounded-2xl shadow-lg border border-border/50 flex items-center justify-center overflow-hidden"
          style={{
            width: s.container,
            height: s.container,
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
          }}
          animate={{
            scale: [1, 1.04, 1],
            boxShadow: [
              '0 0 0 0 hsl(var(--primary) / 0)',
              '0 0 20px 4px hsl(var(--primary) / 0.15)',
              '0 0 0 0 hsl(var(--primary) / 0)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.img
            src={loadingLogo}
            alt="Loading"
            style={{ width: s.logo, height: s.logo }}
            className="relative z-10"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Loading text with animated dots */}
      {text && (
        <div className="flex items-center gap-1">
          <motion.p
            className="text-sm text-muted-foreground font-medium"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {text}
          </motion.p>
          <span className="flex gap-0.5">
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="w-1 h-1 rounded-full bg-primary"
                animate={{ opacity: [0, 1, 0], y: [0, -3, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </span>
        </div>
      )}

      {/* Rotating study tips */}
      <motion.p
        key={tipIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="text-xs text-muted-foreground/70 max-w-xs text-center italic"
      >
        💡 {STUDY_TIPS[tipIndex]}
      </motion.p>
    </div>
  );
}
