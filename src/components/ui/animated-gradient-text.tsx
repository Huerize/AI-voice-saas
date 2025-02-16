
import { cn } from "@/lib/utils";
import React from "react";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <div className={cn("inline-flex items-center text-sm font-medium", className)}>
      {children}
    </div>
  );
}
