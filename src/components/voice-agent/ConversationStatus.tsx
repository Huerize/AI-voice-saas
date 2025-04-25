
import React from 'react';
import { Bot, User, Clock } from 'lucide-react';

interface Message {
  role: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

interface ConversationStatusProps {
  isAgentSpeaking: boolean;
  transcript: string;
  lastResponse?: string;
  conversationHistory?: Message[];
}

const ConversationStatus = ({ 
  isAgentSpeaking, 
  transcript, 
  lastResponse, 
  conversationHistory = [] 
}: ConversationStatusProps) => {
  // Format the timestamp to a readable time string
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
      {/* Current transcript (user speaking) */}
      {transcript && !isAgentSpeaking && (
        <div className="flex items-start gap-2 animate-fade-in">
          <User className="h-4 w-4 text-violet-400 mt-1" />
          <div className="flex-1">
            <p className="text-sm text-gray-400 font-medium">You</p>
            <p className="text-sm text-white">{transcript}</p>
          </div>
        </div>
      )}
      
      {/* Current AI response (agent speaking) */}
      {lastResponse && isAgentSpeaking && (
        <div className="flex items-start gap-2 animate-fade-in">
          <Bot className="h-4 w-4 text-violet-400 mt-1" />
          <div className="flex-1">
            <p className="text-sm text-gray-400 font-medium">AI Assistant</p>
            <p className="text-sm text-white">{lastResponse}</p>
          </div>
        </div>
      )}

      {/* Conversation history */}
      {conversationHistory.length > 0 && (
        <div className="border-t border-gray-700/50 mt-4 pt-4 space-y-4">
          {conversationHistory.map((message, index) => (
            <div 
              key={`message-${index}`}
              className="flex items-start gap-2"
            >
              {message.role === 'user' ? (
                <User className="h-4 w-4 text-violet-400 mt-1" />
              ) : (
                <Bot className="h-4 w-4 text-violet-400 mt-1" />
              )}
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-400 font-medium">
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                <p className="text-sm text-white">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Show empty state when no conversation */}
      {!transcript && !isAgentSpeaking && conversationHistory.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-400 text-sm">No conversation yet. Start speaking to begin.</p>
        </div>
      )}
    </div>
  );
};

export default ConversationStatus;
