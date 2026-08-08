'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistoryStore } from '@/store/useHistoryStore';
import { generateFinalPdf } from '@/lib/generatePdf';
import { generateRoboticsPdf } from '@/lib/generateRoboticsPdf';
import { Download, Trash2, X, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function HistoryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { history, removeHistory, clearHistory } = useHistoryStore();

  const handleRedownload = async (item: any) => {
    try {
      if (item.type === 'seminar') {
        await generateFinalPdf(item.studentData, item.paperData);
      } else {
        await generateRoboticsPdf(item.studentData, item.paperData);
      }
      toast.success('Downloaded from history!');
    } catch (err) {
      toast.error('Failed to regenerate PDF');
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-[#0A0A0A] border-l border-white/10 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-blue-400" /> Recent Generations
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {history.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  <p>No recent generations found.</p>
                </div>
              ) : (
                history.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    className="bg-[#111111] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-500/10 text-blue-400 uppercase tracking-wider">
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-gray-400 mb-4 line-clamp-1">
                      {item.studentNames.join(', ')}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleRedownload(item)}
                        className="flex-1 flex items-center justify-center gap-2 bg-white text-black px-3 py-2 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                      <button 
                        onClick={() => removeHistory(item.id)}
                        className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
            {history.length > 0 && (
              <div className="p-6 border-t border-white/10">
                <button 
                  onClick={clearHistory}
                  className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-semibold"
                >
                  Clear All History
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
