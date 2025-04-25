
import { toast } from 'sonner';
import { getApiKeys } from './configService';

// Voice data types
export interface Voice {
  id: string;
  name: string;
  gender: 'male' | 'female';
}

// Available voices in ElevenLabs
export const availableVoices: Voice[] = [
  { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger', gender: 'male' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', gender: 'female' },
  { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female' },
  { id: 'FGY2WhTYpPnrIDTdsKH5', name: 'Laura', gender: 'female' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', gender: 'male' },
  { id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George', gender: 'male' },
  { id: 'N2lVS1w4EtoT3dr4eOWO', name: 'Callum', gender: 'male' },
  { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte', gender: 'female' },
];

// Audio player instance for playing TTS audio
let audioPlayer: HTMLAudioElement | null = null;
let isPlaying = false;

// TTS configuration
interface TTSConfig {
  model?: string;
  voiceId?: string;
  optimizeStreamingLatency?: number; // 0-4, 0 being lowest latency
}

const defaultConfig: TTSConfig = {
  model: 'eleven_turbo_v2',
  voiceId: 'CwhRBWXzGAHq8TQ4Fs17', // Roger
  optimizeStreamingLatency: 3
};

// Synthesize speech from text
export const synthesizeSpeech = async (
  text: string, 
  voiceId: string = defaultConfig.voiceId!,
  model: string = defaultConfig.model!
): Promise<ArrayBuffer | null> => {
  try {
    const { elevenLabsApiKey } = getApiKeys();
    
    if (!elevenLabsApiKey) {
      toast.error('ElevenLabs API key is not configured');
      return null;
    }
    
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsApiKey
        },
        body: JSON.stringify({
          text,
          model_id: model,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ElevenLabs API error: ${errorText}`);
    }
    
    return await response.arrayBuffer();
    
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    toast.error(`Failed to synthesize speech: ${(error as Error).message}`);
    return null;
  }
};

// Play audio from ArrayBuffer
export const playAudio = async (audioData: ArrayBuffer): Promise<void> => {
  try {
    if (isPlaying && audioPlayer) {
      audioPlayer.pause();
    }
    
    const blob = new Blob([audioData], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    
    audioPlayer = new Audio(url);
    
    audioPlayer.onplay = () => {
      isPlaying = true;
    };
    
    audioPlayer.onended = () => {
      isPlaying = false;
      URL.revokeObjectURL(url);
    };
    
    audioPlayer.onerror = () => {
      isPlaying = false;
      URL.revokeObjectURL(url);
      toast.error('Error playing audio');
    };
    
    await audioPlayer.play();
    
  } catch (error) {
    console.error('Error playing audio:', error);
    toast.error(`Failed to play audio: ${(error as Error).message}`);
  }
};

// Stream speech synthesis (more efficient for longer texts)
export const streamSpeech = async (
  text: string,
  voiceId: string = defaultConfig.voiceId!,
  model: string = defaultConfig.model!,
  onDataReceived?: (audioChunk: ArrayBuffer) => void
): Promise<boolean> => {
  try {
    const { elevenLabsApiKey } = getApiKeys();
    
    if (!elevenLabsApiKey) {
      toast.error('ElevenLabs API key is not configured');
      return false;
    }
    
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsApiKey
        },
        body: JSON.stringify({
          text,
          model_id: model,
          optimize_streaming_latency: defaultConfig.optimizeStreamingLatency,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ElevenLabs streaming API error: ${errorText}`);
    }
    
    const reader = response.body!.getReader();
    
    // Process the stream
    const processStream = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          if (onDataReceived) {
            onDataReceived(value.buffer);
          } else {
            // Default behavior: play audio chunks as they arrive
            await playAudioChunk(value.buffer);
          }
        }
        return true;
      } catch (error) {
        console.error('Error processing speech stream:', error);
        return false;
      }
    };
    
    return await processStream();
    
  } catch (error) {
    console.error('Error streaming speech:', error);
    toast.error(`Failed to stream speech: ${(error as Error).message}`);
    return false;
  }
};

// Helper function to play a single audio chunk
const playAudioChunk = async (chunk: ArrayBuffer): Promise<void> => {
  const blob = new Blob([chunk], { type: 'audio/mpeg' });
  const url = URL.createObjectURL(blob);
  
  const audio = new Audio(url);
  
  audio.onended = () => {
    URL.revokeObjectURL(url);
  };
  
  audio.onerror = () => {
    URL.revokeObjectURL(url);
  };
  
  await audio.play();
};

// Stop current audio playback
export const stopAudio = (): void => {
  if (audioPlayer && isPlaying) {
    audioPlayer.pause();
    audioPlayer = null;
    isPlaying = false;
  }
};

// Check if audio is currently playing
export const isAudioPlaying = (): boolean => {
  return isPlaying;
};

// Get a voice by ID
export const getVoiceById = (id: string): Voice | undefined => {
  return availableVoices.find(voice => voice.id === id);
};

export default {
  synthesizeSpeech,
  playAudio,
  streamSpeech,
  stopAudio,
  isAudioPlaying,
  availableVoices,
  getVoiceById
};
