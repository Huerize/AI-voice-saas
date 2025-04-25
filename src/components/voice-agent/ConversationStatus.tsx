
import React from 'react';
import { Bot, User } from 'lucide-react';

interface ConversationStatusProps {
  isAgentSpeaking: boolean;
  transcript: string;
  lastResponse?: string;
}

const ConversationStatus = ({ isAgentSpeaking, transcript, lastResponse }: ConversationStatusProps) => {
  return (
    <div className="space-y-2">
      {transcript && !isAgentSpeaking && (
        <div className="flex items-start gap-2 animate-fade-in">
          <User className="h-4 w-4 text-violet-400 mt-1" />
          <div className="flex-1">
            <p className="text-sm text-gray-400 font-medium">You</p>
            <p className="text-sm text-white">{transcript}</p>
          </div>
        </div>
      )}
      
      {lastResponse && isAgentSpeaking && (
        <div className="flex items-start gap-2 animate-fade-in">
          <Bot className="h-4 w-4 text-violet-400 mt-1" />
          <div className="flex-1">
            <p className="text-sm text-gray-400 font-medium">AI Assistant</p>
            <p className="text-sm text-white">{lastResponse}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationStatus;
