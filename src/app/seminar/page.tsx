'use client';

import GeneratorCard from '@/components/GeneratorCard';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function SeminarPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Technical Seminar</h1>
          <p className="text-gray-400">Generate a highly technical 2-page individual synopsis perfectly formatted for your presentation.</p>
        </div>

        <GeneratorCard />
      </div>
    </div>
  );
}
