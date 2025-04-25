
import { toast } from 'sonner';
import { getApiKeys } from './configService';

// Types
export interface STTConfig {
  onTranscript?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: Error) => void;
}

// WebSocket connection for Deepgram
let socket: WebSocket | null = null;
let mediaRecorder: MediaRecorder | null = null;
let audioContext: AudioContext | null = null;
let audioStream: MediaStream | null = null;

// Service state
let isListening = false;
let currentConfig: STTConfig | null = null;

// Initialize speech-to-text service
export const initializeSTT = async (config: STTConfig): Promise<boolean> => {
  try {
    currentConfig = config;
    const { deepgramApiKey } = getApiKeys();
    
    if (!deepgramApiKey) {
      toast.error('Deepgram API key is not configured');
      return false;
    }

    // Request microphone access
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Create WebSocket connection to Deepgram
    const apiKey = deepgramApiKey;
    const socketUrl = `wss://api.deepgram.com/v1/listen?encoding=linear16&sample_rate=16000&channels=1`;
    
    socket = new WebSocket(socketUrl);
    socket.onopen = () => {
      if (socket) {
        socket.send(JSON.stringify({
          model: "nova-2", // Latest model as of April 2025
          language: "en-US",
          smart_format: true,
          interim_results: true,
        }));
      }

      // Set up audio processing and media recorder
      const audioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new audioCtx();
      
      const source = audioContext.createMediaStreamSource(audioStream!);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      
      processor.onaudioprocess = (e) => {
        if (socket && socket.readyState === WebSocket.OPEN && isListening) {
          const inputData = e.inputBuffer.getChannelData(0);
          const audioData = convertFloat32ToInt16(inputData);
          socket.send(audioData);
        }
      };
      
      source.connect(processor);
      processor.connect(audioContext.destination);
      
      isListening = true;
      toast.success('Speech-to-text service initialized');
      return true;
    };
    
    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response?.channel?.alternatives?.length > 0) {
        const transcript = response.channel.alternatives[0].transcript;
        const isFinal = !response.is_final;
        
        if (transcript && currentConfig?.onTranscript) {
          currentConfig.onTranscript(transcript, isFinal);
        }
      }
    };
    
    socket.onerror = (error) => {
      console.error('Deepgram WebSocket error:', error);
      if (currentConfig?.onError) {
        currentConfig.onError(new Error('Speech-to-text service error'));
      }
      toast.error('Speech-to-text service error');
    };
    
    socket.onclose = () => {
      console.log('Deepgram WebSocket closed');
      isListening = false;
    };
    
    return true;
  } catch (error) {
    console.error('Failed to initialize speech-to-text:', error);
    if (currentConfig?.onError) {
      currentConfig.onError(error as Error);
    }
    toast.error(`Failed to initialize speech-to-text: ${(error as Error).message}`);
    return false;
  }
};

// Helper function to convert audio format
const convertFloat32ToInt16 = (buffer: Float32Array): Int16Array => {
  const len = buffer.length;
  const result = new Int16Array(len);
  for (let i = 0; i < len; i++) {
    const s = Math.max(-1, Math.min(1, buffer[i]));
    result[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return result;
};

// Start listening for speech
export const startListening = (): boolean => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    toast.error('Speech-to-text service not initialized');
    return false;
  }
  
  isListening = true;
  return true;
};

// Stop listening for speech
export const stopListening = (): boolean => {
  isListening = false;
  return true;
};

// Clean up resources
export const cleanupSTT = (): void => {
  if (socket) {
    socket.close();
    socket = null;
  }
  
  if (mediaRecorder) {
    mediaRecorder.stop();
    mediaRecorder = null;
  }
  
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
  
  if (audioStream) {
    audioStream.getTracks().forEach(track => track.stop());
    audioStream = null;
  }
  
  isListening = false;
  currentConfig = null;
};

// Check if the service is currently listening
export const isSTTListening = (): boolean => {
  return isListening;
};

export default {
  initializeSTT,
  startListening,
  stopListening,
  cleanupSTT,
  isSTTListening
};
