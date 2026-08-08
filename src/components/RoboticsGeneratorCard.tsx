'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, Loader2, FileText, CheckCircle2, User, Hash, Briefcase, Users } from 'lucide-react';
import { generateRoboticsPdf, RoboticsStudentDetails, RoboticsPaperData } from '@/lib/generateRoboticsPdf';

export default function RoboticsGeneratorCard() {
  const [students, setStudents] = useState<RoboticsStudentDetails[]>([
    { rollNo: '', name: '', prn: '' },
    { rollNo: '', name: '', prn: '' },
    { rollNo: '', name: '', prn: '' }
  ]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'generating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (showSuccessModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showSuccessModal]);

  const updateStudent = (index: number, field: keyof RoboticsStudentDetails, value: string) => {
    const newStudents = [...students];
    newStudents[index][field] = value;
    setStudents(newStudents);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !title) {
       setErrorMessage('Please upload a PDF or enter a Title');
       setStatus('error');
       setTimeout(() => setStatus('idle'), 3000);
       return;
    }

    try {
      setStatus('uploading');
      
      const formData = new FormData();
      if (file) formData.append('file', file);
      else if (title) formData.append('title', title);
      formData.append('subjectType', 'robotics');
      
      setStatus('analyzing');
      const response = await fetch('/api/extract', { method: 'POST', body: formData });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to extract paper data');
      }

      const paperData: RoboticsPaperData = await response.json();
      
      setStatus('generating');
      await generateRoboticsPdf(students, paperData);
      
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setShowSuccessModal(true);
      }, 1000);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) setErrorMessage(err.message);
      else setErrorMessage(String(err));
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-[1px] rounded-[2rem] overflow-hidden group shadow-[0_0_80px_rgba(0,0,0,0.5)] w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-20 group-hover:opacity-100 animate-border-glow transition-opacity duration-700" />
        
        <div className="relative bg-[#0A0A0A] rounded-[31px] p-6 md:p-10 h-full w-full">
          <form onSubmit={handleGenerate} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-2 text-white">
                <Users className="text-blue-400 w-5 h-5" /> Team Members
              </h3>
              <p className="text-sm text-gray-400 mb-4 border-b border-white/10 pb-4">Provide details for exactly 3 students.</p>
            </div>
            
            <div className="space-y-6 pr-2">
              {students.map((student, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4 relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="group/input relative col-span-2">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 transition-colors group-focus-within/input:text-blue-400" />
                        <input required type="text" value={student.name} onChange={(e) => updateStudent(idx, 'name', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 outline-none focus:border-blue-500 focus:bg-black/60 transition-all text-sm text-white" placeholder={`Student ${idx + 1} Full Name`} />
                      </div>
                    </div>
                    <div className="group/input relative">
                      <div className="relative">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 transition-colors group-focus-within/input:text-cyan-400" />
                        <input required type="text" value={student.rollNo} onChange={(e) => updateStudent(idx, 'rollNo', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 outline-none focus:border-cyan-500 focus:bg-black/60 transition-all text-sm text-white" placeholder="Roll No" />
                      </div>
                    </div>
                    <div className="group/input relative">
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 transition-colors group-focus-within/input:text-purple-400" />
                        <input required type="text" value={student.prn} onChange={(e) => updateStudent(idx, 'prn', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 outline-none focus:border-purple-500 focus:bg-black/60 transition-all text-sm text-white" placeholder="PRN Number" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-2 text-white">
                <FileText className="text-cyan-400 w-5 h-5" /> Project Source
              </h3>
              <p className="text-sm text-gray-400 mb-6 border-b border-white/10 pb-4">Upload a base paper or let AI invent one.</p>
              
              <div className="space-y-5">
                <div className="group/input">
                   <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-2 transition-colors group-focus-within/input:text-cyan-400">
                      Option A: Enter Custom Title
                   </label>
                   <input type="text" value={title} disabled={!!file} onChange={(e) => setTitle(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-cyan-500 focus:bg-black/60 transition-all shadow-inner disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm" placeholder="e.g. Autonomous Drone Navigation" />
                </div>
                
                <div className="flex items-center gap-4 opacity-50">
                  <div className="h-px bg-white/20 flex-1" />
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">OR</span>
                  <div className="h-px bg-white/20 flex-1" />
                </div>

                <label htmlFor="robotics-file-upload" className={`flex flex-col items-center justify-center w-full h-32 bg-black/40 border-2 border-dashed ${file ? 'border-green-500/50 bg-green-500/5' : 'border-white/10'} rounded-xl cursor-pointer hover:border-cyan-400/50 hover:bg-black/60 transition-all group/upload shadow-inner ${title ? 'opacity-30 pointer-events-none' : ''}`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <motion.div whileHover={{ y: -5 }} className="bg-white/5 p-2 rounded-full mb-2 shadow-lg group-hover/upload:shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover/upload:bg-white/10 transition-all">
                      <FileUp className={`w-5 h-5 ${file ? 'text-green-400' : 'text-gray-400 group-hover/upload:text-cyan-400'}`} />
                    </motion.div>
                    <p className="mb-1 text-xs text-gray-400">
                      <span className="font-semibold text-white">Upload PDF</span> (Optional)
                    </p>
                    {file && (
                      <div className="mt-2 flex items-center gap-2">
                        <p className="text-[10px] font-semibold text-green-400 flex items-center gap-1.5 bg-green-400/10 px-3 py-1 rounded-full border border-green-500/20">
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
                  <input id="robotics-file-upload" type="file" accept=".pdf" className="hidden" disabled={!!title} onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </label>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={status !== 'idle' || (!file && !title) || students.some(s => !s.name || !s.rollNo || !s.prn)}
              type="submit"
              className="w-full mt-4 relative py-4 rounded-xl font-bold text-white overflow-hidden group shadow-[0_0_20px_rgba(6,182,212,0.2)] disabled:shadow-none transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-white/50 transition-colors" />
              
              <AnimatePresence mode="wait">
                {status === 'idle' && <motion.span key="generate" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="relative z-10 tracking-wide flex items-center justify-center gap-2">Generate Report <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></motion.span>}
                {status === 'uploading' && <motion.span key="uploading" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="relative z-10 flex items-center justify-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> Initializing...</motion.span>}
                {status === 'analyzing' && <motion.span key="analyzing" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="relative z-10 flex items-center justify-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> Analyzing...</motion.span>}
                {status === 'generating' && <motion.span key="generating" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="relative z-10 flex items-center justify-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> Rendering...</motion.span>}
                {status === 'success' && <motion.span key="success" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="relative z-10 flex items-center justify-center gap-2 text-white"><CheckCircle2 className="w-4 h-4 text-green-400" /> Generated!</motion.span>}
                {status === 'error' && <motion.span key="error" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="relative z-10 text-white text-xs bg-red-500/50 px-4 py-1 rounded-full">{errorMessage}</motion.span>}
              </AnimatePresence>
            </motion.button>
          </div>
        </form>
        </div>
      </motion.div>

      {/* PDF SUCCESS EXPERIENCE MODAL */}
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
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
              
              <div className="flex flex-col items-center text-center relative z-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                  className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner"
                >
                  <motion.svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }} strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </motion.svg>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Generation Complete</h3>
                <p className="text-[#888888] mb-8 text-sm leading-relaxed max-w-xs">
                  Your group robotics synopsis has been beautifully generated. You can now use it for your submission.
                </p>

                <div className="w-full relative group">
                   <div className="relative bg-[#111111] rounded-xl p-5 mb-6 text-left border border-white/5 transition-all duration-300 hover:border-white/10 hover:bg-[#151515]">
                     <div className="flex items-start gap-4">
                       <div className="mt-1">
                         <svg className="w-5 h-5 text-[#888888]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                       </div>
                       <div>
                         <h4 className="text-white font-medium mb-1 text-sm tracking-wide">Follow the Creator</h4>
                         <p className="text-[13px] text-[#666666] mb-3 leading-relaxed">Follow Abhijeet Kangane on GitHub to support ongoing development.</p>
                         <a href="https://github.com/Abhi666-max" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-semibold text-xs hover:bg-gray-200 transition-colors">Follow on GitHub</a>
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
