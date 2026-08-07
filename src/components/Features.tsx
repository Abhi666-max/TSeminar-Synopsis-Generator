'use client';

import { motion } from 'framer-motion';
import { Cpu, Zap, LayoutTemplate, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Cpu className="w-6 h-6 text-blue-400" />,
    title: "Groq Neural Inference",
    description: "Powered by Groq's lightning-fast LPU architecture to synthesize highly technical, context-aware content instantly."
  },
  {
    icon: <Zap className="w-6 h-6 text-purple-400" />,
    title: "Intelligent Synthesis",
    description: "No base paper? No problem. Give us a title and we synthesize highly technical, context-aware content instantly."
  },
  {
    icon: <LayoutTemplate className="w-6 h-6 text-pink-400" />,
    title: "Universal Layout Engine",
    description: "Overlays data directly onto any official university PDF template. Perfect margins, fonts, and spacing for all formats."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
    title: "100% Secure",
    description: "API keys are heavily encrypted and executed exclusively server-side. No data leaks, ever."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative z-10 px-6 bg-gradient-to-b from-transparent to-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-2 mb-4"
          >
            Universal Academic Excellence.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="subtitle"
          >
            Every feature designed to eliminate manual labor.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative p-[1px] rounded-3xl group cursor-pointer overflow-hidden"
            >
              {/* Continuous Animated Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 animate-border-glow transition-opacity duration-500 rounded-3xl" />
              
              <div className="relative h-full glass-panel group-hover:glass-panel-hover p-8 rounded-[23px] transition-all duration-300">
                <div className="bg-glass-bg w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-glass-border shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_25px_var(--glow-primary)]">
                  {feature.icon}
                </div>
                <h3 className="heading-3 mb-3 text-white transition-colors">{feature.title}</h3>
                <p className="body-text text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
