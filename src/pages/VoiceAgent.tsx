
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Phone, Bot, Mic, 
  Calendar, TrendingUp, Clock, Activity,
  Search, Bell, Shield, User, Settings,
  Database, MessageCircle, Sparkles, Link, Sliders
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import ActiveCallCard from "@/components/voice-agent/ActiveCallCard";
import AudioVisualizer from "@/components/voice-agent/AudioVisualizer";
import AgentStatusPanel from "@/components/voice-agent/AgentStatusPanel";
import CallStatsPanel from "@/components/voice-agent/CallStatsPanel";
import RecentTranscriptsPanel from "@/components/voice-agent/RecentTranscriptsPanel";
import ApiKeysForm from "@/components/voice-agent/ApiKeysForm";
import VoiceTester from "@/components/voice-agent/VoiceTester";
import VoiceSearch from "@/components/voice-agent/VoiceSearch";
import LiveCallInterface from "@/components/voice-agent/LiveCallInterface";
import KnowledgeBaseSettings from "@/components/voice-agent/KnowledgeBaseSettings";
import LLMSelector from "@/components/voice-agent/LLMSelector";
import SystemPromptEditor from "@/components/voice-agent/SystemPromptEditor";
import WebhookSetup from "@/components/voice-agent/WebhookSetup";
import { hasRequiredKeys } from "@/services/configService";
import { useVoiceAgentSettings } from "@/hooks/useVoiceAgentSettings";
import VoiceAgentSettings from "@/components/voice-agent/VoiceAgentSettings";

const VoiceAgent = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentSettingsTab, setCurrentSettingsTab] = useState('api-keys');
  const [isCallActive, setIsCallActive] = useState(false);
  const [configComplete, setConfigComplete] = useState({
    agora: false,
    deepgram: false,
    elevenLabs: false,
    openAI: false
  });

  // Use the voice agent settings hook
  const { settings, updateSettings } = useVoiceAgentSettings();

  useEffect(() => {
    setConfigComplete({
      agora: hasRequiredKeys('agora'),
      deepgram: hasRequiredKeys('deepgram'),
      elevenLabs: hasRequiredKeys('elevenLabs'),
      openAI: hasRequiredKeys('openAI')
    });
  }, [currentPage, currentSettingsTab]);

  const handleCallStatusChange = (isActive: boolean) => {
    setIsCallActive(isActive);
  };

  const handleLLMChange = (modelId: string) => {
    updateSettings({ selectedLLM: modelId });
    toast.success(`Model changed to ${modelId}`);
  };

  const handleKnowledgeBaseChange = (knowledgeBase: string | null) => {
    updateSettings({ knowledgeBase });
  };

  const handleSystemPromptChange = (prompt: string) => {
    updateSettings({ systemPrompt: prompt });
  };

  const handleVoiceAgentSettingChange = (setting: string, value: number) => {
    updateSettings({ [setting]: value });
  };

  const renderDashboardContent = () => (
    <div className="space-y-8">
      {(!configComplete.agora || !configComplete.elevenLabs || !configComplete.deepgram) && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-amber-400 mt-0.5" />
            <div>
              <p className="text-sm text-amber-200 font-medium">API Configuration Required</p>
              <p className="text-xs text-amber-200/80 mt-1">
                Some required API keys are missing. Please visit the 
                <Button 
                  variant="link" 
                  className="text-amber-400 p-0 h-auto text-xs font-medium"
                  onClick={() => {
                    setCurrentPage('settings');
                    setCurrentSettingsTab('api-keys');
                  }}
                >
                  {" "}Settings page
                </Button>{" "}
                to complete configuration.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <CallStatsPanel 
          title="Total Calls" 
          value="1,234" 
          change="+12%" 
          icon={Phone} 
        />
        <CallStatsPanel 
          title="Active Agents" 
          value="25" 
          description="Currently online" 
          icon={Bot} 
        />
        <CallStatsPanel 
          title="Minutes Used" 
          value="4,321" 
          description="This billing cycle" 
          icon={Clock} 
        />
        <CallStatsPanel 
          title="Success Rate" 
          value="95%" 
          description="Avg. completion" 
          icon={Activity}
          variant="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Live Calls</h2>
          <div className="space-y-4">
            {isCallActive ? (
              <div className="space-y-4">
                <ActiveCallCard 
                  callId="CS-12345"
                  duration="02:45"
                  agentName="College Assistant"
                  onEndCall={() => setIsCallActive(false)}
                />
                <div className="p-4 bg-white/5 rounded-lg">
                  <AudioVisualizer isActive={true} />
                </div>
              </div>
            ) : (
              <LiveCallInterface 
                onCallStatusChange={handleCallStatusChange} 
                agentName="College Assistant"
                selectedLLM={settings.selectedLLM}
                knowledgeBase={settings.knowledgeBase}
                systemPrompt={settings.systemPrompt}
              />
            )}
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
            <Sliders className="h-5 w-5 text-violet-400" />
            Agent Settings
          </h2>

          <div className="space-y-6">
            <VoiceAgentSettings
              contextWindow={settings.contextWindow}
              temperature={settings.temperature}
              maxTokens={settings.maxTokens}
              onSettingChange={handleVoiceAgentSettingChange}
            />

            {settings.selectedLLM && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span className="text-xs text-amber-300">Using model: {settings.selectedLLM}</span>
                </div>
              </div>
            )}
            
            {settings.knowledgeBase && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs text-emerald-300">Knowledge: {settings.knowledgeBase}</span>
                </div>
              </div>
            )}

            <Button 
              variant="ghost" 
              className="w-full text-violet-400 border border-violet-500/20"
              onClick={() => {
                setCurrentPage('settings');
                setCurrentSettingsTab('models');
              }}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Select LLM Model
            </Button>
          </div>
        </div>
      </div>

      <RecentTranscriptsPanel />
    </div>
  );

  const renderAnalyticsContent = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">Call Volume Trends</h3>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-400">Chart visualization coming soon...</p>
          </div>
        </div>
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">Agent Performance</h3>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-400">Performance metrics coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className="space-y-6">
      <Tabs 
        value={currentSettingsTab} 
        onValueChange={setCurrentSettingsTab} 
        className="w-full"
      >
        <TabsList className="grid grid-cols-5 bg-black/40 border border-white/10">
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="voices">Voices</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="api-keys" className="space-y-6 mt-6">
          <ApiKeysForm />
          <VoiceTester />
        </TabsContent>
        
        <TabsContent value="voices" className="space-y-6 mt-6">
          <VoiceSearch />
        </TabsContent>
        
        <TabsContent value="models" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LLMSelector 
              selectedModel={settings.selectedLLM} 
              onSelectModel={handleLLMChange} 
            />
            <SystemPromptEditor 
              initialPrompt={settings.systemPrompt}
              onSavePrompt={handleSystemPromptChange}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="knowledge" className="space-y-6 mt-6">
          <KnowledgeBaseSettings 
            onKnowledgeBaseChange={handleKnowledgeBaseChange} 
          />
        </TabsContent>
        
        <TabsContent value="webhooks" className="space-y-6 mt-6">
          <WebhookSetup />
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <div className="flex min-h-screen">
        <div className="w-64 md:w-72 lg:w-80 bg-violet-500/5 backdrop-blur-xl border-r border-violet-500/10 hidden md:block">
          <div className="p-6">
            <h1 className="text-xl font-bold text-white mb-8">LoveleAI</h1>
            <nav className="space-y-2">
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10 transition-all",
                  currentPage === 'dashboard' && "bg-violet-500/10 text-violet-400"
                )}
                onClick={() => setCurrentPage('dashboard')}
              >
                <Phone className="mr-2 h-4 w-4" />
                Voice Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10",
                  currentPage === 'analytics' && "bg-violet-500/10 text-violet-400"
                )}
                onClick={() => setCurrentPage('analytics')}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Analytics
              </Button>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10",
                  currentPage === 'settings' && "bg-violet-500/10 text-violet-400"
                )}
                onClick={() => setCurrentPage('settings')}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              
              <div className="pt-4 mt-4 border-t border-violet-500/10">
                <h3 className="text-xs uppercase text-gray-500 font-medium mb-2 px-3">Features</h3>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10"
                  onClick={() => {
                    setCurrentPage('settings');
                    setCurrentSettingsTab('knowledge');
                  }}
                >
                  <Database className="mr-2 h-4 w-4" />
                  Knowledge Base
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10"
                  onClick={() => {
                    setCurrentPage('settings');
                    setCurrentSettingsTab('models');
                  }}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  LLM Models
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10"
                  onClick={() => {
                    setCurrentPage('settings');
                    setCurrentSettingsTab('voices');
                  }}
                >
                  <Mic className="mr-2 h-4 w-4" />
                  Voice Library
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10"
                  onClick={() => {
                    setCurrentPage('settings');
                    setCurrentSettingsTab('webhooks');
                  }}
                >
                  <Link className="mr-2 h-4 w-4" />
                  Webhooks
                </Button>
              </div>
            </nav>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <header className="bg-violet-500/5 border-b border-violet-500/10 backdrop-blur-xl sticky top-0 z-10">
            <div className="px-4 md:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center flex-1 gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search calls, agents, settings..."
                      className="w-full bg-white/5 border border-violet-500/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-lg">
                      <Bell className="h-5 w-5 text-gray-400" />
                    </Button>
                    <div className="h-8 w-px bg-violet-500/10" />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="gap-2">
                          <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                            {user?.firstName?.[0]}
                          </div>
                          <span className="text-sm text-white hidden md:inline">{user?.firstName}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 bg-violet-500/5 backdrop-blur-xl border-violet-500/10">
                        <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-violet-500/10" />
                        <DropdownMenuItem className="hover:bg-violet-500/10 cursor-pointer">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Account Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-violet-500/10" />
                        <DropdownMenuItem onClick={() => navigate("/")} className="hover:bg-violet-500/10 cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Back to Main Dashboard</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="p-4 md:p-6 lg:p-8">
            {currentPage === 'dashboard' && renderDashboardContent()}
            {currentPage === 'analytics' && renderAnalyticsContent()}
            {currentPage === 'settings' && renderSettingsContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default VoiceAgent;
