import { useUser, useClerk } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Bell, 
  Phone, 
  Calendar, 
  Database, 
  Languages, 
  Bot, 
  FileText, 
  Search,
  ChevronDown,
  ArrowUpRight,
  BarChart3,
  TrendingUp,
  Clock,
  Key,
  Shield,
  LogOut
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

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleManageAccount = () => {
    window.location.href = `https://accounts.clerk.dev/user/`;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <div className="flex min-h-screen">
        {/* Glassmorphic Sidebar */}
        <div className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10">
          <div className="p-6">
            <h1 className="text-xl font-bold text-white mb-8">Magic UI</h1>
            <nav className="space-y-2">
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10 transition-all",
                  currentPage === 'dashboard' && "bg-violet-500/10 text-violet-400"
                )}
                onClick={() => handlePageChange('dashboard')}
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
                onClick={() => handlePageChange('analytics')}
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
                onClick={() => handlePageChange('calls')}
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Logs
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10">
                <Bot className="mr-2 h-4 w-4" />
                Agent Performance
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10">
                <Calendar className="mr-2 h-4 w-4" />
                Appointments
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10">
                <Database className="mr-2 h-4 w-4" />
                CRM Sync
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10">
                <Languages className="mr-2 h-4 w-4" />
                Languages
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10">
                <Settings className="mr-2 h-4 w-4" />
                AI Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-violet-400 hover:bg-violet-500/10">
                <FileText className="mr-2 h-4 w-4" />
                Reports
              </Button>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          {/* Top Navigation Bar */}
          <header className="bg-black/40 border-b border-white/10 backdrop-blur-xl sticky top-0 z-10">
            <div className="px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search calls, leads, settings..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-lg">
                    <Bell className="h-5 w-5 text-gray-400" />
                  </Button>
                  <div className="h-8 w-px bg-white/10" />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2">
                        <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center">
                          {user?.firstName?.[0]}
                        </div>
                        <span className="text-sm text-white">{user?.firstName}</span>
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleManageAccount} className="cursor-pointer">
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Account Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleManageAccount} className="cursor-pointer">
                        <Key className="mr-2 h-4 w-4" />
                        <span>Change Password</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </header>

          <main className="p-8">
            {currentPage === 'dashboard' && (
              <>
                {/* Analytics Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-violet-500/10 rounded-lg">
                        <Phone className="h-5 w-5 text-violet-400" />
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">Total Calls</h3>
                    <p className="text-2xl font-bold text-white mt-1">1,234</p>
                    <div className="flex items-center gap-1 mt-2">
                      <ArrowUpRight className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-green-400">+12.5%</span>
                      <span className="text-xs text-gray-400 ml-1">vs last week</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-violet-500/10 rounded-lg">
                        <Bot className="h-5 w-5 text-violet-400" />
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">Response Rate</h3>
                    <p className="text-2xl font-bold text-white mt-1">98.5%</p>
                    <div className="flex items-center gap-1 mt-2">
                      <ArrowUpRight className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-green-400">+2.1%</span>
                      <span className="text-xs text-gray-400 ml-1">vs last week</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-violet-500/10 rounded-lg">
                        <Clock className="h-5 w-5 text-violet-400" />
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">Avg. Call Time</h3>
                    <p className="text-2xl font-bold text-white mt-1">2m 45s</p>
                    <div className="flex items-center gap-1 mt-2">
                      <ArrowUpRight className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-green-400">-8.3%</span>
                      <span className="text-xs text-gray-400 ml-1">vs last week</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-violet-500/10 rounded-lg">
                        <Users className="h-5 w-5 text-violet-400" />
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">Active Agents</h3>
                    <p className="text-2xl font-bold text-white mt-1">12</p>
                    <div className="flex items-center gap-1 mt-2">
                      <ArrowUpRight className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-green-400">+1</span>
                      <span className="text-xs text-gray-400 ml-1">vs last week</span>
                    </div>
                  </motion.div>
                </div>

                {/* Live Calls Section */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-6 mb-8">
                  <h2 className="text-lg font-semibold text-white mb-4">Live Calls</h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((call) => (
                      <div key={call} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <div>
                            <h3 className="text-sm font-medium text-white">Call #{call}</h3>
                            <p className="text-xs text-gray-400">Duration: 1:23</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((activity) => (
                      <div key={activity} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                        <div className="p-2 bg-violet-500/10 rounded-lg">
                          <Phone className="h-4 w-4 text-violet-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">New call completed</h3>
                          <p className="text-xs text-gray-400">2 minutes ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {currentPage === 'analytics' && (
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Analytics</h2>
                <p className="text-gray-400">Detailed analytics coming soon...</p>
              </div>
            )}

            {currentPage === 'calls' && (
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Call Logs</h2>
                <p className="text-gray-400">Call history coming soon...</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
