
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const Index = () => {
  const { isSignedIn, isLoaded } = useUser();

  console.log("Index rendering:", { isSignedIn, isLoaded });

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" />;
  }

  return <Navigate to="/sign-in" />;
};

export default Index;
