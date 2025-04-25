
import React from 'react';
import { availableVoices } from '@/services/ttsService';
import { Check, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceSelectorProps {
  selectedVoiceId: string;
  onSelectVoice: (voiceId: string) => void;
  className?: string;
}

const VoiceSelector = ({ selectedVoiceId, onSelectVoice, className }: VoiceSelectorProps) => {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", className)}>
      {availableVoices.map((voice) => (
        <button
          key={voice.id}
          onClick={() => onSelectVoice(voice.id)}
          className={cn(
            "flex flex-col items-center p-4 rounded-lg border transition-all",
            selectedVoiceId === voice.id
              ? "bg-violet-500/20 border-violet-400/50"
              : "bg-white/5 border-white/10 hover:bg-white/10"
          )}
        >
          <div className="relative">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center mb-2",
              voice.gender === 'male' ? "bg-blue-500/20" : "bg-pink-500/20"
            )}>
              <Mic className={cn(
                "w-6 h-6",
                voice.gender === 'male' ? "text-blue-400" : "text-pink-400"
              )} />
            </div>
            {selectedVoiceId === voice.id && (
              <div className="absolute -top-1 -right-1 bg-violet-500 rounded-full p-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <span className="text-sm font-medium text-white">{voice.name}</span>
          <span className="text-xs text-gray-400 mt-1 capitalize">{voice.gender}</span>
        </button>
      ))}
    </div>
  );
};

export default VoiceSelector;
