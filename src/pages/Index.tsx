
import { SignIn } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const Index = () => {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: "bg-violet-500 hover:bg-violet-600",
              card: "bg-transparent",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-400",
              socialButtonsBlockButton: "border-white/10 text-white hover:bg-white/10",
              formFieldLabel: "text-gray-400",
              formFieldInput: "bg-white/5 border-white/10 text-white",
              footerActionLink: "text-violet-400 hover:text-violet-300",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Index;
