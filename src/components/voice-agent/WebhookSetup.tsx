
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Link, 
  Save, 
  RefreshCw, 
  Code, 
  FileJson, 
  Play 
} from 'lucide-react';
import { toast } from "sonner";

interface WebhookConfig {
  url: string;
  isActive: boolean;
  sendTranscripts: boolean;
  sendResponses: boolean;
  sendCallMetadata: boolean;
}

interface WebhookSetupProps {
  initialConfig?: Partial<WebhookConfig>;
  onSaveConfig?: (config: WebhookConfig) => void;
}

const defaultConfig: WebhookConfig = {
  url: '',
  isActive: false,
  sendTranscripts: true,
  sendResponses: true,
  sendCallMetadata: true
};

const WebhookSetup = ({ 
  initialConfig = {}, 
  onSaveConfig 
}: WebhookSetupProps) => {
  const [config, setConfig] = useState<WebhookConfig>({
    ...defaultConfig,
    ...initialConfig
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      url: e.target.value
    });
  };

  const handleToggleChange = (key: keyof WebhookConfig) => (checked: boolean) => {
    setConfig({
      ...config,
      [key]: checked
    });
  };

  const handleSaveConfig = () => {
    if (!config.url) {
      toast.error('Please enter a webhook URL');
      return;
    }
    
    if (!isValidUrl(config.url)) {
      toast.error('Please enter a valid URL');
      return;
    }
    
    setIsSaving(true);
    setTimeout(() => {
      if (onSaveConfig) {
        onSaveConfig(config);
      }
      setIsSaving(false);
      toast.success('Webhook configuration saved successfully');
    }, 800);
  };

  const handleTestWebhook = () => {
    if (!config.url) {
      toast.error('Please enter a webhook URL');
      return;
    }
    
    if (!isValidUrl(config.url)) {
      toast.error('Please enter a valid URL');
      return;
    }
    
    setIsTesting(true);
    
    // Simulate webhook test
    setTimeout(() => {
      setIsTesting(false);
      toast.success('Webhook test successful');
    }, 2000);
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Link className="h-5 w-5 text-violet-400" />
          Webhook Integration
        </CardTitle>
        <CardDescription className="text-gray-400">
          Configure webhook for call events and data integration
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="webhook-url" className="text-white">Webhook URL</Label>
            <div className="flex items-center">
              <Switch 
                id="webhook-active" 
                checked={config.isActive} 
                onCheckedChange={handleToggleChange('isActive')}
              />
              <Label htmlFor="webhook-active" className="ml-2 text-xs text-gray-400">
                {config.isActive ? 'Active' : 'Inactive'}
              </Label>
            </div>
          </div>
          
          <Input
            id="webhook-url"
            className="bg-white/5 border-white/10 text-white"
            placeholder="https://your-service.com/webhook"
            value={config.url}
            onChange={handleInputChange}
          />
          
          <p className="text-xs text-gray-500">
            This URL will receive POST requests with event data from your voice agent calls
          </p>
        </div>
        
        <div className="space-y-3 pt-2 border-t border-white/10">
          <h4 className="text-sm font-medium text-white">Data to Send</h4>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="send-transcripts" className="text-gray-300">User Transcripts</Label>
              <p className="text-xs text-gray-500">Send speech-to-text transcriptions</p>
            </div>
            <Switch 
              id="send-transcripts" 
              checked={config.sendTranscripts} 
              onCheckedChange={handleToggleChange('sendTranscripts')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="send-responses" className="text-gray-300">AI Responses</Label>
              <p className="text-xs text-gray-500">Send AI assistant responses</p>
            </div>
            <Switch 
              id="send-responses" 
              checked={config.sendResponses} 
              onCheckedChange={handleToggleChange('sendResponses')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="send-metadata" className="text-gray-300">Call Metadata</Label>
              <p className="text-xs text-gray-500">Send call duration, timestamps, etc.</p>
            </div>
            <Switch 
              id="send-metadata" 
              checked={config.sendCallMetadata} 
              onCheckedChange={handleToggleChange('sendCallMetadata')}
            />
          </div>
        </div>
        
        <div className="bg-black/50 rounded-lg p-4 border border-white/10">
          <div className="flex items-center mb-2">
            <FileJson className="h-4 w-4 text-amber-400 mr-2" />
            <h4 className="text-sm font-medium text-white">Sample Payload</h4>
          </div>
          
          <div className="bg-black/50 rounded p-3 overflow-x-auto">
            <pre className="text-xs text-gray-400 whitespace-pre">
{`{
  "event_type": "transcript",
  "timestamp": "2025-04-25T10:15:30Z",
  "call_id": "call-1234567890",
  "data": {
    "transcript": "Hello, I'd like to know more about your computer science program",
    "is_final": true,
    "confidence": 0.92
  }
}`}
            </pre>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-white/10 pt-4 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="text-violet-400 border-violet-400/30"
          onClick={handleTestWebhook}
          disabled={isTesting || !config.url}
        >
          {isTesting ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Play className="h-4 w-4 mr-2" />
          )}
          Test Webhook
        </Button>
        
        <Button
          onClick={handleSaveConfig}
          disabled={isSaving}
          className="bg-violet-600 hover:bg-violet-700 text-white"
        >
          {isSaving ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WebhookSetup;
