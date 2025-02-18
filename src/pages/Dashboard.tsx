
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isSignedIn, isLoaded, user } = useUser();

  console.log("Dashboard rendering:", { isSignedIn, isLoaded });

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.firstName || 'User'}!</h1>
      <p>You are signed in to the dashboard.</p>
    </div>
  );
};

export default Dashboard;
