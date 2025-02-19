
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Settings, Users, Bell } from "lucide-react";

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-white/10">
          <div className="p-4">
            <h1 className="text-xl font-bold text-white mb-8">Magic UI</h1>
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5">
                <Users className="mr-2 h-4 w-4" />
                Team
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-gray-900/50 border-b border-white/10 backdrop-blur-xl">
            <div className="px-8 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Dashboard</h2>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5 text-gray-400" />
                </Button>
                <div className="text-sm text-white">
                  Welcome, {user?.firstName}
                </div>
              </div>
            </div>
          </header>

          <main className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dashboard cards */}
              <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-2">Total Calls</h3>
                <p className="text-3xl font-bold text-white">1,234</p>
              </div>
              <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-2">Active Agents</h3>
                <p className="text-3xl font-bold text-white">12</p>
              </div>
              <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-2">Success Rate</h3>
                <p className="text-3xl font-bold text-white">98.5%</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
