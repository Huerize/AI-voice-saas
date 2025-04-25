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
  
  // Optional LLM and knowledge base configuration
  llmModel?: string;
  knowledgeBase?: string;
  systemPrompt?: string;
  collegeContext?: string;
  courseName?: string;
  
  // Conversational AI settings
  contextWindow?: number;
  temperature?: number;
  maxTokens?: number;
  
  // Event handlers
  onCallConnected?: () => void;
  onCallEnded?: () => void;
  onTranscriptReceived?: (transcript: string, isFinal: boolean) => void;
  onAgentSpeaking?: (isSpeaking: boolean) => void;
  onAgentResponse?: (response: string, metadata?: {
    topic?: string;
    isEducational?: boolean;
    knowledgeSource?: string;
    confidence?: number;
  }) => void;
  onError?: (error: Error) => void;
  onAudioVolume?: (volumes: {uid: UID, level: number}[]) => void;
}

interface ActiveCall {
  channelName: string;
  voiceId: string;
  config: CallControllerConfig;
  transcript: string;
  isAgentProcessing: boolean;
  conversationContext: string[];
  startTime: Date;
  settings: {
    contextWindow: number;
    temperature: number;
    maxTokens: number;
  };
}

// Call controller state
let activeCalls: Map<string, ActiveCall> = new Map();
let currentCallId: string | null = null;

// Initialize and start a call
export const startCall = async (config: CallControllerConfig): Promise<boolean> => {
  try {
    // Generate a unique call ID based on channel name
    const callId = config.channelName;
    
    // If there's an existing call with this ID, end it first
    if (activeCalls.has(callId)) {
      await endCallById(callId);
    }
    
    // Store conversation settings
    const callSettings = {
      contextWindow: config.contextWindow || 5,
      temperature: config.temperature || 0.7,
      maxTokens: config.maxTokens || 1000
    };
    
    // Initialize Agora for voice communication
    const agoraInitialized = await agoraService.joinCall({
      channelName: config.channelName,
      uid: Date.now(),
      role: 'host',
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
        // Store the latest transcript for this call
        const activeCall = activeCalls.get(callId);
        if (activeCall) {
          activeCall.transcript = transcript;
        }
        
        if (config.onTranscriptReceived) {
          config.onTranscriptReceived(transcript, isFinal);
        }
        
        // Process final transcripts for AI response
        if (isFinal && transcript.trim() && activeCall && !activeCall.isAgentProcessing) {
          await processUserInput(callId, transcript);
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
    
    // Store the call information with enhanced settings
    activeCalls.set(callId, {
      channelName: config.channelName,
      voiceId: config.voiceId,
      config,
      transcript: '',
      isAgentProcessing: false,
      conversationContext: [],
      startTime: new Date(),
      settings: callSettings
    });
    
    currentCallId = callId;
    
    if (config.onCallConnected) {
      config.onCallConnected();
    }
    
    // Send initial greeting
    await sendAgentResponse(callId, "Hello, I'm your AI assistant. How can I help you today?");
    
    return true;
    
  } catch (error) {
    console.error('Error starting call:', error);
    // Clean up any active services
    await agoraService.leaveCall();
    sttService.cleanupSTT();
    
    if (config.onError) {
      config.onError(error as Error);
    }
    
    toast.error(`Failed to start call: ${(error as Error).message}`);
    return false;
  }
};

// End an active call
export const endCall = async (): Promise<void> => {
  if (currentCallId) {
    await endCallById(currentCallId);
  }
};

// End a specific call by ID
const endCallById = async (callId: string): Promise<void> => {
  const activeCall = activeCalls.get(callId);
  
  if (!activeCall) return;
  
  try {
    // Stop all services
    await agoraService.leaveCall();
    sttService.cleanupSTT();
    ttsService.stopAudio();
    
    if (activeCall.config.onCallEnded) {
      activeCall.config.onCallEnded();
    }
    
    // Remove from active calls
    activeCalls.delete(callId);
    if (currentCallId === callId) {
      currentCallId = null;
    }
    
    toast.info('Call ended');
    
  } catch (error) {
    console.error('Error ending call:', error);
    toast.error(`Error ending call: ${(error as Error).message}`);
  }
};

// Send an agent response (text-to-speech) for a specific call
const sendAgentResponse = async (callId: string, text: string): Promise<boolean> => {
  const activeCall = activeCalls.get(callId);
  
  if (!activeCall) {
    return false;
  }
  
  try {
    if (activeCall.config.onAgentSpeaking) {
      activeCall.config.onAgentSpeaking(true);
    }
    
    // Create metadata for educational content
    const metadata = {
      topic: detectTopic(text),
      isEducational: isEducationalContent(text),
      knowledgeSource: activeCall.config.knowledgeBase || undefined,
      confidence: Math.random() * 0.3 + 0.7 // Simulate confidence between 0.7-1.0
    };
    
    if (activeCall.config.onAgentResponse) {
      activeCall.config.onAgentResponse(text, metadata);
    }
    
    // Temporarily pause STT while agent is speaking
    sttService.stopListening();
    
    // Stream the agent's response
    await ttsService.streamSpeech(
      text,
      activeCall.voiceId
    );
    
    // Resume STT after speaking
    sttService.startListening();
    
    if (activeCall.config.onAgentSpeaking) {
      activeCall.config.onAgentSpeaking(false);
    }
    
    return true;
    
  } catch (error) {
    console.error('Error sending agent response:', error);
    
    if (activeCall.config.onError) {
      activeCall.config.onError(error as Error);
    }
    
    // Resume STT in case of error
    sttService.startListening();
    
    if (activeCall.config.onAgentSpeaking) {
      activeCall.config.onAgentSpeaking(false);
    }
    
    return false;
  }
};

// Helper function to detect educational topic in text
const detectTopic = (text: string): string | undefined => {
  const topics = [
    { keyword: 'admission', topic: 'Admissions' },
    { keyword: 'tuition', topic: 'Finances' },
    { keyword: 'scholarship', topic: 'Scholarships' },
    { keyword: 'course', topic: 'Courses' },
    { keyword: 'degree', topic: 'Degrees' },
    { keyword: 'major', topic: 'Majors' },
    { keyword: 'semester', topic: 'Academic Calendar' },
    { keyword: 'housing', topic: 'Student Housing' },
    { keyword: 'campus', topic: 'Campus Life' }
  ];
  
  const lowerText = text.toLowerCase();
  for (const { keyword, topic } of topics) {
    if (lowerText.includes(keyword)) {
      return topic;
    }
  }
  
  return undefined;
};

// Helper function to check if content is educational
const isEducationalContent = (text: string): boolean => {
  const educationalIndicators = [
    'learn', 'study', 'course', 'class', 'degree', 
    'program', 'education', 'college', 'student',
    'professor', 'academic', 'university', 'research'
  ];
  
  const lowerText = text.toLowerCase();
  return educationalIndicators.some(indicator => lowerText.includes(indicator));
};

// Mute/unmute the user's microphone
export const toggleMute = (mute: boolean): boolean => {
  return agoraService.toggleMute(mute);
};

// Get the current call status
export const isCallInProgress = (): boolean => {
  return currentCallId !== null;
};

// Get all active calls
export const getActiveCalls = (): Map<string, ActiveCall> => {
  return activeCalls;
};

// Get call statistics
export const getCallStatistics = (): { 
  totalCalls: number; 
  activeCalls: number;
  totalDuration: number;
} => {
  const now = new Date();
  
  // Calculate total duration of all calls
  let totalDuration = 0;
  activeCalls.forEach(call => {
    const callDuration = (now.getTime() - call.startTime.getTime()) / 1000; // seconds
    totalDuration += callDuration;
  });
  
  return {
    totalCalls: activeCalls.size,
    activeCalls: activeCalls.size,
    totalDuration
  };
};

// Process user input and generate AI response
const processUserInput = async (callId: string, userInput: string): Promise<void> => {
  const activeCall = activeCalls.get(callId);
  
  if (!activeCall || activeCall.isAgentProcessing) return;

  try {
    // Mark as processing to prevent concurrent processing
    activeCall.isAgentProcessing = true;
    
    if (activeCall.config.onAgentSpeaking) {
      activeCall.config.onAgentSpeaking(true);
    }

    // Store context for conversation flow
    activeCall.conversationContext.push(`User: ${userInput}`);
    
    // Generate a response based on the user's input
    // In a production environment, this would call an LLM API like OpenAI
    const response = generateSimpleResponse(userInput, activeCall.conversationContext);
    
    // Store agent response in context
    activeCall.conversationContext.push(`Agent: ${response}`);
    
    // Keep context window manageable
    if (activeCall.conversationContext.length > 10) {
      activeCall.conversationContext = activeCall.conversationContext.slice(-10);
    }
    
    await sendAgentResponse(callId, response);

  } catch (error) {
    console.error('Error processing user input:', error);
    if (activeCall.config.onError) {
      activeCall.config.onError(error as Error);
    }
  } finally {
    if (activeCall) {
      activeCall.isAgentProcessing = false;
      if (activeCall.config.onAgentSpeaking) {
        activeCall.config.onAgentSpeaking(false);
      }
    }
  }
};

// Enhanced response generator with context awareness
const generateSimpleResponse = (userInput: string, context: string[]): string => {
  const lowercaseInput = userInput.toLowerCase();
  
  // Check if this is a follow-up question
  const isFollowUp = context.length > 2;
  
  // Basic greeting detection
  if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
    return isFollowUp 
      ? "Hello again! How can I continue to assist you?" 
      : "Hello! How can I assist you today?";
  } 
  // Farewell detection
  else if (lowercaseInput.includes('bye') || lowercaseInput.includes('goodbye')) {
    return "Goodbye! Have a great day! Feel free to call again if you need assistance.";
  } 
  // Gratitude detection
  else if (lowercaseInput.includes('thank')) {
    return "You're welcome! Is there anything else I can help you with?";
  }
  // Help request
  else if (lowercaseInput.includes('help')) {
    return "I'm here to help! What would you like to know? I can provide information, answer questions, or assist with various tasks.";
  }
  // Time/date related
  else if (lowercaseInput.includes('time') || lowercaseInput.includes('date')) {
    const now = new Date();
    return `It's currently ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}.`;
  }
  // Name inquiry
  else if (lowercaseInput.includes('your name') || lowercaseInput.includes('who are you')) {
    return "I'm your AI voice assistant, designed to help you with information and tasks. You can think of me as your helpful digital companion.";
  }
  // Default response with context awareness
  else {
    if (isFollowUp) {
      return `Regarding your question about "${userInput}", I'd be happy to help with that. Could you provide more details so I can assist you better?`;
    } else {
      return `I understand you said: "${userInput}". How can I help you with that?`;
    }
  }
};

export default {
  startCall,
  endCall,
  toggleMute,
  isCallInProgress,
  getActiveCalls,
  getCallStatistics
};
