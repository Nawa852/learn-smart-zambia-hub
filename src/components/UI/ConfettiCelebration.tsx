import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  delay: number;
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(142 76% 36%)',
  'hsl(45 93% 47%)',
  'hsl(262 83% 58%)',
  'hsl(346 77% 49%)',
  'hsl(199 89% 48%)',
];

export function ConfettiCelebration({ trigger, duration = 3000 }: { trigger: boolean; duration?: number }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    const newPieces: ConfettiPiece[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      rotation: Math.random() * 360,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.5,
    }));
    setPieces(newPieces);
    setActive(true);
    const timer = setTimeout(() => { setActive(false); setPieces([]); }, duration);
    return () => clearTimeout(timer);
  }, [trigger, duration]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: '-10vh', rotate: 0, opacity: 1 }}
          animate={{
            y: '110vh',
            rotate: p.rotation + 720,
            x: `${p.x + (Math.random() - 0.5) * 20}vw`,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 2.5 + Math.random(), delay: p.delay, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}
