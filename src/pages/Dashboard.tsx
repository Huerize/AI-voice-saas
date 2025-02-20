import { useUser, useClerk } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  LayoutDashboard, Settings, Users, Bell, Phone, Calendar, 
  Database, Languages, Bot, FileText, Search, ChevronDown,
  ArrowUpRight, BarChart3, TrendingUp, Clock, Key, Shield, 
  LogOut, Mic, MessageCircle, Activity
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Successfully signed out");
      navigate("/");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const renderDashboardContent = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-violet-500/5 backdrop-blur-xl border border-violet-500/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Total Calls</h3>
            <Phone className="text-violet-400 h-5 w-5" />
          </div>
          <p className="text-3xl font-bold text-white">1,234</p>
          <p className="text-sm text-violet-200/70 mt-2">+12% from last month</p>
        </div>
        <div className="bg-violet-500/5 backdrop-blur-xl border border-violet-500/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Active Agents</h3>
            <Bot className="text-violet-400 h-5 w-5" />
          </div>
          <p className="text-3xl font-bold text-white">25</p>
          <p className="text-sm text-violet-200/70 mt-2">Currently online</p>
        </div>
        <div className="bg-violet-500/5 backdrop-blur-xl border border-violet-500/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Minutes Used</h3>
            <Clock className="text-violet-400 h-5 w-5" />
          </div>
          <p className="text-3xl font-bold text-white">4,321</p>
          <p className="text-sm text-violet-200/70 mt-2">This billing cycle</p>
        </div>
        <div className="bg-violet-500/5 backdrop-blur-xl border border-violet-500/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Success Rate</h3>
            <Activity className="text-violet-400 h-5 w-5" />
          </div>
          <p className="text-3xl font-bold text-white">95%</p>
          <p className="text-sm text-violet-200/70 mt-2">Average completion rate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Live Calls</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((call) => (
              <div key={call} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <p className="text-white font-medium">Customer Service Call #{call}</p>
                    <p className="text-sm text-gray-400">Duration: 5:23</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-violet-400 hover:text-violet-300">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Stats</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Call Quality</span>
                <span className="text-white">98%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: '98%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Response Time</span>
                <span className="text-white">92%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Customer Satisfaction</span>
                <span className="text-white">95%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: '95%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { icon: Phone, text: "New call recorded", time: "2 minutes ago" },
            { icon: Bot, text: "AI Agent updated", time: "5 minutes ago" },
            { icon: MessageCircle, text: "New feedback received", time: "10 minutes ago" },
            { icon: Shield, text: "Security check completed", time: "15 minutes ago" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
              <div className="p-2 bg-violet-500/10 rounded-lg">
                <activity.icon className="h-5 w-5 text-violet-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{activity.text}</p>
                <p className="text-sm text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
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

  const renderCallLogsContent = () => (
    <div className="space-y-6">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Calls</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((call) => (
            <div key={call} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">Call #{call}</p>
                <p className="text-sm text-gray-400">Today at 2:30 PM</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">Duration: 12:34</span>
                <Button variant="ghost" size="sm" className="text-violet-400 hover:text-violet-300">
                  View Recording
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <div className="flex min-h-screen">
        <div className="w-64 md:w-72 lg:w-80 bg-violet-500/5 backdrop-blur-xl border-r border-violet-500/10 hidden md:block">
          <div className="p-6">
            <h1 className="text-xl font-bold text-white mb-8">Magic UI</h1>
            <nav className="space-y-2">
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10 transition-all",
                  currentPage === 'dashboard' && "bg-violet-500/10 text-violet-400"
                )}
                onClick={() => setCurrentPage('dashboard')}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10",
                  currentPage === 'analytics' && "bg-violet-500/10 text-violet-400"
                )}
                onClick={() => setCurrentPage('analytics')}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10",
                  currentPage === 'calls' && "bg-violet-500/10 text-violet-400"
                )}
                onClick={() => setCurrentPage('calls')}
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Logs
              </Button>
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
                      placeholder="Search calls, leads, settings..."
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
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 bg-violet-500/5 backdrop-blur-xl border-violet-500/10">
                        <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-violet-500/10" />
                        <DropdownMenuItem className="hover:bg-violet-500/10 cursor-pointer">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Account Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-violet-500/10 cursor-pointer">
                          <Key className="mr-2 h-4 w-4" />
                          <span>Change Password</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-violet-500/10" />
                        <DropdownMenuItem onClick={handleSignOut} className="hover:bg-red-500/10 cursor-pointer text-red-400">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sign out</span>
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
            {currentPage === 'calls' && renderCallLogsContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
