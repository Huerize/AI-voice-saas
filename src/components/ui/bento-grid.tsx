
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
}

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>
      {children}
    </div>
  );
};

interface BentoCardProps {
  className?: string;
  Icon?: any;
  name: string;
  description: string;
  background?: React.ReactNode;
  cta?: string;
  href?: string;
}

export const BentoCard = ({
  className,
  Icon,
  name,
  description,
  background,
  cta,
  href,
}: BentoCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-white/20",
        className
      )}
    >
      {background}
      <div className="relative z-10">
        {Icon && <Icon className="h-6 w-6 text-white/80 mb-4" />}
        <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
        <p className="text-sm text-gray-400">{description}</p>
        {cta && href && (
          <a
            href={href}
            className="inline-block mt-4 text-sm text-white/80 hover:text-white transition-colors"
          >
            {cta} →
          </a>
        )}
      </div>
    </motion.div>
  );
};
