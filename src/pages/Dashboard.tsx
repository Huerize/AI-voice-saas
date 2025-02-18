
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
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

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: "Dashboard Overview" },
    { icon: BarChart3, label: "Real-Time Analytics" },
    { icon: MessageSquare, label: "Call Logs" },
    { icon: Volume2, label: "Agent Performance" },
    { icon: Calendar, label: "Appointments" },
    { icon: User2, label: "CRM & Data" },
    { icon: Languages, label: "Language Support" },
    { icon: Settings, label: "AI Settings" },
    { icon: Clock, label: "Notifications" },
    { icon: FileText, label: "Reports" },
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 h-screen fixed left-0 top-0 bg-black/30 backdrop-blur-xl border-r border-white/10"
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-8">Huerize</h1>
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.a
              key={index}
              href="#"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors group"
            >
              <item.icon className="w-5 h-5 group-hover:text-violet-400" />
              <span>{item.label}</span>
            </motion.a>
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
            {/* Analytics Cards */}
            {["Total Calls", "Response Rate", "Success Rate", "Failed Calls"].map((title, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg"
              >
                <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
                <div className="text-2xl font-bold text-white">
                  {index === 1 || index === 2 ? "85%" : "1,234"}
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
              {/* Add chart component here */}
              <div className="h-64 bg-white/5 rounded-lg"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg"
            >
              <h3 className="text-white text-lg mb-4">AI vs Human Handling</h3>
              {/* Add chart component here */}
              <div className="h-64 bg-white/5 rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
