"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamic imports with error handling
const EpicTransitionsProvider = dynamic(() => 
  import("@/components/EpicTransitions").then(mod => ({ default: mod.EpicTransitionsProvider })), 
  { ssr: false }
);
const Aboutus = dynamic(() => import("@/components/About"), { ssr: false });
const Footeritem = dynamic(() => import("@/components/Footer"), { ssr: false });
const Headerpage = dynamic(() => import("@/components/Header"), { ssr: false });
const Heroitem = dynamic(() => import("@/components/Hero"), { ssr: false });
const LowerFooter = dynamic(() => import("@/components/Lowerfooter"), { ssr: false });
const Pricingitem = dynamic(() => import("@/components/Pricing"), { ssr: false });
const RevenueBreakdown = dynamic(() => import("@/components/Revenue"), { ssr: false });
const Servicesitem = dynamic(() => import("@/components/Services"), { ssr: false });
const Testimonialsitem = dynamic(() => import("@/components/Testimonials"), { ssr: false });
const WhyChooseUs = dynamic(() => import("@/components/Why"), { ssr: false });
const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), { ssr: false });

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
      ) : (
        <EpicTransitionsProvider key="content">
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen bg-white"
          >
            <Headerpage />
            <Heroitem />
            <Aboutus />
            <Servicesitem />
            <WhyChooseUs />
            <RevenueBreakdown />
            <Pricingitem />
            <Testimonialsitem />
            <LowerFooter />
            <Footeritem />
          </motion.main>
        </EpicTransitionsProvider>
      )}
    </AnimatePresence>
  );
}
