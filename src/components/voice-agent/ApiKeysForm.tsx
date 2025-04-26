import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getApiKeys, saveApiKeys, APIKeys } from '@/services/configService';
import { Shield, Key, AlertTriangle } from "lucide-react";

const ApiKeysForm = () => {
  const [apiKeys, setApiKeys] = useState<APIKeys>({
    agoraAppId: '',
    agoraAppCertificate: '',
    deepgramApiKey: 'bd742128fc06d983d13a737f2fae70285973fee3',
    elevenLabsApiKey: 'sk_3a9fc296879eb50a5021de21d473f070fda205134bb3635a',
    openAIApiKey: ''
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedKeys = getApiKeys();
    setApiKeys(prev => ({
      ...prev,
      ...storedKeys
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApiKeys(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      saveApiKeys(apiKeys);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setApiKeys({
      agoraAppId: '',
      agoraAppCertificate: '',
      deepgramApiKey: '',
      elevenLabsApiKey: '',
      openAIApiKey: ''
    });
  };

  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Shield className="h-5 w-5 text-violet-400" />
          API Configuration
        </CardTitle>
        <CardDescription className="text-gray-400">
          Configure your API keys for voice agent integration
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5" />
              <p className="text-sm text-amber-200">
                These keys are stored locally in your browser. For production use, consider using 
                server-side storage or environment variables.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-medium text-white border-b border-white/10 pb-2">Agora Configuration</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agoraAppId" className="text-gray-300">Agora App ID</Label>
                <div className="relative">
                  <Input
                    id="agoraAppId"
                    name="agoraAppId"
                    value={apiKeys.agoraAppId || ''}
                    onChange={handleChange}
                    className="pl-9 bg-white/5 border-white/10 text-white"
                  />
                  <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="agoraAppCertificate" className="text-gray-300">Agora App Certificate</Label>
                <div className="relative">
                  <Input
                    id="agoraAppCertificate"
                    name="agoraAppCertificate"
                    value={apiKeys.agoraAppCertificate || ''}
                    onChange={handleChange}
                    className="pl-9 bg-white/5 border-white/10 text-white"
                    type="password"
                  />
                  <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-medium text-white border-b border-white/10 pb-2">Voice Services</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deepgramApiKey" className="text-gray-300">Deepgram API Key</Label>
                <div className="relative">
                  <Input
                    id="deepgramApiKey"
                    name="deepgramApiKey"
                    value={apiKeys.deepgramApiKey || ''}
                    onChange={handleChange}
                    className="pl-9 bg-white/5 border-white/10 text-white"
                    type="password"
                  />
                  <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="elevenLabsApiKey" className="text-gray-300">ElevenLabs API Key</Label>
                <div className="relative">
                  <Input
                    id="elevenLabsApiKey"
                    name="elevenLabsApiKey"
                    value={apiKeys.elevenLabsApiKey || ''}
                    onChange={handleChange}
                    className="pl-9 bg-white/5 border-white/10 text-white"
                    type="password"
                  />
                  <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="openAIApiKey" className="text-gray-300">OpenAI API Key</Label>
                <div className="relative">
                  <Input
                    id="openAIApiKey"
                    name="openAIApiKey"
                    value={apiKeys.openAIApiKey || ''}
                    onChange={handleChange}
                    className="pl-9 bg-white/5 border-white/10 text-white"
                    type="password"
                  />
                  <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-white/10 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleReset}
            className="border-white/10 text-white hover:bg-white/5"
          >
            Reset
          </Button>
          <Button 
            type="submit" 
            className="bg-violet-600 hover:bg-violet-700 text-white"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ApiKeysForm;
