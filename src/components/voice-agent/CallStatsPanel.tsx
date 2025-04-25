
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CallStatsPanelProps {
  title: string;
  value: string;
  change?: string;
  description?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  isLoading?: boolean;
}

const CallStatsPanel = ({ 
  title, 
  value, 
  change, 
  description, 
  icon: Icon,
  variant = 'default',
  isLoading = false
}: CallStatsPanelProps) => {
  const variantStyles = {
    default: 'bg-violet-500/5 border-violet-500/10 [&_svg]:text-violet-400',
    success: 'bg-green-500/5 border-green-500/10 [&_svg]:text-green-400',
    warning: 'bg-amber-500/5 border-amber-500/10 [&_svg]:text-amber-400',
    danger: 'bg-red-500/5 border-red-500/10 [&_svg]:text-red-400',
  };

  return (
    <div className={cn(
      "backdrop-blur-xl border rounded-xl p-6",
      variantStyles[variant],
      isLoading && "animate-pulse"
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-violet-200/70 mt-2">
        {change || description}
      </p>
    </div>
  );
};

export default CallStatsPanel;
