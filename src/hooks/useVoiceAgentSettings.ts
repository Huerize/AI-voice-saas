
import { useState } from 'react';

interface VoiceAgentSettings {
  contextWindow: number;
  temperature: number;
  maxTokens: number;
  selectedLLM: string;
  knowledgeBase: string | null;
  systemPrompt: string;
}

export const useVoiceAgentSettings = (initialSettings?: Partial<VoiceAgentSettings>) => {
  const [settings, setSettings] = useState<VoiceAgentSettings>({
    contextWindow: initialSettings?.contextWindow || 5,
    temperature: initialSettings?.temperature || 0.7,
    maxTokens: initialSettings?.maxTokens || 1000,
    selectedLLM: initialSettings?.selectedLLM || 'gpt-4o',
    knowledgeBase: initialSettings?.knowledgeBase || null,
    systemPrompt: initialSettings?.systemPrompt || ''
  });

  const updateSettings = (newSettings: Partial<VoiceAgentSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  return {
    settings,
    updateSettings
  };
};
