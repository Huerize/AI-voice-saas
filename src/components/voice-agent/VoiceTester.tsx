
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mic, Play, Loader2 } from "lucide-react";
import VoiceSelector from './VoiceSelector';
import { synthesizeSpeech, playAudio } from '@/services/ttsService';
import { hasRequiredKeys } from '@/services/configService';
import { toast } from "sonner";

const VoiceTester = () => {
  const [selectedVoiceId, setSelectedVoiceId] = useState('CwhRBWXzGAHq8TQ4Fs17'); // Default to Roger
  const [testText, setTestText] = useState('Hello, I am your LoveleAI voice assistant. How can I help you today?');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTestVoice = async () => {
    if (!hasRequiredKeys('elevenLabs')) {
      toast.error('ElevenLabs API key not configured', {
        description: 'Please set up your API key in the configuration section'
      });
      return;
    }

    setIsPlaying(true);
    try {
      const audioData = await synthesizeSpeech(testText, selectedVoiceId);
      
      if (audioData) {
        await playAudio(audioData);
      } else {
        toast.error('Failed to generate speech');
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      toast.error('Error playing audio');
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Mic className="h-5 w-5 text-violet-400" />
          Voice Tester
        </CardTitle>
        <CardDescription className="text-gray-400">
          Test different voices for your agent
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <label className="text-sm text-gray-300 block">Select Voice</label>
          <VoiceSelector selectedVoiceId={selectedVoiceId} onSelectVoice={setSelectedVoiceId} />
        </div>
        
        <div className="space-y-3">
          <label className="text-sm text-gray-300 block">Test Phrase</label>
          <Input
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Enter text to test the voice"
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
      </CardContent>
      <CardFooter className="border-t border-white/10 pt-4">
        <Button
          onClick={handleTestVoice}
          disabled={isPlaying || !testText.trim()}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white"
        >
          {isPlaying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating speech...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Test Voice
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VoiceTester;
