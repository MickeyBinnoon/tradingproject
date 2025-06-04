import React from "react";
import HeroSection from "../components/hero/HeroSection";
import PerformanceWidget from "../components/performance/PerformanceWidget";
import TrustIndicators from "../components/trust/TrustIndicators";
import TestimonialCarousel from "../components/testimonials/TestimonialCarousel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PerformanceWidget />
        </div>
      </section>
      
      <TrustIndicators />
      <TestimonialCarousel />
    </div>
  );
}