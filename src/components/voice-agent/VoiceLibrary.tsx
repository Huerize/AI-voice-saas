
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { availableVoices, Voice } from "@/services/ttsService";
import { Headphones, Play, Check, Settings } from "lucide-react";
import * as ttsService from '@/services/ttsService';
import { toast } from 'sonner';
import { hasRequiredKeys } from '@/services/configService';

interface VoiceLibraryProps {
  onSelectVoice?: (voiceId: string) => void;
  selectedVoiceId?: string;
}

const VoiceLibrary = ({ onSelectVoice, selectedVoiceId }: VoiceLibraryProps) => {
  const [voices, setVoices] = useState<Voice[]>(availableVoices);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Check if the ElevenLabs API key is configured
    const checkAPIKey = () => {
      const configured = hasRequiredKeys('elevenLabs');
      setIsConfigured(configured);
    };
    
    checkAPIKey();
  }, []);

  const handlePlaySample = async (voice: Voice) => {
    if (!isConfigured) {
      toast.error('ElevenLabs API key is not configured', {
        description: 'Please configure your API key in Settings'
      });
      return;
    }

    setPlayingVoice(voice.id);
    
    try {
      const sampleText = `Hello, I'm ${voice.name}. I'm a ${voice.gender === 'male' ? 'male' : 'female'} voice assistant.`;
      
      await ttsService.streamSpeech(sampleText, voice.id);
    } catch (error) {
      console.error('Error playing voice sample:', error);
      toast.error(`Error playing voice sample: ${(error as Error).message}`);
    } finally {
      setPlayingVoice(null);
    }
  };

  const handleSelectVoice = (voiceId: string) => {
    if (onSelectVoice) {
      onSelectVoice(voiceId);
      toast.success('Voice selected successfully');
    }
  };

  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2 text-white">
          <div className="flex items-center gap-2">
            <Headphones className="h-5 w-5 text-violet-400" />
            Voice Library
          </div>
          {!isConfigured && (
            <Button 
              size="sm" 
              variant="outline" 
              className="text-amber-400 border-amber-400/50 hover:bg-amber-500/10"
            >
              <Settings className="mr-2 h-4 w-4" />
              Configure
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isConfigured ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-amber-200">
              Configure your ElevenLabs API key in Settings to access the voice library.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {voices.map((voice) => (
              <div 
                key={voice.id} 
                className={`p-4 rounded-lg flex items-center justify-between ${
                  selectedVoiceId === voice.id 
                    ? 'bg-violet-500/20 border border-violet-500/40' 
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-white">{voice.name}</h3>
                    {selectedVoiceId === voice.id && (
                      <Check className="ml-2 h-4 w-4 text-violet-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {voice.gender === 'male' ? 'Male' : 'Female'} Voice
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    disabled={playingVoice === voice.id}
                    onClick={() => handlePlaySample(voice)} 
                    className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/20"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  {selectedVoiceId !== voice.id && (
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      onClick={() => handleSelectVoice(voice.id)} 
                      className="bg-violet-500/20 text-violet-300 hover:bg-violet-500/30"
                    >
                      Select
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceLibrary;

