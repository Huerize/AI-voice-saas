import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>You are signed in!</p>
    </div>
  );
};

export default Dashboard;
