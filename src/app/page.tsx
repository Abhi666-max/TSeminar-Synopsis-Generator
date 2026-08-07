import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Workflow from '@/components/Workflow';
import Statistics from '@/components/Statistics';
import FAQ from '@/components/FAQ';
import GeneratorCard from '@/components/GeneratorCard';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Workflow />
      <GeneratorCard />
      <Statistics />
      <FAQ />
    </>
  );
}
