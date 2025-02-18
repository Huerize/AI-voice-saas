
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, SignIn, SignUp } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const CLERK_PUBLISHABLE_KEY = "pk_test_d29ya2luZy1ld2UtNDIuY2xlcmsuYWNjb3VudHMuZGV2JA";

const App = () => {
  console.log("App rendering with Clerk key:", CLERK_PUBLISHABLE_KEY);
  
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-[#0A0A0B]">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route 
                  path="/sign-in/*" 
                  element={
                    <SignIn 
                      routing="path" 
                      path="/sign-in" 
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
                  } 
                />
                <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default App;
