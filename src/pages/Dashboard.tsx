
import { useUser } from "@clerk/clerk-react";
import { Navigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  FileText, 
  Home,
  Languages,
  MessageSquare,
  Phone,
  Settings,
  User2,
  Volume2
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Simulated real-time data
const generateCallData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    calls: Math.floor(Math.random() * 100) + 50
  }));
};

const COLORS = ['#9b87f5', '#6E59A5', '#1EAEDB'];
const AI_DATA = [
  { name: 'AI Handled', value: 70 },
  { name: 'Human Assisted', value: 20 },
  { name: 'Failed', value: 10 },
];

const Sidebar = () => {
  const location = useLocation();
  const { toast } = useToast();
  const menuItems = [
    { icon: Home, label: "Dashboard Overview", path: "#overview" },
    { icon: BarChart3, label: "Real-Time Analytics", path: "#analytics" },
    { icon: MessageSquare, label: "Call Logs", path: "#calls" },
    { icon: Volume2, label: "Agent Performance", path: "#performance" },
    { icon: Calendar, label: "Appointments", path: "#appointments" },
    { icon: User2, label: "CRM & Data", path: "#crm" },
    { icon: Languages, label: "Language Support", path: "#language" },
    { icon: Settings, label: "AI Settings", path: "#settings" },
    { icon: Clock, label: "Notifications", path: "#notifications" },
    { icon: FileText, label: "Reports", path: "#reports" },
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 h-screen fixed left-0 top-0 bg-black/30 backdrop-blur-xl border-r border-white/10"
    >
      <div className="p-6">
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-2xl font-bold text-white mb-8"
        >
          Huerize
        </motion.h1>
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="ghost"
                className={`w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all group
                  ${location.hash === item.path ? 'bg-white/10 text-white' : ''}`}
                onClick={() => {
                  toast({
                    title: `Navigating to ${item.label}`,
                    description: "Loading section...",
                    duration: 2000,
                  });
                }}
              >
                <item.icon className="w-5 h-5 group-hover:text-violet-400" />
                <span>{item.label}</span>
              </Button>
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

const TopNav = () => {
  const { user } = useUser();
  
  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 fixed top-0 right-0 left-64 bg-black/30 backdrop-blur-xl border-b border-white/10 px-6 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <input 
            type="search"
            placeholder="Search..."
            className="w-64 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500"
          />
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <Clock className="w-4 h-4" />
          <span>Last 7 days</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-violet-600/20 text-violet-400 rounded-lg flex items-center justify-center">
          <Phone className="w-4 h-4" />
        </div>
        <div className="w-8 h-8 bg-emerald-600/20 text-emerald-400 rounded-lg flex items-center justify-center">
          <span className="text-sm">5</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center">
            {user?.firstName?.[0]}
          </div>
          <span className="text-white">{user?.firstName}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const { isSignedIn, user } = useUser();
  const [callData, setCallData] = useState(generateCallData());
  const [totalCalls, setTotalCalls] = useState(1234);
  const [responseRate, setResponseRate] = useState(85);
  const { toast } = useToast();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCallData(generateCallData());
      setTotalCalls(prev => prev + Math.floor(Math.random() * 10));
      setResponseRate(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 5)));
      
      toast({
        title: "Real-time Update",
        description: "Dashboard data has been refreshed",
        duration: 2000,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isSignedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Sidebar />
      <TopNav />
      <main className="pl-64 pt-16">
        <div className="p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-4 gap-4 mb-6"
          >
            {[
              { title: "Total Calls", value: totalCalls },
              { title: "Response Rate", value: `${responseRate}%` },
              { title: "Success Rate", value: "85%" },
              { title: "Failed Calls", value: "234" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
              >
                <h3 className="text-gray-400 text-sm mb-2">{item.title}</h3>
                <div className="text-2xl font-bold text-white">
                  {item.value}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg"
            >
              <h3 className="text-white text-lg mb-4">Call Volume Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={callData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="day" stroke="#ffffff50" />
                    <YAxis stroke="#ffffff50" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="calls" 
                      stroke="#9b87f5" 
                      fill="#9b87f550"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg"
            >
              <h3 className="text-white text-lg mb-4">AI vs Human Handling</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={AI_DATA}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {AI_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Additional Sections */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4 mt-6"
          >
            {/* Active Calls Section */}
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg">
              <h3 className="text-white text-lg mb-4">Active Calls</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((call) => (
                  <div 
                    key={call}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-white">Call #{call}</span>
                    </div>
                    <span className="text-gray-400">Duration: 2:34</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg">
              <h3 className="text-white text-lg mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {[
                  "New appointment scheduled",
                  "Call completed successfully",
                  "Customer feedback received"
                ].map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <span className="text-white">{activity}</span>
                    <span className="text-gray-400">2min ago</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
