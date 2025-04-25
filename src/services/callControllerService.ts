import { toast } from 'sonner';
import * as agoraService from './agoraService';
import * as sttService from './sttService';
import * as ttsService from './ttsService';
import { UID } from 'agora-rtc-sdk-ng';

// Types
export interface CallControllerConfig {
  // Call configuration
  channelName: string;
  voiceId: string;
  
  // Event handlers
  onCallConnected?: () => void;
  onCallEnded?: () => void;
  onTranscriptReceived?: (transcript: string, isFinal: boolean) => void;
  onAgentSpeaking?: (isSpeaking: boolean) => void;
  onError?: (error: Error) => void;
  onAudioVolume?: (volumes: {uid: UID, level: number}[]) => void;
}

// Call controller state
let isCallActive = false;
let currentConfig: CallControllerConfig | null = null;
let latestTranscript = '';
let isAgentProcessing = false;
let conversationContext: string[] = [];

// Initialize and start a call
export const startCall = async (config: CallControllerConfig): Promise<boolean> => {
  try {
    if (isCallActive) {
      await endCall();
    }
    
    currentConfig = config;
    
    // Initialize Agora for voice communication
    const agoraInitialized = await agoraService.joinCall({
      channelName: config.channelName,
      uid: Date.now(),
      onUserJoined: (user) => {
        console.log('Remote user joined:', user);
      },
      onUserLeft: (user) => {
        console.log('Remote user left:', user);
      },
      onAudioVolumeIndication: (volumes) => {
        if (config.onAudioVolume) {
          config.onAudioVolume(volumes);
        }
      }
    });
    
    if (!agoraInitialized) {
      throw new Error('Failed to initialize voice call');
    }
    
    // Initialize STT for speech recognition
    const sttInitialized = await sttService.initializeSTT({
      onTranscript: async (transcript, isFinal) => {
        latestTranscript = transcript;
        
        if (config.onTranscriptReceived) {
          config.onTranscriptReceived(transcript, isFinal);
        }
        
        // Process final transcripts for AI response
        if (isFinal && transcript.trim() && !isAgentProcessing) {
          await processUserInput(transcript);
        }
      },
      onError: (error) => {
        console.error('STT error:', error);
        if (config.onError) {
          config.onError(error);
        }
      }
    });
    
    if (!sttInitialized) {
      // Clean up Agora if STT fails
      await agoraService.leaveCall();
      throw new Error('Failed to initialize speech recognition');
    }
    
    isCallActive = true;
    
    if (config.onCallConnected) {
      config.onCallConnected();
    }
    
    // Send initial greeting
    await sendAgentResponse("Hello, I'm your AI assistant. How can I help you today?");
    
    return true;
    
  } catch (error) {
    console.error('Error starting call:', error);
    // Clean up any active services
    await agoraService.leaveCall();
    sttService.cleanupSTT();
    
    if (currentConfig?.onError) {
      currentConfig.onError(error as Error);
    }
    
    toast.error(`Failed to start call: ${(error as Error).message}`);
    return false;
  }
};

// End an active call
export const endCall = async (): Promise<void> => {
  if (!isCallActive) return;
  
  try {
    // Stop all services
    await agoraService.leaveCall();
    sttService.cleanupSTT();
    ttsService.stopAudio();
    
    isCallActive = false;
    
    if (currentConfig?.onCallEnded) {
      currentConfig.onCallEnded();
    }
    
    toast.info('Call ended');
    
  } catch (error) {
    console.error('Error ending call:', error);
    toast.error(`Error ending call: ${(error as Error).message}`);
  }
};

// Send an agent response (text-to-speech)
export const sendAgentResponse = async (text: string): Promise<boolean> => {
  if (!isCallActive || !currentConfig) {
    return false;
  }
  
  try {
    if (currentConfig.onAgentSpeaking) {
      currentConfig.onAgentSpeaking(true);
    }
    
    // Temporarily pause STT while agent is speaking
    sttService.stopListening();
    
    // Stream the agent's response
    await ttsService.streamSpeech(
      text,
      currentConfig.voiceId
    );
    
    // Resume STT after speaking
    sttService.startListening();
    
    if (currentConfig.onAgentSpeaking) {
      currentConfig.onAgentSpeaking(false);
    }
    
    return true;
    
  } catch (error) {
    console.error('Error sending agent response:', error);
    
    if (currentConfig?.onError) {
      currentConfig.onError(error as Error);
    }
    
    // Resume STT in case of error
    sttService.startListening();
    
    if (currentConfig?.onAgentSpeaking) {
      currentConfig.onAgentSpeaking(false);
    }
    
    return false;
  }
};

// Mute/unmute the user's microphone
export const toggleMute = (mute: boolean): boolean => {
  return agoraService.toggleMute(mute);
};

// Get the current call status
export const isCallInProgress = (): boolean => {
  return isCallActive;
};

// Get the latest transcript
export const getLatestTranscript = (): string => {
  return latestTranscript;
};

// Process user input and generate AI response
const processUserInput = async (userInput: string): Promise<void> => {
  if (!currentConfig || !isCallActive || isAgentProcessing) return;

  try {
    isAgentProcessing = true;
    
    if (currentConfig.onAgentSpeaking) {
      currentConfig.onAgentSpeaking(true);
    }

    // Store context for conversation flow
    conversationContext.push(`User: ${userInput}`);
    
    // For now, we'll use a simple echo response
    // In a real implementation, this would call an AI service
    const response = generateSimpleResponse(userInput);
    
    // Store agent response in context
    conversationContext.push(`Agent: ${response}`);
    
    // Keep context window manageable
    if (conversationContext.length > 10) {
      conversationContext = conversationContext.slice(-10);
    }
    
    await sendAgentResponse(response);

  } catch (error) {
    console.error('Error processing user input:', error);
    if (currentConfig.onError) {
      currentConfig.onError(error as Error);
    }
  } finally {
    isAgentProcessing = false;
    if (currentConfig.onAgentSpeaking) {
      currentConfig.onAgentSpeaking(false);
    }
  }
};

// Simple response generator (placeholder for AI service)
const generateSimpleResponse = (userInput: string): string => {
  const lowercaseInput = userInput.toLowerCase();
  
  if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
    return "Hello! How can I assist you today?";
  } else if (lowercaseInput.includes('bye') || lowercaseInput.includes('goodbye')) {
    return "Goodbye! Have a great day!";
  } else if (lowercaseInput.includes('thank')) {
    return "You're welcome! Is there anything else I can help you with?";
  } else if (lowercaseInput.includes('help')) {
    return "I'm here to help! What would you like to know?";
  } else {
    return `I understand you said: "${userInput}". How can I help you with that?`;
  }
};

export default {
  startCall,
  endCall,
  sendAgentResponse,
  toggleMute,
  isCallInProgress,
  getLatestTranscript
};
