
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Zap, MessageSquare, GitCompare, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <Card className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100">
    <div className="flex items-start space-x-4">
      <div className="p-2 bg-purple-50 rounded-lg">
        <Icon className="w-6 h-6 text-purple-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </Card>
);

const ComparisonFeature = ({ feature, isAvailable }: { feature: string; isAvailable: boolean }) => (
  <div className="flex items-center space-x-2 py-2">
    <div className={`w-4 h-4 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-gray-200'}`} />
    <span className="text-sm text-gray-700">{feature}</span>
  </div>
);

const Index = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 text-sm font-medium inline-block mb-4">
            Revolutionizing Voice AI
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            AI-Powered Voice Automation
            <br />
            <span className="text-purple-600">for Modern Businesses</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your business communication with hyper-realistic AI voice agents and powerful workflow automation.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          {...fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features for Your Business
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to automate customer interactions and streamline your workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <FeatureCard
              icon={Cpu}
              title="AI Voice Agents"
              description="Hyper-realistic AI voices powered by advanced technology for natural conversations."
            />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
            <FeatureCard
              icon={Zap}
              title="Workflow Automation"
              description="Build powerful automation workflows with our intuitive drag-and-drop builder."
            />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
            <FeatureCard
              icon={MessageSquare}
              title="Multilingual Support"
              description="Communicate with customers in multiple languages including English, Arabic, and Hindi."
            />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.5 }}>
            <FeatureCard
              icon={GitCompare}
              title="Deep Integrations"
              description="Connect with your favorite tools including CRM, ERP, and business applications."
            />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.6 }}>
            <FeatureCard
              icon={Briefcase}
              title="Industry Solutions"
              description="Tailored solutions for Real Estate, Healthcare, E-commerce, and more."
            />
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            {...fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Huerize?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how we compare to other solutions in the market.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Huerize</h3>
              <ComparisonFeature feature="AI Voice Agents" isAvailable={true} />
              <ComparisonFeature feature="Workflow Automation" isAvailable={true} />
              <ComparisonFeature feature="Multilingual Support" isAvailable={true} />
              <ComparisonFeature feature="Custom API Integrations" isAvailable={true} />
              <ComparisonFeature feature="White-labeling" isAvailable={true} />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">VAPI AI</h3>
              <ComparisonFeature feature="AI Voice Agents" isAvailable={true} />
              <ComparisonFeature feature="Workflow Automation" isAvailable={false} />
              <ComparisonFeature feature="Multilingual Support" isAvailable={false} />
              <ComparisonFeature feature="Custom API Integrations" isAvailable={true} />
              <ComparisonFeature feature="White-labeling" isAvailable={true} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Retell AI</h3>
              <ComparisonFeature feature="AI Voice Agents" isAvailable={true} />
              <ComparisonFeature feature="Workflow Automation" isAvailable={false} />
              <ComparisonFeature feature="Multilingual Support" isAvailable={true} />
              <ComparisonFeature feature="Custom API Integrations" isAvailable={true} />
              <ComparisonFeature feature="White-labeling" isAvailable={false} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
