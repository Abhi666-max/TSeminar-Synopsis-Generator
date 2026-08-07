'use client';

import RoboticsGeneratorCard from '@/components/RoboticsGeneratorCard';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function RoboticsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Robotics & Automation</h1>
          <p className="text-gray-400">Generate a comprehensive 3-member group project synopsis based strictly on the R&A university format.</p>
        </div>

        <div className="flex-1 flex flex-col min-h-[600px]">
          <RoboticsGeneratorCard />
        </div>
      </div>
    </div>
  );
}
