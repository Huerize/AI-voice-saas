
import React from 'react';
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface ActiveCallCardProps {
  callId: string;
  duration: string;
  agentName: string;
  onEndCall: () => void;
}

const ActiveCallCard = ({ callId, duration, agentName, onEndCall }: ActiveCallCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-violet-500/10 border border-violet-500/20 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <div>
          <p className="text-white font-medium">{agentName}</p>
          <p className="text-sm text-gray-400">Call ID: {callId} • Duration: {duration}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-violet-500/20"
        >
          View Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-red-500/10 border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/20"
          onClick={onEndCall}
        >
          <Phone className="mr-2 h-4 w-4" />
          End Call
        </Button>
      </div>
    </div>
  );
};

export default ActiveCallCard;
