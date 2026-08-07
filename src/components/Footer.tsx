'use client';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-glass-border bg-black pt-20 pb-10 px-6 mt-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-3 mb-6 cursor-pointer group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(121,40,202,0.3)] group-hover:shadow-[0_0_30px_rgba(0,112,243,0.6)] transition-all duration-500 border border-glass-border">
                <img src="/logo.png" alt="TSeminar AI Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white transition-all duration-300">
                TSeminar<span className="font-medium text-gradient-primary ml-0.5">AI</span>
              </span>
            </div>
            <p className="body-text text-sm max-w-sm">
              Next-generation AI automation for engineering students. Generate flawless, print-ready technical seminar synopses in seconds. Stop formatting, start building.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6 tracking-wide text-sm">Product</h4>
            <ul className="space-y-4 body-text text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="#generator" className="hover:text-white transition-colors">Generator</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6 tracking-wide text-sm">Legal</h4>
            <ul className="space-y-4 body-text text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 tracking-wide text-sm uppercase">Resources</h4>
            <ul className="space-y-4 body-text text-sm">
              <li><a href="#" className="hover:text-white transition-colors relative group"><span className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary">›</span>Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors relative group"><span className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary">›</span>API References</a></li>
              <li><a href="#" className="hover:text-white transition-colors relative group"><span className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary">›</span>Examples</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-4 mt-8">
          <p className="caption text-gray-500">© {new Date().getFullYear()} TSeminarAI. All rights reserved.</p>
          <div className="flex flex-col md:flex-row md:items-center gap-6 mt-6 md:mt-0">
            <div className="group cursor-default flex items-center gap-2">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Designed & Developed by</span>
              <span className="text-sm font-bold text-white tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">Abhijeet Kangane</span>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.a whileHover={{ scale: 1.15, y: -3 }} href="https://github.com/Abhi666-max/TSeminar-Synopsis-Generator" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]" title="GitHub">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.15, y: -3 }} href="https://www.linkedin.com/in/abhijeet-kangane/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors p-2 rounded-full hover:bg-[#0077b5]/20 hover:shadow-[0_0_15px_rgba(0,119,181,0.6)]" title="LinkedIn">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.15, y: -3 }} href="https://instagram.com/abhijeet.037" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-colors p-2 rounded-full hover:bg-[#E1306C]/20 hover:shadow-[0_0_15px_rgba(225,48,108,0.6)]" title="Instagram">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.15, y: -3 }} href="http://x.com/abhijeet_037" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]" title="X (Twitter)">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
