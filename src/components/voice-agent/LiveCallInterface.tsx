
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Phone, Mic, MicOff, User, Bot, UserPlus, Users } from "lucide-react";
import EnhancedAudioVisualizer from './EnhancedAudioVisualizer';
import VoiceSelector from './VoiceSelector';
import { hasRequiredKeys } from '@/services/configService';
import * as callControllerService from '@/services/callControllerService';
import { UID } from 'agora-rtc-sdk-ng';
import ConversationStatus from './ConversationStatus';

interface Message {
  role: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

interface LiveCallInterfaceProps {
  onCallStatusChange?: (isActive: boolean) => void;
  agentName?: string;
}

const LiveCallInterface = ({ 
  onCallStatusChange, 
  agentName = 'AI Assistant' 
}: LiveCallInterfaceProps) => {
  // Call state
  const [isCallActive, setIsCallActive] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState('CwhRBWXzGAHq8TQ4Fs17'); // Default to Roger
  const [isMuted, setIsMuted] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [callId, setCallId] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [callDurationDisplay, setCallDurationDisplay] = useState('00:00');
  
  // Transcript state
  const [transcript, setTranscript] = useState('');
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [lastResponse, setLastResponse] = useState('');
  
  // Audio visualization data
  const [audioVolumes, setAudioVolumes] = useState<{uid: UID, level: number}[]>([]);
  
  // Check if the necessary API keys are configured
  const areApiKeysConfigured = hasRequiredKeys('agora') && hasRequiredKeys('elevenLabs') && hasRequiredKeys('deepgram');

  // Generate a unique call ID
  const generateCallId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `call-${timestamp}-${random}`;
  };
  
  // Format seconds to MM:SS display
  const formatCallDuration = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Update call duration timer
  useEffect(() => {
    let intervalId: number;
    
    if (isCallActive) {
      intervalId = window.setInterval(() => {
        setCallDuration(prev => {
          const newDuration = prev + 1;
          setCallDurationDisplay(formatCallDuration(newDuration));
          return newDuration;
        });
      }, 1000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isCallActive]);
  
  // Handle starting a call
  const handleStartCall = async () => {
    if (!areApiKeysConfigured) {
      toast.error("Missing required API keys", {
        description: "Please configure Agora, ElevenLabs, and Deepgram API keys in Settings"
      });
      return;
    }
    
    setIsInitializing(true);
    
    try {
      // Generate a unique call ID for this session
      const newCallId = generateCallId();
      setCallId(newCallId);
      
      const success = await callControllerService.startCall({
        channelName: `lovele-ai-call-${newCallId}`,
        voiceId: selectedVoiceId,
        onCallConnected: () => {
          setIsCallActive(true);
          setCallDuration(0);
          setCallDurationDisplay('00:00');
          
          if (onCallStatusChange) {
            onCallStatusChange(true);
          }
        },
        onCallEnded: () => {
          setIsCallActive(false);
          if (onCallStatusChange) {
            onCallStatusChange(false);
          }
        },
        onTranscriptReceived: (text, isFinal) => {
          setTranscript(text);
          
          if (isFinal && text.trim()) {
            // Add user message to conversation history
            const newMessage: Message = {
              role: 'user',
              text,
              timestamp: new Date()
            };
            
            setConversationHistory(prev => [...prev, newMessage]);
            setTranscript('');
          }
        },
        onAgentSpeaking: (speaking) => {
          setIsAgentSpeaking(speaking);
        },
        onError: (error) => {
          console.error('Call error:', error);
          toast.error(`Call error: ${error.message}`);
        },
        onAudioVolume: (volumes) => {
          setAudioVolumes(volumes);
        },
        onAgentResponse: (response) => {
          setLastResponse(response);
          
          // Add agent's response to conversation history
          const newMessage: Message = {
            role: 'agent',
            text: response,
            timestamp: new Date()
          };
          
          setConversationHistory(prev => [...prev, newMessage]);
        }
      });
      
      if (!success) {
        toast.error("Failed to start call");
      }
    } catch (error) {
      console.error('Error starting call:', error);
      toast.error(`Failed to start call: ${(error as Error).message}`);
    } finally {
      setIsInitializing(false);
    }
  };
  
  // Handle ending a call
  const handleEndCall = async () => {
    await callControllerService.endCall();
    setIsCallActive(false);
    setTranscript('');
    if (onCallStatusChange) {
      onCallStatusChange(false);
    }
  };
  
  // Handle toggling mute
  const handleToggleMute = () => {
    const newMuteState = !isMuted;
    const success = callControllerService.toggleMute(newMuteState);
    
    if (success) {
      setIsMuted(newMuteState);
      toast.info(newMuteState ? "Microphone muted" : "Microphone unmuted");
    }
  };
  
  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (isCallActive) {
        callControllerService.endCall();
      }
    };
  }, [isCallActive]);
  
  // Calculate speech intensity for visualization
  const calculateSpeechIntensity = () => {
    if (!audioVolumes || audioVolumes.length === 0) return 0;
    
    // Find the max volume level (normalized to 0-1)
    return Math.min(1, Math.max(...audioVolumes.map(v => v.level)) / 100);
  };
  
  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2 text-white">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-violet-400" />
            <span>Voice Call</span>
          </div>
          
          {isCallActive && (
            <div className="flex items-center gap-2 text-sm font-normal">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Active • {callDurationDisplay}</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!isCallActive ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-sm text-gray-300 block">Select Agent Voice</label>
              <VoiceSelector selectedVoiceId={selectedVoiceId} onSelectVoice={setSelectedVoiceId} />
            </div>
            
            <Button
              onClick={handleStartCall}
              disabled={isInitializing || !areApiKeysConfigured}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isInitializing ? 'Initializing...' : 'Start Call'}
            </Button>
            
            {!areApiKeysConfigured && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <p className="text-sm text-amber-200">
                  API keys are required for Agora, ElevenLabs, and Deepgram services.
                  Please configure them in the Settings page.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-violet-400" />
                <span className="text-white font-medium">{agentName}</span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className={isMuted ? "bg-red-500/20 border-red-500/40 text-red-400" : "bg-white/5 border-white/10 text-white"}
                  onClick={handleToggleMute}
                >
                  {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30"
                  onClick={handleEndCall}
                >
                  <Phone className="h-4 w-4 mr-1" /> End Call
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <EnhancedAudioVisualizer
                  isActive={true}
                  isSpeaking={!isAgentSpeaking}
                  speakingIntensity={calculateSpeechIntensity()}
                  color="#6d28d9"
                />
                <div className="flex items-center mt-2 mb-1">
                  <User className="h-4 w-4 text-violet-400 mr-2" />
                  <span className="text-sm text-white">You</span>
                </div>
              </div>
              
              <div>
                <EnhancedAudioVisualizer
                  isActive={true}
                  isSpeaking={isAgentSpeaking}
                  color="#8b5cf6"
                />
                <div className="flex items-center mt-2 mb-1">
                  <Bot className="h-4 w-4 text-violet-400 mr-2" />
                  <span className="text-sm text-white">{agentName}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <h3 className="text-white text-sm font-medium">Conversation</h3>
                <div className="ml-auto text-xs text-gray-400">
                  {isAgentSpeaking ? 'AI is speaking...' : transcript ? 'Listening...' : ''}
                </div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4 h-48 overflow-y-auto">
                <ConversationStatus
                  isAgentSpeaking={isAgentSpeaking}
                  transcript={transcript}
                  lastResponse={lastResponse}
                  conversationHistory={conversationHistory}
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t border-white/10 pt-4">
        <div className="text-xs text-gray-400 w-full text-center">
          {isCallActive 
            ? 'Call is active. Your microphone is being used.'
            : 'Start a call to begin speaking with the AI assistant.'
          }
        </div>
      </CardFooter>
    </Card>
  );
};

export default LiveCallInterface;
