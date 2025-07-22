// modules/home/ui/views/home-view.tsx
"use client";

import { Navigation } from "../../components/navigation";
import { HeroSection } from "../../components/hero-section";
import { FeaturesSection } from "../../components/features";
import { PricingSection } from "../../components/pricing-section";
import { Footer } from "../../components/footer";

export const HomeView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <Footer />
    </div>
  );
};
