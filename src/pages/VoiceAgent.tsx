
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Phone, Bot, MessageCircle, Mic, 
  Calendar, TrendingUp, Clock, Activity,
  Search, Bell, Shield, User, Settings,
  Database, LogOut
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import ActiveCallCard from "@/components/voice-agent/ActiveCallCard";
import AudioVisualizer from "@/components/voice-agent/AudioVisualizer";
import AgentStatusPanel from "@/components/voice-agent/AgentStatusPanel";
import CallStatsPanel from "@/components/voice-agent/CallStatsPanel";
import RecentTranscriptsPanel from "@/components/voice-agent/RecentTranscriptsPanel";

const VoiceAgent = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isCallActive, setIsCallActive] = useState(false);

  const handleMakeCall = () => {
    setIsCallActive(true);
    toast.success("Call initiated successfully");
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    toast.info("Call ended");
  };

  const renderDashboardContent = () => (
    <div className="space-y-8">
      {/* Top Stats */}
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
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Calls */}
        <div className="lg:col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Live Calls</h2>
          <div className="space-y-4">
            {isCallActive ? (
              <div className="space-y-4">
                <ActiveCallCard 
                  callId="CS-12345"
                  duration="02:45"
                  agentName="Customer Service Bot"
                  onEndCall={handleEndCall}
                />
                <div className="p-4 bg-white/5 rounded-lg">
                  <AudioVisualizer isActive={true} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-lg">
                <Phone className="h-12 w-12 text-violet-400 mb-4" />
                <p className="text-white text-lg mb-4">No active calls</p>
                <Button 
                  onClick={handleMakeCall}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  <Phone className="mr-2 h-4 w-4" /> Start Test Call
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Agent Status */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Agent Status</h2>
          <AgentStatusPanel />
        </div>
      </div>

      {/* Transcripts */}
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
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Voice Agent Settings</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-md font-medium text-white">Agent Configuration</h3>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-gray-400 mb-2">Select TTS Voice</p>
              <select className="w-full bg-white/10 border border-white/20 rounded p-2 text-white">
                <option>Roger (Male)</option>
                <option>Sarah (Female)</option>
                <option>Charlie (Male)</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-md font-medium text-white">Audio Settings</h3>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Audio Quality</span>
                <span className="text-white">High</span>
              </div>
              <input type="range" className="w-full" min="0" max="2" step="1" defaultValue="2" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-md font-medium text-white">API Integration</h3>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">ElevenLabs API Key</span>
                <Button size="sm" variant="outline">Configure</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
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
            </nav>
          </div>
        </div>

        {/* Main Content */}
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
