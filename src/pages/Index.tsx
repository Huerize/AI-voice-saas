import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Bell, Share2, Repeat, Clock, ChevronRight, Shield, LayoutDashboard, FileText, Mic2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Marquee from "@/components/ui/marquee";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Index = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

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
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const features = [{
    Icon: Shield,
    name: "Advanced Security",
    description: "Enterprise-grade security with end-to-end encryption and compliance certifications.",
    className: "col-span-1",
    background: <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 blur-2xl" />
        </div>
  }, {
    Icon: LayoutDashboard,
    name: "Beautiful Dashboard",
    description: "Organize and manage calls efficiently with our intuitive dashboard interface.",
    className: "col-span-1",
    background: <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 blur-2xl" />
        </div>
  }, {
    Icon: FileText,
    name: "Call Transcripts",
    description: "Automatic transcription with high accuracy and multiple language support.",
    className: "col-span-1",
    background: <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 blur-2xl" />
        </div>
  }, {
    Icon: Mic2,
    name: "Call Recordings",
    description: "Secure storage and easy access to all your call recordings with advanced search.",
    className: "col-span-1",
    background: <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-500 to-blue-500 blur-2xl" />
        </div>
  }, {
    Icon: Bell,
    name: "Smart Notifications",
    description: "Get instant alerts and notifications for important calls and events with AI-powered prioritization.",
    className: "col-span-1",
    background: <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 blur-2xl" />
        </div>
  }, {
    Icon: Share2,
    name: "Team Collaboration",
    description: "Share calls, transcripts, and insights with your team in real-time for better coordination.",
    className: "col-span-1",
    background: <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 blur-2xl" />
        </div>
  }];

  const pricingTiers = [{
    name: "Starter",
    price: isYearly ? "Free" : "Free",
    description: "Perfect for trying out our AI voice agents",
    features: ["1 AI Voice Agent", "100 minutes/month", "Basic analytics", "Email support", "Standard voice models"]
  }, {
    name: "Pro",
    price: isYearly ? "$470" : "$49",
    period: isYearly ? "/year" : "/month",
    description: "Ideal for growing businesses",
    features: ["5 AI Voice Agents", "1,000 minutes/month", "Advanced analytics", "Priority support", "Premium voice models", "Custom workflows", "API access"],
    popular: true
  }, {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale operations",
    features: ["Unlimited AI Agents", "Custom minutes/month", "Enterprise analytics", "24/7 dedicated support", "Custom voice models", "Advanced integrations", "SLA guarantees", "Custom deployment"]
  }];

  const faqs = [{
    question: "How accurate is the voice recognition?",
    answer: "Our AI voice recognition system achieves over 95% accuracy across multiple languages and accents, powered by state-of-the-art machine learning models."
  }, {
    question: "Can I customize the voice of my AI agent?",
    answer: "Yes, you can choose from our library of premium voices or create a custom voice that matches your brand identity perfectly."
  }, {
    question: "What languages are supported?",
    answer: "We support over 100 languages for both voice recognition and speech synthesis, making our platform truly global."
  }, {
    question: "How does billing work?",
    answer: "Billing is based on the minutes of voice interaction processed. You only pay for what you use, and unused minutes roll over to the next month on paid plans."
  }];

  const trustedBy = [{
    name: "Deepgram",
    logo: "deepgram.svg"
  }, {
    name: "ElevenLabs",
    logo: "elevenlabs.svg"
  }, {
    name: "Microsoft",
    logo: "microsoft.svg"
  }];

  return (
    <div className="min-h-screen bg-[#0A0A0B] overflow-hidden">
      {/* Header with violet glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-violet-500/5 backdrop-blur-xl border-b border-violet-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">Magic UI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                  Features <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-violet-500/5 backdrop-blur-xl border-violet-500/10">
                  <DropdownMenuItem className="hover:bg-violet-500/10">Voice Recognition</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-violet-500/10">AI Agents</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-violet-500/10">Analytics</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-violet-500/10">Integrations</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                  Solutions <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-violet-500/5 backdrop-blur-xl border-violet-500/10">
                  <DropdownMenuItem className="hover:bg-violet-500/10">Enterprise</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-violet-500/10">Small Business</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-violet-500/10">Startups</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
              {isSignedIn ? (
                <>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white flex items-center gap-2"
                    onClick={() => navigate('/dashboard')}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                  <div className="h-6 w-px bg-white/10" />
                  <span className="text-white">Welcome, {user.firstName}</span>
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <Button variant="ghost" className="text-gray-300 hover:text-white">
                      Sign in
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="bg-violet-600 text-white hover:bg-violet-700">
                      Sign up for free
                    </Button>
                  </SignUpButton>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="relative min-h-[95vh]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent opacity-20" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center justify-center min-h-[95vh] text-center space-y-8 pt-20">
            <motion.div variants={itemVariants} className="w-full">
              <AnimatedGradientText>
                <div className="inline-flex items-center rounded-full border border-violet-500/20 bg-white/5 px-3 py-1 text-sm backdrop-blur">
                  🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300/20" />
                  <span className={cn("inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent")}>
                    Introducing Magic UI
                  </span>
                  <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </div>
              </AnimatedGradientText>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-medium text-white leading-none tracking-tight max-w-4xl mx-auto" style={{
            fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif"
          }}>
              Supercharge your
              <br />
              Call Operations
              <br />
              <span className="text-neutral-400">
                with <span className="text-violet-500">Voice AI</span>.
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto font-light">
              Build, test, and deploy production-ready AI voice agents at scale. 
              Automate customer interactions with natural conversations.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <SignUpButton mode="modal">
                <Button size="lg" className="bg-violet-600 text-white hover:bg-violet-700 rounded-full px-8 h-12 text-base font-medium w-full sm:w-auto">
                  Get Started for free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </SignUpButton>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base font-medium border-white/10 hover:bg-white/5 w-full sm:w-auto">
                Book a demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-8">Trusted by Industry Leaders</h2>
            <Marquee speed="normal" pauseOnHover fade />
          </motion.div>
        </div>
      </section>

      {/* Features section with violet glassmorphism */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent opacity-20" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <BentoCard
                key={feature.name}
                {...feature}
                className={cn(
                  "backdrop-blur-xl bg-violet-500/5 border-violet-500/10 hover:border-violet-500/20 h-[240px]",
                  feature.className
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ section with violet glassmorphism */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent opacity-20" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about our AI voice agents</p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem 
                key={i} 
                value={`item-${i}`} 
                className="backdrop-blur-xl bg-violet-500/5 border border-violet-500/10 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="text-lg font-semibold text-white px-6 hover:bg-violet-500/10">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 px-6 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-12">Trusted by Industry Leaders</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
              <div className="flex items-center justify-center">
                <img src="/logos/elevenlabs.svg" alt="ElevenLabs" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center">
                <img src="/logos/deepgram.svg" alt="Deepgram" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center">
                <img src="/logos/microsoft.svg" alt="Microsoft" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center">
                <img src="/logos/openai.svg" alt="OpenAI" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer with violet glassmorphism */}
      <footer className="border-t border-violet-500/10 py-12 bg-gradient-to-b from-transparent to-violet-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Partners</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-violet-500/10 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400">© 2024 VoiceAI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
