'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, Loader2, FileText, CheckCircle2, User, Hash, Briefcase } from 'lucide-react';
import { generateFinalPdf, StudentDetails, PaperData } from '@/lib/generatePdf';
import { toast } from 'sonner';
import { useHistoryStore } from '@/store/useHistoryStore';

export default function GeneratorCard() {
  const [student, setStudent] = useState<StudentDetails>({ rollNo: '', name: '', prn: '' });
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'generating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const addHistory = useHistoryStore((state) => state.addHistory);

  useEffect(() => {
    if (showSuccessModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSuccessModal]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !title) {
       toast.error('Please upload a PDF or enter a Title');
       setErrorMessage('Please upload a PDF or enter a Title');
       setStatus('error');
       setTimeout(() => setStatus('idle'), 3000);
       return;
    }

    try {
      setStatus('uploading');
      
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      } else if (title) {
        formData.append('title', title);
      }
      
      setStatus('analyzing');
      const response = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to extract paper data');
      }

      const paperData: PaperData = await response.json();
      
      setStatus('generating');
      await generateFinalPdf(student, paperData);
      
      addHistory({
        type: 'seminar',
        title: paperData.title,
        studentNames: [student.name],
        paperData,
        studentData: student,
      });

      setStatus('success');
      toast.success('Synopsis generated successfully!');
      setTimeout(() => {
        setStatus('idle');
        setShowSuccessModal(true);
      }, 1000);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setErrorMessage(err.message);
        toast.error(err.message);
      } else {
        setErrorMessage(String(err));
        toast.error(String(err));
      }
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="relative w-full">
      <div className="max-w-5xl mx-auto">
        


        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative p-[1px] rounded-[2rem] overflow-hidden group shadow-[0_0_80px_rgba(0,0,0,0.5)]"
        >
          {/* Animated border glow on the entire card */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-20 group-hover:opacity-100 animate-border-glow transition-opacity duration-700" />
          
          <div className="relative glass-panel rounded-[31px] p-6 md:p-12 h-full w-full">
            <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
                  <User className="text-blue-400 w-5 h-5" /> Identity
                </h3>
                <p className="text-sm text-gray-400 mb-6 border-b border-white/10 pb-4">Who is submitting this seminar?</p>
              </div>
              
              <div className="space-y-5">
                <div className="group/input relative">
                  <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 transition-colors group-focus-within/input:text-blue-400">Roll Number</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 transition-colors group-focus-within/input:text-blue-400" />
                    <input 
                      required
                      type="text" 
                      value={student.rollNo}
                      onChange={(e) => setStudent({...student, rollNo: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-black/60 transition-all shadow-inner"
                      placeholder="38"
                    />
                  </div>
                </div>
                
                <div className="group/input relative">
                  <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 transition-colors group-focus-within/input:text-purple-400">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 transition-colors group-focus-within/input:text-purple-400" />
                    <input 
                      required
                      type="text" 
                      value={student.name}
                      onChange={(e) => setStudent({...student, name: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-purple-500 focus:bg-black/60 transition-all shadow-inner"
                      placeholder="Abhijeet Kangane"
                    />
                  </div>
                </div>

                <div className="group/input relative">
                  <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 transition-colors group-focus-within/input:text-blue-400">PRN Number</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 transition-colors group-focus-within/input:text-blue-400" />
                    <input 
                      required
                      type="text" 
                      value={student.prn}
                      onChange={(e) => setStudent({...student, prn: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-black/60 transition-all shadow-inner"
                      placeholder="72431600B"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 flex flex-col justify-between">
              
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
                  <FileText className="text-purple-400 w-5 h-5" /> Data Source
                </h3>
                <p className="text-sm text-gray-400 mb-6 border-b border-white/10 pb-4">Where should the AI pull data from?</p>
                
                <div className="space-y-6">
                  <div className="group/input">
                     <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 transition-colors group-focus-within/input:text-purple-400">
                        Option A: Title Generation (AI Writes It)
                     </label>
                     <input 
                       type="text" 
                       value={title}
                       disabled={!!file}
                       onChange={(e) => setTitle(e.target.value)}
                       className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 px-4 outline-none focus:border-purple-500 focus:bg-black/60 transition-all shadow-inner disabled:opacity-30 disabled:cursor-not-allowed"
                       placeholder="e.g. AI in Healthcare"
                     />
                  </div>
                  
                  <div className="flex items-center gap-4 opacity-50">
                    <div className="h-px bg-white/20 flex-1" />
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">OR</span>
                    <div className="h-px bg-white/20 flex-1" />
                  </div>

                  <label 
                    htmlFor="file-upload" 
                    className={`flex flex-col items-center justify-center w-full h-36 bg-black/40 border-2 border-dashed ${file ? 'border-green-500/50 bg-green-500/5' : 'border-white/10'} rounded-xl cursor-pointer hover:border-blue-400/50 hover:bg-black/60 transition-all group/upload shadow-inner ${title ? 'opacity-30 pointer-events-none' : ''}`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-white/5 p-3 rounded-full mb-3 shadow-lg group-hover/upload:shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover/upload:bg-white/10 transition-all"
                      >
                        <FileUp className={`w-6 h-6 ${file ? 'text-green-400' : 'text-gray-400 group-hover/upload:text-blue-400'}`} />
                      </motion.div>
                      <p className="mb-1 text-sm text-gray-400">
                        <span className="font-semibold text-white">Upload PDF</span> (Optional)
                      </p>
                      {file && (
                        <div className="mt-2 flex items-center gap-2">
                          <p className="text-xs font-semibold text-green-400 flex items-center gap-1.5 bg-green-400/10 px-3 py-1.5 rounded-full border border-green-500/20">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {file.name}
                          </p>
                          <button 
                            type="button" 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFile(null); }} 
                            className="p-1 rounded-full bg-black/40 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all z-10 relative"
                            title="Remove PDF"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      )}
                    </div>
                    <input 
                      id="file-upload" 
                      type="file" 
                      accept=".pdf" 
                      className="hidden" 
                      disabled={!!title}
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={status !== 'idle' || (!file && !title)}
                type="submit"
                className="w-full mt-8 relative py-5 rounded-xl font-bold text-lg text-white overflow-hidden group shadow-[0_0_20px_rgba(0,112,243,0.2)] disabled:shadow-none transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Button Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-white/50 transition-colors" />
                
                <AnimatePresence mode="wait">
                  {status === 'idle' && <motion.span key="generate" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="relative z-10 tracking-wide flex items-center justify-center gap-2">Generate Synopsis <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></motion.span>}
                  {status === 'uploading' && <motion.span key="uploading" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="relative z-10 flex items-center justify-center gap-2"><Loader2 className="animate-spin w-5 h-5" /> Initializing...</motion.span>}
                  {status === 'analyzing' && <motion.span key="analyzing" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="relative z-10 flex items-center justify-center gap-2"><Loader2 className="animate-spin w-5 h-5" /> AI Engine Analyzing...</motion.span>}
                  {status === 'generating' && <motion.span key="generating" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="relative z-10 flex items-center justify-center gap-2"><Loader2 className="animate-spin w-5 h-5" /> Rendering PDF...</motion.span>}
                  {status === 'success' && <motion.span key="success" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="relative z-10 flex items-center justify-center gap-2 text-white"><CheckCircle2 className="w-5 h-5 text-green-400" /> Generated!</motion.span>}
                  {status === 'error' && <motion.span key="error" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="relative z-10 text-white text-sm bg-red-500/50 px-4 py-1 rounded-full backdrop-blur-sm border border-red-500/50">{errorMessage}</motion.span>}
                </AnimatePresence>
              </motion.button>
            </div>
          </form>
          </div>
        </motion.div>
      </div>

      {/* PHASE 9: PDF SUCCESS EXPERIENCE MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowSuccessModal(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#0A0A0A] rounded-[20px] p-8 shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden"
            >
              {/* Sleek Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
              
              <div className="flex flex-col items-center text-center relative z-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                  className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner"
                >
                  <motion.svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2.5}
                  >
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M5 13l4 4L19 7" 
                    />
                  </motion.svg>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Generation Complete</h3>
                <p className="text-[#888888] mb-8 text-sm leading-relaxed max-w-xs">
                  Your print-ready PDF has been securely generated. You can now use it for your seminar submission.
                </p>

                <div className="w-full relative group">
                   <div className="relative bg-[#111111] rounded-xl p-5 mb-6 text-left border border-white/5 transition-all duration-300 hover:border-white/10 hover:bg-[#151515]">
                     <div className="flex items-start gap-4">
                       <div className="mt-1">
                         <svg className="w-5 h-5 text-[#888888]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                         </svg>
                       </div>
                       <div>
                         <h4 className="text-white font-medium mb-1 text-sm tracking-wide">Open Source</h4>
                         <p className="text-[13px] text-[#666666] mb-3 leading-relaxed">Star our GitHub repository to support ongoing development.</p>
                         <a href="https://github.com/Abhi666-max/kse-synopsis-generator" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-semibold text-xs hover:bg-gray-200 transition-colors">
                           Star on GitHub
                         </a>
                       </div>
                     </div>
                   </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full px-6 py-3.5 rounded-xl bg-white text-black font-semibold transition-colors flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                >
                  Continue Using App <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
