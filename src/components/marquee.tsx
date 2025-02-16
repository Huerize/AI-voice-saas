
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MarqueeProps {
  className?: string;
  pauseOnHover?: boolean;
  children: React.ReactNode;
}

export const Marquee = ({ className, pauseOnHover = true, children }: MarqueeProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        pauseOnHover && "[--pause-on-hover:paused] hover:[animation-play-state:var(--pause-on-hover)]",
        className
      )}
    >
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-4 whitespace-nowrap"
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};
