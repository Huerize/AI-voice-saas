
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CallStatsPanelProps {
  title: string;
  value: string;
  change?: string;
  description?: string;
  icon: LucideIcon;
}

const CallStatsPanel = ({ title, value, change, description, icon: Icon }: CallStatsPanelProps) => {
  return (
    <div className="bg-violet-500/5 backdrop-blur-xl border border-violet-500/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <Icon className="text-violet-400 h-5 w-5" />
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-violet-200/70 mt-2">
        {change || description}
      </p>
    </div>
  );
};

export default CallStatsPanel;
