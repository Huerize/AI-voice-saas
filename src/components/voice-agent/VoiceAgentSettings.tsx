
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Settings } from "lucide-react";

interface VoiceAgentSettingsProps {
  contextWindow: number;
  temperature: number;
  maxTokens: number;
  onSettingChange: (setting: string, value: number) => void;
}

const VoiceAgentSettings = ({
  contextWindow,
  temperature,
  maxTokens,
  onSettingChange
}: VoiceAgentSettingsProps) => {
  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Settings className="h-5 w-5 text-violet-400" />
          Agent Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-300">Context Window</Label>
            <Slider
              value={[contextWindow]}
              onValueChange={([value]) => onSettingChange('contextWindow', value)}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-gray-400">Messages to remember: {contextWindow}</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-300">Temperature</Label>
            <Slider
              value={[temperature]}
              onValueChange={([value]) => onSettingChange('temperature', value)}
              min={0}
              max={1}
              step={0.1}
              className="w-full"
            />
            <p className="text-xs text-gray-400">Creativity level: {temperature}</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-300">Max Tokens</Label>
            <Slider
              value={[maxTokens]}
              onValueChange={([value]) => onSettingChange('maxTokens', value)}
              min={100}
              max={2000}
              step={100}
              className="w-full"
            />
            <p className="text-xs text-gray-400">Response length: {maxTokens}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceAgentSettings;
