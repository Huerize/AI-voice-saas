
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { hasRequiredKeys } from '@/services/configService';
import { AlertTriangle, CheckCircle, Bot } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const deepgramConfigured = hasRequiredKeys('deepgram');
  const elevenLabsConfigured = hasRequiredKeys('elevenLabs');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Voice Agent Dashboard</h1>
            <p className="text-slate-300">Configure and access your AI voice agent</p>
          </div>
          
          <Button onClick={() => navigate("/voice-agent")} className="bg-gradient-to-r from-violet-600 to-indigo-600 mt-4 md:mt-0">
            <Bot className="mr-2 h-5 w-5" />
            Launch Voice Agent
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              API Configuration
              {deepgramConfigured && elevenLabsConfigured ? (
                <CheckCircle className="ml-2 h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="ml-2 h-5 w-5 text-amber-500" />
              )}
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Deepgram STT</span>
                {deepgramConfigured ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>ElevenLabs TTS</span>
                {elevenLabsConfigured ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                )}
              </div>
              <Button 
                onClick={() => navigate("/voice-agent/settings")} 
                variant="outline" 
                className="mt-4 w-full border-violet-500 text-violet-400 hover:bg-violet-500/10"
              >
                Configure Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
