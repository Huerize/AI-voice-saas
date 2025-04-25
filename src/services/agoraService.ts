import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  IMicrophoneAudioTrack,
  IRemoteAudioTrack,
  UID
} from 'agora-rtc-sdk-ng';
import { toast } from 'sonner';
import { getApiKeys } from './configService';

// Types
interface CallConfig {
  channelName: string;
  uid?: string | number;
  role?: 'host' | 'audience';
  onUserJoined?: (user: IAgoraRTCRemoteUser) => void;
  onUserLeft?: (user: IAgoraRTCRemoteUser) => void;
  onAudioVolumeIndication?: (volumes: {uid: UID, level: number}[]) => void;
}

type AgoraCallStatus = 'idle' | 'initializing' | 'connected' | 'error';

// Agora client and track variables
let client: IAgoraRTCClient | null = null;
let localAudioTrack: IMicrophoneAudioTrack | null = null;
let remoteAudioTrack: IRemoteAudioTrack | null = null;
let remoteUser: IAgoraRTCRemoteUser | null = null;

// Call status and management
let currentChannelName: string | null = null;
let callStatus: AgoraCallStatus = 'idle';

// Initialize the Agora RTC client
export const initializeAgoraClient = (): IAgoraRTCClient => {
  if (!client) {
    client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  }
  return client;
};

// Generate a basic token for development/testing
// In production, token should be generated on the server
export const generateBasicToken = (
  channelName: string,
  uid: string | number,
  role: 'host' | 'audience' = 'host',
  expirationTimeInSeconds = 3600
): string => {
  const { agoraAppId, agoraAppCertificate } = getApiKeys();
  
  if (!agoraAppId || !agoraAppCertificate) {
    throw new Error('Agora App ID and Certificate are required');
  }

  // In a real app, you would make an API call to your backend to generate a token
  // This is a placeholder for the token generation logic
  return `temp-token-${channelName}-${uid}-${role}-${Date.now()}`;
};

// Initialize and join a call
export const joinCall = async (config: CallConfig): Promise<boolean> => {
  const { channelName, uid = Date.now(), role = 'host', onUserJoined, onUserLeft, onAudioVolumeIndication } = config;
  
  try {
    callStatus = 'initializing';
    const { agoraAppId } = getApiKeys();
    
    if (!agoraAppId) {
      toast.error('Agora App ID is not configured');
      callStatus = 'error';
      return false;
    }
    
    // Initialize client if not done already
    if (!client) {
      client = initializeAgoraClient();
    }
    
    // Set up event listeners
    client.on('user-published', async (user, mediaType) => {
      await client!.subscribe(user, mediaType);
      
      if (mediaType === 'audio') {
        remoteUser = user;
        remoteAudioTrack = user.audioTrack!;
        remoteAudioTrack.play();
        
        if (onUserJoined) {
          onUserJoined(user);
        }
      }
    });

    client.on('user-unpublished', (user, mediaType) => {
      if (mediaType === 'audio') {
        if (user.audioTrack) {
          user.audioTrack.stop();
        }
        
        if (onUserLeft) {
          onUserLeft(user);
        }
      }
    });

    // Enable volume indicator
    if (onAudioVolumeIndication) {
      client.enableAudioVolumeIndicator();
      client.on('volume-indicator', (volumes) => {
        onAudioVolumeIndication(volumes);
      });
    }
    
    // Use a token in production, for development we can use null
    // const token = generateBasicToken(channelName, uid, role);
    const token = null; // For simplicity in development
    
    // Join the channel
    await client.join(agoraAppId, channelName, token, uid);
    
    // Create and publish local audio track
    localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await client.publish([localAudioTrack]);
    
    currentChannelName = channelName;
    callStatus = 'connected';
    
    toast.success(`Joined call: ${channelName}`);
    return true;
    
  } catch (error) {
    console.error('Error joining call:', error);
    callStatus = 'error';
    toast.error(`Failed to join call: ${(error as Error).message}`);
    return false;
  }
};

// Leave the current call
export const leaveCall = async (): Promise<void> => {
  try {
    // Close local tracks
    if (localAudioTrack) {
      localAudioTrack.close();
      localAudioTrack = null;
    }
    
    // Leave the channel
    if (client) {
      await client.leave();
    }
    
    remoteUser = null;
    remoteAudioTrack = null;
    currentChannelName = null;
    callStatus = 'idle';
    
    toast.info('Left the call');
    
  } catch (error) {
    console.error('Error leaving call:', error);
    toast.error(`Error leaving call: ${(error as Error).message}`);
  }
};

// Mute/unmute the local audio
export const toggleMute = (mute: boolean): boolean => {
  if (!localAudioTrack) return false;
  
  try {
    if (mute) {
      localAudioTrack.setMuted(true);
    } else {
      localAudioTrack.setMuted(false);
    }
    return true;
  } catch (error) {
    console.error('Error toggling mute:', error);
    return false;
  }
};

// Get current call status
export const getCallStatus = (): AgoraCallStatus => {
  return callStatus;
};

// Get current channel name
export const getCurrentChannel = (): string | null => {
  return currentChannelName;
};

// Get active remote user
export const getRemoteUser = (): IAgoraRTCRemoteUser | null => {
  return remoteUser;
};

// Clean up resources on component unmount
export const cleanupAgoraClient = async (): Promise<void> => {
  if (currentChannelName) {
    await leaveCall();
  }
};

export default {
  initializeAgoraClient,
  joinCall,
  leaveCall,
  toggleMute,
  getCallStatus,
  getCurrentChannel,
  getRemoteUser,
  cleanupAgoraClient
};
