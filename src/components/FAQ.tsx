'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What does this platform do?",
    answer: "TSeminar AI automates the generation of technical seminar synopses. It extracts context from research papers or creates entirely new theoretical synopses based on a given title, and automatically formats them into pixel-perfect, print-ready PDF reports."
  },
  {
    question: "How does AI generate seminar content?",
    answer: "When provided with a title, our platform leverages Groq's high-speed inference engine to synthesize a highly realistic and technical synopsis. It invents credible authors, a recent publication year, and perfectly structures the Introduction, Methodology, and Objectives to simulate a genuine, high-quality research paper."
  },
  {
    question: "Which file formats are supported?",
    answer: "Currently, we strictly support standard PDF formats (.pdf) for both paper extraction and final output generation. Ensure your uploaded file is an unsecured text-based PDF for optimal extraction."
  },
  {
    question: "How secure are uploaded files?",
    answer: "Extremely secure. Uploaded PDFs are processed entirely in ephemeral edge memory. The text is extracted, analyzed, and immediately discarded. We never log, store, or train on your personal files."
  },
  {
    question: "Is the generated content editable?",
    answer: "No, to ensure perfect margins and styling, the platform generates a finalized, uneditable print-ready PDF. However, you can always tweak your title input and regenerate a new PDF as many times as you like."
  },
  {
    question: "Can I regenerate results?",
    answer: "Absolutely. You can generate unlimited synopses. If you don't like the AI's first output, simply hit the generate button again for a completely fresh, unique synthesis."
  },
  {
    question: "How is plagiarism handled?",
    answer: "When generating from a title, the AI synthesizes entirely original text, resulting in a zero plagiarism score. When extracting from a provided PDF, the engine intelligently paraphrases the source material."
  },
  {
    question: "Which AI technologies power the platform?",
    answer: "We utilize advanced language models running exclusively on Groq's LPU inference engine, delivering unprecedented speed and intelligence specifically optimized for academic and technical language synthesis."
  },
  {
    question: "Does it work on mobile devices?",
    answer: "Yes, our interface is 100% responsive and optimized for mobile devices. You can generate and download your technical PDF directly to your smartphone."
  },
  {
    question: "How do I download the final report?",
    answer: "Once the AI finishes rendering the document, the PDF is automatically downloaded to your device with a strict, organized naming convention (e.g., RollNo_Title.pdf)."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative z-10 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-2 mb-4"
          >
            Frequently Asked Questions.
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:glass-panel-hover transition-colors focus:outline-none"
              >
                <span className="heading-3 text-lg">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 body-text">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
