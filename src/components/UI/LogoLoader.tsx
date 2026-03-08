import { motion } from "framer-motion";
import loadingLogo from "@/assets/loading-logo.svg";

interface LogoLoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const sizes = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-32 h-32",
};

export function LogoLoader({ size = "md", text }: LogoLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[200px] w-full">
      <div className="relative">
        {/* Glow ring */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-primary/20 blur-xl`}
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Spinning logo */}
        <motion.img
          src={loadingLogo}
          alt="Loading"
          className={`${sizes[size]} relative z-10 drop-shadow-[0_0_15px_hsl(var(--primary)/0.5)]`}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      {text && (
        <motion.p
          className="text-sm text-muted-foreground font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
