
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Save, RefreshCw } from 'lucide-react';
import { toast } from "sonner";

interface SystemPromptEditorProps {
  initialPrompt?: string;
  onSavePrompt?: (prompt: string) => void;
}

const SystemPromptEditor = ({ 
  initialPrompt = "You are a helpful AI assistant for a college. You provide information about courses, admissions, campus facilities, and answer student queries in a friendly, professional manner. Always be concise but thorough in your explanations.", 
  onSavePrompt 
}: SystemPromptEditorProps) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePrompt = () => {
    if (prompt.trim().length < 10) {
      toast.error('System prompt is too short');
      return;
    }
    
    setIsSaving(true);
    setTimeout(() => {
      if (onSavePrompt) {
        onSavePrompt(prompt);
      }
      setIsSaving(false);
      toast.success('System prompt saved successfully');
    }, 800);
  };

  const handleResetPrompt = () => {
    setPrompt(initialPrompt);
    toast.info('System prompt reset to default');
  };

  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <FileText className="h-5 w-5 text-violet-400" />
          System Prompt
        </CardTitle>
        <CardDescription className="text-gray-400">
          Define how your AI assistant behaves and responds
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Textarea
          className="min-h-[200px] bg-white/5 border-white/10 text-white"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter system prompt instructions for your AI assistant..."
        />
        
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-3">
          <h4 className="text-sm font-medium text-violet-300 mb-2">Tips for effective prompting:</h4>
          <ul className="text-xs text-gray-400 space-y-1 list-disc pl-4">
            <li>Clearly define the AI's role and purpose</li>
            <li>Specify the tone and style of responses</li>
            <li>Include knowledge domains the AI should be familiar with</li>
            <li>Set boundaries for what the AI should not respond to</li>
            <li>Use explicit instructions like "be concise" or "explain in detail"</li>
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-white/10 pt-4 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="text-gray-400"
          onClick={handleResetPrompt}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        
        <Button
          onClick={handleSavePrompt}
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
              Save Prompt
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SystemPromptEditor;
