
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <div className="flex">
        {/* We'll implement the full dashboard UI in the next iteration */}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-white">Welcome back, {user.firstName}!</h1>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
