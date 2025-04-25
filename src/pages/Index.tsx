
import React from 'react';
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Bot, Phone, Mic, Headphones, Sparkles } from "lucide-react";

const Index = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Next Generation <span className="text-violet-500">Voice AI</span> Platform
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mb-10">
            Create intelligent voice agents for your business with our cutting-edge AI platform.
            Powered by Agora, Deepgram, and ElevenLabs technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {isSignedIn ? (
              <>
                <Button onClick={() => navigate("/dashboard")} size="lg" className="bg-violet-600 hover:bg-violet-700">
                  Go to Dashboard
                </Button>
                <Button onClick={() => navigate("/voice-agent")} size="lg" variant="outline" className="border-violet-500 text-violet-400 hover:bg-violet-500/10">
                  <Phone className="mr-2 h-4 w-4" />
                  Voice Agent
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate("/sign-in")} size="lg" className="bg-violet-600 hover:bg-violet-700">
                  Sign In
                </Button>
                <Button onClick={() => navigate("/sign-up")} size="lg" variant="outline" className="border-violet-500 text-violet-400 hover:bg-violet-500/10">
                  Create Account
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-gradient-to-b from-violet-900/20 to-black py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Advanced Voice AI Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/40 backdrop-blur-xl border border-violet-500/20 rounded-xl p-6">
              <div className="bg-violet-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Voice Recognition</h3>
              <p className="text-gray-400">
                Advanced speech-to-text capabilities powered by Deepgram's AI technology.
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-xl border border-violet-500/20 rounded-xl p-6">
              <div className="bg-violet-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Headphones className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Natural Voice</h3>
              <p className="text-gray-400">
                Lifelike text-to-speech with ElevenLabs' cutting-edge voice synthesis technology.
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-xl border border-violet-500/20 rounded-xl p-6">
              <div className="bg-violet-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart AI</h3>
              <p className="text-gray-400">
                Context-aware conversations with customizable AI models and knowledge bases.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button onClick={() => isSignedIn ? navigate("/voice-agent") : navigate("/sign-up")} size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600">
              <Sparkles className="mr-2 h-4 w-4" />
              {isSignedIn ? "Access Voice Agent" : "Get Started Now"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
