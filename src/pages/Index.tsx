import { motion } from "framer-motion";
import { ArrowRight, Check, Bell, Share2, Repeat, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/marquee";
import { cn } from "@/lib/utils";

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

  const features = [
    {
      Icon: Share2,
      name: "Thousands of Integrations",
      description: "Connect with your favorite tools and automate your workflow with our extensive integration library.",
      className: "col-span-2",
      background: (
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-2xl" />
        </div>
      ),
    },
    {
      Icon: Bell,
      name: "24/7 AI Agents",
      description: "Our AI agents work around the clock to ensure your tasks are completed efficiently and accurately.",
      className: "col-span-1",
      background: (
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-2xl" />
        </div>
      ),
    },
    {
      Icon: Repeat,
      name: "Multiple Language Support",
      description: "Break language barriers with support for over 100 languages, enabling global communication.",
      className: "col-span-1",
      background: (
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 blur-2xl" />
        </div>
      ),
    },
    {
      Icon: Clock,
      name: "Task-Specific Agents",
      description: "Specialized AI agents for different tasks, from customer service to data analysis.",
      className: "col-span-2",
      background: (
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-500 to-blue-500 blur-2xl" />
        </div>
      ),
    },
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for trying out our AI voice agents",
      features: [
        "1 AI Voice Agent",
        "100 minutes/month",
        "Basic analytics",
        "Email support",
        "Standard voice models"
      ]
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "5 AI Voice Agents",
        "1,000 minutes/month",
        "Advanced analytics",
        "Priority support",
        "Premium voice models",
        "Custom workflows",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large-scale operations",
      features: [
        "Unlimited AI Agents",
        "Custom minutes/month",
        "Enterprise analytics",
        "24/7 dedicated support",
        "Custom voice models",
        "Advanced integrations",
        "SLA guarantees",
        "Custom deployment"
      ]
    }
  ];

  const faqs = [
    {
      question: "How accurate is the voice recognition?",
      answer: "Our AI voice recognition system achieves over 95% accuracy across multiple languages and accents, powered by state-of-the-art machine learning models."
    },
    {
      question: "Can I customize the voice of my AI agent?",
      answer: "Yes, you can choose from our library of premium voices or create a custom voice that matches your brand identity perfectly."
    },
    {
      question: "What languages are supported?",
      answer: "We support over 100 languages for both voice recognition and speech synthesis, making our platform truly global."
    },
    {
      question: "How does billing work?",
      answer: "Billing is based on the minutes of voice interaction processed. You only pay for what you use, and unused minutes roll over to the next month on paid plans."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">Magic UI</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#careers" className="text-gray-300 hover:text-white transition-colors">Careers</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Log in
              </Button>
              <Button className="bg-white text-black hover:bg-white/90">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent opacity-20" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-8 py-32"
          >
            <motion.div variants={itemVariants}>
              <span className="px-4 py-1.5 rounded-full bg-white/5 text-white/80 text-sm font-medium inline-block mb-4 backdrop-blur-sm border border-white/10">
                ✨ Welcome to the Future of Voice AI →
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-6xl sm:text-7xl lg:text-8xl font-medium text-white leading-none tracking-tight"
              style={{ fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Supercharge your
              <br />
              Call Operations
              <br />
              <span className="text-neutral-400">
                with Voice AI.
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-neutral-400 max-w-2xl mx-auto font-light"
            >
              Build, test, and deploy production-ready AI voice agents at scale. 
              Automate customer interactions with natural conversations.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 text-base font-medium"
              >
                Get Started for free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-12 text-base font-medium border-white/10 hover:bg-white/5"
              >
                Book a demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent h-40 -bottom-1 z-10" />
            <div className="glass-card rounded-xl overflow-hidden">
              <img 
                src="/lovable-uploads/a52d6d6c-7033-4711-bdd0-79da0895eb0a.png"
                alt="Dashboard Preview"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to streamline your workflow and boost productivity
            </p>
          </motion.div>

          <BentoGrid>
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <BentoCard {...feature} />
              </motion.div>
            ))}
          </BentoGrid>
        </div>
      </section>

      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-base text-gray-400 mb-8">Trusted by innovative companies</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-50">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-12 w-full bg-white/10 rounded" />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-400">Start building with AI voice agents today</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "glass-card p-8 rounded-xl relative",
                  plan.popular && "border-purple-500/50 shadow-purple-500/20"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-500 text-white text-sm rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white mb-4">{plan.name}</h3>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-400">{plan.period}</span>}
                  <p className="text-sm text-gray-400 mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn(
                    "w-full",
                    plan.popular ? "bg-white text-black hover:bg-white/90" : "border-white/10 hover:bg-white/5"
                  )}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about our AI voice agents</p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-gradient-to-b from-transparent to-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partners</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400">© 2024 VoiceAI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
