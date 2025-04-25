
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Mic, Copy, Check, Volume2 } from 'lucide-react';
import { toast } from 'sonner';
import { availableVoices, synthesizeSpeech, playAudio } from '@/services/ttsService';

interface Voice {
  id: string;
  name: string;
  gender: 'male' | 'female';
}

const VoiceSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast.success('Voice ID copied to clipboard');
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleTestVoice = async (voiceId: string) => {
    setPlayingVoiceId(voiceId);
    try {
      const voice = availableVoices.find(v => v.id === voiceId);
      const testText = `Hello, my name is ${voice?.name || 'Voice Agent'}. How can I help you today?`;
      
      const audioData = await synthesizeSpeech(testText, voiceId);
      
      if (audioData) {
        await playAudio(audioData);
      }
    } catch (error) {
      console.error('Error playing voice sample:', error);
      toast.error('Failed to play voice sample');
    } finally {
      setPlayingVoiceId(null);
    }
  };

  const filteredVoices = searchTerm.trim() === ''
    ? availableVoices
    : availableVoices.filter(voice => 
        voice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voice.gender.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Mic className="h-5 w-5 text-violet-400" />
          Voice Search
        </CardTitle>
        <CardDescription className="text-gray-400">
          Search and test available voices for your agent
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10 bg-white/5 border-white/10 text-white"
            placeholder="Search by name, ID, or gender..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          {filteredVoices.map((voice) => (
            <div
              key={voice.id}
              className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  voice.gender === 'male' ? 'bg-blue-500/20' : 'bg-pink-500/20'
                }`}>
                  <Mic className={`h-5 w-5 ${
                    voice.gender === 'male' ? 'text-blue-400' : 'text-pink-400'
                  }`} />
                </div>
                
                <div>
                  <p className="font-medium text-white">{voice.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs capitalize text-gray-400">{voice.gender}</span>
                    <span className="text-xs text-gray-500 font-mono">{voice.id}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-violet-400"
                  onClick={() => handleTestVoice(voice.id)}
                  disabled={playingVoiceId !== null}
                >
                  {playingVoiceId === voice.id ? (
                    <div className="h-4 w-4 flex items-center justify-center">
                      <div className="animate-pulse bg-violet-400 h-2 w-2 rounded-full"></div>
                    </div>
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-violet-400"
                  onClick={() => handleCopyId(voice.id)}
                >
                  {copiedId === voice.id ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
          
          {filteredVoices.length === 0 && (
            <div className="py-8 text-center text-gray-400">
              <p>No voices matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-white/10 pt-4">
        <div className="w-full text-xs text-gray-400 flex justify-between">
          <span>{filteredVoices.length} of {availableVoices.length} voices</span>
          <span>Click voice ID to copy for use in your application</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VoiceSearch;
