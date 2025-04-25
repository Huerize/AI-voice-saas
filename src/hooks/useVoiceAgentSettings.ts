
import { useState } from 'react';

export interface VoiceAgentSettings {
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
    systemPrompt: initialSettings?.systemPrompt || 'You are a helpful AI assistant for a college. You provide information about courses, admissions, campus facilities, and answer student queries in a friendly, professional manner.'
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
