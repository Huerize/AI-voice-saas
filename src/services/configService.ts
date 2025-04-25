
// Configuration service for managing API keys and settings
import { toast } from "sonner";

export interface APIKeys {
  agoraAppId?: string;
  agoraAppCertificate?: string;
  deepgramApiKey?: string;
  elevenLabsApiKey?: string;
  openAIApiKey?: string;
}

const STORAGE_KEY = 'lovele_api_keys';

// Get API keys from localStorage
export const getApiKeys = (): APIKeys => {
  try {
    const storedKeys = localStorage.getItem(STORAGE_KEY);
    return storedKeys ? JSON.parse(storedKeys) : {};
  } catch (error) {
    console.error('Failed to load API keys:', error);
    return {};
  }
};

// Save API keys to localStorage
export const saveApiKeys = (keys: APIKeys): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
    toast.success('API keys saved successfully');
  } catch (error) {
    console.error('Failed to save API keys:', error);
    toast.error('Failed to save API keys');
  }
};

// Check if required keys for a specific service are set
export const hasRequiredKeys = (service: 'agora' | 'deepgram' | 'elevenLabs' | 'openAI'): boolean => {
  const keys = getApiKeys();
  
  switch (service) {
    case 'agora':
      return !!keys.agoraAppId && !!keys.agoraAppCertificate;
    case 'deepgram':
      return !!keys.deepgramApiKey;
    case 'elevenLabs':
      return !!keys.elevenLabsApiKey;
    case 'openAI':
      return !!keys.openAIApiKey;
    default:
      return false;
  }
};

// Clear all stored API keys
export const clearApiKeys = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  toast.info('API keys cleared');
};

export default {
  getApiKeys,
  saveApiKeys,
  hasRequiredKeys,
  clearApiKeys
};
