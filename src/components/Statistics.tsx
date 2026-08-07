'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function Counter({ from, to, duration = 2, suffix = '' }: { from: number, to: number, duration?: number, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      let start = null as number | null;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / (duration * 1000), 1);
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(ease * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Statistics() {
  return (
    <section className="py-24 relative z-10 px-6 border-y border-white/5 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-2"
        >
          <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
            <Counter from={0} to={800} suffix="k/s" />
          </div>
          <div className="text-gray-400 font-medium text-sm uppercase tracking-widest">Inference Speed</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-2"
        >
          <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
            <Counter from={0} to={100} suffix="%" />
          </div>
          <div className="text-gray-400 font-medium text-sm uppercase tracking-widest">Format Accuracy</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-2"
        >
          <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
            <Counter from={0} to={24} suffix="h" />
          </div>
          <div className="text-gray-400 font-medium text-sm uppercase tracking-widest">Hours Saved</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
            <Counter from={0} to={50} suffix="M+" />
          </div>
          <div className="text-gray-400 font-medium text-sm uppercase tracking-widest">Parameters</div>
        </motion.div>

      </div>
    </section>
  );
}
