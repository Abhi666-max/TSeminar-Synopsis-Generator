'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlobalGeneratorModal from './GlobalGeneratorModal';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-glass-bg border border-glass-border backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
            <span className="text-xs font-semibold text-gray-300 tracking-widest uppercase">Powered by Groq Neural Engine</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Generate <br className="hidden md:block" />
            <span className="text-white">Flawless Synopses</span> <br className="hidden md:block" />
            in Seconds.
          </h1>
          
          <p className="subtitle max-w-xl mx-auto lg:mx-0">
            Stop wasting hours formatting margins and typography. KSE Synopsis extracts, structures, and renders print-ready academic synopses and project reports for any format instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="relative group isolate rounded-full shadow-[0_0_20px_rgba(0,112,243,0.2)] hover:shadow-[0_0_40px_rgba(121,40,202,0.5)] transition-all duration-500 w-full sm:w-auto"
            >
              {/* Animated Border Sweep Effect */}
              <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
              <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-100 -z-10 animate-gradient-x" />
              
              <div className="relative bg-black/80 backdrop-blur-md transition-colors duration-500 px-8 py-4 rounded-full flex items-center justify-center gap-2">
                <span className="font-bold text-white tracking-wide z-10">Start Generating</span>
                <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative group isolate rounded-full transition-all duration-500 w-full sm:w-auto"
            >
              {/* Subtle Animated Border Sweep Effect */}
              <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 opacity-100 -z-10 animate-gradient-x" />
              
              <div className="relative bg-black/60 transition-colors duration-500 px-8 py-4 rounded-full flex items-center justify-center gap-2">
                <span className="font-semibold text-white transition-colors z-10">See how it works</span>
                <svg className="w-4 h-4 text-white transition-colors group-hover:translate-y-1 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Right 3D Visual Mesh/Interactive Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative h-[400px] md:h-[500px] flex items-center justify-center pointer-events-none"
        >
          {/* Abstract 3D Representation using CSS/Framer Motion */}
          <div className="relative w-full h-full max-w-md mx-auto [perspective:1000px]">
            <motion.div 
              animate={{ 
                rotateX: [0, 5, 0, -5, 0],
                rotateY: [0, 10, 0, -10, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-full h-full relative [transform-style:preserve-3d]"
            >
              {/* Floating Cards simulating pages */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black border border-gray-700/50 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-6 [transform:translateZ(10px)] flex flex-col"
              >
                <div className="w-1/2 h-4 bg-gray-500 rounded mb-4"></div>
                <div className="w-3/4 h-2 bg-gray-600 rounded mb-2"></div>
                <div className="w-full h-2 bg-gray-600 rounded mb-2"></div>
                <div className="w-5/6 h-2 bg-gray-600 rounded mb-8"></div>
                <div className="w-full flex-1 bg-gradient-to-b from-blue-500/20 to-transparent rounded border border-blue-500/30"></div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-[#110022] border border-purple-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(121,40,202,0.4)] transform rotate-3 [transform:translateZ(30px)] translate-x-4 translate-y-4"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary animate-spin-slow shadow-[0_0_15px_rgba(121,40,202,0.8)]"></div>
                  <div className="w-32 h-4 bg-white/40 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="w-full h-2 bg-white/20 rounded"></div>
                  <div className="w-full h-2 bg-white/20 rounded"></div>
                  <div className="w-2/3 h-2 bg-white/20 rounded"></div>
                </div>
                
                {/* Additional workflow nodes / Data streams */}
                <div className="mt-8 space-y-2">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3], x: [0, 20, 0] }} transition={{ duration: 2, repeat: Infinity }} className="h-1 bg-gradient-to-r from-primary to-transparent w-full rounded-full" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3], x: [0, -20, 0] }} transition={{ duration: 3, repeat: Infinity }} className="h-1 bg-gradient-to-r from-transparent to-secondary w-full rounded-full" />
                </div>
                
                <div className="absolute bottom-6 right-6 px-4 py-1.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30 flex items-center gap-1.5 font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Ready
                </div>
              </motion.div>

              {/* Floating abstract tech node */}
              <motion.div 
                animate={{ y: [-15, 15, -15], rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-white/10 backdrop-blur-md flex items-center justify-center [transform:translateZ(30px)]"
              >
                <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </motion.div>

            </motion.div>
          </div>
          
          {/* Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] translate-x-10 translate-y-10"></div>
        </motion.div>
      </div>

      <GlobalGeneratorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
