import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Bot, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalGeneratorModal({ isOpen, onClose }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSelect = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-[101] p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#050505] border border-white/10 rounded-[32px] shadow-2xl pointer-events-auto relative scrollbar-hide"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <div className="p-6 md:p-12">
                <div className="text-center mb-8 md:mb-12 mt-4 md:mt-0">
                  <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-3 md:mb-4">Select Subject Format</h2>
                  <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">Choose the subject format you need to generate. Each generator is specifically tuned to match your university&apos;s exact formatting guidelines.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                  <button onClick={() => handleSelect('/seminar')} className="group relative flex flex-col items-start text-left p-6 md:p-10 h-full bg-white/[0.02] border border-white/[0.08] rounded-3xl hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 overflow-hidden w-full">
                    <div className="absolute top-0 right-0 p-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                    
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 group-hover:bg-white/[0.1] transition-all duration-500">
                      <FileText className="w-6 h-6 md:w-8 md:h-8 text-white/70" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-3 md:mb-4 tracking-tight">Technical Seminar</h3>
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed">
                      Generate a highly technical 2-page individual synopsis perfectly formatted for your engineering presentation.
                    </p>
                  </button>

                  <button onClick={() => handleSelect('/robotics')} className="group relative flex flex-col items-start text-left p-6 md:p-10 h-full bg-white/[0.02] border border-white/[0.08] rounded-3xl hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 overflow-hidden w-full">
                    <div className="absolute top-0 right-0 p-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>

                    <div className="absolute top-4 right-4 md:top-8 md:right-8 px-3 py-1 md:px-4 md:py-1.5 bg-white/10 text-white/70 text-[9px] md:text-[10px] font-medium tracking-widest uppercase rounded-full border border-white/10">
                      New Format
                    </div>
                    
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 group-hover:bg-white/[0.1] transition-all duration-500">
                      <Bot className="w-6 h-6 md:w-8 md:h-8 text-white/70" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-3 md:mb-4 tracking-tight">Robotics & Automation</h3>
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed">
                      Generate a comprehensive 3-member group project synopsis based strictly on the R&A university format.
                    </p>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
