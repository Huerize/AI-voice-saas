
import React from 'react';
import { Bot, Brain, MessageCircle } from 'lucide-react';

const AgentStatusPanel = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">AI Response Time</span>
          <span className="text-white">98ms</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }} />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">STT Accuracy</span>
          <span className="text-white">95%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-violet-500 rounded-full" style={{ width: '95%' }} />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">TTS Quality</span>
          <span className="text-white">92%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }} />
        </div>
      </div>
      
      <div className="pt-4 border-t border-white/10">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg">
            <Bot className="h-5 w-5 text-violet-400 mb-1" />
            <span className="text-xs text-gray-400">Agent</span>
            <span className="text-sm text-white font-medium">Active</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg">
            <Brain className="h-5 w-5 text-violet-400 mb-1" />
            <span className="text-xs text-gray-400">Model</span>
            <span className="text-sm text-white font-medium">GPT-4o</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg">
            <MessageCircle className="h-5 w-5 text-violet-400 mb-1" />
            <span className="text-xs text-gray-400">Mode</span>
            <span className="text-sm text-white font-medium">Phone</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentStatusPanel;
