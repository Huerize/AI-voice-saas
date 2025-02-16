import { motion } from "framer-motion";
import { ArrowRight, Check, Bell, Share2, Repeat, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/marquee";

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
                ✨ Introducing Magic UI Template →
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-6xl sm:text-7xl lg:text-8xl font-medium text-white leading-none tracking-tight"
              style={{ fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Magic UI is the new way
              <br />
              <span className="text-neutral-400">
                to build landing pages.
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-neutral-400 max-w-2xl mx-auto font-light"
            >
              Beautifully designed, animated components and templates built with
              Tailwind CSS, React, and Framer Motion.
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

      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-400">Start for free, upgrade when you're ready</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {['Starter', 'Pro', 'Enterprise'].map((plan, i) => (
              <motion.div
                key={plan}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-xl"
              >
                <h3 className="text-xl font-semibold text-white mb-4">{plan}</h3>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">
                    {i === 0 ? 'Free' : i === 1 ? '$49' : 'Custom'}
                  </span>
                  {i === 1 && <span className="text-gray-400">/month</span>}
                </div>
                <ul className="space-y-4 mb-8">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <li key={j} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      Feature {j + 1}
                    </li>
                  ))}
                </ul>
                <Button
                  className={i === 1 ? "w-full bg-white text-black hover:bg-white/90" : "w-full"}
                  variant={i === 1 ? "default" : "outline"}
                >
                  Get started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Social</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>© 2024 Huerize. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
