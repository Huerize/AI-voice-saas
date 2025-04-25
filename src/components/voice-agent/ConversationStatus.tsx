
import React, { useRef, useEffect } from 'react';
import { Bot, User, Clock, Book, GraduationCap } from 'lucide-react';

interface Message {
  role: 'user' | 'agent';
  text: string;
  timestamp: Date;
  topic?: string;
  isEducational?: boolean;
}

interface ConversationStatusProps {
  isAgentSpeaking: boolean;
  transcript: string;
  lastResponse?: string;
  conversationHistory?: Message[];
  collegeContext?: string;
  courseName?: string;
}

const ConversationStatus = ({ 
  isAgentSpeaking, 
  transcript, 
  lastResponse, 
  conversationHistory = [],
  collegeContext = 'General',
  courseName
}: ConversationStatusProps) => {
  // Format the timestamp to a readable time string
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Auto-scroll to the bottom when new messages arrive
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcript, lastResponse, conversationHistory]);

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
      {/* College context header */}
      {collegeContext && (
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-700/50">
          <GraduationCap className="h-4 w-4 text-violet-400" />
          <p className="text-sm text-violet-300 font-medium">
            {collegeContext} {courseName ? `• ${courseName}` : ''}
          </p>
        </div>
      )}
      
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
            <p className="text-sm text-gray-400 font-medium">College Assistant</p>
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
              className={`flex items-start gap-2 ${message.isEducational ? 'bg-violet-500/10 p-2 rounded-lg' : ''}`}
            >
              {message.role === 'user' ? (
                <User className="h-4 w-4 text-violet-400 mt-1" />
              ) : (
                <Bot className="h-4 w-4 text-violet-400 mt-1" />
              )}
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-400 font-medium">
                    {message.role === 'user' ? 'You' : 'College Assistant'}
                  </p>
                  {message.topic && (
                    <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">
                      {message.topic}
                    </span>
                  )}
                  <p className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                <p className="text-sm text-white">{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Show empty state when no conversation */}
      {!transcript && !isAgentSpeaking && conversationHistory.length === 0 && (
        <div className="text-center py-6">
          <div className="mb-4 flex justify-center">
            <Book className="h-12 w-12 text-violet-400 opacity-30" />
          </div>
          <p className="text-gray-400 text-sm">Ready to assist with college information and queries.</p>
          <p className="text-gray-500 text-xs mt-2">Start speaking to begin your conversation.</p>
        </div>
      )}
    </div>
  );
};

export default ConversationStatus;
