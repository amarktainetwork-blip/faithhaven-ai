import { useEffect } from 'react';
import { usePricingStore } from '@/store';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/sections/HeroSection';
import FeaturesSection from '@/sections/FeaturesSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import PricingSection from '@/sections/PricingSection';
import Footer from '@/components/layout/Footer';

export default function LandingPage() {
  const { fetchGeoData } = usePricingStore();

  useEffect(() => {
    fetchGeoData();
  }, [fetchGeoData]);

  return (
    <div className="min-h-screen bg-[hsl(48,60%,98%)]">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
