
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        
        <div className="relative pt-20 pb-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-8"
          >
            <motion.div variants={itemVariants}>
              <span className="px-4 py-1.5 rounded-full bg-white/5 text-white/80 text-sm font-medium inline-block mb-4 backdrop-blur-sm border border-white/10">
                ✨ Introducing Huerize
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight text-glow"
            >
              AI Voice is the new way
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                to connect with customers.
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Beautifully designed, AI-powered voice automation and workflow tools built with
              cutting-edge technology.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex justify-center gap-4"
            >
              <Button
                size="lg"
                className="group relative bg-white text-black hover:bg-white/90 px-8"
              >
                <span className="relative z-10">Get Started for free</span>
                <ArrowRight className="ml-2 w-4 h-4 relative z-10" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent h-40 -bottom-1 z-10" />
            <div className="glass-card rounded-xl overflow-hidden">
              <img 
                src="/lovable-uploads/c3894d12-d7e6-4113-b1f0-b18e6d53eb39.png"
                alt="Dashboard Preview"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
