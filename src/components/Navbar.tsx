'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GlobalGeneratorModal from './GlobalGeneratorModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform-gpu ${
        scrolled ? 'py-4 bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* PHASE 2: PREMIUM BRANDING */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => router.push('/')}>
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(121,40,202,0.3)] group-hover:shadow-[0_0_30px_rgba(0,112,243,0.6)] transition-all duration-500 border border-glass-border">
            <Image src="/logo.png" alt="KSE Synopsis Logo" width={40} height={40} className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:flex font-bold text-xl tracking-widest items-center bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            KSE SYNOPSIS
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'How it Works', 'FAQ'].map((item) => (
            <a 
              key={item} 
              href={`/#${item.toLowerCase().replace(/ /g, '-')}`} 
              className="text-sm font-semibold text-gray-400 hover:text-white transition-colors relative group tracking-wide"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full duration-300 rounded-full"></span>
            </a>
          ))}
        </nav>

        {/* PHASE 3: HEADER CTA REDESIGN */}
        <div className="flex items-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group isolate rounded-full transition-all duration-500"
          onClick={() => setIsModalOpen(true)}
        >
          {/* Subtle Animated Border Sweep Effect */}
          <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 opacity-100 -z-10 animate-gradient-x" />
          
          <div className="relative bg-black/60 transition-colors duration-500 px-6 py-2.5 rounded-full flex items-center gap-2">
            <span className="text-sm font-semibold text-white tracking-wide z-10">Generate Now</span>
            <svg className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </motion.button>
        </div>
      </div>
      <GlobalGeneratorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.header>
  );
}
