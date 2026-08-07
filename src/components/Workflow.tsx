'use client';

import { motion } from 'framer-motion';
import { Upload, BrainCircuit, FileDown } from 'lucide-react';

const steps = [
  {
    icon: <Upload className="w-6 h-6 text-blue-400" />,
    title: "Upload or Type",
    description: "Provide an IEEE base paper or simply type a title. The system adapts instantly."
  },
  {
    icon: <BrainCircuit className="w-6 h-6 text-purple-400" />,
    title: "AI Analysis",
    description: "Our custom intelligence layer, accelerated by Groq's lightning-fast LPU inference engine, processes the input..."
  },
  {
    icon: <FileDown className="w-6 h-6 text-green-400" />,
    title: "Download PDF",
    description: "Your perfectly formatted 2-page synopsis is rendered and downloaded locally."
  }
];

export default function Workflow() {
  return (
    <section id="how-it-works" className="py-24 relative z-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            How it works.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Three steps. Zero hassle.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-blue-500/0 via-purple-500/50 to-pink-500/0 -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-black border-2 border-white/10 flex items-center justify-center mb-6 relative overflow-hidden group-hover:border-purple-500/50 transition-colors shadow-2xl">
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-white/5 group-hover:bg-purple-500/20 transition-colors" />
                  <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
                
                <div className="absolute top-10 right-[-50%] hidden md:block">
                  {idx < steps.length - 1 && (
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.2 + 0.3 }}
                      className="w-full h-px bg-purple-500/50 origin-left"
                    />
                  )}
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
