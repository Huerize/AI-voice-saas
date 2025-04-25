
// ElevenLabs TTS Service
import { getApiKeys } from './configService';

// Available voices with their ElevenLabs voice IDs
export const availableVoices = [
  { name: 'Aria', id: '9BWtsMINqrJLrRacOk9x', gender: 'female' },
  { name: 'Roger', id: 'CwhRBWXzGAHq8TQ4Fs17', gender: 'male' },
  { name: 'Sarah', id: 'EXAVITQu4vr4xnSDxMaL', gender: 'female' },
  { name: 'Charlie', id: 'IKne3meq5aSn9XLyUdCD', gender: 'male' },
  { name: 'George', id: 'JBFqnCBsd6RMkjVDRZzb', gender: 'male' },
  { name: 'River', id: 'SAz9YHcvj6GT2YYXdXww', gender: 'female' },
  { name: 'Daniel', id: 'onwK4e9ZLuTAKqWW03F9', gender: 'male' },
  { name: 'Lily', id: 'pFZP5JQG7iQjIQuC4Bku', gender: 'female' }
];

// Default settings for TTS requests
const defaultSettings = {
  model_id: 'eleven_multilingual_v2',
  voice_settings: {
    stability: 0.5,
    similarity_boost: 0.75,
    style: 0.0,
    use_speaker_boost: true
  }
};

// Synthesize text to speech using ElevenLabs API
export const synthesizeSpeech = async (
  text: string,
  voiceId: string = 'CwhRBWXzGAHq8TQ4Fs17' // Default to Roger voice
): Promise<ArrayBuffer | null> => {
  const { elevenLabsApiKey } = getApiKeys();
  
  if (!elevenLabsApiKey) {
    console.error('ElevenLabs API key not set');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': elevenLabsApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text,
          ...defaultSettings
        })
      }
    );

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    return await response.arrayBuffer();
  } catch (error) {
    console.error('TTS synthesis failed:', error);
    return null;
  }
};

// Play audio from ArrayBuffer
export const playAudio = async (audioData: ArrayBuffer): Promise<void> => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const audioBuffer = await audioContext.decodeAudioData(audioData);
  
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start(0);
};

export default {
  availableVoices,
  synthesizeSpeech,
  playAudio
};
